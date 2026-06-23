import { useState, useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Settings, Palette, KeyRound, Bell, ShieldCheck, CalendarClock,
  MonitorSmartphone, DatabaseBackup, BarChart3, Target, AlertTriangle, Workflow,
} from 'lucide-react'
import { TABS } from './controlPanel/constants'
import { useControlPanelPermissions } from './controlPanel/useControlPanelPermissions'
import { GeneralSettingsTab } from './controlPanel/GeneralSettingsTab'
import { LicenseSettingsTab, DeviceSettingsTab, OkrInfoTab } from './controlPanel/LicenseDeviceTabs'
import { ThemeSettingsTab, SecuritySettingsTab } from './controlPanel/ThemeSecurityTabs'
import { NotificationSettingsTab, SchedulerSettingsTab, BackupSettingsTab } from './controlPanel/NotificationSchedulerBackupTabs'
import { ScorecardSettingsTab, RiskSettingsTab } from './controlPanel/ScorecardRiskTabs'
import { WorkflowSettingsTab } from './controlPanel/WorkflowSettingsTab'
import './controlPanel/controlPanel.css'

const ICONS = {
  Settings, Palette, KeyRound, Bell, ShieldCheck, CalendarClock,
  MonitorSmartphone, DatabaseBackup, BarChart3, Target, AlertTriangle, Workflow,
}

function usePrimaryColor() {
  const [primary, setPrimary] = useState(
    () => getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#2c2f6b'
  )
  useEffect(() => {
    const sync = (e) => {
      const c = e?.detail?.themeColor
        || getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
      if (c) setPrimary(c)
    }
    window.addEventListener('stratroom-theme-changed', sync)
    return () => window.removeEventListener('stratroom-theme-changed', sync)
  }, [])
  return primary
}

export default function Controlpanel() {
  const { loading, canAccessPage, canViewTab, canEditTab } = useControlPanelPermissions()
  const primary = usePrimaryColor()
  const visibleTabs = useMemo(
    () => TABS.filter((t) => canViewTab(t.key)),
    [canViewTab]
  )
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    if (visibleTabs.length && !visibleTabs.some((t) => t.key === activeTab)) {
      setActiveTab(visibleTabs[0].key)
    }
  }, [visibleTabs, activeTab])

  if (loading) {
    return (
      <div className="control-panel-page" style={{ padding: 40, color: 'var(--shell-muted)' }}>
        Loading control panel…
      </div>
    )
  }

  if (!canAccessPage) {
    return <Navigate to="/" replace />
  }

  const renderTab = () => {
    const canEdit = canEditTab(activeTab)
    switch (activeTab) {
      case 'general': return <GeneralSettingsTab canEdit={canEdit} />
      case 'themes': return <ThemeSettingsTab canEdit={canEdit} />
      case 'license': return <LicenseSettingsTab />
      case 'notification': return <NotificationSettingsTab canEdit={canEdit} />
      case 'security': return <SecuritySettingsTab canEdit={canEdit} />
      case 'scheduler': return <SchedulerSettingsTab canEdit={canEdit} />
      case 'device': return <DeviceSettingsTab />
      case 'backup': return <BackupSettingsTab canEdit={canEdit} />
      case 'scorecard': return <ScorecardSettingsTab canEdit={canEdit} />
      case 'okr': return <OkrInfoTab />
      case 'risk': return <RiskSettingsTab canEdit={canEdit} />
      case 'workflow': return <WorkflowSettingsTab canEdit={canEdit} />
      default: return null
    }
  }

  return (
    <div className="control-panel-page">
      <h4 className="control-panel-title">
        <Settings size={20} color={primary} /> CONTROL PANEL
      </h4>

      <div className="control-panel-grid">
        <div className="control-panel-tabs">
          {visibleTabs.map(({ key, label, icon }) => {
            const Icon = ICONS[icon]
            const active = activeTab === key
            return (
              <button
                key={key}
                type="button"
                className={`control-panel-tab${active ? ' active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={22} />
                <span>{label}</span>
              </button>
            )
          })}
        </div>
        <div>{renderTab()}</div>
      </div>
    </div>
  )
}
