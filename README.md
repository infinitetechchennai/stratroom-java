<div align="center">

# StratRoom

**Multi-Governance Portal for Boards, Strategy, and Organizational Excellence**

[![Build & Deploy](https://github.com/infinitetechchennai/stratroom-java/actions/workflows/deploy.yml/badge.svg)](https://github.com/infinitetechchennai/stratroom-java/actions/workflows/deploy.yml)

</div>

---

## What is StratRoom?

StratRoom is a **multi-governance portal** built for organizations to manage their strategic planning, board oversight, and performance management in one unified platform. It supports:

- **Balanced Scorecards** — KPIs, objectives, and perspectives with live performance tracking
- **Board Governance** — Meeting management, task tracking, and board reporting
- **Initiatives & Risks** — Track strategic initiatives with progress and risk registers
- **Role-Based Access** — Board Chairpersons, CEOs, CFOs, CROs, and department heads each see their own tailored view
- **Multi-Department** — One deployment serving an entire organization across departments

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 17, Spring Boot 3, Spring Security (JWT), Spring Data JPA, R2DBC |
| **Database** | PostgreSQL 16 |
| **Frontend** | React 18, Vite, Bootstrap 5, ApexCharts |
| **Container** | Docker, Docker Compose |
| **Orchestration** | Kubernetes (k3s) |
| **CI/CD** | GitHub Actions → GHCR → SSH deploy |
| **Auth** | JWT + optional LDAP |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                            │
│              React 18 + Vite (Port 80)                  │
└───────────────────────┬─────────────────────────────────┘
                        │ /api/*
┌───────────────────────▼─────────────────────────────────┐
│            Spring Boot Backend (Port 8085)               │
│           JWT Auth · REST API · JPA + R2DBC             │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│               PostgreSQL 16 (Port 5432)                  │
│              Schema: orgstructure                        │
└─────────────────────────────────────────────────────────┘

          ┌──────────────────────────┐
          │  License Service (9080)  │  ← separate DB: stratroomlicense
          └──────────────────────────┘
```

---

## Quick Start (Docker Compose)

> **Prerequisites:** Docker Desktop installed and running.

**1. Clone the repo**
```bash
git clone https://github.com/infinitetechchennai/stratroom-java.git
cd stratroom-java
```

**2. Set up your environment file**
```bash
cp .env.example .env
```

Open `.env` and fill in your values — at minimum set:
```env
DB_PASSWORD=your_strong_password
JWT_SECRET=your_64_char_random_secret
JASYPT_PASSWORD=your_encryption_password
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_admin_password
```

**3. Start all services**
```bash
docker compose up -d --build
```

**4. Access the app**

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8085/api |
| License Service | http://localhost:9080 |

Login with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`.

---

## Environment Variables

All configuration is driven by `.env`. Copy `.env.example` to get started.

| Variable | Required | Description |
|---|---|---|
| `DB_USERNAME` | ✅ | PostgreSQL username |
| `DB_PASSWORD` | ✅ | PostgreSQL password |
| `JWT_SECRET` | ✅ | JWT signing secret (min. 32 chars) |
| `JASYPT_PASSWORD` | ✅ | Encryption key for sensitive config |
| `ADMIN_EMAIL` | ✅ | Initial admin user email (first run only) |
| `ADMIN_PASSWORD` | ✅ | Initial admin user password (first run only) |
| `MAIL_SMTP_PASSWORD` | ❌ | SMTP password (leave blank to disable emails) |
| `LDAP_BIND_PASSWORD` | ❌ | LDAP bind password (leave blank if not using LDAP) |
| `AWS_ENDPOINT_URL` | ❌ | S3-compatible endpoint (leave blank for local storage) |
| `AWS_BUCKET_NAME` | ❌ | S3 bucket name |
| `AWS_ACCESS_KEY` | ❌ | S3 access key |
| `AWS_SECRET_KEY` | ❌ | S3 secret key |

---

## Development Setup

### Backend (Spring Boot)

```bash
cd backend/stratroom-backend

# Create a local properties override (gitignored)
cp src/main/resources/application-local.properties.example \
   src/main/resources/application-local.properties

# Edit it to point at your local Postgres instance
# Then run:
./mvnw spring-boot:run
```

Backend runs on **http://localhost:8085**

### Frontend (React + Vite)

```bash
cd frontend/stratroom-ui
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

> The Vite dev proxy forwards `/api` calls to `http://localhost:8085` automatically.

### Database Schema

The full schema is in `backend/orgstructure_schema.sql`. To apply it to a fresh Postgres instance:

```bash
psql -U postgres -c "CREATE DATABASE clean;"
psql -U postgres -d clean -f backend/orgstructure_schema.sql
```

---

## Project Structure

```
stratroom-java/
│
├── backend/
│   ├── stratroom-backend/          # Main Spring Boot application
│   │   └── src/main/java/          # Java source code
│   ├── licenseservice/             # License validation microservice
│   ├── orgstructure_schema.sql     # Full database schema
│   └── application.properties      # Shared application config template
│
├── frontend/
│   └── stratroom-ui/               # React 18 + Vite frontend
│       ├── src/
│       │   ├── pages/              # Page components (Dashboard, Scorecard, Landing...)
│       │   ├── components/         # Reusable components
│       │   ├── context/            # React Context (Auth, Permissions, i18n)
│       │   ├── hooks/              # Custom hooks
│       │   ├── api/                # Axios API clients
│       │   └── utils/              # Helper utilities
│       ├── public/                 # Static assets
│       └── index.html
│
├── k8s/                            # Kubernetes manifests (production)
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── licenseservice-deployment.yaml
│   ├── postgres-deployment.yaml
│   └── secrets.yaml
│
├── docker/
│   └── init-db.sql                 # DB init script for Docker
│
├── Dockerfile.backend
├── Dockerfile.frontend
├── Dockerfile.licenseservice
├── docker-compose.yml              # Full local stack
├── nginx.conf                      # Nginx config for frontend container
└── .env.example                    # Environment variable template
```

---

## CI/CD Pipeline

Every push to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`:

```
Push to main
    │
    ▼
Bump version tag (e.g. v1.0.1)
    │
    ▼
Build & push 3 Docker images to GHCR
  ├── ghcr.io/org/stratroom-java-backend:latest
  ├── ghcr.io/org/stratroom-java-frontend:latest
  └── ghcr.io/org/stratroom-java-licenseservice:latest
    │
    ▼
Inject secrets into K8s manifests
    │
    ▼
Copy K8s manifests to VPS via SCP
    │
    ▼
SSH into VPS → kubectl apply → rollout restart
```

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|---|---|
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | JWT signing secret |
| `JASYPT_PASSWORD` | Jasypt encryption password |
| `ADMIN_PASSWORD` | Initial admin password |
| `VPS_HOST` | Your VPS IP address or hostname |
| `VPS_USERNAME` | SSH username on VPS |
| `VPS_SSH_KEY` | Private SSH key (paste full key content) |
| `VPS_PORT` | SSH port (usually `22`) |

---

## Kubernetes Deployment

The `k8s/` directory contains all manifests for a production deployment on a k3s cluster.

```bash
# Apply namespace first
kubectl apply -f k8s/namespace.yaml

# Apply all manifests
kubectl apply -f k8s/

# Check status
kubectl get pods -n stratroom-prod
kubectl get services -n stratroom-prod
```

---

## Import Templates

To onboard a new organization, use the CSV templates in `import-templates/`:

| File | Purpose |
|---|---|
| `01-organisation-import.csv` | Org/department structure |
| `02-users-import.csv` | User accounts |
| `DEPARTMENT-ID-MAPPING.csv` | Department ID reference |

Upload these via the admin panel after first login.

---

## License

Proprietary. All rights reserved — InfiniteTech Chennai.
