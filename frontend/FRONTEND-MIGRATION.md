# Frontend Migration Report

**Migration:** Legacy JSP/jQuery (stratroom-web) → React 18 + Vite (stratroom-ui)

---

## 1. Tech Stack

**Status: DONE**

| Package | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| React DOM | 18.3.1 | DOM rendering |
| React Router DOM | 6.24.0 | Client-side routing |
| Vite | 5.3.1 | Build tool / dev server |
| Axios | 1.7.2 | HTTP client |
| ApexCharts | 5.15.0 | Charts and graphs |
| react-apexcharts | 2.1.0 | React wrapper for ApexCharts |
| Lucide React | 1.17.0 | Icon library |
| jsPDF | 4.2.1 | PDF export |
| jspdf-autotable | 5.0.8 | PDF table export |
| xlsx | 0.18.5 | Excel export |

---

## 2. Component Pattern

**Status: DONE — All functional components with hooks**

No class components found anywhere. All components use:
- Functional components
- React hooks (`useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`)
- Context API for global state

---

## 3. Project Structure

```
stratroom-ui/
├── package.json
├── vite.config.js
├── index.html
├── public/
└── src/
    ├── App.jsx              # Root — BrowserRouter + Providers
    ├── main.jsx             # Entry point
    ├── routes/
    │   └── AppRoutes.jsx    # All route definitions
    ├── context/
    │   ├── AuthContext.jsx          # Auth state (login, token, user)
    │   ├── PermissionsContext.jsx   # Role-based access control
    │   └── I18nContext.jsx          # Internationalisation
    ├── pages/
    │   ├── auth/            # Login, register pages
    │   ├── dashboard/       # Main dashboard
    │   ├── scorecard/       # Scorecard module (ACTIVE)
    │   ├── scorecard_temp/  # Scorecard WIP copy (needs review)
    │   ├── initiatives/     # Initiatives module
    │   ├── initiativesview/ # Initiatives read-only view
    │   ├── organization/    # Org chart and structure
    │   ├── my-forms/        # Forms/surveys module
    │   ├── scorecardview/   # Scorecard read-only view
    │   ├── shared/          # Shared/common pages
    │   └── check/           # Health check page
    ├── components/
    │   └── scorecard/       # Reusable scorecard components
    ├── api/                 # API endpoint definitions
    ├── services/            # Business logic services
    ├── hooks/               # Custom React hooks
    ├── utils/               # Utility functions
    ├── data/                # Static data / constants
    ├── styles/              # Global CSS
    ├── i18n/                # Translation files
    └── assets/              # Images, icons
```

**Total source files: 375**

---

## 4. Routing

**Status: DONE — React Router v6**

Using React Router v6 with v7 future flags enabled:
```jsx
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

---

## 5. Global State

**Status: DONE — React Context API**

| Context | Purpose |
|---|---|
| `AuthContext` | User login state, JWT token, user profile |
| `PermissionsContext` | Role-based access control per module |
| `I18nContext` | Multi-language / translation support |

---

## 6. Pages Inventory

| Module | Folder | Status |
|---|---|---|
| Authentication | `pages/auth/` | Done |
| Dashboard | `pages/dashboard/` | Done |
| Scorecard | `pages/scorecard/` | Done |
| Scorecard (temp WIP) | `pages/scorecard_temp/` | Needs review |
| Initiatives | `pages/initiatives/` | Done |
| Initiatives View | `pages/initiativesview/` | Done |
| Organization | `pages/organization/` | Done |
| My Forms | `pages/my-forms/` | Done |
| Scorecard View | `pages/scorecardview/` | Done |
| Shared | `pages/shared/` | Done |

---

## 7. Remaining Items

### Must fix before production
| Item | Action |
|---|---|
| `scorecard_temp/` folder exists | Review — merge into `scorecard/` or delete |
| No API proxy in vite.config.js | Add proxy to avoid CORS issues in local dev |

### Recommended improvements
| Item | Action |
|---|---|
| `xlsx 0.18.5` has security advisories | Upgrade to `exceljs` or `xlsx 0.20.x` |
| No test setup | Add `vitest` + `@testing-library/react` |
| No TypeScript | Consider migrating to `.tsx` for type safety |

---

## 8. Fix API Proxy (CORS for local dev)

Check your `vite.config.js`. If proxy is missing, add it:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true
      }
    }
  }
})
```

---

## 9. How to Run

```bash
# Install dependencies
cd D:/Stratroom-Source/Stratroom-Source/stratroom-ui
npm install

# Start dev server
npm run dev
# Runs at http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

> Make sure `stratroom-backend` is running on port 8085 before starting the frontend.
