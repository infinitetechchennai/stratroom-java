<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />


<style>

.nestedEmpty{
	border-left: 52px solid;
}

.nestedEmpty span{
	color:white !important;
}

.select2 .select2-search--dropdown {
		padding: 3px 2px 0px 0px;
	}
	
	
	input.select2-search__field {
		height:26px !important;
		font-size:12px !important;
font-weight: normal !important;
	}
	
	
	.select2-selection--single{
    border: 1px solid #ced4da !important;
    border-radius: 0px !important;
	}

.kpiformuladescHighlight{
	background-color:#c0baba;
}

.standard_dropdown-hide.pull-right {
        position: absolute !important;
        left: auto !important;
        right: 78px !important;
        top: 74px !important;
        transform: none !important;
        width: 260px;
      }
 
.checkbuttoncolor {
	background-color: aliceblue !important;
}

	.calendar-selects select {
		display: block !important;
		/* height: 2rem !important; */
		height: 2rem;
	}

            .toggle-dropdown li {
        cursor: pointer;
      }

      .multi-column-dropdown h4 {
        font-weight: 600;
        font-size: 15px;
        padding: 7px 0px 4px 10px;
      }

      .dropdown-menu {
        min-width: 200px;
      }
      .dropdown-menu.columns-2 {
        min-width: 400px;
      }
      .dropdown-menu.columns-3 {
        min-width: 600px;
      }
      .dropdown-menu li a {
        padding: 3px 15px;
        font-weight: 300;
      }
      .multi-column-dropdown {
        list-style: none;
        margin: 0px;
        padding: 0px;
      }
      .multi-column-dropdown li a {
        display: block;
        clear: both;
        line-height: 1.428571429;
        color: #333;
        white-space: normal;
      }
      .multi-column-dropdown li a:hover {
        text-decoration: none;
        color: #333;
        background-color: #f5f5f5;
      }

      @media (max-width: 767px) {
        .dropdown-menu.multi-column {
          min-width: 240px !important;
          overflow-x: hidden;
        }
      }


	ul li label {
		font-size: 14px;
	}

	.orientation-right {
		top: 60px !important;
		right: 0 !important;
		left: auto !important;
		position: fixed;
	}
	
	.checkbuttoncolor {
	background-color: aliceblue;
}
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

      #result_panel > .panelbody > .list-group > .list-group-item {
        padding: 5px 10px !important;
      }

      #formula_builder,
      #summary_calculation {
        font-size: 11px !important;
      }

      #kpi_formula_popup > .modal-content > .modal-body {
        padding: 0 25px !important;
      }

      #kpi_formula_popup > .modal-content > .modal-body.card > .tab-content {
        padding: 0;
      }

      #formula_builder {
        padding-bottom: 0px;
      }

      .panel:hover {
        cursor: pointer;
      }

      #formula-builder .col-md-4 {
        margin-bottom: 0px;
      }

      .modal #kpi_formula_popup {
        background-color: rgba(238, 238, 238, 0) !important;
      }

      .modal-backdrop {
        opacity: 0.5 !important;
      }

      #kpi_formula_popup .modal-content .nav li a.nav-link {
        font-size: 12px !important;
      }

      #datepickers-container {
        z-index: 10000;
      }

      .datepicker--nav {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        -ms-box-shadow: none;
        box-shadow: none;
        background-color: #ffff;
        color: #9c9c9c;
        width: 100%;
        height: 36px;
      }

      .orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

      
      .initative_save_btn {
        padding: 5px 12px;
        width: 90px;
        height: 28px;
        font-size: 12px;
        background-color: #1e252d;
        color: #fff;
        border-radius: 5px;
      }

      .input-group {
        margin-bottom: 0;
      }

      .modal-content-setscrollheight {
        height: 720px;
      }

      .modal-body {
        overflow-y: auto;
      }

      .modal-footer {
        margin-top: 12px;
      }
      
    #initiate_sidebar .sub_initiative_sidebar_details:hover {
	  -ms-transform: scale(1.025);
	  -moz-transform: scale(1.025);
	  -webkit-transform: scale(1.025);
	  transform: scale(1.025);
	}
	
	.p-b-5 {
	    padding-bottom: 5px;
	    padding-top: 3px;
	}
	
#initiate_sidebar .sub_initiative_sidebar_details {
  padding: 0 5px;
  border: 1px solid #e9ecef;
  margin: 5px 12px 5px 5px;
  -webkit-box-shadow: 1px 1px 6px 0px #d8d4d4;
  -moz-box-shadow: 1px 1px 6px 0px #d8d4d4;
  -ms-box-shadow: 1px 1px 6px 0px #d8d4d4;
  box-shadow: 1px 1px 6px 0px #d8d4d4;
  background: #fff;
  -webkit-transition: transform 0.3s ease-in-out;
  -moz-transition: transform 0.3s ease-in-out;
  -ms-transition: transform 0.3s ease-in-out;
  -o-transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.profile_content .init_flex_profile {
  flex: 1 1 85%;

}

#initiative_sidebar .sub_initiatives .card {
  background: #ffffff;
}	
</style>
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
<!-- #START# Page level body content -->
<div id="deleteModalscorecard" class="modal fade">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Delete</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<h5 class="confirm-modal-content">Do you really want to delete?</h5>
				<br>
				<div class="form-line right">
					<input type="hidden" id="deletescoreid" />
					<input type="hidden" id="deleterecordtype" />
					<button type="button" class="btn-default1 btn" data-dismiss="modal"
						aria-label="Close" data-i18n="Cancel">Cancel</button>
					<button type="button" class="btn btn-danger confirm-modal-deleteBtn"
						onclick="handlescoreeventdelete()">Delete</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="formulation_popup"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-md">
          <div class="modal-content" style="height: 360px; overflow: hidden">
            <div class="modal-header">
              <h4>Formulation Register</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div style="height: 300px">
                <div class="d-flex flex-column" id="initiate_sidebar">
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<jsp:include page="modals/perspective_modal.jsp"></jsp:include>
<jsp:include page="modals/objective_modal.jsp"></jsp:include>
<jsp:include page="modals/kpi_modal.jsp"></jsp:include>
<jsp:include page="modals/subkpi_modal.jsp"></jsp:include>
<jsp:include page="modals/kpi_formula_modal.jsp"></jsp:include>
<jsp:include page="modals/kpi_custom_threshold.jsp"></jsp:include>
<jsp:include page="modals/kpi_ytd_formula.jsp"></jsp:include>
<jsp:include page="modals/scorecard_modal.jsp"></jsp:include>
<jsp:include page="templates/scorecard_template.jsp"></jsp:include>
<jsp:include page="modals/scorecard_import_modal.jsp"></jsp:include>
<jsp:include page="modals/objective_custom_threshold.jsp"></jsp:include>
<jsp:include page="modals/perspective_custom_threshold.jsp"></jsp:include>
<jsp:include page="modals/scorecard_performance_formula.jsp"></jsp:include>
<jsp:include page="modals/kpi_performanceformula_modal.jsp"></jsp:include>

<section class="content">
	<!--<div class="container-fluid">-->
    <div>
      <div class="button_filter">
          <!-- Department Dropdown -->
          <label for="department_select" data-i18n="Department">Department:</label>
          <select class="dept_select" id="department_select" style="display: block; width: 20%;">
            <option></option>
          
          </select>
  
          <!-- Pages Dropdown -->
          <label for="page_select">Pages:</label>
          <select class="page_select" id="page_select" style="display: block; width: 20%;">
            <option></option>

          </select>
      </div>
  </div>
  
  <input type="hidden" id="ischeckscurlornot" value="SCORECARD">

	<div class="page-header row no-gutters py-2 m-t--70" style="margin-top: 20px;">
          <div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
            <h5 class="page-title pageTitleStatus" style="font-weight: 600; text-transform: uppercase;">
              Scorecard <span class="scorecard_status scorecardname"></span><span
						id="scorecardstatusicon"></span>
            </h5>
          </div>
        </div>
		<div class="row">
			<div class="col-md-9">
			</div>

			
      
		</div>
		<c:if test="${userPrincipal != null}">
			<input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
				${userPrincipal.profile.empId}" />">
		</c:if>
		<c:if test="${pagenumber != null}">
			<input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
		</c:if>

		<div class="container-fluid">
			<div class="tableview">
				<div id="scordcard-wrapper" class="row"></div>
				<jsp:include page="templates/perspective_template.jsp"></jsp:include>
				<jsp:include page="templates/perspective_header_row_template.jsp"></jsp:include>
				<jsp:include page="templates/objective_row_template.jsp"></jsp:include>
				<jsp:include page="templates/kpi_row_template.jsp"></jsp:include>
			</div>
		</div>
</section>



<!-- #END# Page level body content -->


<script src="${contextroot}/js/select2.min.js"></script>
<script src="${contextroot}/js/standard_view_view.js"></script>
<script>
	/*$('.date_pickers').datepicker({
		language: 'en',
		minDate: new Date(),
		range: true,
		autoClose: true,
		position: "top left",
		//todayButton: true,
		onSelect: function (fd) {
			// $('.datepickers-container').hide();
		}
	});*/
  if(!strategyforlink)
  {
    var button = document.getElementById("fomulationbutton");
      button.style.display = "none";
  }
	$('.kpi_formula').on('click', function () {
		$(".kpi_trigger").trigger("click");
	});
  
	$('#kpi_custom_threshold').on('click', function () {
		$("#kpi_custom_trigger").trigger("click");
	});
	$('#custom_objective').on('click', function () {
		$("#objective_custom_trigger").trigger("click");
	});
	$('#custom_perspective').on('click', function () {
		$("#perspective_custom_trigger").trigger("click");
	});
	$('.kpiYtdFormula').on('click', function () {
		$(".kpiYtdFormulaTrigger").trigger("click");
	});

	$(".list-group-item, .opr").click(function () {

	});

	$("#add").click(function () {
		var value = $("#formula").val();
		var ul = $(".formula-panel");
		var li = document.createElement("li");
		li.setAttribute("class", "list-group-item");
		li.appendChild(document.createTextNode(value));
		ul.append(li);
		$("#formula").val('');
	});

	$(".dropdown-hide").on("click", function (e) {
		e.stopPropagation();
	});

	/*$("#OpenImgUpload").click(function () {
		$("#importscorescrd").trigger("click");
		return false;
		});*/
	$( document ).on( 'keydown', function ( e ) {
	    if ( e.keyCode === 27 ) { // ESC
	        $("#closeKpimodal").click();
	    }
	});
	/*$('.kpi_description_popup,.kpi_formula_popup,.kpi_custom_threshold_popup,.kpiYtdFormulaPoPUp').modal({
		show: false,
		backdrop: 'static',
		keyboard: false
	});*/
	$('.modal-dialog').draggable({
        handle: ".modal-header"
    });
    $(".perspective-multi-select").select2();
    
    $(".custom-tab-kpiformula").on("click", "button", function (e) {
        var CustomTabValue = this.dataset.value;
        if (CustomTabValue) {
          $(".customTabContent").not("." + CustomTabValue).hide();
          $("." + CustomTabValue).show();
        } else {
          $(".customTabContent").hide();
        }
        $(this).parent().find("button").removeClass("active");
        $(this).addClass("active");
    });
    
    $(".custom-tab-ytdkpiformula").on("click", "button", function (e) {
        var CustomTabValue = this.dataset.value;
        if (CustomTabValue) {
          $(".ytdcustomTabContent").not("." + CustomTabValue).hide();
          $("." + CustomTabValue).show();
        } else {
          $(".ytdcustomTabContent").hide();
        }
        $(this).parent().find("button").removeClass("active");
        $(this).addClass("active");
    });
    
	$.fn.select2.amd.define("SearchableSingleSelection", [
		  "select2/utils",
		  "select2/selection/single",
		  "select2/selection/eventRelay",
		  "select2/dropdown/search"
		],
		function (Utils, SingleSelection, EventRelay, DropdownSearch) {
		  var adapter = Utils.Decorate(SingleSelection, DropdownSearch);
		  adapter = Utils.Decorate(adapter, EventRelay);

		  adapter.prototype.render = function () {
		    var $rendered = DropdownSearch.prototype.render.call(this, SingleSelection.prototype.render);

		    this.$searchContainer.hide();
		    this.$element.siblings('.select2').find('.selection').prepend(this.$searchContainer);

		    return $rendered;
		  };

		  var bindOrigin = adapter.prototype.bind;
		  adapter.prototype.bind = function (container) {
		    var self = this;

		    bindOrigin.apply(this, arguments);

		    container.on('open', function () {
		      self.$selection.hide();
		      self.$searchContainer.show();
		    });

		    container.on('close', function () {
		      self.$searchContainer.hide();
		      self.$selection.show();
		    });
		  };

		  return adapter;
		});

		/*
		* A select2 adapter to show simple dropdown list without a searchbox inside
		*/
		$.fn.select2.amd.define("UnsearchableDropdown", [
		  "select2/utils",
		  "select2/dropdown",
		  "select2/dropdown/attachBody",
		  "select2/dropdown/closeOnSelect"
		],
		function (Utils, Dropdown, AttachBody, CloseOnSelect) {
		  var adapter = Utils.Decorate(Dropdown, AttachBody);
		  adapter = Utils.Decorate(adapter, CloseOnSelect);
		  return adapter;
		});

		$('#scorecarddept').select2({
		  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
		  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});

</script>