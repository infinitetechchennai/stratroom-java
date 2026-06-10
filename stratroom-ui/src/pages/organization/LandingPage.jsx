import { useAuth } from '../../context/AuthContext'
import { useLandingPageData } from '../../hooks/useLandingPageData'
import { LANDING_PAGE_TYPE_OPTIONS } from './landingPageConfig'
import {
  formatDueDate,
  getDisplayName,
  getInitials,
  getKpiTrendColor,
  getProgressClass,
  getRiskBadgeClass,
  getRiskDotClass,
  getTrendIconClass
} from './landingPageUtils'
import './LandingPage.css'

export default function LandingPage() {
  const { user } = useAuth()
  const empId = user?.empId ?? user?.id
  const {
    loading,
    error,
    userProfile,
    departments,
    selectedDeptId,
    selectedPageType,
    selectedPageId,
    filterPages,
    dashboard,
    setSelectedDeptId,
    setSelectedPageType,
    setSelectedPageId
  } = useLandingPageData(empId)

  const displayName = getDisplayName(userProfile || user)
  const initials = getInitials(displayName)
  const departmentName = userProfile?.departmentList?.[0]?.name || ''

  const handlePageSelect = (pageId) => {
    setSelectedPageId(pageId)
    const page = filterPages.find((p) => String(p.id) === String(pageId))
    if (page?.createdBy && page?.id) {
      window.location.href = `/dashboard/${page.createdBy}?pageId=${page.id}`
    }
  }

  return (
    <>
      <main className="landing-page-main">
        <section className="py-3 hero-section theme-default">
          <div
            className="blur-overlay hero-bg"
            style={{
              backgroundImage: 'url(/images/landing-bg.jpg), linear-gradient(135deg, #2d1b36 0%, #4a3f55 40%, #8b7355 100%)'
            }}
          />

          <div className="container-lg">
            <div className="d-flex flex-wrap justify-content-between align-items-start">
              <div className="hero-content hero-card mb-3">
                <div className="user-image user-active">
                  <div className="profileInitials_top">{initials}</div>
                </div>
                <div>
                  <h4>Hi <span>{displayName}</span></h4>
                  <small>welcome to your Multi-Governance Portal</small>
                </div>
              </div>

              <div className="d-flex gap-1 hero-header-action align-items-center flex-wrap">
                <select
                  className="form-select"
                  value={selectedDeptId}
                  onChange={(e) => setSelectedDeptId(e.target.value)}
                  disabled={loading && !departments.length}
                  style={selectStyle}
                >
                  <option value="">Choose department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select"
                  value={selectedPageType}
                  onChange={(e) => setSelectedPageType(e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Choose pageType</option>
                  {LANDING_PAGE_TYPE_OPTIONS.map((pt) => (
                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                  ))}
                </select>

                <select
                  className="form-select"
                  value={selectedPageId}
                  onChange={(e) => handlePageSelect(e.target.value)}
                  disabled={!selectedPageType || !filterPages.length}
                  style={selectStyle}
                >
                  <option value="">Choose Pages</option>
                  {filterPages.map((page) => (
                    <option key={page.id} value={page.id}>
                      {page.pageName}
                    </option>
                  ))}
                </select>

                <div className="ai-border">
                  <a
                    href="https://aidemo.stratroom.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ai-btn"
                  >
                    <i className="fas fa-wand-magic-sparkles" style={{ width: 16, height: 16 }} />
                    AI Mode
                  </a>
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-light rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#profileModal"
                  title="Profile"
                >
                  <i className="fas fa-user-circle" style={{ width: 16, height: 16 }} />
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-light rounded-pill"
                  title="About Me"
                >
                  <i className="fas fa-bullseye" style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-warning py-2 mb-2" role="alert">
                {error}
              </div>
            )}

            <div className="row">
              <div className="col-12 col-lg-9">
                <div className="card card-priorities custom-card bg-transparent shadow-none">
                  <div className="card-header bg-transparent border-0 px-0">
                    <h5 className="card-title text-white">My Priorities</h5>
                  </div>
                  <div className="card-body px-0">
                    <div className="d-flex flex-column gap-2">
                      <OverviewSection loading={loading} dashboard={dashboard} />

                      <InitiativesSection loading={loading} initiatives={dashboard.initiatives} />

                      <RisksSection loading={loading} risks={dashboard.risks} />

                      <KpisSection loading={loading} kpis={dashboard.kpis} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="modal custom-modal fade" id="profileModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Profile</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="card border-0">
                  <div className="card-body p-0">
                    <div
                      className="d-flex flex-column justify-content-center text-center gap-2 p-3 bg-primary rounded mb-3"
                      style={{ '--stratroom-bg-opacity': '0.1' }}
                    >
                      <div className="user-card justify-content-center">
                        <div className="user-imageprofile user-active">
                          <div className="profileInitials_top">{initials}</div>
                        </div>
                      </div>
                      <div>
                        <p className="mb-0 text-muted">{displayName}</p>
                        <p className="mb-0 text-muted">{departmentName}</p>
                        {userProfile?.emailAddress && (
                          <p className="mb-0 text-muted">{userProfile.emailAddress}</p>
                        )}
                        {userProfile?.designation && (
                          <p className="mb-0 text-muted">{userProfile.designation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="col-12 text-center py-2 copyright">
        <p className="mb-0">
          Copyright &copy; {new Date().getFullYear()}{' '}
          <strong>StratRoom</strong>
        </p>
      </footer>
    </>
  )
}

const selectStyle = {
  borderRadius: '5px',
  border: '1px solid #dddd',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundImage: 'none',
  width: '161px'
}

function OverviewSection({ loading, dashboard }) {
  const { meetings, tasks, meetingPageUrl, taskPageUrl } = dashboard

  return (
    <div className="overview-section" dir="ltr">
      <div className="d-flex gap-3 flex-wrap">
        <PriorityCard
          iconClass="fas fa-users"
          title="Meetings"
          value={meetings}
          loading={loading}
          actionUrl={meetingPageUrl}
        />
        <PriorityCard
          iconClass="fas fa-check-square"
          title="Total Task"
          value={tasks.total}
          loading={loading}
          actionUrl={taskPageUrl}
          subtitle={
            !loading && (tasks.completed > 0 || tasks.inProgress > 0)
              ? (
                <>
                  {tasks.completed > 0 && <span>Completed: {tasks.completed}</span>}
                  {tasks.inProgress > 0 && <span className="ms-2">InProgress: {tasks.inProgress}</span>}
                </>
              )
              : null
          }
        />
      </div>
    </div>
  )
}

function PriorityCard({ iconClass, title, value, loading, subtitle, actionUrl }) {
  const handleAction = () => {
    if (actionUrl) window.location.href = actionUrl
  }

  return (
    <div className="card text-start text-card text-card-main border shadow-sm" style={{ width: '250px' }}>
      <div className="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
        <div className="icon">
          <i className={`${iconClass} text-muted`} style={{ width: '18px', height: '18px' }} />
        </div>
      </div>
      <div className="card-body p-2 d-flex flex-column">
        <h4 className="card-title fs-6">{title}</h4>
        <h5 className="amount mb-1">
          {loading ? <span className="spinner-border spinner-border-sm" role="status" /> : value}
        </h5>
        {subtitle && <div className="d-flex gap-2 amount-trend">{subtitle}</div>}
        <div className="d-flex gap-1 ms-auto mt-auto">
          <span
            className="icon goal"
            style={{ cursor: actionUrl ? 'pointer' : 'default', opacity: actionUrl ? 1 : 0.5 }}
            onClick={handleAction}
            onKeyDown={(e) => e.key === 'Enter' && handleAction()}
            role={actionUrl ? 'button' : undefined}
            tabIndex={actionUrl ? 0 : undefined}
          >
            <img width="24" height="24" src="/images/risk-red-i.svg" alt="" />
          </span>
        </div>
      </div>
    </div>
  )
}

function InitiativesSection({ loading, initiatives }) {
  if (!loading && initiatives.length === 0) return null

  return (
    <div className="initiative-section mt-3" dir="ltr">
      {loading ? (
        <LoadingRow />
      ) : (
        <div className="row g-3">
          {initiatives.map((item) => (
            <InitiativeCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function InitiativeCard({ item }) {
  const val = item.initiativeValue || {}
  const progress = parseFloat(val.progressval) || 0
  const statusClass = getProgressClass(val.statusIndicator)
  const dueDate = formatDueDate(val)
  const badgeText = val.categoryType || 'N/A'

  return (
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body p-2 d-flex flex-column">
          <div className="d-flex justify-content-between mb-2">
            <i className="far fa-lightbulb text-muted" />
            <span className={`badge ${statusClass.bar} rounded-pill px-2`} style={{ fontSize: '10px' }}>
              {badgeText}
            </span>
          </div>
          <h6 className="mb-3" style={{ fontSize: '13px' }}>{val.name || 'Untitled Initiative'}</h6>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className="progress w-75" style={{ height: '4px' }}>
                <div
                  className={`progress-bar ${statusClass.bar}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className="fw-bold" style={{ fontSize: '12px' }}>{progress}%</span>
            </div>
            {dueDate && (
              <div className="d-flex justify-content-between text-muted" style={{ fontSize: '10px' }}>
                <span>Due Date: {dueDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RisksSection({ loading, risks }) {
  if (!loading && risks.length === 0) return null

  return (
    <div className="risk-section mt-3" dir="ltr">
      {loading ? (
        <LoadingRow />
      ) : (
        <div className="row g-3">
          {risks.map((risk) => (
            <RiskCard key={risk.id} risk={risk} />
          ))}
        </div>
      )}
    </div>
  )
}

function RiskCard({ risk }) {
  const val = risk.riskValue || {}
  const category = val.riskcategory || 'N/A'
  const nextAssessment = val.ch_nextAssessment || val.nextAssessment || ''
  const badgeClass = getRiskBadgeClass(category)
  const dotClass = getRiskDotClass(val.riskStatus)

  return (
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body p-2 d-flex flex-column">
          <div className="d-flex justify-content-between mb-2">
            <i className="fas fa-exclamation-triangle text-muted" />
            <span className={`badge ${badgeClass} rounded-pill px-2`} style={{ fontSize: '10px' }}>
              {category}
            </span>
          </div>
          <h6 className="mb-3" style={{ fontSize: '13px' }}>{val.name || 'Untitled Risk'}</h6>
          <div className="mt-auto">
            <div className="d-flex justify-content-between text-muted align-items-center" style={{ fontSize: '10px' }}>
              {nextAssessment && <span>Next Assessment: {nextAssessment}</span>}
              <i className={`far fa-dot-circle ${dotClass} fs-6`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpisSection({ loading, kpis }) {
  if (!loading && kpis.length === 0) return null

  return (
    <div className="kpi-section mt-3" dir="ltr">
      {loading ? (
        <LoadingRow />
      ) : (
        <div className="row g-3">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      )}
    </div>
  )
}

function KpiCard({ kpi }) {
  const trendColor = getKpiTrendColor(kpi.actual, kpi.target)
  const trendIcon = getTrendIconClass(kpi.trend)

  return (
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body p-2 d-flex flex-column">
          <div className="d-flex justify-content-between mb-2">
            <i className="fas fa-bullseye text-muted" />
          </div>
          <h6 className="mb-3" style={{ fontSize: '13px' }}>{kpi.name}</h6>
          <div className="mt-auto">
            <div className="d-flex justify-content-between text-muted align-items-center" style={{ fontSize: '10px' }}>
              <div className="d-flex flex-column">
                <div className="d-flex gap-3 fw-bold">
                  <span>Actual</span>
                  <span>Target</span>
                </div>
                <div className="d-flex gap-3">
                  <span className="fw-bold" style={{ color: trendColor }}>{kpi.actual}</span>
                  <span>{kpi.target}</span>
                </div>
              </div>
              <i className={`${trendIcon} fs-6`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingRow() {
  return (
    <div className="text-white-50 py-2">
      <span className="spinner-border spinner-border-sm me-2" role="status" />
      Loading...
    </div>
  )
}
