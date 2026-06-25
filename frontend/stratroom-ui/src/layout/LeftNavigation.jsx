import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePermissions } from '../context/PermissionsContext'
import { pagesForNavModule, isScorecardPageType } from '../utils/navPageGroups'
import styles from './LeftNavigation.module.css'

const NAV_MODULES = [
  { key: 'Plan', label: 'Plan' },
  { key: 'Measure', label: 'Measure' },
  { key: 'Execute', label: 'Execute' },
  { key: 'Govern', label: 'Govern' },
  { key: 'Reports', label: 'Reports' },
  { key: 'Meet', label: 'Meet' },
]

export default function LeftNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pages, isModuleVisible } = usePermissions()
  const [openModule, setOpenModule] = useState(null)

  const getPages = (moduleKey) => pagesForNavModule(pages, moduleKey)

  const handleModuleClick = (key) => {
    setOpenModule((prev) => (prev === key ? null : key))
  }

  const handlePageClick = (page) => {
    if (isScorecardPageType(page.pageType)) {
      navigate(`/scorecard?pageId=${page.id}`)
    } else {
      navigate(`/dashboard/${page.createdBy}?pageId=${page.id}`)
    }
    setOpenModule(null)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate('/dashboard')}>
        <span className={styles.logoText}>StratRoom</span>
      </div>

      <ul className={styles.moduleList}>
        {NAV_MODULES.map(({ key, label }) => {
          if (!isModuleVisible(key)) return null
          const modulePages = getPages(key)
          const isOpen = openModule === key
          const isActive = location.pathname.includes(`/${key.toLowerCase()}`)

          return (
            <li key={key} className={`${styles.moduleItem} ${isActive ? styles.activeModule : ''}`}>
              <button
                className={`${styles.moduleBtn} ${isOpen ? styles.open : ''}`}
                onClick={() => handleModuleClick(key)}
              >
                <span className={styles.moduleLabel}>{label}</span>
                {(modulePages.length > 0 || key === 'Govern' || key === 'Execute') && (
                  <ChevronIcon className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
                )}
              </button>

              {isOpen && (modulePages.length > 0 || key === 'Govern' || key === 'Execute' || modulePages.length === 0) && (
                <ul className={styles.submenu}>
                  {modulePages.map((page) => (
                    <li key={page.id}>
                      <button
                        className={styles.submenuItem}
                        onClick={() => handlePageClick(page)}
                      >
                        {page.pageName}
                        {page.pinned === 'true' && <PinIcon className={styles.pinIcon} />}
                      </button>
                    </li>
                  ))}
                  {key === 'Execute' && (
                    <>
                      <li key="initiatives-register">
                        <button
                          className={styles.submenuItem}
                          onClick={() => { navigate('/initiatives-register'); setOpenModule(null); }}
                        >
                          Initiatives Register
                        </button>
                      </li>
                      <li key="initiatives-dashboard">
                        <button
                          className={styles.submenuItem}
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
                          className={styles.submenuItem}
                          onClick={() => { navigate('/risk-register'); setOpenModule(null); }}
                        >
                          Risk Register
                        </button>
                      </li>
                      <li key="risk-dashboard">
                        <button
                          className={styles.submenuItem}
                          onClick={() => { navigate('/risk-dashboard'); setOpenModule(null); }}
                        >
                          Risk Dashboard
                        </button>
                      </li>
                      <li key="compliance-register">
                        <button
                          className={styles.submenuItem}
                          onClick={() => { navigate('/compliance-register'); setOpenModule(null); }}
                        >
                          Compliance Register
                        </button>
                      </li>
                      <li key="compliance-dashboard">
                        <button
                          className={styles.submenuItem}
                          onClick={() => { navigate('/compliance-dashboard'); setOpenModule(null); }}
                        >
                          Compliance Dashboard
                        </button>
                      </li>
                    </>
                  )}
                  {modulePages.length === 0 && key !== 'Govern' && key !== 'Execute' && (
                    <li className={styles.emptyItem}>
                      {key === 'Measure' ? 'No scorecards yet' : 'No pages yet'}
                    </li>
                  )}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function PinIcon({ className }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}
