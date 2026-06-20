# Stratroom UI — JSP → React Migration

This is the new **React frontend** for Stratroom, replacing the legacy JSP views in
`stratroom-web`. It is a standalone Single Page Application (SPA) that talks to the
existing backend **microservices** over HTTP (JWT auth).

---

## 1. Why this exists

The current frontend lives inside `stratroom-web` as **233 JSP files** mixing HTML, Java
and jQuery. This project replaces those pages with isolated, reusable React components —
**one `.jsx` file per page / modal / template** — while the backend stays as-is.

The backend is **already microservices**, so only the frontend changes:

```
[ stratroom-ui (React SPA) ]   <- this project
            |  HTTP + JWT
            v
[ stratroom-web / API gateway ]
   |          |              |
authservice  db-service  scorecard-service  ...  (etl, license, user)
```

---

## 2. Tech stack (target)

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Build tool     | Vite                            |
| Framework      | React 18 (`.jsx`)               |
| Routing        | react-router                    |
| Data fetching  | axios + (optional) react-query  |
| Auth           | JWT (from `authservice`)        |
| Charts         | Plotly / Recharts (replacing amCharts, FusionCharts) |

---

## 3. Folder structure

```
stratroom-ui/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── public/
└── src/
    ├── main.jsx                 # app entry
    ├── App.jsx                  # providers + router root
    │
    ├── api/                     # one file per backend service
    │   ├── axiosClient.js       # base URL + JWT interceptor
    │   ├── authApi.js
    │   ├── pageApi.js
    │   ├── riskApi.js
    │   ├── scorecardApi.js
    │   ├── initiativeApi.js
    │   └── kpiApi.js
    │
    ├── layout/                  # <- view/pages/common/*.jsp
    │   ├── AppLayout.jsx        # page shell wrapping all routes
    │   ├── TopNavigation.jsx    # <- top-navigation.jsp
    │   ├── LeftNavigation.jsx   # <- left-navigation.jsp
    │   ├── RightNavigation.jsx  # <- right-navigation.jsp
    │   ├── Header.jsx           # <- header.jsp
    │   ├── SideNav.jsx          # <- sidenav.jsp
    │   └── Footer.jsx           # <- footer.jsp
    │
    ├── components/              # shared, reused across features
    │   ├── ui/                  # Button, Card, Table, Tabs, Loader...
    │   ├── charts/              # Plotly / Recharts wrappers
    │   └── modals/              # generic modal shell
    │
    ├── context/
    │   └── AuthContext.jsx
    ├── routes/
    │   └── AppRoutes.jsx        # maps every page to a URL
    ├── hooks/
    ├── utils/
    ├── styles/
    │
    └── pages/                   # <- mirrors view/pages/ exactly
        ├── auth/
        │   └── LoginPage.jsx            # <- index.jsp
        ├── dashboard/
        │   └── Dashboard.jsx            # <- dashboard/dashboard.jsp
        ├── organization/               # 132 files (+ modal/, templates/)
        ├── initiatives/                # 28 files (+ modals/, template/)
        ├── initiativesview/            # 25 files (+ modals/, template/)
        └── scorecard/
            └── standardview/           # (+ modals/)
```

---

## 4. JSP → JSX mapping rules

Every JSP was converted to **one empty `.jsx` component**, folder tree preserved, file
names converted to **PascalCase**.

| JSP                                                   | React component                                         |
| ----------------------------------------------------- | ------------------------------------------------------- |
| `view/pages/index.jsp`                                | `src/pages/auth/LoginPage.jsx`                          |
| `view/pages/common/top-navigation.jsp`               | `src/layout/TopNavigation.jsx`                          |
| `view/pages/organization/risk.jsp`                   | `src/pages/organization/Risk.jsx`                       |
| `view/pages/organization/org_structure_new.jsp`      | `src/pages/organization/OrgStructureNew.jsx`            |
| `view/pages/organization/modal/riskDetailModal.jsp`  | `src/pages/organization/modal/RiskDetailModal.jsx`      |
| `view/pages/scorecard/standardview/modals/scorecard_modal.jsp` | `src/pages/scorecard/standardview/modals/ScorecardModal.jsx` |

**Conventions**

- **Pages** -> one `*.jsx` in the matching feature folder.
- **Modals** -> live in a `modal/` or `modals/` subfolder.
- **Templates** (reusable fragments) -> live in a `templates/` or `template/` subfolder.
- **Common navs/header/footer** -> `src/layout/`.
- **Shared widgets** (tables, buttons, chart wrappers) -> `src/components/`.

> All files are currently **empty placeholders** — no code yet.

---

## 5. Migration plan (incremental / strangler)

React runs alongside the JSP app; pages are migrated one at a time so the product stays
shippable throughout.

| Phase | Goal |
| ----- | ---- |
| **0. Foundations** | Switch auth to JWT, add CORS in `stratroom-web`, finalize page inventory. |
| **1. Scaffold**    | Vite + React + router + axios client + auth context. |
| **2. App shell**   | Login + layout (top/left/right nav) driven by `/pageList/{empId}`, `/pageTypeList`. |
| **3. Features**    | Migrate feature-by-feature (see order below); delete each JSP after its page works. |
| **4. Backend cleanup** | Convert remaining `@Controller` JSP endpoints to JSON; drop JSP/JSTL/jasper deps; `war` -> `jar`. |
| **5. Deploy**      | React deployed separately (Nginx/CDN) calling the microservices. |

**Suggested feature order (low -> high risk)**

1. Admin (roles, masters, user-role-management)
2. Scorecard views
3. Initiatives & Projects
4. Risk module (largest)
5. Dashboards & charts (most custom JS — do last)

---

## 6. Getting started (once scaffolding is filled in)

```bash
cd stratroom-ui
npm install
npm run dev      # starts Vite dev server (default http://localhost:5173)
```

Configure the backend base URL in `.env`:

```
VITE_API_BASE_URL=http://localhost:8080
```

---

## 7. Progress checklist

- [x] Project skeleton + empty component files created (251 files under `src/`)
- [ ] Base scaffold filled in (`package.json`, `vite.config.js`, `main.jsx`, `App.jsx`)
- [ ] Auth (login + JWT) working against `authservice`
- [ ] App layout + navigation
- [ ] Feature migration (track per folder)
- [ ] Backend JSP removal + `war` -> `jar`
- [ ] Separate deployment pipeline

---

## 8. Notes

- Backend services and ports are defined per module under each service's `*.properties`.
- This project does **not** modify the existing `stratroom-web` JSP app; migration happens
  page-by-page and JSPs are removed only after their React equivalent is verified.
