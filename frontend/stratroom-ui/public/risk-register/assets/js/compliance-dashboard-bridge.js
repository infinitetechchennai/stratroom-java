/**
 * Loads compliance dashboard metrics from API instead of mock FRAMEWORKS.
 */
(function (global) {
  function boot() {
    if (!global.ComplianceApiBridge || !global.ComplianceApiBridge.enabled) {
      if (typeof global.initComplianceDashboard === 'function') {
        global.initComplianceDashboard();
      }
      return;
    }

    global.ComplianceApiBridge.loadCompliance()
      .then(function (payload) {
        var frameworks = global.ComplianceApiBridge.buildFrameworkStats(payload.areas);
        if (!frameworks.length) {
          console.warn('No compliance dashboard data — using empty dashboard');
        }
        global.FRAMEWORKS = frameworks;
        if (typeof global.initComplianceDashboard === 'function') {
          global.initComplianceDashboard();
        }
      })
      .catch(function (err) {
        console.error('Compliance dashboard load failed', err);
        global.FRAMEWORKS = [];
        if (typeof global.initComplianceDashboard === 'function') {
          global.initComplianceDashboard();
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
