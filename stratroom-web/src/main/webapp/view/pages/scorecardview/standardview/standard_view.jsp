<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<head>
	<jsp:include page="../../common/header.jsp"></jsp:include>
    <link href="${contextroot}/application/css/standard_view.css" rel="stylesheet" />
    
    <style>
    .btn-secondary {    
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
        padding: 0px 12px;
        font-size: 12px;
        background-color: #02162a;
        margin-right: 3px;
        margin-bottom: 9px;
        border-radius: 8px !important;
        margin-top: 8px;
    }
    .btn-secondary:hover {    
        color: #fff !important;
        background-color: #6c757d !important;
        border-color: #6c757d !important;
        padding: 0px 12px !important;
        font-size: 12px !important;
        background-color: #02162a !important;
        margin-right: 3px !important;
        margin-bottom: 9px !important;
        border-radius: 8px !important;
        margin-top: 8px !important;
    }
    .list-group {
        max-height: 215px;
        margin-bottom: 10px;
        overflow: scroll;
        overflow-x: inherit;
        -webkit-overflow-scrolling: touch;
        font-size: 11px;
        border: 1px solid #e9ecef;
    }
    
    #result_panel>.panelbody>.list-group>.list-group-item{
        padding: 5px 10px !important;
    }

    #formula_builder, #summary_calculation{
        font-size: 11px !important;
    }
    
    #kpi_formula_popup>.modal-content>.modal-body{
            padding: 0 25px !important;
    }

    #kpi_formula_popup>.modal-content>.modal-body.card>.tab-content{
            padding: 0;
    }
    #formula_builder{
        padding-bottom: 0px;
    }
    .panel:hover {
        cursor: pointer;
    }        

    #formula-builder .col-md-4{
        margin-bottom: 0px;
    }
    .modal #kpi_formula_popup{
        background-color: rgba(238, 238, 238, 0) !important;
    }
    /* .modal-backdrop{
        opacity:0.5 !important;
    } */
    #kpi_formula_popup .modal-content .nav li a.nav-link{
        font-size: 12px !important;
    }
    
    
    #file-validate1 .img-center img,
#file-save .img-center img {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 140px;
}

    #file-validate2 .img-center img,
#file-save .img-center img {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 140px;
}
    </style>
</head>
<body class="light">
	<jsp:include page="../../common/top-navigation.jsp"></jsp:include>
	<div>
        <div style="display: none;">
            <jsp:include page="../common/left-navigation.jsp"></jsp:include>
            <jsp:include page="../common/right-navigation.jsp"></jsp:include>
          </div>
           <!-- #Start Scorecard Desc PopUp -->

            <div class="modal fade scorecard_description_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel" data-i18n="Scorecard Description">Scorecard Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="objectiveForm">
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="objective_id">ID</label>
                                        <input type="text" class="form-control browser-default" name="objective_id" id="objective_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-10">
                                        <label for="objective_name" data-i18n="Name">Name</label>
                                        <input type="text" class="form-control browser-default" name="objective_name" id="objective_name" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group mt--10">
                                    <label for="objective_description">Description</label>
                                    <textarea class="form-control browser-default" name="objective_description" id="objective_description" placeholder="" cols="" rows="1"></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group browser-default col-md-6">
                                        <label for="objective_owner">Owner</label>
                                        <select id="objective_owner" name="objective_owner" class="form-control mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="">Option 1</option>
                                            <option value="">Option 2</option>
                                            <option value="">Option 3</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label>
                                        <input type="text" class="form-control browser-default date_pickers" data-range="true" data-multiple-dates-separator=" - " data-language="en" class="datepicker-here" id="air-date-score"/>
                                        <!-- <input type="text" class="form-control browser-default date_pickers" name="objective_start_end_date" id="objective_start_end_date"> -->
                                    </div>
                                </div>
                                <div class="form-row mt-2">
                                    <label for="kpi_fields" class="ml-2 mr-3" data-i18n="Scorecard Fields">Scorecard Fields </label>
                                    <ul class="d-flex flex-row flex-wrap ml-2">
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Actual
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label" data-i18n="Target">
                                                        <input class="form-check-input" type="checkbox" value="" >
                                                        Target
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Budget
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label" data-i18n="Forecast">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Forecast
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Trend
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Risk
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="objective_weight">Weight</label>
                                        <input type="text" class="form-control browser-default" name="objective_weight" id="objective_weight">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="objective_start_end_date">Status</label>
                                        <select id="inputState" name="" class="form-control browser-default mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="manual" data-i18n="Manual">Manual</option>
                                            <option value="weighted">Weighted</option>
                                            <!--option value="first">First</option>
                                            <option value="second">Second</option>
                                            <option value="third">Third</option>
                                            <option value="fourth">Fourth</option-->
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="objective_start_end_date">Attachment</label>
                                        <input type="file" class="mt-1" id="">
                                    </div>
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="scorecard_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- #END# Scorecard Desc PopUp -->

            <!-- #Start Perspective Desc PopUp -->

            <div class="modal fade perspectives_description_popup" tabindex="-1" role="dialog"
            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">Perspective Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="objectiveForm">
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="objective_id">ID</label>
                                        <input type="text" class="form-control browser-default" name="objective_id" id="objective_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-10">
                                        <label for="objective_name" data-i18n="Name">Name</label>
                                        <input type="text" class="form-control browser-default" name="objective_name" id="objective_name" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group mt--10">
                                    <label for="objective_description">Description</label>
                                    <textarea class="form-control browser-default" name="objective_description" id="objective_description" placeholder="" cols="" rows="1"></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group browser-default col-md-6">
                                        <label for="objective_owner">Owner</label>
                                        <select id="objective_owner" name="objective_owner" class="form-control mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="">Option 1</option>
                                            <option value="">Option 2</option>
                                            <option value="">Option 3</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label>
                                        <input type="text" class="form-control browser-default" data-range="true" data-multiple-dates-separator=" - " data-language="en" class="datepicker-here" id="air-date-pers"/>
                                        <!-- <input type="text" class="form-control browser-default date_pickers" name="objective_start_end_date" id="objective_start_end_date"> -->
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="objective_weight">Weight</label>
                                        <input type="text" class="form-control browser-default" name="objective_weight" id="objective_weight">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="objective_start_end_date">Status</label>
                                        <select id="inputState" name="" class="form-control browser-default mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="manual" data-i18n="Manual">Manual</option>
                                            <option value="weighted">Weighted</option>
                                            <!--option value="first">First</option>
                                            <option value="second">Second</option>
                                            <option value="third">Third</option>
                                            <option value="fourth">Fourth</option-->
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="objective_start_end_date">Attachment</label>
                                        <input type="file" class="" id="">
                                    </div>
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="scorecard_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- #END# perspective Desc Sidebar -->


            <!-- #Start Objective Desc PopUp -->

            <div class="modal fade objective_description_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">Objective Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="objectiveForm">
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="objective_id">ID</label>
                                        <input type="text" class="form-control browser-default" name="objective_id" id="objective_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-10">
                                        <label for="objective_name" data-i18n="Name">Name</label>
                                        <input type="text" class="form-control browser-default" name="objective_name" id="objective_name" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group mt--10">
                                    <label for="objective_description">Description</label>
                                    <textarea class="form-control browser-default" name="objective_description" id="objective_description" placeholder="" cols="" rows="1"></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group browser-default col-md-6">
                                        <label for="objective_owner">Owner</label>
                                        <select id="objective_owner" name="objective_owner" class="form-control mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="">Option 1</option>
                                            <option value="">Option 2</option>
                                            <option value="">Option 3</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label>
                                        <input type="text" class="form-control browser-default" data-range="true" data-multiple-dates-separator=" - " data-language="en" class="datepicker-here" id="air-date-object"/>
                                        <!-- <input type="text" class="form-control browser-default date_pickers" name="objective_start_end_date" id="objective_start_end_date"> -->
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="objective_weight">Weight</label>
                                        <input type="text" class="form-control browser-default" name="objective_weight" id="objective_weight">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="objective_start_end_date">Status</label>
                                        <select id="inputState" name="" class="form-control browser-default mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="manual" data-i18n="Manual">Manual</option>
                                            <option value="weighted">Weighted</option>
                                            <!--option value="first">First</option>
                                            <option value="second">Second</option>
                                            <option value="third">Third</option>
                                            <option value="fourth">Fourth</option-->
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="objective_start_end_date">Attachment</label>
                                        <input type="file" class="" id="">
                                    </div>
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="scorecard_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- #END# Objective Desc PopUp -->


            <!-- #Start KPI Desc PopUp -->

            <div class="modal fade kpi_description_popup" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">KPI Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="kpiForm">
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="kpi_id">ID</label>
                                        <input type="text" class="form-control browser-default" name="kpi_id" id="kpi_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-8">
                                        <label for="kpi_name" data-i18n="Name">Name</label>
                                        <input type="text" class="form-control browser-default" name="kpi_name" id="kpi_name" placeholder="">
                                    </div>
                                    <div class="form-group browser-default col-md-2">
                                        <label for="kpi_type">KPI Type</label>
                                        <select id="kpi_type" name="kpi_type" class="form-control mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="lead" data-i18n="Lead">Lead</option>
                                            <option value="lag" data-i18n="Lag">Lag</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group mt--10">
                                    <label for="kpi_description">Description</label>
                                    <textarea class="form-control browser-default" name="kpi_description" id="kpi_description" placeholder="" cols="" rows="1"></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group browser-default col-md-4">
                                        <label for="kpi_measurement" data-i18n="Measurement Frequency">Measurement Frequency</label>
                                        <select id="kpi_measurement" name="kpi_measurement" class="form-control mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly" data-i18n="Weekly">Weekly</option>
                                            <option value="monthly" data-i18n="Monthly">Monthly</option>
                                            <option value="quarter">Quarter</option>
                                            <option value="half year">Half Year</option>
                                            <option value="annual">Annual</option>
                                        </select>
                                    </div>
                                    <div class="form-group browser-default col-md-4">
                                        <label for="kpi_owner">Owner</label>
                                        <select id="kpi_owner" name="kpi_owner" class="form-control mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="">Option 1</option>
                                            <option value="">Option 2</option>
                                            <option value="">Option 3</option>
                                        </select>
                                    </div>
                                    <div class="form-group browser-default col-md-4">
                                        <label for="kpi_datasource" data-i18n="Data Source">Data Source</label>
                                        <select id="kpi_datasource" name="kpi_datasource" class="form-control mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="manual" data-i18n="Manual">Manual</option>
                                            <option value="source" data-i18n="Source">Source</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row mt-2">
                                    <label for="kpi_fields" class="ml-2 mr-3">KPI Fields </label>
                                    <ul class="d-flex flex-row flex-wrap ml-2">
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Actual
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label" data-i18n="Target">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Target
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Budget
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" value="">
                                                        Forecast
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="form-row">
                                  <div class="form-group col-md-4">
                                      <label for="inputState">KPI Formula</label>
                                      <input type="text" class="form-control browser-default" name="kpi_formula" id="kpi_formula" readonly>
                                      <a href="#" id="kpi_trigger" data-toggle="modal" data-target=".kpi_formula_popup"></a>
                                  </div>

                                    <div class="form-group col-md-4">
                                        <label for="kpi_threshold" data-i18n="Threshold">Threshold</label>
                                        <select id="kpi_threshold" class="form-control browser-default mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="option_1">Option 1</option>
                                            <option value="option_2">Option 2</option>
                                            <option value="three_status" data-i18n="Three Status">Three Status</option>
                                            <option value="five_statu">Five Status</option>

                                        </select>
                                    </div>

                                    <div class="form-group col-md-2 color_picks_1" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-2 color_picks_1" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="form-group col-md-4 color_picks_2" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4 color_picks_2" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4 color_picks_2" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="form-group col-md-4 color_picks_3" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-3 color_picks_3" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-3 color_picks_3" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-3 color_picks_3" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-3 color_picks_3" style="display: none;">
                                        <div class="input-group m-t-24">
                                            <input type="text" class="form-control browser-default">
                                            <div class="input-group-append">
                                                <span class="input-group-text pickr"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label>
                                        <input type="text" class="form-control browser-default" data-range="true" data-multiple-dates-separator=" - " data-language="en" class="datepicker-here" id="air-date"/>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="kpi_weight">Weight</label>
                                        <input type="text" class="form-control browser-default" name="kpi_weight" id="kpi_weight">
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="kpi_start_end_date">Status</label>
                                        <select id="inputState" class="form-control browser-default mt-1">
                                            <option data-i18n="Choose">Choose</option>
                                            <option value="manual" data-i18n="Manual">Manual</option>
                                            <option value="weighted">Weighted</option>
                                            <!--option value="first">First</option>
                                            <option value="second">Second</option>
                                            <option value="third">Third</option>
                                            <option value="fourth">Fourth</option-->
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="objective_start_end_date">Attachment</label>
                                        <input type="file" class="" id="">
                                    </div>
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="scorecard_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- #Start Perspective PopUp -->

            <div class="modal fade perspective_expend_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <!-- <h6 class="modal-title" id="myLargeModalLabel">Objective Description</h6> -->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="card">
                                        <div class="header nestedRed">
                                            <h2 class="prob">
                                                <strong class="perspective" data-i18n="Financial">Financial</strong> </h2>
                                        </div>
                                        <div class="tableBody">
                                            <div class="table-responsive">
                                                <table class="treetable table table-striped dashboard-task-infos align-center" id="table1">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>ID</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th data-i18n="Period">Period</th>
                                                            <th data-i18n="Actual">Actual</th>
                                                            <th data-i18n="Target">Target</th>
                                                            <th data-i18n="Trend">Trend</th>
                                                            <th data-i18n="Risk">Risk</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>F1</td>
                                                            <td style="text-align: left" colspan="6"><strong>Increase shareholder value</strong></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>F1.1</th>
                                                            <th style="text-align: left" colspan="3">ROCE</th>
                                                            <th>Month</th>
                                                            <th>13.4%</th>
                                                            <th>12.9%</th>
                                                            <th><i class="fas fa-arrow-up"></i></th>
                                                            <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="green fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>F2</td>
                                                            <td style="text-align: left" colspan="6"><strong>Generate profitable revenue growth</strong></td>
                                                            <td><i class="fas fa-arrow-right"></i></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>F2.1</th>
                                                            <th style="text-align: left" colspan="3">Operating Cost </th>
                                                            <th>Month</th>
                                                            <th>$12690.2</th>
                                                            <th>$12874.2</th>
                                                            <th><i class="fas fa-arrow-up"></i></th>
                                                            <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>F3</td>
                                                            <td style="text-align: left" colspan="6"><strong>Optimize cash generation</strong></td>
                                                            <td><i class="fas fa-arrow-down"></i></td>
                                                            <td></td>

                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>F3.1</th>
                                                            <th style="text-align: left" colspan="3">Available Cashflow</th>
                                                            <th>Month</th>
                                                            <th>$-2.6M</th>
                                                            <th>$19.4M</th>
                                                            <th><i class="fas fa-arrow-right"></i></th>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>

                                                        </tr>
                                                    </thead>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>F3.2</th>
                                                            <th style="text-align: left" colspan="3">Sales to working capital ration</th>
                                                            <th>Month</th>
                                                            <th>1.8</th>
                                                            <th>1.7</th>
                                                            <th><i class="fas fa-arrow-down"></i></th>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>

                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- #END# Perspective PopUp -->

            <!-- #Start Objective Desc PopUp -->

            <div class="modal fade customer_perspective_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <!-- <h6 class="modal-title" id="myLargeModalLabel">Objective Description</h6> -->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                                <div class="col-lg-12 col-md-12">
                                        <div class="card">
                                            <div class="header nestedGreen">
                                                <h2 class="prob">
                                                    <strong class="perspective" data-i18n="Customer">Customer</strong> </h2>
                                                <ul class="header-dropdown m-r--5">
                                                    <li class="dropdown m-t--10">
                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                            <i class="material-icons">more_vert</i>
                                                        </a>
                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                            <li>
                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">Add</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">Edit</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">View</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" onclick="return false;">Delete</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="tableBody">
                                                <div class="table-responsive">
                                                    <table class="treetable table table-striped dashboard-task-infos align-center" id="table1">
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>ID</th>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                                <th data-i18n="Period">Period</th>
                                                                <th data-i18n="Actual">Actual</th>
                                                                <th data-i18n="Target">Target</th>
                                                                <th data-i18n="Trend">Trend</th>
                                                                <th data-i18n="Risk">Risk</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr data-node="treetable-1">
                                                                <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                                <td>C1</td>
                                                                <td style="text-align: left" colspan="6"><strong>We patner to provide best products</strong></td>
                                                                        <td><i class="fas fa-arrow-down red"></i></td>
                                                                        <td></td>

                                                                    </tr>
                                                                </tbody>
                                                                <thead>
                                                                    <tr>
                                                                        <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>
                                                                        <th>c1.1</th>
                                                                        <th style="text-align: left" colspan="3">Customer satisfaction</th>
                                                                        <th>Quarter</th>
                                                                        <th>3.9</th>
                                                                        <th>4.1</th>
                                                                        <th><i class="fas fa-arrow-down red"></i></th>
                                                                        <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <tr data-node="treetable-1">
                                                                            <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                                            <td>C2</td>
                                                                            <td style="text-align: left" colspan="6"><strong>Lead in quality and service</strong></td>
                                                                            <td><i class="fas fa-arrow-up green"></i></td>
                                                                            <td></td>

                                                                        </tr>
                                                                    </tbody>
                                                                    <thead>
                                                                        <tr>
                                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                                            <th>C2.1</th>
                                                                            <th style="text-align: left" colspan="3">Third party survey results</th>
                                                                            <th>Month</th>
                                                                            <th>69.7%</th>
                                                                            <th>70.4%</th>
                                                                            <th><i class="fas fa-arrow-up"></i></th>
                                                                            <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>

                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                            <tr data-node="treetable-1">
                                                                                <td><i class="green fas fa-circle" style="font-size:10px !important"></i></td>
                                                                                <td>C3</td>
                                                                                <td style="text-align: left" colspan="6"><strong>We are recognised in the forefront of our industry</strong></td>
                                                                                <td><i class="fas fa-arrow-right"></i></td>
                                                                                <td></td>

                                                                            </tr>
                                                                        </tbody>
                                                                        <thead>
                                                                            <tr>
                                                                                <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                                                <th>C3.1</th>
                                                                                <th style="text-align: left" colspan="3">Positive Media</th>
                                                                                <th>Year</th>
                                                                                <th>64%</th>
                                                                                <th>67%</th>
                                                                                <th><i class="fas fa-arrow-right"></i></th>
                                                                                <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>

                                                                            </tr>
                                                                        </thead>
                                                                        <thead>
                                                                            <tr>
                                                                                <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                                                <th>C3.2</th>
                                                                                <th style="text-align: left" colspan="3">Event sponserships</th>
                                                                                <th>Month</th>
                                                                                <th>7</th>
                                                                                <th>5</th>
                                                                                <th><i class="fas fa-arrow-up"></i></th>
                                                                                <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>

                                                                            </tr>
                                                                        </thead>
                                                            </table>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade kpi_formula_popup" id="kpi_formula_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false" data-backdrop="false">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">KPI Calculator</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding: 0 25px">
                        <div class="col-md-8" style="padding: 0">Field Name: &nbsp;
                            <input type="text" class="browser-default" name="objective_id" id="objective_id" placeholder="">
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
                                <div class="tab-content" style="padding: 0">
                                    <div class="tab-pane body active" id="formula_builder">
                                        <div class="row col-md-12">
                                            <textarea class="browser-default" name="formula" id="formula" placeholder="" cols="" rows="1"></textarea>
                                            <!-- <textarea name="formula" id="formula"></textarea> -->
                                        </div>
                                        <div class="row col-md-12">
                                            <button type="button" class="opr btn btn-secondary">+</button>
                                            <button type="button" class="opr btn btn-secondary">-</button>
                                            <button type="button" class="opr btn btn-secondary">*</button>
                                            <button type="button" class="opr btn btn-secondary">/</button>
                                            <button type="button" class="opr btn btn-secondary">%</button>
                                            <button type="button" class="opr btn btn-secondary">(</button>
                                            <button type="button" class="opr btn btn-secondary">)</button>
                                            <button type="button" class="opr btn btn-secondary">:</button>
                                            <button type="button" class="opr btn btn-secondary">AND</button>
                                            <button type="button" class="opr btn btn-secondary">OR</button>
                                            <button type="button" class="opr btn btn-secondary">NOT</button>
                                            <button type="button" class="opr btn btn-secondary">IN</button>
                                            <button type="button" class="opr btn btn-secondary">==</button>
                                            <button type="button" class="opr btn btn-secondary">!=</button>
                                            <button type="button" class="opr btn btn-secondary">></button>
                                            <button type="button" class="opr btn btn-secondary"><</button>
                                            <button type="button" class="opr btn btn-secondary">>=</button>
                                            <button type="button" class="opr btn btn-secondary"><=</button>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Fields and measures:</h6>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                        <ul class="list-group">
                                                            <li class="list-group-item">State</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
                                                            <li class="list-group-item">State/Province</li>
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
                                                            <li class="list-group-item">Elapsed Year</li>
                                                            <li class="list-group-item">Ends With</li>
                                                            <li class="list-group-item">If</li>
                                                            <li class="list-group-item">Is Null</li>
                                                            <li class="list-group-item">Max</li>
                                                            <li class="list-group-item">Min</li>
                                                            <li class="list-group-item">Median</li>
                                                            <li class="list-group-item">Mid</li>
                                                            <li class="list-group-item">Test</li>
                                                            <li class="list-group-item">Test</li>
                                                            <li class="list-group-item">Test</li>
                                                            <li class="list-group-item">Test</li>
                                                            <li class="list-group-item">Test</li>
                                                            <li class="list-group-item">Test</li>
                                                            <li class="list-group-item">Test</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel1">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Function Description:</h6>
                                                    </div>
                                                    <div class="panel-body">
                                                        <h6>IF</h6>
                                                        <p>
                                                            Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')
                                                        </p>
                                                    </div>
                                                    <!-- <input type="checkbox" name="check" /> Show argumnets in formula -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                           <div class="col-md-4" style="margin-bottom: 0px">
                                                <button name="validate" id="validate" class="btn btn-secondary">Validate</button>
                                                <button name="add" id="add" class="btn btn-secondary">Add</button>
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

            <!-- #END# Objective Desc PopUp -->

            <!-- #END# KPI Desc PopUp -->

            <section class="content">
                <div class="container-fluid">
                    <div class="m-t--50">
                        <a href="#" data-toggle="modal" data-target=".scorecard_description_popup" class="scorecarddescription" style="float:right; padding: 10px;"><i class="fa fa-info-circle" style=" font-size: 18px;" aria-hidden="true"></i>
                        </a>
                        <!-- <a href="#" class="switchTable" style="float: right; padding: 10px; display: block;"><i class="fa fa-table" aria-hidden="true" style="color: grey; font-size: 19px;"></i>
                        </a>
                        <a href="#" class="switchTile" style="float: right; display: none; padding: 10px;"><i class="fa fa-th-large" aria-hidden="true" style="color: grey; font-size: 19px;"></i></a> -->

                        <h5 class="m-b--20" data-i18n="Scorecard" >Scorecard <span class="scorecard_status">Good</span></h5>
                        <div aria-label="breadcrumb m-b-10">
                            <ol class="breadcrumb mb_bcrumb">
                                <li class="breadcrumb-item"><a href="#">Scorecard</a></li>
                                <li class="breadcrumb-item"><a href="#">Standard BSC View</a></li>
                            </ol>
                        </div>
                        <hr>
                    </div>
                    <!--  -->
                    <div class="tableview">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="card">
                                    <div class="header nestedRed">
                                        <h2 class="prob">
                                            <strong class="perspective" data-i18n="Financial">Financial</strong> </h2>
                                        <ul class="header-dropdown m-r--5">
                                            <li class="dropdown m-t--10">
                                                <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                    <i class="material-icons">more_vert</i>
                                                </a>
                                                <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">Add</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".perspective_expend_popup" class="perspectivedescription" onclick="return false;">View</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" onclick="return false;">Delete</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tableBody">
                                        <div class="table-responsive">
                                            <table class="treetable table table-striped dashboard-task-infos align-center" id="table1">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>ID</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th data-i18n="Period">Period</th>
                                                        <th data-i18n="Actual">Actual</th>
                                                        <th data-i18n="Target">Target</th>
                                                        <th data-i18n="Trend">Trend</th>
                                                        <th data-i18n="Risk">Risk</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-node="treetable-1">
                                                        <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                        <td>F1</td>
                                                        <td style="text-align: left" colspan="6"><strong>Increase shareholder value</strong></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <ul class="header-dropdown m-r--5">
                                                                <li class="dropdown">
                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                        <i class="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Add</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <thead>
                                                    <tr>
                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>F1.1</th>
                                                        <th style="text-align: left" colspan="3">ROCE</th>
                                                        <th>Month</th>
                                                        <th>13.4%</th>
                                                        <th>12.9%</th>
                                                        <th><i class="fas fa-arrow-up"></i></th>
                                                        <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>
                                                            <ul class="header-dropdown" style="margin: 0px;">
                                                                <li class="dropdown">
                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                        <i class="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-node="treetable-1">
                                                        <td><i class="green fas fa-circle" style="font-size:10px !important"></i></td>
                                                        <td>F2</td>
                                                        <td style="text-align: left" colspan="6"><strong>Generate profitable revenue growth</strong></td>
                                                        <td><i class="fas fa-arrow-right"></i></td>
                                                        <td></td>
                                                        <td>
                                                            <ul class="header-dropdown m-r--5">
                                                                <li class="dropdown">
                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                        <i class="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Add</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">Edit</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <thead>
                                                    <tr>
                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>F2.1</th>
                                                        <th style="text-align: left" colspan="3">Operating Cost </th>
                                                        <th>Month</th>
                                                        <th>$12690.2</th>
                                                        <th>$12874.2</th>
                                                        <th><i class="fas fa-arrow-up"></i></th>
                                                        <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>
                                                            <ul class="header-dropdown" style="margin: 0px;">
                                                                <li class="dropdown">
                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                        <i class="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr data-node="treetable-1">
                                                        <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                        <td>F3</td>
                                                        <td style="text-align: left" colspan="6"><strong>Optimize cash generation</strong></td>
                                                        <td><i class="fas fa-arrow-down"></i></td>
                                                        <td></td>
                                                        <td>
                                                            <ul class="header-dropdown m-r--5">
                                                                <li class="dropdown">
                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                        <i class="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpiedescription kpidesc" onclick="return false;">Add</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <thead>
                                                    <tr>
                                                        <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>F3.1</th>
                                                        <th style="text-align: left" colspan="3">Available Cashflow</th>
                                                        <th>Month</th>
                                                        <th>$-2.6M</th>
                                                        <th>$19.4M</th>
                                                        <th><i class="fas fa-arrow-right"></i></th>
                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>
                                                            <ul class="header-dropdown" style="margin: 0px;">
                                                                <li class="dropdown">
                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                        <i class="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <thead>
                                                    <tr>
                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>F3.2</th>
                                                        <th style="text-align: left" colspan="3">Sales to working capital ration</th>
                                                        <th>Month</th>
                                                        <th>1.8</th>
                                                        <th>1.7</th>
                                                        <th><i class="fas fa-arrow-down"></i></th>
                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                        <th>
                                                            <ul class="header-dropdown" style="margin: 0px;">
                                                                <li class="dropdown">
                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                        <i class="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="card">
                                    <div class="header nestedGreen">
                                        <h2 class="prob">
                                            <strong class="perspective" data-i18n="Customer">Customer</strong> </h2>
                                        <ul class="header-dropdown m-r--5">
                                            <li class="dropdown m-t--10">
                                                <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                    <i class="material-icons">more_vert</i>
                                                </a>
                                                <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">Add</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".customer_perspective_popup" class="perspectivedescription" onclick="return false;">View</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" onclick="return false;">Delete</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tableBody">
                                        <div class="table-responsive">
                                            <table class="treetable table table-striped dashboard-task-infos align-center" id="table1">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>ID</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th data-i18n="Period">Period</th>
                                                        <th data-i18n="Actual">Actual</th>
                                                        <th data-i18n="Target">Target</th>
                                                        <th data-i18n="Trend">Trend</th>
                                                        <th data-i18n="Risk">Risk</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-node="treetable-1">
                                                        <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                        <td>C1</td>
                                                        <td style="text-align: left" colspan="6"><strong>We patner to provide best products</strong></td>
                                                                <td><i class="fas fa-arrow-down red"></i></td>
                                                                <td></td>
                                                                <td>
                                                                    <ul class="header-dropdown m-r--5">
                                                                        <li class="dropdown">
                                                                            <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                <i class="material-icons">more_vert</i>
                                                                            </a>
                                                                            <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                <li>
                                                                                    <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Add</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" onclick="return false;">Delete</a>
                                                                                </li>
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        <thead>
                                                            <tr>
                                                                <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>
                                                                <th>c1.1</th>
                                                                <th style="text-align: left" colspan="3">Customer satisfaction</th>
                                                                <th>Quarter</th>
                                                                <th>3.9</th>
                                                                <th>4.1</th>
                                                                <th><i class="fas fa-arrow-down red"></i></th>
                                                                <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                                <th>
                                                                    <ul class="header-dropdown" style="margin: 0px;">
                                                                        <li class="dropdown">
                                                                            <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                <i class="material-icons">more_vert</i>
                                                                            </a>
                                                                            <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                <li>
                                                                                    <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" onclick="return false;">Delete</a>
                                                                                </li>
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                                <tr data-node="treetable-1">
                                                                    <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                                    <td>C2</td>
                                                                    <td style="text-align: left" colspan="6"><strong>Lead in quality and service</strong></td>
                                                                    <td><i class="fas fa-arrow-up green"></i></td>
                                                                    <td></td>
                                                                    <td>
                                                                        <ul class="header-dropdown m-r--5">
                                                                            <li class="dropdown">
                                                                                <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                    <i class="material-icons">more_vert</i>
                                                                                </a>
                                                                                <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                    <li>
                                                                                        <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Add</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" onclick="return false;">Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            <thead>
                                                                <tr>
                                                                    <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                                    <th>C2.1</th>
                                                                    <th style="text-align: left" colspan="3">Third party survey results</th>
                                                                    <th>Month</th>
                                                                    <th>69.7%</th>
                                                                    <th>70.4%</th>
                                                                    <th><i class="fas fa-arrow-up"></i></th>
                                                                    <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>
                                                                    <th>
                                                                        <ul class="header-dropdown" style="margin: 0px;">
                                                                            <li class="dropdown">
                                                                                <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                    <i class="material-icons">more_vert</i>
                                                                                </a>
                                                                                <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                    <li>
                                                                                        <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" onclick="return false;">Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                    <tr data-node="treetable-1">
                                                                        <td><i class="green fas fa-circle" style="font-size:10px !important"></i></td>
                                                                        <td>C3</td>
                                                                        <td style="text-align: left" colspan="6"><strong>We are recognised in the forefront of our industry</strong></td>
                                                                        <td><i class="fas fa-arrow-right"></i></td>
                                                                        <td></td>
                                                                        <td>
                                                                            <ul class="header-dropdown m-r--5">
                                                                                <li class="dropdown">
                                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                        <i class="material-icons">more_vert</i>
                                                                                    </a>
                                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                        <li>
                                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpiedescription kpidesc" onclick="return false;">Add</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                                <thead>
                                                                    <tr>
                                                                        <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                                        <th>C3.1</th>
                                                                        <th style="text-align: left" colspan="3">Positive Media</th>
                                                                        <th>Year</th>
                                                                        <th>64%</th>
                                                                        <th>67%</th>
                                                                        <th><i class="fas fa-arrow-right"></i></th>
                                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                                        <th>
                                                                            <ul class="header-dropdown" style="margin: 0px;">
                                                                                <li class="dropdown">
                                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                        <i class="material-icons">more_vert</i>
                                                                                    </a>
                                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                        <li>
                                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <thead>
                                                                    <tr>
                                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                                        <th>C3.2</th>
                                                                        <th style="text-align: left" colspan="3">Event sponserships</th>
                                                                        <th>Month</th>
                                                                        <th>7</th>
                                                                        <th>5</th>
                                                                        <th><i class="fas fa-arrow-up"></i></th>
                                                                        <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                                        <th>
                                                                            <ul class="header-dropdown" style="margin: 0px;">
                                                                                <li class="dropdown">
                                                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                        <i class="material-icons">more_vert</i>
                                                                                    </a>
                                                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                        <li>
                                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a href="#" onclick="return false;">Delete</a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                    </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="card">
                                    <div class="header nestedYellow">
                                        <h2 class="prob"><strong class="perspective" data-i18n="Internal Process">Internal Process</strong> </h2>
                                        <ul class="header-dropdown m-r--5">
                                            <li class="dropdown m-t--10">
                                                <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                    <i class="material-icons">more_vert</i>
                                                </a>
                                                <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">Add</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">View</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" onclick="return false;">Delete</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        </div>
                                        <div class="tableBody">
                                            <div class="table-responsive">
                                                <table class="treetable table table-striped dashboard-task-infos align-center" id="table1">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>ID</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th data-i18n="Period">Period</th>
                                                            <th data-i18n="Actual">Actual</th>
                                                            <th data-i18n="Target">Target</th>
                                                            <th data-i18n="Trend">Trend</th>
                                                            <th data-i18n="Risk">Risk</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>IP1</td>
                                                            <td style="text-align: left" colspan="6"><strong>Deliver increased value to our customers</strong></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <ul class="header-dropdown m-r--5">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Add</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>IP1.1</th>
                                                            <th style="text-align: left" colspan="3">Productivity</th>
                                                            <th>Month</th>
                                                            <th>90.7%</th>
                                                            <th>80.0%</th>
                                                            <th><i class="fas fa-arrow-up"></i></th>
                                                            <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>
                                                                <ul class="header-dropdown" style="margin: 0px;">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="green fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>IP2</td>
                                                            <td style="text-align: left" colspan="6"><strong>Constant focus on continuous improvement</strong></td>
                                                            <td><i class="fas fa-arrow-right"></i></td>
                                                            <td></td>
                                                            <td>
                                                                <ul class="header-dropdown m-r--5">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Add</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>IP2.1</th>
                                                            <th style="text-align: left" colspan="3">Key business process with complecated quality review</th>
                                                            <th>Month</th>
                                                            <th>57</t17h>
                                                                <th>62</th>
                                                                <th><i class="fas fa-arrow-up"></i></th>
                                                                <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>
                                                                <th>
                                                                    <ul class="header-dropdown" style="margin: 0px;">
                                                                        <li class="dropdown">
                                                                            <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                                <i class="material-icons">more_vert</i>
                                                                            </a>
                                                                            <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                <li>
                                                                                    <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" onclick="return false;">Delete</a>
                                                                                </li>
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>IP3</td>
                                                            <td style="text-align: left" colspan="6"><strong>Keep our people and environment safe</strong></td>
                                                            <td><i class="fas fa-arrow-down"></i></td>
                                                            <td></td>
                                                            <td>
                                                                <ul class="header-dropdown m-r--5">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpiedescription kpidesc" onclick="return false;">Add</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>IP3.1</th>
                                                            <th style="text-align: left" colspan="3">LTI(long Term Injury)</th>
                                                            <th>Month</th>
                                                            <th>7.11</th>
                                                            <th>5.83</th>
                                                            <th><i class="fas fa-arrow-right"></i></th>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>
                                                                <ul class="header-dropdown" style="margin: 0px;">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>IP3.2</th>
                                                            <th style="text-align: left" colspan="3">TRI(Total recordable incidents)</th>
                                                            <th>Month</th>
                                                            <th>2</th>
                                                            <th>2</th>
                                                            <th><i class="fas fa-arrow-down"></i></th>
                                                            <th></th>
                                                            <th>
                                                                <ul class="header-dropdown" style="margin: 0px;">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6">
                                    <div class="card">
                                        <div class="header nestedYellow">
                                            <h2 class="prob">
                                                <strong class="perspective">Learning and Growth</strong> </h2>
                                            <ul class="header-dropdown m-r--5">
                                                <li class="dropdown m-t--10">
                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                        <i class="material-icons">more_vert</i>
                                                    </a>
                                                    <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                        <li>
                                                            <a href="#" onclick="return false;">Add</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">Edit</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="return false;">Description</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="return false;">Delete</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tableBody">
                                            <div class="table-responsive">
                                                <table class="treetable table table-striped dashboard-task-infos align-center" id="table1">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>ID</th>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th data-i18n="Period">Period</th>
                                                            <th data-i18n="Actual">Actual</th>
                                                            <th data-i18n="Target">Target</th>
                                                            <th data-i18n="Trend">Trend</th>
                                                            <th data-i18n="Risk">Risk</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="green fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>G1</td>
                                                            <td style="text-align: left" colspan="6"><strong>Build values and leadership practices</strong></td>
                                                            <td><i class="fas fa-arrow-down"></i></td>
                                                            <td></td>
                                                            <td>
                                                                <ul class="header-dropdown m-r--5">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpiedescription kpidesc" onclick="return false;">Add</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>G1.1</th>
                                                            <th style="text-align: left" colspan="3">Employee engagement survey</th>
                                                            <th>Quarter</th>
                                                            <th>68.3%</th>
                                                            <th>70.0%</th>
                                                            <th><i class="fas fa-arrow-down"></i></th>
                                                            <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>
                                                                <ul class="header-dropdown" style="margin: 0px;">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="green fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>G2</td>
                                                            <td style="text-align: left" colspan="6"><strong>Strengthen image for technology, product quality and cust...</strong></td>
                                                            <td><i class="fas fa-arrow-right"></i></td>
                                                            <td></td>
                                                            <td>
                                                                <ul class="header-dropdown m-r--5">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpiedescription kpidesc" onclick="return false;">Add</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>G2.1</th>
                                                            <th style="text-align: left" colspan="3">Employee engagement survey</th>
                                                            <th>Month</th>
                                                            <th>3.8</th>
                                                            <th>4.0</th>
                                                            <th><i class="fas fa-arrow-up"></i></th>
                                                            <th><i class="yellow fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>
                                                                <ul class="header-dropdown" style="margin: 0px;">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr data-node="treetable-1">
                                                            <td><i class="yellow fas fa-circle" style="font-size:10px !important"></i></td>
                                                            <td>G3</td>
                                                            <td style="text-align: left" colspan="6"><strong>Share our strategy to achieve our goals</strong></td>
                                                            <td><i class="fas fa-arrow-down"></i></td>
                                                            <td></td>
                                                            <td>
                                                                <ul class="header-dropdown m-r--5">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpiedescription kpidesc" onclick="return false;">Add</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" class="objectivedesc" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="red fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>G3.1</th>
                                                            <th style="text-align: left" colspan="3">Employee engagement index - overall</th>
                                                            <th>year</th>
                                                            <th>68.0%</th>
                                                            <th>67%</th>
                                                            <th><i class="fas fa-arrow-right"></i></th>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>
                                                                <ul class="header-dropdown" style="margin: 0px;">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <thead>
                                                        <tr>
                                                            <th><i class="green fas fa-circle" style="font-size:10px !important"></i></th>
                                                            <th>G3.2</th>
                                                            <th style="text-align: left" colspan="3">Employee engagement survey - questions on strategy</th>
                                                            <th>Month</th>
                                                            <th>7</th>
                                                            <th>5</th>
                                                            <th><i class="fas fa-arrow-down"></i></th>
                                                            <th></th>
                                                            <th>
                                                                <ul class="header-dropdown" style="margin: 0px;">
                                                                    <li class="dropdown">
                                                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                                            <i class="material-icons">more_vert</i>
                                                                        </a>
                                                                        <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="return false;">View</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onclick="return false;">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
            </div>
            <!-- Plugins Js -->
            <script src="js/app.min.js"></script>
            <!-- Custom Js -->
            <script src="js/admin.js"></script>
            <!-- <script src="js/bundles/amcharts4/core.js"></script>
            <script src="js/bundles/amcharts4/charts.js"></script>
            <script src="js/bundles/amcharts4/animated.js"></script>
            <script src="js/pages/dashboard/dashboard3.js"></script> -->
            <!-- Knob Js -->
            <script src="js/pages/todo/todo.js"></script>
            <script src="js/bundles/datamaps/d3.min.js"></script>
            <script src="js/bundles/datamaps/topojson.min.js"></script>
            <script src="js/bundles/datamaps/datamaps.world.min.js"></script>
            <script src="js/pages/maps/datamap.js"></script>
            <script src="js/knockout-3.5.0.js"></script>
            <script src="js/jquery-ui.min.js"></script>
            <script src="js/moment.js"></script>
            <!-- <script src="../../assets/daterangepicker.min.js"></script> -->
            <!-- <script src="js/jquery.slim.min.js"></script> -->
            <script src="js/bootstrap.bundle.min.js"></script>
            <script src="js/pickr.es5.min.js"></script>
            <script src="js/datepickerair.js"></script>
            <script src="js/datepicker.en.js"></script>
            <script src="js/widgets.js"></script>
    </body>

