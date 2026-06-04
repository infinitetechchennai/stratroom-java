 <!-- <div class="modal fade scorecard_custom_threshold_popup" id="perspective_custom_threshold_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false" data-backdrop="false">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content modal-content-setscrollheight">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">Performance Calculator</h6>
                            <button type="button" id="scorecardClosePopupId" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding: 0 25px">
                            <div class="card">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item m-l-10">
                                        <a class="nav-link active" data-toggle="tab" href="#formula_builder">Formula Builder</a>
                                    </li>
                                </ul>
                                <div class="tab-content" style="padding: 10px">
                                    <div class="tab-pane body active" id="formula_builder">
                                        <div class="row col-md-12">
                                            <textarea class="browser-default" name="formulaScoreCardPerspective" id="formulaScoreCardPerspective" placeholder="" cols="" rows="1" autocomplete="off"></textarea>

                                        </div>
                                        <div class="row col-md-12">
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('+')">+</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('-')">-</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('*')">*</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('/')">/</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('%')">%</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('(')">(</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective(')')">)</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('[')">[</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective(']')">]</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective(':')">:</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('AND')">AND</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('OR')">OR</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('NOT')">NOT</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('IN')">IN</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('==')">==</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('!=')">!=</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('>')">></button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('<')"><</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('>=')">>=</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateScorecardPerspective('<=')"><=</button>
                                        </div>
                                        <div class="row">
                                        <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Fields and measures:</h6>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                    	<input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('scorecardMeasureNames','scoreCardmeasurefilter')" id="scoreCardmeasurefilter" autocomplete="off" placeholder="Search">
                                                    	<button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                                        <ul class="list-group" id="scorecardMeasureNames">
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel1">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Functions:</h6>
                                                    </div>
                                                    <div class="panel-body">
                                                        <ul class="list-group">
                                                            <li class="list-group-item" onclick="updateScorecardPerspective('if','if')">if</li>
                                                            <li class="list-group-item" onclick="updateScorecardPerspective('avg','avg')">avg</li>
                                                            <li class="list-group-item" onclick="updateScorecardPerspective('agg','agg')">agg</li>
                                                            <li class="list-group-item" onclick="updateScorecardPerspective('count','count')">count</li>
                                                            <li class="list-group-item" onclick="updateScorecardPerspective('sum','sum')">sum</li>
                                                            <li class="list-group-item" onclick="updateScorecardPerspective('min','min')">min</li>
                                                            <li class="list-group-item" onclick="updateScorecardPerspective('max','max')">max</li>
                                                           
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="panel panel-primary formuladynamicdesc" id="result_panel1">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Function Description:</h6>
                                                    </div>
                                                    <div class="panel-body">
                                                        <h6 class="formulaheaderdesc"></h6>
                                                        <p class="formulacontentdesc">
                                                        </p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                           <div class="col-md-4" style="margin-bottom: 0px">
                                                <button name="validate" id="validate" class="btn btn-secondary" onclick="handleFormulaValidate('SCORECARDCONFIG')">Validate</button>
                                                <button name="add" id="add" class="btn btn-secondary" onclick="handleFormulaAdd('SCORECARDCONFIG')">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane body" id="summary_calculation">
                                        <div class="col-md-12">
                                            <div class="panel panel-primary" id="final_panel">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Formula</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <ul class="list-group formula-panel">
                                                            <li class="list-group-item">Elapsed Year</li>
                                                            <li class="list-group-item">Ends With</li>
                                                            <li class="list-group-item">If</li>
                                                            <li class="list-group-item">Is Null</li>
                                                            <li class="list-group-item">Max</li>
                                                            <li class="list-group-item">Min</li>
                                                            <li class="list-group-item">Median</li>
                                                            <li class="list-group-item">Mid</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->





        <!-- ---------------New Design-------------------------- -->
        <div class="modal custom-modal fade scorecard_custom_threshold_popup" id="kpi-calculator-modal" data-backdrop="static" data-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false"
        data-backdrop="false">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel">Performance Calculator</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" id="scorecardClosePopupId"></button>
                </div>
                <div class="modal-body">
                    <!-- <div class="p-2">
                        <label for="KPICalfieldName" class="form-label"><small>Field Name</small></label>
                        <select class="form-select form-select-sm select-dropdown-kpi-calculator"
                            data-placeholder="Select Field Name" id="KPICalfieldName">
                            <option value disabled selected hidden>Select Field Name</option>
                            <option value="Actual">Actual</option>
                            <option value="Target">Target</option>
                            <option value="Budget">Budget</option>
                            <option value="Forecast">Forecast</option>
                            <option value="Gap">Gap</option>
                        </select>
                    </div> -->
                    <div class="card border-0">
                        <div class="card-header bg-transparent border-0">
                            <ul class="nav nav-underline gap-3" role="tablist">
                                <li class="nav-item" role="Formula Builder">
                                    <button class="nav-link text-uppercase active" id="kpiFormulaBuilderTab"
                                        data-toggle="tab" data-target="#kpiFormulaBuilderTab-pane" type="button"
                                        role="tab" aria-controls="kpiFormulaBuilderTab-pane"
                                        aria-selected="true">Formula
                                        Builder</button>
                                </li>
                                <!-- <li class="nav-item" role="Summary Calculation">
                                    <button class="nav-link text-uppercase" id="kpiSummaryCalculationTab"
                                        data-toggle="tab" data-target="#kpiSummaryCalculationTab-pane"
                                        type="button" role="tab" aria-controls="kpiSummaryCalculationTab-pane"
                                        aria-selected="true">Summary Calculation</button>
                                </li> -->
                            </ul>
                        </div>

                        <div class="card-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="kpiFormulaBuilderTab-pane" role="tabpanel"
                                    aria-labelledby="kpiFormulaBuilderTab-pane" tabindex="0">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <textarea class="form-control" name="formulaScoreCardPerspective" id="formulaScoreCardPerspective"
                                                placeholder cols rows="4"></textarea>
                                        </div>
                                        <div class="g-col-12">
                                            <div class="keypad d-flex flex-wrap gap-2">
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('+')">+</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('-')">-</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('%')">*</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('%')">/</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('%')">%</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('(')">(</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective(')')">)</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('[')">[</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective(']')">]</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective(':')">:</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary"onclick="updateScorecardPerspective('AND')">AND</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('OR')">OR</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('NOT')">NOT</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-sm btn-secondary" onclick="updateScorecardPerspective('IN')">IN</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateScorecardPerspective('==')">==</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateScorecardPerspective('!=')">!=</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('>')">&gt;</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updateScorecardPerspective('<')">&lt;</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateScorecardPerspective('>=')">&gt;=</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateScorecardPerspective('<=')">=&lt;</button>
                                            </div>

                                        </div>
                                        <div class="g-col-12 g-col-md-4">

                                            <div class="measuresWrap">

                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">

                                                        <div class="searchMeasures">
                                                            <h6 class="panel-title">Fields and measures:</h6>
                                                            <div class="input-group mb-3">
                                                                <input onkeyup="fieldmeasurefilter('scorecardMeasureNames','scoreCardmeasurefilter')" id="scoreCardmeasurefilter" type="text"
                                                                    class="form-control form-control-sm"
                                                                    placeholder="Search" aria-label="Search"
                                                                    aria-describedby="basic-addon2">
                                                                <button class="btn btn-outline-secondary searchformulaicon" type="button"
                                                                    id="basic-addon2"><i
                                                                        class="fas fa-search"></i></button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                        <ul class="list-group overflow-auto" style="max-height: 180px" id="scorecardMeasureNames">
                                                            <!-- <li class="list-group-item measure-list" data-value="actual">
                                                                Actual</li>
                                                            <li class="list-group-item measure-list"
                                                                data-value="target">Target</li>
                                                            <li class="list-group-item measure-list"
                                                                data-value="Weight">Weight</li>
                                                            <li class="list-group-item measure-list"
                                                                data-value="Contribution">Contribution</li> -->
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="result_panel1">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Functions:</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <ul class="list-group overflow-auto list-group" style="max-height: 240px">
                                                        <li class="list-group-item kpiPerFuncton" onclick="updateScorecardPerspective('if','if')">If</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updateScorecardPerspective('avg','avg')">avg</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updateScorecardPerspective('agg','agg')">agg</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updateScorecardPerspective('count','count')">count</li>
                                                        <li class="list-group-item kpiPerFuncton"  onclick="updateScorecardPerspective('sum','sum')">sum</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updateScorecardPerspective('min','min')">min</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updateScorecardPerspective('max','max')">max</li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary formuladynamicdesc" id="result_panel1">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Function Description:</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <!-- <h6>IF</h6>
                                                    <p>Returns second argument if first
                                                        argument is true;
                                                        Returns optional third argument if
                                                        first argument is
                                                        false; IF('element', 'trueCalc',
                                                        'falseCalc')
                                                    </p> -->
                                                    <h6 class="formulaheaderdesc"></h6>
                                                        <p class="formulacontentdesc">
                                                        </p>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" class="btn btn-sm btn-secondary" onclick="handleFormulaValidate('SCORECARDCONFIG')">
                                            Validate
                                        </button>
                                        <button name="add" id="add" class="btn btn-sm btn-primary mt-2" onclick="handleFormulaAdd('SCORECARDCONFIG')" style="height: 30px;">
                                            Add
                                        </button>
                                    </div>

                                </div>


                                <div class="tab-pane fade" id="kpiSummaryCalculationTab-pane" role="tabpanel"
                                    aria-labelledby="summaryCalculationTab-tab" tabindex="0">
                                    <!-- <div class="tab-pane body" id="summary_calculation"> -->
                                    <div class="col-md-12">
                                        <div class="panel panel-primary" id="summary_calculation">
                                            <div class="panel-heading">
                                                <h6 class="panel-title">Formula</h6>
                                            </div>
                                            <div class="panel-body">
                                                <ul class="list-group formula-panel overflow-auto"
                                                    style="max-height: 240px">
                                                    <li class="list-group-item">Elapsed
                                                        Year</li>
                                                    <li class="list-group-item">Ends
                                                        With</li>
                                                    <li class="list-group-item">If</li>
                                                    <li class="list-group-item">Is
                                                        Null</li>
                                                    <li class="list-group-item">Max</li>
                                                    <li class="list-group-item">Min</li>
                                                    <li class="list-group-item">Median</li>
                                                    <li class="list-group-item">Mid</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>