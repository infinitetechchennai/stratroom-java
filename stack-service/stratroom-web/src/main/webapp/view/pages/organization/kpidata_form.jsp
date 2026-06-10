<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>


<!-- <style>

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
	
    .orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

    #notifications .row::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
      }

  .btn-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  max-width: 600px;
  border: 1px solid #ced4da;
  }

  .file-upload-container {
    display: inline-block;
    margin: 5px;
    width: 120px;
    position: relative;
  }

  /* Document Upload Button */
  .btn-document {
    width: 60px;
    height: 60px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  /* Icons size */
  .btn-document i {
    font-size: 30px;
  }

  .action-buttons {
    display: flex;
    margin-top: 5px;
  }

  .action-buttons button {
    margin: 2px;
    height: 24px;
    width: 24px;
    border: none;
  }

  /* Remove borders from icons */
  .action-buttons button i {
    font-size: 12px;
  }

  .fa-file-pdf{
    color: red;
  }
  .fa-file-excel{
    color: #1D6F42;
  }
  .fa-file-word{
    color: #2A5699;
  }
  .fa-file-code{
    color: #E44D26;
  }
  .fa-file-image{
    color: green;
  }

  .file-name {
    font-size: 14px;
    margin-top: 5px;
    color: #000;
    display: none;
    margin-left: -60px !important;
  }

  .file-upload-container .btn-document i {
    font-size: 30px;
  }

  /* Ensures proper layout on small devices */
  @media (max-width: 600px) {
    .btn-container {
      justify-content: center;
    }

    .file-upload-container {
      margin: 10px;
    }
  }

</style> -->
<style>
  .performance-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 2px solid var(--stratroom-border-color);
  padding-bottom: 12px;
  gap: 10px;
}
.performance-head .title {
  font-size: 12px;
  font-weight: 500;
  color: var(--stratroom-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0;
}

.performance-legend {
  display: flex;
  gap: 20px;
}
.performance-legend .legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--stratroom-secondary-color);
}
.performance-legend .legend-item .legend-box {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
.performance-legend .legend-item .legend-box.actual {
  background-color: var(--stratroom-green);
}
.performance-legend .legend-item .legend-box.target {
  background-color: var(--stratroom-red);
}

.performance-data-container {
  border: 1px solid var(--stratroom-border-color);
  border-radius: 10px;
  overflow: hidden;
  background: var(--stratroom-secondary-bg);
}
.performance-data-container .perf-grid {
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 576px) {
  .performance-data-container .perf-grid {
    grid-template-columns: 1fr 1fr;
  }
  .performance-data-container .perf-grid.single-column {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
}
.performance-data-container .perf-column {
  display: flex;
  flex-direction: column;
}
.performance-data-container .perf-column.perf-column-separator {
  border-right: 1px solid var(--stratroom-border-color);
}
.performance-data-container .perf-table-row {
  display: grid;
  grid-template-columns: 70px 1fr 1fr;
  border-bottom: 1px solid var(--stratroom-border-color);
}
.performance-data-container .perf-table-row:last-child {
  border-bottom: none;
}
.performance-data-container .perf-table-row.perf-header {
  background-color: var(--stratroom-tertiary-bg);
  font-weight: 600;
  font-size: 11px;
  color: var(--stratroom-primary);
  text-align: center;
}
.performance-data-container .perf-cell {
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.performance-data-container .perf-month {
  background-color: var(--stratroom-tertiary-bg);
  font-weight: 600;
  font-size: 12px;
  color: var(--stratroom-primary);
  border-right: 1px solid var(--stratroom-border-color);
}
.performance-data-container .perf-input-cell .form-control {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  text-align: center;
  height: 28px;
  border-radius: 6px;
  background-color: var(--stratroom-secondary-bg) !important;
  color: var(--stratroom-body-color);
}
.performance-data-container .perf-input-cell .form-control.perf-input-actual {
  border: 1.5px solid var(--stratroom-green) !important;
  color: var(--stratroom-green) !important;
}
.performance-data-container .perf-input-cell .form-control.perf-input-target {
  border: 1.5px solid var(--stratroom-red) !important;
  color: var(--stratroom-red) !important;
}
.performance-data-container .perf-input-cell .form-control::placeholder {
  color: var(--stratroom-secondary-color);
}

/* Radio Segmented Control */
.performance-period-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.performance-period-selector .radio-segmented-group {
  display: inline-flex;
  background-color: var(--stratroom-tertiary-bg);
  padding: 3px;
  border-radius: 12px;
  width: fit-content;
}
.performance-period-selector .radio-segmented-group input[type=radio] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.performance-period-selector .radio-segmented-group input[type=radio]:checked + label {
  background-color: var(--stratroom-secondary-bg);
  color: var(--stratroom-primary);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}
.performance-period-selector .radio-segmented-group label {
  padding: 6px 18px;
  font-size: 12px;
  font-weight: 600;
  color: var(--stratroom-secondary-color);
  border-radius: 10px;
  cursor: pointer;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.performance-period-selector .radio-segmented-group label:hover:not(:checked) {
  color: var(--stratroom-primary);
}
  .image-styles {
    margin-top: 20px !important;
  }
</style>
</head>

<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<body class="light">
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<!-- Page Loader -->
  
	<!-- #Top Bar -->
	<div>
    

		<!-- <div id="deleteModalswot" class="modal fade">
			<div class="modal-dialog modal-confirm">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Delete</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<h5 class="confirm-modal-content">Do you really want to
							delete?</h5>
						<br>
						<div class="form-line right">
							<input type="hidden" id="deleterecordid" /> <input type="hidden"
								id="deleterecordtype" />
							<button type="button" class="btn-default1 btn"
								data-dismiss="modal" aria-label="Close"  data-i18n="Cancel">Cancel</button>
							<button type="button"
								class="btn btn-danger confirm-modal-deleteBtn"
								onclick="handleswoteventdelete()">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
	<!--#END View -->

 <div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>

	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>

  <main class="pt-2 pb-2">
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/meetings-i.svg" alt="meetings" width="18" height="18">
                        </span>
                        Data Entry Form
                    </h4>
                </div>
            </div>
        </div>

        <div class="container-lg py-2">
            <form id="kpi_data_form" name="kpi_data_form">
                <div class="card mx-auto" style="max-width: 600px;">
                    <div class="card-body p-3">
                        <div class="grid gap-3">
                            <div class="g-col-12 d-flex justify-content-between flex-wrap align-items-center gap-2">
                                <div class="user-card ">
                                    
                                    <div class="avatar m-auto user-image">
                                 </div>
                                </div>
                                <!-- <div class="performance-period-selector">
                                    <div class="radio-segmented-group">
                                        <input type="radio" name="perf_period" id="periodM" value="M" checked>
                                        <label for="periodM">M</label>
                                        <input type="radio" name="perf_period" id="periodQ" value="Q">
                                        <label for="periodQ">Q</label>
                                        <input type="radio" name="perf_period" id="periodHY" value="HY">
                                        <label for="periodHY">HY</label>
                                        <input type="radio" name="perf_period" id="periodA" value="A">
                                        <label for="periodA">A</label>
                                    </div>
                                </div> -->
                            </div>
                            <div class="g-col-12">


                                <div class="form-group">
                                    <label class="form-label">Scorecard</label>
                                    <select class="form-select select-dropdown" data-placeholder="Select Scorecard" id="kpiscorecard">    
                                    </select>
                                </div>
                            </div>
                            <div class="g-col-12">
                                <div class="form-group">
                                    <label class="form-label">Kpi</label>
                                    <select name="kpidataformname" id="kpiname"  class="form-select select-dropdown persp_status" data-placeholder="Select Kpi">
                                       
                                    </select>
                                </div>
                            </div>

                          


                            <div class="g-col-12 g-col-lg-6">
                                <div class="form-group">
                                    <label class="form-label">Measures</label>
                                    <select id="kpi_measurement"  name="kpi_measurement" class="form-select select-dropdown"
                                        data-placeholder="Select Measures">
                                       
                                    </select>
                                </div>
                            </div>
                            <div class="g-col-12 g-col-lg-6">
                                <div class="form-group">
                                    <label class="form-label">Sub Measures</label>
                                    <select id="subMeasuressearch" name="subMeasuressearch" class="form-select select-dropdown"
                                        data-placeholder="Select Sub Measures">
                                       
                                    </select>
                                </div>
                            </div>
                            <div class="g-col-12 g-col-lg-6">
                                <div class="form-group">
                                    <label class="form-label">KPI Type</label>
                                    <input id="kpiDataType" name="kpiDataType" type="text" class="form-control" placeholder="KPI Type" readonly />
                                </div>
                            </div>
                            <!-- Performance Data -->
                            <div class="g-col-12">
                                <!-- <div class="performance-section-title">PERFORMANCE DATA — ACTUAL & TARGET</div> -->


                                <!-- Monthly Section -->
                                <div id="perf-section-M" class="perf-period-section">
                                    <div class="performance-head mb-3">
                                        <h4 class="title text-muted"> Monthly
                                            Performance Data
                                        </h4>
                                        <div class="performance-legend">
                                            <div class="legend-item">
                                                <div class="legend-box actual"></div>
                                                <span>Actual</span>
                                            </div>
                                            <div class="legend-item">
                                                <div class="legend-box target"></div>
                                                <span>Target</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="performance-data-container">
                                        <div class="perf-grid">
                                            <!-- Left Column: Jan - Jun -->
                                            <div class="perf-column perf-column-separator">
                                                <div class="perf-table-row perf-header">
                                                    <div class="perf-cell">MONTH</div>
                                                    <div class="perf-cell" style="color: var(--stratroom-green);">ACTUAL
                                                    </div>
                                                    <div class="perf-cell" style="color: var(--stratroom-red);">TARGET
                                                    </div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Jan</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Feb</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Mar</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Apr</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">May</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Jun</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                            </div>
                                            <!-- Right Column: Jul - Dec -->
                                            <div class="perf-column">
                                                <div class="perf-table-row perf-header">
                                                    <div class="perf-cell">MONTH</div>
                                                    <div class="perf-cell" style="color: var(--stratroom-green);">ACTUAL
                                                    </div>
                                                    <div class="perf-cell" style="color: var(--stratroom-red);">TARGET
                                                    </div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Jul</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Aug</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Sep</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Oct</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Nov</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Dec</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0" ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quarterly Section -->
                                <div id="perf-section-Q" class="perf-period-section" style="display: none;">



                                    <div class="performance-head mb-3">
                                        <h4 class="title text-muted">Quarterly
                                            Performance Data
                                        </h4>
                                        <div class="performance-legend">
                                            <div class="legend-item">
                                                <div class="legend-box actual"></div>
                                                <span>Actual</span>
                                            </div>
                                            <div class="legend-item">
                                                <div class="legend-box target"></div>
                                                <span>Target</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="performance-data-container">
                                        <div class="perf-grid single-column">
                                            <div class="perf-column">
                                                <div class="perf-table-row perf-header">
                                                    <div class="perf-cell">QUARTER</div>
                                                    <div class="perf-cell" style="color: var(--stratroom-green);">ACTUAL
                                                    </div>
                                                    <div class="perf-cell" style="color: var(--stratroom-red);">TARGET
                                                    </div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Q1</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Q2</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Q3</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Q4</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" id="kpiactual" value="0"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" id="kpitarget" value="0"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Half-Yearly Section -->
                                <div id="perf-section-HY" class="perf-period-section" style="display: none;">



                                    <div class="performance-head mb-3">
                                        <h4 class="title text-muted">Half-Yearly
                                            Performance Data
                                        </h4>
                                        <div class="performance-legend">
                                            <div class="legend-item">
                                                <div class="legend-box actual"></div>
                                                <span>Actual</span>
                                            </div>
                                            <div class="legend-item">
                                                <div class="legend-box target"></div>
                                                <span>Target</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="performance-data-container">
                                        <div class="perf-grid single-column">
                                            <div class="perf-column">
                                                <div class="perf-table-row perf-header">
                                                    <div class="perf-cell text-nowrap">HALF YEAR</div>
                                                    <div class="perf-cell" style="color: var(--stratroom-green);">ACTUAL
                                                    </div>
                                                    <div class="perf-cell" style="color: var(--stratroom-red);">TARGET
                                                    </div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">H1</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" value="0" id="kpiactual"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" value="0" id="kpitarget"></div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">H2</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" value="0" id="kpiactual"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" value="0" id="kpitarget"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Annual Section -->
                                <div id="perf-section-A" class="perf-period-section" style="display: none;">

                                    <div class="performance-head mb-3">
                                        <h4 class="title text-muted">Annual
                                            Performance Data
                                        </h4>
                                        <div class="performance-legend">
                                            <div class="legend-item">
                                                <div class="legend-box actual"></div>
                                                <span>Actual</span>
                                            </div>
                                            <div class="legend-item">
                                                <div class="legend-box target"></div>
                                                <span>Target</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="performance-data-container">
                                        <div class="perf-grid single-column">
                                            <div class="perf-column">
                                                <div class="perf-table-row perf-header">
                                                    <div class="perf-cell">YEAR</div>
                                                    <div class="perf-cell" style="color: var(--stratroom-green);">ACTUAL
                                                    </div>
                                                    <div class="perf-cell" style="color: var(--stratroom-red);">TARGET
                                                    </div>
                                                </div>
                                                <div class="perf-table-row">
                                                    <div class="perf-cell perf-month">Annual</div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-actual" value="0" id="kpiactual"></div>
                                                    <div class="perf-cell perf-input-cell"><input type="text"
                                                            class="form-control perf-input-target" value="0" id="kpitarget"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="g-col-12 g-col-lg-6">
                                <div class="form-group">
                                    <label class="form-label">Start / End Date</label>
                                    <input type="text" id="kpistartdate" name="kpistartdate" class="form-control"
                                        placeholder="Select Date Range" readonly />
                                </div>
                            </div>
                            <div class="g-col-12 g-col-lg-6">
                                <div class="form-group">
                                    <label class="form-label">Period</label>
                                    <!-- <input type="text" class="form-control" placeholder="Period" /> -->
                                      <input type="text" class="form-control kpidatashowformperiod" name="kpidatashowformperiod" id="kpidatashowformperiod" readonly disabled/>
                                      <input type="hidden" name="kpidataformperiod" id="kpidataformperiod">
                                      <input type="hidden" name="realDateFrom" id="realDateFrom">
                                      <input type="hidden" name="realDateTo" id="realDateTo">
                                      <input type="hidden" id="kpihiddenactual">
                                      <input type="hidden" id="kpihiddentarget">
                                      <input type="hidden" id="submeasurekpiidhidden">
                                </div>
                            </div>
                            <div class="g-col-12 g-col-lg-6">
                                <div class="form-group">
                                    <label class="form-label">Valid Till</label>
                                    <input id="kpivalidtill" name="kpivalidtill" type="text" class="form-control" placeholder="Valid Till" readonly/>
                                </div>
                            </div>
                            <div class="g-col-12">
                                <div class="form-group">
                                    <label class="form-label">Comment</label>
                                    <textarea id="savecommentsService" class="form-control browser-default savecommentsService" placeholder="Comment"
                                        rows="2"></textarea>
                                </div>
                            </div>
                            <div class="g-col-12">
                                <div class="form-group">
                                    <label class="form-label">Upload</label>
                                    <div class="attachment-upload">
                                        <div class="input-group mb-1">
                                           <input type="file" 
                                            class="form-control fileInput" 
                                            onchange="handleFileSelect(event)"
                                            id="kpiFileUpload"
                                            accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx">
                                            <!-- <label class="input-group-text" for="inputGroupFile02">Upload</label> -->
                                        </div>
                                        <div class="mb-3 form-text">Supported file type (jpeg,pdf,pptx,xlsx,docx)</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </main>
	<footer class="col-12 text-center py-2 copyright" 
			style="position:fixed; bottom:0; left:0; width:100%; margin:0; padding:8px;">
				<p class="mb-0" style="margin:0;">Copyright &copy; 
				<span id="year"></span> <strong>StratRoom</strong>
				</p>

				<script>
				document.getElementById("year").textContent = new Date().getFullYear();
				</script>
			</footer>
	

  <link href="assets/css/pickr.min.css" rel="stylesheet">
  <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
  <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
  <link href="assets/css/select2.min.css" rel="stylesheet" />
	<!-- Plugins Js -->

	<script src="js/app.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
	<!-- Custom Js -->
	<script src="${contextroot}/js/admin.js"></script>
<!-- Knob Js -->
	<script type="text/javascript"
		src="${contextroot}/js/knockout-3.5.0.js"></script>
	<script type="text/javascript"
		src="${contextroot}/js/daterangepicker.min.js"></script>
	
	<!-- Knob Js -->
	<script src="${contextroot}/js/jquery-ui.min.js"></script>
	<script src="${contextroot}/js/moment.js"></script>
	<script src="${contextroot}/js/jquery.editable.min.js"></script>
	<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
	<script src="${contextroot}/js/handlebars.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/notify.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>
	<script src="${contextroot}/js/kpidata_form.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
	<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

	<script>
	$('.modal-dialog').draggable({
            handle: ".modal-header"
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

		$('#kpiname').select2({
		  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
		  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});
		
		$('#kpi_measurement').select2({
			  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
			  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
			});

			$('#subMeasuressearch').select2({
			  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
			  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
			});
	</script>

  <script>
      var attachment = {
        kpiAttachment: [] 
      };
    
      function fileUploadBtn(btn) {
        $(btn).closest('.file-upload-container').find('input[type="file"]').click();
      }
    
      function handleFileSelect(event) {
        var file = event.target.files[0];
        if (file) {
            var fileType = file.type || getFileExtension(file.name);
            var fileIcon = getFileIcon(fileType);
    
            $(event.target).siblings('.btn-document').find('i').attr('class', fileIcon);
            $(event.target).siblings('.file-name').text(file.name).show();
    
            var reader = new FileReader();
            reader.onload = function(e) {
              var uniqueFileReference = generateUniqueFileReference();

                var fileDetail = {
                    "name": file.name,
                    "size": file.size + " bytes",
                    "type": fileType,
                    "file": e.target.result.split(',')[1], // Base64 encoded file content
                    "uniqueFileReference": uniqueFileReference

                };
                attachment.kpiAttachment.push(fileDetail);
                console.log(attachment.kpiAttachment);
            };
            reader.readAsDataURL(file);
        } else {
            $(event.target).siblings('.btn-document').find('i').attr('class', 'fas fa-paperclip');
        }
    }

    function generateUniqueFileReference() {
    var timestamp = new Date().getTime();
    var random = Math.random().toString(36).substring(2, 15);
    return timestamp + '_' + random;
}
    function getFileExtension(filename) {
        return filename.split('.').pop();
    }

    function getFileIcon(fileType) {
        var iconClass = "fas fa-paperclip";
        if (fileType == "image/jpeg") {
            iconClass = "fas fa-file-image";
        } else if (fileType == "application/pdf") {
            iconClass = "fas fa-file-pdf";
        } else if (fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            iconClass = "fas fa-file-excel";
        } else if (fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            iconClass = "fas fa-file-word";
        } else if (fileType == "text/html") {
            iconClass = "fas fa-file-code";
        }
        return iconClass;
    }

    function deleteDocument(btn) {
        var container = $(btn).closest('.file-upload-container');
        if ($(".file-upload-container").index(container) == 0) {
            alert("You cannot delete the first paperclip.");
        } else {
            container.remove();
            arrangeDocumentRows();
        }
    }
    
    function arrangeDocumentRows() {
        $(".row-separator").remove();
        var fileUploadContainers = $(".file-upload-container");
        var rows = [];
        fileUploadContainers.each(function (index) {
            if (index % 3 == 0) {
                rows.push([]);
            }
            rows[rows.length - 1].push(this);
        });
        if (rows.length > 0 && rows[rows.length - 1].length < 3) {
            var lastRow = rows[rows.length - 1];
            if (lastRow.length < 3) {
                $(lastRow).each(function () {
                    $(this).remove();
                });
            }
        }
        rows.forEach(function (rowElements, index) {
            rowElements.forEach(function (element) {
                $(element).appendTo(".btn-container");
            });
            if (index < rows.length - 1) {
                $("<div class='row-separator' style='flex-basis: 100%;'></div>").insertAfter($(rowElements[rowElements.length - 1]));
            }
        });
    }

  function addDocument() {
    var newFileUpload = $(".file-upload-container:first").clone();
    newFileUpload.find("input[type='file']").val("");
    newFileUpload.find('.btn-document i').attr('class', 'fas fa-paperclip');
    newFileUpload.find('.file-name').hide().text("");
    $(".btn-container").append(newFileUpload);
    arrangeDocumentRows();
  }

//   $(document).ready(function () {
//      var datePeriod = $("#datePeriod").val();
//      console.log(datePeriod, "datePeriod");
//       arrangeDocumentRows();
//   });

$(document).ready(function () {

    var datePeriod = $("#datePeriod").val();
    console.log(datePeriod, "datePeriod");

    var periodType = getPeriodType(datePeriod);

    console.log(periodType, "periodType");

    // Hide all sections first
    $(".perf-period-section").hide();

    // Show matching section
    $("#perf-section-" + periodType).show();

    arrangeDocumentRows();
});

function getPeriodType(dateRange) {

    if (!dateRange) {
        return "M";
    }

    // Split start and end dates
    var dates = dateRange.split(" - ");

    var startDate = new Date(dates[0]);
    var endDate = new Date(dates[1]);

    // Calculate months difference
    var months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) + 1;

    console.log(months, "months");

    // Decide period type
    if (months == 1) {
        return "M"; // Monthly
    } else if (months == 3) {
        return "Q"; // Quarterly
    } else if (months == 6) {
        return "HY"; // Half-Yearly
    } else if (months == 12) {
        return "A"; // Annual
    } else {
        return "M"; // Default Monthly
    }
}
  </script>

  <script>
    $(document).ready(function() {
        var useraccessid = localStorage.getItem('rootuseraccessid');
          console.log(useraccessid, "useraccessid");

          $.ajax({
            url: "/stratroom/userRole/" + useraccessid,
            type: "get",
            contentType: "application/json",
            success: function (data) {
              const users = data;
              const username = users.name || "NN";
              const userEmail = users.emailAddress || "";


              $('.user-text h6').text(username);
              $('.user-text small').text(userEmail);

              var userProfileConcate = (users.profileImage == undefined || users.profileImage == "")
                ? "data-name='" + username + "' class='rounded-circle swotmultiuserimage image-styles' "
                : "src='" + users.profileImage + "' class='rounded-circle'";


              var imgTag = "<img " + userProfileConcate + " />";

              const userImageContainer = $('.user-image');
              userImageContainer.empty().append(imgTag);


              $('.swotmultiuserimage').each(function () {
                const $img = $(this);
                const name = $img.data('name') || 'NN';
                const initials = name
                  ? name
                    .trim()
                    .slice(0, 2)
                    .toUpperCase()
                  : "NN";

                console.log(initials, "initials");

                const $div = $('<div></div>')
                  .addClass($img.attr('class'))
                  .text(initials)


                $img.replaceWith($div);
              });
            },
            error: function (xhr, status, err) {
              console.error("Error:", err);
            }
          });
    });
  </script>

   <script>
        $(document).ready(function () {
            $(".select-dropdown").select2({
                // allowClear: true,
                width: "100%",

            });

            // Performance Period Toggle Logic
            $('input[name="perf_period"]').on('change', function () {
                var selectedPeriod = $(this).val();

                // Hide all sections then show the selected one
                $('.perf-period-section').hide();
                $('#perf-section-' + selectedPeriod).fadeIn(300);
            });

            // Initialize Flatpickr for Start / End Date
            flatpickr("#dateRangePicker", {
                mode: "range",
                dateFormat: "d-m-Y",
                allowInput: true
            });
        });

    </script>




  
</body>