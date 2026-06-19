import React, { useState } from 'react';

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
    <div className="g-col-12">
      <div className="form-group mb-0">
        <input
          type="text"
          className="form-control"
          name={name}
          id={id}
          placeholder="Formula"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function Keypad({ onKey, onClear, onBackspace }) {
  const keys = ['1','2','3','4','5','6','7','8','9','0','(',')','.','+',' - ','*','/',',' ,'==','!=','>','<','>=','<='];
  // Use actual characters without spaces for operators
  const keyValues = ['1','2','3','4','5','6','7','8','9','0','(',')','.','+',' - ','*','/',',' ,'==','!=','>','<','>=','<='];

  const tooltipMap = { '+': 'Addition', '-': 'Subtraction', '*': 'Multiplication', '/': 'Division', '%': 'Percentage', '(': 'Open Parenthesis', ')': 'Close Parenthesis', '[': 'Open Bracket', ']': 'Close Bracket', ':': 'Colon', 'AND': 'Logical AND', 'OR': 'Logical OR', 'NOT': 'Logical NOT', 'IN': 'Included IN', '==': 'Equals', '!=': 'Not Equals', '>': 'Greater Than', '<': 'Less Than', '>=': 'Greater Than or Equals', '<=': 'Less Than or Equals', '=<': 'Less Than or Equals' };

  return (
    <div className="g-col-12 g-col-md-4 g-start-md-9 g-row-2">
      <div className="d-flex flex-wrap gap-2 keypad-wrap">
        {['1','2','3','4','5','6','7','8','9','0','(',')','.','+','-','*','/',',' ,'==','!=','>','<','>=','<='].map(k => (
          <button
            key={k}
            type="button"
            className="btn btn-sm btn-secondary text-nowrap"
            onClick={() => onKey(k)}
            title={tooltipMap[k]}
          >
            {k}
          </button>
        ))}
        <button type="button" className="btn btn-sm btn-warning text-nowrap" onClick={onBackspace} title="Backspace">⌫</button>
        <button type="button" className="btn btn-sm btn-danger text-nowrap" onClick={onClear} title="Clear">C</button>
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
      <div className="g-col-12 g-col-md-4">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h6 className="panel-title">Functions:</h6>
          </div>
          <div className="panel-body">
            <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
              {FUNCTIONS.map(fn => (
                <li
                  key={fn}
                  className={`list-group-item${selected === fn ? ' active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelect(fn)}
                >
                  {fn}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="g-col-12 g-col-md-4">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h6 className="panel-title">Function Description:</h6>
          </div>
          <div className="panel-body">
            <h6>{FUNCTION_DESCRIPTIONS[selected]?.title}</h6>
            <p>{FUNCTION_DESCRIPTIONS[selected]?.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function MeasuresList({ title, items, searchId, onSelect }) {
  const [search, setSearch] = useState('');
  const filtered = items.filter(item => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="g-col-12 g-col-md-4">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="searchMeasures">
            <h6 className="panel-title">{title}</h6>
            <div className="input-group mb-3">
              <input
                id={searchId}
                type="text"
                className="form-control form-control-sm"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i data-lucide="search" style={{ width: '14px', height: '14px' }}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="panel-body" data-spy="scroll">
          <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
            {filtered.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MeasuresWithTabs({ tabs, onSelect }) {
  return (
    <div className="g-col-12 g-col-md-4">
      <div className="measuresWrap">
        <h6 className="panel-title">Fields and measures:</h6>
        <ul className="nav nav-pills mb-2" role="tablist">
          {tabs.map((tab, i) => (
            <li key={tab.id} className="nav-item">
              <a
                className={`nav-link rounded-0${i === 0 ? ' active' : ''}`}
                data-bs-toggle="pill"
                href={`#${tab.id}`}
                role="tab"
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              className={`tab-pane fade${i === 0 ? ' show active' : ''}`}
              id={tab.id}
              role="tabpanel"
            >
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <div className="searchMeasures">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                      />
                      <button className="btn btn-outline-secondary" type="button">
                        <i data-lucide="search" style={{ width: '14px', height: '14px' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                    {tab.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="list-group-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onSelect(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="card custom-card border-0">
              <div className="card-body">
                {children}
              </div>
            </div>
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

  return (
    <CalculatorLayout id="prespective-calculator-modal" title="Perspective Calculator">
      <div className="grid gap-3 calculator-wrap">
        <FormulaInput id="prespectivePerformance" name="prespectivePerformance" value={formula} onChange={setFormula} />
        <div className="grid g-col-12 gap-3 calculator-box">
          <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
          <MeasuresList
            title="Objectives:"
            searchId="prespectiveSearchMeasure"
            items={PERSPECTIVE_OBJECTIVES}
            onSelect={appendMeasure}
          />
          <FunctionsList onSelect={appendFunction} />
        </div>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <button name="validate" className="btn btn-sm btn-secondary">Validate</button>
          <button name="add" className="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   2. OBJECTIVE CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const ObjectiveCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();

  return (
    <CalculatorLayout id="objective-calculator-modal" title="Objective Calculator">
      <div className="grid gap-3 calculator-wrap">
        <FormulaInput id="objectivePerformance" name="objectivePerformance" value={formula} onChange={setFormula} />
        <div className="grid g-col-12 gap-3 calculator-box">
          <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
          <MeasuresList
            title="KPIs:"
            searchId="objectiveSearchMeasure"
            items={OBJECTIVE_KPIS}
            onSelect={appendMeasure}
          />
          <FunctionsList onSelect={appendFunction} />
        </div>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <button name="validate" className="btn btn-sm btn-secondary">Validate</button>
          <button name="add" className="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   3. KPI CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const KpiCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();

  return (
    <CalculatorLayout id="kpi-calculator-modal" title="KPI Calculator">
      <div className="grid gap-3 calculator-wrap">
        <FormulaInput id="kpiPerformance" name="kpiPerformance" value={formula} onChange={setFormula} />
        <div className="grid g-col-12 gap-3 calculator-box">
          <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
          <MeasuresList
            title="Fields and measures:"
            searchId="kpiSearchMeasure"
            items={KPI_MEASURES}
            onSelect={appendMeasure}
          />
          <FunctionsList onSelect={appendFunction} />
        </div>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <button name="validate" className="btn btn-sm btn-secondary">Validate</button>
          <button name="add" className="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   4. KPI ACTUAL CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const KpiActualCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();

  const tabs = [
    { id: 'pills-actual',         label: 'Measures',     items: ACTUAL_MEASURES },
    { id: 'pills-actualSubMeasures', label: 'Sub Measures', items: ACTUAL_SUBMEASURES },
    { id: 'pills-actualInitiatives', label: 'Initiatives',  items: ACTUAL_INITIATIVES },
  ];

  return (
    <CalculatorLayout id="kpiActual-calculator-modal" title="Actual Calculator">
      <div className="grid gap-3 calculator-wrap">
        <FormulaInput id="kpiActualPerformance" name="kpiActualPerformance" value={formula} onChange={setFormula} />
        <div className="grid g-col-12 gap-3 calculator-box">
          <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
          <MeasuresWithTabs tabs={tabs} onSelect={appendMeasure} />
          <FunctionsList onSelect={appendFunction} />
        </div>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <button name="validate" className="btn btn-sm btn-secondary">Validate</button>
          <button name="add" className="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    </CalculatorLayout>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   5. YTD CALCULATOR
══════════════════════════════════════════════════════════════════════════════ */
export const YtdCalculatorModal = () => {
  const { formula, setFormula, append, appendMeasure, appendFunction, clear, backspace } = useCalculator();

  const tabs = [
    { id: 'pills-measures',    label: 'Measures',     items: ACTUAL_MEASURES },
    { id: 'pills-subMeasures', label: 'Sub Measures', items: ACTUAL_SUBMEASURES },
    { id: 'pills-initiatives', label: 'Initiatives',  items: ACTUAL_INITIATIVES },
  ];

  return (
    <CalculatorLayout id="ytd-calculator-modal" title="YTD Calculator">
      <div className="grid gap-3 calculator-wrap">
        <FormulaInput id="ytdPerformance" name="ytdPerformance" value={formula} onChange={setFormula} />
        <div className="grid g-col-12 gap-3 calculator-box">
          <Keypad onKey={append} onClear={clear} onBackspace={backspace} />
          <MeasuresWithTabs tabs={tabs} onSelect={appendMeasure} />
          <FunctionsList onSelect={appendFunction} />
        </div>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <button name="validate" className="btn btn-sm btn-secondary">Validate</button>
          <button name="add" className="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    </CalculatorLayout>
  );
};
