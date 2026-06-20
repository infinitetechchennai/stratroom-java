//Department  List Map 
function populateOwnerDropdowndepartment() {
    $.ajax({
        url: "/stratroom/allDepartmentList",
        type: "GET",
        async: false,
        success: function (data) {

            var $dropdown = $("#strategyMapSelect");
            $dropdown.empty(); // Clear existing options

            // Default placeholder option
            $dropdown.append('<option value="">Select a Department</option>');

            // Loop through response data
            $.each(data, function (index, item) {
                $dropdown.append(
                    $('<option></option>')
                        .attr("value", item.id)
                        .text(item.name)
                );
            });

            // Refresh select2 if applied
            if ($dropdown.hasClass("select2-hidden-accessible")) {
                $dropdown.trigger("change");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading departments:", error);
        }
    });
}

populateOwnerDropdowndepartment();

$(document).on("change", "#strategyMapSelect", function () {
    var departmentId = $(this).val();

    if (departmentId) {
        loadPages(departmentId);
    } else {
        $("#Initiative_Pages").empty()
            .append('<option value="">Select a Pages</option>')
            .trigger("change");
    }
});


function loadPages(departmentId) {

    console.log("Pages loading :::: " + departmentId);

    var $pageSelect = $("#Initiative_Pages");

    // Clear existing options
    $pageSelect.empty();
    $pageSelect.append('<option value="">Select a Pages</option>');

    $.ajax({
        type: "GET",
        url: "/stratroom/pageDeptList/" + departmentId + "?pageType=initiative",
        async: false,
        success: function (data) {

            // Expected response:
            // [{ id: 1, pageName: "Page 1" }, { id: 2, pageName: "Page 2" }]

            $.each(data, function (index, item) {
                $pageSelect.append(
                    $("<option></option>")
                        .attr("value", item.id)
                        .text(item.pageName)
                );
            });

            // Refresh select2
            $pageSelect.trigger("change");
        },
        error: function (xhr, status, error) {
            console.error("Error loading pages:", error);
        }
    });
}


$(document).on("change", "#Initiative_Pages", function () {
    var pageId = $(this).val();

    if (pageId) {
        console.log("this unction called");
        fetchinitiatives(pageId);
    } else {
        $('#initiate_sidebar').empty();
    }
});

function fetchinitiatives(pageId) {
     $.ajax({
        type: "GET",
        url: "/stratroom/initiativesList",
        data: {
            loadFlag: true,
            pageId: pageId,
            status: "date",
            language: "en"
        },
        dataType: "json",   // expecting JSON response
        success: initiativesSuccessCallback,
        error: function (err) {
            console.error("Error loading initiatives:", err);
        }
    });
}




function initiativesSuccessCallback(response){
    const responses = [
    {
        "id": 875,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "60",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement1",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },
     {
        "id": 875,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "30",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement2",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },
     {
        "id": 875,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "15",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement3",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },
     {
        "id": 875,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "76",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement4",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },
     {
        "id": 875,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "80",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement5",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },
     {
        "id": 875,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "49",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement6",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },

     {
        "id": 875,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "65",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement7",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },
    {
        "id": 876,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 0,
            "actualdaterange": "05/01/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/15/2025 - 03/31/2026",
            "progressval": "27",
            "actualValue": "2",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Human Resources (HR)",
            "totalActual": 0,
            "TotCurr": "0",
            "name": "Talent & People Development",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "15 Apr 2025 - 31 Mar 2026"
        },
     
        "pageId": 2533,
        "createdTime": "2025-09-16T13:19:40",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "",
        "departmentId": 2
    },
    {
        "id": 877,
        "initiativeValue": {
            "actual": false,
            "createdByName": "Grace",
            "daterange": "04/15/2025 - 03/31/2026",
            "impactDesc": "NA",
            "blank": true,
            "statusType": "in_progress",
            "totalBudget": 0,
            "progressval": "0",
            "actualdaterange": "05/15/2025 - 03/31/2026",
            "description": "",
            "forecast": false,
            "dept": "testdemo",
            "BalCurr": "$",
            "target": false,
            "categoryType": "Customer",
            "totalActual": 0,
            "total": false,
            "TotCurr": "0",
            "balance": false,
            "name": "Customer Experience & Brand Excellence",
            "utilizedCurr": "$",
            "utilized": false,
            "budget": false,
            "daysRemaining": 30,
            "targetValue": 100,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "actualValue": "0",
            "dateString": "15 Apr 2025 - 31 Mar 2026"
        },
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:21:15",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "",
        "departmentId": 2
    },
    {
        "id": 914,
        "initiativeValue": {
            "actual": false,
            "createdByName": "Grace",
            "daterange": "04/01/2025 - 03/31/2026",
            "impactDesc": "NA",
            "blank": true,
            "statusType": "in_progress",
            "totalBudget": 0,
            "progressval": "10",
            "actualdaterange": "04/15/2025 - 03/31/2026",
            "description": "",
            "forecast": false,
            "dept": "",
            "BalCurr": "$",
            "target": false,
            "categoryType": "Sustainability & ESG",
            "totalActual": 0,
            "total": false,
            "TotCurr": "0",
            "balance": false,
            "name": "Environment & Social Impact",
            "utilizedCurr": "$",
            "utilized": false,
            "budget": false,
            "daysRemaining": 30,
            "targetValue": 100,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "actualValue": "0",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
        "pageId": 2533,
        "createdTime": "2025-09-17T04:09:25",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "901"
    },
    {
        "id": 882,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 20,
            "actualdaterange": "04/10/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/01/2025 - 03/31/2026",
            "progressval": "69",
            "actualValue": "6",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Information Technology (IT)",
            "totalActual": 30,
            "TotCurr": "0",
            "name": "Digital Transformation & Technology Enablement",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "01 Apr 2025 - 31 Mar 2026"
        },
    
        "commentsList": [],
        "mileStonesList": [],
        "attachmentList": [],
        "taskList": [],
        "pageId": 2533,
        "createdTime": "2025-09-16T13:17:18",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "873",
        "departmentId": 2
    },
    {
        "id": 910,
        "initiativeValue": {
            "createdByName": "Grace",
            "impactDesc": "NA",
            "blank": false,
            "statusType": "in_progress",
            "totalBudget": 0,
            "actualdaterange": "05/01/2025 - 03/31/2026",
            "description": "",
            "BalCurr": "$",
            "total": false,
            "balance": false,
            "targetValue": 100,
            "utilized": false,
            "budget": false,
            "actual": false,
            "daterange": "04/15/2025 - 03/31/2026",
            "progressval": "2",
            "actualValue": "2",
            "forecast": false,
            "dept": "testdemo",
            "target": false,
            "categoryType": "Human Resources (HR)",
            "totalActual": 0,
            "TotCurr": "0",
            "name": "Talent & People Development",
            "utilizedCurr": "$",
            "daysRemaining": 30,
            "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
            "statusIndicator": "RED",
            "dateString": "15 Apr 2025 - 31 Mar 2026"
        },
     
        "pageId": 2533,
        "createdTime": "2025-09-16T13:19:40",
        "active": 0,
        "owner": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "initiativeId": "",
        "departmentId": 2
    },
]

let initiativevaluesarray = [];

response.forEach(item => {
    let category = item.initiativeValue.categoryType;

    // check category already exists
    let existingCategory = initiativevaluesarray.find(
        obj => obj.categoryType == category
    );

    if (existingCategory) {
        // push into existing category
        existingCategory.initiatives.push(item);
    } else {
        // create new category group
        initiativevaluesarray.push({
            categoryType: category,
            initiatives: [item]
        });
    }
});

    console.log(initiativevaluesarray, "initiativevaluesarray");
    console.log(response, "responseData");


    const container = document.getElementById("initiativeListMap");
container.innerHTML = "";


initiativevaluesarray.forEach((category, index) => {

    let rows = "";

    category.initiatives.forEach(item => {

        const v = item.initiativeValue;

        // progress
        // let progress = v.progressval || 0;


        let progress = parseInt(v.progressval) || 0;

        let progressColor = "bg-danger"; // default red

        if (progress >= 41 && progress <= 75) {
            progressColor = "bg-warning";
        }
        else if (progress >= 76) {
            progressColor = "bg-success";
        }

        // days remaining
        let daysRemaining = v.daysRemaining || 0;

        // status icon
        let statusIcon = "";
        if (v.statusIndicator == "RED") {
            statusIcon = "buzzer-red-i.svg";
        } else if (v.statusIndicator == "YELLOW") {
            statusIcon = "buzzer-yellow-i.svg";
        } else {
            statusIcon = "buzzer-green-i.svg";
        }

        rows += `
        <tr>
            <td>${v.name}</td>
            <td class="text-center">${v.dateString}</td>
            <td class="text-center">
                <div class="pt-1 bar-chart">
                    <div class="progress-wrap red">
                        <div class="progress flex-grow-1">
                            <div class="progress-bar progress-bar-striped rounded-pill ${progressColor}"
                                role="progressbar"
                                style="width:${progress}%">
                            </div>
                        </div>
                        <span class="badge">${progress}%</span>
                    </div>
                </div>
            </td>
            <td class="text-center">${daysRemaining} days</td>
            <td class="text-center">
                <img src="/stratroom/images/${statusIcon}" width="12" height="12">
            </td>
        </tr>
        `;
    });

    const html = `
    <div class="grid gap-2 g-col-12 strategyRow">

        <div class="g-col-md-3 g-col-12">
            <div class="card border-0 h-100 c1">
                <div class="card-header bg-transprant border-0 pb-0">
                    <h6 class="card-title fs-6 font-weight-medium mb-0">Perspectives</h6>
                    <p class="small text-muted mb-0">What are our key focus areas?</p>
                </div>

                <div class="card-body d-flex flex-column">

                    <div class="gauge-wrapper" data-id="g${index+1}">
                        <div class="gauge" data-chart></div>
                        <div class="needle" data-needle></div>
                        <div class="needle-circle"></div>
                        <input hidden type="range" class="speedSlider" min="0" max="100" value="50">
                        <div class="gauge-labels"></div>
                    </div>

                    <div class="d-flex gap-2 align-items-center justify-content-between bg-primary rounded-pill text-white px-4 ps-1 py-1 mt-3">
                        <img src="/stratroom/images/customer-w.svg" width="42">
                        <h6 class="fs-6 mb-0 text-uppercase riCategory">${category.categoryType}</h6>
                    </div>

                </div>
            </div>
        </div>

        <div class="g-col-md-9 g-col-12">

            <div class="card border-0">
                <div class="card-header bg-transprant border-0 pb-0">
                    <h6 class="card-title fs-6 font-weight-medium mb-0">Strategic Initiatives</h6>
                    <p class="small text-muted mb-0">What are our strategic initiatives?</p>
                </div>

                <div class="card-body">

                    <table class="table table-sm table-striped table-bordered w-100 text-nowrap small">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th class="text-center">Start - End Date</th>
                                <th class="text-center">Progress</th>
                                <th class="text-center">Days Remaining</th>
                                <th class="text-center">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${rows}
                        </tbody>

                    </table>

                </div>
            </div>

        </div>

    </div>
    `;

    container.insertAdjacentHTML("beforeend", html);

});


initiativevaluesarray.forEach((category, index) => {

   // table html generate

   container.insertAdjacentHTML("beforeend", html);

});

initDataTables();
}


// initiativesSuccessCallback();


function initDataTables(){

    $('.table').each(function () {

        if (!$.fn.DataTable.isDataTable(this)) {

            $(this).DataTable({
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
                    $('.dataTables_paginate')
                        .addClass('d-flex justify-content-end dataTables_paginate_sm');

                    $('.dataTables_paginate ul.pagination')
                        .addClass('pagination-sm');
                }
            });

        }

    });

}