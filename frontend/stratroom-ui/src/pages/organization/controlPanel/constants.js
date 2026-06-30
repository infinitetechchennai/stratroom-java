export const NAVY = '#2c2f6b'

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const CURRENCY_VIEWS = ['Actuals', 'Thousands (K)', 'Milions (M)', 'Billions (B)']
export const CURRENCIES = ['US dollars', 'Euro', 'Indian Rupee', 'UAE Dirham', 'Saudi Riyal', 'British Pound']
export const DATA_PERIODS = ['Month', 'Quarter', 'Half Year', 'Year']
export const IMPLEMENTATIONS = ['BSC', 'OKR', 'KPI']
export const IMPLEMENTATION_TYPES = ['Department', 'Employee', 'Organization']
export const LANGUAGES = ['English', 'Arabic', 'Amharic']
export const TIMEZONES = [
  '(GMT-12:00) International Date Line West',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT+00:00) UTC',
  '(GMT+01:00) Central European Time',
  '(GMT+03:00) Arabia Standard Time',
  '(GMT+03:00) East Africa Time',
  '(GMT+05:30) India Standard Time',
  '(GMT+08:00) China Standard Time',
]
export const SCHEDULER_TYPES = ['6 months', '3 months', 'Monthly', 'Now']
export const BACKUP_DURATIONS = ['Daily', 'Weekly', 'Monthly']
export const DAYS_OF_MONTH = Array.from({ length: 31 }, (_, i) => String(i + 1))
export const THEME_MODES = ['light', 'dark', 'system']

/** Submodule tags from ModuleCatalog — matches legacy controlpanel.js */
export const TAB_PERMISSIONS = {
  general: { submodule: 'General', editKey: 'privilegeUpdate' },
  themes: { submodule: 'Theme', editKey: 'privilegeUpdate' },
  license: { submodule: 'Licence', editKey: null },
  notification: { submodule: 'Notifications', editKey: 'privilegeUpdate' },
  security: { submodule: 'Security', editKey: 'privilegeUpdate' },
  backup: { submodule: 'Backup & Restore', editKey: 'privilegeUpdate' },
  scorecard: { submodule: 'Scorecard', editKey: 'privilegeUpdate' },
  risk: { submodule: 'Risk', editKey: 'privilegeUpdate' },
  workflow: null,
}

export const TABS = [
  { key: 'general', label: 'General', icon: 'Settings' },
  { key: 'themes', label: 'Themes', icon: 'Palette' },
  { key: 'license', label: 'License', icon: 'KeyRound' },
  { key: 'notification', label: 'Notification', icon: 'Bell' },
  { key: 'security', label: 'Security', icon: 'ShieldCheck' },
  { key: 'backup', label: 'Backup & Restore', icon: 'DatabaseBackup' },
  { key: 'scorecard', label: 'Scorecard', icon: 'BarChart3' },
  { key: 'risk', label: 'Risk', icon: 'AlertTriangle' },
  { key: 'workflow', label: 'Workflow Setting', icon: 'Workflow' },
]
