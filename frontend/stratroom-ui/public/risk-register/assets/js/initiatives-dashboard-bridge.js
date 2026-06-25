/**
 * Loads initiatives dashboard from API — no mock fallback when embedded in Stratroom.
 */
(function (global) {
  function isEmbedded() {
    return new URLSearchParams(global.location.search).get('embedded') === '1';
  }

  function updateKpis(dashboard) {
    const values = document.querySelectorAll('.compliance-kpi-card .kpi-value');
    const subs = document.querySelectorAll('.compliance-kpi-card .kpi-sub');
    if (values.length < 5) return;

    values[0].textContent = dashboard.totalInitiative || 0;
    values[1].textContent = dashboard.totalSubInitiative || 0;
    values[2].textContent = dashboard.totalActivity || 0;
    values[3].textContent = dashboard.totalTask || 0;
    values[4].textContent = dashboard.totalMilestone || 0;

    const actMap = dashboard.activityStatusDTO || {};
    const taskMap = dashboard.taskStatusCount || {};
    const msMap = dashboard.milestoneStatusCount || {};
    const inProgress = actMap.Inprogress || actMap['In Progress'] || 0;
    const completed = taskMap.completed || taskMap.Completed || 0;
    const overdue = msMap.Overdue || msMap.overdue || 0;

    if (subs[0]) subs[0].textContent = 'active this cycle';
    if (subs[1]) subs[1].textContent = 'across all initiatives';
    if (subs[2]) subs[2].textContent = inProgress + ' in progress';
    if (subs[3]) subs[3].textContent = completed + ' completed';
    if (subs[4]) subs[4].textContent = overdue + ' overdue';
  }

  function updatePortfolio() {
    const items = global.INITIATIVES || [];
    const avg = items.length
      ? Math.round(items.reduce(function (sum, item) { return sum + (Number(item.progress) || 0); }, 0) / items.length)
      : 0;
    const pctEl = document.getElementById('portfolio-percent');
    const detailEl = document.getElementById('portfolio-detail');
    if (pctEl) pctEl.textContent = avg + '%';
    if (detailEl) {
      detailEl.textContent = items.length + ' active initiative' + (items.length === 1 ? '' : 's');
    }
  }

  function applyDashboard(dashboard) {
    const bridge = global.InitiativesApiBridge;
    const list = (dashboard && dashboard.initiveDTO) || [];
    global.INITIATIVES = list.map(bridge.mapDashboardInitiative);
    global.__initiativeDashboard = dashboard;
    updateKpis(dashboard || {});
    updatePortfolio();
    if (typeof global.initInitiativesDashboard === 'function') {
      global.initInitiativesDashboard();
    }
  }

  function showLoadError(message) {
    global.INITIATIVES = [];
    global.__initiativeDashboard = {
      totalInitiative: 0,
      totalSubInitiative: 0,
      totalActivity: 0,
      totalTask: 0,
      totalMilestone: 0,
      initiveDTO: [],
      activityStatusDTO: {},
      taskStatusCount: {},
      milestoneStatusCount: {}
    };
    updateKpis(global.__initiativeDashboard);
    updatePortfolio();
    const cards = document.getElementById('initiativeCards');
    if (cards) {
      cards.innerHTML = '<div class="col-12"><div class="alert alert-warning mb-0">' +
        (message || 'Unable to load initiatives dashboard data.') + '</div></div>';
    }
    if (typeof global.initInitiativesDashboard === 'function') {
      global.initInitiativesDashboard();
    }
  }

  function boot() {
    if (!global.InitiativesApiBridge || !global.InitiativesApiBridge.enabled) {
      if (typeof global.initInitiativesDashboard === 'function') {
        global.initInitiativesDashboard();
      }
      return;
    }

    if (isEmbedded()) {
      global.INITIATIVES = [];
    }

    if (!global.InitiativesApiBridge.getEmpId()) {
      showLoadError('Please log in to view initiatives dashboard data.');
      return;
    }

    global.InitiativesApiBridge.loadDashboardData()
      .then(applyDashboard)
      .catch(function (err) {
        console.error('Initiatives dashboard load failed', err);
        if (isEmbedded()) {
          showLoadError('Failed to load initiatives from API. Restart the backend and hard-refresh.');
          return;
        }
        if (typeof global.initInitiativesDashboard === 'function') {
          global.initInitiativesDashboard();
        }
      });
  }

  global.bootInitiativesDashboard = boot;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
