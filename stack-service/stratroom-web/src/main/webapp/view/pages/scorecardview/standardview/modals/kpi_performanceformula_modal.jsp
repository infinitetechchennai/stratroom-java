 <div class="modal fade kpi_performanceformula_popuppp" id="kpi_formula_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false" data-backdrop="false">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content modal-content-setscrollheight">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">KPI Performance Calculator</h6>
                            <button type="button" id="kpiperclosePopupId" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding: 0 25px">
                        <div class="col-md-8" style="padding: 0">Field Name: &nbsp;                                        
                            <select id="performancefieldId" name="performancefieldName" class="form-control browser-default">
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
                                            <textarea class="browser-default" name="performanceformula" id="performanceformula" placeholder="" cols="" rows="1" autocomplete="off"></textarea>
                                            <!-- <textarea name="formula" id="formula"></textarea> -->
                                        </div>
                                        <div class="row col-md-12">
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('+')">+</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('-')">-</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('*')">*</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('/')">/</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('%')">%</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('(')">(</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance(')')">)</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('[')">[</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance(']')">]</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance(':')">:</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('AND')">AND</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('OR')">OR</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('NOT')">NOT</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('IN')">IN</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('==')">==</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('!=')">!=</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('>')">></button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('<')"><</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('>=')">>=</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updatePerformance('<=')"><=</button>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Fields and measures:</h6>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                    	<input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('PerformancemeasureNames','Performancefieldmeasurefilter')" id="Performancefieldmeasurefilter" autocomplete="off" placeholder="Search">
                                                    	<button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                                        <ul class="list-group" id="PerformancemeasureNames">
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
                                                            <li class="list-group-item" onclick="updatePerformance('if','if')">if</li>
                                                            <li class="list-group-item" onclick="updatePerformance('avg','avg')">avg</li>
                                                            <li class="list-group-item" onclick="updatePerformance('agg','agg')">agg</li>
                                                            <li class="list-group-item" onclick="updatePerformance('count','count')">count</li>
                                                            <li class="list-group-item" onclick="updatePerformance('sum','sum')">sum</li>
                                                            <li class="list-group-item" onclick="updatePerformance('min','min')">min</li>
                                                            <li class="list-group-item" onclick="updatePerformance('max','max')">max</li>
                                                            <!--<li class="list-group-item" onclick="updatePerformance('median','median')">median</li>-->
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="panel panel-primary kpiperformuladynamicdesc" id="result_panel1">
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
                                                <button name="validate" id="validate" class="btn btn-secondary" onclick="handleFormulaValidate('KPIPERFORMANCE')">Validate</button>
                                                <button name="add" id="add" class="btn btn-secondary" onclick="handleFormulaAdd('KPIPERFORMANCE')">Add</button>
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