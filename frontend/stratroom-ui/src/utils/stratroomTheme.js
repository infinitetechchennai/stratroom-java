import { getThemeList } from '../api/controlPanelApi'

const DEFAULT_PRIMARY = '#2c2f6b'
const THEME_STORAGE_KEY = 'theme'

let systemThemeMedia = null
let systemThemeHandler = null

/** Normalize legacy rgb(...) or hex values for inputs and CSS. */
export function normalizeThemeColor(color) {
  if (!color || typeof color !== 'string') return DEFAULT_PRIMARY
  const trimmed = color.trim()
  if (trimmed.startsWith('#')) return trimmed
  const rgbMatch = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (rgbMatch) {
    const hex = [rgbMatch[1], rgbMatch[2], rgbMatch[3]]
      .map((n) => Number(n).toString(16).padStart(2, '0'))
      .join('')
    return `#${hex}`
  }
  return trimmed
}

function shadeHex(hex, percent) {
  const n = normalizeThemeColor(hex).replace('#', '')
  if (n.length !== 6) return hex
  const num = parseInt(n, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + percent))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent))
  const b = Math.min(255, Math.max(0, (num & 0xff) + percent))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/** light | dark | system → light | dark */
export function resolveThemeMode(themePreference) {
  const pref = (themePreference || 'light').toLowerCase()
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return pref === 'dark' ? 'dark' : 'light'
}

function detachSystemThemeWatcher() {
  if (systemThemeMedia && systemThemeHandler) {
    systemThemeMedia.removeEventListener('change', systemThemeHandler)
  }
  systemThemeMedia = null
  systemThemeHandler = null
}

function attachSystemThemeWatcher() {
  detachSystemThemeWatcher()
  if (!window.matchMedia) return

  systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  systemThemeHandler = () => {
    if (localStorage.getItem(THEME_STORAGE_KEY) !== 'system') return
    applyResolvedThemeMode('system')
  }
  systemThemeMedia.addEventListener('change', systemThemeHandler)
}

function applyResolvedThemeMode(themePreference) {
  const resolved = resolveThemeMode(themePreference)
  const root = document.documentElement
  root.setAttribute('data-theme', resolved)
  document.body?.setAttribute('data-bs-theme', resolved)
  document.body?.setAttribute('data-theme', resolved)

  document.querySelectorAll('.stratroom-shell').forEach((el) => {
    el.classList.remove('light', 'dark', 'system')
    el.classList.add(resolved)
  })

  if ((themePreference || '').toLowerCase() === 'system') {
    attachSystemThemeWatcher()
  } else {
    detachSystemThemeWatcher()
  }

  return resolved
}

function applyPrimaryCssVars(themeColor) {
  const color = normalizeThemeColor(themeColor)
  const vars = {
    '--primary': color,
    '--primary-color': color,
    '--primary-dark': shadeHex(color, -24),
    '--primary-light': shadeHex(color, 24),
  }
  const targets = [document.documentElement, ...document.querySelectorAll('.stratroom-shell')]
  targets.forEach((el) => {
    Object.entries(vars).forEach(([key, value]) => el.style.setProperty(key, value))
  })
}

/** Re-apply stored primary colour after shell mounts (init may run before .stratroom-shell exists). */
export function syncPrimaryColorFromStorage() {
  const color = localStorage.getItem('stratroomPrimaryColor') || localStorage.getItem('primaryColor')
  if (color) applyPrimaryCssVars(color)
}

/** Apply branding + theme mode across the React shell (legacy-compatible). */
export function applyStratroomTheme(theme = {}) {
  const themeColor = normalizeThemeColor(
    theme.themeColor || localStorage.getItem('stratroomPrimaryColor')
  )
  const themePreference = theme.themeName || localStorage.getItem(THEME_STORAGE_KEY) || 'light'
  const loginTheme = theme.loginTheme ?? localStorage.getItem('stratroomLoginTheme') ?? ''
  const loginLogo = theme.loginLogo ?? localStorage.getItem('stratroomLoginLogo') ?? ''

  localStorage.setItem('stratroomPrimaryColor', themeColor)
  localStorage.setItem('primaryColor', themeColor)
  localStorage.setItem(THEME_STORAGE_KEY, themePreference)
  if (loginTheme) localStorage.setItem('stratroomLoginTheme', loginTheme)
  if (loginLogo) localStorage.setItem('stratroomLoginLogo', loginLogo)

  applyPrimaryCssVars(themeColor)

  const resolved = applyResolvedThemeMode(themePreference)

  window.dispatchEvent(new CustomEvent('stratroom-theme-changed', {
    detail: {
      themeColor,
      themePreference,
      themeName: resolved,
      loginTheme,
      loginLogo,
    },
  }))
}

/** Call once on app boot so a cached system theme reacts to OS changes. */
export function initThemeModeFromStorage() {
  const pref = localStorage.getItem(THEME_STORAGE_KEY) || 'light'
  const color = localStorage.getItem('stratroomPrimaryColor')
  applyStratroomTheme({
    themeColor: color || DEFAULT_PRIMARY,
    themeName: pref,
  })
}

export function themeRowExists(row) {
  if (!row || typeof row !== 'object') return false
  return Number(row.orgId) > 0
}

export async function loadAndApplyOrgTheme(orgId) {
  if (!orgId) return null
  try {
    const row = await getThemeList(orgId)
    if (themeRowExists(row)) {
      applyStratroomTheme(row)
      return row
    }
  } catch (err) {
    console.warn('[Theme] could not load org theme', err)
  }
  initThemeModeFromStorage()
  return null
}
