import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LeftNavigation from './LeftNavigation'
import TopNavigation from './TopNavigation'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`${styles.shell} ${sidebarOpen ? styles.sideOpen : styles.sideClosed}`}>
      <aside className={styles.sidebar}>
        <LeftNavigation />
      </aside>

      <div className={styles.main}>
        <TopNavigation onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
