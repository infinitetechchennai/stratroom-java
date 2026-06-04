<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:set var="contextroot" value="${pageContext.request.contextPath}" />
    <a lang="en">

      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>StratRoom</title>
        <!-- Favicon-->
        <!-- <link rel="icon" href="images/favicon.ico" type="image/x-icon"> -->
        <!-- Plugins Core Css -->
        

       <!-- Plugins Core Css -->
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>


    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <!-- Impact Style Start -->
        <style>
         
          /* Ensure the select container has enough height */
          .select2-container--default .select2-selection--multiple {
            height: auto !important;
            min-height: 38px !important;
            padding: 5px !important;
            overflow: visible !important;
            display: flex;
            align-items: center;
          }

          .select2-selection--multiple .select2-selection__choice {
            margin: 2px 5px 2px 0px !important;
            padding: 3px 5px !important;
            font-size: 14px !important;
            background-color: #e9ecef !important;
            border: 1px solid #ced4da !important;
            border-radius: 4px !important;
          }

          .select2-selection--multiple .select2-selection__rendered {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: center;
          }

          .select2-selection--multiple .select2-selection__arrow {
            height: 38px !important;
          }

          .select2-container .select2-search--inline .select2-search__field {
            height: auto !important;
            min-height: 28px !important;
            margin-top: 5px !important;
          }

          .select2-container .select2-selection--multiple .select2-selection__rendered {
            padding: 2px 2px !important;
            line-height: normal !important;
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

          

          .form-row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }


          .modal-body {
            overflow-y: auto;
          }

          .form-label {
    width: 200px;
    display: inline-block;
  }

  .form-group {
    margin-bottom: 1rem;
  }
  .no-select {
  user-select: none; /* Prevent text selection */
}

.no-select input {
  user-select: text; /* Allow text selection within the input */
  pointer-events: auto; /* Allow interactions with the input */
}
  input[type="number"] {
            width: 100%;
            box-sizing: border-box; /* Ensures padding and border are included in the element's total width */
            border: none; /* Removes default input border */
            margin: 0; /* Removes default margin */
            border-bottom: 0px !important;
        }

  .form-group label {
    margin-bottom: 0.5rem;
  }

  .form-group select,
  .form-group textarea,
  .form-group input {
    width: calc(100% - 220px);
    display: inline-block;
  }

  

        </style>

        <!-- Impact Style End -->
      </head>

      <body class="light">
       <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>

   <main class="pt-2 pb-2">
		<c:if test="${pageId != null}">
        <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value="${pageId}" />">
    </c:if>
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/rpo-i.svg" alt="control-panel" title="control-panel">
                        </span>
                         Impact Assesment
                    </h4>
                </div>
                <div class="load-page page-actions g-col-4">
				  <div class="page-icons">
                        <ul>
                          
                            <li>
                                <a href="#" class="exceldownloadlink">
                                    <span class="icon"  data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Export">
                                    <img src="/stratroom/images/export-i.svg" alt="export" title="export">
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href=".scorecard_description_popup" data-bs-toggle="modal">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                    <i class="fas fa-plus title_edit_icon"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
							
                    </div>
				
                </div>
            </div>
        </div>
            <div class="container-lg py-2">
            <div class="rpo-container">
                <div class="row g-2">
                    <div class="col-12">
                            <div class="card-body">
                                <div class="table-responsive" id="impactsurvey_table">
                                   
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="col-12 text-center py-2 copyright">
    <p class="mb-0">Copyright &copy; <span id="year"></span> <strong>StratRoom</strong></p>

<script>
    document.getElementById("year").textContent = new Date().getFullYear();
</script>

</footer>
        <!-- Section - Table Start -->
        <!-- Section - Table End -->
<!-- Add Modal -->
<!-- Add Modal -->
<div class="modal custom-modal fade scorecard_description_popup" id="addModal" tabindex="-1" 
     role="dialog" aria-labelledby="impactSurveyModalLabel" aria-hidden="true"
     data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Impact Survey</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card border-0">
          <div class="card-body">
            <div class="grid gap-3">

              <!-- Process (POS) -->
              <div class="g-col-12">
                <div class="form-group">
                  <label for="saveprocessService" class="form-label">Process (POS)</label>
                  <select class="form-select modal-custom-select  processService" id="saveprocessService">
                  </select>
                </div>
              </div>

              <!-- Justification -->
              <div class="g-col-12">
                <div class="form-group">
                  <label for="savejustificationService" class="form-label">Justification for Critical & Risk Event</label>
                  <textarea class="form-control" rows="3" id="savejustificationService"></textarea>
                </div>
              </div>

              <!-- Impact Section -->
              <div class="g-col-12" id="impactContainer">
                <div class="form-group">
                  <label class="form-label">Impact</label>
                  <div class="d-flex gap-2 align-items-end">
                    <select class="form-select modal-custom-select impactService" name="impactService[]">
                      
                    </select>
                    <button type="button" class="btn btn-sm btn-primary add-more-incident-impact" id="addImpact">+Add</button>
                  </div>
                </div>

                <!-- Dynamic list of added impacts will go here -->
                <div id="impactExternal-list" class="mt-3"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="saveBtn" onclick="saveImpact()">Save</button>
        <input id="pageId" type="hidden" name="pagenumber" value="${pagenumber}" />
      </div>
    </div>
  </div>
</div>

<!-- Update Modal -->
<!-- Update Impact Modal -->
<div class="modal custom-modal fade update_impact" id="updateImpactModal" tabindex="-1"
     role="dialog" aria-labelledby="updateImpactModalLabel" aria-hidden="true"
     data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Impact Survey</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card border-0">
          <div class="card-body">
            <div class="grid gap-3">

              <!-- ID -->
              <div class="g-col-12">
                <div class="form-group">
                  <label for="updateid" class="form-label">ID</label>
                  <input type="text" class="form-control" id="updateid" readonly />
                </div>
              </div>

              <!-- Process (POS) -->
              <div class="g-col-12">
                <div class="form-group">
                  <label for="processServiceUpdate" class="form-label">Process (POS)</label>
                  <select class="form-select modal-custom-select int-status-multi-select" 
                          name="states[]" multiple="multiple" id="processServiceUpdate">
                    <!-- Options populated via JS or backend -->
                  </select>
                </div>
              </div>

              <!-- Justification -->
              <div class="g-col-12">
                <div class="form-group">
                  <label for="justificationServiceUpdate" class="form-label">Justification for Critical & Risk Event</label>
                  <textarea class="form-control" rows="3" id="justificationServiceUpdate"></textarea>
                </div>
              </div>

              <!-- Impact Section -->
              <div class="g-col-12" id="incident-and-impact-container">
                <div class="form-group">
                  <label class="form-label">Impact</label>
                  <div class="d-flex gap-2 align-items-end">
                    <select class="form-select modal-custom-select impactService" id="impactServiceUpdate" name="updateImpactService[]">
                      
                    </select>
                    <button type="button" class="btn btn-sm btn-primary" id="add-impact-update">+Add</button>
                  </div>
                </div>

                <!-- Dynamic list of added impacts -->
                <div id="impact-update-list" class="mt-3"></div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer with Save/Cancel -->
      <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="updateImpact()">Save</button>
      </div>

      <!-- Audit Section (styled as part of footer or below) -->
      <div class="modal-body border-top">
        <div class="grid gap-2 font-11">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Audit</h6>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <p class="mb-1"><strong>Created By:</strong> <span id="createrNameId"></span></p>
              <p class="mb-1"><strong>Created Date:</strong> <span id="dateCreated"></span></p>
            </div>
            <div>
              <p class="mb-1"><strong>Modified By:</strong> <span id="updaterNameId"></span></p>
              <p class="mb-1"><strong>Modified Date:</strong> <span id="dateUpdated"></span></p>
            </div>
          </div>
          <input type="hidden" id="createId" />
        </div>
      </div>
    </div>
  </div>
</div>

        <!-- Delete Popup Start -->
      
          <div class="modal custom-modal custom-delete-modal fade" id="deleteImpact" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="card custom-card delete-card border-0">
                        <div class="card-body">

                            <div class="delete-box">
                                <h4 class="title">Do you really want to delete?</h4>
                                <div class="btn-wrap">
                                    <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                        data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                    <button class="btn btn-sm btn-danger rounded-pill" onclick="deleteImpactpage()">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

        <!-- Delete Popup End -->

        <!-- jQuery Start -->
        <!-- Plugins Js -->
        <script src="js/app.min.js"></script>

        <!-- Custom Js -->
        <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
        <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
        <script src="js/admin.js"></script>
        <script src="js/file-preview.js"></script>
        <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
        <script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>

        <!-- Knob Js -->
        <script src="js/jquery-ui.min.js"></script>
        <script src="js/moment.js"></script>
        <script src="js/pages/animated.js"></script>
        <script src="js/jquery.editable.min.js"></script>
        <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
        <script src="js/jquery-resize.js"></script>
      	<script src="${contextroot}/js/datepickerair.js"></script>
	      <script src="${contextroot}/js/datepicker.en.js"></script>
        <script src="${contextroot}/js/widgets.js"></script>
        <script src="js/exceltemplate.js"></script>
        <script src="${contextroot}/js/notify.js"></script>
        <script src="js/initial.js"></script>

        <!-- multi-select dropdown -->
        <script src="${contextroot}/js/select2.min.js"></script>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

        <script>
           
          $(document).ready(function() {
           
            $('#downloadCsvBtn').on('click', function() {
              $.ajax({
                url: "/stratroom/retrieveImpactlist?pageId=" + pageNo.trim()+"&dateRange="+datePeriod,
                type: "GET",
                contentType: "application/json",
                success: function(data, status) {
                  console.log(data, "Impact Survey Data");
        
                  let csvContent = downloadToCSV(data);
                  let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                  let link = document.createElement("a");
                  let url = URL.createObjectURL(blob);
                  link.setAttribute("href", url);
                  link.setAttribute("download", "ImpactSurveyData.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                },
                error: function(xhr, status, error) {
                  console.error("Error: " + xhr.responseText);
                }
              });
            });
        
            $('#downloadPdfBtn').on('click', function() {
              $.ajax({
                url: "/stratroom/retrieveImpactlist?pageId=" + pageNo.trim()+"&dateRange="+datePeriod,
                type: "GET",
                contentType: "application/json",
                success: function(data, status) {
                  console.log(data, "Impact Survey Data");
        
                  let pdfContent = convertToHtml(data);
                  let pdfDoc = new jsPDF();
                  pdfDoc.fromHTML(pdfContent, 10, 10);
                  pdfDoc.save('ImpactSurveyData.pdf');
                },
                error: function(xhr, status, error) {
                  console.error("Error: " + xhr.responseText);
                }
              });
            });
        
            function downloadToCSV(data) {
              let headers = [
                "Process",
                "Justification for Critical & Risk Event",
                "Impact",
                "<= 2 Hours",
                "<= 3 Hours",
                "<= 4 Hours",
                "<= 5 Hours",
                "<= 6 Hours",
                "<= 8 Hours",
                "<= 1 days",
                "<= 2 days",
                "<= 4 days",
                "<= 1 week",
                "<= 2 week",
                "<= 1 month"
              ];
        
              let csvRows = [];
              csvRows.push(headers.join(','));
        
              function getHighestValue(impactData, field) {
                let values = impactData.map(impact => impact.hoursDaysMonths[field]).filter(value => value !== undefined);
                return Math.max(...values);
              }
        
              data.forEach(List => {
                List.impactData.forEach(impact => {
                  let row = [
                    List.process,
                    List.justificationForCritical,
                    impact.impact,
                    impact.hoursDaysMonths.ls2Hours || "",
                    impact.hoursDaysMonths.ls3Hours || "",
                    impact.hoursDaysMonths.ls4Hours || "",
                    impact.hoursDaysMonths.ls5Hours || "",
                    impact.hoursDaysMonths.ls6Hours || "",
                    impact.hoursDaysMonths.ls8Hours || "",
                    impact.hoursDaysMonths.ls1days || "",
                    impact.hoursDaysMonths.ls2days || "",
                    impact.hoursDaysMonths.ls4days || "",
                    impact.hoursDaysMonths.ls1week || "",
                    impact.hoursDaysMonths.ls2week || "",
                    impact.hoursDaysMonths.ls1month || ""
                  ];
                  csvRows.push(row.join(','));
                });
        
                let highestRow = [
                  "",
                  "",
                  "Result",
                  getHighestValue(List.impactData, 'ls2Hours'),
                  getHighestValue(List.impactData, 'ls3Hours'),
                  getHighestValue(List.impactData, 'ls4Hours'),
                  getHighestValue(List.impactData, 'ls5Hours'),
                  getHighestValue(List.impactData, 'ls6Hours'),
                  getHighestValue(List.impactData, 'ls8Hours'),
                  getHighestValue(List.impactData, 'ls1days'),
                  getHighestValue(List.impactData, 'ls2days'),
                  getHighestValue(List.impactData, 'ls4days'),
                  getHighestValue(List.impactData, 'ls1week'),
                  getHighestValue(List.impactData, 'ls2week'),
                  getHighestValue(List.impactData, 'ls1month')
                ];
                csvRows.push(highestRow.join(','));
              });
        
              return csvRows.join('\n');
            }
        
            function convertToHtml(data) {
              let headers = [
                "Process",
                "Justification for Critical & Risk Event",
                "Impact",
                "<= 2 Hours",
                "<= 3 Hours",
                "<= 4 Hours",
                "<= 5 Hours",
                "<= 6 Hours",
                "<= 8 Hours",
                "<= 1 days",
                "<= 2 days",
                "<= 4 days",
                "<= 1 week",
                "<= 2 week",
                "<= 1 month"
              ];
        
              let htmlContent = "<table border='1'><thead><tr>";
              headers.forEach(header => {
                htmlContent += "<th>" + header + "</th>";
              });
              htmlContent += "</tr></thead><tbody>";
        
              function getHighestValue(impactData, field) {
                let values = impactData.map(impact => impact.hoursDaysMonths[field]).filter(value => value !== undefined);
                return Math.max(...values);
              }
        
              data.forEach(List => {
                List.impactData.forEach(impact => {
                  htmlContent += "<tr>";
                  htmlContent += "<td>" + List.process + "</td>";
                  htmlContent += "<td>" + List.justificationForCritical + "</td>";
                  htmlContent += "<td>" + impact.impact + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls2Hours || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls3Hours || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls4Hours || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls5Hours || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls6Hours || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls8Hours || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls1days || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls2days || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls4days || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls1week || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls2week || "") + "</td>";
                  htmlContent += "<td>" + (impact.hoursDaysMonths.ls1month || "") + "</td>";
                  htmlContent += "</tr>";
                });
        
                let highestRow = "<tr><td colspan='2'>Result</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls2Hours') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls3Hours') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls4Hours') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls5Hours') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls6Hours') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls8Hours') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls1days') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls2days') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls4days') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls1week') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls2week') + "</td>";
                highestRow += "<td>" + getHighestValue(List.impactData, 'ls1month') + "</td>";
                highestRow += "</tr>";
                htmlContent += highestRow;
              });
        
              htmlContent += "</tbody></table>";
        
              return htmlContent;
            }
          });

        

      
          var currentEmp = $("#userPrincipal").val();
          var pageNo = $("#pagenumber").val();
          console.log("pageNo", pageNo);
          $(document).ready(function() {
              var dateRange = $('#datePeriod').val();
              console.log(dateRange,"dateRange aee");
             });
          var impactHoursDataMap = {};


          if (
            $("#userrolename").val() == "Super User" ||
            $("#userrolename").val() == "Admin"
          ) {
            if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
              if ($(".topmenubreadcrumb").length) {
                $(".topmenubreadcrumb").show();
              }
              if ($(".sidebarNavigate").length) {
                $(".sidebarNavigate").show();
              }
            }
          }
$(document).ready(function () {

  // Function to add a new impact row in #addModal
  function addImpactRowToLegacyModal() {
    const selectedValue = $("#addModal .impactService").first().val();
    if (!selectedValue) {
      alert("Please select an Impact");
      return;
    }

    // Check for duplicates in dynamic list
    let exists = false;
    $("#addModal #impactExternal-list .impactService").each(function () {
      if ($(this).val() === selectedValue) {
        exists = true;
        return false; // break loop
      }
    });

    if (exists) {
      alert("This impact is already added!");
      return;
    }

    // Clone the first select (with all options)
    const $newSelect = $("#addModal .impactService").first().clone();
    $newSelect.val(selectedValue).prop('disabled', true); // Optional: disable after adding

    const $row = $(`
      <div class="d-flex align-items-center mb-2">
        <div style="flex: 1;">
          <select class="form-select modal-custom-select impactService" name="impactService[]" disabled></select>
        </div>
        <button type="button" class="btn btn-outline-danger btn-sm ms-2 remove-impact-row">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `);

    $row.find('.impactService').replaceWith($newSelect);
    $("#addModal #impactExternal-list").append($row);
    
    // Reset the main selector
    $("#addModal .impactService").first().val("").trigger("change");
  }

  // Bind +Add button in #addModal
  $("#addModal").on("click", "#addImpact", function () {
    addImpactRowToLegacyModal();
  });

  // Remove row (delegated event)
  $("#addModal").on("click", ".remove-impact-row", function () {
    $(this).closest(".d-flex").remove();
  });

  // --- ALSO: Support the NEW MODAL (#impactSurvey-add-modal) ---
  
  $("#impactSurvey-add-modal").on("click", "#add-impact", function () {
    const impactValue = $("#impactSurvey-add-modal .impact-name").val();

    if (!impactValue) {
      alert("Please select an Impact Name");
      return;
    }

    // Prevent duplicates
    let exists = false;
    $("#impactSurvey-add-modal #impactExternal-list select").each(function () {
      if ($(this).val() === impactValue) {
        exists = true;
        return false;
      }
    });
    if (exists) {
      alert("This impact is already added!");
      return;
    }

    // Clone the base select
    const $newSelect = $("#impactSurvey-add-modal .impact-name")
      .clone()
      .removeClass("impact-name")
      .removeAttr("id")
      .val(impactValue)
      .prop("disabled", true); // optional: lock selection

    const $row = $(`
      <div class="d-flex align-items-center mb-2 impactExternal-row">
        <div style="flex: 1;">${$newSelect.prop('outerHTML')}</div>
        <button type="button" class="btn btn-outline-danger btn-sm delete-impactExternal p-2 ms-2">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `);

    $("#impactSurvey-add-modal #impactExternal-list").append($row);

    // Reset main dropdown
    $("#impactSurvey-add-modal .impact-name").val("").trigger("change");
  });

  // Delete from new modal
  $(document).on("click", ".delete-impactExternal", function () {
    $(this).closest(".impactExternal-row").remove();
  });

});
          function getpagenameView() {
            $.ajax({
              type: "GET",
              url: "/stratroom/pages/" + pageNo,
              async: false,
              success: function (data) {
                if (
                  $("#userPrincipal").val() != $("#userPrincipalnavigate").val()
                ) {
                  $("." + data.id).addClass("homepageHighlight");
                }

                if ($(".superusertopmenu").hasClass(data.id)) {
                  $(".subusermenuname").text(data.pageName);
                }
              },
            });
          }

          getpagenameView();

           function processSelect(data) {
  var $select = $(".processService");

  // Clear dropdown
  $select.empty();

  // Add default "Select" option
  $select.append(
    $("<option>", {
      value: "",
      text: "Select",
      selected: true,
      disabled: true
    })
  );

  // Append API values
  data.forEach(function (list) {
    if (list.data.processName && list.data.processName.trim() !== "") {
      $select.append(
        $("<option>", {
          text: list.data.processName,
          value: list.data.processName
        })
      );
    }
  });
}

function getProcesslist() {
  $.ajax({
    url: "/stratroom/retrieveMasterTypes?type=Process",
    dataType: "json",
    success: function (employeeList) {
      processSelect(employeeList);
    }
  });
}

          function impactSelect(data) {
            var $select = $(".impactService, .updateImpactService"); // Select both classes
            $select.empty();
            var $option = $("<option>", {
                  text: "Select options",
                  value: "",
                });
            $select.append($option); // Add placeholder option


            data.forEach(function (list) {
              if (list.type === "category") {
                var $option = $("<option>", {
                  text: list.option,
                  value: list.value,
                });
                $select.append($option);
              }
            });
          }

          // Impact
          function getImpactlist() {
            $.ajax({
              url: "/stratroom/riskoptionlist",
              method: "GET",
              dataType: "json",
              success: function (employeeList) {
                impactSelect(employeeList);
              },
              error: function (error) {
                console.error("Error fetching the data", error);
              },
            });
          }

       $(document).ready(function () {

  // Add impact row in UPDATE modal
  $("#updateImpactModal").on("click", "#add-impact-update", function () {
    const selectedValue = $("#updateImpactModal #impactServiceUpdate").val();
    if (!selectedValue) {
      alert("Please select an Impact");
      return;
    }

    // Prevent duplicates
    let exists = false;
    $("#updateImpactModal #impact-update-list select").each(function () {
      if ($(this).val() === selectedValue) {
        exists = true;
        return false;
      }
    });
    if (exists) {
      alert("This impact is already added!");
      return;
    }

    // Clone base select options
    const $newSelect = $("#updateImpactModal #impactServiceUpdate").clone();
    $newSelect
      .removeClass("impactService")
      .removeAttr("id")
      .val(selectedValue)
      .prop("disabled", true); // optional: lock after adding

    const $row = $(`
      <div class="d-flex align-items-center mb-2 impact-update-row">
        <div style="flex: 1;">${$newSelect.prop('outerHTML')}</div>
        <button type="button" class="btn btn-outline-danger btn-sm ms-2 delete-impact-update">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `);

    $("#impact-update-list").append($row);

    // Reset main selector
    $("#updateImpactModal #impactServiceUpdate").val("").trigger("change");
  });

  // Remove impact row
  $(document).on("click", ".delete-impact-update", function () {
    $(this).closest(".impact-update-row").remove();
  });

});

          $(document).on("click", ".remove-impact", function () {
            $(this).closest(".form-row").remove();
            computeResult();
          });
          $(document).ready(function () {
          getImpactSurveyData();       
          getProcesslist();
          getImpactlist();
    });
          function saveImpact() {
            var pagenumber = $("#pagenumber").val();
            var processsave = $("#saveprocessService").val();
            var justificationsave = $("#savejustificationService").val();
            var impacts = [];
            var hoursDaysMonths = {
              "ls4Hours": "",
              "ls1week": "",
              "ls5Hours": "",
              "ls2week": "",
              "ls1month": "",
              "ls8Hours": "",
              "ls2Hours": "",
              "ls6Hours": "",
              "ls1days": "",
              "ls4days": "",
              "ls3Hours": "",
              "ls2days": ""
            }
            $(".impactService").each(function () {
              var impactValue = $(this).val();
              if (impactValue !== "Select") {
                impacts.push({ impact: impactValue, hoursDaysMonths: hoursDaysMonths });
              }
            });

            var ImpactServiceData = {
              "createBy":"",
              "createTime": "",
              "owner":"",
              "departmentId":"",
		          "pageId":pagenumber,
              "process": processsave,
              "justificationForCritical": justificationsave,
              "impactData": impacts,
            };
            console.log(ImpactServiceData);

            $.ajax({
              url: "/stratroom/saveImpact",
              type: "post",
              contentType: "application/json",
              data: JSON.stringify(ImpactServiceData),
              success: function (data, status) {
                $.notify("Success: Impact Page Data Successfully Submitted", {
                  style: 'success',
                  className: 'graynotify'
                });

                location.reload(true);
                getImpactSurveyData();
              },
              error: function (xhr, status, error) {
                console.error("Error: " + xhr.responseText);
              }
            });
          }

          function updateEvent(inputElement) {
            var rowElement = inputElement.closest("tr");
            var impactId = rowElement.getAttribute("data-impact-id");
            var idName = rowElement.getAttribute("id");
            var impactMenuValue = rowElement.querySelector("#impactMenu").innerText.trim();
            var twoHoursValue = rowElement.querySelector("#hoursTwo") ? rowElement.querySelector("#hoursTwo").value : "";
            var threeHoursValue = rowElement.querySelector("#hoursThree") ? rowElement.querySelector("#hoursThree").value : "";
            var fourHoursValue = rowElement.querySelector("#hoursFour") ? rowElement.querySelector("#hoursFour").value : "";
            var fiveHoursValue = rowElement.querySelector("#hoursFive") ? rowElement.querySelector("#hoursFive").value : "";
            var sixHoursValue = rowElement.querySelector("#hoursSix") ? rowElement.querySelector("#hoursSix").value : "";
            var eightHoursValue = rowElement.querySelector("#hoursEight") ? rowElement.querySelector("#hoursEight").value : "";
            var oneDaysValue = rowElement.querySelector("#daysOne") ? rowElement.querySelector("#daysOne").value : "";
            var twoDaysValue = rowElement.querySelector("#daysTwo") ? rowElement.querySelector("#daysTwo").value : "";
            var fourDaysValue = rowElement.querySelector("#daysFour") ? rowElement.querySelector("#daysFour").value : "";
            var oneWeeksValue = rowElement.querySelector("#weeksOne") ? rowElement.querySelector("#weeksOne").value : "";
            var twoWeeksValue = rowElement.querySelector("#weeksTwo") ? rowElement.querySelector("#weeksTwo").value : "";
            var oneMonthsValue = rowElement.querySelector("#monthsOne") ? rowElement.querySelector("#monthsOne").value : "";

            var impactHoursData = {
              "id": parseInt(impactId),
              "impact": impactMenuValue,
              "hoursDaysMonths": {
                "ls2Hours": twoHoursValue,
                "ls3Hours": threeHoursValue,
                "ls4Hours": fourHoursValue,
                "ls5Hours": fiveHoursValue,
                "ls6Hours": sixHoursValue,
                "ls8Hours": eightHoursValue,
                "ls1days": oneDaysValue,
                "ls2days": twoDaysValue,
                "ls4days": fourDaysValue,
                "ls1week": oneWeeksValue,
                "ls2week": twoWeeksValue,
                "ls1month": oneMonthsValue
              },
              impactId: idName,
            };

            $.ajax({
              url: "/stratroom/updateImpactData",
              type: "PUT",
              contentType: "application/json",
              data: JSON.stringify(impactHoursData),
              success: function (data, status) {
                console.log("Update Successful:", data);
                getImpactSurveyData();

              },
              error: function (xhr, status, error) {
                console.error("Error: " + xhr.responseText);
              },
            });
          }

          function computeResult() {
            
            var rows = document.querySelectorAll("#impactsurvey_table tbody tr");
            var resultRow = rows[rows.length - 1];

            var columns = [
              "ls2Hours",
              "ls3Hours",
              "ls4Hours",
              "ls5Hours",
              "ls6Hours",
              "ls8Hours",
              "ls1days",
              "ls2days",
              "ls4days",
              "ls1week",
              "ls2week",
              "ls1month",
            ];

            columns.forEach(function (col, index) {
              var highestValue = getHighestValue(
                Array.from(rows).slice(0, -1).map(function (row) {
                  var inputElement = row.querySelector('#' + col);
                  return {
                    hoursDaysMonths: {
                      [col]: inputElement ? inputElement.value : ""
                    },
                  };
                }),
                'hoursDaysMonths.' + col
              );

              var resultElement = resultRow.querySelector('#' + col);
              if (resultElement) {
                resultElement.innerText = highestValue;
              }
            });
          }


          function getHighestValue(dataArray, keyPath) {
            let highestValue = -Infinity;

            dataArray.forEach((item) => {
              if (item) {
                let value = keyPath.split('.').reduce((acc, key) => {
                  return acc && acc[key] !== undefined ? acc[key] : undefined;
                }, item);

                let numericValue = Number(value);

                if (!isNaN(numericValue) && numericValue > highestValue) {
                  highestValue = numericValue;
                }
              }
            });
          // Get the Result color
          function getBackgroundColor(value) {
              if (value >= 1 && value <= 3) {
                  return "yellow";
              } else if (value >= 4 && value <= 9) {
                  return "red";
              } else {
                  return "#ffffff";
              }
          }
          function applyResultColors() {
          const resultRow = $('#impactsurvey_table');
          resultRow.find('td').each(function() {
              if (!$(this).attr('data-color')) {
                  const value = parseInt($(this).text(), 10);
                  if (!isNaN(value)) {
                      const backgroundColor = getBackgroundColor(value);
                      $(this).css('background-color', backgroundColor);
                  }
              }
          });
          }
          $(document).ready(function() {
              applyResultColors();
          });
            return highestValue;
          }

          // only 0-9 values
          $('body').on('input', 'input[type="number"]', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 1) {
              this.value = this.value.slice(0, 1);
            }
          });

          function getImpactSurveyData() {
            var pageNo = $('#pagenumber').val();
            console.log("employee", pageNo);
            var dateRange = $('#datePeriod').val();
            console.log(dateRange,"dateRange val");

            $.ajax({
              url: "/stratroom/retrieveImpactlist?pageId=" + pageNo.trim()+"&dateRange="+dateRange,
              type: "GET",
              contentType: "application/json",
              success: function (data, status) {
                console.log(data, "Impact Survey Data");
                $("#impactsurvey_table").empty();

                var uploadShowData = "";
                $.each(data, function (i, List) {
                  var validImpacts = List.impactData.filter(impact => impact.impact && impact.impact.trim() !== "");

                  if (validImpacts.length > 0) {
                    $.each(validImpacts, function (j, impact) {
                      var impactId = impact.id;
                      var id = impact.impactId;
                      var uniqueId = 'impact-' + impactId + '-' + j; // Unique ID for input fields

                      if (j === 0) {

                        // Each every first rowspan
                        uploadShowData +=
                          '<tr id="' + id + '" data-impact-id="' + impactId + '">' +

                          '<td rowspan="' + (validImpacts.length + 1) + '" contenteditable="false"  data-color="true">' + List.process + ' </td>' +

                          '<td  rowspan="' + (validImpacts.length + 1) + '" contenteditable="false" data-color="true">' + List.justificationForCritical + '</td>' +
                          
                          '<td id="impactMenu" onchange="updateEvent(this)"contenteditable="false" >'+ impact.impact +'</td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="hoursTwo" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls2Hours ? impact.hoursDaysMonths.ls2Hours : "") + '" onchange="updateEvent(this)" autocomplete="off" /></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="hoursThree" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls3Hours ? impact.hoursDaysMonths.ls3Hours : "") + '" onchange="updateEvent(this)"  autocomplete="off"/></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="hoursFour" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls4Hours ? impact.hoursDaysMonths.ls4Hours : "") + '" onchange="updateEvent(this)" autocomplete="off" /></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="hoursFive" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls5Hours ? impact.hoursDaysMonths.ls5Hours : "") + '" onchange="updateEvent(this)"  autocomplete="off"/></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="hoursSix" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls6Hours ? impact.hoursDaysMonths.ls6Hours : "") + '" onchange="updateEvent(this)"  autocomplete="off"/></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="hoursEight" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls8Hours ? impact.hoursDaysMonths.ls8Hours : "") + '" onchange="updateEvent(this)" autocomplete="off" /></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="daysOne" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls1days ? impact.hoursDaysMonths.ls1days : "") + '" onchange="updateEvent(this)"  autocomplete="off"/></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="daysTwo" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls2days ? impact.hoursDaysMonths.ls2days : "") + '" onchange="updateEvent(this)"  autocomplete="off"/></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="daysFour" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls4days ? impact.hoursDaysMonths.ls4days : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="weeksOne" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls1week ? impact.hoursDaysMonths.ls1week : "") + '" onchange="updateEvent(this)"  autocomplete="off"/></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="weeksTwo" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls2week ? impact.hoursDaysMonths.ls2week : "") + '" onchange="updateEvent(this)" autocomplete="off" /></td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="monthsOne" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls1month ? impact.hoursDaysMonths.ls1month : "") + '"onchange="updateEvent(this)" autocomplete="off" /></td>' +

                          '<td rowspan="' + (validImpacts.length + 1) + '" contenteditable="false"> <div class="action-btn" href="#deleteImpact"  data-bs-toggle="modal" onclick="deleteImpactData(' + List.id + ')">  <span data-bs-toggle="tooltip" data-bs-placement="bottom"     data-bs-title="Delete"><img src="images/delete-i.svg" width="12" height="12"  /> </span> </div></div>' + '</td>';

                        uploadShowData += '</tr>';
                      }

                      else {
                        var impactId = impact.id;
                        var id = impact.impactId;
                        var uniqueId = 'impact-' + impactId + '-' + j;

                        // Each every other rowspan
                        uploadShowData +=
                          '<tr id="' + id + '" data-impact-id="' + impactId + '">' +

                          '<td  id="impactMenu" onchange="updateEvent(this)"contenteditable="false" >'+ impact.impact +'</td>' +

                          '<td class="no-select"contenteditable="false" ><input type="number" id="hoursTwo" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls2Hours ? impact.hoursDaysMonths.ls2Hours : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="hoursThree" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls3Hours ? impact.hoursDaysMonths.ls3Hours : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="hoursFour" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls4Hours ? impact.hoursDaysMonths.ls4Hours : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="hoursFive" autocomplete="off" style="font-size: 11px;text-align: center;"  value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls5Hours ? impact.hoursDaysMonths.ls5Hours : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="hoursSix" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls6Hours ? impact.hoursDaysMonths.ls6Hours : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="hoursEight" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls8Hours ? impact.hoursDaysMonths.ls8Hours : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="daysOne" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls1days ? impact.hoursDaysMonths.ls1days : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="daysTwo" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls2days ? impact.hoursDaysMonths.ls2days : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="daysFour" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls4days ? impact.hoursDaysMonths.ls4days : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="weeksOne" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls1week ? impact.hoursDaysMonths.ls1week : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="weeksTwo" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls2week ? impact.hoursDaysMonths.ls2week : "") + '" onchange="updateEvent(this)" /></td>' +

                          '<td class="no-select" contenteditable="false" ><input type="number" id="monthsOne" autocomplete="off" style="font-size: 11px;text-align: center;" value="' + (impact.hoursDaysMonths && impact.hoursDaysMonths.ls1month ? impact.hoursDaysMonths.ls1month : "") + '" onchange="updateEvent(this)" /></td>' +

                          '</tr>';
                      }
                    });

                    // Result Section
                    uploadShowData +=
                      '<tr>' +
                      '<td contenteditable="false">Result</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls2Hours') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls3Hours') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls4Hours') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls5Hours') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls6Hours') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls8Hours') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls1days') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls2days') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls4days') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls1week') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls2week') + '</td>' +
                      '<td  contenteditable="false"> ' + getHighestValue(validImpacts, 'hoursDaysMonths.ls1month') + '</td>' +
                      '</tr>';
                  }
                });
                // Table Heading
                var table = `<table class="table table-bordered w-100 impact-table text-nowrap text-center align-middle" id="intRegister" >
                                <thead class="text-center align-middle">
                                    <tr>
                                        <th rowspan="2">Process (POS)</th>
                                        <th rowspan="2">
                                            Justification for Critical & Risk Event<br>
                                            <small>(SLA, Regulations, other regulations)</small>
                                        </th>
                                        <th rowspan="2">Impact</th>
                            
                                        <th colspan="6" class="bg-success text-white">Hours</th>
                                        <th colspan="3">Days</th>
                                        <th colspan="2">Weeks</th>
                                        <th>Month</th>
                                        <th rowspan="2">Action</th>
                                    </tr>
                                    <tr>
                                        <th class="bg-success text-white">&le; 2</th>
                                        <th class="bg-success text-white">&le; 3</th>
                                        <th class="bg-success text-white">&le; 4</th>
                                        <th class="bg-success text-white">&le; 5</th>
                                        <th class="bg-success text-white">&le; 6</th>
                                        <th class="bg-success text-white">&le; 8</th>
                            
                                        <th>&le; 1</th>
                                        <th>&le; 2</th>
                                        <th>&le; 4</th>
                            
                                        <th>&le; 1</th>
                                        <th>&le; 2</th>
                                        <th>&le; 1</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>` + uploadShowData + `</tbody>
                            </table>`;

                $('#impactsurvey_table').html(table);
                $('[rel="tooltip"]').tooltip();
              },
              error: function (xhr, status, error) {
                console.error("Error: " + xhr.responseText);
              }
            });
          }
          //---------------------------------------------------------------------------------
          // delete

          let deleteId;
          function deleteImpactData(id) {
            deleteId = id;

            $.ajax({
              url: "/stratroom/retriveImpactId/" + deleteId,
              method: 'GET',
              success: function (data, status) {
                console.log(data);
              },
              error: readErrorMsg
            });
          }

          function deleteImpactpage() {
            if (!deleteId) {
              console.error("Impact Data DeleteID is not Set");
              return;
            }
            console.log(deleteId, "DeleteID");

            $.ajax({
              url: "/stratroom/deleteImpact/" + deleteId,
              type: "DELETE",
              contentType: "application/json",
              success: function (data, status) {
                $.notify("Success: Deleted Successfully", {
                  style: 'success',
                  className: 'graynotify'
                });
                location.reload(true);
              },
              error: readErrorMsg
            });
          }

          //---------------------------------------------------------------------------------
          // edit
function editImpactpage(id) {
  editId = id;

  $.ajax({
    url: "/stratroom/retriveImpactId/" + editId,
    method: 'GET',
    success: function (data) {
      // Basic fields
      $("#updateid").val(data.id);
      $("#justificationServiceUpdate").val(data.justificationForCritical);

      // Process multi-select (assuming Select2)
      $("#processServiceUpdate").val(data.process).trigger('change');

      // Clear and repopulate impacts
      $("#impact-update-list").empty();
      if (Array.isArray(data.impactData)) {
        data.impactData.forEach(function (impact) {
          if (impact.impact) {
            const $newSelect = $("#impactServiceUpdate").clone();
            $newSelect
              .removeClass("impactService")
              .removeAttr("id")
              .val(impact.impact)
              .prop("disabled", true);

            const $row = $(`
              <div class="d-flex align-items-center mb-2 impact-update-row" data-impact-id="${impact.id}">
                <div style="flex: 1;">${$newSelect.prop('outerHTML')}</div>
                <button type="button" class="btn btn-outline-danger btn-sm ms-2 delete-impact-update">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `);
            $("#impact-update-list").append($row);
            impactHoursDataMap[impact.id] = impact.hoursDaysMonths;
          }
        });
      }

      // Format dates
      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');
      };

      // Audit info (use .text() if using <span>, .val() if <input>)
      $("#createrNameId").text(data.createrName || "");
      $("#dateCreated").text(formatDate(data.createTime));
      $("#updaterNameId").text(data.updaterName || "");
      $("#dateUpdated").text(formatDate(data.updateTime));
      $("#createId").val(data.createBy); // hidden input

    },
    error: function (xhr) {
      console.error("Failed to load impact:", xhr.responseText);
      alert("Error loading impact data.");
    }
  });
}
          //---------------------------------------------------------------------------------
          // update

          function updateImpact() {
            var id = $(".updateid").val();
            var updateprocess = $("#processServiceUpdate").val();
            var updatejustification = $("#justificationServiceUpdate").val();

            var pagenumber = $("#pagenumber").val();
            var generateId = $("#createId").val();
            var generateDate = $("#dateCreated").val();
            var updateBy = $("#updaterNameId").val();

            var updateimpact = [];
            $("select[name='updateImpactService[]']").each(function () {
              var impactId = $(this).closest('.form-row').data('impact-id'); // Retrieve the impact ID from the data attribute
              var impactValue = $(this).val();
              if (impactValue !== "Select") { 

              var hoursDaysMonths = {
              "ls4Hours": "",
              "ls1week": "",
              "ls5Hours": "",
              "ls2week": "",
              "ls1month": "",
              "ls8Hours": "",
              "ls2Hours": "",
              "ls6Hours": "",
              "ls1days": "",
              "ls4days": "",
              "ls3Hours": "",
              "ls2days": ""
            }

            if(impactId && impactId !== undefined && impactId !=="undefined")
            {
                hoursDaysMonths = impactHoursDataMap[impactId];
                updateimpact.push({
                  "id": impactId,
                  "impact": impactValue,
                  "hoursDaysMonths": hoursDaysMonths
                });
            }else{
                console.log("Impact ID is null");
                updateimpact.push({
                  "impact": impactValue,
                  "hoursDaysMonths": hoursDaysMonths
                });
            }

              }
            });

            var updateImpactdata = {

              "createBy":generateId,
		          "createTime": generateDate,
          
		          "updateTime":"",

              "id": id,
              "process": updateprocess,
              "justificationForCritical": updatejustification,
              "departmentId": "",
              "owner": "",
              "pageId": pagenumber, // Ensure pageId is correctly set
              "impactData": updateimpact
            }
            console.log(updateImpactdata);

            $.ajax({
              url: "/stratroom/updateImpact",
              type: "PUT",
              contentType: "application/json",
              data: JSON.stringify(updateImpactdata),
              success: function (data, status) {
                $.notify("Success: Impact Survey Page Data Successfully Updated", {
                  style: 'success',
                  className: 'graynotify'
                });
                getImpactSurveyData();

                location.reload(true);
              },
              error: function (xhr, status, error) {
                console.log("Error: " + error);
              }
            });
          }


 

        </script>


      </body>