  //-----------------------------department-----------------------
                    // function getAlldeptlist() {
                    //     $.ajax({
                    //         url: "/stratroom/allDepartmentList",
                    //         async: false,
                    //         success: function (employeeList) {
                    //         populateSelect(employeeList);
                    //         }
                    //     });
                    // }
                    // function populateSelect(data) {
                    //     var $select = $('.mySelect');
                    //     data.forEach(function (item) {
                    //         var $option = $('<option>', {
                    //             value: item.id,
                    //             text: item.name
                    //         });
                    //         $select.append($option);
                    //     });
                    // }
                    // $('.mySelect').change(function () {
                    //     var selectedValue = $(this).val();
                    //     var selectedText = $(this).find('option:selected').text();

                    //     console.log($(this).val());
                    //     $(".selectedvalue").val(selectedValue);
                    //     $(".selectedname").val(selectedText);


                    // });
                    

//--------------------------delete---------------------------------------

let deleteId; 
function deleteData(id) {
    deleteId = id;

    $.ajax({
        url: "/stratroom/masterValue/" + deleteId,
        method: 'GET',
        success: function (data, status) {
            console.log(data);
            
        },
        error: readErrorMsg
    });
}

function deleteService() {
    if (!deleteId) {
        console.error("deleteId is not seted");
        return;
    }

    console.log(deleteId, "delete");

    $.ajax({
        url: "/stratroom/deleteMasterValue/" + deleteId,
        type: "DELETE",
        contentType: "application/json",
        success: function (data, status) {
            $.notify("Success: Deleted Successfully", {
                style: 'success',
                className: 'graynotify'
            });
             getProductData();
             getSerivceData();
             getProcessData();
             getSubProcessData();
             getIsoData();
             getVitalData();
             getTechData();
             getFacilityData();
             getPersonalData();
             getBudgetData();
            // location.reload(true);
        },
        error: readErrorMsg
    });
}
//========================GET API=======================
   $(document).ready(function () {
                        getAlldeptlist();
                        getAllPersonlist();
                        getProductData();
                        getSerivceData();
                        getProcessData();
                        getSubProcessData();
                        getIsoData();
                        getVitalData();
                        getTechData();
                        getFacilityData();
                        getPersonalData();
                        getTechnologylist();
                        getBudgetData();
                    })
 // function getAllUserlist() {	
                    // 		$.ajax({
                    // 			url : "/stratroom/findByUser",
                    // 			async:false,
                    // 			success : function(data, status) {
                    //                 console.log(data)

                    // 			}
                    // 		});

                    // }
 //---------------------------------Service Api---------------------------------
    function saveService() {

                        var serviceNo = $("#serviceNo").val();
                        var serviceName = $("#serviceName").val();
                        var description = $("#sdescription").val();
                        var departmentName = $("#serviceDept").val();
                        var serviceIncharge = $("#serviceIncharge").val();

                        var serviceData = {
                            "name": "Product/Service",
                            "createdBy": "",
                            "createdAt": "",
                            "department": "0",
                            "type": "Service",
                            "data": {
                                "serviceNo": serviceNo,
                                "serviceName": serviceName,
                                "description": description,
                                "department": departmentName,
                                "serviceIncharge": serviceIncharge
                            }
                        }
                        console.log(serviceData)
                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(serviceData),
                            success: function (data, status) {
                                $.notify("Success: Service data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                                getSerivceData();
                            },
                            error: readErrorMsg
                        });
                        
                        document.getElementById('serviceNo').value = '';
                        document.getElementById('serviceName').value = '';
                        document.getElementById('sdescription').value = '';
                        $('#serviceDept').val(null).trigger('change');
                        $('#serviceIncharge').val(null).trigger('change');

                    }

 function getSerivceData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=Service",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#service_tab').empty();
                                var uploadShowData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                   uploadShowData += `
<tr>
    <td class="text-center">${List.data.serviceNo}</td>
    <td class="text-center">${List.data.serviceName}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            ${List.data.description}
        </div>
    </td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
           <span class="badge label-bg-dark">  ${List.data.department}</span>
        </div>
    </td>
    <td class="text-center">
         <div style="min-width:250px; white-space:normal;">
            ${List.data.serviceIncharge}
        </div>
    </td>
    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon"
               href="#service-edit-modal"
               data-bs-toggle="modal"
               onclick="editService(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                </span>
            </a>
            <a class="btn btn-sm btn-outline-icon"
               href="#delete-modal"
               data-bs-toggle="modal"
               onclick="deleteData(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                </span>
            </a>
        </div>
    </td>
</tr>`;
                                });
                                var table =uploadShowData;

                                $("#service_tab").append(table);
                                $('[rel="tooltip"]').tooltip();
                                //  $("#service_tab").paging({ limit: 5 });

                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
 function editService(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".editserviceid").val(data.id);           
                 $(".editserviceNo").val(  data.data.serviceNo);
                 $(".editserviceName").val(  data.data.serviceName);
                 $(".editsdescription").val( data.data.description);
                //  $(".mySelect").val(  data.data.department);
                let sdeptValues = data.data.department; 
                if (Array.isArray(sdeptValues)) {
                    $("#updateServiceDept").val(sdeptValues).trigger('change');
                } else {
                  
                    $("#updateServiceDept").val([sdeptValues]).trigger('change');
                }

                //  $("#editserviceIncharge").val( data.data.serviceIncharge);
                let serviceValues = data.data.serviceIncharge; 
                if (Array.isArray(serviceValues)) {
                    $("#editserviceIncharge").val(serviceValues).trigger('change');
                } else {
                  
                    $("#editserviceIncharge").val([serviceValues]).trigger('change');
                }
                            },
                            error: readErrorMsg,
                            
                        });
                    }
//---------------------------update-----------------------------
 function updateService() {
    var id = $(".editserviceid").val();
                        var serviceNo = $(".editserviceNo").val();
                        var serviceName = $(".editserviceName").val();
                        var description = $(".editsdescription").val();
                         var departmentName = $("#updateServiceDept").val();
                        var serviceIncharge = $("#editserviceIncharge").val();

                        var serviceData = {
                            "id":id,
                            "name": "Product/Service",
                            "createdBy": "",
                            "createdAt": "",
                            "department": "0",
                            "type": "Service",
                            "data": {
                                "serviceNo": serviceNo,
                                "serviceName": serviceName,
                                "description": description,
                                "department": departmentName,
                                "serviceIncharge": serviceIncharge
                            }
                        }
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(serviceData),
                            success: function (data, status) {
                                $.notify("Success:Service successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getSerivceData();
                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
                   
//---------------------------------Product Api---------------------------------
 function saveProduct() {

                        var productNo = $("#productNo").val();
                        var productName = $("#productName").val();
                        var prodescription = $("#prodescription").val();
                        // var departmentId = $(".selectedvalue").val();
                        var departmentName = $("#prodepart").val();
                        var personIncharge = $("#propersonIncharge").val();

                        var productData = {

                            "name": "Product/Service",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Product",
                            "data": {
                                "productNo": productNo,
                                "productName": productName,
                                "description": prodescription,
                                "department": departmentName,
                                "personIncharge": personIncharge
                            }

                        }
                        console.log(productData);

                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(productData),
                            success: function (data, status) {
                                $.notify("Success: product data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                            
                                //// location.reload(true);
                                getProductData();
                            },
                            error: readErrorMsg
                        });

                        document.getElementById('productNo').value = '';
                        document.getElementById('productName').value = '';
                        document.getElementById('prodescription').value = '';
                        $('#prodepart').val(null).trigger('change');
                        $('#propersonIncharge').val(null).trigger('change');
                    }

                    //------------------------------get---------------------
                    function getProductData() {
                        const storedLanguage = localStorage.getItem("selectedLang") || "en"
                        loadLanguage(storedLanguage);

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=Product",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#product_tab').empty();
                                var uploadProductData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                  uploadProductData += `
<tr>
    <td class="text-center">${List.data.productNo}</td>
    <td class="text-center">${List.data.productName}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
             ${List.data.description}
        </div>
    </td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
           <span class="badge label-bg-dark"> ${List.data.department}</span>
        </div>
    </td>
    <td class="text-center">${List.data.personIncharge}</td>
    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon"
                href="#product-edit-modal"
                data-bs-toggle="modal"
                onclick="editProduct(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                </span>
            </a>
            <a class="btn btn-sm btn-outline-icon"
                href="#delete-modal"
                data-bs-toggle="modal"
                onclick="deleteData(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                </span>
            </a>
        </div>
    </td>
</tr>`;

   });
                                var table = uploadProductData;

                                $("#product_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//---------------------------update-----------------------------
function editProduct(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
            
                $(".editproductid").val(data.id);             
                 $(".editproductNo").val(  data.data.productNo);
                 $(".editproductName").val(  data.data.productName);
                 $(".editprodescription").val( data.data.description);
                //  $(".prodept").val( data.data.department);
                 let departmentValues = data.data.department;
                 if (Array.isArray(departmentValues)) {
                     $("#productdept").val(departmentValues).trigger('change');
                 } else {
                     $("#productdept").val([departmentValues]).trigger('change');
                 }
                
                

    
                 let personInChargeValues = data.data.personIncharge; 
                 if (Array.isArray(personInChargeValues)) {
                     $("#editpropersonIncharge").val(personInChargeValues).trigger('change');
                 } else {
                   
                     $("#editpropersonIncharge").val([personInChargeValues]).trigger('change');
                 }
                 
                            },
                            error: readErrorMsg
                        });
                    }
                    
 function updateProduct() {
                        var id =$(".editproductid").val();
                        var productNo = $(".editproductNo").val();
                        var productName = $(".editproductName").val();
                        var prodescription = $(".editprodescription").val();
                        // var departmentId = $(".selectedvalue").val();
                        var departmentName = $("#productdept").val();
                        var personIncharge = $("#editpropersonIncharge").val();

                        var productData = {
                            "id":id,
                            "name": "Product/Service",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Product",
                            "data": {
                                "productNo": productNo,
                                "productName": productName,
                                "description": prodescription,
                                "department": departmentName,
                                "personIncharge": personIncharge
                            }

                        }
                        console.log(productData);
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(productData),
                            success: function (data, status) {
                                $.notify("Success: product data form successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getProductData();
                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//---------------------------------subprocess Api---------------------------------
 function saveProcess() {

                        var processNO = $("#processNO").val();
                        var processName = $("#processName").val();
                        var processDescripton = $("#processDescripton").val();
                        var processOwner = $("#processOwner").val();
                        var departmentName = $("#processDept").val();
                        var date = $("#procdate").val();
                        var operatingTime = $("#procoperatingTime").val();
                        var strategies = $("#procstrategies").val();

                        var processData = {

                            "name": "Process/SubProcess",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Process",
                            "data": {
                                "processNO": processNO,
                                "processName": processName,
                                "processDescripton": processDescripton,
                                "processOwner": processOwner,
                                "departMent": departmentName,
                                "date": date,
                                "operatingTime": operatingTime,
                                "strategies": strategies
                            }
                        }
                        console.log(processData)
                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(processData),
                            success: function (data, status) {
                                $.notify("Success: Process data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                                getProcessData();
                            },
                            error: readErrorMsg
                        });

                        
                        document.getElementById('processNO').value = '';
                        document.getElementById('processName').value = '';
                        document.getElementById('processDescripton').value = '';
                        $('#processOwner').val(null).trigger('change');
                        $('#processDept').val(null).trigger('change');
                        document.getElementById('procdate').value = '';
                        $('#procoperatingTime').val(null).trigger('change');
                        // document.getElementById('procoperatingTime').value = '';
                        document.getElementById('procstrategies').value = '';
                    }
                    //------------------------------get---------------------

                    function getProcessData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=Process",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#process_tab').empty();
                                var uploadProcessData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                   uploadProcessData += `
<tr>
    <td class="text-center">${List.data.processNO}</td>
    <td class="text-center">${List.data.processName}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            ${List.data.processDescripton}
        </div>
    </td>
    <td class="text-center">   <span class="badge label-bg-dark">${List.data.departMent}</span></td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
          ${List.data.processOwner} 
        </div>
    </td>
    <td class="text-center">${List.data.date}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            <span class="badge label-bg-dark">${List.data.operatingTime}</span>
        </div>
    </td>
    <td class="text-center">${List.data.strategies}</td>
    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon"
               href="#process-edit-modal"
               data-bs-toggle="modal"
               onclick="editProcess(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                </span>
            </a>
            <a class="btn btn-sm btn-outline-icon"
               href="#delete-modal"
               data-bs-toggle="modal"
               onclick="deleteData(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                </span>
            </a>
        </div>
    </td>
</tr>`;
                                });
                                var table = uploadProcessData;

                                $("#process_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//------------------------------update-------------------


function editProcess(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".editprocessid").val(data.id);           
                 $(".editprocessNO").val( data.data.processNO);
                 $(".editprocessName").val(  data.data.processName);
                 $(".editprocessDescripton").val(data.data.processDescripton);
                //  $("#editprocessOwner").val(  data.data.processOwner);
                let processValues = data.data.processOwner; 
                if (Array.isArray(processValues)) {
                    $("#editprocessOwner").val(processValues).trigger('change');
                } else {
                  
                    $("#editprocessOwner").val([processValues]).trigger('change');
                }

                 $(".editprocdate").val(  data.data.date);
                //  $(".editprocoperatingTime").val( data.data.operatingTime);
                 let optValues = data.data.operatingTime; 
                if (Array.isArray(optValues)) {
                    $(".editprocoperatingTime").val(optValues).trigger('change');
                } else {
                  
                    $(".editprocoperatingTime").val([optValues]).trigger('change');
                }
                //  $(".mySelect").val( data.data.departMent);
                let deptValues = data.data.departMent; 
                if (Array.isArray(deptValues)) {
                    $("#updateProcessDept").val(deptValues).trigger('change');
                } else {
                  
                    $("#updateProcessDept").val([deptValues]).trigger('change');
                }
                 $(".editprocstrategies").val(  data.data.strategies);
                            },
                            error: readErrorMsg
                        });
                    }
 function updateProcess() {
    var id = $(".editprocessid").val();
                       var processNO = $(".editprocessNO").val();
                        var processName = $(".editprocessName").val();
                        var processDescripton = $(".editprocessDescripton").val();
                        var processOwner = $("#editprocessOwner").val();                   
                        var departmentName = $("#updateProcessDept").val();
                        var date = $(".editprocdate").val();
                        var operatingTime = $(".editprocoperatingTime").val();
                        var strategies = $(".editprocstrategies").val();

                        var processData = {
                            "id":id,
                            "name": "Process/SubProcess",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Process",
                            "data": {
                                "processNO": processNO,
                                "processName": processName,
                                "processDescripton": processDescripton,
                                "processOwner": processOwner,
                                "departMent": departmentName,
                                "date": date,
                                "operatingTime": operatingTime,
                                "strategies": strategies
                            }
                        }
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(processData),
                            success: function (data, status) {
                                $.notify("Success: Process successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });                       
                                 getProcessData();
                                
                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//---------------------------------subprocess Api---------------------------------
                    function saveSubProcess() {


                        var subProcessNo = $("#subProcessNo").val();
                        var subProcessName = $("#subProcessName").val();
                        var description = $("#subpdescription").val();
                        var subProcessOwner = $("#subProcessOwner").val();
                        var departmentName = $("#subProcessdept").val();
                        var date = $("#subpdate").val();
                        var operatingTime = $("#subpoperatingTime").val();
                        var stratgeAndSolution = $("#subpstrategies").val();

                        var subProcessData = {

                            "name": "Process/SubProcess",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "SubProcess",
                            "data": {
                                "subProcessNo": subProcessNo,
                                "subProcessName": subProcessName,
                                "description": description,
                                "subProcessOwner": subProcessOwner,
                                "departMent": departmentName,
                                "date": date,
                                "operatingTime": operatingTime,
                                "stratgeAndSolution": stratgeAndSolution
                            }

                        }

                        console.log(subProcessData);
                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(subProcessData),
                            success: function (data, status) {
                                $.notify("Success: Subprocess data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                                // // location.reload(true);
                                getSubProcessData();
                         
                            },
                            error: readErrorMsg
                        });

                        document.getElementById('subProcessNo').value = '';
                        document.getElementById('subProcessName').value = '';
                        document.getElementById('subpdescription').value = '';
                        $('#subProcessOwner').val(null).trigger('change');
                        $('#subProcessdept').val(null).trigger('change');
                        document.getElementById('subpdate').value = '';
                        document.getElementById('subpstrategies').value = '';
                        $('#subpoperatingTime').val(null).trigger('change');
                    }

                    //----------------------------get----------------------------
                    function getSubProcessData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=SubProcess",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#subprocess_tab').empty();
                                var uploadSubProcessData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                uploadSubProcessData += `
<tr>
    <td class="text-center">${List.data.subProcessNo}</td>
    <td class="text-center">${List.data.subProcessName}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            ${List.data.description}
        </div>
    </td>
    <td class="text-center"><span class="badge label-bg-dark">${List.data.departMent} </span></td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
        ${List.data.subProcessOwner}    
        </div>
    </td>
    <td class="text-center">${List.data.date}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            <span class="badge label-bg-dark">${List.data.operatingTime}</span>
        </div>
    </td>
    <td class="text-center">${List.data.stratgeAndSolution}</td>
    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon"
               href="#subprocess-edit-modal"
               data-bs-toggle="modal"
               onclick="editSubProcess(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                </span>
            </a>
            <a class="btn btn-sm btn-outline-icon"
               href="#delete-modal"
               data-bs-toggle="modal"
               onclick="deleteData(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                </span>
            </a>
        </div>
    </td>
</tr>`;
  });
                                var table = uploadSubProcessData;

                                $("#subprocess_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }

//------------------------------update-------------------------------

function editSubProcess(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".editsubprocessid").val(data.id);             
                 $(".editsubProcessNo").val( data.data.subProcessNo);
                 $(".editsubProcessName").val(  data.data.subProcessName);
                 $(".editsubpdescription").val(  data.data.description);
                //  $("#editsubProcessOwner").val(  data.data.subProcessOwner);
                let subProcessValues = data.data.subProcessOwner; 
                if (Array.isArray(subProcessValues)) {
                    $("#editsubProcessOwner").val(subProcessValues).trigger('change');
                } else {
                  
                    $("#editsubProcessOwner").val([subProcessValues]).trigger('change');
                }
                 $(".editsubpdate").val(  data.data.date);
                //  $(".editsubpoperatingTime").val( data.data.operatingTime);
                let optValues = data.data.operatingTime; 
                if (Array.isArray(optValues)) {
                    $(".editsubpoperatingTime").val(optValues).trigger('change');
                } else {
                  
                    $(".editsubpoperatingTime").val([optValues]).trigger('change');
                }
                //  $(".mySelect").val( data.data.departMent);
                 let subDeptValues = data.data.departMent; 
                 if (Array.isArray(subDeptValues)) {
                     $("#updateSubProcessDept").val(subDeptValues).trigger('change');
                 } else {
                   
                     $("#updateSubProcessDept").val([subDeptValues]).trigger('change');
                 }
                 $(".editsubpstrategies").val(  data.data.stratgeAndSolution);
                            },
                            error: readErrorMsg
                        });
                    }
function updateSubProcess() {

    var id = $(".editsubprocessid").val();
                        var subProcessNo = $(".editsubProcessNo").val();
                        var subProcessName = $(".editsubProcessName").val();
                        var description = $(".editsubpdescription").val();
                        var subProcessOwner = $("#editsubProcessOwner").val();
                        var departmentId = $(".selectedvalue").val();
                        var departmentName = $("#updateSubProcessDept").val();
                        var date = $(".editsubpdate").val();
                        var operatingTime = $(".editsubpoperatingTime").val();
                        var stratgeAndSolution = $(".editsubpstrategies").val();

                        var subProcessData = {
                            "id":id,
                            "name": "Process/SubProcess",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "SubProcess",
                            "data": {
                                "subProcessNo": subProcessNo,
                                "subProcessName": subProcessName,
                                "description": description,
                                "subProcessOwner": subProcessOwner,
                                "departMent": departmentName,
                                "date": date,
                                "operatingTime": operatingTime,
                                "stratgeAndSolution": stratgeAndSolution
                            }

                        }
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(subProcessData),
                            success: function (data, status) {
                                $.notify("Success:SubProcess successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getSubProcessData();
                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//------------------------------ISO------------------------------------
                    function isoDescription() {

                        var isoCode = $("#isoCode").val();
                        var isoDescription = $("#isoDescription").val();

                        var isoData = {
                            "name": "ISO",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "ISO",
                            "data": {
                                "isoCode": isoCode,
                                "isoDescription": isoDescription
                            }

                        }
                        console.log(isoData)


                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(isoData),
                            success: function (data, status) {
                                $.notify("Success: Iso data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                               
                                //// location.reload(true);
                                getIsoData();
                            },
                            error: readErrorMsg
                        });

                        document.getElementById('isoCode').value = '';
                        document.getElementById('isoDescription').value = '';
                        
                    }
                    //-----------------get------------------------

                    function getIsoData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=ISO",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#iso_tab').empty();
                                var isoData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                   isoData += `
<tr>
    <td class="text-center">${List.data.isoCode}</td>
    <td class="text-center"><div style="min-width:250px; white-space:normal;">${List.data.isoDescription}</div></td>

    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon" href="#iso-edit-modal"
               data-bs-toggle="modal" onclick="editIso(${List.id})">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                </span>
            </a>

            <a class="btn btn-sm btn-outline-icon" href="#delete-modal"
               data-bs-toggle="modal" onclick="deleteData(${List.id})">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                </span>
            </a>
        </div>
    </td>
</tr>`;
                                });
                                var table =isoData;

                                $("#iso_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }



                 

//-----------------------------update---------------------------------
function editIso(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".editisoid").val(data.id);                
                 $(".editisoCode").val( data.data.isoCode);
                 $(".editisoDescription").val(  data.data.isoDescription);
                            },
                            error: readErrorMsg
                        });
                    }
function updateisoDesc() { 

                        var id = $(".editisoid").val();
                        var isoCode = $(".editisoCode").val();
                        var isoDescription = $(".editisoDescription").val();

                        var isoData = {
                            "id":id,
                            "name": "ISO",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "ISO",
                            "data": {
                                "isoCode": isoCode,
                                "isoDescription": isoDescription
                            }

                        }
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(isoData),
                            success: function (data, status) {
                                $.notify("Success: ISO successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getIsoData();
                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
                    
                    



//----------------------vital API----------------------

                    function vitalRecords() {

                        var vitalNo = $("#vitalNo").val();
                        var vitalName = $("#vitalName").val();
                        var description = $("#vdescription").val();
                        var itSystem = $("#vitSystem").val();
                        var inputProcess = $("#vinputProcess").val();
                        var outputProcess = $("#voutputProcess").val();
                        var normalIncidents = $("#vnormalIncidents").val();
                        var recoveryStrategy = $("#vrecoveryStrategy").val();
                        var responsiblePerson = $("#vresponsiblePerson").val();
                        var emergency = $("#vemergency").val();
                        var emrRecoveryStrategy = $("#vemrRecoveryStrategy").val();
                        var emrResponsiblePerson = $("#vemrResponsiblePerson").val();
                        var disaster = $("#vdisaster").val();
                        var disRecoveryStrategy = $("#vdisRecoveryStrategy").val();
                        var disResponsiblePerson = $("#vdisResponsiblePerson").val();

                        var vitalData = {

                            "name": "Vital Records",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Vital",
                            "data": {
                                "vitalNo": vitalNo,
                                "vitalName": vitalName,
                                "description": description,
                                "itSystem":itSystem,
                                "inputProcess": inputProcess,
                                "outputProcess": outputProcess,
                                "normalIncidents": normalIncidents,
                                "recoveryStrategy": recoveryStrategy,
                                "responsiblePerson": responsiblePerson,
                                "emergency": emergency,
                                "emrRecoveryStrategy": emrRecoveryStrategy,
                                "emrResponsiblePerson": emrResponsiblePerson,
                                "disaster": disaster,
                                "disRecoveryStrategy": disRecoveryStrategy,
                                "disResponsiblePerson": disResponsiblePerson
                            }
                        }
                        console.log(vitalData)


                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(vitalData),
                            success: function (data, status) {
                                $.notify("Success: Vital data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                                getVitalData();
                            },
                            error: readErrorMsg
                        });

                        document.getElementById('vitalNo').value = '';
                        document.getElementById('vitalName').value = '';
                        document.getElementById('vdescription').value = '';
                        $('#vitSystem').val(null).trigger('change');
                        document.getElementById('vinputProcess').value = '';
                        document.getElementById('voutputProcess').value = '';
                        document.getElementById('vnormalIncidents').value = '';
                        document.getElementById('vrecoveryStrategy').value = '';
                        document.getElementById('vemergency').value = '';
                        document.getElementById('vemrRecoveryStrategy').value = '';
                        document.getElementById('vdisaster').value = '';
                        document.getElementById('vdisRecoveryStrategy').value = '';
                        $('#vresponsiblePerson').val(null).trigger('change');
                        $('#vemrResponsiblePerson').val(null).trigger('change');
                        $('#vdisResponsiblePerson').val(null).trigger('change');
                        let checkboxes = document.getElementsByClassName('input_type');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }

        checkboxes = document.getElementsByClassName('output_type');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
                    }
 //-----------------get------------------------

                    function getVitalData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=Vital",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#vital_tab').empty();
                                var vitalData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                    vitalData += `
<tr>
    <td class="text-center">${List.data.vitalNo}</td>
    <td class="text-center">${List.data.vitalName}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            ${List.data.description}
        </div>
    </td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            <span class="badge label-bg-dark">${List.data.itSystem}</span>
        </div>
    </td>
    <td class="text-center">${List.data.inputProcess}</td>
    <td class="text-center">${List.data.outputProcess}</td>
    <td class="text-center">${List.data.normalIncidents}</td>
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            ${List.data.recoveryStrategy}
        </div>
    </td>
    <td class="text-center">${List.data.responsiblePerson}</td>
    <td class="text-center">${List.data.emergency}</td>
    <td class="text-center">${List.data.emrRecoveryStrategy}</td>
    <td class="text-center">${List.data.emrResponsiblePerson}</td>
    <td class="text-center">${List.data.disaster}</td>
    <td class="text-center">${List.data.disRecoveryStrategy}</td>
    <td class="text-center">${List.data.disResponsiblePerson}</td>
    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon"
               href="#vital-records-edit-modal"
               data-bs-toggle="modal"
               onclick="editVital(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                </span>
            </a>
            <a class="btn btn-sm btn-outline-icon"
               href="#delete-modal"
               data-bs-toggle="modal"
               onclick="deleteData(${List.id}); return false;">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                </span>
            </a>
        </div>
    </td>
</tr>`;


                                });
                                var table = vitalData;

                                $("#vital_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//-----------------------update------------------------------
function editVital(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".editvitalid").val(data.id);              
                 $(".editvitalNo").val(  data.data.vitalNo);
                 $(".editvitalName").val(data.data.vitalName);
                 $(".editvdescription").val( data.data.description);
                 $(".updatetechnologyselect").val(data.data.itSystem);
                 let itSystemValues = data.data.itSystem; 
                if (Array.isArray(itSystemValues)) {
                    $("#technologyServiceUpdate").val(itSystemValues).trigger('change');
                } else {
                  
                    $("#technologyServiceUpdate").val([itSystemValues]).trigger('change');
                }
                 $("#editvinputProcess").val( data.data.inputProcess);
                
                 $("#editvoutputProcess").val(  data.data.outputProcess);
                
                 $(".editvnormalIncidents").val( data.data.normalIncidents);
                 $(".editvrecoveryStrategy").val(data.data.recoveryStrategy);
                //  $("#editvresponsiblePerson").val( data.data.responsiblePerson);
                let vnormalValues = data.data.responsiblePerson; 
                if (Array.isArray(vnormalValues)) {
                    $("#editvresponsiblePerson").val(vnormalValues).trigger('change');
                } else {
                  
                    $("#editvresponsiblePerson").val([vnormalValues]).trigger('change');
                }
                 $(".editvemergency").val( data.data.emergency);
                 $(".editvemrRecoveryStrategy").val( data.data.emrRecoveryStrategy);
                //  $("#editvemrResponsiblePerson").val(data.data.emrResponsiblePerson);
                let vemergenyValues = data.data.emrResponsiblePerson; 
                if (Array.isArray(vemergenyValues)) {
                    $("#editvemrResponsiblePerson").val(vemergenyValues).trigger('change');
                } else {
                  
                    $("#editvemrResponsiblePerson").val([vemergenyValues]).trigger('change');
                }
                 $(".editvdisaster").val(  data.data.disaster);
                 $(".editvdisRecoveryStrategy").val(data.data.disRecoveryStrategy);
                //  $("#editvdisResponsiblePerson").val(data.data.disResponsiblePerson);
                let vdisasterValues = data.data.disResponsiblePerson; 
                if (Array.isArray(vdisasterValues)) {
                    $("#editvdisResponsiblePerson").val(vdisasterValues).trigger('change');
                } else {
                  
                    $("#editvdisResponsiblePerson").val([vdisasterValues]).trigger('change');
                }
                            },
                            error: readErrorMsg
                        });
                    }
 function updatevitalRecords() {
    var id = $(".editvitalid").val();
                        var vitalNo = $(".editvitalNo").val();
                        var vitalName = $(".editvitalName").val();
                        var description = $(".editvdescription").val();
                        var itSystem=$("#technologyServiceUpdate").val();
                        var inputProcess = $("#editvinputProcess").val();
                        var outputProcess = $("#editvoutputProcess").val();
                        var normalIncidents = $(".editvnormalIncidents").val();
                        var recoveryStrategy = $(".editvrecoveryStrategy").val();
                        var responsiblePerson = $("#editvresponsiblePerson").val();
                        var emergency = $(".editvemergency").val();
                        var emrRecoveryStrategy = $(".editvemrRecoveryStrategy").val();
                        var emrResponsiblePerson = $("#editvemrResponsiblePerson").val();
                        var disaster = $(".editvdisaster").val();
                        var disRecoveryStrategy = $(".editvdisRecoveryStrategy").val();
                        var disResponsiblePerson = $("#editvdisResponsiblePerson").val();

                        var vitalData = {
                            "id":id,
                            "name": "Vital Records",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Vital",
                            "data": {
                                "vitalNo": vitalNo,
                                "vitalName": vitalName,
                                "description": description,
                                "itSystem":itSystem,
                                "inputProcess": inputProcess,
                                "outputProcess": outputProcess,
                                "normalIncidents": normalIncidents,
                                "recoveryStrategy": recoveryStrategy,
                                "responsiblePerson": responsiblePerson,
                                "emergency": emergency,
                                "emrRecoveryStrategy": emrRecoveryStrategy,
                                "emrResponsiblePerson": emrResponsiblePerson,
                                "disaster": disaster,
                                "disRecoveryStrategy": disRecoveryStrategy,
                                "disResponsiblePerson": disResponsiblePerson
                            }
                        }
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(vitalData),
                            success: function (data, status) {
                                $.notify("Success:Vital successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getVitalData();
                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//----------------------------facility--------------------

                    function facilityDesc() {

                        var facilityNo = $("#facilityNo").val();
                        var facilityName = $("#facilityName").val();
                        var description = $("#fdescription").val();
                        var departmentName = $("#facilitydept").val();
                        var personIncharge = $("#fpersonIncharge").val();
                        var normalIncidents = $("#fnormalIncidents").val();
                        var recoveryStrategy = $("#frecoveryStrategy").val();
                        var responsiblePerson = $("#fresponsiblePerson").val();
                        var emergency = $("#femergency").val();
                        var emrRecoveryStrategy = $("#femrRecoveryStrategy").val();
                        var emrResponsiblePerson = $("#femrResponsiblePerson").val();
                        var disaster = $("#fdisaster").val();
                        var disRecoveryStrategy = $("#fdisRecoveryStrategy").val();
                        var disResponsiblePerson = $("#fdisResponsiblePerson").val();

                        var facilityData = {

                            "name": "Facilities&Utilities",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Facility",
                            "data": {
                                "facilityNo": facilityNo,
                                "facilityName": facilityName,
                                "description": description,
                                "department": departmentName,
                                "personIncharge": personIncharge,
                                "normalIncidents": normalIncidents,
                                "recoveryStrategy": recoveryStrategy,
                                "responsiblePerson": responsiblePerson,
                                "emergency": emergency,
                                "emrRecoveryStrategy": emrRecoveryStrategy,
                                "emrResponsiblePerson": emrResponsiblePerson,
                                "disaster": disaster,
                                "disRecoveryStrategy": disRecoveryStrategy,
                                "disResponsiblePerson": disResponsiblePerson
                            }
                        }
                        console.log(facilityData)


                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(facilityData),
                            success: function (data, status) {
                                $.notify("Success: Facility data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                            
                                //// location.reload(true);
                                getFacilityData();
                            },
                            error: readErrorMsg
                        });

                        document.getElementById('facilityNo').value = '';
                        document.getElementById('facilityName').value = '';
                        document.getElementById('fdescription').value = '';
                        $('#facilitydept').val(null).trigger('change');
                        $('#fpersonIncharge').val(null).trigger('change');
                        document.getElementById('fnormalIncidents').value = '';
                        document.getElementById('frecoveryStrategy').value = '';
                        document.getElementById('femergency').value = '';
                        document.getElementById('femrRecoveryStrategy').value = '';
                        document.getElementById('fdisaster').value = '';
                        document.getElementById('fdisRecoveryStrategy').value = '';
                        $('#fresponsiblePerson').val(null).trigger('change');
                        $('#femrResponsiblePerson').val(null).trigger('change');
                        $('#fdisResponsiblePerson').val(null).trigger('change');
                    }
                    function getFacilityData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=Facility",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#facilities_tab').empty();
                                var facilityData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                    facilityData += '<tr>' +
    '<td class="text-center">' + List.data.facilityNo + '</td>' +
    '<td class="text-center">' + List.data.facilityName + '</td>' +
    '<td class="text-center"><div style="min-width:250px; white-space:normal;">' + List.data.description + '</div></td>' +
    '<td class="text-center"><div style="min-width:250px; white-space:normal;"> <span class="badge label-bg-dark">' + List.data.department + '</span></div></td>' +

    // Person in charge with avatar group
    '<td class="text-center">' +List.data.personIncharge + '</td>' +

    '<td class="text-center">' + List.data.normalIncidents + '</td>' +
    '<td class="text-center">' + List.data.recoveryStrategy + '</td>' +
    '<td class="text-center">' + List.data.responsiblePerson + '</td>' +
    '<td class="text-center">' + List.data.emergency + '</td>' +
    '<td class="text-center">' + List.data.emrRecoveryStrategy + '</td>' +
    '<td class="text-center">' + List.data.emrResponsiblePerson + '</td>' +
    '<td class="text-center">' + List.data.disaster + '</td>' +
    '<td class="text-center">' + List.data.disRecoveryStrategy + '</td>' +
    '<td class="text-center">' + List.data.disResponsiblePerson + '</td>' +

    // Action buttons
    '<td class="text-center">' +
        '<div class="table-actions justify-content-end">' +
            '<a class="btn btn-sm btn-outline-icon" href="#facilites-edit-modal" data-bs-toggle="modal" onclick="editFacility(' + List.id + '); return false;">' +
                '<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">' +
                    '<img src="/stratroom/images/edit-i.svg" width="12" height="12" />' +
                '</span>' +
            '</a>' +
            '<a class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal" onclick="deleteData(' + List.id + '); return false;">' +
                '<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">' +
                    '<img src="/stratroom/images/delete-i.svg" width="12" height="12" />' +
                '</span>' +
            '</a>' +
        '</div>' +
    '</td>' +
'</tr>';


                                });
                                var table = facilityData;

                                $("#facilities_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//=-----------------------update----------------------------
function editFacility(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".editfacilityid").val(data.id);             
                 $(".editfacilityNo").val(data.data.facilityNo);
                 $(".editfacilityName").val(  data.data.facilityName);
                 $(".editfdescription").val(data.data.description);
                //  $(".mySelect").val(  data.data.department);
                 let facilityDeptValues = data.data.department; 
                 if (Array.isArray(facilityDeptValues)) {
                     $("#updatefacilityDept").val(facilityDeptValues).trigger('change');
                 } else {
                   
                     $("#updatefacilityDept").val([facilityDeptValues]).trigger('change');
                 }
                $(".userSelect").val(null).trigger('change');
                 let personInChargeValues = data.data.personIncharge; 
                 if (Array.isArray(personInChargeValues)) {
                     $("#editfpersonIncharge").val(personInChargeValues).trigger('change');
                 } else {
                   
                     $("#editfpersonIncharge").val([personInChargeValues]).trigger('change');
                 }
                 $(".editfnormalIncidents").val( data.data.normalIncidents);
                 $(".editfrecoveryStrategy").val( data.data.recoveryStrategy);              
                 let normalValues = data.data.responsiblePerson; 
                 if (Array.isArray(normalValues)) {
                     $("#editfresponsiblePerson").val(normalValues).trigger('change');
                 } else {
                   
                     $("#editfresponsiblePerson").val([normalValues]).trigger('change');
                 }
                 $(".editfemergency").val(  data.data.emergency);
                 $(".editfemrRecoveryStrategy").val(  data.data.emrRecoveryStrategy);
                 let emergencyValues = data.data.emrResponsiblePerson; 
                 if (Array.isArray(emergencyValues)) {
                     $("#editfemrResponsiblePerson").val(emergencyValues).trigger('change');
                 } else {
                   
                     $("#editfemrResponsiblePerson").val([emergencyValues]).trigger('change');
                 }
                 $(".editfdisaster").val( data.data.disaster);
                 $(".editfdisRecoveryStrategy").val( data.data.disRecoveryStrategy);
                 let disasterValues = data.data.disResponsiblePerson; 
                 if (Array.isArray(disasterValues)) {
                     $("#editfdisResponsiblePerson").val(disasterValues).trigger('change');
                 } else {
                   
                     $("#editfdisResponsiblePerson").val([disasterValues]).trigger('change');
                 }
                            },
                            error: readErrorMsg
                        });
                    }

function updatefacilityDesc() {
                         var id = $(".editfacilityid").val();
                       var facilityNo = $(".editfacilityNo").val();
                        var facilityName = $(".editfacilityName").val();
                        var description = $(".editfdescription").val();
                        var departmentName = $("#updatefacilityDept").val();
                        var personIncharge = $("#editfpersonIncharge").val();
                        var normalIncidents = $(".editfnormalIncidents").val();
                        var recoveryStrategy = $(".editfrecoveryStrategy").val();
                        var responsiblePerson = $("#editfresponsiblePerson").val();
                        var emergency = $(".editfemergency").val();
                        var emrRecoveryStrategy = $(".editfemrRecoveryStrategy").val();
                        var emrResponsiblePerson = $("#editfemrResponsiblePerson").val();
                        var disaster = $(".editfdisaster").val();
                        var disRecoveryStrategy = $(".editfdisRecoveryStrategy").val();
                        var disResponsiblePerson = $("#editfdisResponsiblePerson").val();

                        var facilityData = {
                            "id":id,
                            "name": "Facilities&Utilities",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Facility",
                            "data": {
                                "facilityNo": facilityNo,
                                "facilityName": facilityName,
                                "description": description,
                                "department": departmentName,
                                "personIncharge": personIncharge,
                                "normalIncidents": normalIncidents,
                                "recoveryStrategy": recoveryStrategy,
                                "responsiblePerson": responsiblePerson,
                                "emergency": emergency,
                                "emrRecoveryStrategy": emrRecoveryStrategy,
                                "emrResponsiblePerson": emrResponsiblePerson,
                                "disaster": disaster,
                                "disRecoveryStrategy": disRecoveryStrategy,
                                "disResponsiblePerson": disResponsiblePerson
                            }
                        }
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(facilityData),
                            success: function (data, status) {
                                $.notify("Success: Facility successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getFacilityData();
                               // location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//----------------------------Technology API--------------------

                    function technologyDesc() {

                        var itNo = $("#itNo").val();
                        var itName = $("#itName").val();
                        var description = $("#tdescription").val();
                        var departmentName = $("#techDept").val();
                        var personIncharge = $("#tpersonIncharge").val();
                        var process = $("#tprocess").val();
                        var rto = $("#trto").val();
                        var backupMethod = $("#tbackupMethod").val();
                        var backupTime = $("#tbackupTime").val();
                        var retention = $("#tretention").val();
                        var databaseRecoveryStrategy = $("#tdatabaseRecoveryStrategy").val();
                        var normalIncidents = $("#tnormalIncidents").val();
                        var recoveryStrategy = $("#trecoveryStrategy").val();
                        var responsiblePerson = $("#tresponsiblePerson").val();
                        var emergency = $("#temergency").val();
                        var emrRecoveryStrategy = $("#temrRecoveryStrategy").val();
                        var emrResponsiblePerson = $("#temrResponsiblePerson").val();
                        var disaster = $("#tdisaster").val();
                        var disRecoveryStrategy = $("#tdisRecoveryStrategy").val();
                        var disResponsiblePerson = $("#tdisResponsiblePerson").val();

                        var techData = {

                            "name": "Technology & IT",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "technology",
                            "data": {
                                "itNo": itNo,
                                "itName": itName,
                                "description": description,
                                "department": departmentName,
                                "personIncharge": personIncharge,
                                "process": process,
                                "rto": rto,
                                "backupMethod": backupMethod,
                                "backupTime": backupTime,
                                "retention": retention,
                                "databaseRecoveryStrategy": databaseRecoveryStrategy,
                                "normalIncidents": normalIncidents,
                                "recoveryStrategy": recoveryStrategy,
                                "responsiblePerson": responsiblePerson,
                                "emergency": emergency,
                                "emrRecoveryStrategy": emrRecoveryStrategy,
                                "emrResponsiblePerson": emrResponsiblePerson,
                                "disaster": disaster,
                                "disRecoveryStrategy": disRecoveryStrategy,
                                "disResponsiblePerson": disResponsiblePerson
                            }


                        }
                        console.log(techData)


                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(techData),
                            success: function (data, status) {
                                $.notify("Success: Technology data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                              
                               // location.reload(true);
                                getTechData();
                            },
                            error: readErrorMsg
                        });

                        document.getElementById('itNo').value = '';
                        document.getElementById('itName').value = '';
                        document.getElementById('tdescription').value = '';
                        $('#techDept').val(null).trigger('change');
                        $('#tpersonIncharge').val(null).trigger('change');
                        $('#tprocess').val(null).trigger('change');
                        document.getElementById('trto').value = '';
                        document.getElementById('tbackupMethod').value = '';
                        document.getElementById('tbackupTime').value = '';
                        document.getElementById('tretention').value = '';
                        document.getElementById('tdatabaseRecoveryStrategy').value = '';
                        document.getElementById('tnormalIncidents').value = '';
                        document.getElementById('trecoveryStrategy').value = '';
                        document.getElementById('temergency').value = '';
                        document.getElementById('temrRecoveryStrategy').value = '';
                        document.getElementById('tdisaster').value = '';
                        document.getElementById('tdisRecoveryStrategy').value = '';
                        $('#tresponsiblePerson').val(null).trigger('change');
                        $('#temrResponsiblePerson').val(null).trigger('change');
                        $('#tdisResponsiblePerson').val(null).trigger('change');
                        
                    }
                    function getTechData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=technology",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#tech_tab').empty();
                                var techData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                  techData += '<tr>' +
    '<td class="text-center">' + List.data.itNo + '</td>' +
    '<td class="text-center">' + List.data.itName + '</td>' +
    '<td class="text-center"><div style="min-width:250px; white-space:normal;">' + List.data.description + '</div></td>' +
    '<td class="text-center"><div style="min-width:250px; white-space:normal;"> <span class="badge label-bg-dark">' + List.data.department + '</span></div></td>' +

    // Person in charge with avatars
    '<td class="text-center">' + List.data.personIncharge + '</td>' +

    '<td class="text-center">' + List.data.process + '</td>' +
    '<td class="text-center">' + List.data.rto + '</td>' +
    '<td class="text-center">' + List.data.backupMethod + '</td>' +
    '<td class="text-center">' + List.data.backupTime + '</td>' +
    '<td class="text-center">' + List.data.retention + '</td>' +
    '<td class="text-center">' + List.data.databaseRecoveryStrategy + '</td>' +
    '<td class="text-center">' + List.data.normalIncidents + '</td>' +
    '<td class="text-center">' + List.data.recoveryStrategy + '</td>' +
    '<td class="text-center">' + List.data.responsiblePerson + '</td>' +
    '<td class="text-center">' + List.data.emergency + '</td>' +
    '<td class="text-center">' + List.data.emrRecoveryStrategy + '</td>' +
    '<td class="text-center">' + List.data.emrResponsiblePerson + '</td>' +
    '<td class="text-center">' + List.data.disaster + '</td>' +
    '<td class="text-center">' + List.data.disRecoveryStrategy + '</td>' +
    '<td class="text-center">' + List.data.disResponsiblePerson + '</td>' +

    // Action buttons (Edit + Delete)
    '<td class="text-center">' +
        '<div class="table-actions justify-content-end">' +
            '<a class="btn btn-sm btn-outline-icon" href="#technology-edit-modal" data-bs-toggle="modal" onclick="editTechnology(' + List.id + '); return false;">' +
                '<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">' +
                    '<img src="/stratroom/images/edit-i.svg" width="12" height="12" />' +
                '</span>' +
            '</a>' +
            '<a class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal" onclick="deleteData(' + List.id + '); return false;">' +
                '<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">' +
                    '<img src="/stratroom/images/delete-i.svg" width="12" height="12" />' +
                '</span>' +
            '</a>' +
        '</div>' +
    '</td>' +
'</tr>';
  });
                                var table = techData;

                                $("#tech_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
//=-----------------------update----------------------------
function editTechnology(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".edittechid").val(data.id);           
                 $(".edititNo").val( data.data.itNo);
                 $(".edititName").val(  data.data.itName);
                 $(".edittdescription").val( data.data.description);
                //  $(".mySelect").val(  data.data.department);
                let techValues = data.data.department; 
                if (Array.isArray(techValues)) {
                    $("#updateTechDept").val(techValues).trigger('change');
                } else {
                  
                    $("#updateTechDept").val([techValues]).trigger('change');
                }


                //  $(".edittpersonIncharge").val( data.data.personIncharge);
                 let persontech = data.data.personIncharge; 
                if (Array.isArray(persontech)) {
                    $("#edittpersonIncharge").val(persontech).trigger('change');
                } else {

                  
                    $("#edittpersonIncharge").val([persontech]).trigger('change');
                }
                //  $("#edittprocess").val(data.data.process);
                let processupdate = data.data.process; 
                if (Array.isArray(processupdate)) {
                    $("#edittprocess").val(processupdate).trigger('change');
                } else {
                  
                    $("#edittprocess").val([processupdate]).trigger('change');
                }
                 $(".edittrto").val( data.data.rto);
                 $(".edittbackupMethod").val(data.data.backupMethod);
                 $(".edittbackupTime").val( data.data.backupTime);
                 $(".edittretention").val( data.data.retention);
                 $(".edittdatabaseRecoveryStrategy").val( data.data.databaseRecoveryStrategy);
                 $(".edittnormalIncidents").val( data.data.normalIncidents);
                 $(".edittrecoveryStrategy").val( data.data.recoveryStrategy);
                //  $("#edittresponsiblePerson").val( data.data.responsiblePerson);
                 let tnormalValues = data.data.responsiblePerson; 
                if (Array.isArray(tnormalValues)) {
                    $("#edittresponsiblePerson").val(tnormalValues).trigger('change');
                } else {
                  
                    $("#edittresponsiblePerson").val([tnormalValues]).trigger('change');
                }
                 $(".edittemergency").val( data.data.emergency);
                 $(".edittemrRecoveryStrategy").val( data.data.emrRecoveryStrategy);
                //  $("#edittemrResponsiblePerson").val( data.data.emrResponsiblePerson);
                let temergencyValues = data.data.emrResponsiblePerson; 
                if (Array.isArray(temergencyValues)) {
                    $("#edittemrResponsiblePerson").val(temergencyValues).trigger('change');
                } else {
                  
                    $("#edittemrResponsiblePerson").val([temergencyValues]).trigger('change');
                }
                 $(".edittdisaster").val( data.data.disaster);
                 $(".edittdisRecoveryStrategy").val(data.data.disRecoveryStrategy);
                //  $("#edittdisResponsiblePerson").val(data.data.disResponsiblePerson);
                let tdisasterValues = data.data.disResponsiblePerson; 
                if (Array.isArray(tdisasterValues)) {
                    $("#edittdisResponsiblePerson").val(tdisasterValues).trigger('change');
                } else {
                  
                    $("#edittdisResponsiblePerson").val([tdisasterValues]).trigger('change');
                }
                            },
                            error: readErrorMsg
                        });
 }
 function updatetechDesc() {
                         var id = $(".edittechid").val();
                        var itNo = $(".edititNo").val();
                        var itName = $(".edititName").val();
                        var description = $(".edittdescription").val();
                        var departmentName = $("#updateTechDept").val();
                        var personIncharge = $("#edittpersonIncharge").val();
                        var process = $("#edittprocess").val();
                        var rto = $(".edittrto").val();
                        var backupMethod = $(".edittbackupMethod").val();
                        var backupTime = $(".edittbackupTime").val();
                        var retention = $(".edittretention").val();
                        var databaseRecoveryStrategy = $(".edittdatabaseRecoveryStrategy").val();
                        var normalIncidents = $(".edittnormalIncidents").val();
                        var recoveryStrategy = $(".edittrecoveryStrategy").val();
                        var responsiblePerson = $("#edittresponsiblePerson").val();
                        var emergency = $(".edittemergency").val();
                        var emrRecoveryStrategy = $(".edittemrRecoveryStrategy").val();
                        var emrResponsiblePerson = $("#edittemrResponsiblePerson").val();
                        var disaster = $(".edittdisaster").val();
                        var disRecoveryStrategy = $(".edittdisRecoveryStrategy").val();
                        var disResponsiblePerson = $("#edittdisResponsiblePerson").val();

                        var techData = {
                            "id":id,
                            "name": "Technology & IT",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0 ",
                            "type": "technology",
                            "data": {
                                "itNo": itNo,
                                "itName": itName,
                                "description": description,
                                "department": departmentName,
                                "personIncharge": personIncharge,
                                "process": process,
                                "rto": rto,
                                "backupMethod": backupMethod,
                                "backupTime": backupTime,
                                "retention": retention,
                                "databaseRecoveryStrategy": databaseRecoveryStrategy,
                                "normalIncidents": normalIncidents,
                                "recoveryStrategy": recoveryStrategy,
                                "responsiblePerson": responsiblePerson,
                                "emergency": emergency,
                                "emrRecoveryStrategy": emrRecoveryStrategy,
                                "emrResponsiblePerson": emrResponsiblePerson,
                                "disaster": disaster,
                                "disRecoveryStrategy": disRecoveryStrategy,
                                "disResponsiblePerson": disResponsiblePerson
                            }


                        }
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(techData),
                            success: function (data, status) {
                                $.notify("Success: Technology successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getTechData();
                               // location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
                   
                    //----------------------------Personal--------------------

                    function personalDesc() {

                        var no = $("#phrno").val();
                        var person = $(".phrperson").val();
                        var userList = $("#phruserList").val();
                        var departmentName = $("#personalDept").val();
                        // var name = $(".phrname").val();
                        // var externalEntity = $(".phrexternalEntity").val();
                        var name = $(".phrname").map(function() { return this.value; }).get(); // Assuming multiple inputs
                        var externalEntity = $(".phrexternalEntity").map(function() { return this.value; }).get(); // Assuming multiple inputs

                        var personalData = {
                            "name": "Personal(HR)",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Personal",
                            "data": {
                                "no": no,
                                "person": person,
                                "userList": userList,
                                "department": departmentName,
                                "name": [],
                                "externalEntity":[]
                            }
                        }
                        personalData.data.name.push(...name);
                        personalData.data.externalEntity.push(...externalEntity);


                        console.log(personalData)


                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(personalData),
                            success: function (data, status) {
                                $.notify("Success: Personal data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                                   // location.reload(true);
                                getPersonalData();
                            
                            },
                            error: readErrorMsg
                        });
                        $('#phrno').val('');
                        $('.phrexternalEntity').val('');
                        $('.phrname').val('');
                        // document.getElementById('phrno').value = '';
                        // document.getElementsByClassName('phrexternalEntity').value = '';
                        // document.getElementsByClassName('phrname').value = '';
                        $('#phruserList').val(null).trigger('change');
                        $('#personalDept').val(null).trigger('change');
                        $('.phrperson').val(null).trigger('change');
                    }

                    function getPersonalData() {

                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=Personal",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#personal_tab').empty();
                                var personalData = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                    
                                  personalData += `
<tr>
    <td class="text-center">${List.data.no}</td>
    <td class="text-center">${List.data.person}</td>
    
    <td class="text-center">
        <div style="min-width:250px; white-space:normal;">
            ${List.data.department.map(u => `<span class="badge label-bg-dark">${u}</span>`).join(' ')}
        </div>
    </td>

    <td class="text-center">${List.data.userList}</td>

    <td class="text-center">${List.data.name}</td>
    <td class="text-center">${List.data.externalEntity}</td>
    
    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon" href="#personalHR-edit-modal" 
               data-bs-toggle="modal" onclick="editPersonalHr(${List.id})">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12"/>
                </span>
            </a>
            <a class="btn btn-sm btn-outline-icon" href="#delete-modal" 
               data-bs-toggle="modal" onclick="deleteData(${List.id})">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12"/>
                </span>
            </a>
        </div>
    </td>
</tr>`;
});
                                
                                var table = personalData;

                                $("#personal_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }
                    
//--------------------update-------------------------------------                    
function editPersonalHr(id) {
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $(".editpersonalid").val(data.id);      
                 $(".editphrno").val( data.data.no);
                 $(".editphrperson").val( data.data.person);
                //  $("#editphruserList").val( data.data.userList);
                let userValues = data.data.userList; 
                if (Array.isArray(userValues)) {
                    $("#editphruserList").val(userValues).trigger('change');
                } else {
                  
                    $("#editphruserList").val([userValues]).trigger('change');
                }
                //  $(".mySelect").val( data.data.department);
                 let deptValues = data.data.department; 
                 if (Array.isArray(deptValues)) {
                     $("#updatePersonalDept").val(deptValues).trigger('change');
                 } else {
                   
                     $("#updatePersonalDept").val([deptValues]).trigger('change');
                 }
                 $(".editphrname").val(data.data.name);
                 $(".editphrexternalEntity").val(  data.data.externalEntity);
                
                            },
                            error: readErrorMsg
                        });
 }
 function updatepersonalDesc() {
                         var id=$(".editpersonalid").val();
                         var no = $(".editphrno").val();
                        var person = $(".editphrperson").val();
                        var userList = $("#editphruserList").val();
                        var departmentName = $("#updatePersonalDept").val();
                        var name = $(".editphrname").val();
                        var externalEntity = $(".editphrexternalEntity").val();

                        var personalData = {
                            "id":id,
                            "name": "Personal(HR)",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "Personal",
                            "data": {
                                "no": no,
                                "person": person,
                                "userList": userList,
                                "department": departmentName,
                                "name": name,
                                "externalEntity": externalEntity
                            }
                        }
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(personalData),
                            success: function (data, status) {
                                $.notify("Success: Personal successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getPersonalData();
                               // location.reload(true);
                            },
                            error: readErrorMsg
                        });
                       
                    }



                    // Budget
                    var budgetId = ''
                    function saveBudget() {
                        var id = budgetId
                        var glAccount = $("#glAccount").val();
                        var glName = $("#glName").val();
                        var budgetType = $("#budgetType").val();

                        var budgetData = {
                            "id": id ? id : "",
                            "name": "BUDGET",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "BUDGET",
                            "data": {
                                "glAccount": glAccount,
                                "glName": glName,
                                "budgetType": budgetType,
                            }

                        }
                        console.log(budgetData, "budgetData");


                        $.ajax({
                            url: "/stratroom/saveMasterValue",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(budgetData),
                            success: function (data, status) {
                                $.notify("Success: Budget data form successfully submitted", {
                                    style: 'success',
                                    className: 'graynotify'
                                });
                               
                                // //// location.reload(true);
                                getBudgetData();
                            },
                            error: readErrorMsg
                        });

                        document.getElementById('glAccount').value = '';
                        document.getElementById('glName').value = '';
                        document.getElementById('budgetType').value = '';
                        budgetId = "";
               
                    }

                    function getBudgetData() {
                        $.ajax({
                            url: "/stratroom/retrieveMasterTypes?type=BUDGET",
                            type: "GET",
                            contentType: "application/json",
                            success: function (data, status) {
                                console.log(data, status);
                                $('#budget_tab').empty();
                                var budget = "";
                                var i;
                                $.each(data, function (i, List) {
                                    i++;
                                    budget += `
<tr>
    <td class="text-center">${List.data.glAccount}</td>
    <td class="text-center"><div style="min-width:250px; white-space:normal;">${List.data.glName}</div></td>
    <td class="text-center">${List.data.budgetType}</td>
    
    <td class="text-center">
        <div class="table-actions justify-content-end">
            <a class="btn btn-sm btn-outline-icon" href="#budget-edit-modal"
               data-bs-toggle="modal" onclick="editBudget(${List.id})">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                    <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                </span>
            </a>
            
            <a class="btn btn-sm btn-outline-icon" href="#delete-modal"
               data-bs-toggle="modal" onclick="deleteData(${List.id})">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                    <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                </span>
            </a>
        </div>
    </td>
</tr>`;
  });
                                var table = budget;

                                $("#budget_tab").append(table);
                                $('[rel="tooltip"]').tooltip();


                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }



                    function editBudget(id) {
                        budgetId = id
                        editId = id;

                        $.ajax({
                            url: "/stratroom/masterValue/" + editId,
                            method: 'GET',
                            success: function (data, status) {
                                console.log(data)
                                $("#editbudgetid").val(data.id);                
                                $("#editglAccount").val( data.data.glAccount);
                                $("#editglName").val(  data.data.glName);
                                $("#editbudgetType").val(  data.data.budgetType);
                            },
                            error: readErrorMsg
                        });
                    }

                function updateBudget() { 

                        var id = $("#editbudgetid").val();
                        var glAccount = $("#editglAccount").val();
                        var glName = $("#editglName").val();
                        var budgetType=$("#editbudgetType").val();

                        var budgetData = {
                            "id":id,
                            "name": "BUDGET",
                            "createdBy": "",
                            "createdAt": "",
                            "departMent": "0",
                            "type": "BUDGET",
                            "data": {
                                "glAccount": glAccount,
                                "glName": glName,
                               "budgetType": budgetType,
                            }

                        }
                        
                        $.ajax({
                            url: "/stratroom/updateMasterValue",
                            type: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(budgetData),
                            success: function (data, status) {
                                $.notify("Success: Budget successfully Updated", {
                                    style: 'success',
                                    className: 'graynotify'

                                });
                                getBudgetData();
                                //// location.reload(true);
                            },
                            error: readErrorMsg
                        });
                    }



                    // Language workflow
const page_masters_en = {
    "Do you really want to delete?": "Do you really want to delete?",
    "Delete": "Delete",
    "Product Description" : "Product Description",
    "Service Description" : "Service Description",
    "save": "Save",
    "cancel": "Cancel",
    "Product/Service Description": "Product/Service Description",
    "Products": "Products",
    "Services": "Services",
    "Masters": "Masters",
    "Product No": "Product No",
    "Product Name": "Product Name",
    "Description": "Description",
    "Department": "Department",
    "Person In Charge": "Person In Charge",
    "Action": "Action",
    "Service No": "Service No",
    "Service Name": "Service Name",
    "Product/Service Description": "Product/Service Description",
    "Product/Service": "Product/Service",
    "Product": "Product",
    "Service": "Service",
    "ID" : "ID"
}



const page_masters_ar = {
    "Do you really want to delete?": "هل تريد الحذف فعلاً؟",
    "Delete": "حذف",
    "Product Description": "وصف المنتج",
    "Service Description" : "وصف الخدمة",
    "save": "حفظ",
    "cancel": "إلغاء",
    "Product/Service Description": "وصف المنتج / الخدمة",
    "Products": "المنتجات",
    "Services": "الخدمات",
    "Masters": "القوائم الرئيسية",
    "Product No": "رقم المنتج",
    "Product Name": "اسم المنتج",
    "Description": "الوصف",
    "Department": "القسم",
    "Person In Charge": "المسؤول",
    "Action": "الإجراء",
    "Service No": "رقم الخدمة",
    "Service Name": "اسم الخدمة",
    "Product/Service Description": "وصف المنتج / الخدمة",
    "Product/Service": "منتج / خدمة",
    "Product": "منتج",
    "Service": "خدمة",
    "ID" : "المعرف"
}


// Helper to get nested property
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang === 'ar') {
    translation = page_masters_ar;
  } else {
    translation = page_masters_en;
  }

  document.querySelectorAll('[data-translate]').forEach(el => {
    const path = el.getAttribute('data-translate');
    const value = getNestedValue(translation, path);
    if (value !== null) {
      el.textContent = value;
    }
  });

  console.log(lang, "language loaded");
}

  function getPageList(){
    	var empId = $("#userPrincipal").val();
					$.ajax({
						url: "/stratroom/pageList/" + empId + "?language=" + "en",
						async: false,
						success: function (pagelist, status) {
							const pagelistttt = [
    {
        "id": 2409,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-06-27T08:06:05",
        "updatedTime": null,
        "pageName": "charts",
        "pageType": "Charts",
        "homePgFlag": null,
        "groupType": null,
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2410,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-06-27T08:07:49",
        "updatedTime": null,
        "pageName": "cockpit",
        "pageType": "Cockpit",
        "homePgFlag": null,
        "groupType": null,
        "pinned": null,
        "columnType": "TWO",
        "deptId": 1016
    },
    {
        "id": 2411,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-06-27T08:08:41",
        "updatedTime": "2025-12-15T04:10:27",
        "pageName": "Risk",
        "pageType": "Risk",
        "homePgFlag": null,
        "groupType": "Govern",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2418,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-06-27T09:09:21",
        "updatedTime": "2025-12-15T04:11:09",
        "pageName": "CEOO Scorecard",
        "pageType": "Standard_View",
        "homePgFlag": null,
        "groupType": "Measure",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2419,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-06-27T09:59:35",
        "updatedTime": null,
        "pageName": "my space",
        "pageType": "My Space",
        "homePgFlag": null,
        "groupType": null,
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2518,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-08-02T12:36:48",
        "updatedTime": null,
        "pageName": "SWOT",
        "pageType": "SWOT",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2519,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-08-02T12:52:51",
        "updatedTime": null,
        "pageName": "PESTLE ",
        "pageType": "PESTEL",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2520,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-08-03T03:02:35",
        "updatedTime": "2025-12-22T09:12:32",
        "pageName": "Meeting",
        "pageType": "Meetings",
        "homePgFlag": null,
        "groupType": "Meet",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2521,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-08-04T04:29:06",
        "updatedTime": "2025-09-16T14:24:52",
        "pageName": "Strategy Planner",
        "pageType": "Strategy Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2533,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-08-23T01:06:59",
        "updatedTime": "2025-12-15T04:10:43",
        "pageName": "Strategic Initiatives",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2697,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-09-29T08:44:39",
        "updatedTime": null,
        "pageName": "Project Paln",
        "pageType": "Project Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2702,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-03T05:46:11",
        "updatedTime": null,
        "pageName": "",
        "pageType": "Strategy Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2704,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-04T04:04:09",
        "updatedTime": null,
        "pageName": "initiativies",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2769,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-16T07:33:49",
        "updatedTime": null,
        "pageName": "Strategic Initiative",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2775,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-22T11:51:15",
        "updatedTime": null,
        "pageName": "G FULL STRATEGIC INITIATIVE",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2788,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-28T04:53:39",
        "updatedTime": null,
        "pageName": "Grace Initiatives",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2798,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-04T09:36:18",
        "updatedTime": null,
        "pageName": "New initiative Project",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2807,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-07T13:38:21",
        "updatedTime": null,
        "pageName": "Cockpit New",
        "pageType": "Cockpit",
        "homePgFlag": null,
        "groupType": "Report",
        "pinned": null,
        "columnType": "TWO",
        "deptId": 1016
    },
    {
        "id": 2808,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-07T13:42:16",
        "updatedTime": null,
        "pageName": "Cockpit Reports New",
        "pageType": "Cockpit",
        "homePgFlag": null,
        "groupType": "Report",
        "pinned": null,
        "columnType": "TWO",
        "deptId": 1016
    },
    {
        "id": 2873,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-21T08:27:46",
        "updatedTime": null,
        "pageName": "Risk Test01",
        "pageType": "Risk Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2875,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-21T08:30:58",
        "updatedTime": null,
        "pageName": "Project Plan",
        "pageType": "Project Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2913,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-12-31T10:53:30",
        "updatedTime": null,
        "pageName": "riskplantest",
        "pageType": "Risk Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
 
    
]
    console.log(pagelist, "pageListData");

    $.each(pagelist, function (index, page) {
        console.log(page, "pageData");

        // -----------------------
        // Add PIN ICON if pinned
        // -----------------------
        const pinIcon = page.pinned == "true" 
            ? '<img src="/stratroom/images/checkbox-303113_1280.png" style="width:12px;height:12px;margin-left:6px;" />'
            : '';

        // -----------------------
        // Create Page URL
        // -----------------------
        const pageUrl = "/stratroom/dashboard/" + page.createdBy + "?pageId=" + page.id;

        // -----------------------
        // MEASURE GROUP
        // -----------------------
        if (page.groupType == "Measure" || page.pageType == "Standard_View") {
            $('#measure').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" ' +
                'data-groupType="Measure" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // PLAN GROUP
        // -----------------------
        } else if (
            page.groupType == "Plan" || page.pageType == "SWOT" || page.pageType == "PESTEL" ||
            page.pageType == "Strategy Map" || page.pageType == "Strategy Formulation" ||
            page.pageType == "Project Formulation" || page.pageType == "Risk Formulation" ||
            page.pageType == "Audit Management" || page.pageType == "AuditManagement"
        ) {
            $('#planningDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Plan" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // EXECUTE GROUP
        // -----------------------
        } else if (
            page.groupType == "Execute" || page.pageType == "Initiatives & Projects" ||
            page.pageType == "Task" || page.pageType == "Budget" || page.pageType == "Approval Page"
        ) {
            $('#executeDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Execute" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // GOVERN GROUP
        // -----------------------
        } else if (
            page.groupType == "Govern" || page.pageType == "Risk" || page.pageType == "Risk Formulation" ||
            page.pageType == "Risk View" || page.pageType == "RiskEvent" || page.pageType == "Risk Radar" || page.pageType == "Impact Assesment" || page.pageType == "Process Enabaler" || page.pageType == "Rpo" || page.pageType == "Compliance" || page.pageType == "Audit Management" 
        ) {
            $('#governDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Govern" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // MEET GROUP
        // -----------------------
        } else if (page.groupType == "Meet" || page.pageType == "Meetings") {
            $('#meetDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Meet" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // REPORT GROUP
        // -----------------------
        } else if (
            page.groupType == "Report" || page.pageType == "Cockpit" || page.pageType == "Charts" ||
            page.pageType == "My Performance" || page.pageType == "My Space"
        ) {

            var reportPageUrl;
            if (page.pageType == "My Performance" || page.pageType == "My Space") {
                reportPageUrl = pageUrl;
            } else {
                reportPageUrl = "/stratroom/whiteboard/" + empId + "?pageId=" + page.id;
            }

            $('#reportDropdown').append(
                '<li><a class="dropdown-item" href="' + reportPageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Report" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );
        }
    });
}

					})
  }

getPageList();