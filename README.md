# Stratroom

Stratroom is a strategy & performance-management platform — covering organization
structure, KPIs and scorecards, initiatives, budgets, audit/compliance, and
reporting. This repository contains the **backend services**, built as a Maven
multi-module project on Spring Boot.

> The web frontend lives in a separate repository:
> [`UI-Stratroom`](https://github.com/infinitetechchennai/UI-Stratroom) (React + Vite).

## Tech stack

| | |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.3.6 |
| Build | Maven (multi-module, parent `com.estrat:stratroom-parent`) |
| Database | MySQL 8 (`orgstructure`, and `stratroomlicense` for licensing) |
| Auth | JWT + Jasypt (PBE) password encryption |

## Modules

All modules live under [`stack-service/`](stack-service/) and are aggregated by the
root [`pom.xml`](pom.xml).

| Module | Port | Database | Purpose |
|---|---|---|---|
| [`stratroom-backend`](stack-service/stratroom-backend/) | 8085 | `orgstructure` | **Consolidated single backend** — the merged application that combines auth, user, scorecard, and data domains. This is the primary service to run. |
| [`stratroom-web`](stack-service/stratroom-web/) | 8080 | — | Legacy Spring MVC web application (server-rendered UI + static assets). |
| [`authservice`](stack-service/authservice/) | 8081 | `orgstructure` | Authentication & JWT issuance. |
| [`userservice`](stack-service/userservice/) | 8082 | `orgstructure` | User and profile management. |
| [`db-service`](stack-service/db-service/) | 8083 | `orgstructure` | Core data / persistence service. |
| [`scorecard-service`](stack-service/scorecard-service/) | 8084 | `orgstructure` | KPIs, scorecards, and performance tracking. |
| [`etl-service`](stack-service/etl-service/) | 8086 | `orgstructure` | Data import / ETL jobs. |
| [`licenseservice`](stack-service/licenseservice/) | 9080 | `stratroomlicense` | License generation and validation. |

> The standalone per-domain services (`authservice`, `userservice`, `db-service`,
> `scorecard-service`) are being consolidated into `stratroom-backend`. For most
> work, run `stratroom-backend`; the individual services are retained for
> reference and incremental migration.

## Prerequisites

- **JDK 21**
- **Maven 3.9+**
- **MySQL 8** with the `orgstructure` database created (and `stratroomlicense` if
  you run the license service)
- Environment variable **`JWT_SECRET`** — required by the auth-enabled services
  (no insecure default is shipped). It must be identical across services that
  share tokens.

## Configuration

Each service reads from a Spring `application.properties` (under
`src/main/resources/`, or an external `*-service.properties` for some modules).
The datasource defaults to:

```
spring.datasource.url=jdbc:mysql://localhost:3306/orgstructure
```

> ⚠️ The committed datasource passwords are **local-development placeholders only**
> (e.g. `123456`). Override them — and always provide `JWT_SECRET` — via
> environment variables or an external config file before deploying anywhere real.

## Build

From the repository root:

```bash
mvn clean install
```

This builds the parent and all modules.

## Run

Run the consolidated backend:

```bash
cd stack-service/stratroom-backend
mvn spring-boot:run
```

Or run any other module the same way (swap the directory). Each service starts on
its own port (see the table above).

To run a packaged jar instead:

```bash
mvn clean package
java -jar stack-service/stratroom-backend/target/*.jar
```

## Project structure

```
.
├── pom.xml                     # Parent / aggregator POM
├── stack-service/              # All backend services
│   ├── stratroom-backend/      # Consolidated backend (primary)
│   ├── stratroom-web/          # Legacy MVC web app
│   ├── authservice/
│   ├── userservice/
│   ├── db-service/
│   ├── scorecard-service/
│   ├── etl-service/
│   └── licenseservice/
├── documents/                  # API and design notes
├── orgstructure-tables.txt     # Reference DB schema notes
└── SECURITY-ASSESSMENT.*       # Security assessment report
```

## Notes

- Build output (`target/`, `bin/`), IDE metadata, and `node_modules/` are
  git-ignored — keep generated artifacts out of commits.
- The frontend is maintained separately in
  [`UI-Stratroom`](https://github.com/infinitetechchennai/UI-Stratroom).
