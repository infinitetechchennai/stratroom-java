import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScorecardDetails } from '../../../services/scorecardApi';

/**
 * KPI Sidebar — all data comes dynamically from the backend.
 *
 * Data flow (same API as the Scorecard page):
 *   getScorecardDetails(pageId) → /api/scorecardV2/{pageId}
 *
 * Response shape:
 *   { cardDetailsDTO: {
 *       scorecardName: "VP Scorecard",
 *       scoreCardDTOS: [         ← perspectives
 *         { id, perspectiveType, objectiveList: [
 *           { id, objectivesName, kpiList: [
 *             { id, kpiName, kpiValue: { actual, target, trend, ... }, subKpiList }
 *           ]}
 *         ]}
 *       ]
 *   }}
 */
export default function KpiSidebar({ loggedInEmpId }) {
  const navigate = useNavigate();

  // Raw data from API
  const [scorecardName, setScorecardName] = useState('');
  const [perspectives, setPerspectives] = useState([]);

  // Selected dropdown values
  const [selectedPerspective, setSelectedPerspective] = useState('');
  const [selectedObjective, setSelectedObjective] = useState('');

  // Derived lists
  const [objectives, setObjectives] = useState([]);
  const [kpis, setKpis] = useState([]);

  const [loading, setLoading] = useState(false);

  // ── Load scorecard hierarchy on mount ──────────────────────────────
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Use the same pageId approach as the Scorecard page.
        // The pageId is stored in localStorage when the user views a scorecard,
        // or we default to '1' (same as ScorecardPage.jsx).
        const pageId = localStorage.getItem('scorecardPageId') || '1';
        const data = await getScorecardDetails(pageId);

        const card = data?.cardDetailsDTO;
        if (card) {
          setScorecardName(card.scorecardName || card.scoreCardName || '');
          setPerspectives(card.scoreCardDTOS || []);
        }
      } catch (err) {
        console.error('Error fetching scorecard for sidebar:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [loggedInEmpId]);

  // ── When perspective changes, derive objectives ────────────────────
  useEffect(() => {
    if (selectedPerspective) {
      const p = perspectives.find(p => String(p.id) === selectedPerspective);
      setObjectives(p?.objectiveList || []);
    } else {
      setObjectives([]);
    }
    setSelectedObjective('');
    setKpis([]);
  }, [selectedPerspective, perspectives]);

  // ── When objective changes, derive KPIs + Sub-KPIs ─────────────────
  useEffect(() => {
    if (selectedObjective) {
      const obj = objectives.find(o => String(o.id) === selectedObjective);
      if (obj?.kpiList) {
        const allKpis = [];
        obj.kpiList.forEach(kpi => {
          allKpis.push({ ...kpi, isSubKpi: false });
          if (kpi.subKpiList?.length > 0) {
            kpi.subKpiList.forEach(sub => {
              allKpis.push({ ...sub, isSubKpi: true });
            });
          }
        });
        setKpis(allKpis);
      } else {
        setKpis([]);
      }
    } else {
      setKpis([]);
    }
  }, [selectedObjective, objectives]);

  // ── Navigate to KPI story card ─────────────────────────────────────
  const handleKpiClick = (id) => {
    const offcanvasEl = document.getElementById('offcanvasKPI');
    if (offcanvasEl && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl) || new window.bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }
    navigate(`/kpi-story-card/${id}`);
  };

  // ── Determine KPI symbol from kpiValue ─────────────────────────────
  const getKpiSymbol = (kpi) => {
    const val = kpi.kpiValue || {};
    const dataType = val.dataType || val.kpi_data_type || '';
    if (dataType.toLowerCase().includes('currency') || dataType.toLowerCase().includes('dollar')) return '$';
    if (dataType.toLowerCase().includes('percent')) return '%';
    return '#';
  };

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <div className="offcanvas offcanvas-toggle offcanvas-start offcanvasKPI border-0 shadow-lg"
         data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1"
         id="offcanvasKPI" aria-labelledby="offcanvasKPILabel" style={{width: 320}}>

      {/* Toggle arrows (same as legacy kpi.html) */}
      <div className="offcanvas-toggle-menu toggle-right">
        <button id="toggleButton" className="btn p-0" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasKPI" aria-controls="offcanvasKPI">
          <i className="fas fa-arrow-right"></i>
        </button>
        <button className="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>

      {/* Header */}
      <div className="offcanvas-header pb-0 border-bottom justify-content-between gap-3">
        <h5 className="offcanvas-title fw-bold text-uppercase fs-6" id="offcanvasKPILabel">KPI</h5>
      </div>

      {/* Body */}
      <div className="offcanvas-body pt-2">
        {loading && <div className="text-center p-3">Loading...</div>}

        {/* Scorecard (read-only — shows the current scorecard name) */}
        <div className="form-group mb-2">
          <label className="form-label text-muted" style={{fontSize: 12, fontWeight: 600}}>Scorecard(s)</label>
          <select className="form-select form-select-sm" value="current" readOnly>
            <option value="current">{scorecardName || 'Select Scorecard'}</option>
          </select>
        </div>

        {/* Perspectives */}
        <div className="form-group mb-2">
          <label className="form-label text-muted" style={{fontSize: 12, fontWeight: 600}}>Perspectives</label>
          <select className="form-select form-select-sm"
                  value={selectedPerspective}
                  onChange={e => setSelectedPerspective(e.target.value)}>
            <option value="" disabled>Select Perspectives</option>
            {perspectives.map(p => (
              <option key={p.id} value={p.id}>
                {p.perspectiveType || p.scoreCardValue?.name || `Perspective ${p.id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Objectives */}
        <div className="form-group mb-4">
          <label className="form-label text-muted" style={{fontSize: 12, fontWeight: 600}}>Objectives</label>
          <select className="form-select form-select-sm"
                  value={selectedObjective}
                  onChange={e => setSelectedObjective(e.target.value)}
                  disabled={!selectedPerspective}>
            <option value="" disabled>Select Objective</option>
            {objectives.map(o => (
              <option key={o.id} value={o.id}>
                {o.objectivesName || o.objectivesValue?.name || `Objective ${o.id}`}
              </option>
            ))}
          </select>
        </div>

        {/* KPI Cards */}
        <div className="kpi-list d-flex flex-column gap-2">
          {kpis.map((kpi, idx) => {
            const val = kpi.kpiValue || kpi.subKpiValue || {};
            const name = kpi.kpiName || val.name || kpi.subKpiName || val.subMeasureName || 'Untitled KPI';
            const actual = val.actual ?? '-';
            const target = val.target ?? '-';
            const trend = val.trend || val.statusLight || '';
            const isRed = trend.toUpperCase() === 'RED';
            const symbol = getKpiSymbol(kpi);
            const frequency = val.tableFrequency || val.kpi_measurement || '';

            return (
              <div key={idx}
                   className="card shadow-sm rounded bg-white"
                   style={{cursor: 'pointer', border: '1px solid #c91079', overflow: 'hidden'}}
                   onClick={() => handleKpiClick(kpi.id)}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold" style={{color: '#6e798c', fontSize: 16}}>{symbol}</span>
                    {frequency && (
                      <span className="text-muted fw-bold" style={{fontSize: 11}}>{frequency}</span>
                    )}
                  </div>
                  <h6 className="card-title mb-3 fw-normal text-dark" style={{fontSize: 14, lineHeight: 1.2}}>
                    {kpi.isSubKpi && <small className="text-muted me-1">↳</small>}
                    {name}
                  </h6>
                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <div className="text-muted" style={{fontSize: 12}}>Actual</div>
                      <div className="fw-bold" style={{fontSize: 16, color: isRed ? '#dc3545' : '#198754'}}>{actual}</div>
                    </div>
                    <div className="text-start border-start ps-4 flex-grow-1">
                      <div className="text-muted" style={{fontSize: 12}}>Target</div>
                      <div className="fw-bold" style={{fontSize: 16, color: '#333'}}>{target}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {selectedObjective && kpis.length === 0 && (
            <div className="text-center text-muted" style={{fontSize: 12}}>No KPIs found for this objective.</div>
          )}
        </div>
      </div>
    </div>
  );
}
