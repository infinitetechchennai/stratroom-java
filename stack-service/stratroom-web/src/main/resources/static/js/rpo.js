function loadMasterSelect(config) {
    $.ajax({
        url: `/stratroom/retrieveMasterTypes?type=${config.type}`,
        type: "GET",
        dataType: "json",
        success: function (response) {

            const $select = $(config.selector);
            $select.empty();

            let unique = new Set();

            response.forEach(item => {
                let value = config.value(item);

                if (value && value.trim() !== "" && !unique.has(value)) {
                    unique.add(value);
                    $select.append(new Option(value, value));
                }
            });

            $select.trigger("change");
        },
        error: function (err) {
            console.error(`Failed loading ${config.type}`, err);
        }
    });
}
function loadAllBIADropdowns() {

    // Process (POS)
    loadMasterSelect({
        type: "Process",
        selector: "#saveprocessService, #processServiceUpdate",
        value: item => item?.data?.processName
    });

    // Vital Records
    loadMasterSelect({
        type: "Vital",
        selector: ".vitalService, #vitalServiceUpdate",
        value: item => item?.data?.vitalName
    });

    // Type of Media
    loadMasterSelect({
        type: "technology",
        selector: ".mediaService, #mediaServiceUpdate",
        value: item => item?.data?.itName
    });

    // Backup Method
    loadMasterSelect({
        type: "technology",
        selector: ".backupService, #backupServiceUpdate",
        value: item => item?.data?.backupMethod
    });

    // Backup Time
    loadMasterSelect({
        type: "technology",
        selector: ".backuptimeService, #backuptimeServiceUpdate",
        value: item => item?.data?.backupTime
    });

    // Retention
    loadMasterSelect({
        type: "technology",
        selector: ".retentionService, #retentionServiceUpdate",
        value: item => item?.data?.retention
    });

    // Database Recovery Strategy
    loadMasterSelect({
        type: "technology",
        selector: ".recoveryService, #recoveryServiceUpdate",
        value: item => item?.data?.databaseRecoveryStrategy
    });
}
function initBIASelect2() {
    $('.int-status-multi-select').select2({
        width: '100%',
        placeholder: 'Select options',
        closeOnSelect: false,
        dropdownParent: $('.scorecard_description_popup')
    });
}
$('.scorecard_description_popup,').on('shown.bs.modal', function () {
    initBIASelect2();
    loadAllBIADropdowns();
});
$('.edit_update_table').on('shown.bs.modal', function () {
    initBIASelect2();
    loadAllBIADropdowns();
});


//---------------------------------------------------------------------------------

// Function to save RPO Service
function saveRPOpage() {
	var processsave = $("#saveprocessService").val().join('|');
    var vitalsave = $("#savevitalService").val().join('|');
	var mediasave = $("#savemediaService").val().join('|');
    var backupsave = $("#savebackupService").val().join('|');
    var backuptimesave = $("#savebackuptimeService").val().join('|');
    var retentionsave = $("#saveretentionService").val().join('|');
    var recoverysave = $("#saverecoveryService").val().join('|');
	var pagenumber = $("#pagenumber").val();
    
    var RPOServiceData = {
		"createBy":"",
        "owner":"",
        "deptId":"",
		"pageId":pagenumber,
		"rpoValues":{
                    "process": processsave,
                    "vital": vitalsave,
		            "media" : mediasave,
                    "backupMethode": backupsave,
                    "backupTime": backuptimesave,
                    "retention": retentionsave,
                    "dataBaseRecoveryStratagy": recoverysave
                }
    }
    console.log(RPOServiceData);

    $.ajax({
        url: "/stratroom/saveRpoTable",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(RPOServiceData),
        success: function (data, status) {
                                       
            location.reload(true);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}

//---------------------------------------------------------------------------------

function getRPOData() {
    var pageNo = $('#pagenumber').val();
    var datePeriod = $('#datePeriod').val();
    var approvedStatus = $("#approvedDraft").val(); // APPROVED / DRAFT / IN PROGRESS

    $.ajax({
        url: "/stratroom/retrieveRpolist?pageId=" + pageNo + "&dateRange=" + datePeriod + "&status=" + approvedStatus,
        type: "GET",
        contentType: "application/json",
         success: function (data, status) {
            console.log(data, "RPO Data");
            $('#rpo_table').empty();

            var uploadShowData = "";
            var i;
            $.each(data, function (i, List) {
                i++;
				console.log(List,"RPO");
                uploadShowData += '<tr>' +
                    
                    '<td class="position viewprocess" style="text-align: start;padding-left: 10px;">' + List.rpoValues.process.split('|').join('<br>') + '</td>' + 
                    '<td class="viewvital" style="text-align: start;padding-left: 10px;">' + List.rpoValues.vital.split('|').join('<br>') + '</td>' + 
					'<td class="viewmedia" style="text-align: start;padding-left: 10px;">' + List.rpoValues.media.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackup" style="text-align: start;padding-left: 10px;">' + List.rpoValues.backupMethode.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackuptime" style="text-align: start;padding-left: 10px;">' + List.rpoValues.backupTime.split('|').join('<br>') + '</td>' + 
                    '<td class="viewretention" style="text-align: start;padding-left: 10px;">' + List.rpoValues.retention.split('|').join('<br>') + '</td>' + 
                    '<td class="viewrecovery" style="text-align: start;padding-left: 10px;">' + List.rpoValues.dataBaseRecoveryStratagy.split('|').join('<br>') + '</td>' +
                     '<td class="sendApprovalCell" style="text-align: start;padding-left: 59px;"><button class="btn btn-custom-secondary pull-right" ' +
                        'onclick="sendApprovalOnce(this,' + List.changeId + ')">' +
                        '<i class="fa fa-check-circle" title="Send To Approval" style="margin-left: -2px;"></i>' +
                        '</button></td>'+ 
                        '<td style="text-align: start;padding-left: 10px;">' +
                        '<select id="versionDropdown_' + List.id + '" ' +
                        'onchange="getRpoVersion(' + List.id + ', this.value)" ' +
                        'style="width: 100px; font-size: 11px;"></select>' +
                    '</td>' +
                    // Edit & Delete Popup
                    '<td>' + 
                    '<i class="fas fa-pen" data-toggle="modal" data-target=".edit_update_table" style="cursor: pointer" onclick="editRPOpage(' + List.id + ')"></i>' +
                    '<i class="fas fa-trash" data-toggle="modal" data-target="#delete_popup" style="margin-left: 16px; cursor: pointer" onclick="deleteData(' + List.id + ')"></i>' +
                    '</td>'; 
					getVersion(List.id);
						uploadShowData += '</tr>';
            });

            var table = `                                        
                <table class="table dashboard-task-infos align-center dashboard-table">
                    <thead>
                        <tr>

                            <th class="position viewprocess" width="100px" id="blue">Process (POS)</th>

                            <th class="viewvital" width="100px" id="grey">Name of Vital Records</th>

                            <th class="viewmedia" width="100px" id="grey">Type of Media</th>

                            <th class="viewbackup" width="100px" id="grey">Backup Method</th>

                            <th class="viewbackuptime" width="100px" id="grey">Backup Time</th>

                            <th class="viewretention" width="100px" id="moa">Retention</th>

                            <th class="viewrecovery" width="120px" id="moa">Database Recovery Strategy</th>
                           <th class="sendApprovalHeader" width="120px" id="moa" >Approval Button</th>
							
							<th class="" width="120px" id="moa">Select Version</th>
							
                            <th width="40px" id="moa" rowspan="3">Action</th>
                        </tr>
                    </thead>
                    <tbody>` + uploadShowData + `</tbody>
                </table>`;

            $("#rpo_table").append(table);
			  if (approvedStatus === "DRAFT") {
                $(".sendApprovalCell, .sendApprovalHeader").show();
            } else {
                $(".sendApprovalCell, .sendApprovalHeader").hide();
            }     
            $('[rel="tooltip"]').tooltip();
        },
        error: function (xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}

// 🔄 Refresh on status change
$("#approvedDraft").on("change", function () {
    $("#rpo_table").empty();
    getRPOData();
});

function getVersion(ropId) {
     $.ajax({
        url: "/stratroom/rpohistorylist?rpoId=" + ropId + "&version=",
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("Version response for ropId", ropId, response);

            var $dropdown = $("#versionDropdown_" + ropId);

            if ($dropdown.length === 0) {
                console.warn("Dropdown not found for ropId:", ropId);
                return;
            }

            // Clear old options
            $dropdown.empty();
            $dropdown.append($('<option>', { value: '' }).text('Select'));

            // Sort by version (latest first)
            response.sort((a, b) => b.version - a.version);

            // Append versions safely
            response.forEach(function (item, index) {
                console.log("Item.version:", item.version); // should log 2, 1

                var $option = $('<option>', {
                    value: item.version,
                    text: "Version " + item.version,
                    selected: index === 0 // auto-select the latest version
                });

                $dropdown.append($option);
            });
        },
        error: function (err) {
            console.log("Error fetching version for ropId:", ropId, err);
        }
    });

}

function getRpoVersion(eventId, selectedVersion) {
    if (!selectedVersion) return; 

    $.ajax({
        url: "/stratroom/rpohistorylist?rpoId=" + eventId + "&version=" + selectedVersion,
        type: "GET",
        contentType: "application/json",
      success: function (data, status) {
            console.log(data, "RPO Data");
            $('#rpo_table').empty();

            var uploadShowData = "";
            var i;
            $.each(data, function (i, List) {
                i++;
				console.log(List,"RPO");
                uploadShowData += '<tr>' +
                    
                    '<td class="position viewprocess" style="text-align: start;padding-left: 10px;">' + List.rpoValues.process.split('|').join('<br>') + '</td>' + 
                    '<td class="viewvital" style="text-align: start;padding-left: 10px;">' + List.rpoValues.vital.split('|').join('<br>') + '</td>' + 
					'<td class="viewmedia" style="text-align: start;padding-left: 10px;">' + List.rpoValues.media.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackup" style="text-align: start;padding-left: 10px;">' + List.rpoValues.backupMethode.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackuptime" style="text-align: start;padding-left: 10px;">' + List.rpoValues.backupTime.split('|').join('<br>') + '</td>' + 
                    '<td class="viewretention" style="text-align: start;padding-left: 10px;">' + List.rpoValues.retention.split('|').join('<br>') + '</td>' + 
                    '<td class="viewrecovery" style="text-align: start;padding-left: 10px;">' + List.rpoValues.dataBaseRecoveryStratagy.split('|').join('<br>') + '</td>' +
                    '<td class="" style="text-align: start;padding-left: 10px; cursor: pointer; color: blue; text-decoration: underline;" onclick="getRPOData()">Back</td>'+

                    // Edit & Delete Popup
                    '<td>' + 
                    '<i class="fas fa-pen" data-toggle="modal" data-target=".edit_update_table" style="cursor: pointer" onclick="editRPOpage(' + List.id + ')"></i>' +
                    '<i class="fas fa-trash" data-toggle="modal" data-target="#delete_popup" style="margin-left: 16px; cursor: pointer" onclick="deleteData(' + List.id + ')"></i>' +
                    '</td>'; 
						uploadShowData += '</tr>';
            });

            var table = `                                        
                <table class="table dashboard-task-infos align-center dashboard-table">
                    <thead>
                        <tr>

                            <th class="position viewprocess" width="100px" id="blue">Process (POS)</th>

                            <th class="viewvital" width="100px" id="grey">Name of Vital Records</th>

                            <th class="viewmedia" width="100px" id="grey">Type of Media</th>

                            <th class="viewbackup" width="100px" id="grey">Backup Method</th>

                            <th class="viewbackuptime" width="100px" id="grey">Backup Time</th>

                            <th class="viewretention" width="100px" id="moa">Retention</th>

                            <th class="viewrecovery" width="120px" id="moa">Database Recovery Strategy</th>

							
							<th class="" width="120px" id="moa">Select Version</th>
							
                            <th width="40px" id="moa" rowspan="3">Action</th>
                        </tr>
                    </thead>
                    <tbody>` + uploadShowData + `</tbody>
                </table>`;

            $("#rpo_table").append(table);
            $('[rel="tooltip"]').tooltip();
        },
        error: function (xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}


function sendApprovalOnce(button, changeId) {
    if (!button.disabled) {
        button.disabled = true; // Disable to prevent multiple clicks
        sendApproval(changeId); // Pass changeId
    }
}

function sendApproval(changeId) {
    var requestData = {
        status: "IN PROGRESS"
    };

    $.ajax({
        url: "/stratroom/api/workflowevents/" + changeId + "/action", // use changeId here
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(requestData),
        success: function (response) {
            location.reload(true);
        }
    });
} 
//---------------------------------------------------------------------------------
// delete

let deleteId; 
function deleteData(id) {
    deleteId = id;

    $.ajax({
        url: "/stratroom/retriveRpoId/" + deleteId,
        method: 'GET',
        success: function (data, status) {
            console.log(data);           
        },
        error: readErrorMsg
    });
}

function deleteRPOpage() {
    if (!deleteId) {
        console.error("DeleteID is not Set");
        return;
    }
    console.log(deleteId, "DeleteD");

    $.ajax({
        url: "/stratroom/deleteRpo/" + deleteId,
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

// Helper function to safely format ISO date strings (e.g., 2025-11-07T23:08:31.93)
function formatDate(dateString) {
    if (!dateString) return ''; // if null or undefined, return empty
    return dateString.split('T')[0]; // take only the date part
}
//---------------------------------------------------------------------------------
function editRPOpage(id) {
    editId = id;

    $.ajax({
        url: "/stratroom/retriveRpoId/" + editId,
        method: 'GET',
        success: function (data, status) {
            console.log(data,'EditResult')
			
			// ID
            $("#updateid").val(data.id);

            // Process
			var processEdit = data.rpoValues.process.split('|');
            $("#processServiceUpdate").val(processEdit).trigger('change');

            // Vital
			var vitalEdit = data.rpoValues.vital.split('|');
			$("#vitalServiceUpdate").val(vitalEdit).trigger('change');

            // Media
			var mediaEdit = data.rpoValues.media.split('|');
			$("#mediaServiceUpdate").val(mediaEdit).trigger('change');

            // Backup Method
			var backupEdit = data.rpoValues.backupMethode.split('|');
			$("#backupServiceUpdate").val(backupEdit).trigger('change');

            // Backup Time
			var backupTimeEdit = data.rpoValues.backupTime.split('|');
			$("#backuptimeServiceUpdate").val(backupTimeEdit).trigger('change');

            // Retention
			var retentionEdit = data.rpoValues.retention.split('|');
			$("#retentionServiceUpdate").val(retentionEdit).trigger('change');

            // Database Recovery Strategy
			var recoveryStrategyEdit = data.rpoValues.dataBaseRecoveryStratagy.split('|');
			$("#recoveryServiceUpdate").val(recoveryStrategyEdit).trigger('change');
			var rpocreatedTime = $("#rpocreatedTime").val(data.createTime);
            console.log(rpocreatedTime,"Create a Id Number Creation");
			var rpoupdatedTime = $("#rpoupdatedTime").val(data.updateTime);
            console.log(createIdNumber,"Create a Id Number Creation");


			// Get the "createBy" Id 
			var createIdNumber = $("#createId").val(data.createBy);
            console.log(createIdNumber,"Create a Id Number Creation");

           // Created by Name
           var createName = $("#nameCreated").val(data.rpoValues.createdByName);
           console.log(createName,"Name Creation");
		   var createDate = data.createTime ? data.createTime.split('T')[0] : '';
$("#dateCreated").val(createDate);
console.log(createDate, "Date Creation");

// Updated by Name
var updateName = data.rpoValues.updatedByName || ''; // if undefined, keep empty
$("#nameUpdated").val(updateName);
console.log(updateName, "Name Updation");

// Updated by Date
var updateDate = data.updateTime ? data.updateTime.split('T')[0] : '';
$("#dateUpdated").val(updateDate);
console.log(updateDate, "Date Updated");
        },
        error: readErrorMsg,                            
    });
}

function updateRPOpage() {
    var id = $("#updateid").val();
    var updateprocess = $("#processServiceUpdate").val().join('|');
    var updatevital  = $("#vitalServiceUpdate").val().join('|');
    var updatemedia = $("#mediaServiceUpdate").val().join('|');
    var updatebackup = $("#backupServiceUpdate").val().join('|');
    var updatebackuptime = $("#backuptimeServiceUpdate").val().join('|');
    var updateretention = $("#retentionServiceUpdate").val().join('|');
    var updaterecovery = $("#recoveryServiceUpdate").val().join('|');
	var pagenumber = $("#pagenumber").val();

	var generateId = $("#createId").val();
    var generateDate = $("#rpocreatedTime").val();
    var updateBy = $("#nameUpdated").val();

    var updateRPOdata = {
		"createBy":generateId,
		"createTime": generateDate,
		"updateTime":"",
		"id": id,
		"pageId":pagenumber,
		"rpoValues":{ 
                        "process": updateprocess,
                        "vital": updatevital,
                        "media": updatemedia,
                        "backupMethode": updatebackup,
                        "backupTime": updatebackuptime,
                        "retention": updateretention,
                        "dataBaseRecoveryStratagy": updaterecovery
                    }
        }
        console.log(updateRPOdata);

    $.ajax({
        url: "/stratroom/updateRpo/",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updateRPOdata),
        success: function (data, status) {
            $.notify("Success: RPO Page Data Successfully Updated", {
                style: 'success',
                className: 'graynotify'
            });
            location.reload(true);
        },
        error: readErrorMsg
    });
}