import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import DatePeriodPicker from './DatePeriodPicker'

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'ع' },
]

// Left-side app icons. `path: null` = page not built yet (button shows tooltip, no nav).
const APP_ICONS = [
  {
    key: 'orgStructure', path: '/org-structure',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/>
        <path d="M12 8v4M12 12H5v4M12 12h7v4"/>
      </svg>
    ),
  },
  {
    key: 'title', path: null,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V5h16v2M9 20h6M12 5v15"/>
      </svg>
    ),
  },
  {
    key: 'etl', path: null,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>
      </svg>
    ),
  },
  {
    key: 'master', path: null,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
]

export default function TopUtilityBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang, t } = useI18n()
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    if (!langOpen) return
    const close = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [langOpen])

  const current = LANGS.find(l => l.code === lang) || LANGS[0]

  return (
    <div className="navbar-topbar">
      <div className="container-lg d-flex flex-wrap justify-content-between align-items-stretch" style={{ minHeight: 38 }}>
        <div className="menu-controls d-flex align-items-center gap-1">
          {APP_ICONS.map(({ key, path, icon }) => {
            const active = path && location.pathname === path
            return (
              <button
                key={key}
                type="button"
                className="control-link border-0 bg-transparent d-inline-flex align-items-center justify-content-center"
                title={t(`nav.${key}`)}
                onClick={() => { if (path) navigate(path) }}
                style={{
                  width: 32, height: 32, borderRadius: 8, cursor: path ? 'pointer' : 'default',
                  color: active ? 'var(--cyan, #00C4C4)' : '#475569',
                  background: active ? 'rgba(0,196,196,.12)' : 'transparent',
                  opacity: path ? 1 : 0.55,
                }}
              >
                {icon}
              </button>
            )
          })}
        </div>

        <div className="menu-controls global-control d-flex flex-wrap align-items-center gap-2">
          <DatePeriodPicker />

          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              type="button"
              className="control-link d-inline-flex align-items-center gap-1 border-0 bg-transparent"
              style={{ fontSize: 12, cursor: 'pointer' }}
              title={t('common.language')}
              onClick={() => setLangOpen(o => !o)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {current.short}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {langOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  insetInlineEnd: 0,
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  boxShadow: '0 8px 24px rgba(11,20,55,.14)',
                  minWidth: 140,
                  zIndex: 9999,
                  padding: '4px 0',
                  textAlign: 'start',
                }}
              >
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8,
                      width: '100%',
                      border: 'none',
                      background: l.code === lang ? 'rgba(0,196,196,.10)' : 'none',
                      color: l.code === lang ? '#009999' : '#334155',
                      fontWeight: l.code === lang ? 700 : 500,
                      textAlign: 'start',
                      padding: '8px 14px',
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{l.label}</span>
                    <span style={{ fontSize: 11, opacity: .6 }}>{l.short}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
