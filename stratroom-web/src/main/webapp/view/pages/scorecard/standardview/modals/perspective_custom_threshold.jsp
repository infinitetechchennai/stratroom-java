 <!-- <div class="modal fade perspective_custom_threshold_popup" id="perspective_custom_threshold_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false" data-backdrop="false">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content modal-content-setscrollheight">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">Performance Calculator</h6>
                            <button type="button" id="perspectiveClosePopupId" class="close" data-dismiss="modal" aria-label="Close">
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
                                            <textarea class="browser-default" name="formulaCustomPerspective" id="formulaCustomPerspective" placeholder="" cols="" rows="1" autocomplete="off"></textarea>
                                           
                                        </div>
                                        <div class="row col-md-12">
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('+')">+</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('-')">-</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('*')">*</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('/')">/</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('%')">%</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('(')">(</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective(')')">)</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('[')">[</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective(']')">]</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective(':')">:</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('AND')">AND</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('OR')">OR</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('NOT')">NOT</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('IN')">IN</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('==')">==</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('!=')">!=</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('>')">></button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('<')"><</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('>=')">>=</button>
                                            <button type="button" class="opr btn btn-secondary" onclick="updateCustomPerspective('<=')"><=</button>
                                        </div>
                                        <div class="row">
                                        <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Fields and measures:</h6>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                    	<input type="text" class="form-control browser-default" onkeyup="fieldmeasurefilter('perspectiveMeasureNames','perspectivefieldmeasurefilter')" id="perspectivefieldmeasurefilter" autocomplete="off" placeholder="Search">
                                                    	<button type="button" class="searchformulaicon"><i class="fa fa-search"></i></button>
                                                        <ul class="list-group" id="perspectiveMeasureNames">
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
                                                            <li class="list-group-item" onclick="updateCustomPerspective('if','if')">if</li>
                                                            <li class="list-group-item" onclick="updateCustomPerspective('avg','avg')">avg</li>
                                                            <li class="list-group-item" onclick="updateCustomPerspective('agg','agg')">agg</li>
                                                            <li class="list-group-item" onclick="updateCustomPerspective('count','count')">count</li>
                                                            <li class="list-group-item" onclick="updateCustomPerspective('sum','sum')">sum</li>
                                                            <li class="list-group-item" onclick="updateCustomPerspective('min','min')">min</li>
                                                            <li class="list-group-item" onclick="updateCustomPerspective('max','max')">max</li>
                                                           
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="panel panel-primary perspectiveformuladynamicdesc" id="result_panel1">
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
                                                <button name="validate" id="validate" class="btn btn-secondary" onclick="handleFormulaValidate('PERSPECTIVE')">Validate</button>
                                                <button name="add" id="add" class="btn btn-secondary" onclick="handleFormulaAdd('PERSPECTIVE')">Add</button>
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


              <div class="modal custom-modal fade perspective_custom_threshold_popup" id="prespective-calculator-modal" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="prespectiveCalculatorModalLabel"
        aria-hidden="true" modal-backdrop="false" data-backdrop="false">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="prespectiveCalculatorModalLabel">Performance Calculator</h5>
                    <button type="button" id="perspectiveClosePopupId" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-header bg-transparent border-0">
                            <ul class="nav nav-underline gap-3" role="tablist">

                                <li class="nav-item" role="Formula Builder">
                                    <button class="nav-link text-uppercase active" id="prespectiveformulaBuilder-tab"
                                        data-bs-toggle="tab" data-bs-target="#prespectiveformulaBuilder-pane"
                                        type="button" role="tab" aria-controls="prespectiveformulaBuilder-tab-pane"
                                        aria-selected="true">Formula
                                        Builder</button>
                                </li>
                            </ul>
                        </div>

                        <div class="card-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="prespectiveformulaBuilder-pane"
                                    role="tabpanel" aria-labelledby="prespectiveformulaBuilder-tab" tabindex="0">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <textarea class="form-control" name="formula" id="formulaCustomPerspective"
                                                placeholder cols rows="4"></textarea>
                                        </div>
                                        <div class="g-col-12">
                                            <div class="keypad d-flex flex-wrap gap-2">
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('+')">+</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('-')">-</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('*')">*</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('/')">/</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('%')">%</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('(')">(</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective(')')">)</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('[')">[</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective(']')">]</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective(':')">:</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('AND')">AND</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('OR')">OR</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('NOT')">NOT</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-sm btn-secondary" onclick="updateCustomPerspective('IN')">IN</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomPerspective('==')">==</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomPerspective('!=')">!=</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('>')">></button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary" onclick="updateCustomPerspective('<')"> < </button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomPerspective('>=')">&gt;=</button>
                                                <button type="button"
                                                    class="prespective-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomPerspective('<=')">=&lt;</button>
                                            </div>

                                        </div>


                                        <div class="g-col-12 g-col-md-4">

                                            <div class="measuresWrap">

                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">
                                                        <div class="searchMeasures">
                                                            <h6 class="panel-title">Fields and measures:</h6>
                                                            <div class="input-group mb-3">
                                                                <input onkeyup="fieldmeasurefilter('perspectiveMeasureNames','perspectivefieldmeasurefilter')" id="perspectivefieldmeasurefilter" type="text"
                                                                    class="form-control form-control-sm"
                                                                    placeholder="Search" aria-label="Search"
                                                                    aria-describedby="basic-addon3">
                                                                <button class="btn btn-outline-secondary searchformulaicon" type="button"
                                                                    id="basic-addon3"><i
                                                                        class="fas fa-search "></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                        <ul class="list-group" id="perspectiveMeasureNames">
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
                                                    <ul class="list-group overflow-auto" style="max-height: 240px">
                                                        <li class="list-group-item prespectiveFuncton" onclick="updateCustomPerspective('if','if')">If</li>
                                                        <li class="list-group-item prespectiveFuncton" onclick="updateCustomPerspective('avg','avg')">avg</li>
                                                        <li class="list-group-item prespectiveFuncton" onclick="updateCustomPerspective('agg','agg')">agg</li>
                                                        <li class="list-group-item prespectiveFuncton" onclick="updateCustomPerspective('count','count')">count</li>
                                                        <li class="list-group-item prespectiveFuncton" onclick="updateCustomPerspective('sum','sum')">sum</li>
                                                        <li class="list-group-item prespectiveFuncton" onclick="updateCustomPerspective('min','min')">min</li>
                                                        <li class="list-group-item prespectiveFuncton" onclick="updateCustomPerspective('max','max')">max</li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="prespectiveFunctonResult_panel">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Function
                                                        Description:</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <h6 class="formulaheaderdesc"></h6>
                                                        <p class="formulacontentdesc">
                                                            
                                                        </p>
                                                </div>



                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" class="btn btn-sm btn-secondary" onclick="handleFormulaValidate('PERSPECTIVE')">
                                            Validate
                                        </button>
                                        <button name="add" id="add" class="btn btn-sm btn-primary" onclick="handleFormulaAdd('PERSPECTIVE')" style="height: 20px; margin-top: 9px; width: 45px;">
                                            Add
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>