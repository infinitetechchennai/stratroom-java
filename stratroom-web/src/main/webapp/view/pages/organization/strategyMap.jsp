<!DOCTYPE html>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:set var="contextroot" value="${pageContext.request.contextPath}" />

    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>StratRoom</title>
    
      <style>
        .kpi-name-cell {
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .objective-name-cell {
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gauge-wrapper {
  position: relative;
  width: 120px;
  max-height: 200px;
  margin: 0 auto;
  aspect-ratio: 2/1;
}
.gauge-wrapper .gauge {
  width: 100%;
  height: 100%;
}
.gauge-wrapper .needle {
  position: absolute;
  width: 3px;
  background: linear-gradient(to top, #333, #666);
  border-radius: 2px;
  bottom: 32%;
  left: 50%;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(-90deg);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  height: 35%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.gauge-wrapper .needle-circle {
  position: absolute;
  background: radial-gradient(circle, #333 0%, #000 100%);
  border-radius: 50%;
  bottom: 26%;
  left: 50%;
  transform: translate(-50%, 26%);
  z-index: 11;
  width: clamp(12px, 3vw, 18px);
  height: clamp(12px, 3vw, 18px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.gauge-labels {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.gauge-labels .label {
  flex: 1;
  font-size: 12px;
  color: #333;
  position: absolute;
  display: block;
  padding: 2px;
  line-height: 1;
}
.gauge-labels .low {
  text-align: left;
  color: green;
  bottom: 0;
  left: 0;
}
.gauge-labels .medium {
  text-align: center;
  color: orange;
  width: 100%;
}
.gauge-labels .high {
  text-align: right;
  color: red;
  right: 0;
  bottom: 0;
}
.gauge-labels .poor {
  bottom: 0;
  left: 0;
  color: red;
}
.gauge-labels .average {
  color: #999900;
}
.gauge-labels .good {
  right: 0;
  color: #228B22;
}
.gauge-labels .excellent {
  right: 0;
  bottom: 0;
  color: green;
}
      </style>
    </head>

    <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

    <body class="light">
      <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
      <input type="hidden" class="selectedvalue">
      <input type="hidden" class="selectedname">
      <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
         <div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>

	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>

      <div class="modal fade threshold_description_popup" tabindex="-1" role="dialog"
        aria-labelledby="myThresholdModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg"
          style="margin-left: 75.5%;margin-top: -77px;margin-right: 20px;width: 25.5%;">
          <div class="modal-content" id="threshold_desc" style="height: 250px; width:80%;
            ">
            <div class="modal-header">
              <h4>Threshold Details</h4>
              <button type="button" class="close pull-right" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <form id="objectiveForm">

                <div class="col-md-4 mb-4 color_picks_one color_picks_two color_picks_three color_picks_five">
                  <div class="input-group">
                    <input id="optioncolor1" type="text" value="69" class="form-control browser-default colorvalueedit"
                      autocomplete="off" />
                    <div class="input-group-append">
                      <span class="input-group-text pickr optioncolor1" role="button"
                        aria-label="toggle color picker dialog" style="background-color: rgb(255 0 0);"></span>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 mb-4 color_picks_two color_picks_three color_picks_five">
                  <div class="input-group">
                    <input id="optioncolor2" type="text" value="70" class="form-control browser-default colorvalueedit"
                      autocomplete="off" />
                    <div class="input-group-append">
                      <span class="input-group-text pickr optioncolor2" role="button"
                        aria-label="toggle color picker dialog" style="background-color: #FF4B3E;"></span>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 mb-4 color_picks_three color_picks_five">
                  <div class="input-group">
                    <input id="optioncolor3" type="text" value="85" class="form-control browser-default colorvalueedit"
                      autocomplete="off" />
                    <div class="input-group-append">
                      <span class="input-group-text pickr optioncolor3" role="button"
                        aria-label="toggle color picker dialog" style="background-color: #FFC107;"></span>
                    </div>
                  </div>
                </div>

                <div style="margin-left: 50%; margin-top: -147px;">
                  <div class="col-md-4 mb-4 color_picks_five">
                    <div class="input-group">
                      <input id="optioncolor4" type="text" value="100"
                        class="form-control browser-default colorvalueedit" autocomplete="off" />
                      <div class="input-group-append">
                        <span class="input-group-text pickr optioncolor4" role="button"
                          aria-label="toggle color picker dialog" style="background-color: #5FCD5F;"></span>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4 mb-4 color_picks_five">
                    <div class="input-group">
                      <input id="optioncolor5" type="text" value="115"
                        class="form-control browser-default colorvalueedit" autocomplete="off" />
                      <div class="input-group-append">
                        <span class="input-group-text pickr optioncolor5" role="button"
                          aria-label="toggle color picker dialog" style="background-color: #027D02;"></span>
                      </div>
                    </div>
                  </div>
                </div>

            </div>
            </form>
          </div>

          <hr />

        </div>
      </div>
      </div>

      <!--Scorecard Popup Start -->
      <div class="modal fade scorecard_description_popup" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content" id="scorecard_desc" style="height: 530px; width: 85%;">
            <div class="modal-header">
              <h4>Strategy Map Settings</h4>
              <button type="button" class="close pull-right" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <form id="objectiveForm">
                <!--Scorecard Details Start -->
                <div class="form-group col-md-6">
                  <label for="owner" data-i18n="Scorecard">Scorecard</label>
                  <select class="form-control" id="owner">
                    <option value="select">Select</option>
                  </select>
                </div>
                <div style="margin-left: 15px; margin-top: 30px;">
                  <div class="toggle-container">
                    <label for="toggle1" style="font-weight: normal;">Status</label>
                    <div style="margin-left: 234px; margin-top: 2px;">
                      <input type="checkbox" id="toggle1" data-setting-key="status" checked>
                      <label for="toggle1" class="checkbutton"></label>
                    </div>
                  </div>
                  <div class="toggle-container">
                    <label for="toggle2" style="font-weight: normal;">KPI</label>
                    <div style="margin-left: 262px;">
                      <input type="checkbox" id="toggle2" data-setting-key="kpi" checked>
                      <label for="toggle2" class="checkbutton"></label>
                    </div>
                  </div>
                  <div class="toggle-container">
                    <label for="toggle3" style="font-weight: normal;" data-i18n='Objective'>Objective</label>
                    <div style="margin-left: 208px;">
                      <input type="checkbox" id="toggle3" data-setting-key="objective" checked>
                      <label for="toggle3" class="checkbutton"></label>
                    </div>
                  </div>
                  <div class="toggle-container">
                    <label for="toggle4" style="font-weight: normal;">Perspective</label>
                    <div style="margin-left: 191px;">
                      <input type="checkbox" id="toggle4" data-setting-key="perspective" checked>
                      <label for="toggle4" class="checkbutton"></label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <div class="form-line right" style="position: absolute; top: -75px; margin-left: 450px;">
                  <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"  data-i18n="Cancel">Cancel</button>
                  <button type="button" class="initative_save_btn" data-dismiss="modal" aria-label="Close" value="Save"
                    id="save_button" data-i18n="Save">Save</button>
                </div>
              </div>
            </div>
            <hr />
            <div class="modal-footer">
              <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11" style="margin-top: -65px;">
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
            <!--Scorecard Details End -->

          </div>
        </div>
      </div>

        <main>
    <section id="heroSection1" class="py-3 hero-section theme-default"
      style="background: url(/stratroom/images/strategy-map-01.jpg) right top no-repeat;background-size: cover;">
      <div class="blur-overlay"></div>
      <div class="container-lg">
        <div class="page-header grid gap-2 pb-1">
          <div class="g-col-8 d-flex align-items-center">
            <h4 class="title text-white">
              <span class="icon">
                <img src="/stratroom/images/meetings-i.svg" alt="meetings" title="meetings">
              </span>
              Strategy Map
            </h4>
          </div>
 <div class="load-page page-actions g-col-4">
  <div class="page-icons">
            <ul>
            
            
              <!-- <li>
                <a href="javascript:;" id="popoverFilterComplianceCategory" class="btn btn-sm btn-icon" >
                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" title="Compliance Category">
 <img src="/stratroom/images/filter-i.svg" width="12" height="12" alt="Filter" > 
                    </span>
                 
                </a>
              </li> -->
              
            </ul>
          </div>
       
  <!-- <div class="form-group">
    <select id="department_selectdw" class="dept_select form-select form-select-sm">
     <option value="">Select Department</option>
    </select>
  </div> -->

  <div class="form-group" style="width : 100% !important">
    <select id="department_selectdw" class="dept_select form-select form-select-sm" style="width: 100%;">
      <option value="">Select Department</option>
    </select>
  </div>

           <!-- <div class="form-group">
    <select id="page_selectdw" class="page_selectdw form-select form-select-sm">
     <option value="">Select Page</option>
    </select>
  </div>             -->

   <!-- <div class="form-group">
    <select id="page_selectdw" class="page_selectdw form-select form-select-sm" style="width: 100%;">
     <option value="">Select Page</option>
    </select>
  </div>             -->

  <div class="form-group" style="width : 100% !important">
    <select id="page_selectdw" class="form-select form-select-sm" style="width: 100%;">
      <option value="">Select Page</option>
    </select>
  </div>

                </div>
        </div>
      </div>
         <div class="scorecardTable">
         </div>

    </section>

  </main>
  	    <footer class="col-12 text-center py-2 copyright">
        <p data-translate="footer.copyright" class="mb-0">Copyright &copy; <span id="year"></span>
            <strong>StratRoom</strong>
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
      <script src="${contextroot}/js/paging.js"></script>
      <script src="${contextroot}/js/jquery.editable.min.js"></script>
      <script src="${contextroot}/js/handlebars.js"></script>
      <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
      <script src="${contextroot}/js/daterangepicker.min.js"></script>
      <script src="${contextroot}/js/amcharts.js"></script>
      <script src="${contextroot}/js/jquery-ui.min.js"></script>
      <script src="${contextroot}/js/moment.js"></script>
      <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
      <script src="${contextroot}/js/pickr.es5.min.js"></script>
      <script src="${contextroot}/js/datepickerair.js"></script>
      <script src="${contextroot}/js/datepicker.en.js"></script>
      <!-- <script src="${contextroot}/js/widgets.js"></script> -->
      <script src="${contextroot}/js/initial.js"></script>
      <script src="${contextroot}/js/notify.js"></script>
      <!-- <script src="${contextroot}/js/apexcharts.js"></script> -->
      <script src="${contextroot}/js/select2.min.js"></script>
      <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
      <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      <!-- <script src="${contextroot}/js/strategy.js"></script> -->

      <script>

        var departmentValue = ""

        // $(document).ready(function () {
        //   $('#toggle1').is(':checked')
        // });

        $("#timepicker_pop").timepicker();

        $("#open_search").click(function () {
          $(".nav-search").show();
          $("#open_search").hide();
        });

        $("#close_search").click(function () {
          $("#open_search").show();
          $(".nav-search").hide();
        });

        $("body").tooltip({
          selector: ".remove-notes, .remove-action",
        });



        var checkscurlornot = $("#checkscurlornot").val();
        var empId = $("#userPrincipal").val();

        $(document).ready(function () {

          var currentEmp = $("#userPrincipal").val();
          var pageNo = $('#pagenumber').val();


          getpagenameView();

          if ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin") {
            if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
              //$(".subusermenuname").text('Audit Trail');
              if ($(".topmenubreadcrumb").length) {
                $(".topmenubreadcrumb").show();
              }
              if ($(".sidebarNavigate").length) {
                $(".sidebarNavigate").show();
              }
            }
          }

          function getpagenameView() {
            $.ajax({
              type: "GET",
              url: "/stratroom/pages/" + pageNo,
              async: false,
              success: function (data) {
                if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
                  $("." + data.id).addClass("homepageHighlight");
                }

                if ($(".superusertopmenu").hasClass(data.id)) {
                  $(".subusermenuname").text(data.pageName);
                }
              }
            });
          }
          loadOwners();
          fetchStrategyMap(null);

          $("#save_button").click(function () {
            var settings = {};
            $('input[type="checkbox"][data-setting-key]').each(function () {
              var key = $(this).data('setting-key');
              var value = $(this).is(':checked');
              settings[key] = value;
            });

            var pageNo = $('#pagenumber').val();
            var strategyMapName = $("#owner option:selected").text(); // Get the selected scorecard name

            var scoreCardDetailsId = $("#owner option:selected").val(); // Get the selected scorecard name

            var strategyMapDto = {
              id: 0, // Use the appropriate ID or retrieve dynamically
              strategyMapName: strategyMapName, // Replace with dynamic value
              scorecardPageId: scoreCardDetailsId, // Replace with dynamic value
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              setting: settings,
              pageId: pageNo, // Replace with dynamic value

            };

            $.ajax({
              type: "POST",
              url: "/stratroom/saveStrategy",
              contentType: "application/json",
              data: JSON.stringify(strategyMapDto),
              success: function (response) {
                alert("Strategy Map saved successfully!");
                location.reload(true);
              },
              error: function (error) {
                alert("Error saving Strategy Map: " + error.responseText);
                location.reload(true);
              }
            });
            console.log(strategyMapDto, "strategyMapDto")
          });
          $("#scorecardID").change(function () {
            var selectedValue = $(this).val();
            $("#selectedValue").text(selectedValue);
          });

          function loadOwners() {
            $.ajax({
              type: "GET",
              url: "/stratroom/pageDeptList/dept?pageType=Scorecard",
              success: function (data) {
                $('#owner').empty();
                $('#owner').append('<option value="select">Select</option>');
                $.each(data, function (index, module) {
                  $('#owner').append($('<option>', {
                    value: module.id,
                    text: module.pageName
                  }));
                });
              }
            });
          }

          // const departmentSelect = document.getElementById('department_selectdw');
          // const pageSelect = document.getElementById('page_selectdw');

          // function getDepartment() {
          //   $.ajax({
          //     type: "GET",
          //     url: "/stratroom/departmentReportees",
          //     async: false,
          //     success: function (data) {
          //       $.each(data, function (index, module) {
          //         const option = document.createElement('option');
          //         option.value = module.id;
          //         option.textContent = module.name;
          //         departmentSelect.appendChild(option);
          //       });
          //     }
          //   });
          // }

//           function getDepartment() {
//   $.ajax({
//     type: "GET",
//     url: "/stratroom/departmentReportees",
//     async: false,
//     success: function (data) {
//       // clear old options except the first one
//       $('#department_selectdw').find('option:not(:first)').remove();

//       $.each(data, function (index, module) {
//         const option = document.createElement('option');
//         option.value = module.id;
//         option.textContent = module.name;
//         departmentSelect.appendChild(option);
//       });

//       // initialize searchable dropdown
//       $('#department_selectdw').select2({
//         placeholder: "Select Department",
//         // allowClear: true,
//         width: 'resolve'
//       });
//     }
//   });
// }

//           departmentSelect.addEventListener('change', function () {
//             selectedDepartment = this.value;
//             departmentValue = this.value;
//             if (selectedDepartment) {
//               loadPages(selectedDepartment);
//             } else {
//               pageSelect.innerHTML = '<option value="">Select a Page</option>'; // Reset pages dropdown
//             }
//           });


const departmentSelect = document.getElementById('department_selectdw');
const pageSelect = document.getElementById('page_selectdw');

function getDepartment() {
  $.ajax({
    type: "GET",
    url: "/stratroom/departmentReportees",
    async: false,
    success: function (data) {
      // clear old options except the first one
      $('#department_selectdw').find('option:not(:first)').remove();

      $.each(data, function (index, module) {
        const option = document.createElement('option');
        option.value = module.id;
        option.textContent = module.name;
        departmentSelect.appendChild(option);
      });

      // Initialize Select2 only once
      if (!$('#department_selectdw').hasClass("select2-hidden-accessible")) {
        $('#department_selectdw').select2({
          placeholder: "Select Department",
          width: 'resolve'
        });
      } else {
       
        $('#department_selectdw').trigger('change.select2');
      }

       if (!$('#page_selectdw').hasClass("select2-hidden-accessible")) {
        $('#page_selectdw').select2({
          placeholder: "Select",
          width: 'resolve'
        });
      } else {
       
        $('#page_selectdw').trigger('change.select2');
      }
    }
  });
}

// ✅ Bind change event using jQuery (Select2-compatible way)
$('#department_selectdw').on('change', function () {
  const selectedDepartment = $(this).val();
  departmentValue = selectedDepartment;

  if (selectedDepartment) {
    loadPages(selectedDepartment);
  } else {
    pageSelect.innerHTML = '<option value="">Select a Page</option>';
  }
});

          // pageSelect.addEventListener('change', function () {
          //   selectedpage = this.value;
          //   if (selectedpage) {
          //     fetchStrategyMap(selectedpage);
          //     const selectedPageName = pageSelect.options[pageSelect.selectedIndex].textContent;

          //     // Update the page title
          //     document.getElementById('scorecardtitle').textContent = selectedPageName;
          //     $(".scorecardname").text(selectedPageName);
          //     $('#scorecardtitle').text(selectedPageName);

          //     var scorecardhtmlcontent	=	selectedPageName+`<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
	        // 	$(".pageTitleStatus").html(scorecardhtmlcontent);


          //   }
          // });


          // jQuery-based, Select2-compatible change handler
$('#page_selectdw').on('change', function () {
  const selectedpage = $(this).val();

  if (selectedpage) {
    fetchStrategyMap(selectedpage);

    let selectedPageName = $(this).find('option:selected').text();
    if ((!selectedPageName || selectedPageName.trim() === '') && $(this).data('select2')) {
      const data = $(this).select2('data');
      if (data && data.length > 0 && data[0].text) {
        selectedPageName = data[0].text;
      }
    }

    // Update title and UI
    if (selectedPageName) {
      $('#scorecardtitle, .scorecardname').text(selectedPageName);
      const scorecardhtmlcontent =
        `${selectedPageName}<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
      $(".pageTitleStatus").html(scorecardhtmlcontent);
    }
  } else {
    $('#scorecardtitle, .scorecardname').text('');
    $(".pageTitleStatus").empty();
  }
});


$('#page_selectdw').on('select2:select', function (e) {
  $(this).select2('close'); 
});



          

          

          $(document).ready(function () {
            $('#toggle1').on('change', function () {
              if (!this.checked) {
                $('.kpi_flag').hide();
                $('.objective_flag').hide();
                $('.prespective_flag').hide();
              } else {
                $('.kpi_flag').show();
                $('.objective_flag').show();
                $('.prespective_flag').show();
              }
            });
            $('#toggle2').on('change', function () {
              if (!this.checked) {
                $('.kpi_flag').hide();
              } else {
                $('.kpi_flag').show();
              }
            });
            $('#toggle3').on('change', function () {
              if (!this.checked) {
                $('.objective_flag').hide();
              } else {
                $('.objective_flag').show();
              }
            });
            $('#toggle4').on('change', function () {
              if (!this.checked) {
                $('.prespective_flag').hide();
              } else {
                $('.prespective_flag').show();
              }
            });

            if ($('#toggle2').is(':checked', false)) {
              $('.kpi_flag').hide();
            }
            if ($('#toggle3').is(':checked', false)) {
              $('.objective_flag').hide();
            }
            if ($('#toggle4').is(':checked', false)) {
              $('.prespective_flag').hide();
            }

            fetchStrategyMap();
          });

function fetchStrategyMap(selectedpage) {
  console.log(selectedpage, "selectedPage");
  var pageno = selectedpage;
  var datePeriod = $('#datePeriod').val();
  datePeriod = datePeriod.replace(/\s+/g, '');

  if (pageno == null) {
    pageno = $('#pagenumber').val();
  }

  var pageUrl = "";
  // if (pageno != undefined) {
  //   pageUrl = "/stratroom/scoreCardList?pageId=" + pageno + "&dateRange=" + datePeriod;
  // }

  if (pageno != undefined) {
    pageUrl = "/stratroom/Strategy/"+ pageno + "?dateRange=" + datePeriod;
  }

  $.ajax({
    type: "GET",
    url: pageUrl,
    success: function (data) {
      console.log(data, "data");

      var $container = $('.scorecardTable');
      $container.empty();

      $container.find('.gauge-wrapper').each(function() {
        var chartEl = this.querySelector("[data-chart]");
        if (chartEl && chartEl.__apexcharts) {
          chartEl.__apexcharts.destroy();
        }
      });

      data.forEach(function(scorecard) {
        var scorecardName = scorecard.scoreCardValue.name;
        var scorecardStatusIconClass = scorecard.scoreCardValue.statusLightFlagvalue;
        var scorecardColor = scorecard.scoreCardValue.statusLightFlag;
        var scorecardStatusLight = '<i class="' + scorecardStatusIconClass + ' prespective_flag" style="font-size: 10px; margin-left: 15px; color: ' + scorecardColor + ';"></i>';

        var statusLight = scorecard.scoreCardValue.statusLight ? scorecard.scoreCardValue.statusLight.toUpperCase() : "RED";
        // var statusLight = "GREEN"
        var gaugeValue = 'transform: translateX(-50%) rotate(-90deg);';

        console.log(statusLight, "statusLight"); 

        if (statusLight == "RED") {
          gaugeValue = 'transform: translateX(-50%) rotate(-90deg);';
        } else if (statusLight == "YELLOW") {
          gaugeValue = 'transform: translateX(-50%) rotate(-20deg);';
        } else if (statusLight == "GREEN") {
          gaugeValue = 'transform: translateX(-50%) rotate(90deg);';
        }

        var objectiveList = scorecard.objectiveList || [];

        var objectiveRows = '';
        for (var i = 0; i < objectiveList.length; i++) {
          var obj = objectiveList[i];
          var objectiveName = obj.objectivesName || 'N/A';
          var objstatus = obj.objectivesValue && obj.objectivesValue.statusLight ? obj.objectivesValue.statusLight.split(" ")[0].toLowerCase() : 'red';
          var objScore = obj.objectivesValue && obj.objectivesValue.score != null ? obj.objectivesValue.score : 'N/A';
          var objActual = obj.objectivesValue && obj.objectivesValue.actual != null ? obj.objectivesValue.actual : 'N/A';
          var objTarget = obj.objectivesValue && obj.objectivesValue.target != null ? obj.objectivesValue.target : 'N/A';

          console.log(objstatus, "objstatus");

          var objectiveStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg" width="12" height="12">';
          var trendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png" width="12" height="12" alt="trend">';

          if (objstatus == "red") {
            objectiveStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg" width="12" height="12">';
            trendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png" width="12" height="12" alt="trend">';
          } else if (objstatus == "yellow") {
            objectiveStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg" width="12" height="12">';
            trendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png" width="12" height="12" alt="trend">';
          } else if (objstatus == "green") {
            objectiveStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg" width="12" height="12">';
            trendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png" width="12" height="12" alt="trend">';
          } else {
            objectiveStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg" width="12" height="12">';
            trendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png" width="12" height="12" alt="trend">';
          }

          objectiveRows +=
            '<tr>' +
              '<td class="objective-name-cell" data-full-name="' + (objectiveName || '').replace(/"/g, '&quot;') + '">' + objectiveName + '</td>' +
              '<td class="text-center align-middle">' + objectiveStatus + '</td>' +
            '</tr>';
        }

        if (objectiveRows == '') {
          objectiveRows = '<tr><td colspan="6" class="text-muted text-center">No objectives found</td></tr>';
        }

        var kpiRows = '';
        for (var i = 0; i < objectiveList.length; i++) {
          var kpiList = objectiveList[i].kpiList || [];
          for (var j = 0; j < kpiList.length; j++) {
            var kpi = kpiList[j];
            var kpiName = kpi.kpiName || 'N/A';
            var kpitatus = kpi.kpiValue && kpi.kpiValue.statusLight ? kpi.kpiValue.statusLight.split(" ")[0].toLowerCase() : 'red';
            var kpiScore = kpi.kpiValue && kpi.kpiValue.score != null ? kpi.kpiValue.score : 'N/A';
            var kpiActual = kpi.kpiValue && kpi.kpiValue.actual != null ? kpi.kpiValue.actual : 'N/A';
            var kpiTarget = kpi.kpiValue && kpi.kpiValue.target != null ? kpi.kpiValue.target : 'N/A';
            var kpiTrendValue = kpi.kpiValue && kpi.kpiValue.trend != null ? kpi.kpiValue.trend : 'N/A';
            console.log(kpitatus, "kpitatus");

            var kpiValStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg" width="12" height="12">';
            var kpitrendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png" width="12" height="12" alt="trend">';
            if(kpiTrendValue == "fas fa-arrow-up"){
               kpitrendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png" width="12" height="12" alt="trend">';
            }else if(kpiTrendValue == "fas fa-arrow-down"){
               kpitrendStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png" width="12" height="12" alt="trend">';
            }else {
               kpitrendStatus = "N/A";
            }
            if (kpitatus == "red") {
              kpiValStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg" width="12" height="12">';
             
            } else if (kpitatus == "yellow") {
              kpiValStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg" width="12" height="12">';
             
            } else if (kpitatus == "green") {
              kpiValStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg" width="12" height="12">';
             
            } else {
              kpiValStatus = '<img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg" width="12" height="12">';
             
            }

            kpiRows +=
              '<tr>' +
                '<td class="kpi-name-cell" data-full-name="' + (kpiName || '').replace(/"/g, '&quot;') + '">' + kpiName + '</td>' +
                '<td class="text-center align-middle">' + kpiValStatus + '</td>' +
               
                '<td class="text-center align-middle">' + kpitrendStatus + '</td>' +
                '<td class="text-center align-middle">' + kpiActual + '</td>' +
                '<td class="text-center align-middle">' + kpiTarget + '</td>' +
              '</tr>';
          }
        }

        if (kpiRows == '') {
          kpiRows = '<tr><td colspan="6" class="text-muted text-center">No KPIs found</td></tr>';
        }

        var objectiveTableId = 'objectiveTable_' + Math.random().toString(36).substr(2, 9);
        var kpiTableId = 'kpiTable_' + Math.random().toString(36).substr(2, 9);

        var html = '';
        html += '<div class="container-lg py-2">';
        html +=   '<div class="row g-4 strategyRow">';

        // Perspective Card
        html +=     '<div class="col-md-3 col-12">';
        html +=       '<div class="card border-0 h-100 c1">';
        html +=         '<div class="card-header bg-transparent border-0 pb-0">';
        html +=           '<h6 class="card-title fs-6 font-weight-medium mb-0">Perspectives</h6>';
        html +=           '<p class="small text-muted mb-0">What are our key focus areas?</p>';
        html +=         '</div>';
        html +=         '<div class="card-body d-flex flex-column">';
        html +=           '<div class="gauge-wrapper" data-id="g1">';
        html +=             '<div class="gauge" data-chart></div>';
        html +=             '<div class="needle" data-needle style="'+gaugeValue+'"></div>';
        html +=             '<div class="needle-circle"></div>';
        html +=             '<input hidden type="range" class="speedSlider" min="0" max="100" value="' + gaugeValue + '">';
        html +=             '<div class="gauge-labels"></div>';
        html +=           '</div>';
        html +=           '<div class="d-flex gap-2 align-items-center justify-content-between bg-primary rounded-pill text-white px-4 ps-1 py-1 mt-3">';
        html +=             '<img src="/stratroom/images/finance-w.svg" width="42" height="42" alt="Finance">';
        html +=             '<h6 class="fs-6 mb-0 text-uppercase">' + scorecardName + '</h6>';
        html +=           '</div>';
        html +=         '</div>';
        html +=       '</div>';
        html +=     '</div>';

        // Objectives Table
        html +=     '<div class="col-md-4 col-12">';
        html +=       '<div class="card border-0 h-100">';
        html +=         '<div class="card-header bg-transparent border-0 pb-0">';
        html +=           '<h6 class="card-title fs-6 font-weight-medium mb-0">Strategic Objectives</h6>';
        html +=           '<p class="small text-muted mb-0">What are our strategic objectives?</p>';
        html +=         '</div>';
        html +=         '<div class="card-body">';
        html +=           '<div class="">';
        html +=             '<table id="' + objectiveTableId + '" class="table table-sm table-striped table-bordered mb-0 small">';
        html +=               '<thead><tr>' +
                                '<th>Name</th>' +
                                '<th class="text-center" style="width:60px;">Status</th>' +
                              
                              '</tr></thead>';
        html +=               '<tbody>' + objectiveRows + '</tbody>';
        html +=             '</table>';
        html +=           '</div>';
        html +=         '</div>';
        html +=       '</div>';
        html +=     '</div>';

        // // KPIs Table
        // html +=     '<div class="col-md-5 col-12">';
        // html +=       '<div class="card border-0 h-100">';
        // html +=         '<div class="card-header bg-transparent border-0 pb-0">';
        // html +=           '<h6 class="card-title fs-6 font-weight-medium mb-0">KPIs</h6>';
        // html +=           '<p class="small text-muted mb-0">How do we measure progress?</p>';
        // html +=         '</div>';
        // html +=         '<div class="card-body">';
        // html +=           '<div class="">';
        // html +=             '<table id="' + kpiTableId + '" class="table table-sm table-striped table-bordered mb-0 small">';
        // html +=               '<thead><tr>' +
        //                         '<th>Name</th>' +
        //                         '<th class="text-center" style="width:60px;">Status</th>' +
                              
        //                         '<th class="text-center" style="width:60px;">Trend</th>' +
        //                         '<th class="text-center" style="width:80px;">Actual</th>' +
        //                         '<th class="text-center" style="width:80px;">Target</th>' +
        //                       '</tr></thead>';
        // html +=               '<tbody>' + kpiRows + '</tbody>';
        // html +=             '</table>';
        // html +=           '</div>';
        // html +=         '</div>';
        // html +=       '</div>';
        // html +=     '</div>';

        // html +=   '</div>';
        // html += '</div>';

        // KPIs Table
html += '<div class="col-md-5 col-12">';
html +=   '<div class="card border-0 h-100">';
html +=     '<div class="card-header bg-transparent border-0 pb-0">';
html +=       '<h6 class="card-title fs-6 font-weight-medium mb-0">KPIs</h6>';
html +=       '<p class="small text-muted mb-0">How do we measure progress?</p>';
html +=     '</div>';
html +=     '<div class="card-body">';
html +=       '<div class="table-responsive">';   
html +=         '<table id="' + kpiTableId + '" class="table table-sm table-striped table-bordered mb-0 small">';
html +=           '<thead><tr>' +
                    '<th>Name</th>' +
                    '<th class="text-center" style="width:60px;">Status</th>' +
                    '<th class="text-center" style="width:60px;">Trend</th>' +
                    '<th class="text-center" style="width:80px;">Actual</th>' +
                    '<th clasrepos="text-center" style="width:80px;">Target</th>' +
                  '</tr></thead>';
html +=           '<tbody>' + kpiRows + '</tbody>';
html +=         '</table>';
html +=       '</div>';  
html +=     '</div>';
html +=   '</div>';
html += '</div>';

html += '</div>';
html += '</div>';


        $container.append(html);
      });

      // Initialize Gauges
      $container.find('.gauge-wrapper').each(function() {
        var wrapper = this;
        var chartEl = wrapper.querySelector("[data-chart]");
        var needleEl = wrapper.querySelector("[data-needle]");
        var slider = wrapper.querySelector(".speedSlider");
        var defaultValue = parseInt(slider.value);
        var gaugeLabels = wrapper.querySelector(".gauge-labels");

        if (gaugeLabels) {
          gaugeLabels.innerHTML = 
            '<span class="label poor">Poor</span>' +
            '<span class="label average">Average</span>' +
            '<span class="label good">Good</span>' +
            '<span class="label excellent">Excellent</span>';
        }

        var options = {
          chart: {
            type: 'radialBar',
            height: 120,
            width: 120,
            sparkline: { enabled: true },
            offsetY: 0,
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "rgba(238, 238, 238, 0.8)",
                strokeWidth: '100%',
              },
              dataLabels: {
                show: false
              },
              hollow: {
                size: '60%',
              }
            }
          },
          series: [100],
          labels: ['Risk'],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: "horizontal",
              gradientToColors: ['#00FF00'],
              stops: [0, 50, 100],
              colorStops: [
                { offset: 0, color: "#FF0000", opacity: 0.9 },
                { offset: 33, color: "#FFFF00", opacity: 0.9 },
                { offset: 66, color: "#00DD44", opacity: 0.9 },
                { offset: 100, color: "#008000", opacity: 0.9 },
              ]
            }
          },
          stroke: {
            lineCap: "round",
            width: 8
          }
        };

        var chart = new ApexCharts(chartEl, options);
        chart.render();

        var updateGauge = function(val) {
          var value = parseInt(val);
          slider.value = value;
          var angle = -90 + (value * 180 / 100);
          // needleEl.style.transform = "translateX(-50%) rotate(" + angle + "deg)";
        };

        updateGauge(defaultValue);

        slider.addEventListener('input', function(e) {
          updateGauge(e.target.value);
        });

        wrapper.updateGauge = updateGauge;
      });

      // Initialize DataTables
      setTimeout(function() {
        $container.find('table[id^="objectiveTable_"]').each(function() {
          if (!$.fn.DataTable.isDataTable(this)) {
            $(this).DataTable({
              pageLength: 4,
              lengthChange: false,
              paging: true,
              searching: false,
              ordering: false,
              info: false,
              responsive: false,
              language: {
                paginate: {
                  previous: "<i class='fa fa-chevron-left'></i>",
                  next: "<i class='fa fa-chevron-right'></i>"
                }
              },
              drawCallback: function () {
                $('.dataTables_paginate').addClass('d-flex justify-content-end dataTables_paginate_sm');
                $('.dataTables_paginate ul.pagination').addClass('pagination-sm');
              }
            });
          }
        });

        $container.find('table[id^="kpiTable_"]').each(function() {
          if (!$.fn.DataTable.isDataTable(this)) {
            $(this).DataTable({
              pageLength: 4,
              lengthChange: false,
              paging: true,
              searching: false,
              ordering: false,
              info: false,
              responsive: false,
              language: {
                paginate: {
                  previous: "<i class='fa fa-chevron-left'></i>",
                  next: "<i class='fa fa-chevron-right'></i>"
                }
              },
              drawCallback: function () {
                $('.dataTables_paginate').addClass('d-flex justify-content-end dataTables_paginate_sm');
                $('.dataTables_paginate ul.pagination').addClass('pagination-sm');
              }
            });
          }
        });
      }, 10);

      $(window).trigger('resize');
    },
    error: function (xhr, status, error) {
      console.error("Failed to load strategy map:", error);
      $('.scorecardTable').append(
        '<div class="alert alert-danger text-center">Error loading data.</div>'
      );
    }
  });
}


          // function loadPages(departmentId) {
          //   for (let i = pageSelect.options.length - 1; i > 0; i--) {
          //     pageSelect.remove(i);
          //   }
          //   $.ajax({
          //     type: "GET",
          //     // url: "/stratroom/pageDeptList/" + departmentId + "?pageType=Strategymap",
          //      url: "/stratroom/pageDeptList/" + departmentId + "?pageType=scorecard",
          //     async: false,
          //     success: function (data) {
          //       $.each(data, function (index, module) {
          //         const option = document.createElement('option');
          //         option.value = module.id;
          //         option.textContent = module.pageName;
          //         pageSelect.appendChild(option);
          //       });
          //     }
          //   });
          // }

//           function loadPages(departmentId) {
//   // Clear old options except the first one
//   $('#page_selectdw').find('option:not(:first)').remove();

//   $.ajax({
//     type: "GET",
//     // url: "/stratroom/pageDeptList/" + departmentId + "?pageType=Strategymap",
//     url: "/stratroom/pageDeptList/" + departmentId + "?pageType=scorecard",
//     async: false,
//     success: function (data) {
//       $.each(data, function (index, module) {
//         const option = document.createElement('option');
//         option.value = module.id;
//         option.textContent = module.pageName;
//         pageSelect.appendChild(option);
//       });

//       // Initialize Select2 (only once)
//       if (!$('#page_selectdw').hasClass("select2-hidden-accessible")) {
//         $('#page_selectdw').select2({
//           placeholder: "Select Page",
//           width: 'resolve'
//         });
//       } else {
//         // Refresh existing Select2 dropdown
//         $('#page_selectdw').trigger('change.select2');
//       }
//     }
//   });
// }

function loadPages(departmentId) {
  // Clear old options except the first one
  $('#page_selectdw').find('option:not(:first)').remove();

  $.ajax({
    type: "GET",
    url: "/stratroom/pageDeptList/" + departmentId + "?pageType=scorecard",
    async: false,
    success: function (data) {
      $.each(data, function (index, module) {
        const option = document.createElement('option');
        option.value = module.id;
        option.textContent = module.pageName;
        pageSelect.appendChild(option);
      });

      // ✅ Initialize Select2 only once
      if (!$('#page_selectdw').hasClass("select2-hidden-accessible")) {
        $('#page_selectdw').select2({
          placeholder: "Select Page",
          width: 'resolve'
        });
      } else {
        // ✅ Just refresh data, don’t re-init
        $('#page_selectdw').trigger('change.select2');
      }
    }
  });
}



          getDepartment();
        });


        function performancecolorpanelTrigger(current_color1, current_color2, current_color3, current_color4, current_color5) {

          const pickr1 = new Pickr({
            el: $("#scorecardsettingscontrol .perfor_sow .optioncolor1")[0],
            useAsButton: true,
            theme: 'classic',
            default: current_color1,
            defaultRepresentation: 'HEX',
            comparison: false,
            swatches: [
              'rgba(244, 67, 54, 1)',
              'rgba(233, 30, 99, 0.95)',
              'rgba(156, 39, 176, 0.9)',
              'rgba(103, 58, 183, 0.85)',
              'rgba(63, 81, 181, 0.8)',
              'rgba(33, 150, 243, 0.75)',
              'rgba(3, 169, 244, 0.7)',
              'rgba(0, 188, 212, 0.7)',
              'rgba(0, 150, 136, 0.75)',
              'rgba(76, 175, 80, 0.8)',
              'rgba(139, 195, 74, 0.85)',
              'rgba(205, 220, 57, 0.9)',
              'rgba(255, 235, 59, 0.95)',
              'rgba(255, 193, 7, 1)'
            ],

            components: {
              preview: true,
              opacity: true,
              hue: true,

              interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
              }
            }
          }).on('save', color => {
            $("#scorecardsettingscontrol .perfor_sow .optioncolor1")[0].style.background = color.toRGBA().toString(0);
            console.log("Fetching done1");
            pickr1.hide();
            var value = color.toRGBA().toString(0);
            flag = "threshold1Color";
            flagvalid = true;

            var action = "edit";
            var methodType = "POST";
            var notifiObj = { 'generalSettingValue': {} };
            if (customsettingsresponse != "") {
              notifiObj['generalSettingValue'] = customsettingsresponse;
              notifiObj['generalSettingValue']["threshold1Color"] = value;
            } else {
              notifiObj = customsettingupdateDescription;
              notifiObj['generalSettingValue']["threshold1Color"] = value;
            }

            $.ajax({
              url: "/stratroom/customPerformance",
              type: methodType,
              contentType: "application/json",
              data: JSON.stringify(notifiObj),
              success: function (data, status) {
                $.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
              },
              error: function () {
                $.notify("Failed: Updated Failed", {
                  style: 'error', className: 'graynotify'
                });
              }
            });

          })

          const pickr2 = new Pickr({
            el: $("#scorecardsettingscontrol .perfor_sow .optioncolor2")[0],
            useAsButton: true,
            theme: 'classic',
            default: current_color2,
            defaultRepresentation: 'HEX',
            comparison: false,
            swatches: [
              'rgba(244, 67, 54, 1)',
              'rgba(233, 30, 99, 0.95)',
              'rgba(156, 39, 176, 0.9)',
              'rgba(103, 58, 183, 0.85)',
              'rgba(63, 81, 181, 0.8)',
              'rgba(33, 150, 243, 0.75)',
              'rgba(3, 169, 244, 0.7)',
              'rgba(0, 188, 212, 0.7)',
              'rgba(0, 150, 136, 0.75)',
              'rgba(76, 175, 80, 0.8)',
              'rgba(139, 195, 74, 0.85)',
              'rgba(205, 220, 57, 0.9)',
              'rgba(255, 235, 59, 0.95)',
              'rgba(255, 193, 7, 1)'
            ],

            components: {
              preview: true,
              opacity: true,
              hue: true,

              interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
              }
            }
          }).on('save', color => {
            $("#scorecardsettingscontrol .perfor_sow .optioncolor2")[0].style.background = color.toRGBA().toString(0);
            console.log("Fetching done1");
            pickr2.hide();
            var value = color.toRGBA().toString(0);
            flag = "threshold2Color";
            flagvalid = true;

            var action = "edit";
            var methodType = "POST";
            var notifiObj = { 'generalSettingValue': {} };
            if (customsettingsresponse != "") {
              notifiObj['generalSettingValue'] = customsettingsresponse;
              notifiObj['generalSettingValue']["threshold2Color"] = value;
            } else {
              notifiObj = customsettingupdateDescription;
              notifiObj['generalSettingValue']["threshold2Color"] = value;
            }

            $.ajax({
              url: "/stratroom/customPerformance",
              type: methodType,
              contentType: "application/json",
              data: JSON.stringify(notifiObj),
              success: function (data, status) {
                $.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
              },
              error: function () {
                $.notify("Failed: Updated Failed", {
                  style: 'error', className: 'graynotify'
                });
              }
            });

          })

          const pickr3 = new Pickr({
            el: $("#scorecardsettingscontrol .perfor_sow .optioncolor3")[0],
            useAsButton: true,
            theme: 'classic',
            default: current_color3,
            defaultRepresentation: 'HEX',
            comparison: false,
            swatches: [
              'rgba(244, 67, 54, 1)',
              'rgba(233, 30, 99, 0.95)',
              'rgba(156, 39, 176, 0.9)',
              'rgba(103, 58, 183, 0.85)',
              'rgba(63, 81, 181, 0.8)',
              'rgba(33, 150, 243, 0.75)',
              'rgba(3, 169, 244, 0.7)',
              'rgba(0, 188, 212, 0.7)',
              'rgba(0, 150, 136, 0.75)',
              'rgba(76, 175, 80, 0.8)',
              'rgba(139, 195, 74, 0.85)',
              'rgba(205, 220, 57, 0.9)',
              'rgba(255, 235, 59, 0.95)',
              'rgba(255, 193, 7, 1)'
            ],

            components: {
              preview: true,
              opacity: true,
              hue: true,

              interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
              }
            }
          }).on('save', color => {
            $("#scorecardsettingscontrol .perfor_sow .optioncolor3")[0].style.background = color.toRGBA().toString(0);
            console.log("Fetching done1");
            pickr3.hide();
            var value = color.toRGBA().toString(0);
            flag = "threshold3Color";
            flagvalid = true;

            var action = "edit";
            var methodType = "POST";
            var notifiObj = { 'generalSettingValue': {} };
            if (customsettingsresponse != "") {
              notifiObj['generalSettingValue'] = customsettingsresponse;
              notifiObj['generalSettingValue']["threshold3Color"] = value;
            } else {
              notifiObj = customsettingupdateDescription;
              notifiObj['generalSettingValue']["threshold3Color"] = value;
            }

            $.ajax({
              url: "/stratroom/customPerformance",
              type: methodType,
              contentType: "application/json",
              data: JSON.stringify(notifiObj),
              success: function (data, status) {
                $.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
              },
              error: function () {
                $.notify("Failed: Updated Failed", {
                  style: 'error', className: 'graynotify'
                });
              }
            });

          })



          const pickr4 = new Pickr({
            el: $("#scorecardsettingscontrol .perfor_sow .optioncolor4")[0],
            useAsButton: true,
            theme: 'classic',
            default: current_color4,
            defaultRepresentation: 'HEX',
            comparison: false,
            swatches: [
              'rgba(244, 67, 54, 1)',
              'rgba(233, 30, 99, 0.95)',
              'rgba(156, 39, 176, 0.9)',
              'rgba(103, 58, 183, 0.85)',
              'rgba(63, 81, 181, 0.8)',
              'rgba(33, 150, 243, 0.75)',
              'rgba(3, 169, 244, 0.7)',
              'rgba(0, 188, 212, 0.7)',
              'rgba(0, 150, 136, 0.75)',
              'rgba(76, 175, 80, 0.8)',
              'rgba(139, 195, 74, 0.85)',
              'rgba(205, 220, 57, 0.9)',
              'rgba(255, 235, 59, 0.95)',
              'rgba(255, 193, 7, 1)'
            ],

            components: {
              preview: true,
              opacity: true,
              hue: true,

              interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
              }
            }
          }).on('save', color => {
            $("#scorecardsettingscontrol .perfor_sow .optioncolor4")[0].style.background = color.toRGBA().toString(0);
            console.log("Fetching done1");
            pickr4.hide();
            var value = color.toRGBA().toString(0);
            flag = "threshold4Color";
            flagvalid = true;

            var action = "edit";
            var methodType = "POST";
            var notifiObj = { 'generalSettingValue': {} };
            if (customsettingsresponse != "") {
              notifiObj['generalSettingValue'] = customsettingsresponse;
              notifiObj['generalSettingValue']["threshold4Color"] = value;
            } else {
              notifiObj = customsettingupdateDescription;
              notifiObj['generalSettingValue']["threshold4Color"] = value;
            }

            $.ajax({
              url: "/stratroom/customPerformance",
              type: methodType,
              contentType: "application/json",
              data: JSON.stringify(notifiObj),
              success: function (data, status) {
                $.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
              },
              error: function () {
                $.notify("Failed: Updated Failed", {
                  style: 'error', className: 'graynotify'
                });
              }
            });

          })


          const pickr5 = new Pickr({
            el: $("#scorecardsettingscontrol .perfor_sow .optioncolor5")[0],
            useAsButton: true,
            theme: 'classic',
            default: current_color5,
            defaultRepresentation: 'HEX',
            comparison: false,
            swatches: [
              'rgba(244, 67, 54, 1)',
              'rgba(233, 30, 99, 0.95)',
              'rgba(156, 39, 176, 0.9)',
              'rgba(103, 58, 183, 0.85)',
              'rgba(63, 81, 181, 0.8)',
              'rgba(33, 150, 243, 0.75)',
              'rgba(3, 169, 244, 0.7)',
              'rgba(0, 188, 212, 0.7)',
              'rgba(0, 150, 136, 0.75)',
              'rgba(76, 175, 80, 0.8)',
              'rgba(139, 195, 74, 0.85)',
              'rgba(205, 220, 57, 0.9)',
              'rgba(255, 235, 59, 0.95)',
              'rgba(255, 193, 7, 1)'
            ],

            components: {
              preview: true,
              opacity: true,
              hue: true,

              interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
              }
            }
          }).on('save', color => {
            $("#scorecardsettingscontrol .perfor_sow .optioncolor5")[0].style.background = color.toRGBA().toString(0);
            console.log("Fetching done1");
            pickr5.hide();
            var value = color.toRGBA().toString(0);
            flag = "threshold5Color";
            flagvalid = true;

            var action = "edit";
            var methodType = "POST";
            var notifiObj = { 'generalSettingValue': {} };
            if (customsettingsresponse != "") {
              notifiObj['generalSettingValue'] = customsettingsresponse;
              notifiObj['generalSettingValue']["threshold5Color"] = value;
            } else {
              notifiObj = customsettingupdateDescription;
              notifiObj['generalSettingValue']["threshold5Color"] = value;
            }

            $.ajax({
              url: "/stratroom/customPerformance",
              type: methodType,
              contentType: "application/json",
              data: JSON.stringify(notifiObj),
              success: function (data, status) {
                $.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
              },
              error: function () {
                $.notify("Failed: Updated Failed", {
                  style: 'error', className: 'graynotify'
                });
              }
            });

          })

        }
        var elements = $(".color_picks_05");
        elements.removeClass("col-md-4").addClass("col-md-2");
        $(".color_picks_01").css("display", "none");
        $(".color_picks_02").css("display", "none");
        $(".color_picks_03").css("display", "none");
        $(".color_picks_05").css("display", "block");

        $(".perfor_sow  .input-group-append").find('span.optioncolor1').css('background', "red");
        var colorValue1 = "rgba(255, 0, 0, 1)";

        $(".perfor_sow  .input-group-append").find('span.optioncolor2').css('background', "#FF4B3E");
        var colorValue2 = "rgba(255, 75, 62, 1)";

        $(".perfor_sow  .input-group-append").find('span.optioncolor3').css('background', "yellow");
        var colorValue3 = "rgba(255, 193, 7, 1)";
        $(".perfor_sow  .input-group-append").find('span.optioncolor4').css('background', "#5FCD5F");
        var colorValue4 = "rgb(95, 205, 95)";
        $(".perfor_sow  .input-group-append").find('span.optioncolor5').css('background', "green");
        var colorValue5 = "rgba(2, 125, 2, 1)";


      </script>


  <script>
    $(document).ready(function () {
      $('.table').DataTable({
        pageLength: 4,
        lengthChange: false,
        paging: true,
        searching: false,
        ordering: false,
        info: false,
        responsive: true,
        // scrollX: true,
        scrollY: '108px',
        language: {
          paginate: {
            previous: "<i class='fa fa-chevron-left'></i>",
            next: "<i class='fa fa-chevron-right'></i>"
          }
        },
        drawCallback: function () {
          $('.dataTables_paginate').addClass('d-flex justify-content-end dataTables_paginate_sm');
          $('.dataTables_paginate ul.pagination').addClass('pagination-sm');
        },
      });
    });
  </script>


<script>
  document.querySelectorAll(".gauge-wrapper").forEach((wrapper, index) => {
    console.log(wrapper, "wrapper");
    const chartEl = wrapper.querySelector("[data-chart]");
    const needleEl = wrapper.querySelector("[data-needle]");
    const slider = wrapper.querySelector(".speedSlider");
    const defaultValue = parseInt(slider.value);
    const gaugeLabels = wrapper.querySelector(".gauge-labels");
    console.log(gaugeLabels, "gauge-labels");
             gaugeLabels && (gaugeLabels.innerHTML = `
  <span class="label poor">Poor</span>
  <span class="label average">Average</span>
  <span class="label good">Good</span>
  <span class="label excellent">Excellent</span>
`);

    const options = {
      chart: {
        type: 'radialBar',
        height: 120,
        width: 120,
        sparkline: { enabled: true },
        offsetY: 0,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "rgba(238, 238, 238, 0.8)",
            strokeWidth: '100%',
          },
          dataLabels: {
            show: false
          },
          hollow: {
            size: '60%',
          }
        }
      },
      series: [100], // Always full to show background
      labels: ['Risk'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          gradientToColors: ['#00FF00'],
          stops: [0, 50, 100],
          colorStops: [
            { offset: 0, color: "#FF0000", opacity: 0.9 },
            { offset: 33, color: "#FFFF00", opacity: 0.9 },
            { offset: 66, color: "#00DD44", opacity: 0.9 },
            { offset: 100, color: "#008000", opacity: 0.9 },
            // { offset: 100, color: "#00DD44", opacity: 0.9 }
          ]
        }
      },
      stroke: {
        lineCap: "round",
        width: 8
      }
    };

    const chart = new ApexCharts(chartEl, options);
    chart.render();

    const updateGauge = (val) => {
      const value = parseInt(val);
      slider.value = value;
      const angle = -90 + (value * 180 / 100);
      needleEl.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    };

    // Init with default
    updateGauge(defaultValue);

    // Event listener
    slider.addEventListener('input', (e) => {
      updateGauge(e.target.value);
    });

    // Optional: expose for external trigger
    wrapper.updateGauge = updateGauge;
  });
</script>


<script>
  let complianceCategoryPopover;
  const complianceCategoryPopoverTrigger = document.getElementById('popoverFilterComplianceCategory');

  // Function to get unique perspective names from rendered cards
  function getUniquePerspectives() {
    var perspectives = [];
    var seen = {};
    var rows = document.querySelectorAll('.strategyRow');
    for (var i = 0; i < rows.length; i++) {
      var el = rows[i].querySelector('.fs-6.text-uppercase');
      var name = el ? el.textContent.trim() : '';
      if (name && !seen[name]) {
        seen[name] = true;
        perspectives.push(name);
      }
    }
    return perspectives;
  }

  // Create popover content using STRING CONCATENATION only
  function createComplianceCategoryContent() {
    var contentDiv = document.createElement('div');
    
    var perspectives = getUniquePerspectives();
    if (perspectives.length === 0) {
      // Fallback if no data yet
      perspectives = ["Finance", "Customer", "Internal Process", "Learning and Growth"];
    }

    var checkboxesHtml = '';
    for (var i = 0; i < perspectives.length; i++) {
      var category = perspectives[i];
      var safeId = 'rc-' + category.replace(/\s+/g, '');
      checkboxesHtml +=
        '<div class="form-check">' +
          '<input class="form-check-input filter-compliance" id="' + safeId + '" type="checkbox" value="' + category + '" checked>' +
          '<label class="form-check-label" for="' + safeId + '">' + category + '</label>' +
        '</div>';
    }

    contentDiv.innerHTML =
      '<div>' +
        '<div class="d-flex justify-content-between align-items-center mb-2">' +
          '<h5 class="h6 mb-0">' +
            '<i class="fas fa-filter me-1 text-primary"></i> Filter Compliance Category' +
          '</h5>' +
          '<button type="button" class="btn-close" aria-label="Close"></button>' +
        '</div>' +
        '<div class="d-flex justify-content-between mb-2">' +
          '<button class="btn btn-sm btn-light select-all-compliance">Select All</button>' +
          '<button class="btn btn-sm btn-light deselect-all-compliance">Deselect All</button>' +
        '</div>' +
        '<div class="d-flex flex-column gap-2 pageViewOption" style="max-height: 300px; overflow-y: auto;">' +
          checkboxesHtml +
        '</div>' +
      '</div>';

    return contentDiv;
  }

  // Initialize popover
  complianceCategoryPopover = new bootstrap.Popover(complianceCategoryPopoverTrigger, {
    html: true,
    placement: 'bottom',
    content: createComplianceCategoryContent,
    sanitize: false,
    container: 'body',
    trigger: 'manual'
  });

  // Rebuild content every time popover is shown
  complianceCategoryPopoverTrigger.addEventListener('click', function () {
    // Update content dynamically before showing
    complianceCategoryPopover.setContent({ '.popover-body': createComplianceCategoryContent() });
    complianceCategoryPopover.toggle();
  });

  // Filtering logic
  function filterKpiCardsByCompliance() {
    var checkedInputs = document.querySelectorAll('.filter-compliance:checked');
    var checkedValues = [];
    for (var i = 0; i < checkedInputs.length; i++) {
      checkedValues.push(checkedInputs[i].value);
    }
    var allPerspectives = getUniquePerspectives();
    var showAll = checkedValues.length === allPerspectives.length;

    var rows = document.querySelectorAll('.strategyRow');
    for (var j = 0; j < rows.length; j++) {
      var row = rows[j];
      var perspectiveEl = row.querySelector('.fs-6.text-uppercase');
      var perspectiveName = perspectiveEl ? perspectiveEl.textContent.trim() : '';
      if (showAll || checkedValues.indexOf(perspectiveName) !== -1) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  }

  // Event delegation for popover content (since it's dynamic)
  document.addEventListener('click', function (e) {
    // Close button
    if (e.target.closest('.btn-close')) {
      complianceCategoryPopover.hide();
    }

    // Select All
    if (e.target.classList.contains('select-all-compliance')) {
      var cbs = document.querySelectorAll('.filter-compliance');
      for (var i = 0; i < cbs.length; i++) {
        cbs[i].checked = true;
      }
      filterKpiCardsByCompliance();
    }

    // Deselect All
    if (e.target.classList.contains('deselect-all-compliance')) {
      var cbs = document.querySelectorAll('.filter-compliance');
      for (var i = 0; i < cbs.length; i++) {
        cbs[i].checked = false;
      }
      filterKpiCardsByCompliance();
    }
  });

  // Also bind change events to checkboxes (use delegation or rebind after content update)
  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('filter-compliance')) {
      filterKpiCardsByCompliance();
    }
  });


  const newData = [
    {
        "id": 2452,
        "createdBy": 2108,
        "scorecardName": "CEO scorecardNew",
        "perspectiveType": "Customer",
        "perspectiveId": "Cus",
        "updatedBy": 2108,
        "createdTime": "2025-06-27T14:39:25",
        "updatedTime": "2025-06-27T14:44:13",
        "scoreCardValue": {
            "header4": "Target",
            "header3": "Actual",
            "createdByName": "Grace",
            "header2": "Period",
            "header1": "ID",
            "updatedByName": "Grace",
            "description": "NA",
            "weight": 0,
            "header5": "Trend",
            "perspective_start_end_date": "01/01/2024 - 12/31/2025",
            "defaultscr": true,
            "ownerName": "Grace",
            "name": "Theme2",
            "perspectiveType": "Customer",
            "status": "Weighted",
            "statusLight": "RED",
            "statusLightFlagvalue": "red fas fa-flag",
            "statusLightFlag": "rgba(255, 26, 9, 1)"
        },
        "active": 0,
        "owner": 2108,
        "objectiveList": [
            {
                "id": 1914,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Grace",
                    "ownerName": "Grace",
                    "updatedByName": "Grace",
                    "name": "DIVERSITY & INCLUSION",
                    "objective_start_end_date": "01/01/2024 - 12/31/2025",
                    "description": "NA",
                    "weight": "0",
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2025-06-27T14:39:25",
                "updatedTime": "2025-06-27T14:44:12",
                "owner": 2108,
                "scoreCardId": 2452,
                "createdBy": 2108,
                "updatedBy": 2108,
                "objectivesName": "DIVERSITY & INCLUSION",
                "kpiList": [
                    {
                        "id": 24117,
                        "createdBy": 2108,
                        "kpiName": "% Gender Ratio_FM",
                        "kpiFormula": {
                            "formula": null,
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2108,
                        "createdTime": "2025-06-27T14:39:25",
                        "updatedTime": "2025-06-27T14:44:11",
                        "kpiValue": {
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "createdByName": "Grace",
                            "option2color3": "100.0",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "kpiCurrency": "",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Grace",
                            "description": "NA",
                            "weight": "0",
                            "threshold": "option_2",
                            "target": "0",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Grace",
                            "kpi_datasource": "Manual",
                            "kpiType": "Lead",
                            "name": "% Gender Ratio_FM",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "kpi_measurement": "Half yearly",
                            "kpi_start_end_date": "01/01/2024 - 12/31/2025",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2108,
                        "objectiveId": 1914,
                        "kpiId": "GR6.1",
                        "includeReportee": false,
                        "startDate": "2024-01-01T00:00:00.000+0000",
                        "endDate": "2025-12-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 24118,
                        "createdBy": 2108,
                        "kpiName": "% Local Hiring",
                        "kpiFormula": {
                            "formula": null,
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2108,
                        "createdTime": "2025-06-27T14:39:25",
                        "updatedTime": "2025-06-27T14:44:12",
                        "kpiValue": {
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "createdByName": "Grace",
                            "option2color3": "100.0",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "kpiCurrency": "",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Grace",
                            "description": "NA",
                            "weight": "0",
                            "threshold": "option_2",
                            "target": "0",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Grace",
                            "kpi_datasource": "Manual",
                            "kpiType": "Lead",
                            "name": "% Local Hiring",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "kpi_measurement": "Monthly",
                            "kpi_start_end_date": "01/01/2024 - 12/31/2025",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2108,
                        "objectiveId": 1914,
                        "kpiId": "GR6.2",
                        "includeReportee": false,
                        "startDate": "2024-01-01T00:00:00.000+0000",
                        "endDate": "2025-12-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "DI",
                "startDate": "2024-01-01T00:00:00.000+0000",
                "endDate": "2025-12-31T00:00:00.000+0000"
            },
            {
                "id": 1915,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Grace",
                    "ownerName": "Grace",
                    "updatedByName": "Grace",
                    "name": "COMPLIANCE",
                    "objective_start_end_date": "01/01/2024 - 12/31/2025",
                    "description": "NA",
                    "weight": "0",
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2025-06-27T14:39:26",
                "updatedTime": "2025-06-27T14:44:12",
                "owner": 2108,
                "scoreCardId": 2452,
                "createdBy": 2108,
                "updatedBy": 2108,
                "objectivesName": "COMPLIANCE",
                "kpiList": [
                    {
                        "id": 24119,
                        "createdBy": 2108,
                        "kpiName": "% Compliance Training",
                        "kpiFormula": {
                            "formula": null,
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2108,
                        "createdTime": "2025-06-27T14:39:26",
                        "updatedTime": "2025-06-27T14:44:12",
                        "kpiValue": {
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "createdByName": "Grace",
                            "option2color3": "100.0",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "kpiCurrency": "",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Grace",
                            "description": "NA",
                            "weight": "0",
                            "threshold": "option_2",
                            "target": "0",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Grace",
                            "kpi_datasource": "Manual",
                            "kpiType": "Lead",
                            "name": "% Compliance Training",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "kpi_measurement": "Monthly",
                            "kpi_start_end_date": "01/01/2024 - 12/31/2025",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2108,
                        "objectiveId": 1915,
                        "kpiId": "CT7.1",
                        "includeReportee": false,
                        "startDate": "2024-01-01T00:00:00.000+0000",
                        "endDate": "2025-12-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "CL",
                "startDate": "2024-01-01T00:00:00.000+0000",
                "endDate": "2025-12-31T00:00:00.000+0000"
            },
            {
                "id": 1916,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Grace",
                    "ownerName": "Grace",
                    "updatedByName": "Grace",
                    "name": "OUTREACH EFFECTIVENESS",
                    "objective_start_end_date": "01/01/2024 - 12/31/2025",
                    "description": "NA",
                    "weight": "0",
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2025-06-27T14:39:26",
                "updatedTime": "2025-06-27T14:44:13",
                "owner": 2108,
                "scoreCardId": 2452,
                "createdBy": 2108,
                "updatedBy": 2108,
                "objectivesName": "OUTREACH EFFECTIVENESS",
                "kpiList": [
                    {
                        "id": 24120,
                        "createdBy": 2108,
                        "kpiName": "% Outreach Camp Coverage",
                        "kpiFormula": {
                            "formula": null,
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2108,
                        "createdTime": "2025-06-27T14:39:26",
                        "updatedTime": "2025-06-27T14:44:12",
                        "kpiValue": {
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "createdByName": "Grace",
                            "option2color3": "100.0",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "kpiCurrency": "",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Grace",
                            "description": "NA",
                            "weight": "0",
                            "threshold": "option_2",
                            "target": "0",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Grace",
                            "kpi_datasource": "Manual",
                            "kpiType": "Lead",
                            "name": "% Outreach Camp Coverage",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "kpi_measurement": "Quarterly",
                            "kpi_start_end_date": "01/01/2024 - 12/31/2025",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2108,
                        "objectiveId": 1916,
                        "kpiId": "OCC8.1",
                        "includeReportee": false,
                        "startDate": "2024-01-01T00:00:00.000+0000",
                        "endDate": "2025-12-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 24121,
                        "createdBy": 2108,
                        "kpiName": "% Surgical Conversion",
                        "kpiFormula": {
                            "formula": null,
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2108,
                        "createdTime": "2025-06-27T14:39:26",
                        "updatedTime": "2025-06-27T14:44:12",
                        "kpiValue": {
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "createdByName": "Grace",
                            "option2color3": "100.0",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "kpiCurrency": "",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Grace",
                            "description": "NA",
                            "weight": "0",
                            "threshold": "option_2",
                            "target": "0",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Grace",
                            "kpi_datasource": "Manual",
                            "kpiType": "Lead",
                            "name": "% Surgical Conversion",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "kpi_measurement": "Half yearly",
                            "kpi_start_end_date": "01/01/2024 - 12/31/2025",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2108,
                        "objectiveId": 1916,
                        "kpiId": "OCC8.2",
                        "includeReportee": false,
                        "startDate": "2024-01-01T00:00:00.000+0000",
                        "endDate": "2025-12-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 24122,
                        "createdBy": 2108,
                        "kpiName": "% Follow_up Compliance",
                        "kpiFormula": {
                            "formula": null,
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2108,
                        "createdTime": "2025-06-27T14:39:27",
                        "updatedTime": "2025-06-27T14:44:13",
                        "kpiValue": {
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "createdByName": "Grace",
                            "option2color3": "100.0",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "kpiCurrency": "",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Grace",
                            "description": "NA",
                            "weight": "0",
                            "threshold": "option_2",
                            "target": "0",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Grace",
                            "kpi_datasource": "Manual",
                            "kpiType": "Lead",
                            "name": "% Follow_up Compliance",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "kpi_measurement": "Monthly",
                            "kpi_start_end_date": "01/01/2024 - 12/31/2025",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2108,
                        "objectiveId": 1916,
                        "kpiId": "OCC8.3",
                        "includeReportee": false,
                        "startDate": "2024-01-01T00:00:00.000+0000",
                        "endDate": "2025-12-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "OF",
                "startDate": "2024-01-01T00:00:00.000+0000",
                "endDate": "2025-12-31T00:00:00.000+0000"
            }
        ],
        "pageId": 2418,
        "includeReportee": false,
        "startDate": "2024-01-01T00:00:00.000+0000",
        "endDate": "2025-12-31T00:00:00.000+0000",
        "scoreCardDetailsId": 771
    }
]
</script>

    </body>

    </html>
