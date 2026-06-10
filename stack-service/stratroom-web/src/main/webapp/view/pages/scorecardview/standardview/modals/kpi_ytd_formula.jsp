<div class="modal fade kpiYtdFormulaPoPUp" id="kpiYtdFormulaPoPUp" tabindex="-1" role="dialog"
aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false" data-backdrop="false">
<div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content modal-content-setscrollheight">
        <div class="modal-header">
            <h6 class="modal-title" id="myLargeModalLabel">YTD Formula Calculator</h6>
            <button type="button" id="ytdClosePopupId" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" style="padding: 0 25px">
            <div class="card">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item m-l-10">
                        <a class="nav-link active" data-toggle="tab" href="#formula_builder">YTD Formula Builder</a>
                    </li>
                </ul>
                <div class="tab-content" style="padding: 10px">
                    <div class="tab-pane body active" id="formula_builder">
                        <div class="row col-md-12">
                            <textarea class="browser-default" name="customYtdformula" id="customYtdformula" placeholder="" cols="" rows="1" autocomplete="off"></textarea>
                            <!-- <textarea name="formula" id="formula"></textarea> -->
                        </div>
                        <div class="row col-md-12">
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('+')">+</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('-')">-</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('*')">*</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('/')">/</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('%')">%</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('(')">(</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula(')')">)</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('[')">[</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula(']')">]</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula(':')">:</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('AND')">AND</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('OR')">OR</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('NOT')">NOT</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('IN')">IN</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('==')">==</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('!=')">!=</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('>')">></button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('<')"><</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('>=')">>=</button>
                            <button type="button" class="opr btn btn-secondary" onclick="updateYTDFormula('<=')"><=</button>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="panel panel-primary" id="result_panel">
                                    <div class="panel-heading">
                                        <h6 class="panel-title">Fields and measures:</h6>
                                    </div>
                                    <div id="custom-tab" class="btn-group custom-tab-control custom-tab-ytdkpiformula" role="group" aria-label="Custom Tab" style="padding-top: 5px !important;">
                                        <button type="button" class="btn btn-custom-secondary active" data-value="kpiytdformeasure">
                                              Measures
                                        </button>
                                        <button type="button" class="btn btn-custom-secondary" data-value="kpiytdforsubmeasure">
                                             Sub Measures
                                        </button>
                                        <button type="button" class="btn btn-custom-secondary" data-value="kpiytdforinitiative" data-i18n="Initiatives">
                                            Initiatives
                                       </button>
                                      </div>
                                      <div class="ytdcustomTabContent kpiytdformeasure">
                                        <div class="panel-body" data-spy="scroll">
                                            <input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('ytdMeasureNames','ytdFieldmeasurefilter')" id="ytdFieldmeasurefilter" autocomplete="off" placeholder="Search">
                                            <button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                            <ul class="list-group" id="ytdMeasureNames">
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="ytdcustomTabContent kpiytdforsubmeasure" style="display: none;">
                                        <div class="panel-body" data-spy="scroll">
                                            <input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('ytdsubMeasureNames','ytdFieldsubmeasurefilter')" id="ytdFieldsubmeasurefilter" autocomplete="off" placeholder="Search">
                                            <button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                            <ul class="list-group" id="ytdsubMeasureNames">
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="ytdcustomTabContent kpiytdforinitiative" style="display: none;">
                                        <div class="panel-body" data-spy="scroll">
                                            <input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('ytdinitiativeNames','ytdFieldinitiativefilter')" id="ytdFieldinitiativefilter" autocomplete="off" placeholder="Search">
                                            <button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                            <ul class="list-group" id="ytdinitiativeNames">
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
                                            <li class="list-group-item" onclick="updateYTDFormula('if','if')">if</li>
                                            <li class="list-group-item" onclick="updateYTDFormula('avg','avg')">avg</li>
                                            <li class="list-group-item" onclick="updateYTDFormula('agg','agg')">agg</li>
                                            <li class="list-group-item" onclick="updateYTDFormula('count','count')">count</li>
                                            <li class="list-group-item" onclick="updateYTDFormula('sum','sum')">sum</li>
                                            <li class="list-group-item" onclick="updateYTDFormula('min','min')">min</li>
                                            <li class="list-group-item" onclick="updateYTDFormula('max','max')">max</li>
                                            <!--<li class="list-group-item" onclick="updateYTDFormula('median','median')">median</li>-->
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="panel panel-primary ytdformuladynamicdesc" id="result_panel1">
                                    <div class="panel-heading">
                                        <h6 class="panel-title">Function Description:</h6>
                                    </div>
                                    <div class="panel-body">
                                        <h6 class="formulaheaderdesc"></h6>
                                        <p class="formulacontentdesc">
                                            
                                        </p>
                                    </div>
                                    <!-- <input type="checkbox" name="check" /> Show argumnets in formula -->
                                </div>
                            </div>
                        </div>
                        <div class="row">
                           <div class="col-md-4" style="margin-bottom: 0px">
                                <button name="validate" id="validate" class="btn btn-secondary" onclick="handleFormulaValidate('YTD')">Validate</button>
                                <button name="add" id="add" class="btn btn-secondary" onclick="handleFormulaAdd('YTD')">Add</button>
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
</div>