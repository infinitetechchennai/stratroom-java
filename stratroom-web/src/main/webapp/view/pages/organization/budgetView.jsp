<!DOCTYPE html>
<html lang="en" dir="ltr">
  <%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stratroom</title>
   
 

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

  <!-- <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>  -->
<style>
    .tdSelect{
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.3rem;
        color:var(--stratroom-table-color);
        font-weight: 400;
        font-size: 12px;
        /* padding: 0.375rem 0.75rem;
        padding-left: 8px;
        padding-right: 8px;*/
        /* border: 1px solid rgba(var(--stratroom-black-rgb),0.04);  */
    }
   
   
.select2-multiple-dropdown .select2-results__option{
    display: flex;
}
.select2-multiple-dropdown .select2-results__option:before {
  content: "";
  display: inline-block;
  position: relative;
  height: 16px;
  width: 16px;
  flex: 0 0 16px;
  border: 2px solid #e9e9e9;
  border-radius: 4px;
  background-color: #fff;
  margin-right: 8px;
  vertical-align: middle;
}


.select2-multiple-dropdown  .select2-results__option--selected:before {
  font-family:fontAwesome;
  content: "\f00c";
  color: var(--stratroom-primary);
  /* background-color: #f77750; */
  border: 0;
  display: inline-flex;
align-items: center;
justify-content: center;
}



 /* Hide the individual remove (×) buttons */
 .select2-container--default  .select2-selection--multiple.custom-multiple .select2-selection__choice__remove {
  display: none !important;
}

/* Hide the clear all button */
.select2-container--default  .select2-selection--multiple.custom-multiple .select2-selection__clear {
  display: none !important;
}

/* Optional: Style the selected items like badges */
.select2-container--default  .select2-selection--multiple.custom-multiple .select2-selection__rendered{
     display: flex;
     max-width: 100%;        /* Limit width */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;   /* Ensure it's treated as a box */
  vertical-align: middle;
  margin: 0;
}
.select2-container--default  .select2-selection--multiple.custom-multiple .select2-selection__choice {
  background-color: transparent;
  border: 0;
  /* color: white; */
  border-radius: 0;
  padding: 0;
  font-size: 11px;
  margin: 0;
}

.select2-container--default  .select2-selection--multiple.custom-multiple  .select2-selection__choice__display {
  padding-left: 0 !important;
}



.select2-container--default .select2-selection--multiple.custom-multiple  .select2-selection__choice__display {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}




</style>


</head>
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<body data-bs-theme="light">



     <div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>

	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
    <main class="pt-2 pb-2">
        <c:if test="${pageId != null}">
          <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out
        value=" ${pageId}" />">
        </c:if>
          <c:if test="${principal != null}">
            <input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="${principal.profile.empId}" />">
        </c:if>
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/budget-i.svg" alt="Budget" title="Budget">
                        </span>
                        <span data-translate="title">Budgets</span>
                    </h4>
                </div>
                <div class="load-page page-actions g-col-4">
                    <div class="page-icons">
                        <ul>
                            <li style="display:none;">
                                
                                <a href="#" id="popoverFilterStatus">
                                <span type="button" class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Filter">                                    
                                
                                    <img src="/stratroom/images/filter-i.svg" width="12" height="12" alt="Filter">
                                  </span>
                                </a>
                            </li>
                            <select id="approvedDraft" style="display: none;">
                            <option value="APPROVED" data-translate="Approved">Approved</option>
                            <option value="DRAFT" data-translate="Draft">Draft</option>
                            </select>
                                    <input type="hidden" id="changeId" name="changeId" value="">
                            <!-- <li>
                                
                                <a href="#" id="popoverFiltertableHead">
                                <span type="button" class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Filter">                                    
                                
                                    <i class="fas fa-eye"></i>
                                  </span>
                                </a>
                            </li> -->
                            <!-- <li>
                                
                                <a >
                                <span type="button" class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Guidelines" data-bs-target="#lcapopup">                                    
                                
                                     <i data-lucide="book-text" style="width: 14px; height: 14px;"></i>
                                  </span>
                                </a>
                            </li> -->

                              <li>

                                <a href="#" >
                                    <span class="icon" data-toggle="modal" data-target="#lcapopup">
                                    <i data-lucide="book-text" style="width: 14px; height: 14px;"></i>
                                </span>
                                </a>
                            </li>
                            <li>

                                <a href="#" >
                                    <span class="icon" data-toggle="modal" data-target=".file_upload_popup">
                                    <img src="/stratroom/images/import-i.svg" width="12" height="12" alt="export" title="export">
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="budgetexceldownloadlink" id="OpenImgUploadExport">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Export" id="OpenImgUploadExport">
                                    <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="" title="">
                                </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div class="container-lg py-2">
                <div class="card custom-card table-card">
                    <div
                        class="card-header">
                        <div class="c-header-left">
                            <h5 class="card-title">
                                <strong editable="true" contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)">Budgets</strong>
                            </h5>
                        </div>
                        <div class="card-actions">
                            <button type="button" class="btn btn-sm btn-icon" onclick="sendApprovalOnce(this)">
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Approval">
                                  <i class="fas fa-check"></i>
                                </span>
                              </button>
                            
                            <button type="button" class="btn btn-sm btn-icon" id="addRowButton">
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                  <i class="fas fa-plus"></i>
                                </span>
                              </button>
                        </div>
                      
                       
                    </div>
                    <div class="card-body" style="margin-left: 10px;">
                     


                        <table id="budgetTable" class="table table-sm table-bordered w-100" style="width:100%; --stratroom-border-color: rgba(var(--stratroom-black-rgb),0.04);" >
                            <thead>
                             <tr class="text-center">
  <th rowspan="2" class="align-middle" data-translate="SI.No">SI.No</th>
  <th width="80" style="min-width: 80px; background-color: rgb(247, 197, 208);" data-translate="Year">Year</th>
  <th width="120" style="min-width: 120px; background-color: rgb(215, 205, 232);" data-translate="Month">Month</th>
  <th width="80" style="min-width: 80px; background-color: rgb(182, 224, 224);" data-translate="Version">Version</th>
  <th width="100" style="min-width: 100px; background-color: rgb(252, 213, 181);" data-translate="GL Account">GL Account</th>
  <th width="200" style="min-width: 200px; background-color: rgb(248, 181, 164);" data-translate="GL Name">GL Name</th>
  <th width="120" style="min-width: 120px; background-color: rgb(174, 220, 192);" data-translate="Budget Type">Budget Type</th>
  <th width="300" style="min-width: 200px; background-color: rgb(229, 182, 201);" data-translate="Project / Initiative">Project / Initiative</th>
  <th width="200" style="min-width: 200px; background-color: rgb(253, 227, 155);" data-translate="Outcome">Outcome</th>
  <th width="200" style="min-width: 200px; background-color: rgb(197, 222, 221);" data-translate="Objective">Objective</th>
  <th width="300" style="min-width: 200px; background-color: rgb(255, 224, 172);" data-translate="Sub Initiative">Sub Initiative</th>
  <th width="300" style="min-width: 200px; background-color: rgb(255, 207, 210);" data-translate="Activity">Activity</th>
  <th width="300" style="min-width: 200px; background-color: rgb(226, 240, 203);" data-translate="Sub Activity">Sub Activity</th>
  <th width="80" style="min-width: 80px; background-color: rgb(195, 214, 243);" data-translate="Currency">Currency</th>
  <th width="100" style="min-width: 100px; background-color: rgb(229, 212, 237);" data-translate="No of Days/Qty">No of Days/Qty</th>
  <th width="100" style="min-width: 100px; background-color: rgb(255, 218, 185);" data-translate="Unit Amount">Unit Amount</th>
  <th width="100" style="min-width: 100px; background-color: rgb(208, 230, 165);" data-translate="Total Budget">Total Budget</th>
  <th width="300" style="min-width: 200px; background-color: rgb(224, 195, 252);" data-translate="Department">Department</th>
  <th width="300" style="min-width: 200px; background-color: rgb(181, 234, 215);" data-translate="Employee">Employee</th>
  <th width="300" style="min-width: 200px; background-color: rgb(255, 241, 193);" data-translate="Notes">Notes</th>
  <th rowspan="2" class="align-middle" data-translate="Action">Action</th>
</tr>

                              <tr>
                                <th class="text-center" style="min-width: 80px; background-color: rgb(247, 197, 208); width: 80px;" ></th>
                                <th class="text-center" style="min-width: 120px; background-color: rgb(215, 205, 232); width: 120px;"></th>
                                <th  class="text-center" style="min-width: 80px; background-color: rgb(182, 224, 224); width: 80px;"></th>
                                <th class="text-center" style="min-width: 100px; background-color: rgb(252, 213, 181); width: 100px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(248, 181, 164); width: 200px;"></th>
                                <th class="text-center" style="min-width: 120px; background-color: rgb(174, 220, 192); width: 120px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(229, 182, 201); width: 214.844px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(253, 227, 155); width: 207px;"> </th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(197, 222, 221); width: 222px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(255, 224, 172); width: 272.844px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(255, 207, 210); width: 200px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(226, 240, 203); width: 284.844px;"></th>
                                <th class="text-center" style="min-width: 80px; background-color: rgb(195, 214, 243); width: 80px;"></th>
                                <th class="text-center" style="min-width: 100px; background-color: rgb(229, 212, 237); width: 172.609px;"></th>
                                <th class="text-center" style="min-width: 100px; background-color: rgb(255, 218, 185); width: 100px;"></th>
                                <th class="text-center" style="min-width: 100px; background-color: rgb(208, 230, 165); width: 100px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(224, 195, 252); width: 200px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(181, 234, 215); width: 200px;"></th>
                                <th class="text-center" style="min-width: 200px; background-color: rgb(255, 241, 193); width: 200px;"></th>
                               
                               
                               
                        
                            </tr>
                            </thead>
                            <tbody>
                              <!-- Add rows here dynamically or statically -->
                            </tbody>
                          </table>
                          


                       
                      
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

<div class="floating-box shadow-sm">
        <a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg" width="18"
                    height="18" alt="organization"></span></a>
        <a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
                    height="18" alt="organization"></span></a>
    </div>


    <!--  create-template modal :::::::::::::::::::::::::::::::::::::::: -->

      

    <div class="modal fade" id="add-event-database" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title fs-5">Risk Event Database</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="sub_initative_Form">
                        <div class="row g-3">
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Risk Code</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Type of Event</label>
                                    <select class="form-control form-select">
                                        <option>Select</option>
                                        <option>/Near Miss Event</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Incident</label>
                                    <textarea class="form-control" rows="5"></textarea>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Date of Incident</label>
                                    <input type="date" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="kpi_fields" class="form-label">The Cause of the Incident</label>
                                <div class="inline-checbox-wrapper">
                                    <div class="inline-checbox-two-column">
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Category</label>
                                        </div>
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Description</label>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    People
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Tools
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Procedure
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    External
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Etc
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="kpi_fields" class="form-label">The Cause of the Incident</label>
                                <div class="inline-checbox-wrapper">
                                    <div class="inline-checbox-three-column">
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Category</label>
                                        </div>
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Description</label>
                                        </div>
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Impact Level</label>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Financial
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Service
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Reputation
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Strategic
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Law
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Corrective Action</label>
                                    <textarea class="form-control" rows="5"></textarea>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Risk Mitigation (Corrective
                                        Action)</label>
                                    <textarea class="form-control" rows="5"></textarea>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Event Status</label>
                                    <select id="attachment" name="attachment" class="form-control form-select">
                                        <option>Select</option>
                                        <option>Open</option>
                                        <option>Close</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="sub_initative_desc" class="form-label">Inventor/Reporter</label>
                                    <select id="attachment" name="attachment" class="form-control form-select">
                                        <option>Select</option>
                                        <option>EKU</option>
                                        <option>KEA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary  initative_save_btn" value="Save">Save
                    </button>
                    <div class="modal-audit">
                        <h5 class="title">
                            Audit
                        </h5>
                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div class="text">Arun</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div class="text">Karthik</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


     <!-- File Validate Form -->
<div class="modal fade file_upload_popup" id="file-validate-form"
tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-lg">
  <div class="modal-content">
    <div class="modal-header">
      <h4 data-i18n="File Upload">File Upload</h4>
      <button type="button" class="close pull-right" data-dismiss="modal">
        &times;</button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <ul class="form-progressbar">
            <li>Upload</li>
            <li>Validation</li>
            <li>Import</li>
          </ul>
        </div>
        <div class="col-md-12">
          <hr />
        </div>
      </div>

      <div class="row" id="file-upload">
        <div class="col-md-12">
          <div class="form-group">
            <label class="control-label">Upload File</label>
            <div class="preview-zone hidden">
              <div class="box box-solid">
                <div class="box-body"></div>
              </div>
            </div>
            <div class="dropzone-wrapper">
              <div class="dropzone-desc">
                <i class="fas fa-file-upload" style="font-size: 20px;"></i>
                <p>Choose a file or drag it here.</p>
              </div>
              <input type="file" name="img_logo" class="dropzone"
                accept=".xlsx, .xls, .csv" />
            </div>
            <span id="fileerrorshow" style="color: red; display: none"></span>
          </div>
        </div>
        <div class="col-md-12">
          <hr />
        </div>
        <div class="col-md-12">
          <div class="form-line right">
            <button class="initative_save_btn" id="next-btn-1"
              style="font-weight: 600;">Next</button>
          </div>
        </div>
      </div>

      <div class="row" id="file-validate" style="display: none;">
        <div class="col-md-12 img-center">
          <img id="imagevalidate" src="images/Not-Verified.png"
            alt="Not-Verified" />
          <div class="error-div">
            <table class="error-table">
              <thead>
                <tr>
                  <th style="width: 150px; text-align: center;">SheetName</th>
                  <!-- <th style="width: 150px; text-align: -webkit-center;">Owner</th> -->
                  <th style="width: 150px; text-align: center;">Row-Number</th>
                  <th style="width: 150px; text-align: center;">CellName</th>
                  <th style="width: 250px; text-align: center;">Reason</th>
                </tr>

              </thead>
              <tbody class="uploadvalidationSuccess">
                <!-- <tr>
                  <td style="width: 150px;">1</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">3</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">5</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">8</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">10</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">19</td>
                  <td>Contain Special Character</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-12">
          <hr />
        </div>
        <div class="col-md-12">
          <div class="form-line" id="validateImportHide">
            <!-- <button type="button" class="btn-default1 btn" id="prev-btn1"
                  style="font-weight: 600;">Previous</button>
                <button class="initative_save_btn pull-right" id="next-btn-2"
                  style="font-weight: 600;">Next</button> -->
          </div>
        </div>
      </div>

      <div class="row" id="file-save" style="display: none;">
        <div class="col-md-12">
          <div class="col-md-12 img-center">
            <img src="images/Success.png" alt="Verified" />
            <span id="statisticmessage" style="text-align: center; margin-left: 42% !important; color :green; width: 100%; margin-right: 25% !important;"></span>							
            <div class="error-div">
              <table class="error-table">
                <thead>
                  <tr>
                    <th style="width: 300px; text-align: center;">
                      Statististics</th>
                    <th style="width: 300px; text-align: center;">Message</th>
                  </tr>

                </thead>
                <tbody class="uploadStatististics">
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <hr />
        </div>
        <div class="col-md-12">
          <div class="form-line">
            <button type="button" class="btn-default1 btn" id="prev-btn2"
              style="font-weight: 600;">Previous</button>
            <button class="initative_save_btn pull-right" id="done-btn"
              style="font-weight: 600;" data-dismiss="modal"
              aria-label="Close">Done</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</div>


<div class="modal fade" id="lcapopup"
tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-lg">
  <div class="modal-content">
    <!-- <div class="modal-header">
      <h4 data-i18n="File Upload">File Upload</h4>
      <button type="button" class="close pull-right" data-dismiss="modal">
        &times;</button>
    </div> -->
    <div class="modal-body">
       <div class="container-lg py-4">
            <div class="card custom-card mx-auto" style="max-width: 700px;">
               
                <div class="card-body p-3">

                    <div class="card-header text-center p-3 bg-primary rounded mb-4">
                        <h5 class="card-title h4 mb-3" style="color: var(--stratroom-card-title-color);">Budget
                            Projections, Assumptions & Guidelines</h5>
                        <div class="card-actions d-flex justify-content-center gap-1">
                            <div class="heat-map">
                                <input type="text" class="form-control form-control-sm  date-range-picker" name=""
                                    id="pipStartDate" placeholder="Period">
                            </div>
                            <button class="btn btn-sm btn-icon border-0">
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
                                    <i data-lucide="file-up" style="width: 14px; height: 14px;"></i>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div class="grid gap-3">

                        <div class="g-col-12 grid gap-3">

                            
                            <div class="g-col-12">
                                <div class="questionnaire-block">
                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Inflation projections</label>

                                    </div>
                                    <table id="inflationProjectionsTable"
                                        class="table align-middle table-bordered w-100 tableScrollTable">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th width="50%"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td width="50%">The inflation is projected to</td>
                                                <td width="50%">
                                                    <div class="input-group">
                                                        <input type="number" class="form-control" placeholder="0"
                                                            min="0" step="0.1">
                                                        <span class="input-group-text">%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        <tbody>
                                    </table>
                                </div>
                            </div>


                            

                            <div class="g-col-12">
                                <div class="questionnaire-block">


                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Exchange Rate projections</label>

                                    </div>
                                    <table id="exchangeRateProjectionsTable"
                                        class="table align-middle table-bordered w-100 tableScrollTable">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th width="50%"></th>
                                            </tr>
                                        </thead>

                                        <tr>
                                            <td width="50%">The exchage rates are expected to increase by</td>
                                            <td width="50%">
                                                <div class="input-group">
                                                    <input type="number" class="form-control" placeholder="0" min="0"
                                                        step="0.1">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </td>
                                        </tr>


                                    </table>



                                </div>
                            </div>
                            <div class="g-col-12">
                                <div class="questionnaire-block">


                                    <table id="performanceTable" class="table table-bordered w-100 tableScrollTable">
                                        <thead>
                                            <tr>
                                                <th>Foreign Currency</th>
                                                <th>Exchange Rates</th>
                                                <th>Inflationary Adjustment</th>
                                                <th>Projected</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>USD</td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                            <tr>
                                                <td>CHF</td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                            <tr>
                                                <td>GBP</td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                            <tr>
                                                <td>Euro</td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>


  <div class="g-col-12">
                                        <div class="questionnaire-block">
                                            <div class="form-group">
                                                <label for="cateringCharges" data-i18n="cateringCharges"
                                                    class="form-label">Catering Charges</label>
                                            </div>



                                            <table id="cateringChargesTable" class="table table-bordered w-100">
                                                <thead>
                                                    <tr>
                                                        <th>Inhouse catering takes a minimum of 10 People</th>
                                                        <th>Current</th>
                                                        <th>Projected</th>
                                                        <th class="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Food, drinks & water</td>
                                                        <td>250</td>
                                                        <td>264</td>
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
                                                      <tr>
                                                        <td>finger lunch, drink & water</td>
                                                        <td>250</td>
                                                        <td>264</td>
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
                                                     <tr>
                                                        <td>Tea</td>
                                                        <td>180</td>
                                                        <td>190</td>
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
                                                      <tr>
                                                        <td>Hall Hire</td>
                                                        <td>2500</td>
                                                        <td>2633</td>
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
                                                <button id="addCateringChargesRowBtn" class="btn btn-sm btn-success mt-2"> <i class="fas fa-plus"></i>Add More</button>
                                            </div>

                                        </div>
                                    </div>
                            

                            <div class="g-col-12">
                                <div class="questionnaire-block">
                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Accommodation & Local subsistance
                                            allowance</label>
                                    </div>



                                    <table id="accommodationTable"
                                        class="table align-middle table-bordered w-100">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                                <th></th>
                                                 <th class="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td width="50%">Local accomodation outside Maseru</td>
                                                <td>1150</td>
                                                <td>1211</td>
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
                                            <tr>
                                                <td width="50%">Subsistance while sleeping over</td>
                                                <td>500</td>
                                                <td>526.5</td>
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
                                            <tr>
                                                <td width="50%">Subsistance while a day trip</td>
                                                <td>180</td>
                                                <td>189.54</td>
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
                                        <button id="addAccommodationRowBtn" class="btn btn-sm btn-success mt-2">
                                            <i class="fas fa-plus"></i>Add More</button>
                                    </div>

                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">
                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Deperection Policy</label>
                                        <p>Assets are depreciated on a straight line basis from the first day of
                                            use</p>
                                    </div>



                                    <table id="deperectionPolicyTable"
                                        class="table align-middle table-bordered w-100">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                                 <th class="text-end">Action</th>
                                            </tr>

                                        <tbody>
                                            <tr>
                                                <td width="50%">Fixtures & Fittings</td>                                               
                                                <td>20%</td>
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
                                            <tr>
                                                <td width="50%">Office Equipment</td>
                                                <td>20%</td>
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
                                            <tr>
                                                <td width="50%">Computer Equipment</td>
                                                <td>33%</td>
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
                                            <tr>
                                                <td width="50%">Monitoring Equipment</td>
                                               <td>17%</td>
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
                                            <tr>
                                                <td width="50%">Motor Vehicles</td>
                                               <td>25%</td>
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
                                            <tr>
                                                <td width="50%">Office Furniture</td>
                                                <td>20%</td>
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
                                            <tr>
                                                <td width="50%">Office Building</td>
                                                <td>4%</td>
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
                                            <tr>
                                                <td width="50%">Mobile Communication device</td>
                                             <td>50%</td>
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
                                        <button id="addDeperectionPolicyRowBtn" class="btn btn-sm btn-success mt-2">
                                            <i class="fas fa-plus"></i>Add More</button>
                                    </div>

                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">

                                    <table id="performanceTable"
                                        class="table align-middle table-bordered w-100 tableScrollTable">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td width="50%">Assumptions</td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                        </tbody>

                                    </table>
                                   

                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">
                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Revenue</label>

                                    </div>



                                    <table id="revenueTable"
                                        class="table align-middle table-bordered w-100">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                                 <th class="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td width="50%">Increase/uptake in data consumption</th>
                                                <td>5.3%</td>
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
                                            <tr>
                                                <td width="50%">Annual License fees</td>
                                                <td></td>
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
                                            <tr>
                                                <td width="50%">New application fees</td>
                                                <td></td>
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
                                            <tr>
                                                <td width="50%">unified licenses</td>
                                                <td>220000</td>
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
                                            <tr>
                                                <td width="50%">content broadcasting</td>
                                                <td>13500</td>
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
                                            <tr>
                                                <td width="50%">Radio allocation</td>
                                                <td>2000</td>
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
                                            <tr>
                                                <td width="50%">LISNIC Revenue</td>
                                                <td>290745</td>
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
                                            <tr>
                                                <td width="50%">Rent increase of 5 months</td>
                                                <td>266928</td>
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
                                            <tr>
                                                <td width="50%">Increased spectrum uptake for point to point
                                                    links
                                                    (600KHz)</td>
                                                <td>840000</td>
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
                                        <button id="addRevenueRowBtn" class="btn btn-sm btn-success mt-2">
                                            <i class="fas fa-plus"></i>Add More</button>
                                    </div>
                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">

                                    <table id="performanceTable" class="table align-middle table-bordered w-100">


                                        <tr>
                                            <th width="50%">Target effeciency ratio ( OPEX to Income Ratio)</th>
                                            <td><input type="text" class="form-control"></td>
                                        </tr>


                                    </table>


                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">
                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Expenditure</label>

                                    </div>

                                    <table id="expenditureTable"
                                        class="table align-middle table-bordered w-100">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                                 <th class="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td width="50%">Staff salaries - Inflationary increase
                                                </td>
                                                <td>5.3%</td>
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
                                            <tr>
                                                <td width="50%">Staff compliment & staff airtime adjustments
                                                </td>
                                                <td></td>
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
                                            <tr>
                                                <td width="50%">Training (both online and onsite)</td>
                                                <td></td>
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
                                            <tr>
                                                <td width="50%">Insurance</td>
                                                <td>5.3%</td>
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
                                        <button id="addExpenditureRowBtn" class="btn btn-sm btn-success mt-2">
                                            <i class="fas fa-plus"></i>Add More</button>
                                    </div>

                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">
                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Limit/Threshhold for personal costs</label>

                                    </div>



                                    <table id="limitTable"
                                        class="table align-middle table-bordered w-100 tableScrollTable">

                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td width="50%">Personnel costs should not exceed 60% of the
                                                    projected revenue
                                                </td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                        </tbody>

                                    </table>


                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">
                                    <div class="form-group">
                                        <label for="areasofConcern" data-i18n="areasofConcern"
                                            class="form-label">Capital expenditure(CAPEX)</label>

                                    </div>



                                    <table id="capexTable"
                                        class="table align-middle table-bordered w-100 tableScrollTable">
                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td width="50%">CAPEX should atleast be 10% of total expenditure
                                                </td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                        </tbody>

                                    </table>


                                </div>
                            </div>

                            <div class="g-col-12">
                                <div class="questionnaire-block">




                                    <table id="performanceTable"
                                        class="table align-middle table-bordered w-100 tableScrollTable">

                                        <thead class="d-none">
                                            <tr>
                                                <th width="50%"></th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td width="50%">Contingency (% of Total Cost)</td>
                                                <td><input type="text" class="form-control"></td>
                                            </tr>
                                        </tbody>

                                    </table>


                                </div>
                            </div>

                        </div>













                    </div>
                </div>
                <div class="card-footer text-center">
                    <button type="button" class="btn btn-label-secondary px-4">
                        Edit
                    </button>
                    <button class="btn btn-primary px-4" value="Save">Save</button>
                </div>
            </div>
        </div>

    </div>
  </div>
</div>
</div>
<!-- END File Validate Form -->	
 <!-- File Upload Success PopUp Start -->

<div class="modal fade upLoadBudgetSuccessModal"  role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
                <div class="modal-header">
                        <h6 class="modal-title" id="myLargeModalLabel">Success!</h6>
                        <button type="button" class="close fileuploadclose"
                            data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body" id="budgetSuccess" style="overflow-x: scroll;" >

                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
                </div>

          </div>
    </div>
</div>

<link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />

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
    <script src="${contextroot}/js/jquery-ui.min.js"></script>
    <script src="js/moment.js"></script>
    <script src="js/pages/animated.js"></script>
    <script src="js/jquery.editable.min.js"></script>
    <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery-resize.js"></script>
    <script src="js/datepickerair.js"></script>
    <script src="js/datepicker.en.js"></script>
    <script src="${contextroot}/js/widgets.js"></script>
    <script src="${contextroot}/js/notify.js"></script>
    <script src="js/initial.js"></script>
	<script src="js/custom/jquery.orgchart.js"></script>
	<script src="js/custom/org_structure.js"></script>
    <script src="${contextroot}/js/select2.min.js"></script>



    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <link href="assets/css/select2.min.css" rel="stylesheet" />
    <script src="${contextroot}/js/select2.min.js"></script>
    <script src="${contextroot}/js/budgetVew.js"></script>


    <script>
        // Popover content
        // const popoverTrigger = document.getElementById('popoverFilterStatus');
        // new bootstrap.Popover(popoverTrigger, {
        //   html: true,
        //   placement: 'bottom',
        //   content: `
        //     <div>
        //       <div class="d-flex justify-content-between align-items-center mb-2">
        //         <h5 class="h6 mb-0">Filter Status</h5>
        //         <button type="button" class="btn-close" aria-label="Close"></button>
        //       </div>
        //       <div class="d-flex flex-column gap-2 pageViewOption">   
                
        //         <div class="form-check">
        //           <input class="form-check-input filter-status" id="status-approved" type="checkbox" value="Approved">
        //           <label class="form-check-label" for="status-approved">Approved</label>
        //         </div>
        //         <div class="form-check">
        //           <input class="form-check-input filter-status" id="status-draft" type="checkbox" value="Draft">
        //           <label class="form-check-label" for="status-draft">Draft</label>
        //         </div>
                
        //       </div>
        //     </div>
        //   `,
        //   sanitize: false
        // });
    
        // Close popover on close button click
        document.addEventListener('click', function (event) {
          if (event.target.classList.contains('btn-close')) {
            bootstrap.Popover.getInstance(popoverTrigger)?.hide();
          }
        });
    
      </script>













    <!-- language-translation :::::::::::::::::::::::::::::::::::::::::::::::::::: -->

    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        }
    </script>

    <script type="text/javascript"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

    <!-- language-translation-end :::::::::::::::::::::::::::::::::::::::::::::::::::: -->


      <script>
//   let urlparams 			= (new URL(document.location)).searchParams;
//   let changeIDurl 		= 	urlparams.get("changeId");

//   if(changeIDurl){
//     console.log(changeIDurl, "changeIDurlGanesh");
//     document.getElementById("changeId").value = changeIDurl;
//   }

//   console.log(urlparams, changeIDurl ,"changeIDurl in download");
var pgNo=$("#pagenumber").val();
  var budgetStatus = $("#approvedDraft").val();
    if (pgNo != "") {
      console.log("sucess");
	$(".budgetexceldownloadlink").attr("href", "/stratroom/downloadBudgetDetails?pageId="+pgNo+"&status="+budgetStatus);
  console.log("done");
} else {
  console.log(" not sucess");
	$(".budgetexceldownloadlink").attr("href", "#");
	$(".budgetexceldownloadlink").removeAttr("target");
}
    $(".modal-dialog").draggable({
      handle: ".modal-header",
    });

    $.fn.select2.amd.define(
      "SearchableSingleSelection",
      [
        "select2/utils",
        "select2/selection/single",
        "select2/selection/eventRelay",
        "select2/dropdown/search",
      ],
      function (Utils, SingleSelection, EventRelay, DropdownSearch) {
        var adapter = Utils.Decorate(SingleSelection, DropdownSearch);
        adapter = Utils.Decorate(adapter, EventRelay);

        adapter.prototype.render = function () {
          var $rendered = DropdownSearch.prototype.render.call(
            this,
            SingleSelection.prototype.render
          );

          this.$searchContainer.hide();
          this.$element
            .siblings(".select2")
            .find(".selection")
            .prepend(this.$searchContainer);

          return $rendered;
        };

        var bindOrigin = adapter.prototype.bind;
        adapter.prototype.bind = function (container) {
          var self = this;

          bindOrigin.apply(this, arguments);

          container.on("open", function () {
            self.$selection.hide();
            self.$searchContainer.show();
          });

          container.on("close", function () {
            self.$searchContainer.hide();
            self.$selection.show();
          });
        };

        return adapter;
      }
    );

    /*
     * A select2 adapter to show simple dropdown list without a searchbox inside
     */
    $.fn.select2.amd.define(
      "UnsearchableDropdown",
      [
        "select2/utils",
        "select2/dropdown",
        "select2/dropdown/attachBody",
        "select2/dropdown/closeOnSelect",
      ],
      function (Utils, Dropdown, AttachBody, CloseOnSelect) {
        var adapter = Utils.Decorate(Dropdown, AttachBody);
        adapter = Utils.Decorate(adapter, CloseOnSelect);
        return adapter;
      }
    );
  </script>
<script>
  
    function sendApprovalOnce(button) {
          if (!button.disabled) {
            button.disabled = true; // Disable the button to prevent multiple clicks
            sendApproval(); // Call your function
          }
        }
        function sendApproval() {

          var id = $("#changeId").val();
          var requestData = {
            status: "IN PROGRESS"
          };

          $.ajax({
            url: "/stratroom/api/workflowevents/" + id + "/action",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function (response) {
              location.reload(true);
            }
          });
        }

        function upLoadPopUp(event) {
          event.preventDefault();
          $(".file_upload_popup").modal("show");
        }
</script>


</body>

</html>