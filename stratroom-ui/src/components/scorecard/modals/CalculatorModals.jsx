import React from 'react';

export const PerspectiveCalculatorModal = () => {
    return (
        <div className="modal custom-modal calculator-modal fade kpi_setting" id="prespective-calculator-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="prespective-calculator-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Perspective Calculator</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3 calculator-wrap">
                                    <div className="g-col-12">
                                        <div className="form-group mb-0">
                                            <input type="text" className="form-control" name="prespectivePerformance" id="prespectivePerformance" placeholder="Performance" />
                                        </div>
                                    </div>
                                    <div className="grid g-col-12 gap-3 calculator-box">
                                        <div className="g-col-12 g-col-md-4 g-start-md-9 g-row-2">
                                            <div className="d-flex flex-wrap gap-2 keypad-wrap">
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">1</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">2</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">3</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">4</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">5</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">6</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">7</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">8</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">9</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">0</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">(</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">)</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">.</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">+</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">-</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">*</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">/</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">,</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">==</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">!=</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">&gt;</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary">&lt;</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">&gt;=</button>
                                                <button type="button" className="prespective-kepad btn btn-sm btn-secondary text-nowrap">=&lt;</button>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel">
                                                <div className="panel-heading">
                                                    <div className="searchMeasures">
                                                        <h6 className="panel-title">Objectives:</h6>
                                                        <div className="input-group mb-3">
                                                            <input id="prespectiveSearchMeasure" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                            <button className="btn btn-outline-secondary" type="button" id="basic-addon2">
                                                                <i data-lucide="search" style={{ width: '14px', height: '14px' }}></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel-body" data-spy="scroll">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                        <li className="list-group-item prespectiveMeasure-list">% MOULD LCA INTO AN EMPLOYER OF CHOICE</li>
                                                        <li className="list-group-item prespectiveMeasure-list">% MODERNIZE BUSINESS OPERATIONS</li>
                                                        <li className="list-group-item prespectiveMeasure-list">% Increase annual organizational performance from 89% to 98% by 31 March 2026</li>
                                                        <li className="list-group-item prespectiveMeasure-list"># Increase number of new and upgraded internal systems and tools to 5 annually</li>
                                                        <li className="list-group-item prespectiveMeasure-list">% Improve internal climate score from 69% to 90% by 31 March 2026</li>
                                                        <li className="list-group-item prespectiveMeasure-list">% Adoption Rate</li>
                                                        <li className="list-group-item prespectiveMeasure-list">$ MOBILIZE FINANCIAL RESOURCES</li>
                                                        <li className="list-group-item prespectiveMeasure-list">$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel1">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Functions:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
                                                        <li className="list-group-item prespectivePerFuncton">If</li>
                                                        <li className="list-group-item prespectivePerFuncton">avg</li>
                                                        <li className="list-group-item prespectivePerFuncton">agg</li>
                                                        <li className="list-group-item prespectivePerFuncton">count</li>
                                                        <li className="list-group-item prespectivePerFuncton">sum</li>
                                                        <li className="list-group-item prespectivePerFuncton">min</li>
                                                        <li className="list-group-item prespectivePerFuncton">max</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="prespectivePerResult_panel">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Function Description:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <h6>IF</h6>
                                                    <p>Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" className="btn btn-sm btn-secondary">Validate</button>
                                        <button name="add" id="add" className="btn btn-sm btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ObjectiveCalculatorModal = () => {
    return (
        <div className="modal custom-modal calculator-modal fade kpi_setting" id="objective-calculator-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="objective-calculator-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Objective Calculator</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3 calculator-wrap">
                                    <div className="g-col-12">
                                        <div className="form-group mb-0">
                                            <input type="text" className="form-control" name="objectivePerformance" id="objectivePerformance" placeholder="Performance" />
                                        </div>
                                    </div>
                                    <div className="grid g-col-12 gap-3 calculator-box">
                                        <div className="g-col-12 g-col-md-4 g-start-md-9 g-row-2">
                                            <div className="d-flex flex-wrap gap-2 keypad-wrap">
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">1</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">2</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">3</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">4</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">5</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">6</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">7</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">8</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">9</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">0</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">(</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">)</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">.</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">+</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">-</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">*</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">/</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">,</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">==</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">!=</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">&gt;</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary">&lt;</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">&gt;=</button>
                                                <button type="button" className="objective-kepad btn btn-sm btn-secondary text-nowrap">=&lt;</button>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel">
                                                <div className="panel-heading">
                                                    <div className="searchMeasures">
                                                        <h6 className="panel-title">KPIs:</h6>
                                                        <div className="input-group mb-3">
                                                            <input id="objectiveSearchMeasure" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                            <button className="btn btn-outline-secondary" type="button" id="basic-addon2">
                                                                <i data-lucide="search" style={{ width: '14px', height: '14px' }}></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel-body" data-spy="scroll">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                        <li className="list-group-item objectiveMeasure-list">% MOULD LCA INTO AN EMPLOYER OF CHOICE</li>
                                                        <li className="list-group-item objectiveMeasure-list">% MODERNIZE BUSINESS OPERATIONS</li>
                                                        <li className="list-group-item objectiveMeasure-list">% Increase annual organizational performance from 89% to 98% by 31 March 2026</li>
                                                        <li className="list-group-item objectiveMeasure-list"># Increase number of new and upgraded internal systems and tools to 5 annually</li>
                                                        <li className="list-group-item objectiveMeasure-list">% Improve internal climate score from 69% to 90% by 31 March 2026</li>
                                                        <li className="list-group-item objectiveMeasure-list">% Adoption Rate</li>
                                                        <li className="list-group-item objectiveMeasure-list">$ MOBILIZE FINANCIAL RESOURCES</li>
                                                        <li className="list-group-item objectiveMeasure-list">$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel1">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Functions:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
                                                        <li className="list-group-item objectivePerFuncton">If</li>
                                                        <li className="list-group-item objectivePerFuncton">avg</li>
                                                        <li className="list-group-item objectivePerFuncton">agg</li>
                                                        <li className="list-group-item objectivePerFuncton">count</li>
                                                        <li className="list-group-item objectivePerFuncton">sum</li>
                                                        <li className="list-group-item objectivePerFuncton">min</li>
                                                        <li className="list-group-item objectivePerFuncton">max</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="objectivePerResult_panel">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Function Description:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <h6>IF</h6>
                                                    <p>Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" className="btn btn-sm btn-secondary">Validate</button>
                                        <button name="add" id="add" className="btn btn-sm btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KpiCalculatorModal = () => {
    return (
        <div className="modal custom-modal calculator-modal fade kpi_setting" id="kpi-calculator-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="kpi-calculator-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">KPI Calculator</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3 calculator-wrap">
                                    <div className="g-col-12">
                                        <div className="form-group mb-0">
                                            <input type="text" className="form-control" name="kpiPerformance" id="kpiPerformance" placeholder="Performance" />
                                        </div>
                                    </div>
                                    <div className="grid g-col-12 gap-3 calculator-box">
                                        <div className="g-col-12 g-col-md-4 g-start-md-9 g-row-2">
                                            <div className="d-flex flex-wrap gap-2 keypad-wrap">
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">1</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">2</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">3</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">4</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">5</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">6</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">7</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">8</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">9</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">0</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">(</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">)</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">.</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">+</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">-</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">*</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">/</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">,</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">==</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">!=</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">&gt;</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary">&lt;</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">&gt;=</button>
                                                <button type="button" className="kpi-kepad btn btn-sm btn-secondary text-nowrap">=&lt;</button>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel">
                                                <div className="panel-heading">
                                                    <div className="searchMeasures">
                                                        <h6 className="panel-title">Fields and measures:</h6>
                                                        <div className="input-group mb-3">
                                                            <input id="kpiSearchMeasure" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                            <button className="btn btn-outline-secondary" type="button" id="basic-addon2">
                                                                <i data-lucide="search" style={{ width: '14px', height: '14px' }}></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel-body" data-spy="scroll">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                        <li className="list-group-item kpiMeasure-list">Actual</li>
                                                        <li className="list-group-item kpiMeasure-list">Target</li>
                                                        <li className="list-group-item kpiMeasure-list">Budget</li>
                                                        <li className="list-group-item kpiMeasure-list">Forecast</li>
                                                        <li className="list-group-item kpiMeasure-list">% Improve internal climate score from 69% to 90% by 31 March 2026</li>
                                                        <li className="list-group-item kpiMeasure-list">% Adoption Rate</li>
                                                        <li className="list-group-item kpiMeasure-list">$ MOBILIZE FINANCIAL RESOURCES</li>
                                                        <li className="list-group-item kpiMeasure-list">$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel1">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Functions:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
                                                        <li className="list-group-item kpiPerFuncton">If</li>
                                                        <li className="list-group-item kpiPerFuncton">avg</li>
                                                        <li className="list-group-item kpiPerFuncton">agg</li>
                                                        <li className="list-group-item kpiPerFuncton">count</li>
                                                        <li className="list-group-item kpiPerFuncton">sum</li>
                                                        <li className="list-group-item kpiPerFuncton">min</li>
                                                        <li className="list-group-item kpiPerFuncton">max</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="kpiPerResult_panel">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Function Description:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <h6>IF</h6>
                                                    <p>Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" className="btn btn-sm btn-secondary">Validate</button>
                                        <button name="add" id="add" className="btn btn-sm btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KpiActualCalculatorModal = () => {
    return (
        <div className="modal custom-modal calculator-modal fade kpi_setting" id="kpiActual-calculator-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="kpiActual-calculator-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Actual Calculator</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3 calculator-wrap">
                                    <div className="g-col-12">
                                        <div className="form-group mb-0">
                                            <input type="text" className="form-control" name="kpiActualPerformance" id="kpiActualPerformance" placeholder="Performance" />
                                        </div>
                                    </div>
                                    <div className="grid g-col-12 gap-3 calculator-box">
                                        <div className="g-col-12 g-col-md-4 g-start-md-9 g-row-2">
                                            <div className="d-flex flex-wrap gap-2 keypad-wrap">
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">1</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">2</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">3</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">4</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">5</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">6</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">7</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">8</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">9</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">0</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">(</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">)</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">.</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">+</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">-</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">*</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">/</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">,</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">==</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">!=</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">&gt;</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary">&lt;</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">&gt;=</button>
                                                <button type="button" className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap">=&lt;</button>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="measuresWrap">
                                                <h6 className="panel-title">Fields and measures:</h6>
                                                <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active rounded-0" id="pills-actual-tab" data-bs-toggle="pill" href="#pills-actual" role="tab" aria-controls="pills-actual" aria-selected="true">Measures</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link rounded-0" id="pills-actualSubMeasures-tab" data-bs-toggle="pill" href="#pills-actualSubMeasures" role="tab" aria-controls="pills-actualSubMeasures" aria-selected="false">Sub Measures</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link rounded-0" id="pills-actualInitiatives-tab" data-bs-toggle="pill" href="#pills-actualInitiatives" role="tab" aria-controls="pills-actualInitiatives" aria-selected="false">Initiatives</a>
                                                    </li>
                                                </ul>

                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id="pills-actual" role="tabpanel" aria-labelledby="pills-actual-tab">
                                                        <div className="panel panel-primary" id="result_panel">
                                                            <div className="panel-heading">
                                                                <div className="searchMeasures">
                                                                    <div className="input-group mb-3">
                                                                        <input id="kpiActualSearchMeasure" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                                        <button className="btn btn-outline-secondary" type="button" id="basic-addon2"><i data-lucide="search" style={{ width: '14px', height: '14px' }}></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel-body" data-spy="scroll">
                                                                <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                                    <li className="list-group-item kpiActualMeasure-list">% MOULD LCA INTO AN EMPLOYER OF CHOICE</li>
                                                                    <li className="list-group-item kpiActualMeasure-list">% MODERNIZE BUSINESS OPERATIONS</li>
                                                                    <li className="list-group-item kpiActualMeasure-list">% Increase annual organizational performance from 89% to 98% by 31 March 2026</li>
                                                                    <li className="list-group-item kpiActualMeasure-list"># Increase number of new and upgraded internal systems and tools to 5 annually</li>
                                                                    <li className="list-group-item kpiActualMeasure-list">% Improve internal climate score from 69% to 90% by 31 March 2026</li>
                                                                    <li className="list-group-item kpiActualMeasure-list">% Adoption Rate</li>
                                                                    <li className="list-group-item kpiActualMeasure-list">$ MOBILIZE FINANCIAL RESOURCES</li>
                                                                    <li className="list-group-item kpiActualMeasure-list">$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="tab-pane fade" id="pills-actualSubMeasures" role="tabpanel" aria-labelledby="pills-actualSubMeasures-tab">
                                                        <div className="panel panel-primary" id="result_panel">
                                                            <div className="panel-heading">
                                                                <div className="searchMeasures">
                                                                    <div className="input-group mb-3">
                                                                        <input id="kpiActualSearchSubMeasure" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                                        <button className="btn btn-outline-secondary" type="button" id="basic-addon3"><i data-lucide="search" style={{ width: '14px', height: '14px' }}></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel-body" data-spy="scroll">
                                                                <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                                    <li className="list-group-item kpiActualSubMeasure-list">TD20_% Promote information and knowledge Sharing</li>
                                                                    <li className="list-group-item kpiActualSubMeasure-list">TD20_# Solicit funding for LCA Operations projects</li>
                                                                    <li className="list-group-item kpiActualSubMeasure-list">TD20_# Conduct Electromagnetic field safety campaigns</li>
                                                                    <li className="list-group-item kpiActualSubMeasure-list">TD20_% Implement regional and international decisions and resolutions</li>
                                                                    <li className="list-group-item kpiActualSubMeasure-list">TD20_% Strengthen participation in regional and international meetings</li>
                                                                    <li className="list-group-item kpiActualSubMeasure-list">TD20_% Advocate for LCA strategic partnerships</li>
                                                                    <li className="list-group-item kpiActualSubMeasure-list">TD20_# Improve mobile network coverage</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-actualInitiatives" role="tabpanel" aria-labelledby="pills-actualInitiatives-tab">
                                                        <div className="panel panel-primary" id="result_panel">
                                                            <div className="panel-heading">
                                                                <div className="searchMeasures">
                                                                    <div className="input-group mb-3">
                                                                        <input id="kpiActualSearchInitiatives" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                                        <button className="btn btn-outline-secondary" type="button" id="basic-addon3"><i data-lucide="search" style={{ width: '14px', height: '14px' }}></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel-body" data-spy="scroll">
                                                                <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                                    <li className="list-group-item kpiActualInitiatives-list">Mould LCA into an employer of choice</li>
                                                                    <li className="list-group-item kpiActualInitiatives-list">Modernize business operations</li>
                                                                    <li className="list-group-item kpiActualInitiatives-list">Embed Risk Management in LCA</li>
                                                                    <li className="list-group-item kpiActualInitiatives-list">Promote Consumer Education and Awareness</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel1">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Functions:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
                                                        <li className="list-group-item kpiActualPerFuncton">If</li>
                                                        <li className="list-group-item kpiActualPerFuncton">avg</li>
                                                        <li className="list-group-item kpiActualPerFuncton">agg</li>
                                                        <li className="list-group-item kpiActualPerFuncton">count</li>
                                                        <li className="list-group-item kpiActualPerFuncton">sum</li>
                                                        <li className="list-group-item kpiActualPerFuncton">min</li>
                                                        <li className="list-group-item kpiActualPerFuncton">max</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="kpiActualPerResult_panel">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Function Description:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <h6>IF</h6>
                                                    <p>Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" className="btn btn-sm btn-secondary">Validate</button>
                                        <button name="add" id="add" className="btn btn-sm btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const YtdCalculatorModal = () => {
    return (
        <div className="modal custom-modal calculator-modal fade kpi_setting" id="ytd-calculator-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="ytd-calculator-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">YTD Calculator</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3 calculator-wrap">
                                    <div className="g-col-12">
                                        <div className="form-group mb-0">
                                            <input type="text" className="form-control" name="ytdPerformance" id="ytdPerformance" placeholder="Performance" />
                                        </div>
                                    </div>
                                    <div className="grid g-col-12 gap-3 calculator-box">
                                        <div className="g-col-12 g-col-md-4 g-start-md-9 g-row-2">
                                            <div className="d-flex flex-wrap gap-2 keypad-wrap">
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">1</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">2</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">3</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">4</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">5</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">6</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">7</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">8</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">9</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">0</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">(</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">)</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">.</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">+</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">-</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">*</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">/</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">,</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">==</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">!=</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">&gt;</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary">&lt;</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">&gt;=</button>
                                                <button type="button" className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap">=&lt;</button>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="measuresWrap">
                                                <h6 className="panel-title">Fields and measures:</h6>
                                                <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active rounded-0" id="pills-measures-tab" data-bs-toggle="pill" href="#pills-measures" role="tab" aria-controls="pills-measures" aria-selected="true">Measures</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link rounded-0" id="pills-subMeasures-tab" data-bs-toggle="pill" href="#pills-subMeasures" role="tab" aria-controls="pills-subMeasures" aria-selected="false">Sub Measures</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link rounded-0" id="pills-initiatives-tab" data-bs-toggle="pill" href="#pills-initiatives" role="tab" aria-controls="pills-initiatives" aria-selected="false">Initiatives</a>
                                                    </li>
                                                </ul>

                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id="pills-measures" role="tabpanel" aria-labelledby="pills-measures-tab">
                                                        <div className="panel panel-primary" id="result_panel">
                                                            <div className="panel-heading">
                                                                <div className="searchMeasures">
                                                                    <div className="input-group mb-3">
                                                                        <input id="ytdSearchMeasure" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                                        <button className="btn btn-outline-secondary" type="button" id="basic-addon2"><i data-lucide="search" style={{ width: '14px', height: '14px' }}></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel-body" data-spy="scroll">
                                                                <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                                    <li className="list-group-item ytdMeasure-list">% MOULD LCA INTO AN EMPLOYER OF CHOICE</li>
                                                                    <li className="list-group-item ytdMeasure-list">% MODERNIZE BUSINESS OPERATIONS</li>
                                                                    <li className="list-group-item ytdMeasure-list">% Increase annual organizational performance from 89% to 98% by 31 March 2026</li>
                                                                    <li className="list-group-item ytdMeasure-list"># Increase number of new and upgraded internal systems and tools to 5 annually</li>
                                                                    <li className="list-group-item ytdMeasure-list">% Improve internal climate score from 69% to 90% by 31 March 2026</li>
                                                                    <li className="list-group-item ytdMeasure-list">% Adoption Rate</li>
                                                                    <li className="list-group-item ytdMeasure-list">$ MOBILIZE FINANCIAL RESOURCES</li>
                                                                    <li className="list-group-item ytdMeasure-list">$ Improve organizational reserves _Excluding cash and cash equivalents_ by 10% year on year until 31st March 2026</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="tab-pane fade" id="pills-subMeasures" role="tabpanel" aria-labelledby="pills-subMeasures-tab">
                                                        <div className="panel panel-primary" id="result_panel">
                                                            <div className="panel-heading">
                                                                <div className="searchMeasures">
                                                                    <div className="input-group mb-3">
                                                                        <input id="ytdSearchSubMeasure" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                                        <button className="btn btn-outline-secondary" type="button" id="basic-addon3"><i data-lucide="search" style={{ width: '14px', height: '14px' }}></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel-body" data-spy="scroll">
                                                                <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                                    <li className="list-group-item ytdSubMeasure-list">TD20_% Promote information and knowledge Sharing</li>
                                                                    <li className="list-group-item ytdSubMeasure-list">TD20_# Solicit funding for LCA Operations projects</li>
                                                                    <li className="list-group-item ytdSubMeasure-list">TD20_# Conduct Electromagnetic field safety campaigns</li>
                                                                    <li className="list-group-item ytdSubMeasure-list">TD20_% Implement regional and international decisions and resolutions</li>
                                                                    <li className="list-group-item ytdSubMeasure-list">TD20_% Strengthen participation in regional and international meetings</li>
                                                                    <li className="list-group-item ytdSubMeasure-list">TD20_% Advocate for LCA strategic partnerships</li>
                                                                    <li className="list-group-item ytdSubMeasure-list">TD20_# Improve mobile network coverage</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-initiatives" role="tabpanel" aria-labelledby="pills-initiatives-tab">
                                                        <div className="panel panel-primary" id="result_panel">
                                                            <div className="panel-heading">
                                                                <div className="searchMeasures">
                                                                    <div className="input-group mb-3">
                                                                        <input id="ytdSearchInitiatives" type="text" className="form-control form-control-sm" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                                                        <button className="btn btn-outline-secondary" type="button" id="basic-addon3"><i data-lucide="search" style={{ width: '14px', height: '14px' }}></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel-body" data-spy="scroll">
                                                                <ul className="list-group overflow-auto" style={{ maxHeight: '180px' }}>
                                                                    <li className="list-group-item ytdInitiatives-list">Mould LCA into an employer of choice</li>
                                                                    <li className="list-group-item ytdInitiatives-list">Modernize business operations</li>
                                                                    <li className="list-group-item ytdInitiatives-list">Embed Risk Management in LCA</li>
                                                                    <li className="list-group-item ytdInitiatives-list">Promote Consumer Education and Awareness</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="result_panel1">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Functions:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
                                                        <li className="list-group-item ytdPerFuncton">If</li>
                                                        <li className="list-group-item ytdPerFuncton">avg</li>
                                                        <li className="list-group-item ytdPerFuncton">agg</li>
                                                        <li className="list-group-item ytdPerFuncton">count</li>
                                                        <li className="list-group-item ytdPerFuncton">sum</li>
                                                        <li className="list-group-item ytdPerFuncton">min</li>
                                                        <li className="list-group-item ytdPerFuncton">max</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-4">
                                            <div className="panel panel-primary" id="ytdPerResult_panel">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title">Function Description:</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <h6>IF</h6>
                                                    <p>Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" className="btn btn-sm btn-secondary">Validate</button>
                                        <button name="add" id="add" className="btn btn-sm btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
