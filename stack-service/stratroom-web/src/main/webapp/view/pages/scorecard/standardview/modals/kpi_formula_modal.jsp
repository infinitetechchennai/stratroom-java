<!-- <div class="modal fade kpi_formula_popup" id="kpi_formula_popup" tabindex="-1" role="dialog"
aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false" data-backdrop="false">
<div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content modal-content-setscrollheight">
        <div class="modal-header">
            <h6 class="modal-title" id="myLargeModalLabel">KPI Calculatorrr</h6>
            <button type="button" id="closePopupId" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" style="padding: 0 25px">
        <div class="col-md-8" style="padding: 0">Field Name: &nbsp;                                        
            
            <select id="fieldId" name="fieldName" class="form-control browser-default">
                <option value="A" data-i18n="Actual">Actual</option>
                <option value="T" data-i18n="Target">Target</option>
                <option value="B" data-i18n="Budget">Budget</option>
            </select>
         </div>                           
            <div class="card">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item m-l-10">
                        <a class="nav-link active" data-toggle="tab" href="#formula_builder">Formula Builder</a>
                    </li>
                    <li class="nav-item m-l-10">
                        <a class="nav-link" data-toggle="tab" href="#summary_calculation">Summary Calculation</a>
                    </li>
                </ul>
                <div class="tab-content" style="padding: 10px">
                    <div class="tab-pane body active" id="formula_builder">
                        <div class="row col-md-12">
                            <textarea class="browser-default" name="formula" id="formula" placeholder="" cols="" rows="1" autocomplete="off"></textarea>
                        </div>
                        <div class="row col-md-12">
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('+')">+</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('-')">-</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('*')">*</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('/')">/</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('%')">%</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('(')">(</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula(')')">)</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('[')">[</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula(']')">]</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula(':')">:</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('AND')">AND</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('OR')">OR</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('NOT')">NOT</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('IN')">IN</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('==')">==</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('!=')">!=</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('>')">></button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('<')"><</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('>=')">>=</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateFormula('<=')"><=</button>
                        </div>
                        <div class="row">
                            <div class="col-md-7">
                                <div class="panel panel-primary" id="result_panel">
                                    <div class="panel-heading">
                                        <h6 class="panel-title">Fields and measures:</h6>
                                    </div>
                                       
                                       <div id="custom-tab" class="btn-group custom-tab-kpiformula custom-tab-control" role="group" aria-label="Custom Tab" style="padding-top: 5px !important;">
                                        <button type="button" class="btn btn-custom-secondary active" data-value="kpiformeasure">
                                              Measures
                                        </button>
                                        <button type="button" class="btn btn-custom-secondary" data-value="kpiforsubmeasure">
                                             Sub Measures
                                        </button>
                                        <button type="button" class="btn btn-custom-secondary" data-value="kpiforinitiatives" data-i18n="Initiatives">
                                            Initiatives
                                       </button>
                                      </div>
                                      <div class="customTabContent kpiformeasure">
                                        <div class="panel-body" data-spy="scroll">
                                            <input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('measureNames','fieldmeasurefilter')" id="fieldmeasurefilter" autocomplete="off" placeholder="Search">
                                            <button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                            <ul class="list-group" id="measureNames">
                                            </ul>
                                        </div>
                                   </div>
                                   <div class="customTabContent kpiforsubmeasure" style="display: none;">
                                        <div class="panel-body" data-spy="scroll">
                                            <input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('kpisubmeasureNames','fieldsubmeasurefilter')" id="fieldsubmeasurefilter" autocomplete="off" placeholder="Search">
                                            <button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                            <ul class="list-group" id="kpisubmeasureNames">
                                            </ul>
                                        </div>
                                   </div>    
                                   <div class="customTabContent kpiforinitiatives" style="display: none;">
                                        <div class="panel-body" data-spy="scroll">
                                            <input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('kpiinitiativeNames','fieldinitiativefilter')" id="fieldinitiativefilter" autocomplete="off" placeholder="Search">
                                            <button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                           <ul class="list-group" id="kpiinitiativeNames">
                                            </ul>
                                         </div>
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
                                            <li class="list-group-item" onclick="updateFormula('if','if')">if</li>
                                            <li class="list-group-item" onclick="updateFormula('avg','avg')">avg</li>
                                            <li class="list-group-item" onclick="updateFormula('agg','agg')">agg</li>
                                            <li class="list-group-item" onclick="updateFormula('count','count')">count</li>
                                            <li class="list-group-item" onclick="updateFormula('sum','sum')">sum</li>
                                            <li class="list-group-item" onclick="updateFormula('min','min')">min</li>
                                            <li class="list-group-item" onclick="updateFormula('max','max')">max</li>
                                           
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="panel panel-primary targetformuladynamicdesc" id="result_panel1">
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
                                <button name="validate" id="validate" class="btn btn-secondary" onclick="handleFormulaValidate('KPI')">Validate</button>
                                <button name="add" id="add" class="btn btn-secondary" onclick="handleFormulaAdd('KPI')">Add</button>
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



<div class="modal custom-modal fade kpi_formula_popup" id="kpiActual-calculator-modal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false"
        data-backdrop="false">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel">KPI Calculator</h5>
                    <button type="button" id="closePopupId" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="p-2">
                        <label for="kpiActualCalfieldName" class="form-label"><small>Field Name</small></label>
                       <select id="fieldId" name="fieldName" class="form-control browser-default">
                            <option value="A" data-i18n="Actual">Actual</option>
                            <option value="T" data-i18n="Target">Target</option>
                            <option value="B" data-i18n="Budget">Budget</option>
                        </select>
                    </div>
                    <div class="card border-0">
                        <div class="card-header bg-transparent border-0">
                            <ul class="nav nav-underline gap-3" role="tablist">
                                <li class="nav-item" role="Formula Builder">
                                    <button class="nav-link text-uppercase active" id="kpiActualFormulaBuilderTab"
                                        data-bs-toggle="tab" data-bs-target="#kpiActualFormulaBuilderTab-pane" type="button"
                                        role="tab" aria-controls="kpiActualFormulaBuilderTab-pane" href="#formula_builder"
                                        aria-selected="true">Formula
                                        Builder</button>
                                </li>
                                <li class="nav-item" role="Summary Calculation">
                                    <button class="nav-link text-uppercase" id="kpiActualSummaryCalculationTab"
                                        data-bs-toggle="tab" data-bs-target="#kpiActualSummaryCalculationTab-pane"
                                        type="button" role="tab" aria-controls="kpiActualSummaryCalculationTab-pane"
                                        aria-selected="true" href="#summary_calculation">Summary Calculation</button>
                                </li>
                            </ul>
                        </div>

                        <div class="card-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="kpiActualFormulaBuilderTab-pane" role="tabpanel"
                                    aria-labelledby="kpiActualFormulaBuilderTab-pane" tabindex="0">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <textarea class="form-control" name="formula" id="formula"
                                                placeholder cols rows="4"></textarea>
                                        </div>
                                        <div class="g-col-12">
                                            <div class="keypad d-flex flex-wrap gap-2">
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('+')">+</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('-')">-</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('*')">*</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('/')">/</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('%')">%</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('(')">(</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula(')')">)</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('[')">[</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula(']')">]</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula(':')">:</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('AND')">AND</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('OR')">OR</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('NOT')">NOT</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-sm btn-secondary" onclick="updateFormula('IN')">IN</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateFormula('==')">==</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateFormula('!=')">!=</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('>')">&gt;</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary" onclick="updateFormula('<')">&lt;</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateFormula('>=')">&gt;=</button>
                                                <button type="button"
                                                    class="kpiActual-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateFormula('<=')">=&lt;</button>
                                            </div>

                                        </div>


                                        <div class="g-col-12 g-col-md-4">

                                            <div class="measuresWrap">
                                                <h6 class="panel-title">Fields and measures:</h6>
                                                <ul class="nav nav-pills mb-2" id="pills-tab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active rounded-0" id="pills-kpiActualMeasures-tab"
                                                            data-bs-toggle="pill" href="#pills-kpiActualMeasures" role="tab"
                                                            aria-controls="pills-kpiActualMeasures"
                                                            aria-selected="true" data-value="kpiformeasure">Measures</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link rounded-0" id="pills-kpiActualSubMeasures-tab"
                                                            data-bs-toggle="pill" href="#pills-kpiActualSubMeasures" role="tab"
                                                            aria-controls="pills-kpiActualSubMeasures" aria-selected="false" data-value="kpiforsubmeasure">Sub
                                                            Measures</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link rounded-0" id="pills-kpiActualInitiatives-tab"
                                                            data-bs-toggle="pill" href="#pills-kpiActualInitiatives" role="tab"
                                                            aria-controls="pills-kpiActualInitiatives" aria-selected="false" data-value="kpiforinitiatives">Initiatives</a>
                                                    </li>
                                                </ul>

                                                <div class="tab-content" id="pills-tabContent">
                                                    <div class="tab-pane fade show active" id="pills-kpiActualMeasures"
                                                        role="tabpanel" aria-labelledby="pills-home-tab">
                                                        <div class="panel panel-primary" id="result_panel">
                                                            <div class="panel-heading">
                                                                <div class="searchMeasures">
                                                                    <div class="input-group mb-3">
                                                                        <input onkeyup="fieldmeasurefilter('measureNames','fieldmeasurefilter')" id="fieldmeasurefilter" type="text"
                                                                            class="form-control form-control-sm"
                                                                            placeholder="Search" aria-label="Search"
                                                                            aria-describedby="basic-addon2">
                                                                        <button class="btn btn-outline-secondary searchformulaicon"
                                                                            type="button" id="basic-addon2"><i
                                                                                class="fas fa-search"></i></button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="panel-body" data-spy="scroll">
                                                                <ul class="list-group" id="measureNames">
                                            </ul>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="tab-pane fade" id="pills-kpiActualSubMeasures" role="tabpanel"
                                                        aria-labelledby="pills-subMeasures-tab">
                                                        <div class="panel panel-primary" id="result_panel">
                                                            <div class="panel-heading">
                                                                <div class="searchMeasures">
                                                                    <div class="input-group mb-3">
                                                                        <input onkeyup="fieldmeasurefilter('kpisubmeasureNames','fieldsubmeasurefilter')" id="kpiActualSearchSubMeasure" type="text"
                                                                            class="form-control form-control-sm"
                                                                            placeholder="Search" aria-label="Search"
                                                                            aria-describedby="basic-addon2">
                                                                        <button class="btn btn-outline-secondary searchformulaicon"
                                                                            type="button" id="basic-addon3"><i
                                                                                class="fas fa-search"></i></button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="panel-body" data-spy="scroll">
                                                              <ul class="list-group" id="kpisubmeasureNames">
                                            </ul>

                                                            </div>
                                                        </div>
                                                    </div>
                                                     <div class="tab-pane fade" id="pills-kpiActualInitiatives" role="tabpanel"
                                                        aria-labelledby="pills-initiatives-tab">
                                                        <div class="panel panel-primary" id="result_panel">
                                                            <div class="panel-heading">
                                                                <div class="searchMeasures">
                                                                    <div class="input-group mb-3">
                                                                        <input id="kpiActualSearchInitiatives" type="text"
                                                                            class="form-control form-control-sm"
                                                                            placeholder="Search" aria-label="Search"
                                                                            aria-describedby="basic-addon2" onkeyup="fieldmeasurefilter('kpiinitiativeNames','fieldinitiativefilter')" id="fieldinitiativefilter">
                                                                        <button class="btn btn-outline-secondary searchformulaicon"
                                                                            type="button" id="basic-addon3"><i
                                                                                class="fas fa-search"></i></button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="panel-body" data-spy="scroll">
                                                                <ul class="list-group" id="kpiinitiativeNames">
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="kpiActualResult_panel1">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Functions:</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <ul class="list-group overflow-auto" style="max-height: 240px">
                                                        <li class="list-group-item kpiActualFuncton" onclick="updateFormula('if','if')">If</li>
                                                        <li class="list-group-item kpiActualFuncton" onclick="updateFormula('avg','avg')">avg</li>
                                                        <li class="list-group-item kpiActualFuncton" onclick="updateFormula('agg','agg')">agg</li>
                                                        <li class="list-group-item kpiActualFuncton" onclick="updateFormula('count','count')">count</li>
                                                        <li class="list-group-item kpiActualFuncton" onclick="updateFormula('sum','sum')">sum</li>
                                                        <li class="list-group-item kpiActualFuncton" onclick="updateFormula('min','min')">min</li>
                                                        <li class="list-group-item kpiActualFuncton" onclick="updateFormula('max','max')">max</li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="kpiActualResult_panel">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Function Description:</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <h6 class="formulaheaderdesc"></h6>
                                        <p class="formulacontentdesc">
                                                </div>



                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" class="btn btn-sm btn-secondary" onclick="handleFormulaValidate('KPI')">
                                            Validate
                                        </button>
                                        <button name="add" id="add" class="btn btn-sm btn-primary" onclick="handleFormulaAdd('KPI')" style="height: 20px; margin-top: 9px; width: 45px;">
                                            Add
                                        </button>
                                    </div>

                                </div>


                                <div class="tab-pane fade" id="kpiActualSummaryCalculationTab-pane" role="tabpanel"
                                    aria-labelledby="kpiActualsummaryCalculationTab-tab" tabindex="0">
                                    <!-- <div class="tab-pane body" id="summary_calculation"> -->
                                    <div class="col-md-12">
                                        <div class="panel panel-primary" id="final_panel">
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