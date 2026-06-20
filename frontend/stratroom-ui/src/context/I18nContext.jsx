import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from '../i18n/translations'

const I18nContext = createContext(null)

const STORAGE_KEY = 'app_language'
const SUPPORTED = ['en', 'ar']

function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return SUPPORTED.includes(saved) ? saved : 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Reflect the language + direction on <html> so CSS and the browser pick up RTL.
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return
    localStorage.setItem(STORAGE_KEY, next)
    setLangState(next)
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'ar' : 'en')
  }, [lang, setLang])

  // t('org.title') → looks up the dotted key, falls back to English, then the key itself.
  const t = useCallback((key) => {
    const lookup = (dict) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict)
    return lookup(translations[lang]) ?? lookup(translations.en) ?? key
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, dir, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
