<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:set var="contextroot" value="${pageContext.request.contextPath}" />

    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>StratRoom</title>
    </head>

    <style>
      .btn-generatePdf {
        margin: 2px;
        height: 24px;
        width: 24px;
        padding: 0;
        border: none;
      }
    </style>

    <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

    <body class="light">
      <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}" />

      <div style="display: none">
        <jsp:include page="../common/right-navigation.jsp"></jsp:include>
      </div>

      <jsp:include page="../common/top-navigation.jsp"></jsp:include>
      <header id="header" class="header shadow-sm">
        <jsp:include page="../common/left-navigation.jsp"></jsp:include>
      </header>
      <!--#END View -->
   <main class="pt-2 pb-2">
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="assets/images/icons/audit-trail-i.svg" alt="control-panel" title="control-panel"
                                width="18" height="18">
                        </span>
                        Performance Improvement Plan
                    </h4>
                </div>

            </div>

        </div>
        <div class="container-lg py-2">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="c-header-left">
                        <h5 class="card-title">
                            <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">Performance Improvement Plan </strong>
                        </h5>
                    </div>

                </div>
                <div class="card-body p-3">
                    <div class="grid">
                        <div class="g-col-12 g-col-xl-3 g-col-md-4">

                            <div class="d-flex flex-column justify-content-center text-center gap-2 p-3 bg-primary rounded mb-3"
                                style="--stratroom-bg-opacity:0.1">


                                <div class="user-card flex-column gap-2 justify-content-center">
                                    <div class="user-image user-image-lg">
                                        <!-- <img src="assets/images/user/user7.jpg" alt="George" width="48" height="48"> -->
                                        <span class="img-initial rounded-circle">CH</span>
                                    </div>
                                    <div class="user-text d-flex flex-column">
                                        <h6 class="text-heading text-truncate"> Chris Hemsworth</h6>
                                        <small>Chairman Board of Directors</small>
                                    </div>
                                </div>


                            </div>
                            <div>
                                <div class="grid gap-0 mb-3 grid-from-box">
                                    <div class="form-group g-col-6">
                                        <label class="form-label">Manager/Supervisor</label>
                                        <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                            <li class="avatar avatar-xs pull-up" title="User">
                                                <img src="assets/images/user/usrbig1.jpg" class="rounded-circle"
                                                    width="24" height="24">
                                            </li>
                                            <li class="avatar avatar-xs pull-up" title="User">
                                                <img src="assets/images/user/usrbig6.jpg" class="rounded-circle"
                                                    width="24" height="24">
                                            </li>
                                            <li class="avatar avatar-xs pull-up" href="#attendess-list"
                                                data-bs-toggle="modal">
                                                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip"
                                                    data-bs-placement="top" data-bs-original-title="0 more">+2</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="form-group g-col-6 text-end">
                                        <label class="form-label">HR Representative</label>
                                        <ul
                                            class="list-unstyled d-flex align-items-center justify-content-end avatar-group mb-0">
                                            <li class="avatar avatar-xs pull-up" title="User">
                                                <img src="assets/images/user/usrbig1.jpg" class="rounded-circle"
                                                    width="24" height="24">
                                            </li>

                                            <li class="avatar avatar-xs pull-up" href="#attendess-list"
                                                data-bs-toggle="modal">
                                                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip"
                                                    data-bs-placement="top" data-bs-original-title="0 more">+0</span>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div class="mb-3">
                                    <h6 class="mb-2">Employee Information</h6>
                                    <div class="grid gap-0 grid-from-box">
                                        <div class="form-group g-col-12">
                                            <label class="form-label">Name</label>
                                            <p class="form-control-plaintext">Chris Hemsworth</p>
                                        </div>
                                        <div class="form-group g-col-6 ">
                                            <label class="form-label">Job Title</label>
                                            <p class="form-control-plaintext">Chairman</p>
                                        </div>
                                        <div class="form-group g-col-6 text-end">
                                            <label class="form-label">Department</label>
                                            <p class="form-control-plaintext">Board of Directors</p>
                                        </div>
                                        <div class="form-group g-col-6 ">
                                            <label class="form-label">PIP Start Date</label>
                                            <!-- <p class="form-control-plaintext">24-10-2005</p> -->
                                              <input type="text" class="form-control date-picker" name="" id="pipStartDate" placeholder="Select Date">
                                        </div>
                                        <div class="form-group g-col-6 text-end">
                                            <label class="form-label">PIP End Date</label>
                                            <input type="text" class="form-control text-end date-picker" name="" id="pipEndDate" placeholder="Select Date">
                                        </div>
                                        <div class="form-group g-col-12">
                                            <label class="form-label">Next Review Date</label>
                                          <input type="text" class="form-control date-picker" name="" id="nextReviewDate" placeholder="Select Date">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">

                                    <div class="form-group">
                                        <label for="PIPOverview" data-i18n="Consequences" class="form-label">PIP
                                            Overview</label>
                                        <textarea class="form-control consequences" id="PIPOverview" name="PIPOverview"
                                            placeholder="Enter the PIP overview..."></textarea>
                                    </div>



                                </div>

                                <div class="form-group mt-2">

                                    <button class="btn btn-primary w-100">
                                        Submit
                                    </button>
                                </div>



                            </div>


                        </div>
                        <div class="g-col-12 g-col-xl-9 g-col-md-8 ">

                            <div class="grid gap-3">
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Purpose" data-i18n="Purpose" class="form-label">Purpose</label>
                                        <textarea class="form-control purpose" id="purpose" name="purpose"
                                            placeholder="Enter the purpose of this PIP..."></textarea>
                                    </div>

                                </div>
                                <div class="g-col-12 grid gap-3">
                                    <div class="g-col-12">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="areasofConcern" data-i18n="areasofConcern"
                                                    class="form-label">Areas of Concern</label>
                                            </div>



                                            <table id="performanceTable" class="table table-bordered w-100">
                                                <thead>
                                                    <tr>
                                                        <th>Performance Area</th>
                                                        <th>Description of Issue</th>
                                                        <th>Impact on Role/Team/Firm</th>
                                                        <th class="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Work Habits & Discipline</td>
                                                        <td>Attendance & Punctuality</td>
                                                        <td>Project delays</td>
                                                        <td>
                                                            <div class="table-actions justify-content-end">
                                                                <button class="btn btn-sm btn-outline-icon editBtn"
                                                                    data-state="view"><i
                                                                        class="fas fa-edit"></i></button>
                                                                <button class="btn btn-sm btn-outline-icon deleteBtn"
                                                                    aria-label="Delete"><i
                                                                        class="fas fa-trash"></i></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="text-end">
                                                <button id="addPerformanceRowBtn" class="btn btn-sm btn-success mt-2">
                                                    <i class="fas fa-plus"></i>Add More</button>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="g-col-12">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="performanceExpectations" data-i18n="performanceExpectations"
                                                    class="form-label">Performance Expectations</label>
                                            </div>



                                            <table id="performanceExpectationsTable" class="table table-bordered w-100">
                                                <thead>
                                                    <tr>
                                                        <th>Performance Area</th>
                                                        <th>Expected Standard</th>
                                                        <th>Measurement Criteria</th>
                                                        <th class="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Work Habits & Discipline</td>
                                                        <td>Maintain 100% adherence to work schedule and punctuality</td>
                                                        <td>Weekly attendance report</td>
                                                        <td>
                                                            <div class="table-actions justify-content-end">
                                                                <button class="btn btn-sm btn-outline-icon editBtn"
                                                                    data-state="view"><i
                                                                        class="fas fa-edit"></i></button>
                                                                <button class="btn btn-sm btn-outline-icon deleteBtn"
                                                                    aria-label="Delete"><i
                                                                        class="fas fa-trash"></i></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="text-end">
                                                <button id="addExpectationsRowBtn" class="btn btn-sm btn-success mt-2">
                                                    <i class="fas fa-plus"></i>Add More</button>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="g-col-12">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="performanceExpectations" data-i18n="performanceExpectations"
                                                    class="form-label">Action Plan / Support</label>
                                            </div>



                                            <table id="actionPlanTable" class="table table-bordered w-100">
                                                <thead>
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>Support / Resources</th>
                                                        <th>Timeline / Frequency</th>
                                                        <th class="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Weekly mentoring sessions</td>
                                                        <td>Assigned mentor</td>
                                                        <td>Weekly during PIP</td>
                                                        <td>
                                                            <div class="table-actions justify-content-end">
                                                                <button class="btn btn-sm btn-outline-icon editBtn"
                                                                    data-state="view"><i
                                                                        class="fas fa-edit"></i></button>
                                                                <button class="btn btn-sm btn-outline-icon deleteBtn"
                                                                    aria-label="Delete"><i
                                                                        class="fas fa-trash"></i></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="text-end">
                                                <button id="addActionPlanRowBtn" class="btn btn-sm btn-success mt-2"> <i
                                                        class="fas fa-plus"></i>Add More</button>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="g-col-12">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="performanceExpectations" data-i18n="performanceExpectations"
                                                    class="form-label">Monitoring & Review</label>
                                            </div>



                                            <table id="monitoringTable" class="table table-bordered w-100">
                                                <thead>
                                                    <tr>
                                                        <th>Review Date</th>
                                                        <th>Areas Reviewed</th>
                                                        <th>Feedback / Notes</th>
                                                        <th class="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Oct 1, 2025</td>
                                                        <td>Attendance</td>
                                                        <td>Satisfactory improvement</td>
                                                        <td>
                                                            <div class="table-actions justify-content-end">
                                                                <button class="btn btn-sm btn-outline-icon editBtn"
                                                                    data-state="view"><i
                                                                        class="fas fa-edit"></i></button>
                                                                <button class="btn btn-sm btn-outline-icon deleteBtn"
                                                                    aria-label="Delete"><i
                                                                        class="fas fa-trash"></i></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="text-end">
                                                <button id="addMonitoringRowBtn" class="btn btn-sm btn-success mt-2"> <i
                                                        class="fas fa-plus"></i>Add More</button>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Consequences" data-i18n="Consequences"
                                            class="form-label">Consequences</label>
                                        <textarea class="form-control consequences" id="consequences"
                                            name="consequences"
                                            placeholder="Enter the consequences of this PIP..."></textarea>
                                    </div>
                                </div>

                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="employee_acknowledgment" data-i18n="employee_acknowledgment"
                                            class="form-label">Employee Acknowledgment</label>
                                        <textarea class="form-control employee_acknowledgment"
                                            id="employee_acknowledgment" name="employee_acknowledgment"
                                            placeholder="Enter the employee acknowledgment..."></textarea>
                                    </div>
                                </div>

                                <div class="g-col-12 grid gap-3">
                                    <div class="g-col-12 g-col-lg-6">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="employee_signature" data-i18n="employee_signature"
                                                    class="form-label">Employee
                                                    Signature</label>

                                                <label for="employee_signature" class="upload-label upload-box">
                                                    <div class="upload">Choose a file or drag it here.</div>
                                                    <input type="file" class="file-input" id="employee_signature"
                                                        data-upload="single" accept=".jpg,.jpeg,.png,.pdf">
                                                </label>
                                                <div class="upload-preview grid"></div>
                                            </div>
                                            <div class="form-group mt-3">
                                                <label for="employee_signature_date" data-i18n="employee_signature_date"
                                                    class="form-label">Date</label>
                                                <input type="text" class="form-control date-picker"
                                                    id="employee_signature_date" name="employee_signature_date"
                                                    placeholder="Select Date"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="g-col-12 g-col-lg-6">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="manager_signature" data-i18n="manager_signature"
                                                    class="form-label">Manager
                                                    Signature</label>

                                                <label for="manager_signature" class="upload-label upload-box">
                                                    <div class="upload">Choose a file or drag it here.</div>
                                                    <input type="file" class="file-input" id="manager_signature"
                                                        data-upload="single" accept=".jpg,.jpeg,.png,.pdf">
                                                </label>
                                                <div class="upload-preview grid"></div>

                                            </div>
                                            <div class="form-group mt-3">
                                                <label for="manager_signature_date" data-i18n="manager_signature_date"
                                                    class="form-label">Date</label>
                                                <input type="text" class="form-control date-picker"
                                                    id="manager_signature_date" name="manager_signature_date"
                                                    placeholder="Select Date"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="g-col-12 g-col-lg-6">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="hr_representative_signature"
                                                    data-i18n="hr_representative_signature" class="form-label">HR
                                                    Representative
                                                    Signature</label>

                                                <label for="hr_representative_signature"
                                                    class="upload-label upload-box">
                                                    <div class="upload">Choose a file or drag it here.</div>
                                                    <input type="file" class="file-input"
                                                        id="hr_representative_signature" data-upload="single"
                                                        accept=".jpg,.jpeg,.png,.pdf">
                                                </label>
                                                <div class="upload-preview grid"></div>

                                            </div>
                                            <div class="form-group mt-3">
                                                <label for="hr_representative_signature_date"
                                                    data-i18n="hr_representative_signature_date"
                                                    class="form-label">Date</label>
                                                <input type="text" class="form-control date-picker"
                                                    id="hr_representative_signature_date"
                                                    name="hr_representative_signature_date"
                                                    placeholder="Select Date"></input>
                                            </div>

                                        </div>
                                    </div>

                                </div>










                                <div class="g-col-12 pt-3">
                                    <div class="form-line right">
                                        <button type="button" class="btn btn-label-secondary">
                                            Reset
                                        </button>
                                        <button class="btn btn-primary" value="Save">
                                            Submit PIP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

      <!-- Plugins Js -->
      <link href="assets/css/pickr.min.css" rel="stylesheet" />
      <link href="assets/css/daterangepicker.min.css" rel="stylesheet" />
      <link href="assets/css/jquery-ui.min.css" rel="stylesheet" />
      <link href="assets/css/select2.min.css" rel="stylesheet" />

      <script src="${contextroot}/js/app.min.js"></script>
      <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
      <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
      <!-- Custom Js -->
      <script src="${contextroot}/js/admin.js"></script>
      <!-- Knob Js -->
      <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
      <script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>

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
      <script src="${contextroot}/js/kpiPerformance.js"></script>
      <script src="${contextroot}/js/initial.js"></script>
      <script src="${contextroot}/js/html2pdf.bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js"></script>




   

     
            <script>
  var attachment = {
    kpiAttachment: []  
  };

  var documentData = {}

  document.querySelectorAll('.file-input').forEach((inputEl) => {
    const previewContainer = inputEl.closest('.form-group').querySelector('.upload-preview');
    const uploadBox = inputEl.closest('.upload-box');

    function generateUniqueReference() {
      return Date.now() + '_' + Math.random().toString(36).substring(2, 10);
    }

    function getFileContentAsBase64(file, callback) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const base64String = event.target.result.split(',')[1];
        callback(base64String);
      };
      reader.readAsDataURL(file);
    }

    function render() {
      previewContainer.innerHTML = '';
      attachment.kpiAttachment.forEach((fileObj, index) => {
        const file = fileObj.file; 
        const fileURL = URL.createObjectURL(file);
        const wrapper = document.createElement('div');
        wrapper.className = 'col-md-3 upload-item';
        wrapper.style.padding = '10px';

        if (file.type.startsWith('image/')) {
          wrapper.innerHTML =
            '<div class="card h-100 shadow-sm">' +
              '<img src="' + fileURL + '" class="card-img-top img-fluid" alt="' + file.name + '">' +
              '<div class="card-body p-2">' +
                '<p class="card-text text-truncate small mb-2">' + file.name + '</p>' +
                '<div class="d-flex justify-content-between">' +
                  '<a href="' + fileURL + '" download="' + file.name + '" class="btn btn-sm btn-outline-primary"><i class="fa fa-download"></i></a>' +
                  '<button type="button" class="btn btn-sm btn-outline-danger" data-index="' + index + '"><i class="fa fa-trash"></i></button>' +
                '</div>' +
              '</div>' +
            '</div>';
        } else {
          wrapper.innerHTML =
            '<div class="card h-100 shadow-sm">' +
              '<div class="card-body p-2">' +
                '<p class="card-text text-truncate mb-3">' + file.name + '</p>' +
                '<div class="d-flex justify-content-between">' +
                  '<a href="' + fileURL + '" download="' + file.name + '" class="btn btn-sm btn-outline-primary"><i class="fa fa-download"></i></a>' +
                  '<button type="button" class="btn btn-sm btn-outline-danger" data-index="' + index + '"><i class="fa fa-trash"></i></button>' +
                '</div>' +
              '</div>' +
            '</div>';
        }

        previewContainer.appendChild(wrapper);
      });

      // Attach delete event listeners
      previewContainer.querySelectorAll('button[data-index]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.getAttribute('data-index'));
          attachment.kpiAttachment.splice(i, 1);
          render();
          updateDocumentsValue();
        });
      });
    }

    function updateDocumentsValue() {
      if (attachment.kpiAttachment.length > 0) {
        const fileObj = attachment.kpiAttachment[0];
        getFileContentAsBase64(fileObj.file, function(base64Content) {
          window.documentsValue = {
            file: base64Content,
            name: fileObj.file.name,
            size: fileObj.file.size + ' bytes',
            type: fileObj.file.type,
            uniqueFileReference: fileObj.uniqueFileReference,
            uploadedOn: fileObj.uploadedOn
          };

          documentData = {
            file: base64Content,
            name: fileObj.file.name,
            size: fileObj.file.size + ' bytes',
            type: fileObj.file.type,
            uniqueFileReference: fileObj.uniqueFileReference,
            uploadedOn: fileObj.uploadedOn
          };
          console.log("documentsValue updated:", window.documentsValue);
        });
      } else {
        window.documentsValue = null; 
        console.log("documentsValue cleared");
      }
    }

    inputEl.addEventListener('change', () => {
      const newFiles = Array.from(inputEl.files);
      newFiles.forEach(file => {
        console.log(file, "file");
        attachment.kpiAttachment.push({
          file: file,
          uploadedOn: new Date(),
          uniqueFileReference: generateUniqueReference()
        });
      });
      inputEl.value = ""; 
      render();
      updateDocumentsValue();
    });

    uploadBox.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadBox.classList.add('border-primary');
    });

    uploadBox.addEventListener('dragleave', () => {
      uploadBox.classList.remove('border-primary');
    });

    uploadBox.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadBox.classList.remove('border-primary');
      const droppedFiles = Array.from(e.dataTransfer.files);
      droppedFiles.forEach(file => {
        console.log(file, "dropped file");
        attachment.kpiAttachment.push({
          file: file,
          uploadedOn: new Date(),
          uniqueFileReference: generateUniqueReference()
        });
      });
      render();
      updateDocumentsValue();
    });
  });

  window.attachment = attachment;
  window.updateDocumentsValue = updateDocumentsValue;
</script>
     <script>
        var kpiData = {}
        $(document).ready(function () {
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
                ? "data-name='" + username + "' class='rounded-circle swotmultiuserimage'"
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

        scoreCradListData();
        function scoreCradListData() {
          $.ajax({
            url: "/stratroom/scoreCardListByDeptId/",
            type: "get",
            contentType: "application/json",
            success: function (data, status) {
              const select = $("#inputState");
              select.empty();

              select.append("<option selected disabled>Select Scorecard</option>");

              if (data.length == 0) {
                select.append("<option disabled>No Scorecards available</option>");
                return;
              }
              data.forEach(function (scorecard) {
                const option =
                  "<option value='" +
                  scorecard.id +
                  "'>" +
                  scorecard.name +
                  "</option>";
                select.append(option);
              });
            },
            error: readErrorMsg,
          });
        }


        //onchange function for scorecard selection
        function scoreCardChange() {
          const selectedValue = $("#inputState").val();
          console.log("Selected Scorecard ID:", selectedValue);
          if (!selectedValue) {
            return;
          }

          // Dummy data - same as your example
          const kpiData = {
            "subkpidtoList": [
              {
                "id": 24528,
                "orgId": 4,
                "subKpiName": "subkpi002",
                "subKpiIdSequence": null,
                "createdBy": 2108,
                "updatedBy": 0,
                "createdTime": "2025-08-02T06:45:09",
                "updatedTime": null,
                "active": 0,
                "owner": 2108,
                "objectiveId": 1910,
                "subKpiValue": {
                  "createdByName": "Grace",
                  "subweight": "",
                  "targetCurrency": "",
                  "kpiCurrency": "",
                  "customthresholdenable": false,
                  "kpiId": "24103",
                  "dataType": "Percentage",
                  "description": "des",
                  "weight": "",
                  "threshold": "",
                  "target": "0",
                  "thresholdFormula": "",
                  "kpi_datasource": "Manual",
                  "ownerName": "Grace",
                  "kpiType": "Lead",
                  "subMeasureName": "subkpi002",
                  "kpi_measurement": "Quarterly",
                  "kpi_start_end_date": "08/19/2025 - 08/30/2025",
                  "status": "Manual"
                },
                "subKpiId": "MPT.1",
                "includeReportee": false,
                "customReportees": null,
                "startDate": "2025-08-18",
                "endDate": "2025-08-29",
                "actType": 1,
                "kpiFormula": {
                  "formula": "",
                  "fieldName": "",
                  "type": null,
                  "groupBy": null,
                  "deptName": null,
                  "currency": null,
                  "dataType": null,
                  "empployeeIds": [
                    "2108",
                    2108
                  ],
                  "period": null,
                  "tableType": null
                },
                "empId": 0,
                "kpiId": 24103,
                "subKPIEntrysDTO": null,
                "thresholdvalueupdate": false,
                "createDateString": null,
                "updatedDateString": null
              },
              {
                "id": 24528,
                "orgId": 4,
                "subKpiName": "subkpi002",
                "subKpiIdSequence": null,
                "createdBy": 2108,
                "updatedBy": 0,
                "createdTime": "2025-08-02T06:45:09",
                "updatedTime": null,
                "active": 0,
                "owner": 2108,
                "objectiveId": 1910,
                "subKpiValue": {
                  "createdByName": "Grace",
                  "subweight": "",
                  "targetCurrency": "",
                  "kpiCurrency": "",
                  "customthresholdenable": false,
                  "kpiId": "24103",
                  "dataType": "Percentage",
                  "description": "des",
                  "weight": "",
                  "threshold": "",
                  "target": "0",
                  "thresholdFormula": "",
                  "kpi_datasource": "Manual",
                  "ownerName": "Grace",
                  "kpiType": "Lead",
                  "subMeasureName": "subkpi002",
                  "kpi_measurement": "Quarterly",
                  "kpi_start_end_date": "08/19/2025 - 08/30/2025",
                  "status": "Manual"
                },
                "subKpiId": "MPT.1",
                "includeReportee": false,
                "customReportees": null,
                "startDate": "2025-08-18",
                "endDate": "2025-08-29",
                "actType": 1,
                "kpiFormula": {
                  "formula": "",
                  "fieldName": "",
                  "type": null,
                  "groupBy": null,
                  "deptName": null,
                  "currency": null,
                  "dataType": null,
                  "empployeeIds": [
                    "2108",
                    2108
                  ],
                  "period": null,
                  "tableType": null
                },
                "empId": 0,
                "kpiId": 24103,
                "subKPIEntrysDTO": null,
                "thresholdvalueupdate": false,
                "createDateString": null,
                "updatedDateString": null
              }
            ]
          }


         

          // AJAX call (kept as in your original code)
          $.ajax({
            url: "/stratroom/subkpiEntryList/" + selectedValue + "?employeeView",
            type: "get",
            contentType: "application/json",
            success: function (data, status) {
              // Handle success if needed
              const kpiData = data 

              const container = document.getElementById("kpi_performance_table");
              container.innerHTML = "";

          if (kpiData && kpiData.subkpidtoList && kpiData.subkpidtoList.length > 0) {
            kpiData.subkpidtoList.forEach((item, index) => {
              console.log(item, "item");
              const num = (index + 1).toString().padStart(2, '0');
              const kpiId = item.id;
              const subKPIEntrysDTOId = item.subKPIEntrysDTO ? item.subKPIEntrysDTO.id : null;
              const preferenceId = item.subKPIEntrysDTO ? item.subKPIEntrysDTO.preferenceId : null;
              $('#preferenceIdValue').val(preferenceId);

              let roleHtml = "";

              const ratings = item.subKPIEntrysDTO || {};
              const selfRating = ratings.selfRating || 0;
              const managerRating = ratings.managerRating || 0;
              const consensualRating = ratings.consensualRating || 0;
              const commentValue = kpiData?.values?.comments ? kpiData?.values?.comments : '';
$('#comments').val(commentValue);

["self", "manager", "consensual"].forEach(role => {
  // Determine which rating value to use for each role
  const ratingValue = 
    role == "self" ? selfRating :
    role == "manager" ? managerRating :
    consensualRating;
  
  roleHtml +=
    '<div class="d-flex align-items-center gap-2 mt-2">' +
    '<label class="form-label mb-0">' + role.toUpperCase() + '</label>' +
    '<div class="form-check-group">' +
    '<div class="form-check">' +
    '<input class="form-check-input kpi-radio" type="radio" id="kpi-' + num + '-' + role + '-1" name="kpi-' + num + '-' + role + '" value="1" data-role="' + role + '"' + (ratingValue == 1 ? ' checked' : '') + '>' +
    '<label class="form-check-label" for="kpi-' + num + '-' + role + '-1"><span>1</span></label>' +
    '</div>' +
    '<div class="form-check">' +
    '<input class="form-check-input kpi-radio" type="radio" id="kpi-' + num + '-' + role + '-2" name="kpi-' + num + '-' + role + '" value="2" data-role="' + role + '"' + (ratingValue == 2 ? ' checked' : '') + '>' +
    '<label class="form-check-label" for="kpi-' + num + '-' + role + '-2"><span>2</span></label>' +
    '</div>' +
    '<div class="form-check">' +
    '<input class="form-check-input kpi-radio" type="radio" id="kpi-' + num + '-' + role + '-3" name="kpi-' + num + '-' + role + '" value="3" data-role="' + role + '"' + (ratingValue == 3 ? ' checked' : '') + '>' +
    '<label class="form-check-label" for="kpi-' + num + '-' + role + '-3"><span>3</span></label>' +
    '</div>' +
    '</div>' +
    '</div>';
});

              const html =
                '<div class="questionnaire-block">' +
                '<label class="form-label">' + (index + 1) + '. ' + item.subKpiName + '</label>' +
                '<input type="hidden" name="kpi-' + kpiId + '-kpiId" value="' + (kpiId || '') + '">' +
                '<input type="hidden" name="kpi-' + subKPIEntrysDTOId + '-subKPIEntrysDTOId" value="' + (subKPIEntrysDTOId || '') + '">' +
                '<input type="hidden" name="kpi-' + preferenceId + '-preferenceId" value="' + (preferenceId || '') + '">' +
                roleHtml +
                '</div>';

              container.innerHTML += html;
            });


            updateTotalScores();


            document.querySelectorAll('.kpi-radio').forEach(radio => {
              radio.addEventListener('change', updateTotalScores);
            });
          }
            },
            error: readErrorMsg,
          });
        }

        function updateTotalScores() {
          let selfScore = 0;
          let managerScore = 0;
          let consensualScore = 0;
          let totalItems = 0;

          // Count how many KPIs we have
          const kpiBlocks = document.querySelectorAll('.questionnaire-block');
          totalItems = kpiBlocks.length;

          // Calculate scores for each role
          ["self", "manager", "consensual"].forEach(role => {
            const selectedRadios = document.querySelectorAll('input[name^="kpi-"][name$="-' + role + '"]:checked');

            selectedRadios.forEach(radio => {
              const value = parseInt(radio.value);
              if (role == "self") {
                selfScore += value;
              } else if (role == "manager") {
                managerScore += value;
              } else if (role == "consensual") {
                consensualScore += value;
              }
            });
          });

          // // Calculate averages if there are items
          // if (totalItems > 0) {
          //     selfScore = (selfScore / totalItems).toFixed(2);
          //     managerScore = (managerScore / totalItems).toFixed(2);
          //     consensualScore = (consensualScore / totalItems).toFixed(2);
          // }

          console.log(selfScore, managerScore, consensualScore, "Scores");

          // Update the totals display
          const totalContainer = document.getElementById("kpi_performance_table_total");
          totalContainer.innerHTML =
            '<div class="header-col">Total</div>' +
            '<div class="header-col">Self - ' + selfScore + '</div>' +
            '<div class="header-col">Manager - ' + managerScore + '</div>' +
            '<div class="header-col">Consensual - ' + consensualScore + '</div>' +
            '<div class="header-col">' +
            '<button class="btn btn-generatePdf" title="Download">' +
            '<i class="fas fa-file-pdf-o"></i>' +
            '</button>' +
            '</div>';
        }



        //save api
        function saveKpiPerformance() {
          var currentEmp = $("#userPrincipal").val().trim()
          var subKPIEntries = [];
          var predfId = "";


          var blocks = document.querySelectorAll("#kpi_performance_table .questionnaire-block");



          blocks.forEach(function (block) {
            console.log(block, "blockData");
            var hiddenInput = block.querySelector('input[type="hidden"][name*="subKPIEntrysDTOId"]');
            if (!hiddenInput) return;

            var hiddenInputOne = block.querySelector('input[type="hidden"][name*="preferenceId"]');
            var hiddenInputTwo = block.querySelector('input[type="hidden"][name*="kpiId"]');

          
            var nameParts = hiddenInput.name.split('-');
            var subkpiId = nameParts[1]; 

            var nameParts1 = hiddenInputOne.name.split('-');
            var subkpiId1 = nameParts[1]; 

            var nameParts2 = hiddenInputTwo.name.split('-');
            var subkpiId2 = nameParts2[1];

            console.log(nameParts, subkpiId, "nameParts");

            // Now get the values using the correct ID
            var subKPIEntrysDTOId = subkpiId;
            var preferenceId = subkpiId1;
            predfId = preferenceId;

            console.log(subKPIEntrysDTOId, preferenceId, "subKPIEntrysDTOId");

            var subkpiName = block.querySelector('label.form-label').textContent.replace(/^\d+\.\s/, '').trim();
            const selfSelected = block.querySelector("input[name^='kpi-'][name*='self']:checked");
            const managerSelected = block.querySelector("input[name^='kpi-'][name*='manager']:checked");
            const consensualSelected = block.querySelector("input[name^='kpi-'][name*='consensual']:checked");

            const selfRating = selfSelected?.value || "--";
            const managerRating = managerSelected?.value || "--";
            const consensualRating = consensualSelected?.value || "--";
            subKPIEntries.push({
              "subkpiId": parseInt(subkpiId2),
              "subkpiName": subkpiName,
              "selfRating": parseInt(selfRating),
              "managerRating": parseInt(managerRating),
              "consensualRating": parseInt(consensualRating),
              "id": subKPIEntrysDTOId ? parseInt(subKPIEntrysDTOId) : null,
              "preferenceId": preferenceId ? parseInt(preferenceId) : null
            });
          });


          var selfTotal = 0, managerTotal = 0, consensualTotal = 0;
          subKPIEntries.forEach(entry => {
            selfTotal += entry.selfRating;
            managerTotal += entry.managerRating;
            consensualTotal += entry.consensualRating;
          });

          const payload = {
            "owner": currentEmp,
            "createdBy": currentEmp,
            "deptId": "",
            "scorecardId": $("#kpiscorecard").val(),
            "preferenceId": predfId ? parseInt(predfId) : null,
            "employeeDocuments": {
              "owner": currentEmp,
              "documentsValue": {
                "name": documentData.name ? documentData.name : "",
                "type": documentData.type ? documentData.type : "",
                "uploadedOn": new Date(),
                "size": documentData.size ? documentData.size : "",
                "file_value": documentData.file ? documentData.file : "",
              },
            },
            "performanceValue": {
              "comments": $("#comments").val(),
              "selfRatingTotal": selfTotal ? selfTotal.toString() : "0",
              "managerRating": managerTotal ? managerTotal.toString() : "0",
              "consensualRating": consensualTotal ? consensualTotal.toString() : "0",
              "preferenceId": predfId ? parseInt(predfId) : null
            },
            "subKPIEntrysList": subKPIEntries
          };

          console.log(payload, documentData, "payload");

          $.ajax({
            url: "/stratroom/web/saveSubkpiEntry",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: function (response) {
              console.log("Success:", response);
              $.notify("Success: Performance Contract saved successfully", {
                style: 'success',
                className: 'graynotify'
              });
              location.reload();
            },
            error: function (error) {
              console.error("Error:", error);
            }
          });
        }




        document.addEventListener("DOMContentLoaded", function () {
          document.addEventListener("click", async function (event) {
            if (!event.target.closest('.btn-generatePdf')) return;

            const scorecardSelect = document.querySelector(".persp_status");
            const scorecardValue = scorecardSelect?.value || "";
            if (!scorecardValue) {
              alert("Please select a Scorecard before downloading.");
              return;
            }

            const enqName = "Chris";
            const email = "Chris@demo.com";
            const submissionDate = new Date().toLocaleDateString();
            const score = `${scorecardSelect.options[scorecardSelect.selectedIndex].text}` || "--";

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const marginLeft = 10;
            const marginRight = pageWidth - marginLeft;

            const coverImage = "https://stratroom.io/assets/images/diagnostic-cover.jpeg";
            const logoUrl = "https://stratroom.io/assets/images/logo.jpg";

            // Utility
            const addFullPageImage = (imageUrl) => {
              doc.addImage(imageUrl, 'JPEG', 0, 0, pageWidth, pageHeight);
              doc.addPage();
            };

            const header = () => {
              const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
              const textStartY = imgY + 5;

              doc.addImage(logoUrl, "JPEG", imgX, imgY, imgWidth, imgHeight);
              doc.setFontSize(13);
              doc.setFont("helvetica", "bold");
              doc.text("Performance Contract Report", marginRight, textStartY - 3, { align: "right" });

              doc.setFont("helvetica", "normal");
              doc.setFontSize(9);
              doc.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
              doc.text(`Generated By: ${enqName} | Scorecard: ${score}`, marginRight, textStartY + 10, { align: "right" });

              doc.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
              return imgHeight + 20;
            };

            const footer = () => {
              const currentYear = new Date().getFullYear();
              doc.setFontSize(8);
              doc.text(`Copyright © ${currentYear}, StratRoom. All Rights Reserved.`, pageWidth / 2, 292, { align: "center" });
              doc.line(10, pageHeight - 12, pageWidth - 10, pageHeight - 12);
            };

            // Add Cover
            addFullPageImage(coverImage);

            // Main Header
            let y = header();

            // == Build Table Data ==
            let tableBody = [];
            let selfTotal = 0;
            let managerTotal = 0;
            let consensualTotal = 0;

            const blocks = document.querySelectorAll(".questionnaire-block");

            if (blocks.length == 0) {
              alert("No KPI questions found. Please complete the form first.");
              return;
            }

            blocks.forEach((block, index) => {
              const kpiTitle = block.querySelector("label.form-label")?.innerText?.trim() || `KPI ${index + 1}`;

              const selfSelected = block.querySelector("input[name^='kpi-'][name*='self']:checked");
              const managerSelected = block.querySelector("input[name^='kpi-'][name*='manager']:checked");
              const consensualSelected = block.querySelector("input[name^='kpi-'][name*='consensual']:checked");

              const selfValue = selfSelected?.value || "--";
              const managerValue = managerSelected?.value || "--";
              const consensualValue = consensualSelected?.value || "--";

              if (!selfSelected && !managerSelected && !consensualSelected) {
                return; // Skip if no selections
              }

              if (selfSelected) selfTotal++;
              if (managerSelected) managerTotal++;
              if (consensualSelected) consensualTotal++;

              tableBody.push([
                (index + 1).toString(),
                kpiTitle,
                selfValue,
                managerValue,
                consensualValue
              ]);
            });

            if (tableBody.length == 0) {
              alert("No KPI selections found. Please fill in the form before exporting.");
              return;
            }


            doc.autoTable({
              head: [["#", "KPI", "SELF", "MANAGER", "CONSENSUAL"]],
              body: tableBody,
              startY: y,
              margin: { top: y, bottom: 20 },
              styles: { fontSize: 9, cellPadding: 2 },
              headStyles: { fillColor: [40, 100, 150], textColor: 255 }
            });

            // == Totals Row ==
            doc.autoTable({
              startY: doc.lastAutoTable.finalY + 5,
              body: [
                ["", "Total", selfTotal.toString(), managerTotal.toString(), consensualTotal.toString()]
              ],
              styles: { fontStyle: "bold", fontSize: 10 },
              theme: "grid",
              margin: { left: 14 }
            });


            footer();

            // Save PDF
            doc.save(`Performance_Contract_Report_${submissionDate}.pdf`);
          });
        });



        //file upload
        


      </script>





    </body>