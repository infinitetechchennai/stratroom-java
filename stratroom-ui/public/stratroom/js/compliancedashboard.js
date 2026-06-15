var departmentSelectId = document.getElementById('department_selectdw');
var pageSelectId = document.getElementById('page_selectdw');
var departmentValue = "";
var FRAMEWORKS = [];
var dummyData = [];

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

    $(document).ready(function () {
        arrangeDocumentRows();
    });
  

  
    

    function getDepartment() {
                $.ajax({
                    type: "GET",
                    url: "/stratroom/departmentReportees",
                    success: function (data) {

                    $('#department_selectdw').find('option:not(:first)').remove();

                    $.each(data, function (index, module) {

                        var option = document.createElement('option');
                        option.value = module.id;
                        option.textContent = module.name;

                        departmentSelectId.appendChild(option);
                    });

                    // Select2 init
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
    };

    getDepartment();

    $('#department_selectdw').on('change', function () {

    var selectedDepartment = $(this).val();
    departmentValue = selectedDepartment;

    if (selectedDepartment) {
        loadPages(selectedDepartment);
    } else {
        $('#page_selectdw').html('<option value="">Select Page</option>');
    }
    });



    function loadPages(departmentId) {

    $('#page_selectdw').find('option:not(:first)').remove();

    $.ajax({
        type: "GET",
        url: "/stratroom/pageDeptList/" + departmentId + "?pageType=Compliance",
        success: function (data) {

        $.each(data, function (index, module) {

            var option = document.createElement('option');
            option.value = module.id;
            option.textContent = module.pageName;

            pageSelectId.appendChild(option);
        });

        if (!$('#page_selectdw').hasClass("select2-hidden-accessible")) {
            $('#page_selectdw').select2({
            placeholder: "Select Page",
            width: 'resolve'
            });
        } else {
            $('#page_selectdw').trigger('change.select2');
        }
        }
    });
    }


    

    $('#page_selectdw').on('change', function () {

         $("#riskLegend").empty();

        // Optional: clear canvas manually
        $("#stackedBarChart").replaceWith('<canvas id="stackedBarChart"></canvas>');
        $("#riskPieChart").replaceWith('<canvas id="riskPieChart"></canvas>');
        
        var datePeriod = $("#datePeriod").val();
        var selectedPage = $(this).val();
        console.log(selectedPage, "selectedPage");

         $.ajax({
         url: "/stratroom/retrieveComplinValue?pageId=" + selectedPage + "&dateRange=" + datePeriod,
         method: "GET",
            success: function (data) {
                dummyData = data || [];
                mapFrameworks(data);

                 const totalLength = dummyData.reduce((sum, item) => {
    return sum + (item.complainsDetailsList?.length || 0);
  }, 0);

  const totalCradsLength = "across " + (dummyData?.length > 0 ? dummyData.length : 0) + " frameworks";

 $("#kpi-total-sub").text(totalCradsLength);

  console.log(totalLength, "totalLength");

 

  $("#kpi-total-val").text(totalLength);

  FRAMEWORKS = mapFrameworks(dummyData);
  console.log(FRAMEWORKS, "FRAMEWORKS");

  const effectiveTotal = FRAMEWORKS.reduce((sum, item) => {
    return sum + (item.statuses?.["Effective"] || 0);
  }, 0);


   const overallScore =  (effectiveTotal/ totalLength) * 100;

   $("#overall-score-percent").text(parseInt(overallScore) + "%");

   const overallScoreDetail = totalLength + "/" + effectiveTotal + " EFFECTIVE";

   $("#overall-score-detail").text(overallScoreDetail);
  

  const criticalRiskTotal = FRAMEWORKS.reduce((sum, item) => {
    return sum + (item.risk?.["Critical"] || 0);
  }, 0);

  const highRiskTotal = FRAMEWORKS.reduce((sum, item) => {
    return sum + (item.risk?.["High"] || 0);
  }, 0);


  console.log(effectiveTotal, highRiskTotal,  criticalRiskTotal,"effectiveTotal");

  $("#kpi-effective-val").text(effectiveTotal);
  $("#kpi-critical-val").text(criticalRiskTotal)
  $("#kpi-high-val").text(highRiskTotal)

  var a = 20;
  console.log(a, "a function called");

  renderFrameworkCards();
  renderRiskPieChart();
  renderStackedBarChart();
  renderImplProgress();

            }
    });
        

    });

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
    
  





function getRandomColor() {
  const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function mapFrameworks(dummyData) {
  console.log(dummyData, "dummyData");

   return dummyData.map(item => {
    const list = item.complainsDetailsList || [];

    const statuses = {};
    const risk = {};
    const impl = {};

    list.forEach(obj => {
      const cv = obj.complainValue || {};

      // STATUS
      const status = cv.status || obj.status || "Unknown";
      statuses[status] = (statuses[status] || 0) + 1;

      // RISK
      const riskLevel = cv.riskLevel || obj.riskLevel || "Unknown";
      const normalizedRisk =
        riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1).toLowerCase();
      risk[normalizedRisk] = (risk[normalizedRisk] || 0) + 1;

      // IMPLEMENTATION
      const implementation =
        cv.implementationStatus || "Unknown";
      impl[implementation] = (impl[implementation] || 0) + 1;
    });

    return {
      id: item.name,
      name: item.name,
      subtitle: "Data Privacy",
      total: list.length,
      statuses,
      risk,
      impl,
      color: getRandomColor()
    };
  });
};




    const STATUS_COLORS = { Effective: "#22c55e", "non-compliant": "#3b82f6", Pending: "#f59e0b", "Not Started": "#6b7280", compliant : "#6b7280" , Ongoing : "#3b82f6"};
    const RISK_COLORS = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#22c55e" };
    const IMPL_COLORS = { Implemented: "#22c55e", "Partially Implemented": "#3b82f6", Planned: "#f59e0b" , "In Progress": "#3b82f6"};

    const totalControls = FRAMEWORKS.reduce((a, f) => a + f.total, 0);
    const totalEffective = FRAMEWORKS.reduce((a, f) => a + f.statuses.Low, 0);
    const totalCritical = FRAMEWORKS.reduce((a, f) => a + (f.risk.Medium || 0), 0);
    const totalHigh = FRAMEWORKS.reduce((a, f) => a + (f.risk.High || 0), 0);
    const overallScore = Math.round((totalEffective / totalControls) * 100);

    const rootStyle = getComputedStyle(document.body);
    function getCssVar(varName, fallback) {
      return rootStyle.getPropertyValue(varName).trim() || fallback;
    }

    function getTextColor() { return getCssVar('--bs-body-color', '#1e293b'); }
    function getMutedColor() { return getCssVar('--bs-secondary-color', '#64748b'); }
    function getGridColor() { return getCssVar('--bs-border-color', '#f1f5f9'); }




    function createRadialSVG(value, max, color, size) {
      console.log(value, max, color, size, "vvvvvvvvvvvv");

      size = size || 68;

      value = Number(value) || 0;
      max = Number(max) || 1; // avoid division by 0

      var pct = Math.round((value / max) * 100);

      var r = (size / 2) - 7;
      var circ = 2 * Math.PI * r;
      var dash = (pct / 100) * circ;

      return '<svg width="' + size + '" height="' + size + '" class="radial-svg">' +
                '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" class="radial-bg"/>' +
                '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" class="radial-progress-circle" stroke="' + color + '" stroke-dasharray="' + dash + ' ' + circ + '" />' +
                '<text x="' + (size/2) + '" y="' + ((size/2) + 5) + '" class="radial-text" style="transform-origin:' + (size/2) + 'px ' + (size/2) + 'px">' + pct + '%</text>' +
            '</svg>';
    }

    // ==== RENDER FRAMEWORK CARDS ====
    var selectedFramework = null;

    function renderFrameworkCards() {
      var container = document.getElementById('frameworkCards');
      console.log(container, "container");

      var html = '';

      for (var i = 0; i < FRAMEWORKS.length; i++) {

        var f = FRAMEWORKS[i];
        var isActive = selectedFramework == f.id;

        html += '<div class="col-lg-2 col-md-4 col-6">' +
                  '<div class="framework-card ' + (isActive ? 'active' : '') + '" style="--fw-color:' + f.color + ';" onclick="selectFramework(\'' + f.id + '\')">' +
                      '<div class="mb-1">' + createRadialSVG(f.statuses.Effective, f.total, f.color) + '</div>' +
                      '<div class="fw-name">' + f.name + '</div>' +
                      '<div class="fw-subtitle">' + f.subtitle + '</div>' +
                      '<div class="fw-controls" style="color:' + f.color + ';">' + f.total + ' controls</div>' +
                  '</div>' +
                '</div>';
      }

      container.innerHTML = html;
    }

  function renderImplProgress() {

    var container = document.getElementById('implProgress');
    var html = '';

    for (var i = 0; i < FRAMEWORKS.length; i++) {

      var f = FRAMEWORKS[i];

      var implPct = Math.round(((f.impl.Implemented ? f.impl.Implemented : 0 ) / f.total) * 100);
      var inPct = Math.round(((f.impl["In Progress"] || 0) / f.total) * 100);
      var planPct = Math.round(((f.impl.Planned || 0) / f.total) * 100);

      html += '<div class="col-lg-2 col-md-4 col-6 text-center">' +
                '<div class="impl-progress-title" style="color:' + f.color + ';">' + f.id + '</div>' +
                '<div class="impl-bar-container">' +
                    '<div style="height:' + implPct + '%;background:#22c55e;transition:height 0.8s ease"></div>' +
                    '<div style="height:' + inPct + '%;background:#3b82f6"></div>' +
                    '<div style="height:' + planPct + '%;background:#f59e0b"></div>' +
                '</div>' +
                '<div class="impl-progress-stat">' +
                    '<span class="pct" style="color:#22c55e;">' + implPct + '%</span> impl.' +
                '</div>' +
              '</div>';

    }

    container.innerHTML = html;

  }  
    
  function selectFramework(id) {
        selectedFramework = selectedFramework == id ? null : id;
        renderFrameworkCards();
        renderDrilldown();
      
  }


function renderDrilldown() {

  var panel = document.getElementById('drilldownPanel');

  if (!selectedFramework) {
    panel.style.display = 'none';
    return;
  }

  var f = null;
  for (var i = 0; i < FRAMEWORKS.length; i++) {
    if (FRAMEWORKS[i].id == selectedFramework) {
      f = FRAMEWORKS[i];
      break;
    }
  }

  if (!f) {
    panel.style.display = 'none';
    return;
  }

  panel.style.display = 'block';

  function barRows(data, colors, total) {

    var html = '';

    for (var key in data) {

      if (data[key] > 0) {

        var v = data[key];
        var pct = ((v / total) * 100).toFixed(1);
        var color = colors[key] || 'var(--bs-secondary-color)';

        html += '<div class="mb-2">' +
                  '<div class="d-flex justify-content-between mb-1" style="font-size:12px;">' +
                      '<span style="color:' + color + '">' + key + '</span>' +
                      '<span style="color:var(--bs-secondary-color)">' + v + '/' + total + '</span>' +
                  '</div>' +
                  '<div class="bar-track">' +
                      '<div class="bar-fill" style="width:' + pct + '%;background:' + color + '"></div>' +
                  '</div>' +
                '</div>';
      }
    }

    return html;
  }

  var html = '';

  html += '<div class="drilldown-panel" style="border-left:3px solid ' + f.color + ';">';

  html += '<div class="d-flex align-items-center justify-content-between mb-3">';
  html += '<div>';
  html += '<span class="fw-bold drilldown-header-title" style="color:' + f.color + '">' + f.name + '</span>';
  html += '<span class="ms-2 drilldown-header-subtitle">' + f.subtitle + ' · ' + f.total + ' controls</span>';
  html += '</div>';

  html += '<button class="btn btn-sm btn-outline-secondary" onclick="selectFramework(null)">Close</button>';

  html += '</div>';

  html += '<div class="row g-4">';

  html += '<div class="col-md-4">';
  html += '<div class="drilldown-section-title">Status Breakdown</div>';
  html += barRows(f.statuses, STATUS_COLORS, f.total);
  html += '</div>';

  html += '<div class="col-md-4">';
  html += '<div class="drilldown-section-title">Risk Distribution</div>';
  html += barRows(f.risk, RISK_COLORS, f.total);
  html += '</div>';

  html += '<div class="col-md-4">';
  html += '<div class="drilldown-section-title">Implementation Status</div>';
  html += barRows(f.impl, IMPL_COLORS, f.total);
  html += '</div>';

  html += '</div>';
  html += '</div>';

  panel.innerHTML = html;
}



function renderRiskPieChart() {

  var riskData = [
    { name: "Critical", value: FRAMEWORKS.reduce(function (a, f) {
        return a + (f.risk.Critical || 0);
      }, 0), color: "#ef4444" },
    { name: "High", value: FRAMEWORKS.reduce(function (a, f) {
        return a + (f.risk.High || 0);
      }, 0), color: "#f97316" },
    {
      name: "Medium",
      value: FRAMEWORKS.reduce(function (a, f) {
        return a + (f.risk.Medium || 0);
      }, 0),
      color: "#eab308"
    },
    {
      name: "Low",
      value: FRAMEWORKS.reduce(function (a, f) {
        return a + (f.risk.Low || 0);
      }, 0),
      color: "#22c55e"
    }
  ];

  // filter values > 0
  var filteredRiskData = [];
  for (var i = 0; i < riskData.length; i++) {
    if (riskData[i].value > 0) {
      filteredRiskData.push(riskData[i]);
    }
  }

  var labels = [];
  var values = [];
  var colors = [];

  for (var j = 0; j < filteredRiskData.length; j++) {
    labels.push(filteredRiskData[j].name);
    values.push(filteredRiskData[j].value);
    colors.push(filteredRiskData[j].color);
  }

  var ctx = document.getElementById('riskPieChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { display: false }
      }
    }
  });

  // Legend
  var legendContainer = document.getElementById('riskLegend');
  var legendHTML = '';

  for (var k = 0; k < filteredRiskData.length; k++) {

    var d = filteredRiskData[k];

    legendHTML += '<div class="col-6 d-flex align-items-center gap-1">' +
                    '<span class="legend-dot" style="background:' + d.color + ';"></span>' +
                    '<span style="color:var(--bs-secondary-color);">' + d.name + '</span>' +
                    '<span class="ms-auto fw-semibold" style="color:' + d.color + ';">' + d.value + '</span>' +
                  '</div>';
  }

  legendContainer.innerHTML = legendHTML;
}


function renderStackedBarChart() {

  var ctx = document.getElementById('stackedBarChart').getContext('2d');

  var labels = [];
  var effective = [];
  var ongoing = [];
  var pending = [];
  var notStarted = [];

  for (var i = 0; i < FRAMEWORKS.length; i++) {

    var f = FRAMEWORKS[i];

    labels.push(f.id);
    effective.push(f.statuses.Effective);
    ongoing.push(f.statuses.Ongoing);
    pending.push(f.statuses.Pending);
    notStarted.push(f.statuses["Not Started"]);

  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Effective',
          data: effective,
          backgroundColor: '#22c55e'
        },
        {
          label: 'Ongoing',
          data: ongoing,
          backgroundColor: '#3b82f6'
        },
        {
          label: 'Pending',
          data: pending,
          backgroundColor: '#f59e0b'
        },
        {
          label: 'Not Started',
          data: notStarted,
          backgroundColor: '#6b7280'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: {
            color: getMutedColor(),
            font: { size: 11 }
          }
        },
        y: {
          stacked: true,
          grid: { color: getGridColor() },
          ticks: {
            color: getMutedColor(),
            font: { size: 10 }
          }
        }
      }
    }
  });

}




