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

	  <main>
        <section id="heroSection1" class="py-3 hero-section theme-default"
            style="background: url(./assets/images/landing-theme/strategy-map-02.jpg) right top no-repeat;background-size: cover;">
            <div class="blur-overlay"></div>
            <div class="container-lg">
                <div class="page-header grid gap-2 pb-1">
                    <div class="g-col-8 d-flex align-items-center">
                        <h4 class="title text-white">
                            <span class="icon">
                                <img src="/stratroom/images/meetings-i.svg" alt="meetings" title="meetings">
                            </span>
                            Initiatives Map
                        </h4>
                    </div>
                    <div class="load-page page-actions g-col-4">
                        <div class="page-icons">
                            <ul>


                                <li>
                                    <a href="javascript:;" id="popoverFilterComplianceCategory"
                                        class="btn btn-sm btn-icon">
                                        <span data-bs-toggle="tooltip" data-bs-placement="bottom"
                                            title="Compliance Category">
                                            <img src="/stratroom/images/filter-i.svg" width="12" height="12"
                                                alt="Filter">
                                        </span>

                                    </a>
                                </li>

                            </ul>
                        </div>

                        <div class="form-group">
                            <select id="strategyMapSelect" class="form-select form-select-sm">
                                
                            </select>
                        </div>
                        <div class="form-group">
                            <select id="Initiative_Pages" class="form-select form-select-sm">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-lg py-2 grid gap-4" id="initiativeListMap">

              


            </div>

        </section>

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
	<!-- <script src="${contextroot}/js/kpidata_form.js"></script> -->
  <script src="${contextroot}/js/initiativeStrategic.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
     <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
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

  $(document).ready(function () {
      arrangeDocumentRows();
  });
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
        $("#strategyMapSelect").select2({
            selectionCssClass: "select2-custom-input",
            width: "100px",
        });
        $("#strategyMapPageSelect").select2({
            selectionCssClass: "select2-custom-input",
            width: "80px",
        });
    </script>

    

<script>

const initiativeCategories = [
    "Strategy & Leadership", "Operations", "Finance", "Sales", "Marketing", "Customer",
    "Human Resources (HR)", "Information Technology (IT)", "Risk Management", "Compliance",
    "Legal", "Procurement & Supply Chain", "Product Development & Innovation", "Sustainability & ESG"
];

const complianceCategoryPopoverTrigger = document.getElementById('popoverFilterComplianceCategory');

let complianceCategoryPopover;

function createComplianceCategoryContent() {

    const content = document.createElement('div');

    let categoryHTML = "";

    initiativeCategories.forEach(category => {

        const id = "rc-" + category.replace(/\s+/g, '');

        categoryHTML += `
            <div class="form-check">
                <input class="form-check-input filter-compliance"
                    id="${id}"
                    type="checkbox"
                    value="${category}"
                    checked>
                <label class="form-check-label" for="${id}">
                    ${category}
                </label>
            </div>
        `;

    });

    content.innerHTML = `
        <div>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="h6 mb-0">
                    <i class="fas fa-filter me-1 text-primary"></i>
                    Filter Initiatives Category
                </h5>
                <button type="button" class="btn-close"></button>
            </div>

            <div class="d-flex justify-content-between mb-2">
                <button class="btn btn-sm btn-light select-all-compliance">Select All</button>
                <button class="btn btn-sm btn-light deselect-all-compliance">Deselect All</button>
            </div>

            <div class="d-flex flex-column gap-2 pageViewOption"
                style="max-height:300px; overflow-y:auto;">
                ${categoryHTML}
            </div>
        </div>
    `;

    return content;
}

complianceCategoryPopover = new bootstrap.Popover(complianceCategoryPopoverTrigger, {
    html: true,
    placement: 'bottom',
    content: createComplianceCategoryContent,
    sanitize: false,
    container: 'body',
    trigger: 'manual'
});

complianceCategoryPopoverTrigger.addEventListener('click', () => {
    complianceCategoryPopover.toggle();
});

function filterKpiCardsByCompliance() {

    const checked = Array.from(
        document.querySelectorAll('.filter-compliance:checked')
    ).map(cb => cb.value);

    const allChecked = checked.length === initiativeCategories.length;

    const cards = document.querySelectorAll('.strategyRow');

    cards.forEach(card => {

        const complianceText =
            card.querySelector('.riCategory')?.textContent.trim();

        card.style.display =
            (allChecked || checked.includes(complianceText)) ? '' : 'none';

    });

}

document.addEventListener('click', function (e) {

    if (e.target.closest('.btn-close')) {
        complianceCategoryPopover.hide();
    }

    if (e.target.classList.contains('select-all-compliance')) {

        document.querySelectorAll('.filter-compliance')
            .forEach(cb => cb.checked = true);

        filterKpiCardsByCompliance();
    }

    if (e.target.classList.contains('deselect-all-compliance')) {

        document.querySelectorAll('.filter-compliance')
            .forEach(cb => cb.checked = false);

        filterKpiCardsByCompliance();
    }

});

document.addEventListener('change', function (e) {

    if (e.target.classList.contains('filter-compliance')) {
        filterKpiCardsByCompliance();
    }

});

</script>



      <script>
        document.querySelectorAll(".gauge-wrapper").forEach((wrapper, index) => {
            const chartEl = wrapper.querySelector("[data-chart]");
            const needleEl = wrapper.querySelector("[data-needle]");
            const slider = wrapper.querySelector(".speedSlider");
            const defaultValue = parseInt(slider.value);
            const gaugeLabels = wrapper.querySelector(".gauge-labels");
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
        $("#widget_type").change(function () {
            var value = $(this).val();
            $(".widget").hide();
            if (value) $("." + value).show();
        }).change();
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
                scrollX: true,
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


   

   



  
</body>