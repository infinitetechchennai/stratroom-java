import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from '../context/PermissionsContext'

const PAGE_TYPE_GROUPS = {
  Plan: (p) =>
    p.groupType === 'Plan' ||
    ['SWOT', 'PESTEL', 'Strategy Map', 'Strategy Formulation',
      'Project Formulation', 'Audit Management', 'AuditManagement'].includes(p.pageType),
  Measure: (p) =>
    p.groupType === 'Measure' || p.pageType === 'Standard_View',
  Execute: (p) =>
    p.groupType === 'Execute' ||
    ['Initiatives & Projects', 'Task', 'Budget', 'Approval Page'].includes(p.pageType),
  Govern: (p) =>
    p.groupType === 'Govern' ||
    ['Risk', 'Risk Formulation', 'Risk View', 'RiskEvent', 'Risk Radar',
      'Impact Assesment', 'Process Enabaler', 'Rpo', 'Compliance',
      'Audit Management'].includes(p.pageType),
  Meet: (p) =>
    p.groupType === 'Meet' || p.pageType === 'Meetings',
  Report: (p) =>
    p.groupType === 'Report' ||
    ['Cockpit', 'Charts', 'My Performance', 'My Space'].includes(p.pageType),
}

const NAV_MODULES = [
  { key: 'Plan', label: 'Plan' },
  { key: 'Measure', label: 'Measure' },
  { key: 'Execute', label: 'Execute' },
  { key: 'Govern', label: 'Govern' },
  { key: 'Meet', label: 'Meet' },
  { key: 'Report', label: 'Report' },
]

export default function MainNavigation() {
  const navigate = useNavigate()
  const { pages, isModuleVisible } = usePermissions()
  const [openModule, setOpenModule] = useState(null)

  const getPages = (moduleKey) =>
    pages.filter((p) => PAGE_TYPE_GROUPS[moduleKey]?.(p) ?? false)

  const handlePageClick = (page) => {
    navigate(`/dashboard/${page.createdBy}?pageId=${page.id}`)
    setOpenModule(null)
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container-lg gap-2 gap-md-3">
        <a
          className="navbar-brand nav_float"
          href="/landing"
          onClick={(e) => { e.preventDefault(); navigate('/landing') }}
        >
          <img
            className="applogofinal"
            width="180"
            height="30"
            src="/images/stratroom-logo.svg"
            alt="StratRoom"
            onError={(e) => { e.currentTarget.src = '/images/logo-icon.svg' }}
          />
        </a>

        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto menulistaccess">
            {NAV_MODULES.map(({ key, label }) => {
              if (!isModuleVisible(key === 'Report' ? 'Reports' : key)) return null
              const modulePages = getPages(key)
              const isOpen = openModule === key

              return (
                <li key={key} className="nav-item dropdown">
                  <button
                    type="button"
                    className="nav-link dropdown-toggle border-0 bg-transparent"
                    onClick={() => setOpenModule(isOpen ? null : key)}
                  >
                    {label}
                  </button>
                  {isOpen && modulePages.length > 0 && (
                    <ul className="dropdown-menu border-0 shadow-sm submenu show">
                      {modulePages.map((page) => (
                        <li key={page.id}>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => handlePageClick(page)}
                          >
                            {page.pageName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
