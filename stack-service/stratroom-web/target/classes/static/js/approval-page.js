var budgetChangeId = "";
$(document).ready(function() {
    // Load JSON and render
    $.ajax({
         url: "/stratroom/api/workflowevents",
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data, "data");
            // const scorecard = data[0];
            renderTabContent(data);
        },
        error: function(xhr, status, error) {
            console.error("Error loading data:", error);
        }
    });

          


    function renderTabContent(tabs) {
        console.log(tabs, "tabsdata");
        const tabContent = $("#task-content").empty();
        // tabs.forEach((tab, index) => {
           
           
            tabContent.append(`
                <div >
                    <div class="card custom-card table-card">
                        <div class="card-header">
                            <div class="c-header-left">                              
                                <h5 class="card-title">                 
                                <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">Approver List</strong>
                                </h5>
                            </div>
                            
                        </div>
                        <div class="card-body">
                            <table class="table table-sm table-bordered w-100"  style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
                                <thead class="text-center">
                                    <tr>                                        
                                        <th>Event Title</th>                                       
                                        <th>Status</th>
                                        <th>Submitted On</th>
                                        <th>Submitted By</th>
                                        <th>Current Approver</th>
                                        <th>Next Approver</th>
                                        <th>Approval History</th>
                                    </tr>
                                </thead>
                                <tbody>${renderTable(tabs)}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `);
        // });
       
    }

  function renderTable(data) {
    console.log(data, "tablerenderdata");
    
    // Create a reversed copy so original data isn't mutated
    const reversedData = [...data].reverse();
    
    let html = "";

    reversedData.forEach((item, index) => {
        console.log(item, "itemData");
        let actionsMenu = getActionsMenu(item.id);

        const statusOptions = ["IN PROGRESS", "APPROVED", "REJECTED"];
        function getStatusBadge(status) {
            const statusMap = {                   
                "IN PROGRESS": "status-bg-yellow",
                "APPROVED": "status-bg-green",
                "REJECTED": "status-bg-red",
            };
            const badgeStatusClass = statusMap[status] || "status-bg-gray";
            return `<span class="badge ${badgeStatusClass} rounded-pill dropdown-toggle ms-auto">${status}</span>`;
        }

        html += `<tr>
            <td class="text-center">
                <div class="d-flex justify-content-center gap-1 flex-wrap text-nowrap risk-link" style="min-width:260px" 
                    data-event-title="${item.eventTitle}" data-change-id="${item.id}">
                    ${item.eventTitle}
                </div>
            </td>
            <td class="text-center text-nowrap editable-status status-click" data-change-id="${item.id}">
                ${getStatusBadge(item.status)}
            </td>
            <td class="text-center text-nowrap">${item.submittedOn || ""}</td>
            <td class="text-center text-nowrap">${item.submittedBy || ""}</td>
            <td class="text-center text-nowrap">${item.currentApprover || ""}</td>
            <td class="text-center text-nowrap">${item.nextApprover || ""}</td>
            <td width="70" data-change-id="${item.id}">${actionsMenu}</td>
        </tr>`;

        // Recursion: only if needed and only pass `children`
        if (item.children) {
            html += renderTable(item.children); // no extra args
        }
    });

    return html;
}
    
    function initializeDataTable(selector) {
        setTimeout(() => {
            const $table = $(selector);
           // updateAllProgressBars();
            lucide.createIcons({ width: 16, height: 16 });
            if (!$.fn.DataTable.isDataTable(selector)) {
                var table = $(selector).DataTable({
                    paging: false,
                    searching: true,
                    ordering: false,
                    info: false,
                    responsive: true,
                    scrollX: true,                   
                    drawCallback: function(settings) {
                        $('.dataTables_filter').addClass('d-none');
                    }
                });                
                $(document).on('change', '.filter-status', function () {
                    let searchTerms = [];
                    $('.filter-status:checked').each(function () {
                      searchTerms.push("^" + $(this).val() + "$");
                    });
                
                    table.column(1).search(searchTerms.join('|'), true, false).draw();
                  });

            } else {
                $(selector).DataTable().columns.adjust().draw();
            }
        }, 200);
    }
    function getActionsMenu(itemId) {
        console.log(itemId, "itemIDDDDDD");
            return `<div class="table-actions justify-content-center">
                <a href="#approval-history-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon" data-change-id="${itemId}">
                    <span class="icon history-click" data-change-id="${itemId}"><i data-lucide="history" style="width: 16px; height: 16px;" data-change-id="${itemId}"></i></span>
                </a>                
            </div>`;
       
    }


});
$(document).ready(function () {
    let currentStatusCell = null;
    let currentRowData = null;

    // Use event delegation — no need to re-bind on every render
    $(document).on("click", "td.editable-status", function () {
        const $cell = $(this);
        currentStatusCell = $cell;
        const currentStatus = $cell.find('.badge').text().trim();
        currentRowData = $cell.closest('tr').data('item-data') || {};

        const $modal = $('#statusUpdateModal');
        $('#statusSelect').select2('destroy');
        $('#statusSelect').val(currentStatus);
        $('#statusSelect').select2({
            width: '100%',
            dropdownParent: $modal,
            minimumResultsForSearch: Infinity
        });
        $('#statusComments').val('');
        $modal.modal('show');
    });

    $('#statusUpdateModal').on('hidden.bs.modal', function () {
        currentStatusCell = null;
        currentRowData = null;
    });
});
//History Click
$(document).on("click", ".history-click", function () {
    var changeId = $(this).data("change-id");
    console.log(changeId, "changeId");
    $("#table-approval-history tbody").html("");
    $.ajax({
    url: "/stratroom/api/workflowevents/" + changeId + "/history",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
        console.log(response, "approval history data");

        let tbodyHtml = "";

        if (!Array.isArray(response) || response.length === 0) {
            tbodyHtml = `<tr><td colspan="4" class="text-center">No approval history available</td></tr>`;
        } else {
            // Process each history entry
            response.forEach(item => {
                // Format date: "10/24/2025, 2:00:41 AM"
                const date = new Date(item.actionDate);
                const formattedDate = date.toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });

                // Map status to badge class
                let badgeClass = "status-bg-gray";
                const statusText = item.actionTaken || "UNKNOWN";

                if (statusText === "APPROVED") {
                    badgeClass = "status-bg-green";
                } else if (statusText === "REJECTED") {
                    badgeClass = "status-bg-red";
                } else if (["IN PROGRESS", "RE-SUBMITTED", "SUBMITTED"].includes(statusText)) {
                    badgeClass = "status-bg-yellow";
                }

                tbodyHtml +=
                    '<tr>' +
                        '<td>' + (item.approverName || '—') + '</td>' +
                        '<td>' + formattedDate + '</td>' +
                        '<td><span class="badge ' + badgeClass + ' rounded-pill ms-auto">' + statusText + '</span></td>' +
                        '<td>' + (item.comments || '—') + '</td>' +
                    '</tr>';
            });
        }

        // Inject into table
        $("#table-approval-history tbody").html(tbodyHtml);

        // Show the modal
        $("#approval-history-modal").modal("show");
    },
    error: function (xhr, status, error) {
        console.error("Failed to load approval history:", error);
        alert("Unable to load approval history. Please try again.");
    }
});
});

//status onchange click
var stauschangeId = "";
 $(document).on("click", ".status-click", function () {
      stauschangeId = $(this).data("change-id");
     console.log(stauschangeId, "stauschangeId");
 })


 // Attach click event to event title links
            $(document).on("click", ".risk-link", function () {
                console.log("functions called");
                var changeId = $(this).data("change-id");
                var eventTitle = $(this).data("event-title");
                budgetChangeId = changeId;
                console.log(changeId, eventTitle, "changeEventtitle");
                if(eventTitle == "Budget"){

                     $.ajax({
                        url: "/stratroom/api/workflowevents/" + changeId + "/details",
                        type: "GET",
                        contentType: "application/json",
                      
                     success: function (response) {
    console.log(response, "responseData");

    let tbodyHtml = "";


    if (!response || !response.newValue || Object.keys(response.newValue).length === 0) {
        tbodyHtml = '<tr><td colspan="20" class="text-center">No budget data available</td></tr>';
    } else {
        let index = 0;
       
        for (const key in response.newValue) {
            if (response.newValue.hasOwnProperty(key)) {
                const item = response.newValue[key];
                const bv = item.budgetValues || {};

                index++; // SI.No

                tbodyHtml +=
                    '<tr>' +
                        '<td>' + index + '</td>' +
                        '<td><span class="badge label-bg-dark rounded-pill">' + (bv.year || '') + '</span></td>' +
                        '<td><span class="badge label-bg-dark rounded-pill">' + (bv.month || '') + '</span></td>' +
                        '<td>' + (bv.version || '') + '</td>' +
                        '<td>' + (bv.glaccountdesc || '') + '</td>' +
                        '<td>' + (bv.glname || '') + '</td>' +
                        '<td><span class="badge label-bg-red rounded-pill">' + (bv.budgetType || '') + '</span></td>' +
                        '<td>' + (bv.projectinitiativeDec || '') + '</td>' +
                        '<td>' + (bv.outcome || '') + '</td>' +
                        '<td>' + (bv.objective || '') + '</td>' +
                        '<td>' + (bv.subInitiativeDesc || '') + '</td>' +
                        '<td>' + (bv.activityDesc || '') + '</td>' +
                        '<td>' + (bv.subActivityDes || '') + '</td>' +
                        '<td><span class="badge label-bg-red rounded-pill">' + (bv.currency || '') + '</span></td>' +
                        '<td><span class="badge label-bg-cyan rounded-pill">' + (bv.noofDays || bv.quantity || '') + '</span></td>' +
                        '<td><span class="badge label-bg-cyan rounded-pill">' + (bv.unitamount || bv.amount || '') + '</span></td>' +
                        '<td><span class="badge label-bg-cyan rounded-pill">' + (parseFloat(bv.unitamount || 0) * parseFloat(bv.noofDays || 0)).toLocaleString() + '</span></td>' +
                        '<td>' + (bv.division || '') + '</td>' +
                        '<td><span class="badge label-bg-pink rounded-pill">' + (bv.ownerName || bv.createdByName || '') + '</span></td>' +
                        '<td>' +
                            '<div style="width: 200px; display: inline-block; white-space: normal;">' +
                                (bv.notes || '') +
                            '</div>' +
                        '</td>' +
                    '</tr>';
            }
        }
    }

    // Inject the built HTML
    $("#table-budget-event tbody").html(tbodyHtml);

    // Show modal
    $("#budgetEventDetailsModal").modal("show");
}
                    });
                   

                }else if (eventTitle === "Risk") {
                    $("#riskDetailsModal").modal("show");
                    loadStagingChangeRiskDetails(changeId);
                } else if (eventTitle === "Risk Event") {
                    $("#riskEventDetailsModal").modal("show");
                    loadStagingChangeRiskEventDetails(changeId);
                } else if (eventTitle === "Process to Enabler") {
                    $("#processEnablerDetailsModal").modal("show");
                    loadStagingChangeprocessEnablerDetails(changeId);
                } else if (eventTitle === "RPO") {
                    $("#rpoDetailsModal").modal("show");
                    loadStagingChangerpoDetails(changeId);
                } else if (eventTitle === "Impact Survey") {
                    $("#impactDetailsModal").modal("show");
                    loadStagingChangeImpactSurveyDetails(changeId);
                } else if (eventTitle === "Kpi Data Form") {
                    $("#kpiDataDetailsModal").modal("show");
                    loadStagingChangeKpiDataDetails(changeId);
                }
            });


            function handleBudgetStatusChange(){
                const payload = {
                    status : $("#statusSelect").val(),
                    comments : $("#statusComments").val(),
                }
                $.ajax({
                    url: "/stratroom/api/workflowevents/" + stauschangeId + "/action",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(payload),
                    success: function (response) {
                     console.log(response, "response")
                     window.location.reload();
                    }
                });
            }


 function editBudgetDetails() {
         
        //  let changeId = $('#budgetDetailsModal').data('changeId');
        console.log(budgetChangeId, "budgetChangeId");
         $('#budgetDetailsModal').modal('hide');

      
        
           $.ajax({
             url: "/stratroom/api/workflowevents/" + budgetChangeId + "/details",  
             method: 'GET',
             success: function (redata) {
              console.log(redata,"redata")
               let budgetDetailData = redata.newValue;
               let pageId = null;
               let changeId = redata.id; // Extract changeId

               if (budgetDetailData && Object.keys(budgetDetailData).length > 0) {
                  let firstKey = Object.keys(budgetDetailData)[0]; 
                  let pageId = budgetDetailData[firstKey].pageId; 
                  // let changeId = budgetDetailData[firstKey].changeId; // Extract changeId
 
                  if (pageId && changeId) {
                     window.location.href = "/stratroom/budgetView?pageId=" + pageId + "&changeId=" + changeId;
                  } else {
                     alert("Page ID or Change ID not found in the response.");
                  }
              }

             },
             error: function (xhr, status, error) {
               console.error('Error fetching risk details:', error);
               alert('Failed to load Rpo details.');
             }
           });
        
       }


        function loadStagingChangeRiskDetails(changeId) {

          $('#riskDetailsModal').data('changeId', changeId);

          $.ajax({
            url: "/stratroom/api/workflowevents/" + changeId + "/details",
            type: "GET",
            success: function (redata) {
              console.log("redadata " , redata)
              let data = redata.newValue;
              console.log(data, "risk data")
              // Clear existing tables
              $('#riskDetails_table').empty();
              $('#causeConseq_table').empty();
              $('#controlDetails_table').empty();
              $('#riskTreatment_table').empty();
              $('#riskMonitoring_table').empty();
              $('#riskEventDetails_table').empty();

              // 1. Populate Risk Details Table
              let riskDetailsTable = '<table class="table table-bordered"><thead><tr>' +
                '<th>Department</th><th>Name</th><th>Description</th><th>Related Parties</th><th>Category</th><th>Impact</th><th>Likelihood</th>' +
                '<th>Inherent Score</th><th>Residual Score</th><th>Status</th><th>Risk ID</th>' +
                '<th>Date Raised</th><th>Raised By</th><th>KPI</th><th>Others</th><th>Financial Impact</th>' +
                '<th>Next Assessment</th><th>Date Completed</th><th>POS</th><th>ISO</th><th>Information Asset</th>' +
                '</tr></thead><tbody>';

              riskDetailsTable +=
                '<tr>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.department || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.name || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.desc || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.relatedparties || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.riskcategory || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.impact || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.likeliHood || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.inherentRiskConsequenceScore || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.residualRiskPossibiltyScore || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.riskStatus || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskUniqueId || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.dateRaised || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.createdByName || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.impactDesc || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.riskothers || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.financialImpact || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.nextAssessment || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.dateCompleted || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.riskpos || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.riskiso || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.riskValue.riskinformationasset || '') + '</td>' +
                '</tr>';

              riskDetailsTable += '</tbody></table>';
              $("#riskDetails_table").append(riskDetailsTable);

              // 2. Populate Cause and Consequence Table
              let causeConseqTable = '<table class="table table-bordered"><thead><tr>' +
                '<th>Cause Name</th><th>Likelihood</th><th>Impact</th><th>Risk Rating</th><th>Risk Category</th>' +
                '<th>Possible Event</th><th>Risk Score</th><th>Description</th></tr></thead><tbody>';

              if (data.riskCauseAndConsequenceList && Array.isArray(data.riskCauseAndConsequenceList)) {
                data.riskCauseAndConsequenceList.forEach(item => {
                  const cause = item.causeAndConsequenceValue;
                  causeConseqTable += '<tr>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.name || '') + '</td>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.likelihood || '') + '</td>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.impact || '') + '</td>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.riskRating || '') + '</td>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.riskcategory || '') + '</td>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.possible || '') + '</td>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.score || '') + '</td>' +
                    '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (cause.description || '') + '</td>' +
                    '</tr>';

                  if (item.consequenceList && Array.isArray(item.consequenceList)) {
                    item.consequenceList.forEach(consequence => {
                      causeConseqTable += '<tr class="table-secondary">' +
                        '<td  style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.name || '') + '</td>' +
                        '<td  style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.likelihood || '') + '</td>' +
                        '<td  style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.impact || '') + '</td>' +
                        '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.riskRating || '') + '</td>' +
                        '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.impactcategory || '') + '</td>' +
                        '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.possible || '') + '</td>' +
                        '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.score || '') + '</td>' +
                        '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (consequence.consequenceValue.description || '') + '</td>' +

                        '</tr>';
                    });
                  }
                });
              }

              causeConseqTable += '</tbody></table>';
              $("#causeConseq_table").append(causeConseqTable);

              // 3. Populate Controls and Activities Table
              let controlsTable = '<table class="table table-bordered"><thead><tr>' +
                '<th>Control Name</th><th>Control Type</th><th>Plan Type</th><th>Cause</th><th>Resolved By</th><th>Control Effectivenesss</th><th>Risk Impact Category</th><th>Likelihood</th><th>Impact</th><th>Risk Score</th><th>Progress(%)</th><th>Action</th></tr></thead><tbody>';

              if (data.riskPlanList && Array.isArray(data.riskPlanList)) {
                data.riskPlanList.forEach(plan => {
                  if (plan.typeFlag === 'RiskPlan') {
                    controlsTable += '<tr>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.name || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.controlTypes || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.type || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.cause || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.resolveDate || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.controleffectiveness || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.category || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.likelihood || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.impact || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.planscore || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.progress || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.action || '') + '</td>' +
                      '</tr>';

                    // Activities under each Control
                    if (plan.riskActivitiesDTOList && Array.isArray(plan.riskActivitiesDTOList)) {
                      plan.riskActivitiesDTOList.forEach(activity => {
                        controlsTable += '<tr class="table-secondary">' +
                          '<td colspan="2" style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (activity.riskActivitiesValue.name || '') + '</td>' +
                          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (activity.riskActivitiesValue.controleffectiveness || '') + '</td>' +
                          '</tr>';
                      });
                    }
                  }
                });
              }

              controlsTable += '</tbody></table>';
              $("#controlDetails_table").append(controlsTable);

              // 4. Populate Risk Treatment Table
              let treatmentTable = '<table class="table table-bordered"><thead><tr>' +
                '<th>Treatment Name</th><th>Reducing Impact</th><th>Reducing Possibility</th><th>Completion Time Target</th><th>Progress</th><th>Action</th><th>Owner</th></tr></thead><tbody>';

              if (data.riskPlanList && Array.isArray(data.riskPlanList)) {
                data.riskPlanList.forEach(plan => {
                  if (plan.typeFlag === 'RiskTreatment') {
                    treatmentTable += '<tr>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.name || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.reducingimpact || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.reducingpossibility || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.timetarget || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.action || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.progressval || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.ownerName || '') + '</td>' +
                      '</tr>';
                  }
                });
              }

              treatmentTable += '</tbody></table>';
              $("#riskTreatment_table").append(treatmentTable);

              // 5. Populate Risk Monitoring Table
              let monitoringTable = '<table class="table table-bordered"><thead><tr>' +
                '<th>Mitigation</th><th>Notes</th><th>Target completion time </th><th>Changes in the target completion time</th><th>Progress(%)</th><th>Person in Charge</th><th>Owner</th><th>Status</th></tr></thead><tbody>';

              if (data.riskPlanList && Array.isArray(data.riskPlanList)) {
                data.riskPlanList.forEach(plan => {
                  if (plan.typeFlag === 'RiskMonitoring') {
                    monitoringTable += '<tr>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.mitigation || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.notes || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;"> ' + (plan.riskPlanValue.targettime || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.changestime || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.progressval || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.person || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.ownerName || '') + '</td>' +
                      '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (plan.riskPlanValue.status || '') + '</td>' +
                      '</tr>';
                  }
                });
              }

              monitoringTable += '</tbody></table>';
              $("#riskMonitoring_table").append(monitoringTable);


            }
          });
        }



        // Helper function to format date-time
        function formatDateTime(dateTime) {
          return new Date(dateTime).toLocaleString();
        }


           function editRiskDetails() {
          // Assuming `changeId` is stored in a global variable or passed to this function
          let changeId = $('#riskDetailsModal').data('changeId');
         $('#riskDetailsModal').modal('hide');

          // Fetch the data associated with the changeId

          $.ajax({
              url: "/stratroom/api/workflowevents/" + changeId + "/details",  // Adjust the endpoint to your actual API
              method: 'GET',
              success: function (redata) {
                // Check if redata.status is 'rejected'
                if (redata.status === 'rejected') {
                  console.error('Error: Risk status is rejected.');
                  alert('Risk status is rejected. Cannot proceed.');
                  return; // Exit the function early
                }

                console.log(redata)

                let riskDetailData = redata.newValue;

                var riskId = riskDetailData["id"]
                var pageno= riskDetailData["pageId"];

                if (redata.conditionType === "Manual") {
                 
                      window.location.href = "/stratroom/risks?pageId="+pageno+"&riskId="+riskId;
                  
                } else {
                  if (redata.tableName === 'risk_details') {
                    handleRiskDetailEvent(riskDetailData, changeId);
                  } else if (redata.tableName === 'risk_cause_consequence') {
                    handleRiskCauseEvent(riskDetailData, changeId);
                  } else if (redata.tableName === 'risk_consequence') {
                    handleRiskConqEvent(riskDetailData, changeId);
                  } else if (redata.tableName === 'risk_plan' && riskDetailData.typeFlag === "RiskPlan") {
                    handleRiskPlanEvent(riskDetailData, changeId);
                  } else if (redata.tableName === 'risk_activities') {
                    handleRiskActivitiesEvent(riskDetailData, changeId);
                  } else if (redata.tableName === 'risk_plan' && riskDetailData.typeFlag === "RiskTreatment") {
                    handleRiskTreatmentEvent(riskDetailData, changeId);
                  } else if (redata.tableName === 'risk_plan' && riskDetailData.typeFlag === "RiskMonitoring") {
                    handleReviewMonitoringEvent(riskDetailData, changeId);
                  }
                }
              },
              error: function (xhr, status, error) {
                console.error('Error fetching risk details:', error);
                alert('Failed to load Risk details.');
              }
            });
        
        }
        //risk event

        function editRiskEventDetails() {
          // Assuming `changeId` is stored in a global variable or passed to this function
          let changeId = $('#riskEventDetailsModal').data('changeId');

          $('#riskEventDetailsModal').modal('hide');

          // Fetch the data associated with the changeId
          $('#riskEventDetailsModal').on('hidden.bs.modal', function () {
            $.ajax({
              url: "/stratroom/api/workflowevents/" + changeId + "/details",  // Adjust the endpoint to your actual API
              method: 'GET',
              success: function (redata) {
                let riskEventDetailData = redata.newValue;

                // Populate the fields in the riskDetail_description_popup modal
                console.log(riskEventDetailData, "riskEventDetailData");

                if (redata.tableName === ('risk_event')) {
                  handleRiskEvent(riskEventDetailData, changeId);
                }

              },
              error: function (xhr, status, error) {
                console.error('Error fetching risk details:', error);
                alert('Failed to load Risk Event details.');
              }
            });
          });
        }
function loadStagingChangeRiskEventDetails(changeId) {
  $('#riskEventDetailsModal').data('changeId', changeId);

  $.ajax({
    url: "/stratroom/api/workflowevents/" + changeId + "/details",
    type: "GET",
    success: function (redata) {
      let data = redata.newValue;
      console.log(data, "riskevent old");

      // Clear existing table
      $('#riskEventDetails_table').empty();

      // Check if there's any incidentImpactData
      let incidentImpactData = data.incidentImpactData || [];

      // Safely extract reporter name(s)
      let reporterName = "";
      try {
        if (data.reporter) {
          let parsed = JSON.parse(data.reporter);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name) {
            reporterName = parsed[0].name;
          } else if (typeof parsed === "string") {
            reporterName = parsed;
          }
        }
      } catch (e) {
        // If JSON.parse fails, just use raw reporter value
        reporterName = data.reporter || "";
      }

      // risk Event table
      let riskEventTable = '<table class="table table-bordered custompopup-table"><thead><tr>' +
        `<th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="2">DATE OF INCIDENT</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="2">RISK CODE</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="2">INCIDENT</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="2">TYPE OF EVENT</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" colspan="2">THE CAUSE OF THE INCIDENT</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" colspan="3">IMPACT / LOSS</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="2">CORRECTIVE ACTION</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">RISK MITIGATION (CORRECTIVE ACTION)</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">EVENT STATUS</th>
         <th style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">INVENTOR / REPORTER</th>
        </tr>
        <tr>
            <th style="font-size: 9.3px;border: 1px solid #dddddd !important;">CATEGORY</th>
            <th style="font-size: 9.3px;border: 1px solid #dddddd !important;">DESCRIPTION</th>
            <th style="font-size: 9.3px;border: 1px solid #dddddd !important;">CATEGORY</th>
            <th style="font-size: 9.3px;border: 1px solid #dddddd !important;">DESCRIPTION</th>
            <th style="font-size: 9.3px;border: 1px solid #dddddd !important;">IMPACT LEVELS</th>
        </tr>
        </thead>
        <tbody>`;

      if (incidentImpactData.length > 0) {
        riskEventTable += '<tr>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + (data.incidentDate || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + (data.riskCode || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + (data.incident || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + (data.eventType || '') + '</td>' +

          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[0].category || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[0].categoryDescription || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[0].impactCategory || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[0].impactDescription || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[0].actionSelect || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + (data.correctiveAction || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + (data.riskMitigation || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + (data.eventStatus || '') + '</td>' +
          '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="' + incidentImpactData.length + '">' + reporterName + '</td>' +
          '</tr>';

        for (let i = 1; i < incidentImpactData.length; i++) {
          riskEventTable += '<tr>' +
            '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[i].category || '') + '</td>' +
            '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[i].categoryDescription || '') + '</td>' +
            '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[i].impactCategory || '') + '</td>' +
            '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[i].impactDescription || '') + '</td>' +
            '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (incidentImpactData[i].actionSelect || '') + '</td>' +
            '</tr>';
        }
      }

      riskEventTable += '</tbody></table>';
      $("#riskEventDetails_table").append(riskEventTable);
    }
  });
}

        //process enabler
        function editPosDetails() {
          // Assuming `changeId` is stored in a global variable or passed to this function
          let changeId = $('#processEnablerDetailsModal').data('changeId');

          $('#processEnablerDetailsModal').modal('hide');

          // Fetch the data associated with the changeId
          $('#processEnablerDetailsModal').on('hidden.bs.modal', function () {
            $.ajax({
              url: "/stratroom/api/workflowevents/" + changeId + "/details",  // Adjust the endpoint to your actual API
              method: 'GET',
              success: function (redata) {
                let posDetailData = redata.newValue;

                // Populate the fields in the riskDetail_description_popup modal
                console.log(posDetailData, "posDetailData");

                if (redata.tableName === ('process_enabler')) {
                  handlePosEvent(posDetailData, changeId);
                }

              },
              error: function (xhr, status, error) {
                console.error('Error fetching risk details:', error);
                alert('Failed to load Process to Enabler details.');
              }
            });
          });
        }
        function loadStagingChangeprocessEnablerDetails(changeId) {

          $('#processEnablerDetailsModal').data('changeId', changeId);

          $.ajax({
            url: "/stratroom/api/workflowevents/" + changeId + "/details",
            type: "GET",
            success: function (redata) {
              let data = redata.newValue;
              console.log(data, "pos old")
              // Clear existing tables
              $('#posDetails_table').empty();


              //risk Event table
              let posTable = `<table class="table table-bordered custompopup-table"><thead>
                      <tr>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">
                          Product/Services
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">
                          Process (POS)
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">
                          Sub Process (Activities in POS)
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">
                          Classification
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" colspan="2" rowspan="2">
                          Working Time (during normal conditions)
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">
                          Amount Service
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">Frequency</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" colspan="4">
                          Resource Support
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">Output</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">MAO Final</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">
                          Strategies and Solutions
                        </th>
                         <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="3">RTO</th>
                      </tr>
                      <tr>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="2">Technology</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" colspan="2">People</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" rowspan="2">
                          Input (Vital Record)
                        </th>
                      </tr>
                      <tr>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">Start</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">End</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">Internal</th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">External</th>
                      </tr>
                    </thead>
            <tbody>`;

              posTable += '<tr>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.productService || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.process || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.subProcess || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.classification || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.workingTimeStart || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.workingTimeEnd || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.amountService || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.frequency || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.technology || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.peopleInternal || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.peopleExternal || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.inputs || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.output || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.finalMao || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.businessStrategies || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.posValue.rto || '') + '</td>' +
                '</tr>';


              posTable += '</tbody></table>';
              $("#posDetails_table").append(posTable);
            }
          });
        }

        //rpo
        function editRpoDetails() {
          // Assuming `changeId` is stored in a global variable or passed to this function
          let changeId = $('#rpoDetailsModal').data('changeId');

          $('#rpoDetailsModal').modal('hide');

          // Fetch the data associated with the changeId
          $('#rpoDetailsModal').on('hidden.bs.modal', function () {
            $.ajax({
              url: "/stratroom/api/workflowevents/" + changeId + "/details",  // Adjust the endpoint to your actual API
              method: 'GET',
              success: function (redata) {
                let rpoDetailData = redata.newValue;

                // Populate the fields in the riskDetail_description_popup modal
                console.log(rpoDetailData, "riskEventDetailData");

                if (redata.tableName === ('rpo')) {
                  handleRpoEvent(rpoDetailData, changeId);
                }

              },
              error: function (xhr, status, error) {
                console.error('Error fetching risk details:', error);
                alert('Failed to load Rpo details.');
              }
            });
          });
        }

        function loadStagingChangerpoDetails(changeId) {

          $('#rpoDetailsModal').data('changeId', changeId);

          $.ajax({
            url: "/stratroom/api/workflowevents/" + changeId + "/details",
            type: "GET",
            success: function (redata) {
              let data = redata.newValue;
              console.log(data, "rpoTable old")
              // Clear existing tables
              $('#rpoDetails_table').empty();


              //risk Event table
              let rpoTable = '<table class="table table-bordered custompopup-table"><thead><tr>' +
                `<th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">
                          Process (POS)
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">
                          Name of Vital Records
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">
                          Type of Media
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">
                          Backup Method
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">
                          Backup Time
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;" >
                          Retention
                        </th>
                        <th  style="font-size: 9.3px;border: 1px solid #dddddd !important;">
                          Database Recovery Strategy
                        </th>
                      </tr>
                    </thead>
                    <tbody>`;

              rpoTable += '<tr>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.rpoValues.process || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.rpoValues.vital || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.rpoValues.media || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.rpoValues.backupMethode || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.rpoValues.backupTime || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.rpoValues.retention || '') + '</td>' +
                '<td style="font-size: 9.3px;border: 1px solid #dddddd !important;">' + (data.rpoValues.dataBaseRecoveryStratagy || '') + '</td>' +
                '</tr>';


              rpoTable += '</tbody></table>';
              $("#rpoDetails_table").append(rpoTable);
            }
          });
        }

        
        $(document).ready(function () {

          $('.riskplan_add_user_popup,.riskactivities_add_user_popup').modal({ show: false, backdrop: 'static', keyboard: false });

        });
        $('.modal-dialog').draggable({
          handle: ".modal-header"
        });

        //TimeStart & TimeEnd & Amount Service
        function getcalculateAmountService(startTimeSelector, endTimeSelector, amountServiceSelector) {
          var Timestart = $(startTimeSelector).val();
          var Timeend = $(endTimeSelector).val();

          if (Timestart && Timeend) {
            var start = Timestart.split(':');
            var end = Timeend.split(':');

            var startHours = parseInt(start[0]);
            var startMinutes = parseInt(start[1]);

            var endHours = parseInt(end[0]);
            var endMinutes = parseInt(end[1]);

            var startTotalMinutes = startHours * 60 + startMinutes;
            var endTotalMinutes = endHours * 60 + endMinutes;

            var diffMinutes = endTotalMinutes - startTotalMinutes;
            if (diffMinutes < 0) {
              diffMinutes += 24 * 60;
            }
            var diffHours = Math.floor(diffMinutes / 60);
            $(amountServiceSelector).val(diffHours);
          }
        }
        $(document).ready(function () {
          $(".approvaltimestartselect, .approvaltimeendselect").on('change', function () {
            getcalculateAmountService(".approvaltimestartselect", ".approvaltimeendselect", ".approvalamountService");
          });


        });
        // FinalMao & RTO 
        $(document).ready(function () {
          function calculateRTO(value) {
            let numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              return (numValue * 75) / 100;
            }
            return '';
          }
          $(".approvalfinalMaoService").on("input", function () {
            let calculatedValue = calculateRTO($(this).val());
            $(".approvalrtoService").val(calculatedValue);
          });


        });  jQuery.validator.addMethod("greaterThan",
          function (value, element, params) {

            if (!/Invalid|NaN/.test(new Date(value))) {
              return new Date(value) > new Date($(params).val());
            }

            return isNaN(value) && isNaN($(params).val())
              || (Number(value) > Number($(params).val()));
          }, 'Must be greater than {0}.');

        jQuery.validator.setDefaults({
          debug: false,
          success: "valid",
          //   ignore: ":hidden:not(.chosen-select)"
        });
        $("#riskDetailForm").validate({
          rules: {
            riskDetail_name: {
              required: true
            }
          },
          messages: {
            required: "Name is required",
            riskDetail_next_date: "Must be greater than Date completed."
          },
          submitHandler: function (form) {
            handleRiskDetailSave();
          }
        });