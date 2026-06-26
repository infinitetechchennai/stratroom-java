import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from '../context/PermissionsContext'
import { useI18n } from '../context/I18nContext'
import UserMenu from './UserMenu'
import { pagesForNavModule, isScorecardPageType } from '../utils/navPageGroups'

const NAV_LABEL_KEYS = {
  Plan: 'nav.plan', Measure: 'nav.measure', Execute: 'nav.execute',
  Govern: 'nav.govern', Meet: 'nav.meet', Report: 'nav.report',
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
  const { t } = useI18n()
  const [openModule, setOpenModule] = useState(null)

  const handlePageClick = (page) => {
    if (isScorecardPageType(page.pageType)) {
      navigate(`/scorecard?pageId=${page.id}`)
    } else {
      navigate(`/dashboard/${page.createdBy}?pageId=${page.id}`)
    }
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
            height="32"
            style={{ width: 'auto', maxHeight: 32 }}
            src="/images/logo.png"
            alt="StratRoom"
            onError={(e) => { e.currentTarget.src = '/images/logo-icon.svg' }}
          />
        </a>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto menulistaccess">
            {NAV_MODULES.map(({ key, label }) => {
              if (!isModuleVisible(key === 'Report' ? 'Reports' : key)) return null
              const modulePages = pagesForNavModule(pages, key)
              const isOpen = openModule === key

              return (
                <li key={key} className="nav-item dropdown position-relative">
                  <button
                    type="button"
                    className="nav-link dropdown-toggle border-0 bg-transparent"
                    aria-expanded={isOpen}
                    onClick={() => setOpenModule(isOpen ? null : key)}
                  >
                    {t(NAV_LABEL_KEYS[key]) || label}
                  </button>
                  {isOpen && (
                    <ul
                      className="dropdown-menu border-0 shadow-sm submenu show"
                      style={{ maxHeight: '70vh', overflowY: 'auto', minWidth: '12rem' }}
                    >
                      {modulePages.length > 0 ? modulePages.map((page) => (
                        <li key={page.id}>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => handlePageClick(page)}
                          >
                            {page.pageName}
                          </button>
                        </li>
                      )                      ) : (
                        key !== 'Govern' && key !== 'Execute' && (
                          <li>
                            <span className="dropdown-item text-muted" style={{ cursor: 'default' }}>
                              {key === 'Measure' ? 'No scorecards yet' : 'No pages yet'}
                            </span>
                          </li>
                        )
                      )}
                      {key === 'Execute' && (
                        <>
                          <li key="initiatives-register">
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => { navigate('/initiatives-register'); setOpenModule(null); }}
                            >
                              Initiatives Register
                            </button>
                          </li>
                          <li key="initiatives-dashboard">
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => { navigate('/initiatives-dashboard'); setOpenModule(null); }}
                            >
                              Initiatives Dashboard
                            </button>
                          </li>
                        </>
                      )}
                      {key === 'Govern' && (
                        <>
                          <li key="risk-register">
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => { navigate('/risk-register'); setOpenModule(null); }}
                            >
                              Risk Register
                            </button>
                          </li>
                          <li key="risk-dashboard">
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => { navigate('/risk-dashboard'); setOpenModule(null); }}
                            >
                              Risk Dashboard
                            </button>
                          </li>
                          <li key="compliance-register">
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => { navigate('/compliance-register'); setOpenModule(null); }}
                            >
                              Compliance Register
                            </button>
                          </li>
                          <li key="compliance-dashboard">
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => { navigate('/compliance-dashboard'); setOpenModule(null); }}
                            >
                              Compliance Dashboard
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
          <UserMenu />
        </div>
      </div>
    </nav>
  )
}
