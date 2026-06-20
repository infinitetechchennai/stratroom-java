# Backend Migration Report

**Migration:** Java 11 → Java 21 | Spring Boot 2.x → 3.3.6 | MySQL → PostgreSQL

---

## 1. Java Version

**Status: DONE**

All modules use Java 21 via the parent `pom.xml`:
```xml
<properties>
    <java.version>21</java.version>
</properties>
```

### Java 21 Features Now Available
- Virtual threads (Project Loom) — for high-concurrency HTTP handling
- Record classes — for lightweight DTOs
- Pattern matching for switch
- Sealed classes
- Text blocks

---

## 2. Spring Boot Version

**Status: DONE**

All modules inherit from parent:
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.6</version>
</parent>
```

---

## 3. javax → jakarta Migration

**Status: DONE**

Spring Boot 3.x requires Jakarta EE 9+ (`jakarta.*` namespace).

### Checked — No old EE imports found
- `javax.persistence.*` → `jakarta.persistence.*` — CLEAN
- `javax.servlet.*` → `jakarta.servlet.*` — CLEAN
- `javax.validation.*` → `jakarta.validation.*` — CLEAN

### javax imports still present (these are fine)
| Import | Why it is OK |
|---|---|
| `javax.sql.DataSource` | Java SE standard library — NOT renamed to jakarta |
| `javax.crypto.*` | Java SE standard library — NOT renamed to jakarta |

---

## 4. Spring Security

**Status: DONE**

**Old pattern (Spring Boot 2.x — deprecated):**
```java
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) { ... }
}
```

**New pattern in use (Spring Boot 3.x / Spring Security 6):**
```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
            AuthenticationConfiguration authConfig) throws Exception { ... }
}
```

**Files confirmed using new pattern:**
- `authservice/src/main/java/com/estrat/service/auth/config/SecurityConfig.java`
- `stratroom-backend/src/main/java/com/estrat/backend/auth/config/SecurityConfig.java`
- `stratroom-web/src/main/java/com/estrat/web/security/SecurityConfig.java`

---

## 5. MySQL → PostgreSQL Migration

**Status: DONE**

### pom.xml — all 7 services updated
```xml
<!-- REMOVED -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>9.1.0</version>
</dependency>

<!-- ADDED -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Properties files — all services updated
```properties
# BEFORE
spring.datasource.url=jdbc:mysql://localhost:3306/orgstructure?useSSL=false&serverTimezone=UTC
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
datasource=mysql
dp.port=3306

# AFTER
spring.datasource.url=jdbc:postgresql://localhost:5432/orgstructure
spring.datasource.driverClassName=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
datasource=postgresql
dp.port=5432
```

### Java code changes
| File | What Changed |
|---|---|
| `DBService.java` (authservice + backend) | `Class.forName` driver → `org.postgresql.Driver` |
| `AuthServiceApplication.java` | Default driver class in `@Value` updated |
| `OrgChartLiteController.java` (scorecard + backend) | JDBC URL defaults + `Class.forName` updated |
| `NodeKeyGenerators.java` (db-service + backend) | Removed MySQL `FROM DUAL` query |
| `EmployeeDAO.java` (db-service + backend) | Removed `datasource.equals("mysql")` branch |
| `BackupUtil.java` (db-service + backend) | `mysqldump` → `pg_dump`, `mysql` → `pg_restore` |
| `KPIDAO.java` (db-service + backend) | `OPTION (MAXRECURSION)` → `WITH RECURSIVE` (PostgreSQL CTE) |

### Database schema files generated
| File | Purpose |
|---|---|
| `orgstructure_schema.sql` | Clean PostgreSQL schema — tables only, no data |
| `orgstructure_postgresql.sql` | PostgreSQL schema with all existing data |

---

## 6. Modules Overview

| Module | Port | Java | Spring Boot | Database | Notes |
|---|---|---|---|---|---|
| `stratroom-backend` | 8085 | 21 | 3.3.6 | orgstructure | **PRIMARY** — consolidated backend |
| `stratroom-web` | 8080 | 21 | 3.3.6 | — | Legacy WAR, JSP-based |
| `authservice` | 8081 | 21 | 3.3.6 | orgstructure | Merged into stratroom-backend |
| `userservice` | 8082 | 21 | 3.3.6 | orgstructure | Merged into stratroom-backend |
| `db-service` | 8083 | 21 | 3.3.6 | orgstructure | Merged into stratroom-backend |
| `scorecard-service` | 8084 | 21 | 3.3.6 | orgstructure | Merged into stratroom-backend |
| `etl-service` | 8086 | 21 | 3.3.6 | orgstructure | Merged into stratroom-backend |
| `licenseservice` | 9080 | 21 | 3.3.6 | stratroomlicense | Standalone |

---

## 7. Remaining Items

### Minor warnings
| Item | Location | Action Needed |
|---|---|---|
| `spring.jpa.hibernate.naming-strategy` deprecated | `stratroom-backend/application.properties` | Replace with `spring.jpa.hibernate.naming.implicit-strategy` |
| `@GenericGenerator(strategy="native")` deprecated | `OrgLicenseDetails.java` | Replace with `@GeneratedValue(strategy=GenerationType.IDENTITY)` |
| `commons-fileupload 1.5` | `stratroom-web/pom.xml` | Upgrade to 2.x for Jakarta EE compatibility |

### Legacy modules (kept for reference, not active)
- `stratroom-web` — replaced by React frontend (`stratroom-ui`)
- Individual microservices — replaced by `stratroom-backend`

---

## 8. Build and Run

```bash
# Build all modules
cd D:/Stratroom-Source/Stratroom-Source
mvn clean install -DskipTests

# Run main backend (port 8085)
cd stack-service/stratroom-backend
mvn spring-boot:run

# Run license service (port 9080) — separate
cd stack-service/licenseservice
mvn spring-boot:run
```

### Environment variables required
```bash
JWT_SECRET=your_secret_key_here
```
