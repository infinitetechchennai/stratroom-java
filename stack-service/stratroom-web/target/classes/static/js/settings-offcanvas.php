<div style="--stratroom-offcanvas-width: 260px;"
    class="offcanvas offcanvas-toggle offcanvas-start offcanvasSettings border-0 shadow-lg" data-bs-scroll="true"
    data-bs-backdrop="false" tabindex="-1" id="offcanvasSettings" aria-labelledby="offcanvasSettingsLabel">
    <div class="offcanvas-toggle-menu shadow toggle-right">
        <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings"
            aria-controls="offcanvasSettings">
            <i class="fas fa-caret-right"></i>
        </button>
        <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
            <i class="fas fa-caret-left"></i>
        </button>
    </div>

    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title" id="offcanvasSettingsLabel">Settings</h5>
        <!-- <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> -->
    </div>
    <div class="offcanvas-tab d-flex justify-content-between align-items-center gap-2 border-bottom px-3 pt-2 bg-light">
        <h5 class="title text-start mb-1">Widget Type</h4>

            <ul class="nav nav-underline" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link pt-0 pb-1 active" id="WidgetTypeOne-tab" data-bs-toggle="tab"
                        data-bs-target="#WidgetTypeOne-tab-pane" type="button" role="tab"
                        aria-controls="WidgetTypeOne-tab-pane" aria-selected="true">One</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link pt-0 pb-1" id="WidgetTypeTwo-tab" data-bs-toggle="tab"
                        data-bs-target="#WidgetTypeTwo-tab-pane" type="button" role="tab"
                        aria-controls="WidgetTypeTwo-tab-pane" aria-selected="false">Two</button>
                </li>

            </ul>
    </div>
    <div class="offcanvas-body">
        <div class="widget-wrap">



            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="WidgetTypeOne-tab-pane" role="tabpanel"
                    aria-labelledby="WidgetTypeOne-tab" tabindex="0">

                    <div class="browser-default text-start mb-3">
                        <!-- <label for="widget_type" class="form-label">Widget Type 1</label> -->
                        <select id="widget_type_01" name="initiative_owner" class="form-select form-select-sm"
                            aria-invalid="false">
                            <option value="chart-type-1">Chart</option>
                            <option value="text-type-1">Text</option>
                            <option value="table-type-1">Table</option>
                            <!-- <option value="map-chart-type-1">Map</option> -->
                        </select>
                    </div>
                    <!-- widget chart start -->
                    <div class="widget widget-1 chart-type-1">
                        <div class="grid g-2 chart-w-card">

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="BubbleChart" src="assets/images/icons/bubble-chart-i.svg" alt="Bubble Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="ColumnChart" src="assets/images/icons/column-chart-i.svg" alt="Column Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Line">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="LineChart" src="assets/images/icons/line-chart-i.svg" alt="Line Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Area">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="AreaChart" src="assets/images/icons/area-chart-i.svg" alt="Area Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Pie">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="PieChart" src="assets/images/icons/pie-chart-i.svg" alt="Pie Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Waterfall">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="WaterfallChart" src="assets/images/icons/waterfall-chart-i.svg"
                                    alt="Waterfall Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="MultiAxis" src="assets/images/icons/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Stacked">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="StackedChart" src="assets/images/icons/stcked-chart-i.svg"
                                    alt="Stacked Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Radial">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="RadialMulti" src="assets/images/icons/radial-chart-i.svg" alt="Radial Chart" />
                            </span>

                        </div>
                    </div>
                    <!-- widget chart end -->

                    <!-- widget text start -->
                    <div class="widget widget-1 text-type-1" style="display: none;">

                        <div class="d-grid gap-2">
                            <div ondragstart="dragStart(event)" draggable="true" id="normalTextType1">
                                <div class="card text-start text-card text-card-main border">
                                    <div
                                        class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                        <div class="icon">
                                            <img width="18" height="18" src="assets/images/icons/risk-management-i.svg"
                                                alt="risk-management">
                                        </div>
                                        <div class="text-muted period ms-auto">
                                            Jan 2019 - Dec 2020
                                        </div>

                                    </div>
                                    <div class="card-body p-2">
                                        <h4 class="card-title">Total Revenue</h4>
                                        <h5 class="amount mb-1">$ 202.35 M</h5>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="amount-trend">$ 202.36 M</div>
                                            <div class="d-flex gap-1 ms-auto">

                                                <span class="icon trend-low">
                                                    <img width="16" height="16" src="assets/images/icons/down-i.png"
                                                        alt="Trend Low">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div ondragstart="dragStart(event)" draggable="true" id="normalTextType2">
                                <div class="card text-start text-card text-card-main border">
                                    <div
                                        class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                        <div class="icon">
                                            <img width="18" height="18" src="assets/images/icons/initiatives-i.svg"
                                                alt="initiatives">
                                        </div>
                                        <div class="text-muted period ms-auto">
                                            Jan 2019 - Dec 2020
                                        </div>

                                    </div>
                                    <div class="card-body p-2">
                                        <h4 class="card-title">Total Revenue</h4>
                                        <h5 class="amount mb-1">$ 202.35 M</h5>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="amount-trend">$ 202.36 M</div>
                                            <div class="d-flex gap-1 ms-auto">

                                                <span class="icon trend-up">
                                                    <img width="16" height="16" src="assets/images/icons/up-i.png"
                                                        alt="Trend Low">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div ondragstart="dragStart(event)" draggable="true" id="chartTextType">
                                <div class="card text-start text-card text-card-main border">
                                    <div
                                        class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                        <div class="icon">
                                            <img width="18" height="18" src="assets/images/icons/kpi-i.svg" alt="kpi">
                                        </div>
                                        <div class="text-muted period ms-auto">
                                            Jan 2019 - Dec 2020
                                        </div>

                                    </div>
                                    <div class="card-body p-2">
                                        <h4 class="card-title">Total Revenue</h4>
                                        <h5 class="amount mb-1">$ 202.35 M</h5>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="amount-trend">$ 202.36 M</div>
                                            <div class="d-flex gap-1 ms-auto">

                                                <span class="icon trend-low">
                                                    <img width="16" height="16" src="assets/images/icons/down-i.png"
                                                        alt="Trend Low">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div ondragstart="dragStart(event)" draggable="true" id="normalTextType4">
                                <div class="card text-start text-card text-card-main border">
                                    <div
                                        class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                        <div class="icon">
                                            <img width="18" height="18"
                                                src="assets/images/icons/personal-dashboard-i.svg"" alt="
                                                personal-dashboard">
                                        </div>
                                        <div class="text-muted period ms-auto">
                                            Jan 2019 - Dec 2020
                                        </div>

                                    </div>
                                    <div class="card-body p-2">
                                        <h4 class="card-title">Total Revenue</h4>
                                        <h5 class="amount mb-1">$ 202.35 M</h5>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="amount-trend">$ 202.36 M</div>
                                            <div class="d-flex gap-1 ms-auto">

                                                <span class="icon trend-up">
                                                    <img width="16" height="16" src="assets/images/icons/up-i.png"
                                                        alt="Trend Low">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- widget text end -->

                    <!-- widget table start -->
                    <div class="widget widget-1 table-type-1" style="display: none">
                        <div class="d-grid gap-2">
                            <div class="card-box">
                                <label for="drilldown" class="form-label p-0">Drill Down
                                    Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="drilldownDragDiv"
                                            src="assets/images/widgets/table/drilldown-i.png" alt="Drilldown" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-box">
                                <label for="kpidrilldownDragDiv" class="form-label p-0">KPI
                                    Drill Down Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="kpidrilldownDragDiv"
                                            src="assets/images/widgets/table/drilldown-i.png"
                                            alt="KPI Drill Down Table" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="kpistatusCount" class="form-label p-0">KPI Status
                                    Count</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="kpistatusCount"
                                            src="assets/images/widgets/table/drilldown-i.png" alt="KPI Status Count" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-box">
                                <label for="projectstatusCount" class="form-label p-0">Project
                                    Status Count</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="projectstatusCount"
                                            src="assets/images/widgets/table/drilldown-i.png"
                                            alt="Project Status Count" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="riskstatusCount" class="form-label p-0">Risk
                                    Status Count</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="riskstatusCount"
                                            src="assets/images/widgets/table/drilldown-i.png" alt="Risk Status Count" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="riskeventdatabase" class="form-label p-0">Risk
                                    Event Data Base</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="riskeventdatabase"
                                            src="assets/images/widgets/table/drilldown-i.png"
                                            alt="Risk Event Data Base" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="dataDragDiv" class="form-label p-0">Data
                                    Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="dataDragDiv"
                                            src="assets/images/widgets/table/data-i.png" alt="Data Table" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="riskRegDiv" class="form-label p-0">Risk
                                    Register</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="riskRegDiv"
                                            src="assets/images/widgets/table/risk-i.png" alt="Risk Register" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="ermriskRegDiv" class="form-label p-0">ERM Risk
                                    Register</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="ermriskRegDiv"
                                            src="assets/images/widgets/table/risk-i.png" alt="Risk Register" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="riskmonitersreg" class="form-label p-0">Risk
                                    Monitoring Register-table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="riskmonitersreg"
                                            src="assets/images/widgets/table/risk-i.png"
                                            alt="Risk Monitoring Register-table" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="biareport" class="form-label p-0">BIA
                                    Report</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="biareport" src="assets/images/widgets/table/risk-i.png"
                                            alt="BIA Report" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="rpobiareport" class="form-label p-0">BIA RPO
                                    Report</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="rpobiareport"
                                            src="assets/images/widgets/table/risk-i.png" alt="BIA RPO Report" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="posbiareport" class="form-label p-0">BIA –POS
                                    Report</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="posbiareport"
                                            src="assets/images/widgets/table/risk-i.png" alt="BIA –POS Report" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="b-trading-hours" class="form-label p-0">Business
                                    Process Based on Trading Hours</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="b-trading-hours"
                                            src="assets/images/widgets/table/risk-i.png"
                                            alt="Business Process Based on Trading Hours" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="occurrence" class="form-label p-0">Risk Events
                                    Frequency of Occurrence</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="occurrence"
                                            src="assets/images/widgets/table/risk-i.png"
                                            alt="Risk Events Frequency of Occurrence" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="pb-critical" class="form-label p-0">Process
                                    Business Critical</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="pb-critical"
                                            src="assets/images/widgets/table/risk-i.png"
                                            alt="Process Business Critical" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="drcavailability" class="form-label p-0">List of
                                    Availability of a DRC system </label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="drcavailability"
                                            src="assets/images/widgets/table/risk-i.png"
                                            alt="List of Availability of a DRC system" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="intRegDiv" class="form-label p-0">Initiative
                                    Register </label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="intRegDiv" src="assets/images/widgets/table/risk-i.png"
                                            alt="Initiative Register" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="cockTypeDiv" class="form-label p-0">R M
                                    Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="cockTypeDiv"
                                            src="assets/images/widgets/table/risk-i.png" alt="R M Table" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="singleWindow" class="form-label p-0">Single
                                    Window</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="singleWindow"
                                            src="assets/images/widgets/table/risk-i.png" alt="Single Window" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- widget table end -->
                </div>

                
                <div class="tab-pane fade" id="WidgetTypeTwo-tab-pane" role="tabpanel"
                    aria-labelledby="WidgetTypeTwo-tab" tabindex="0">
                    <div class="browser-default text-start mb-3">
                        <!-- <label for="widget_type_02" class="form-label">Widget Type 2</label> -->
                        <select id="widget_type_02" name="Initiative_owner" class="form-select form-select-sm"
                            aria-invalid="false">
                            <option value="chart-type-2">Chart</option>
                            <option value="drilldown-type-2">Drilldown Chart</option>
                        </select>
                    </div>
                    <!-- widget chart start -->
                    <div class="widget widget-2 chart-type-2">
                        <div class="grid g-2 chart-w-card">

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble New">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="BubblechartType02" src="assets/images/icons/bubble-chart-i.svg" alt="Bubble Chart new" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="ColumnChart" src="assets/images/icons/column-chart-i.svg" alt="Column Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Line">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="LineChart" src="assets/images/icons/line-chart-i.svg" alt="Line Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Area">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="AreaChart" src="assets/images/icons/area-chart-i.svg" alt="Area Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Pie">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="PieChart" src="assets/images/icons/pie-chart-i.svg" alt="Pie Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Waterfall">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="WaterfallChart" src="assets/images/icons/waterfall-chart-i.svg"
                                    alt="Waterfall Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="MultiAxis" src="assets/images/icons/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Stacked">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="StackedChart" src="assets/images/icons/stcked-chart-i.svg"
                                    alt="Stacked Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Radial">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="RadialMulti" src="assets/images/icons/radial-chart-i.svg" alt="Radial Chart" />
                            </span>

                        </div>
                    </div>
                    <!-- widget chart end -->
                    <!-- widget drilldown start -->
                    <div class="widget widget-2 drilldown-type-2" style="display: none;">
                        <div class="grid g-2 chart-w-card">

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="BubbleChart" src="assets/images/icons/bubble-chart-i.svg" alt="Bubble Chart" />
                            </span>
                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="ColumnChart" src="assets/images/icons/column-chart-i.svg" alt="Column Chart" />
                            </span>
                        </div>
                    </div>
                    <!-- widget drilldown end -->
                </div>
            </div>
        </div>
    </div>
</div>