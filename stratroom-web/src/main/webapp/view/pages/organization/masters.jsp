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

          <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
   
            </head>

            <body class="light">
                <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
                <input type="hidden" class="selectedvalue">
                <input type="hidden" class="selectedname">
                <input type="hidden" class="selectedpersonvalue">
                <input type="hidden" class="selectedpersonname">
                <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
                	  <jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
                <!-- Share Modal -->
                <div id="share-popup" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-lg" style="margin-top: 10%">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4>Share</h4>
                                <button type="button" class="close pull-right" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12 form-group">
                                        <label for="Department" data-i18n="Departments">Departments</label>
                                        <select class="dept-multi-select" name="states[]" multiple="multiple">
                                            <option value="971">Human Resource</option>
                                            <option value="972">Designer</option>
                                            <option value="973">Developer</option>
                                            <option value="973">Tester</option>
                                            <option value="973">Manager</option>
                                            <option value="973">Marketing</option>
                                        </select>
                                    </div>

                                    <div class="col-12 form-group">
                                        <label for="Department">Users</label>
                                        <select class="user-multi-select" name="states[]" multiple="multiple">
                                            <option value="972">Yasir Patton</option>
                                            <option value="973">Zander Bonner</option>
                                            <option value="973">Sila Redmond</option>
                                            <option value="973">Jayden Ortega</option>
                                            <option value="973">Milan Potts</option>
                                            <option value="973">Ernest Best</option>
                                        </select>
                                    </div>

                                    <div class="co-md-12">
                                        <label for="kpi_fields" class="ml-4">Access </label>
                                        <ul class="d-flex flex-row flex-wrap ml-4 mt-1">
                                            <li>
                                                <div class="form-check">
                                                    <div class="form-check">
                                                        <label class="form-check-label">
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            View
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
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            Create
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
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            Edit
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
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            Delete
                                                            <span class="form-check-sign">
                                                                <span class="check"></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <hr />
                                    </div>
                                    <div class="col-12">
                                        <div class="form-line right">
                                            <button type="button" class="btn-default1 btn" data-dismiss="modal"
                                                aria-label="Close"  data-i18n="Cancel">
                                                Cancel
                                            </button>
                                            <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

          <div id="deleteModaldashboard" class="modal fade">
                    <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Delete</h4>
                                <button type="button" class="close" data-dismiss="modal"
                                    aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <h5 class="confirm-modal-content" data-translate="Do you really want to delete?">Do you really want to delete?</h5>
                                <br>
                                <div class="form-line right">
                                    <input type="hidden" id="deleterecordid" />
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal"
                                        aria-label="Close" data-i18n="Cancel" data-translate="cancel">Cancel</button>
                                    <button type="button" class="btn btn-danger confirm-modal-deleteBtn"
                                        onclick="handleeventdelete()" data-translate="Delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
    <div style="--stratroom-offcanvas-width: 220px;"
        class="offcanvas offcanvas-toggle offcanvas-start offcanvasSettings border-0 shadow-lg" data-bs-scroll="true"
        data-bs-backdrop="false" tabindex="-1" id="offcanvasSettings" aria-labelledby="offcanvasSettingsLabel">

        <div class="offcanvas-toggle-menu shadow toggle-right">
            <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings"
                aria-controls="offcanvasSettings">
                <i class="fas fa-caret-right"></i>
            </button>
            <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                <i class="fas fa-caret-left"></i>
            </button>
        </div>

        <div class="offcanvas-header border-bottom justify-content-between gap-3">
            <h5 class="offcanvas-title text-uppercase fs-6 fw-bold" id="offcanvasSettingsLabel">Masters</h5>
        </div>

        <div class="offcanvas-body">

            <div class="card border-0">

                <div class="card-body p-0">
                    <ul class="nav flex-column nav-pills master-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active d-flex align-items-center gap-2 w-100" id="products-tab"
                                data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab">
                                <i data-lucide="package" style="width: 16px; height: 16px;"></i>
                                <span>Products/Services</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center gap-2 w-100" id="process-tab"
                                data-bs-toggle="tab" data-bs-target="#process" type="button" role="tab">
                                <i data-lucide="workflow" style="width: 16px; height: 16px;"></i>
                                <span>Process (POS)</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center gap-2 w-100" id="vital-tab"
                                data-bs-toggle="tab" data-bs-target="#vital" type="button" role="tab">
                                <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
                                <span>Vital Records</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center gap-2 w-100" id="tech-tab"
                                data-bs-toggle="tab" data-bs-target="#tech" type="button" role="tab">
                                <i data-lucide="monitor" style="width: 16px; height: 16px;"></i>
                                <span>Technology & IT</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center gap-2 w-100" id="facilities-tab"
                                data-bs-toggle="tab" data-bs-target="#facilities" type="button" role="tab">
                                <i data-lucide="building" style="width: 16px; height: 16px;"></i>
                                <span>Facilities & Utilities</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center gap-2 w-100" id="hr-tab"
                                data-bs-toggle="tab" data-bs-target="#hr" type="button" role="tab">
                                <i data-lucide="users" style="width: 16px; height: 16px;"></i>
                                <span>Personal (HR)</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center gap-2 w-100" id="iso-tab"
                                data-bs-toggle="tab" data-bs-target="#iso" type="button" role="tab">
                                <i data-lucide="award" style="width: 16px; height: 16px;"></i>
                                <span>ISO</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center gap-2 w-100" id="budget-tab"
                                data-bs-toggle="tab" data-bs-target="#budget" type="button" role="tab">
                                <i data-lucide="calculator" style="width: 16px; height: 16px;"></i>
                                <span>Budget</span>
                            </button>
                        </li>
                    </ul>

                </div>
            </div>






        </div>
    </div>
               

          
    <div class="modal custom-modal custom-delete-modal fade" id="delete-modal" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="card custom-card delete-card border-0">
                        <div class="card-body">

                            <div class="delete-box">
                                <h4 class="title" data-translate="Do you really want to delete?">Do you really want to delete?</h4>
                                <div class="btn-wrap">
                                    <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                        data-bs-dismiss="modal" aria-label="Close" data-translate="cancel">Cancel</button>
                                    <button class="btn btn-sm btn-danger rounded-pill" data-bs-dismiss="modal" onclick="deleteService()" data-translate="Delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
                <!-- Share Modal -->
                <div id="share-popup" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-lg" style="margin-top: 10%">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4>Share</h4>
                                <button type="button" class="close pull-right" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12 form-group">
                                        <label for="Departments" data-i18n="Departments">Departments</label>
                                        <select class="dept-multi-select" name="states[]" multiple="multiple">
                                            <option value="971">Human Resource</option>
                                            <option value="972">Designer</option>
                                            <option value="973">Developer</option>
                                            <option value="973">Tester</option>
                                            <option value="973">Manager</option>
                                            <option value="973">Marketing</option>
                                        </select>
                                    </div>

                                    <div class="col-12 form-group">
                                        <label for="Users">Users</label>
                                        <select class="user-multi-select" name="states[]" multiple="multiple">
                                            <option value="972">Yasir Patton</option>
                                            <option value="973">Zander Bonner</option>
                                            <option value="973">Sila Redmond</option>
                                            <option value="973">Jayden Ortega</option>
                                            <option value="973">Milan Potts</option>
                                            <option value="973">Ernest Best</option>
                                        </select>
                                    </div>

                                    <div class="co-md-12">
                                        <label for="kpi_fields" class="ml-4">Access </label>
                                        <ul class="d-flex flex-row flex-wrap ml-4 mt-1">
                                            <li>
                                                <div class="form-check">
                                                    <div class="form-check">
                                                        <label class="form-check-label">
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            View
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
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            Create
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
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            Edit
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
                                                            <input class="form-check-input" type="checkbox" value="" />
                                                            Delete
                                                            <span class="form-check-sign">
                                                                <span class="check"></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <hr />
                                    </div>
                                    <div class="col-12">
                                        <div class="form-line right">
                                            <button type="button" class="btn-default1 btn" data-dismiss="modal"
                                                aria-label="Close" data-i18n="Cancel">
                                                Cancel
                                            </button>
                                            <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  <!-- product-service-add-modal start-->
    <div class="modal custom-modal fade" id="product-service-add-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" data-translate="Product/Service Description">Product/Service Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">
    <!-- Product/Service Dropdown -->
    <div class="g-col-12">
        <div class="form-group">
            <label class="form-label" data-translate="Product/Service">Product/Service</label>
            <select id="producttype" class="form-control form-select modal-custom-select">
                <option value="">Choose</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
            </select>
        </div>
    </div>

    <!-- Product Fields -->
    <div id="inputProduct" class="grid gap-3 g-col-12">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Product No">Product No</label>
                <input type="text" class="form-control" name="productNo" id="productNo" />
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Product Name">Product Name</label>
                <input type="text" class="form-control"  name="productName" id="productName"/>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Description">Description</label>
                <textarea rows="5" class="form-control" name="prodescription" id="prodescription"></textarea>
            </div>
        </div>
        <!-- Person in Charge -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Person In Charge">Person in Charge</label>
                <select class="form-select modal-custom-select userSelect" id="propersonIncharge"  multiple>
                   
                </select>
            </div>
        </div>
        <!-- Department -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Department">Department</label>
                <select class="form-select modal-custom-select mySelect"  id="prodepart" multiple>
                  
                </select>
            </div>
        </div>
         <div class="g-col-12">
         <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal" onclick="saveProduct()" data-translate="save">
                        Save
                    </button>
                </div>
                </div>
    </div>

    <!-- Service Fields -->
    <div id="inputService" class="grid gap-3 g-col-12">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Service No">Service No</label>
                <input type="text" class="form-control" name="serviceNo" id="serviceNo" />
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Service Name">Service Name</label>
                <input type="text" class="form-control" name="serviceName" id="serviceName" />
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Description">Description</label>
                <textarea rows="5" class="form-control" name="description" id="sdescription"></textarea>
            </div>
        </div>
        <!-- Person in Charge -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Person In Charge">Person in Charge</label>
                <select class="form-select modal-custom-select userSelect" id="serviceIncharge"  multiple>
                  
                </select>
            </div>
        </div>
        <!-- Department -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Department">Department</label>
                <select class="form-select modal-custom-select mySelect" id="serviceDept"  multiple>
                    
                </select>
            </div>
        </div>
         <div class="g-col-12">
         <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" value="Save" onclick="saveService()" data-translate="save">
                        Save
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
    </div>
     <div class="modal custom-modal fade" id="product-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" data-translate="Product Description"> Product Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">
    <!-- Product/Service Dropdown -->
    <div class="g-col-12">
        <div class="form-group">
            <label class="form-label" data-translate="ID">ID</label>
             <input type="text" class="form-control editproductid" name="productId"  />
        </div>
    </div>

    <!-- Product Fields -->
    <div id="inputProduct" class="grid gap-3 g-col-12">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Product No">Product No</label>
                <input type="text" class="form-control editproductNo" name="editproductNo"  />
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Product Name">Product Name</label>
                <input type="text" class="form-control editproductName"   id="productName"/>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Description">Description</label>
                <textarea rows="5" class="form-control editprodescription" name="editprodescription" ></textarea>
            </div>
        </div>
        <!-- Person in Charge -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Person In Charge">Person in Charge</label>
                <select class="form-select modal-custom-select userSelect" id="editpropersonIncharge"  name="states[]" multiple="multiple">
                   
                </select>
            </div>
        </div>
        <!-- Department -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Department">Department</label>
                <select class="form-select modal-custom-select mySelect"  id="productdept"  name="states[]" multiple="multiple">
                  
                </select>
            </div>
        </div>
         <div class="g-col-12">
         <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="updateProduct()" data-translate="save">
                        Save
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
    </div>

    <div class="modal custom-modal fade" id="service-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" data-translate="Service Description"> Service Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">
    <!-- Product/Service Dropdown -->
    <div class="g-col-12">
        <div class="form-group">
            <label class="form-label" data-translate="ID">ID</label>
             <input type="text" class="form-control editserviceid" name="editserviceid"  />
        </div>
    </div>

    <!-- Product Fields -->
    <div  class="grid gap-3 g-col-12">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Service No">Service No</label>
                <input type="text" class="form-control editserviceNo" name="editserviceNo"  />
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label class="form-label" data-translate="Service Name">Service Name</label>
                <input type="text" class="form-control editserviceName"   id="editserviceName"/>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Description">Description</label>
                <textarea rows="5" class="form-control editsdescription" name="editsdescription" ></textarea>
            </div>
        </div>
        <!-- Person in Charge -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Person In Charge">Person in Charge</label>
                <select class="form-select modal-custom-select userSelect" id="editserviceIncharge"  name="states[]" multiple="multiple">
                   
                </select>
            </div>
        </div>
        <!-- Department -->
        <div class="g-col-12">
            <div class="form-group">
                <label class="form-label" data-translate="Department">Department</label>
                <select class="form-select modal-custom-select mySelect"  id="updateServiceDept"  name="states[]" multiple="multiple">
                  
                </select>
            </div>
        </div>
         <div class="g-col-12">
         <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="updateService()" data-translate="save">
                        Save
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
    </div>
    <!-- process-subprocess-add-modal start-->
    <div class="modal custom-modal fade" id="process-subprocess-add-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Process/SubProcess Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">
    <!-- Select Process/SubProcess -->
    <div class="g-col-12">
        <div class="form-group">
            <label for="type" class="form-label">Process/SubProcess</label>
            <select id="postype" class="form-control form-select modal-custom-select">
                <option>Select Type</option>
                <option value="Process">Process</option>
                <option value="Sub Process">SubProcess</option>
            </select>
        </div>
    </div>

    <!-- Process Block -->
    <div id="inputProcessBox" class="grid g-col-12 gap-3">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processNo" class="form-label">Process No</label>
                <input type="text" class="form-control" name="processNO" id="processNO" />
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processName" class="form-label">Process Name</label>
                <input type="text" class="form-control" name="processName" id="processName"/>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processDescription" class="form-label">Process Description</label>
                <textarea rows="3" class="form-control" name="processDescripton" id="processDescripton"></textarea>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processDepartment" class="form-label">Department</label>
                <select class="form-select modal-custom-select mySelect" id="processDept"  multiple>
                  
                </select>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processOwner" class="form-label">Process Owner</label>
                <select class="form-select modal-custom-select userSelect" name="processOwner" id="processOwner" multiple>
                 
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processOperatingTime" class="form-label">Operating Time</label>
                <select class="form-select modal-custom-select" id="procoperatingTime"  multiple>
                    <option>Select</option>
                    <option value="Before Trading Hour">Before Trading Hour</option>
                    <option value="After Trading Hour">After Trading Hour</option>
                    <option value="Trading Time"> Trading Time</option>
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processDate" class="form-label">Date</label>
                <input type="text" class="form-control browser-default datepicker-here" data-language="en" autocomplete="off" data-range="true" name="procdate" id="procdate"  />
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processStrategy" class="form-label">Strategy & Solution</label>
                <textarea rows="3" class="form-control" name="strategies" id="procstrategies"></textarea>
            </div>
        </div>
        <div  class="g-col-12">
              <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal" onclick="saveProcess()" >
                        Save
                    </button>
                </div>
        </div>
    </div>

    <!-- SubProcess Block -->
    <div id="inputSubProcessBox" class="grid g-col-12 gap-3">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="subProcessNo" class="form-label">SubProcess No</label>
                <input type="text" class="form-control" name="subProcessNo" id="subProcessNo" />
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="subProcessName" class="form-label">SubProcess Name</label>
                <input type="text" class="form-control"  name="subProcessName" id="subProcessName"/>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="subProcessDescription" class="form-label">SubProcess Description</label>
                <textarea rows="3" class="form-control" name="description" id="subpdescription"></textarea>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="subProcessDepartment" class="form-label">Department</label>
                <select id="subProcessdept"  class="form-select modal-custom-select mySelect" multiple>
                  
                </select>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="subProcessOwner" class="form-label">Process Owner</label>
                <select name="subProcessOwner" id="subProcessOwner"  class="form-select modal-custom-select userSelect" multiple>
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="subProcessOperatingTime" class="form-label">Operating Time</label>
                <select class="form-select modal-custom-select" name="operatingTime" id="subpoperatingTime"  multiple>
                    <option>Select</option>
                    <option value="Before Trading Hour">Before Trading Hour</option>
                    <option value="After Trading Hour">After Trading Hour</option>
                    <option value="Trading Time"> Trading Time</option>
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="subProcessDate" class="form-label">Date</label>
                <input type="text" class="form-control" id="subpdate" />
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="subProcessStrategy" class="form-label">Strategy & Solution</label>
                <textarea rows="3" class="form-control" name="stratgeAndSolution" id="subpstrategies"></textarea>
            </div>
        </div>
         <div  class="g-col-12">
              <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="saveSubProcess()">
                        Save
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
    </div>
    <!-- process-subprocess-add-modal start-->

    <div class="modal custom-modal fade" id="process-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Process Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">
    <!-- Select Process/SubProcess -->
    <div class="g-col-12">
        <div class="form-group">
            <label for="type" class="form-label">ID</label>
             <input type="text" class="form-control editprocessid" name="editprocessid"  />
        </div>
    </div>

    <!-- Process Block -->
    <div id="inputProcessBox" class="grid g-col-12 gap-3">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processNo" class="form-label">Process No</label>
                <input type="text" class="form-control editprocessNO" name="editprocessNO"/>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processName" class="form-label">Process Name</label>
                <input type="text" class="form-control editprocessName" name="editprocessName"/>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processDescription" class="form-label">Process Description</label>
                <textarea rows="3" class="form-control editprocessDescripton" name="editprocessDescripton" ></textarea>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processDepartment" class="form-label">Department</label>
                <select class="form-select modal-custom-select mySelect " id="updateProcessDept"   multiple>
                  
                </select>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processOwner" class="form-label">Process Owner</label>
                <select class="form-select modal-custom-select userSelect" name="processOwner" id="editprocessOwner" multiple>
                 
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processOperatingTime" class="form-label">Operating Time</label>
                <select class="form-select modal-custom-select editprocoperatingTime" multiple>
                    <option>Select</option>
                    <option value="Before Trading Hour">Before Trading Hour</option>
                    <option value="After Trading Hour">After Trading Hour</option>
                    <option value="Trading Time"> Trading Time</option>
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="processDate" class="form-label">Date</label>
                <input type="text" class="form-control editprocdate" name="editprocdate"  />
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="processStrategy" class="form-label">Strategy & Solution</label>
                <textarea rows="3" class="form-control editprocstrategies" name="editprocstrategies" ></textarea>
            </div>
        </div>
        <div  class="g-col-12">
              <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal" onclick="updateProcess()" >
                        Save
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
    </div>
    <div class="modal custom-modal fade" id="subprocess-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">SubProcess Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

    <div class="g-col-12">
        <div class="form-group">
            <label for="type" class="form-label">ID</label>
           <input type="text" class="form-control editsubprocessid" name="editsubprocessid" />
        </div>
    </div>


    <!-- SubProcess Block -->
    <div id="inputSubProcessBox" class="grid g-col-12 gap-3">
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="subProcessNo" class="form-label">SubProcess No</label>
                <input type="text" class="form-control editsubProcessNo" name="editsubProcessNo" />
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="editsubProcessName" class="form-label">SubProcess Name</label>
                <input type="text" class="form-control editsubProcessName"  name="editsubProcessName" />
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="subProcessDescription" class="form-label">SubProcess Description</label>
                <textarea rows="3" class="form-control editsubpdescription" name="editsubpdescription" ></textarea>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="subProcessDepartment" class="form-label">Department</label>
                <select id="updateSubProcessDept"  class="form-select modal-custom-select mySelect" multiple>
                  
                </select>
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="editsubProcessOwner" class="form-label">Process Owner</label>
                <select name="editsubProcessOwner" id="editsubProcessOwner"  class="form-select modal-custom-select userSelect" multiple>
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="subProcessOperatingTime" class="form-label">Operating Time</label>
                <select class="form-select modal-custom-select editsubpoperatingTime" name="operatingTime"  multiple>
                    <option>Select</option>
                    <option value="Before Trading Hour">Before Trading Hour</option>
                    <option value="After Trading Hour">After Trading Hour</option>
                    <option value="Trading Time"> Trading Time</option>
                </select>
            </div>
        </div>
        <div class="g-col-12 g-col-md-6">
            <div class="form-group">
                <label for="subProcessDate" class="form-label">Date</label>
                <input type="text" class="form-control editsubpdate" />
            </div>
        </div>
        <div class="g-col-12">
            <div class="form-group">
                <label for="subProcessStrategy" class="form-label">Strategy & Solution</label>
                <textarea rows="3" class="form-control editsubpstrategies" name="editsubpstrategies" ></textarea>
            </div>
        </div>
         <div  class="g-col-12">
              <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"   onclick="updateSubProcess()">
                        Save
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
    </div>

      <!-- vital-records-add-modal start-->
<div class="modal custom-modal fade" id="vital-records-add-modal" tabindex="-1" data-bs-backdrop="static"  data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Vital Records Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Vital Record No</label>
                                        <input type="text" id="vitalNo" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Vital Record Name</label>
                                        <input type="text" id="vitalName"  class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Description</label>
                                        <textarea rows="3" class="form-control" id="vdescription"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">IT System</label>
                                        <select class="form-select modal-custom-select technologyService" id="vitSystem" 
                                            name="states[]" multiple>

                                        </select>
                                    </div>
                                </div>
                               <div class="g-col-12 g-col-md-6">
  <div class="form-check">
    <input class="form-check-input input_type inputTypeCheck" type="checkbox" id="">
    <label class="form-check-label" for="inputTypeCheck">
      Input Type
    </label>
  </div>
</div>

<div class="g-col-12 g-col-md-6">
  <div class="form-check">
    <input class="form-check-input output_type outputTypeCheck" type="checkbox" id="">
    <label class="form-check-label" for="outputTypeCheck">
      Output Type
    </label>
  </div>
</div>

<div class="g-col-12 g-col-md-6 inputProcessBox" id="">
  <div class="form-group">
    <label for="type" class="form-label">Input Process</label>
    <input type="text" class="form-control" id="vinputProcess" />
  </div>
</div>

<div class="g-col-12 g-col-md-6 outputProcessBox" id="">
  <div class="form-group">
    <label for="type" class="form-label">Output Process</label>
    <input type="text" class="form-control" id="voutputProcess"  />
  </div>
</div>



                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Incident</label>
                                        <input type="text" class="form-control" id="vnormalIncidents"/>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control" id="vrecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="vresponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                           
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Emergency</label>
                                        <input type="text" class="form-control" id="vemergency"/>
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control" id="vemrRecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="vemrResponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                           
                                        </select>
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Disaster</label>
                                        <input type="text" class="form-control" id="vdisaster"/>
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control" id="vdisRecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="vdisResponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                           
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" value="Save"  onclick="vitalRecords()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  <div class="modal custom-modal fade" id="vital-records-edit-modal" tabindex="-1" data-bs-backdrop="static"  data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Vital Records Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                               <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ID</label>
                                        <input type="text" class="form-control editvitalid" />
                                    </div>
                                </div>
                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Vital Record No</label>
                                        <input type="text" class="form-control editvitalNo" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Vital Record Name</label>
                                        <input type="text"  class="form-control editvitalName" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Description</label>
                                        <textarea rows="3" class="form-control editvdescription" ></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">IT System</label>
                                        <select class="form-select modal-custom-select technologyService" id="technologyServiceUpdate" 
                                            name="states[]" multiple>

                                        </select>
                                    </div>
                                </div>
                               <div class="g-col-12 g-col-md-6">
  <div class="form-check">
    <input class="form-check-input input_type inputTypeCheck" type="checkbox" id="">
    <label class="form-check-label" for="inputTypeCheck">
      Input Type
    </label>
  </div>
</div>

<div class="g-col-12 g-col-md-6">
  <div class="form-check">
    <input class="form-check-input output_type outputTypeCheck" type="checkbox" id="">
    <label class="form-check-label" for="outputTypeCheck">
      Output Type
    </label>
  </div>
</div>

<div class="g-col-12 g-col-md-6 inputProcessBox" id="">
  <div class="form-group">
    <label for="type" class="form-label">Input Process</label>
    <input type="text" class="form-control" id="editvinputProcess" />
  </div>
</div>

<div class="g-col-12 g-col-md-6 outputProcessBox" id="">
  <div class="form-group">
    <label for="type" class="form-label">Output Process</label>
    <input type="text" class="form-control" id="editvoutputProcess"  />
  </div>
</div>



                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Incident</label>
                                        <input type="text" class="form-control editvnormalIncidents"/>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control editvrecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="editvresponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                           
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Emergency</label>
                                        <input type="text" class="form-control editvemergency"/>
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control editvemrRecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="editvemrResponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                           
                                        </select>
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Disaster</label>
                                        <input type="text" class="form-control editvdisaster" />
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control editvdisRecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="editvdisResponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                           
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" value="Save"  onclick="updatevitalRecords()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
                <!-- Technology IT-->
  <!-- technology-add-modal start-->
    <div class="modal custom-modal fade" id="technology-add-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Technology Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">IT No</label>
                                        <input type="text"  name="itNo" id="itNo" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">IT Name</label>
                                        <input type="text" name="itName" id="itName" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Description</label>
                                        <textarea rows="3" class="form-control" name="description" id="tdescription"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Department</label>
                                        <select class="form-select modal-custom-select mySelect"  id="techDept"
                                            name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Person Incharge</label>
                                        <select type="text" id="tpersonIncharge"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Process</label>
                                        <select class="form-select modal-custom-select" id="tprocess"
                                            name="states[]" multiple>
                                             <option value="Balance Data">Balance Data</option>
                                                <option value="Position Data">Position Data</option>
                                                <option value="Instruction Data">Instruction Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">RTO</label>
                                        <input type="text" name="rto" id="trto" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Backup Method</label>
                                        <input type="text" name="backupMethod" id="tbackupMethod"  class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Backup Time</label>
                                        <input type="text" name="backupTime" id="tbackupTime" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Retention</label>
                                        <input type="text" name="retention" id="tretention" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Database Recovery Strategy</label>
                                        <input type="text" name="databaseRecoveryStrategy"
                                            id="tdatabaseRecoveryStrategy" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Incident</label>
                                        <input type="text" name="normalIncidents" id="tnormalIncidents" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" name="recoveryStrategy" id="trecoveryStrategy" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="tresponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Emergency</label>
                                        <input type="text" name="emergency" id="temergency" class="form-control" />
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" name="emrRecoveryStrategy" id="temrRecoveryStrategy" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="temrResponsiblePerson"  
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Disaster</label>
                                        <input type="text"name="disaster" id="tdisaster" class="form-control" />
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" name="disRecoveryStrategy" id="tdisRecoveryStrategy" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="tdisResponsiblePerson"  
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="technologyDesc()">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- technology-add-modal start-->
  <div class="modal custom-modal fade" id="technology-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Technology Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                       <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ID</label>
                                        <input type="text" class="form-control edittechid" />
                                    </div>
                                </div>
                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">IT No</label>
                                        <input type="text"  name="itNo" class="form-control edititNo" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">IT Name</label>
                                        <input type="text" name="itName" class="form-control edititName" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Description</label>
                                        <textarea rows="3" class="form-control edittdescription" name="description" ></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Department</label>
                                        <select class="form-select modal-custom-select mySelect"  id="updateTechDept"
                                            name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Person Incharge</label>
                                        <select type="text" id="edittpersonIncharge"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Process</label>
                                        <select class="form-select modal-custom-select" id="edittprocess"
                                            name="states[]" multiple>
                                             <option value="Balance Data">Balance Data</option>
                                                <option value="Position Data">Position Data</option>
                                                <option value="Instruction Data">Instruction Data</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">RTO</label>
                                        <input type="text" name="rto" class="form-control edittrto" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Backup Method</label>
                                        <input type="text" name="backupMethod"  class="form-control edittbackupMethod" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Backup Time</label>
                                        <input type="text" name="backupTime"  class="form-control edittbackupTime" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Retention</label>
                                        <input type="text" name="retention"  class="form-control edittretention" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Database Recovery Strategy</label>
                                        <input type="text" name="databaseRecoveryStrategy" class="form-control edittdatabaseRecoveryStrategy" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Incident</label>
                                        <input type="text" name="normalIncidents" class="form-control edittnormalIncidents" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" name="recoveryStrategy" class="form-control edittrecoveryStrategy" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="edittresponsiblePerson" 
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Emergency</label>
                                        <input type="text" name="emergency"  class="form-control edittemergency" />
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" name="emrRecoveryStrategy" class="form-control edittemrRecoveryStrategy" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="edittemrResponsiblePerson"  
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Disaster</label>
                                        <input type="text"name="disaster" class="form-control edittdisaster" />
                                    </div>
                                </div>
                                  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" name="disRecoveryStrategy"  class="form-control edittdisRecoveryStrategy" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="edittdisResponsiblePerson"  
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="updatetechDesc()">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
             <!-- facilites-add-modal start-->
    <div class="modal custom-modal fade" id="facilites-add-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Facilites Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Facility No</label>
                                        <input type="text" name="facilityNo" id="facilityNo" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Facility Name</label>
                                        <input type="text" class="form-control" name="facilityName" id="facilityName" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Description</label>
                                        <textarea rows="3" class="form-control"  name="description" id="fdescription"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Department</label>
                                        <select class="form-select modal-custom-select mySelect" id="facilitydept"
                                            name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Person Incharge</label>
                                        <select type="text" id="fpersonIncharge"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                          
                                        </select>
                                    </div>
                                </div>



                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Incident</label>
                                        <input type="text" class="form-control" name="normalIncidents" id="fnormalIncidents" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control" name="recoveryStrategy" id="frecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="fresponsiblePerson"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                            
                                        </select>
                                    </div>
                                </div>
                               <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Emergency</label>
                                        <input type="text" class="form-control" name="emergency" id="femergency"/>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control" name="emrRecoveryStrategy" id="femrRecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="femrResponsiblePerson"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                            
                                        </select>
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Disaster</label>
                                        <input type="text" class="form-control" name="fdisaster" id="fdisaster"/>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control" name="fdisRecoveryStrategy" id="fdisRecoveryStrategy"/>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="fdisResponsiblePerson"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                            
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" value="Save" onclick="facilityDesc()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- facilites-add-modal start-->
      

    <div class="modal custom-modal fade" id="facilites-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Facilites Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                       <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ID</label>
                                        <input type="text" class="form-control editfacilityid" />
                                    </div>
                                </div>
                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Facility No</label>
                                        <input type="text" name="facilityNo"  class="form-control editfacilityNo" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Facility Name</label>
                                        <input type="text" class="form-control editfacilityName" name="facilityName"  />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Description</label>
                                        <textarea rows="3" class="form-control editfdescription"  name="description" ></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Department</label>
                                        <select class="form-select modal-custom-select mySelect" id="updatefacilityDept"
                                            name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Person Incharge</label>
                                        <select type="text" id="editfpersonIncharge"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                          
                                        </select>
                                    </div>
                                </div>



                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Incident</label>
                                        <input type="text" class="form-control editfnormalIncidents" name="normalIncidents"  />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control editfrecoveryStrategy" name="recoveryStrategy" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="editfresponsiblePerson"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                            
                                        </select>
                                    </div>
                                </div>
                               <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Emergency</label>
                                        <input type="text" class="form-control editfemergency" name="emergency" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control editfemrRecoveryStrategy" name="emrRecoveryStrategy" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="editfemrResponsiblePerson"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                            
                                        </select>
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Disaster</label>
                                        <input type="text" class="form-control editfdisaster" name="fdisaster" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Recovery Strategy</label>
                                        <input type="text" class="form-control editfdisRecoveryStrategy" name="fdisRecoveryStrategy" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Responsible Person</label>
                                        <select type="text" id="editfdisResponsiblePerson"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple>
                                            
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" value="Save" onclick="updatefacilityDesc()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
   <!-- personalHR-add-modal start-->
    <div class="modal custom-modal fade" id="personalHR-add-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Personal (HR) Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">No</label>
                                        <input type="text" name="no" id="phrno" class="form-control" />
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Person</label>
                                        <select class="form-select modal-custom-select phrperson" id="personalHR-person-add"
                                            name="" >
                                            <option value="">Select personal</option>
                                            <option value="Internal" data-select2-id="74">Internal</option>
                                            <option value="External" data-select2-id="75">External</option>
                                        </select>
                                    </div>
                                </div>
                               <div id="personalHR-personInternal" class="g-col-12">
                                <div class="grid gap-3">
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Department</label>
                                        <select class="form-select modal-custom-select mySelect" id="personalDept"
                                            name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">User List</label>
                                        <select type="text" id="phruserList"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple> 
                                        </select>
                                    </div>
                                </div>
</div>
</div>
                                <div id="personalHR-personExternal" class="g-col-12">
  <div class="grid gap-3" id="external-container">
    <div class="g-col-6 g-col-md-6">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input type="text" class="form-control external-name phrname" />
      </div>
    </div>
    <div class="g-col-6 g-col-md-6">
      <div class="form-group">
        <label class="form-label">External Entity</label>
        <input type="text" class="form-control external-entity phrexternalEntity" />
      </div>
    </div>
  </div>
  <button type="button" class="btn btn-sm btn-primary mt-2" id="add-external">+Add</button>

  <!-- Dynamic list of added rows -->
  <div id="external-list" class="mt-3"></div>
</div>


                               

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="personalDesc()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
   <!-- personalHR-add-modal start-->
    <div class="modal custom-modal fade" id="personalHR-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Personal (HR) Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ID</label>
                                        <input type="text" name="no"  class="form-control editpersonalid" />
                                    </div>
                                </div> 
                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">No</label>
                                        <input type="text" name="no"  class="form-control editphrno" />
                                    </div>
                                </div>
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Person</label>
                                        <select class="form-select modal-custom-select editphrperson" id="editpersonalHR-person-add"
                                            name="" >
                                            <option value="">Select personal</option>
                                            <option value="Internal" data-select2-id="74">Internal</option>
                                            <option value="External" data-select2-id="75">External<option>
                                        </select>
                                    </div>
                                </div>
                               <div id="editpersonalHR-personInternal" class="g-col-12">
                                <div class="grid gap-3">
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Department</label>
                                        <select class="form-select modal-custom-select mySelect" id="updatePersonalDept"
                                            name="states[]" multiple>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">User List</label>
                                        <select type="text" id="editphruserList"
                                            class="form-select modal-custom-select userSelect" name="states[]" multiple> 
                                        </select>
                                    </div>
                                </div>
</div>
</div>
                                <div id="editpersonalHR-personExternal" class="g-col-12">
  <div class="grid gap-3" id="editexternal-container">
    <div class="g-col-6 g-col-md-6">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input type="text" class="form-control external-name editphrname" />
      </div>
    </div>
    <div class="g-col-6 g-col-md-6">
      <div class="form-group">
        <label class="form-label">External Entity</label>
        <input type="text" class="form-control external-entity editphrexternalEntity" />
      </div>
    </div>
  </div>
  <button type="button" class="btn btn-sm btn-primary mt-2" id="add-external">+Add</button>

  <!-- Dynamic list of added rows -->
  <div id="editexternal-list" class="mt-3"></div>
</div>


                               

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="updatepersonalDesc()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
<!-- iso-add-modal start-->
    <div class="modal custom-modal fade" id="iso-add-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ISO Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ISO Code</label>
                                        <input type="text" name="isoCode" id="isoCode" class="form-control" />
                                    </div>
                                </div>
                               
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ISO Description</label>
                                        <textarea rows="3" name="isoDescription" id="isoDescription" class="form-control"></textarea>
                                    </div>
                                </div>
                               

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal"  onclick="isoDescription()">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
<!-- iso-add-modal start-->
 <div class="modal custom-modal fade" id="iso-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ISO Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">
                                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ID</label>
                                        <input type="text" class="form-control editisoid" />
                                    </div>
                                </div>

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ISO Code</label>
                                        <input type="text" class="form-control editisoCode" />
                                    </div>
                                </div>
                               
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ISO Description</label>
                                        <textarea rows="3" class="form-control editisoDescription"></textarea>
                                    </div>
                                </div>
                               

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" value="Save"  onclick="updateisoDesc()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- budget-add-modal start-->
    <div class="modal custom-modal fade" id="budget-add-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget- Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">GL Account</label>
                                        <input type="text" name="glAccount" id="glAccount" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">GL Name</label>
                                        <input type="text" name="glName" id="glName" class="form-control" />
                                    </div>
                                </div>
                               
                              <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Budget Type</label>
                                        <select class="form-select modal-custom-select" name="budgetType" id="budgetType"  >

                                           <option value="">Select</option>
                                        <option value="Asset">Asset</option>
                                        <option value="Liability">Liability</option>
                                        <option value="Income">Income</option>
                                        <option value="Expense">Expense</option>
                                        </select>
                                    </div>
                                </div>
                               

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save"  data-bs-dismiss="modal" onclick="saveBudget()" >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- budget-add-modal start-->
<div class="modal custom-modal fade" id="budget-edit-modal" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Budget- Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">ID</label>
                                        <input type="text" id="editbudgetid" class="form-control" />
                                    </div>
                                </div>
                            <div class="grid gap-3">
  <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">GL Account</label>
                                        <input type="text" name="glAccount" id="editglAccount" class="form-control" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">GL Name</label>
                                        <input type="text" name="glName" id="editglName" class="form-control" />
                                    </div>
                                </div>
                               
                              <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Budget Type</label>
                                        <select class="form-select modal-custom-select" name="budgetType" id="editbudgetType"  >

                                           <option value="">Select</option>
                                        <option value="Asset">Asset</option>
                                        <option value="Liability">Liability</option>
                                        <option value="Income">Income</option>
                                        <option value="Expense">Expense</option>
                                        </select>
                                    </div>
                                </div>
                               

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" onclick="updateBudget()">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>

    
    <div class="modal custom-modal fade" id="master_share_popup" tabindex="-1" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Share</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="grid gap-3">



                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Department</label>
                                        <select class="form-select modal-custom-select" id="prodepart-share"
                                            name="states[]" multiple>

                                            <option value="testdemo" data-select2-id="74">testdemo</option>
                                            <option value="Board" data-select2-id="75">Board</option>
                                            <option value="CEO" data-select2-id="76">CEO</option>
                                            <option value="Sales" data-select2-id="77">Sales</option>
                                            <option value="Technology" data-select2-id="78">Technology</option>
                                            <option value="Lesotho Communications Authority" data-select2-id="79">
                                                Lesotho Communications Authority</option>
                                            <option value="Public Affair Manager" data-select2-id="80">Public Affair
                                                Manager</option>
                                            <option value="Chief Technology Officer" data-select2-id="81">Chief
                                                Technology Officer</option>
                                            <option value="Chief Finance Officer" data-select2-id="82">Chief Finance
                                                Officer</option>
                                            <option value="Chief Regulatory Officer" data-select2-id="83">Chief
                                                Regulatory Officer</option>
                                            <option value="LHDA Chief Executive" data-select2-id="84">LHDA Chief
                                                Executive</option>
                                            <option value="Development and Operations Division" data-select2-id="85">
                                                Development and Operations Division
                                            </option>
                                            <option value="Phase II Division" data-select2-id="86">Phase II Division
                                            </option>
                                            <option value="Social Development and Environment Division"
                                                data-select2-id="87">Social Development and Environment
                                                Division</option>
                                            <option value="Corporate Services" data-select2-id="88">Corporate Services
                                            </option>
                                            <option value="Coimbatore HQ" data-select2-id="89">Coimbatore HQ</option>
                                            <option value="Bangalore " data-select2-id="90">Bangalore </option>
                                            <option value="Coimbatore" data-select2-id="91">Coimbatore</option>
                                            <option value="Guntur" data-select2-id="92">Guntur</option>
                                            <option value="Jaipur" data-select2-id="93">Jaipur</option>
                                            <option value="Hyderabad" data-select2-id="94">Hyderabad</option>
                                            <option value="gs" data-select2-id="95">gs</option>
                                            <option value="td" data-select2-id="96">td</option>
                                            <option value="cycber department" data-select2-id="97">cycber department
                                            </option>
                                            <option value="ict deapartment " data-select2-id="98">ict deapartment
                                            </option>
                                            <option value="specterum department" data-select2-id="99">specterum
                                                department</option>
                                            <option value="cyber security manager" data-select2-id="100">cyber security
                                                manager</option>
                                            <option value="information technology manager" data-select2-id="101">
                                                information technology manager</option>
                                            <option value="spectrum manager" data-select2-id="102">spectrum manager
                                            </option>
                                            <option value="engineer 1" data-select2-id="103">engineer 1</option>
                                            <option value="engineer 2" data-select2-id="104">engineer 2</option>
                                            <option value="engineer 3" data-select2-id="105">engineer 3</option>
                                            <option value="it engineer" data-select2-id="106">it engineer</option>
                                            <option value="it service desk engineer " data-select2-id="107">it service
                                                desk engineer </option>
                                            <option value="networks and service" data-select2-id="108">networks and
                                                service</option>
                                            <option value="employee 1" data-select2-id="109">employee 1</option>
                                            <option value="employee2" data-select2-id="110">employee2</option>
                                            <option value="employee3" data-select2-id="111">employee3</option>
                                            <option value="cto" data-select2-id="112">cto</option>
                                            <option value="CSE" data-select2-id="113">CSE</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="type" class="form-label">Users</label>
                                        <select type="text" id="users" class="form-select modal-custom-select"
                                            name="states[]" multiple>
                                            <option value="SuperUser" data-select2-id="121">SuperUser</option>
                                            <option value="josephs" data-select2-id="122">josephs</option>
                                            <option value="Capsey" data-select2-id="123">Capsey</option>
                                            <option value="Glenncy" data-select2-id="124">Glenncy</option>
                                            <option value="Adharsh" data-select2-id="125">Adharsh</option>
                                            <option value="Marco" data-select2-id="126">Marco</option>
                                            <option value="Franck" data-select2-id="127">Franck</option>
                                            <option value="Oscar" data-select2-id="128">Oscar</option>
                                            <option value="Alex" data-select2-id="129">Alex</option>
                                            <option value="Grace" data-select2-id="130">Grace</option>
                                            <option value="Taylor" data-select2-id="131">Taylor</option>
                                            <option value="Alyssa" data-select2-id="132">Alyssa</option>
                                            <option value="Tyler" data-select2-id="133">Tyler</option>
                                            <option value="Brandon" data-select2-id="134">Brandon</option>
                                            <option value="Megan" data-select2-id="135">Megan</option>
                                            <option value="Ezra" data-select2-id="136">Ezra</option>
                                            <option value="ricky" data-select2-id="137">ricky</option>
                                            <option value="mack" data-select2-id="138">mack</option>
                                            <option value="arun" data-select2-id="139">arun</option>
                                            <option value="saravanan" data-select2-id="140">saravanan</option>
                                            <option value="niranjan" data-select2-id="141">niranjan</option>
                                            <option value="kavi" data-select2-id="142">kavi</option>
                                            <option value="thanga" data-select2-id="143">thanga</option>
                                            <option value="ganesh" data-select2-id="144">ganesh</option>
                                            <option value="Lefu" data-select2-id="145">Lefu</option>
                                            <option value="Nozaba" data-select2-id="146">Nozaba</option>
                                            <option value="Mapaballo" data-select2-id="147">Mapaballo</option>
                                            <option value="Makhala" data-select2-id="148">Makhala</option>
                                            <option value="Palesa" data-select2-id="149">Palesa</option>
                                            <option value="Molupe" data-select2-id="150">Molupe</option>
                                            <option value="Tumane" data-select2-id="151">Tumane</option>
                                            <option value="Itumeleng" data-select2-id="152">Itumeleng</option>
                                            <option value="Dikokole" data-select2-id="153">Dikokole</option>
                                            <option value="Seetla" data-select2-id="154">Seetla</option>
                                            <option value="Sajan" data-select2-id="155">Sajan</option>
                                            <option value="Krish" data-select2-id="156">Krish</option>
                                            <option value="vish" data-select2-id="157">vish</option>
                                            <option value="Deena" data-select2-id="158">Deena</option>
                                            <option value="saga" data-select2-id="159">saga</option>
                                            <option value="saran" data-select2-id="160">saran</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="g-col-md-12">
                                    <label for="sub_initative_progress" class="form-label">Access</label>
                                    <div class="d-flex gap-2 pageViewOption">
                                        <div class="form-check form-check-inline mt-1">
                                            <input class="form-check-input" type="checkbox" id="subInitiativeView"
                                                name="" value="">
                                            <label class="form-check-label" for="subInitiativeView">View</label>
                                        </div>
                                        <div class="form-check form-check-inline mt-1">
                                            <input class="form-check-input" type="checkbox" id="chartView" name=""
                                                value="">
                                            <label class="form-check-label" for="chartView">Create</label>
                                        </div>
                                        <div class="form-check form-check-inline mt-1">
                                            <input class="form-check-input" type="checkbox" id="activitiesView" name=""
                                                value="">
                                            <label class="form-check-label" for="activitiesView">Edit</label>
                                        </div>
                                        <div class="form-check form-check-inline mt-1">
                                            <input class="form-check-input" type="checkbox" id="activitiesView" name=""
                                                value="">
                                            <label class="form-check-label" for="activitiesView">Delete</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <main class="pt-2 pb-2">
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/master.svg" alt="Master" title="Mmaster">
                        </span>
                        <span data-translate="Masters">Masters</span>
                    </h4>
                </div>

            </div>
        </div>
        <div class="container-lg py-2">

            <div class="tab-content" id="myTabContent">

                <div class="tab-pane fade show active" id="products" role="tabpanel">
                    <div class="card custom-card-tab">
                        <div class="card-header p-0">
                            <div class="c-header-left">
                                <div class="dropdown dropdown-tab dropdown-tab-ellipsis" id="tab-navigationWrap">
                                    <button class="btn btn-primary dropdown-toggle d-lg-none" type="button"
                                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        products
                                    </button>
                                    <ul class="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist"
                                        aria-orientation="horizontal">
                                        <button class="nav-link active" id="v-pills-products-tab" data-bs-toggle="pill"
                                            data-bs-target="#v-pills-products" type="button" role="tab"
                                            aria-controls="v-pills-products" aria-selected="true">
                                            <span class="nav-text" contenteditable="true"
                                                oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);" data-translate="Products">
                                                Products
                                            </span>
                                        </button>
                                        <button class="nav-link" id="v-pills-services-tab" data-bs-toggle="pill"
                                            data-bs-target="#v-pills-services" type="button" role="tab"
                                            aria-controls="v-pills-services" aria-selected="false">
                                            <span class="nav-text" contenteditable="true"
                                                oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);" data-translate="Services">
                                                Services
                                            </span>
                                        </button>
                                    </ul>

                                </div>

                            </div>
                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#product-service-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#master_share_popup">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Share">
                                        <i class="fas fa-share"></i>
                                    </span>
                                </button>


                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>

                        <div class="card-body tab-content">
                            <div class="tab-pane fade show active" id="v-pills-products" role="tabpanel"
                                aria-labelledby="v-pills-products-tab">
                                <div class="p-1" >
                                    <table class="table table-bordered w-100 text-nowrap" id="productDataTable">
                                        <thead>
                                            <tr>
                                                <th class="text-center" data-translate="Product No">Product No</th>
                                                <th class="text-center" data-translate="Product Name">Product Name</th>
                                                <th class="text-center" data-translate="Description">Description</th>
                                                <th class="text-center" data-translate="Department">Department</th>
                                                <th class="text-center" data-translate="Person In Charge">Person Incharge</th>
                                                <th class="text-end" data-translate="Action">Action</th>
                                            </tr>
                                        </thead>
                                       <tbody id="product_tab">
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="v-pills-services" role="tabpanel"
                                aria-labelledby="v-pills-services-tab">
                                <div class="p-1">
                                    <table class="table table-bordered w-100 text-nowrap" id="servicesDataTable">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Service No</th>
                                                <th class="text-center">Service Name</th>
                                                <th class="text-center">Description</th>
                                                <th class="text-center">Department</th>
                                                <th class="text-center">Person Incharge</th>
                                                <th class="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="service_tab">
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="tab-pane fade" id="process" role="tabpanel">
                    <div class="card custom-card-tab">
                        <div class="card-header p-0">
                            <div class="c-header-left">
                                <div class="dropdown dropdown-tab dropdown-tab-ellipsis" id="tab-navigationWrap">
                                    <button class="btn btn-primary dropdown-toggle d-lg-none" type="button"
                                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        Process
                                    </button>
                                    <ul class="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist"
                                        aria-orientation="horizontal">
                                        <button class="nav-link active" id="v-pills-process-tab" data-bs-toggle="pill"
                                            data-bs-target="#v-pills-process" type="button" role="tab"
                                            aria-controls="v-pills-process" aria-selected="true">
                                            <span class="nav-text" contenteditable="true"
                                                oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);">
                                                Process
                                            </span>
                                        </button>
                                        <button class="nav-link" id="v-pills-subprocess-tab" data-bs-toggle="pill"
                                            data-bs-target="#v-pills-subprocess" type="button" role="tab"
                                            aria-controls="v-pills-subprocess" aria-selected="false">
                                            <span class="nav-text" contenteditable="true"
                                                oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);">
                                                Sub Process
                                            </span>
                                        </button>
                                    </ul>

                                </div>

                            </div>
                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#process-subprocess-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#master_share_popup">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Share">
                                        <i class="fas fa-share"></i>
                                    </span>
                                </button>


                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>

                        <div class="card-body tab-content">
                            <div class="tab-pane fade show active" id="v-pills-process" role="tabpanel"
                                aria-labelledby="v-pills-process-tab">
                                <div class="p-1" >
                                <table class="table table-bordered w-100 text-nowrap" id="processDataTable">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Process No</th>
                                                <th class="text-center">Process Name</th>
                                                <th class="text-center">Process <br>Description</th>
                                                <th class="text-center">Department</th>
                                                <th class="text-center">Process Owner</th>
                                                <th class="text-center">Date</th>
                                                <th class="text-center">Operating Time</th>
                                                <th class="text-center">Strategis and Solution</th>
                                                <th class="text-end">Action</th>
                                            </tr>
                                        </thead>
                                         <tbody id="process_tab">
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="v-pills-subprocess" role="tabpanel"
                                aria-labelledby="v-pills-subprocess-tab">
                                <div class="p-1" >
                        <table class="table table-bordered w-100 text-nowrap" id="subprocessDataTable">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Sub Process No</th>
                                                <th class="text-center">Sub Process Name</th>
                                                <th class="text-center">SubProcess <br>Description</th>
                                                <th class="text-center">Department</th>
                                                <th class="text-center">Process Owner</th>
                                                <th class="text-center">Date</th>
                                                <th class="text-center">Operating Time</th>
                                                <th class="text-center">Strategis and Solution</th>
                                                <th class="text-end">Action</th>
                                            </tr>
                                        </thead>
                                      <tbody id="subprocess_tab">
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="tab-pane fade" id="vital" role="tabpanel">
                    <div class="card custom-card">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title me-auto">
                                    <strong class="editableTxt1">Vital Records</strong>
                                </h5>
                            </div>

                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#vital-records-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>
                        <div class="card-body">

                            <table class="table table-bordered w-100 text-nowrap" id="vitalRecordsDataTable">
                                <thead>
                                    <tr>
                                        <th class="text-center">Vital Record No</th>
                                        <th class="text-center">Vital Record Name</th>
                                        <th class="text-center">Description</th>
                                        <th class="text-center">IT System</th>
                                        <th class="text-center">Input Process</th>
                                        <th class="text-center">Output Process</th>
                                        <th class="text-center">Incident</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-center">Emergency</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-center">Disaster</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="vital_tab">


                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tech" role="tabpanel">
                    <div class="card custom-card">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title me-auto">
                                    <strong class="editableTxt1">TECHNOLOGY & IT</strong>
                                </h5>
                            </div>

                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#technology-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>
                        <div class="card-body">

                            <table class="table table-bordered w-100 text-nowrap" id="technologyDataTable">
                                <thead>
                                    <tr>
                                        <th class="text-center">IT No</th>
                                        <th class="text-center">IT Name</th>
                                        <th class="text-center">Description</th>
                                        <th class="text-center">Department</th>

                                        <th class="text-center">Person Incharge</th>
                                        <th class="text-center">Process</th>
                                        <th class="text-center">RTO</th>
                                        <th class="text-center">Backup Method</th>

                                        <th class="text-center">Backup Time</th>
                                        <th class="text-center">Retention</th>
                                        <th class="text-center">Database Recovery Strategy</th>
                                         <th class="text-center">Incident</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-center">Emergency</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-center">Disaster</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tech_tab">

                                 

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="facilities" role="tabpanel">

                    <div class="card custom-card">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title me-auto">
                                    <strong class="editableTxt1">Facilities & Utilities (Work area)</strong>
                                </h5>
                            </div>

                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#facilites-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>
                        <div class="card-body">

                            <table class="table table-bordered w-100 text-nowrap" id="facilitiesDataTable">
                                <thead>
                                    <tr>
                                        <th class="text-center">Facility No</th>
                                        <th class="text-center">Facility Name</th>
                                        <th class="text-center">Description</th>
                                        <th class="text-center">Department</th>

                                        <th class="text-center">Person Incharge</th>
                                        <th class="text-center">Incident</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-center">Emergency</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-center">Disaster</th>
                                        <th class="text-center">Response</th>
                                        <th class="text-center">Person Responsible</th>
                                        <th class="text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="facilities_tab">

                                

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
              
                <div class="tab-pane fade" id="hr" role="tabpanel">
                  
                   <div class="card custom-card">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title me-auto">
                                    <strong class="editableTxt1">Personal (HR)</strong>
                                </h5>
                            </div>

                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#personalHR-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>
                        <div class="card-body">

                            <table class="table table-bordered w-100 text-nowrap" id="personalHRDataTable">
                                <thead>
                                    <tr>
                                        <th class="text-center">No</th>
                                        <th class="text-center">Person</th>
                                       
                                        <th class="text-center">Department</th>

                                        <th class="text-center">User List</th>
                                        <th class="text-center">Name</th>
                                        <th class="text-center">External Entity</th>

                                       

                                        <th class="text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="personal_tab">

                               

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="iso" role="tabpanel">
                   
                    <div class="p-1">
 <div class="card custom-card">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title me-auto">
                                    <strong class="editableTxt1">ISO</strong>
                                </h5>
                            </div>

                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#iso-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>
                        <div class="card-body">

                            <table class="table table-bordered w-100 text-nowrap" id="isoDataTable">
                                <thead>
                                    <tr>
                                        <th class="text-center">ISO CODE</th>
                                      
                                        <th class="text-center">ISO Description</th>
                                                                   
                                        <th class="text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="iso_tab">

                                 
                                </tbody>
                            </table>

                        </div>
                    </div>
                    </div>
                  
                </div>
                <div class="tab-pane fade" id="budget" role="tabpanel">
                  
                     <div class="p-1">
 <div class="card custom-card">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title me-auto">
                                    <strong class="editableTxt1">Budget</strong>
                                </h5>
                            </div>

                            <div class="card-actions">
                                <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                    data-bs-target="#budget-add-modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="btn btn-sm btn-icon"> <span data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Export" class="action">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export"
                                            title="export">
                                    </span></button>

                            </div>
                        </div>
                        <div class="card-body">

                            <table class="table table-bordered w-100 text-nowrap" id="budgetDataTable">
                                <thead>
                                    <tr>
                                        <th class="text-center">GL Account</th>
                                      
                                        <th class="text-center">GL Description</th>
                                        <th class="text-center">Budget Type</th>
                                                                   
                                        <th class="text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="budget_tab">

                                

                                </tbody>
                            </table>

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


                <c:if test="${userPrincipal.profile.userRoleName == 'Super User'}">
                 
                </c:if>
                <!-- END File Validate Form -->

    <link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />
		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>

                <!-- Plugins Js -->
               <script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>
      <script type="text/javascript"
			src="${contextroot}/js/daterangepicker.min.js"></script>

<script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
		<!-- Custom Js -->
     		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<script src="${contextroot}/js/admin.js"></script>
		<!-- Knob Js -->
		<script src="${contextroot}/js/moment.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
		<script src="${contextroot}/js/bootstrap-popover-x.js"
			type="text/javascript"></script>
		<script src="${contextroot}/js/chosen.jquery.min.js"></script>
		<script src="${contextroot}/js/widgets.js"></script>	
		<script type="text/javascript" src="${contextroot}/js/risk.js"></script>
		<script src="${contextroot}/js/handlebars.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="${contextroot}/js/apexcharts.js"></script>
		<script src="${contextroot}/js/initial.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
 <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
 
    <script src="https://cdn.jsdelivr.net/npm/jquery-sparkline/jquery.sparkline.min.js"></script>

		   <script src="${contextroot}/js/masters.js"></script>
                <script>
              $(document).ready(function () {
                        $(".masterstemplatesmenu a").removeClass('toggled');
                    });


                    $("#timepicker_pop").timepicker();

                    $("#open_search").click(function () {
                        $(".nav-search").show();
                        $("#open_search").hide();
                    });

                    $("#close_search").click(function () {
                        $("#open_search").show();
                        $(".nav-search").hide();
                    });

                    $(function () {
                        $('input[name="date"]').daterangepicker(
                            {
                                singleDatePicker: true,
                                showDropdowns: true,
                                minYear: 1901,
                                maxYear: parseInt(moment().format("YYYY"), 10),
                            },
                            function (start, end, label) {
                                var years = moment().diff(start, "years");
                                alert("You are " + years + " years old!");
                            }
                        );
                    });

                    $("body").tooltip({
                        selector: ".remove-notes, .remove-action",
                    });

                    


                    $(document).ready(function () {
                        $(".dept-multi-select").select2();
                        $(".user-multi-select").select2();
                    });

                    $("#closethis").click(function () {
                        $("#cousecategory-add").addClass("d-none");
                    });
                    $("#closethis-1").click(function () {
                        $("#cousecategory-add").addClass("d-none");
                    });
                    $("#share_btn").click(function () {
                        $("#share_btn i").toggleClass("shareButtonActive");
                    });
                    $("#hidebtn").click(function () {
                        $("#hidebtn i").toggleClass("fa-chevron-up");
                        $("#hidebtn i").toggleClass("fa-chevron-down");
                        $("#show-action").toggleClass("");
                        $("#show-action").toggleClass("d-none");


                    });
                    $("#action_table").on("click", ".remove-action", function (e) {
                        $(this).parents(".action_clone").remove();
                    });

                    $(".daterangepicker-field").daterangepicker({
                        forceUpdate: true,
                        callback: function (startDate, endDate, period) {
                            var title = startDate.format("L") + " - " + endDate.format("L");
                            $(this).val(title);
                        },
                    });
                    $(document).ready(function () {
                        $('#disable-feild').change(function () {
                            var selectedOption = $(this).val();


                            if (selectedOption === 'dropdown') {
                                $("#cousecategory-add").removeClass("d-none")
                            } else {
                                $("#cousecategory-add").addClass("d-none")
                            }
                        });
                    });
                    $(document).ready(function () {
                        $('.disable-feild_1').change(function () {
                            var selectedOption = $(this).val();


                            if (selectedOption === 'dropdown') {
                                $("#cousecategory-add-1").removeClass("d-none")
                            } else {
                                $("#cousecategory-add-1").addClass("d-none")
                            }
                        });
                    });
                 $(document).ready(function () {

                        $("#strength_btn").click(function () {
                            $("#strength_section").show();
                            $(
                                "#opportunities_section, #weakness_section, #technology_addnew,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#Information_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew"
                            ).hide();
                        });

                        $("#weaknesses_btn").click(function () {
                            $("#weakness_section").show();
                            $(
                                "#strength_section, #opportunities_section, #technology_addnew ,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#Information_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew",
                            ).hide();
                        });

                        $("#opportunities_btn").click(function () {
                            $("#opportunities_section").show();
                            $("#strength_section, #weakness_section, #technology_addnew,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#Information_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew").hide();
                        });
                        $("#Technology").click(function () {
                            $("#technology_addnew").show();
                            $("#strength_section, #weakness_section, #opportunities_section,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#Information_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew").hide();
                        });
                        $("#Facilites").click(function () {
                            $("#Facilites_addnew").show();
                            $("#strength_section, #weakness_section, #opportunities_section ,#technology_addnew,#Business_service_addnew,#personal_addnew,#Information_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew").hide();
                        });
                        $("#Business_service").click(function () {
                            $("#Business_service_addnew").show();
                            $("#strength_section, #weakness_section, #opportunities_section ,#technology_addnew,#Facilites_addnew,#personal_addnew,#Information_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew").hide();
                        });
                        $("#personal").click(function () {
                            $("#personal_addnew").show();
                            $("#strength_section, #weakness_section, #opportunities_section ,#technology_addnew,#Facilites_addnew,#Information_addnew,#iso_addnew,#budget_addnew,#Business_service_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew").hide();
                        });
                        $("#iso").click(function () {
                            $("#iso_addnew").show();
                            $("#strength_section,#opportunities_section, #weakness_section, #technology_addnew,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#Information_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew,#budget_addnew").hide();
                        });

                        // budget
                        $("#budget").click(function () {
                            $("#budget_addnew").show();
                            $("#strength_section,#opportunities_section, #weakness_section, #technology_addnew,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#Information_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew,#iso_addnew").hide();
                        });

                        $("#Information").click(function () {
                            $("#Information_addnew").show();
                            $("#strength_section,#opportunities_section, #weakness_section, #technology_addnew,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#RecoveryScenario_addnew").hide();
                        });
                        $("#RecoveryScenario").click(function () {
                            $("#RecoveryScenario_addnew").show();
                            $("#strength_section,#opportunities_section, #weakness_section, #technology_addnew,#Facilites_addnew,#Business_service_addnew,#personal_addnew,#iso_addnew,#budget_addnew,#Recommendations_addnew,#Action_addnew,#ERP_addnew,#Information_addnew").hide();
                        });
                        $("#task_btn").click(function () {
                            $("#tasktable").removeClass("d-none")

                        })

                        $("#priority-1").click(function () {
                            $(".priority").hide();
                        });
                        $(".").click(function () {
                            $("#opportunities_section").show();
                            $("#strength_section, #weakness_section, #technology_addnew").hide();
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

                        $('#strength_desc_add_popup #typeDepartments,#strength_desc_add_popup #typeimpacts,#strength_desc_edit_popup #typeDepartment,#strength_desc_edit_popup #typeimpact').select2({
                            selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
                            dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
                        });

                    });
                    $(document).ready(function () {

                        $("#updated").click(function () {
                            $("#comment-updatepage").removeClass("d-none");
                            $("#check").addClass("d-none");
                            $("#fileattach").addClass("d-none")
                            $("#updated").addClass("activated");
                            $("#secound").removeClass("activated");
                            $("#thired").removeClass("activated");

                        });
                        $("#activity").click(function () {
                            $("#comment-updatepage").addClass("d-none");
                            $("#check").removeClass("d-none")
                            $("#fileattach").addClass("d-none")
                            $("#secound").addClass("activated");
                            $("#updated").removeClass("activated");
                            $("#thired").removeClass("activated");
                        });
                        $("#filess").click(function () {
                            $("#comment-updatepage").addClass("d-none");
                            $("#check").addClass("d-none")
                            $("#fileattach").removeClass("d-none")
                            $("#secound").removeClass("activated");
                            $("#updated").removeClass("activated");
                            $("#thired").addClass("activated");
                        });
                    })

                    $(".addsub_process").click(function () {
                        $(".sub_process").append(`
            </br>
        </br>
        <div class="addsub_process">
                                            <div style="width: 50%;">
                                                <label for="meeting-name"> Sub Process No</label> <br>
                                                <input type="text" name="subProcessNo" id="subProcessNo"
                                                    style="border: 1px solid #dddddd; width: 80%;">
                                            </div>

                                            <div style="width: 50%; float: right;margin-top: -65px;">
                                                <label for="meeting-name"> Sub Process Name</label> <br>
                                                <input type="text" name="subProcessName" id="subProcessName"
                                                    style="border: 1px solid #dddddd; width: 80%;">
                                            </div>
                                            <div style="width: 100%; margin-top: 10px;">
                                                <label for="meeting-name">Sub process Description</label><br>
                                                <input type="text" name="description" id="subpdescription"
                                                    style="border: 1px solid #dddddd;width: 90%; height: 50px;">
                                            </div>
                                            <div style="width: 50%;float: right; ">
                                                <label for="meeting-name"> Sub Process Owner</label> <br>
                                                <div style="width: 80%;height: 30px;">
                                                <select type="text" name="subProcessOwner" id="subProcessOwner" class="int-status-multi-select  userSelect"  name="states[]" multiple="multiple"
                                                    style="border: 1px solid #dddddd; width: 80%;"></select>
                                                    </div>
                                            </div>

                                            <div style="width: 50%; ">
                                                <label for="meeting-name" data-i18n="Department">Department</label>
                                                <div style="width: 80%;height: 30px;">
                                                    <select id="subProcessdept" class="int-status-multi-select mySelect"  name="states[]" multiple="multiple">
                                                    </select>
                                                </div>
                                            </div>
                                            <div style="width: 50%; float: right;">
                                                <label for="datepicker" style="margin-top: 5px;">Date</label> <br>

                                                <input type="date" placeholder="none"
                                                    style="width: 80% !important; border: 1px solid #dddddd;"
                                                    data-language="en" name="date" id="subpdate" />
                                            </div>
                                            <div style="width: 50%;float: right;">
                                                <label for="meeting-name">Operating Time</label><br>
                                                <div style="width: 80%;height: 30px;">
                                                <select name="operatingTime" id="subpoperatingTime" class="int-status-multi-select" name="states[]" multiple="multiple"
                                                    style="border: 1px solid #dddddd; width: 80%;height: 40px;">
                                                    <option>Select</option>
                                                    <option value="Before Trading Hour">Before Trading Hour</option>
                                                    <option value="After Trading Hour">After Trading Hour</option>
                                                    <option value="Trading Time"> Trading Time</option>
                                                </select>
</div>
                                            </div>
                                            <div style="width: 100%;">
                                                <label for="meeting-name">Strategis & Solution</label>
                                                <input type="text" name="stratgeAndSolution" id="subpstrategies"
                                                    style="border: 1px solid #dddddd; width: 90%; height: 50px;">
                                            </div>
</div>
                                 <div class="row">
                                            <div class="form-group col-md-12">
                                                <hr />
                                            </div>
                                            <div class="col-12">
                                                <div class="form-line right">
                                                    <button type="button" class="btn-default1 btn" data-dismiss="modal"
                                                        aria-label="Close" data-i18n="Cancel">
                                                        Cancel
                                                    </button>
                                                    <button class="initative_save_btn" value="Save" data-dismiss="modal" type="button"
                                                        onclick="saveSubProcess()" data-i18n="Save">Save</button>
                                                </div>
                                                </div>
                                            </div>

                                       
                        
                       
`);
                    });


                   
                </script>
                <script>
                    function toggleFields() {
                        var internalField = document.querySelector('.internal_feild');
                        var externalField = document.querySelector('.external_feild');
                        var selectedOption = document.querySelector('.int-status-multi-select').value;

                        if (selectedOption === 'Internal') {
                            internalField.style.display = 'block';
                            externalField.style.display = 'none';
                        } else if (selectedOption === 'External') {
                            internalField.style.display = 'none';
                            externalField.style.display = 'block';
                        }
                    }
                </script>
              
            <script>
                 //-----------------------------department-----------------------
                 function getAlldeptlist() {
                        $.ajax({
                            url: "/stratroom/allDepartmentList",
                            async: false,
                            success: function (employeeList) {
                            populateSelect(employeeList);
                            }
                        });
                    }
                    function populateSelect(data) {
                        var $select = $('.mySelect');
                        data.forEach(function (item) {
                            var $option = $('<option>', {
                                value: item.name,
                                text: item.name
                            });
                            $select.append($option);
                        });
                    }
                   
function getTechnologylist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",  
        async: false,
        dataType: 'json',
        success: function (employeeList) {
        technologySelect(employeeList);
        }
    });
}                
  function technologySelect(data) {
    var $select = $('.technologyService');
    data.forEach(function (list) {
        var $option = $('<option>', {
            text: list.data.itName,
            value: list.data.itName
        });
        $select.append($option);
    });
}

function getAllPersonlist() {
                        $.ajax({
                            url: "/stratroom/organization/employeeList",
                            async: false,
                            success: function (employeeList) {
                                personSelect(employeeList);
                            }
                        });
                    }
                    function personSelect(data) {
                        var $select = $('.userSelect');
                        data.forEach(function (item) {
                            var $option = $('<option>', {
                                value: item.name,
                                text: item.name
                            });
                            $select.append($option);
                        });
                    }
            </script>

 <script>
       $('.modal-custom-select').each(function () {
            let $this = $(this);
            $this.select2({
                width: "100%",
                dropdownParent: $this.closest('.modal')
            });
        });

        // Initialize Lucide icons
        lucide.createIcons();

function initSelect2($container) {
    $container.find('.modal-custom-select').each(function () {
        let $this = $(this);
        if (!$this.hasClass('select2-hidden-accessible')) { // prevent double init
            $this.select2({
                width: "100%",
                dropdownParent: $this.closest('.modal')
            });
        }
    });
}

initSelect2($(document));

        $(document).ready(function () {
            // Common DataTable options
            function initDataTable(selector) {
                return $(selector).DataTable({
                    lengthChange: false,
                    paging: true,
                    pagingType: "simple_numbers",
                    searching: false,
                    ordering: false,
                    info: false,
                    responsive: false,
                    scrollX: true,
                    language: {
                        paginate: {
                            previous: "<i class='fas fa-arrow-left'></i>",
                            next: "<i class='fas fa-arrow-right'></i>"
                        }
                    },
                    drawCallback: function () {
                        $(this.api().table().container())
                            .find('.dataTables_paginate')
                            .addClass('d-flex justify-content-end');
                    }
                });
            }

            // Init both tables
            let productTable = initDataTable('#productDataTable');
            let serviceTable = initDataTable('#servicesDataTable');
            let processTable = initDataTable('#processDataTable');
            let subprocessTable = initDataTable('#subprocessDataTable');
            let vitalRecordsTable = initDataTable('#vitalRecordsDataTable');
            let technologyTable = initDataTable('#technologyDataTable');
            let facilitiesTable = initDataTable('#facilitiesDataTable');
            let personalHRTable = initDataTable('#personalHRDataTable');
            let isoTable = initDataTable('#isoDataTable');
            let budgetTable = initDataTable('#budgetDataTable');
            // Fix column sizing on tab switch
            $(document).on('shown.bs.tab', '[data-bs-toggle="pill"], [data-bs-toggle="tab"]', function () {
                console.log('Tab shown, adjusting columns');
                $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
            });




        });

        $(document).ready(function () {
    // Initially hide both internal and external blocks
    $("#personalHR-personInternal").hide();
    $("#personalHR-personExternal").hide();

    // On change event of Person dropdown
    $("#personalHR-person-add").on("change", function () {
        let value = $(this).val();

        if (value === "Internal") {
            $("#personalHR-personInternal").show();
            $("#personalHR-personExternal").hide();
        } 
        else if (value === "External") {
            $("#personalHR-personExternal").show();
            $("#personalHR-personInternal").hide();
        } 
        else {
            $("#personalHR-personInternal").hide();
            $("#personalHR-personExternal").hide();
        }
    });
});

  


$(document).ready(function () {
  $("#add-external").on("click", function () {
    let name = $(".external-name").val().trim();
    let entity = $(".external-entity").val().trim();

    if (name === "" || entity === "") {
      alert("Please enter both Name and External Entity");
      return;
    }

    // Create a new row
    let newRow = `
      <div class="d-flex align-items-center mb-2 external-row">
        <input type="text" class="form-control me-2" value="${name}" />
        <input type="text" class="form-control me-2" value="${entity}" />
        <button type="button" class="btn btn-outline-danger btn-sm delete-external p-2"><i class="fas fa-trash"></i></button>
      </div>
    `;

    $("#external-list,#editexternal-list").append(newRow);

    // Clear input fields
    $(".external-name").val("");
    $(".external-entity").val("");
  });

  // Delete row
  $(document).on("click", ".delete-external", function () {
    $(this).closest(".external-row").remove();
  });
});


$(document).ready(function () {
  // Hide process fields initially
  $(".inputProcessBox").hide();
  $(".outputProcessBox").hide();

  // Toggle Input Process
  $(".inputTypeCheck").on("change", function () {
    if ($(this).is(":checked")) {
      $(".inputProcessBox").show();
    } else {
      $(".inputProcessBox").hide();
    }
  });

  // Toggle Output Process
  $(".outputTypeCheck").on("change", function () {
    if ($(this).is(":checked")) {
      $(".outputProcessBox").show();
    } else {
      $(".outputProcessBox").hide();
    }
  });
});





$(document).ready(function () {
    // Initially hide both blocks
    $("#inputProcessBox").hide();
    $("#inputSubProcessBox").hide();

    // On change event of Process/SubProcess dropdown
    $("#postype").on("change", function () {
        let value = $(this).val().trim(); // remove extra spaces
        console.log("Selected value:", value);

        if (value === "Process") {
            $("#inputProcessBox").show();
            $("#inputSubProcessBox").hide();
        } else if (value === "Sub Process") {  // must match value exactly
            $("#inputSubProcessBox").show();
            $("#inputProcessBox").hide();
        } else {
            $("#inputProcessBox").hide();
            $("#inputSubProcessBox").hide();
        }
    });
});


$(document).ready(function () {
    // Initially hide both blocks
    $("#inputProduct").hide();
    $("#inputService").hide();

    // On change event of Process/SubProcess dropdown
    $("#producttype").on("change", function () {
        let value = $(this).val().trim(); // remove extra spaces
        console.log("Selected value:", value);

        if (value === "Product") {
            $("#inputProduct").show();
            $("#inputService").hide();
        } else if (value === "Service") {  // must match value exactly
            $("#inputService").show();
            $("#inputProduct").hide();
        } else {
            $("#inputProduct").hide();
            $("#inputService").hide();
        }
    });
});



    </script>
     <script>
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Auto position notification dropdown or show offcanvas on mobile
        document.addEventListener('DOMContentLoaded', function() {
            const notificationDropdown = document.getElementById('notificationDropdown');
            const dropdownMenu = document.querySelector('[aria-labelledby="notificationDropdown"]');
            const notificationOffcanvas = document.getElementById('notificationOffcanvas');
            
            if (notificationDropdown && dropdownMenu && notificationOffcanvas) {
                // Override dropdown behavior on mobile
                notificationDropdown.addEventListener('click', function(e) {
                    const viewportWidth = window.innerWidth;
                    
                    if (viewportWidth <= 576) {
                        // Mobile: prevent dropdown and show offcanvas instead
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Remove dropdown attributes temporarily
                        const originalToggle = this.getAttribute('data-bs-toggle');
                        this.removeAttribute('data-bs-toggle');
                        
                        // Show offcanvas
                        const offcanvasInstance = new bootstrap.Offcanvas(notificationOffcanvas);
                        offcanvasInstance.show();
                        
                        // Restore dropdown attribute after a delay
                        setTimeout(() => {
                            this.setAttribute('data-bs-toggle', originalToggle);
                        }, 100);
                        
                        return false;
                    }
                });
                
                notificationDropdown.addEventListener('show.bs.dropdown', function(e) {
                    const viewportWidth = window.innerWidth;
                    
                    // Prevent dropdown on mobile
                    if (viewportWidth <= 576) {
                        e.preventDefault();
                        return false;
                    }
                    
                    // Reset classes for desktop
                    dropdownMenu.classList.remove('dropdown-menu-end', 'dropdown-menu-start');
                    
                    // Get dropdown trigger position
                    const triggerRect = notificationDropdown.getBoundingClientRect();
                    const dropdownWidth = 350; // Default dropdown width
                    const scrollbarWidth = 15; // Approximate scrollbar width
                    
                    // Calculate available space on right and left
                    const spaceRight = viewportWidth - triggerRect.right - scrollbarWidth;
                    const spaceLeft = triggerRect.left;
                    
                    // Auto position based on available space
                    if (spaceRight >= dropdownWidth) {
                        // Enough space on right, align to start (left)
                        dropdownMenu.classList.add('dropdown-menu-start');
                    } else if (spaceLeft >= dropdownWidth) {
                        // Not enough space on right but enough on left, align to end (right)
                        dropdownMenu.classList.add('dropdown-menu-end');
                    } else {
                        // Try to center or use the side with more space
                        if (spaceRight > spaceLeft) {
                            dropdownMenu.classList.add('dropdown-menu-start');
                        } else {
                            dropdownMenu.classList.add('dropdown-menu-end');
                        }
                    }
                });
                
                // Reset positioning on window resize
                window.addEventListener('resize', function() {
                    const viewportWidth = window.innerWidth;
                    
                    // Close dropdown if switching to mobile
                    if (viewportWidth <= 576 && dropdownMenu.classList.contains('show')) {
                        const dropdownInstance = bootstrap.Dropdown.getInstance(notificationDropdown);
                        if (dropdownInstance) {
                            dropdownInstance.hide();
                        }
                    }
                    
                    // Trigger repositioning if dropdown is open on desktop
                    if (viewportWidth > 576 && dropdownMenu.classList.contains('show')) {
                        notificationDropdown.dispatchEvent(new Event('show.bs.dropdown'));
                    }
                });
            }
        });
    </script>

            </body>