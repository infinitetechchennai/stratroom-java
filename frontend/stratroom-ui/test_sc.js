import axios from 'axios';
axios.post('http://localhost:8080/api/scorecardV2/kpi/actuals/batch', {
  kpiId: 1,
  actuals: [{ periodStart: '2026-01-01', periodEnd: '2026-01-31', actualValue: 50 }]
}).then(r => console.log("OK")).catch(e => console.log("ERR", e.response ? e.response.status : e.message));
