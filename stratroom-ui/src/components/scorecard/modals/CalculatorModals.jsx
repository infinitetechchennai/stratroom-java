import React, { useState, useEffect } from 'react';

/* ─── Shared hook ──────────────────────────────────────────────────────────── */
function useCalculator(initialValue = '') {
  const [formula, setFormula] = useState(initialValue);

  // Append a token (key, function name, or measure name) to the formula
  const append = (token) => {
    setFormula(prev => prev + token);
  };

  // Append a measure wrapped in square brackets
  const appendMeasure = (name) => {
    setFormula(prev => prev + '[' + name + ']');
  };

  // Append a function name followed by opening parenthesis
  const appendFunction = (name) => {
    setFormula(prev => prev + name + '(');
  };

  // Clear the formula
  const clear = () => setFormula('');

  // Delete last character
  const backspace = () => setFormula(prev => prev.slice(0, -1));

  return { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace };
}

const useDynamicMeasures = (componentKey, initialMeasures = []) => {
  const [measures, setMeasures] = useState(initialMeasures);
  useEffect(() => {
    const handleLoaded = (e) => {
      if (e.detail.component === componentKey) {
        setMeasures(e.detail.data.map(nk => nk.measureName).filter(Boolean));
      }
    };
    document.addEventListener('scorecardMeasuresLoaded', handleLoaded);
    return () => document.removeEventListener('scorecardMeasuresLoaded', handleLoaded);
  }, [componentKey]);
  return measures;
};

const useDynamicTabsMeasures = (componentKey, defaultTabs) => {
  const [tabs, setTabs] = useState(defaultTabs);
  useEffect(() => {
    const handleLoaded = (e) => {
      if (e.detail.component === componentKey) {
        const main = [];
        const sub = [];
        e.detail.data.forEach(nk => {
          if (!nk.measureName) return;
          const elementType = nk.elementType || '';
          const measureType = Number(nk.measureType);

          // For KPI and YTD calculators, the backend returns everything (full fallback).
          // Filter: Measures tab = KPIs only, Sub Measures tab = Sub-KPIs only.
          if (componentKey === 'KPI' || componentKey === 'YTD') {
            if (elementType === 'KPI') {
              main.push(nk.measureName);
            } else if (elementType === 'SUBKPI') {
              sub.push(nk.measureName);
            }
            // Skip PERSPECTIVE, OBJECTIVE
          } else {
            // For all other calculators, use measureType as before
            if (measureType === 1) sub.push(nk.measureName);
            else main.push(nk.measureName);
          }
        });
        setTabs(prev => {
          const newTabs = [...prev];
          if (newTabs.length > 0) newTabs[0] = { ...newTabs[0], items: main };
          if (newTabs.length > 1) newTabs[1] = { ...newTabs[1], items: sub };
          return newTabs;
        });
      }
    };
    document.addEventListener('scorecardMeasuresLoaded', handleLoaded);
    return () => document.removeEventListener('scorecardMeasuresLoaded', handleLoaded);
  }, [componentKey]);
  return tabs;
};

/* ─── Shared function descriptions ────────────────────────────────────────── */
const FUNCTION_DESCRIPTIONS = {
  If:    { title: 'IF',    desc: "Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')" },
  avg:   { title: 'AVG',   desc: 'Returns the average of all values in the selected measure.' },
  agg:   { title: 'AGG',   desc: 'Aggregates values using the default aggregation method for the selected measure.' },
  count: { title: 'COUNT', desc: 'Returns the count of non-null values in the selected measure.' },
  sum:   { title: 'SUM',   desc: 'Returns the sum of all values in the selected measure.' },
  min:   { title: 'MIN',   desc: 'Returns the minimum value in the selected measure.' },
  max:   { title: 'MAX',   desc: 'Returns the maximum value in the selected measure.' },
};

const FUNCTIONS = ['If', 'avg', 'agg', 'count', 'sum', 'min', 'max'];

/* ─── Reusable sub-components ─────────────────────────────────────────────── */

function FormulaInput({ id, name, value, onChange }) {
  return (
    <div className="g-col-12 w-100">
      <ul className="nav nav-underline mb-3">
        <li className="nav-item">
          <a className="nav-link active text-dark fw-bold text-uppercase border-bottom border-dark border-2 px-0" style={{ paddingBottom: '8px' }} href="#">
            Formula Builder
          </a>
        </li>
      </ul>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          name={name}
          id={id}
          placeholder="Formula"
          value={value}
          rows="3"
          onChange={e => onChange(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

function Keypad({ onKey, onClear, onBackspace }) {
  // Use actual characters exactly as requested in Image 4
  const keys = ['+', '-', '*', '/', '%', '(', ')', '[', ']', ':', 'AND', 'OR', 'NOT', 'IN', '==', '!=', '>', '<', '>=', '<='];

  const tooltipMap = { '+': 'Addition', '-': 'Subtraction', '*': 'Multiplication', '/': 'Division', '%': 'Percentage', '(': 'Open Parenthesis', ')': 'Close Parenthesis', '[': 'Open Bracket', ']': 'Close Bracket', ':': 'Colon', 'AND': 'Logical AND', 'OR': 'Logical OR', 'NOT': 'Logical NOT', 'IN': 'Included IN', '==': 'Equals', '!=': 'Not Equals', '>': 'Greater Than', '<': 'Less Than', '>=': 'Greater Than or Equals', '<=': 'Less Than or Equals' };

  return (
    <div className="g-col-12 w-100 mb-4">
      <div className="d-flex flex-wrap gap-2 keypad-wrap">
        {keys.map(k => (
          <button
            key={k}
            type="button"
            className="btn btn-secondary text-white rounded"
            style={{ minWidth: '42px', fontWeight: '500', fontSize: '12px', padding: '6px 10px' }}
            onClick={() => onKey(k)}
            title={tooltipMap[k]}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

function FunctionsList({ onSelect }) {
  const [selected, setSelected] = useState('If');

  const handleSelect = (fn) => {
    setSelected(fn);
    onSelect(fn);
  };

  return (
    <>
      <div className="col-md-4">
        <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Functions:</h6>
        <div className="border rounded" style={{ height: '220px', overflowY: 'auto' }}>
          <ul className="list-group list-group-flush m-0">
            {FUNCTIONS.map(fn => (
              <li
                key={fn}
                className={`list-group-item list-group-item-action ${selected === fn ? 'bg-primary text-white' : ''}`}
                style={{ cursor: 'pointer', padding: '12px 16px', fontSize: '13px' }}
                onClick={() => handleSelect(fn)}
              >
                {fn}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col-md-4">
        <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Function Description:</h6>
        <div className="pt-1">
          <h6 className="formulaheaderdesc fw-bold text-uppercase" style={{ fontSize: '14px' }}>
            {FUNCTION_DESCRIPTIONS[selected]?.title}
          </h6>
          <p className="formulacontentdesc text-dark" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            {FUNCTION_DESCRIPTIONS[selected]?.desc}
          </p>
        </div>
      </div>
    </>
  );
}

function MeasuresList({ title, items, searchId, onSelect, showButtons = false }) {
  const [search, setSearch] = useState('');
  const filtered = items.filter(item => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="col-md-4 d-flex flex-column">
      <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>{title}</h6>
      <div className="input-group mb-3">
        <input
          id={searchId}
          type="text"
          className="form-control"
          placeholder="Search"
          value={search}
          autoComplete="off"
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn border bg-white" type="button">
          <i className="fa fa-search text-muted"></i>
        </button>
      </div>
      <div className="border rounded flex-grow-1" style={{ height: '220px', overflowY: 'auto' }}>
        <ul className="list-group list-group-flush m-0">
          {filtered.map((item, idx) => (
            <li
              key={idx}
              className="list-group-item"
              style={{ cursor: 'pointer', padding: '12px 16px', fontSize: '13px' }}
              onClick={() => onSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      {showButtons && (
        <div className="mt-4 d-flex gap-2">
          <button name="validate" className="btn btn-secondary text-white">Validate</button>
          <button name="add" className="btn btn-primary text-white">Add</button>
        </div>
      )}
    </div>
  );
}

function MeasuresWithTabs({ tabs, onSelect, showButtons = false }) {
  return (
    <div className="col-md-4 d-flex flex-column">
      <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Fields and measures:</h6>
      <ul className="nav nav-pills mb-3" role="tablist">
        {tabs.map((tab, i) => (
          <li key={tab.id} className="nav-item">
            <a
              className={`nav-link rounded-0 ${i === 0 ? 'active' : ''}`}
              style={{ padding: '6px 12px', fontSize: '13px' }}
              data-bs-toggle="pill"
              href={`#${tab.id}`}
              role="tab"
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content flex-grow-1">
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            className={`tab-pane fade ${i === 0 ? 'show active' : ''}`}
            id={tab.id}
            role="tabpanel"
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                autoComplete="off"
              />
              <button className="btn border bg-white" type="button">
                <i className="fa fa-search text-muted"></i>
              </button>
            </div>
            <div className="border rounded" style={{ height: '170px', overflowY: 'auto' }}>
              <ul className="list-group list-group-flush m-0">
                {tab.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item"
                    style={{ cursor: 'pointer', padding: '12px 16px', fontSize: '13px' }}
                    onClick={() => onSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {showButtons && (
        <div className="mt-4 d-flex gap-2">
          <button name="validate" className="btn btn-secondary text-white">Validate</button>
          <button name="add" className="btn btn-primary text-white">Add</button>
        </div>
      )}
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const PERSPECTIVE_OBJECTIVES = [
  '% MOULD LCA INTO AN EMPLOYER OF CHOICE',
  '% MODERNIZE BUSINESS OPERATIONS',
  '% Increase annual organizational performance from 89% to 98% by 31 March 2026',
  '# Increase number of new and upgraded internal systems and tools to 5 annually',
  '% Improve internal climate score from 69% to 90% by 31 March 2026',
  '% Adoption Rate',
  '$ MOBILIZE FINANCIAL RESOURCES',
  '$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026',
];

const OBJECTIVE_KPIS = [
  '% MOULD LCA INTO AN EMPLOYER OF CHOICE',
  '% MODERNIZE BUSINESS OPERATIONS',
  '% Increase annual organizational performance from 89% to 98% by 31 March 2026',
  '# Increase number of new and upgraded internal systems and tools to 5 annually',
  '% Improve internal climate score from 69% to 90% by 31 March 2026',
  '% Adoption Rate',
  '$ MOBILIZE FINANCIAL RESOURCES',
  '$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026',
];

const KPI_MEASURES = ['Actual', 'Target', 'Budget', 'Forecast',
  '% Improve internal climate score from 69% to 90% by 31 March 2026',
  '% Adoption Rate', '$ MOBILIZE FINANCIAL RESOURCES',
  '$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026',
];

const ACTUAL_MEASURES = [
  '% MOULD LCA INTO AN EMPLOYER OF CHOICE', '% MODERNIZE BUSINESS OPERATIONS',
  '% Increase annual organizational performance from 89% to 98% by 31 March 2026',
  '# Increase number of new and upgraded internal systems and tools to 5 annually',
  '% Improve internal climate score from 69% to 90% by 31 March 2026',
  '% Adoption Rate', '$ MOBILIZE FINANCIAL RESOURCES',
  '$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026',
];

const ACTUAL_SUBMEASURES = [
  'TD20_% Promote information and knowledge Sharing',
  'TD20_# Solicit funding for LCA Operations projects',
  'TD20_# Conduct Electromagnetic field safety campaigns',
  'TD20_% Implement regional and international decisions and resolutions',
  'TD20_% Strengthen participation in regional and international meetings',
  'TD20_% Advocate for LCA strategic partnerships',
  'TD20_# Improve mobile network coverage',
];

const ACTUAL_INITIATIVES = [
  'Mould LCA into an employer of choice',
  'Modernize business operations',
  'Embed Risk Management in LCA',
  'Promote Consumer Education and Awareness',
];

/* ─── Calculator layout (shared wrapper) ──────────────────────────────────── */
function CalculatorLayout({ id, title, inputId, inputName, children }) {
  return (
    <div
      className="modal custom-modal calculator-modal fade kpi_setting"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={id}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-xl">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0 pt-4 px-4">
            <h5 className="modal-title fw-bold" style={{ fontSize: '18px' }}>{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-4 pt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   1. PERSPECTIVE CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const PerspectiveCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();
  const measures = useDynamicMeasures('PERSPECTIVE', PERSPECTIVE_OBJECTIVES);

  return (
    <CalculatorLayout id="prespective-calculator-modal" title="Performance Calculator">
      <FormulaInput id="prespectivePerformance" name="prespectivePerformance" value={formula} onChange={setFormula} />
      <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
      <div className="row g-4 w-100 m-0">
        <MeasuresList
          title="Fields and measures:"
          searchId="prespectiveSearchMeasure"
          items={measures}
          onSelect={appendMeasure}
          showButtons={true}
        />
        <FunctionsList onSelect={appendFunction} />
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   2. OBJECTIVE CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const ObjectiveCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();
  const measures = useDynamicMeasures('OBJECTIVE', OBJECTIVE_KPIS);

  return (
    <CalculatorLayout id="objective-calculator-modal" title="Performance Calculator">
      <FormulaInput id="objectivePerformance" name="objectivePerformance" value={formula} onChange={setFormula} />
      <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
      <div className="row g-4 w-100 m-0">
        <MeasuresList
          title="Fields and measures:"
          searchId="objectiveSearchMeasure"
          items={measures}
          onSelect={appendMeasure}
          showButtons={true}
        />
        <FunctionsList onSelect={appendFunction} />
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   3. KPI CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const KpiCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();
  const measures = useDynamicMeasures('SCORECARDCONFIG', KPI_MEASURES);

  return (
    <CalculatorLayout id="kpi-calculator-modal" title="KPI Calculator">
      <FormulaInput id="kpiPerformance" name="kpiPerformance" value={formula} onChange={setFormula} />
      <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
      <div className="row g-4 w-100 m-0">
        <MeasuresList
          title="Fields and measures:"
          searchId="kpiSearchMeasure"
          items={measures}
          onSelect={appendMeasure}
          showButtons={true}
        />
        <FunctionsList onSelect={appendFunction} />
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   4. KPI ACTUAL CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const KpiActualCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();

  const defaultTabs = [
    { id: 'pills-actual',         label: 'Measures',     items: ACTUAL_MEASURES },
    { id: 'pills-actualSubMeasures', label: 'Sub Measures', items: ACTUAL_SUBMEASURES },
    { id: 'pills-actualInitiatives', label: 'Initiatives',  items: ACTUAL_INITIATIVES },
  ];
  const tabs = useDynamicTabsMeasures('KPI', defaultTabs);

  return (
    <CalculatorLayout id="kpiActual-calculator-modal" title="Actual Calculator">
      <FormulaInput id="kpiActualPerformance" name="kpiActualPerformance" value={formula} onChange={setFormula} />
      <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
      <div className="row g-4 w-100 m-0">
        <MeasuresWithTabs tabs={tabs} onSelect={appendMeasure} showButtons={true} />
        <FunctionsList onSelect={appendFunction} />
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   5. YTD CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const YtdCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();

  const defaultTabs = [
    { id: 'pills-measures',    label: 'Measures',     items: ACTUAL_MEASURES },
    { id: 'pills-subMeasures', label: 'Sub Measures', items: ACTUAL_SUBMEASURES },
    { id: 'pills-initiatives', label: 'Initiatives',  items: ACTUAL_INITIATIVES },
  ];
  const tabs = useDynamicTabsMeasures('YTD', defaultTabs);

  return (
    <CalculatorLayout id="ytd-calculator-modal" title="YTD Calculator">
      <FormulaInput id="ytdPerformance" name="ytdPerformance" value={formula} onChange={setFormula} />
      <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
      <div className="row g-4 w-100 m-0">
        <MeasuresWithTabs tabs={tabs} onSelect={appendMeasure} showButtons={true} />
        <FunctionsList onSelect={appendFunction} />
      </div>
    </CalculatorLayout>
  );
};
