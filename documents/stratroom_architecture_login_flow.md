# 🏗️ Stratroom — Complete Architecture & Login Flow Analysis
> **Senior Java Developer Perspective (20 Years Experience)**  
> Stack: Spring Boot · Spring Security OAuth2 · JWT · MySQL · Microservices

---

## 📦 Project Structure Overview

Stratroom is a **multi-module Spring Boot microservices** application. Each module is an independently deployable Spring Boot service.

```
Stratroom-Source/
├── authservice/          ← 🔐 Authentication & Token Issuance (Port 8081)
├── db-service/           ← 🗄️  Database abstraction layer (Port 8083)
├── userservice/          ← 👤 User management
├── licenseservice/       ← 🪪 License validation
├── scorecard-service/    ← 📊 Scorecard/KPI domain
├── etl-service/          ← 📥 ETL / Data ingestion
└── stratroom-web/        ← 🌐 Main web application (WAR / Tomcat)
```

---

## 🧩 Microservice Roles

| Service | Port | Role |
|---|---|---|
| `authservice` | 8081 | Issues JWT & OAuth2 tokens, validates credentials |
| `db-service` | 8083 | Proxy to MySQL — handles employee/user queries |
| `userservice` | — | User CRUD & profile management |
| `licenseservice` | — | License key verification |
| `scorecard-service` | — | BSC Scorecard, KPIs, Org Charts |
| `etl-service` | — | ETL data pipeline |
| `stratroom-web` | 8080 | Frontend WAR, routes to all services via REST |

---

## 🔐 Auth Service — Deep Dive

### Key Classes

| Class | Package | Responsibility |
|---|---|---|
| `AuthServiceApplication` | `auth` | Spring Boot entry point — `@EnableAuthorizationServer` + `@EnableResourceServer` |
| `SecurityConfig` | `auth.config` | Spring Security config, JWT store, filter chain |
| `AuthorizationServerConfig` | `auth.config` | OAuth2 Authorization Server configuration |
| `LoginResource` | `auth.resource` | REST Controller — `/login`, `/validateToken`, `/generateToken` |
| `DBService` | `auth.service` | Directly queries MySQL `employee_credentials` table |
| `LoginService` | `auth.service` | Builds user info string + calls `DBService` |
| `OauthClientDetailsServiceImpl` | `auth.service` | Hardcoded OAuth2 client: `STRATROOM_CLINET_ID` |
| `CustomAuthenticationProvider` | `oauth` | Spring Security `AuthenticationProvider` — validates user |
| `CustomTokenService` | `oauth` | Extended `DefaultTokenServices` — manages token lifecycle |
| `AuthTokenEnhancer` | `oauth.component` | `TokenEnhancer` — embeds `oauthUserInfo` + permissions into JWT claims |
| `CustomClaimAccessTokenConverter` | `oauth.component` | Extracts custom claims back from JWT on validation |
| `JWTOAuthTokenFilter` | `auth.config` | `GenericFilterBean` — pre-filters every request for JWT/OAuth token |
| `JwtTokenUtil` | `jwt` | Auth0 JWT library wrapper — sign/verify/expire HMAC256 tokens |
| `EncryptionProvider` / `JasyptEncryptionProvider` | `encryption` | Jasypt-based symmetric encryption for user info header |
| `ServiceRequestThreadLocal` | `util` | `ThreadLocal<UserPrincipal>` — carries user context across a single request |
| `UserPrincipal` | `util` | Thread-scoped holder: SSO flag, authorities, `LoginResponseDTO` |
| `EmbeddedTomcatConfig` | `auth.config` | Reads JWT secret, Jasypt password, token expiry from `.properties` |

---

## 🔑 Login Flow — Step-by-Step Walkthrough

### Phase 1: Client calls `/login` (POST)

1. Client POSTs `LoginDTO { userName, password, ssoLogin }` to `POST /authservice/login`
2. Spring Security **skips** this endpoint (configured in `WebSecurity.configure()` via `ignoring().antMatchers("/login", ...)`)
3. `LoginResource.login()` receives the request

### Phase 2: DB Credential Validation

4. `LoginResource` calls `DBService.authoriseUser(loginDTO)`
5. `DBService` opens a **direct JDBC connection** to MySQL: `SELECT * FROM employee_credentials WHERE email_address = ?`
6. Returns `AuthenticateResponseDTO { authoriseFlag, userFlag, employee, userPermissions }`
7. If `authoriseFlag = false` → return early with `loginFlag=false`

### Phase 3: OAuth2 Token Generation

8. If user is valid, `LoginResource` creates a Spring Security `UsernamePasswordAuthenticationToken` with principal `STRATROOM_CLINET_ID`
9. Builds parameters map: `{ grant_type: "password", username, password }`
10. Sets a fresh `UserPrincipal` on `ServiceRequestThreadLocal` (thread-local context)
11. Calls `tokenEndPoint.postAccessToken(auth, parameters)` → triggers full OAuth2 password grant flow

### Phase 4: OAuth2 Password Grant Chain

12. `TokenEndpoint` dispatches to `AuthenticationManager`
13. `CustomAuthenticationProvider.authenticate()` is called:
    - Creates `LoginDTO` from credentials
    - Calls `LoginService.authoriseUser()` → `DBService.authoriseUser()` (**second DB call**)
    - If success → builds `LoginResponseDTO` with `profile`, `permissions`, `userInfo`
    - Calls `LoginService.getEncryptedUserInfo()` → builds pipe-delimited string:  
      `empId#userName#password#reporteeIds#authorities#orgId` → **Jasypt-encrypted**
    - Stores `loginResponseDTO` on `ServiceRequestThreadLocal`
14. Returns authenticated `UsernamePasswordAuthenticationToken` with `ROLE_USER` authority

### Phase 5: Token Enhancement & JWT Signing

15. `CustomTokenService.createAccessToken()` delegates to `TokenEnhancerChain`
16. **Chain Step 1 — `AuthTokenEnhancer.enhance()`**:
    - Reads `loginResponseDTO` from `ServiceRequestThreadLocal`
    - Embeds into JWT additional claims:
      - `oauthUserInfo` → encrypted user info string
      - `authorities` → `["USER", "ROLE_USER"]`
      - `userPermissions` → map of roles
17. **Chain Step 2 — `JwtAccessTokenConverter`**:
    - Signs the final JWT using HMAC256 with the signing key from config
    - Stores in `JwtTokenStore` (stateless — no DB storage)
18. Access token validity: **900 seconds** (15 min) | Refresh token: **7200 seconds** (2 hr)

### Phase 6: Response Assembly

19. Back in `LoginResource.login()`:
    - Retrieves `loginResponseDTO` from `ServiceRequestThreadLocal`
    - Sets `accessToken`, `refreshToken`, `expireAt` from `OAuth2AccessToken`
    - Returns `LoginResponseDTO` to client

---

## 🔄 Complete Login Mermaid Diagram

```mermaid
sequenceDiagram
    autonumber
    participant Client as 🖥️ Client (Browser/App)
    participant LV as 🪪 LicenseVerificationValve<br/>(stratroom-web Tomcat Valve)
    participant LR as 📡 LoginResource<br/>POST /authservice/login
    participant DB1 as 🗄️ DBService<br/>(authoriseUser - Pass 1)
    participant MySQL as 🐬 MySQL<br/>employee_credentials
    participant TE as 🔑 TokenEndpoint<br/>(OAuth2 Password Grant)
    participant CAP as 🔒 CustomAuthenticationProvider
    participant LS as ⚙️ LoginService
    participant DB2 as 🗄️ DBService<br/>(authoriseUser - Pass 2)
    participant ATE as ✨ AuthTokenEnhancer
    participant JWT as 🏷️ JwtAccessTokenConverter<br/>(HMAC256 Sign)
    participant TL as 🧵 ServiceRequestThreadLocal

    Client->>LV: POST /login {userName, password, ssoLogin}
    Note over LV: Valve ignores /login path<br/>passes through directly
    LV->>LR: Forward request

    LR->>DB1: authoriseUser(loginDTO)
    DB1->>MySQL: SELECT * FROM employee_credentials<br/>WHERE email_address = ?
    MySQL-->>DB1: ResultSet {emp_id, password, ...}
    DB1-->>LR: AuthenticateResponseDTO<br/>{authoriseFlag, employee, permissions}

    alt authoriseFlag == false
        LR-->>Client: ❌ {loginFlag: false, userFlag: false/true}
    end

    LR->>TL: set(new UserPrincipal {ssoLogin})
    LR->>TE: postAccessToken(auth, {grant_type=password, username, password})

    TE->>CAP: authenticate(UsernamePasswordAuthToken)
    CAP->>LS: authoriseUser(loginDTO)
    LS->>DB2: authoriseUser(loginDTO)
    DB2->>MySQL: SELECT * FROM employee_credentials<br/>WHERE email_address = ?
    MySQL-->>DB2: ResultSet
    DB2-->>LS: AuthenticateResponseDTO
    LS-->>CAP: AuthenticateResponseDTO

    CAP->>LS: getEncryptedUserInfo(loginDTO, authResp)
    Note over LS: Builds: empId#userName#password<br/>#reporteeIds#authorities#orgId
    LS-->>CAP: Jasypt-encrypted userInfo string

    CAP->>TL: get().setAuthority(["USER","ROLE_USER"])
    CAP->>TL: get().setLoginResponseDTO(loginResponseDTO<br/>{profile, permissions, userInfo})
    CAP-->>TE: UsernamePasswordAuthToken [ROLE_USER]

    TE->>ATE: enhance(accessToken, authentication)
    ATE->>TL: get().getLoginResponseDTO()
    ATE-->>JWT: token + additionalClaims<br/>{oauthUserInfo, authorities, userPermissions}

    JWT->>JWT: Sign with HMAC256(secret)<br/>validity: 900s access / 7200s refresh
    JWT-->>TE: Signed OAuth2AccessToken

    TE-->>LR: OAuth2AccessToken {value, refreshToken, expiration}

    LR->>TL: get().getLoginResponseDTO()
    LR->>LR: set accessToken + refreshToken + expireAt
    LR-->>Client: ✅ LoginResponseDTO<br/>{loginFlag, profile, permissions,<br/>accessToken, refreshToken, expireAt, userInfo}
```

---

## 🛡️ Token Validation Flow (`/validateToken`)

```mermaid
sequenceDiagram
    autonumber
    participant Client as 🖥️ Client
    participant Filter as 🔍 JWTOAuthTokenFilter
    participant LR as 📡 LoginResource<br/>GET /validateToken
    participant TS as 🔑 CustomTokenService
    participant TStore as 📦 JwtTokenStore

    Client->>Filter: GET /validateToken<br/>Headers: Authorization: Bearer <token>, USER_INFO: <enc>

    alt has OAUTH_VALIDATION header
        Filter->>Filter: Route to CustomOAuthAuthenticationFilter<br/>(full OAuth2 validation)
    else Bearer JWT token only
        Filter->>Filter: Extract JWT from "Authorization" header
        Filter->>Filter: jwtTokenUtil.isTokenExpired(jwt)?
        alt expired
            Filter->>Filter: setAttribute("TokenExpired", ...)
        else not expired
            Filter->>Filter: jwtTokenUtil.validateToken(jwt, decryptedUserInfo)?
            alt mismatch
                Filter->>Filter: setAttribute("AU001", "Token not matching")
            else valid
                Filter->>Filter: Set SecurityContext ROLE_USER
            end
        end
    end

    Filter->>LR: forward with attributes set
    LR->>TS: tokenStore.readAccessToken(tokenValue)
    TS->>TStore: readAccessToken()
    TStore-->>LR: OAuth2AccessToken + additionalInfo
    LR->>LR: Compare decrypted USER_INFO header<br/>vs oauthUserInfo claim in token
    LR-->>Client: TokenResponseDTO<br/>{validationSuccess, userInfo, tokenExpired}
```

---

## 🔄 Token Refresh Flow (`/generateToken` with REFRESH_TOKEN header)

```mermaid
sequenceDiagram
    autonumber
    participant Client as 🖥️ Client
    participant LR as 📡 LoginResource<br/>GET /generateToken
    participant TE as 🔑 TokenEndpoint
    participant JWT as 🏷️ JwtAccessTokenConverter

    Client->>LR: GET /generateToken<br/>Headers: REFRESH_TOKEN: <token>, USER_INFO: <enc>

    LR->>LR: Detect REFRESH_TOKEN header → geenrateOAuthJWTToken()
    LR->>LR: Decrypt USER_INFO header via Jasypt
    LR->>TE: postAccessToken({grant_type=refresh_token, refresh_token})
    TE->>JWT: Verify refresh token, issue new access token
    JWT-->>TE: New signed OAuth2AccessToken
    TE-->>LR: New OAuth2AccessToken
    LR-->>Client: TokenResponseDTO<br/>{token, expireAt, userInfo{decryptUserInfo}}
```

---

## 🪪 License Valve — Pre-request Check (stratroom-web)

```mermaid
flowchart TD
    A[Incoming HTTP Request] --> B{LicenseVerificationValve}
    B -->|Matches ignore list| C[Pass Through<br/>*.jsp, /css/**, /js/**, /img/**, etc.]
    B -->|API Request| D[licenseService.validateLicense()]
    D --> E{License Valid?}
    E -->|Exception| F[Set validationSuccess=true<br/>fail-open policy]
    E -->|Success| G[Set LicenseResponseDTO<br/>on UserThreadLocal]
    F --> H[getNext().invoke → Continue chain]
    G --> H
    C --> H
```

---

## 🏛️ Security Filter Chain Architecture

```mermaid
flowchart LR
    subgraph authservice["Auth Service (Port 8081)"]
        direction TB
        A[HTTP Request] --> B[JWTOAuthTokenFilter<br/>GenericFilterBean]
        B -->|/login, /generateToken| C[Bypass Security<br/>WebSecurity.ignoring]
        B -->|Bearer JWT| D[JwtTokenUtil.validateToken]
        B -->|OAUTH_VALIDATION| E[CustomOAuthAuthFilter]
        D --> F[Set SecurityContext]
        E --> G[OAuth2AuthenticationManager]
        F --> H[LoginResource]
        G --> H
    end

    subgraph tokenchain["Token Creation Chain"]
        direction TB
        I[AuthorizationServerConfig] --> J[CustomTokenService]
        J --> K[TokenEnhancerChain]
        K --> L[AuthTokenEnhancer<br/>adds custom claims]
        L --> M[JwtAccessTokenConverter<br/>HMAC256 sign]
        M --> N[JwtTokenStore<br/>stateless]
    end

    subgraph web["stratroom-web (Port 8080)"]
        direction TB
        O[LicenseVerificationValve] --> P[Spring MVC Filters]
        P --> Q[REST Controllers]
        Q --> R[Service Layer<br/>calls authservice /validateToken]
    end
```

---

## 🔑 JWT Token Anatomy

The JWT issued by Stratroom contains these custom claims beyond the standard ones:

| Claim | Value | Set By |
|---|---|---|
| `sub` | `username` | `JwtAccessTokenConverter` |
| `userInfo` | `username` | `JwtTokenUtil` |
| `oauthUserInfo` | Jasypt-encrypted: `empId#user#pass#reporteeIds#roles#orgId` | `AuthTokenEnhancer` |
| `authorities` | `["USER", "ROLE_USER"]` | `AuthTokenEnhancer` |
| `userPermissions` | `{"ROLES": ["ALL"]}` | `AuthTokenEnhancer` |
| `exp` | `now + 900s` | `CustomTokenService` |

---

## ⚠️ Notable Architecture Observations

> [!WARNING]
> **Double DB Hit on Login** — `DBService.authoriseUser()` is called **twice** per login: once in `LoginResource` and again inside `CustomAuthenticationProvider` (via `LoginService`). This is a performance smell worth refactoring.

> [!CAUTION]
> **Password stored/transmitted in plain-text in userInfo claim** — The encrypted `oauthUserInfo` claim includes the raw password in the pipe-delimited string: `empId#userName#password#...`. Even though it is Jasypt-encrypted, the signing secret `123456` is hardcoded in properties — this is a **critical security risk** in production.

> [!NOTE]
> **Stateless JWT Token Store** — The app uses `JwtTokenStore` (no DB). Tokens cannot be invalidated server-side before expiry. Logout must be handled client-side by discarding the token.

> [!TIP]
> **ThreadLocal as Request Scoped Context** — `ServiceRequestThreadLocal` carries `UserPrincipal` through the entire login transaction chain. This is a common pattern but requires careful cleanup to avoid memory leaks in thread-pool environments. Ensure the thread local is cleared at the end of every request.

---

## 📋 Data Flow Summary Table

| Step | From | To | Data |
|---|---|---|---|
| 1 | Client | `LoginResource` | `LoginDTO {userName, passWord, ssoLogin}` |
| 2 | `LoginResource` | `DBService` | `LoginDTO` |
| 3 | `DBService` | MySQL | JDBC query on `employee_credentials` |
| 4 | MySQL | `DBService` | Employee row |
| 5 | `DBService` | `LoginResource` | `AuthenticateResponseDTO` |
| 6 | `LoginResource` | `TokenEndpoint` | OAuth2 params + auth token |
| 7 | `TokenEndpoint` | `CustomAuthenticationProvider` | credentials |
| 8 | `CustomAuthenticationProvider` | MySQL (again) | validates credentials |
| 9 | `LoginService` | `ServiceRequestThreadLocal` | Encrypted userInfo + LoginResponseDTO |
| 10 | `AuthTokenEnhancer` | JWT claims | `oauthUserInfo`, `authorities`, `userPermissions` |
| 11 | `JwtAccessTokenConverter` | Client | Signed JWT access + refresh tokens |
