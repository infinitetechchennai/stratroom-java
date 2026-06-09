$(document).ready(function() {
    // Load JSON and render
    $.ajax({
        url: "k-approval.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            const scorecard = data[0];
            renderTabContent(scorecard.tab);
        },
        error: function(xhr, status, error) {
            console.error("Error loading data:", error);
        }
    });

    function renderTabContent(tabs) {
        const tabContent = $("#task-content").empty();
        tabs.forEach((tab, index) => {
            const tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
            const tabId = `task-${tablePrefix}`;

            tabContent.append(`
                <div id="${tabId}">
                    <div class="card custom-card table-card">
                        <div class="card-header">
                            <div class="c-header-left">                              
                                <h5 class="card-title">                 
                                <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">${tab.title}</strong>
                                </h5>
                            </div>
                            
                        </div>
                        <div class="card-body">
                            <table class="table table-sm border w-100" id="table-${tablePrefix}" style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
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
                                <tbody>${renderTable(tab.tabledata)}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `);
        });
        setTimeout(() => {
            tabs.forEach((tab) => {
                const tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
                initializeDataTable(`#table-${tablePrefix}`);
            });
        }, 300);
    }

    function renderTable(data, parentId = "", level = 1) {
        let html = "";

        data.forEach((item, index) => {
            const rowId = `${parentId}-row-${index}`;
            const itemId = item.approver_id;
            let actionsMenu = getActionsMenu(itemId);



            const statusOptions = ["Pending", "Approved", "Rejected"];
            function getStatusBadge(status) {
                const statusMap = {                   
                    "Pending": "status-bg-yellow",
                    "Approved": "status-bg-green",
                     "Rejected": "status-bg-red",
                };

                const badgeStatusClass = statusMap[status] || "status-bg-gray";
                return `<span class="badge ${badgeStatusClass} rounded-pill dropdown-toggle ms-auto">${status}</span>`;
            }

// Store the current cell being edited
let currentStatusCell = null;
let currentRowData = null;

$(document).on("click", "td.editable-status", function() {
    const $cell = $(this);
    currentStatusCell = $cell;
    
    // Get the current status from the cell
    const currentStatus = $cell.find('.badge').text().trim();
    
    // Get the row data (you may need to adjust this based on your data structure)
    currentRowData = $cell.closest('tr').data('item-data') || {};
    
    // Set the current values in the modal
   // $('#statusSelect').val(currentStatus);
    //$('#statusComments').val('');

     // Initialize the modal
    const $modal = $('#statusUpdateModal');
     // Destroy any existing Select2 instances
    $('#statusSelect').select2('destroy');

    // Set the value before initializing Select2
    $('#statusSelect').val(currentStatus);
    
    // Initialize Select2
    $('#statusSelect').select2({
        width: '100%',
        dropdownParent: $modal,  // Important for modal positioning
        minimumResultsForSearch: Infinity  // Hide search box
    });
    
    // Clear comments
    $('#statusComments').val('');
    
    // Show modal
    $modal.modal('show');
    
    // Show the modal
    //$('#statusUpdateModal').modal('show');
});

// Handle save button click
$('#saveStatusBtn').on('click', function() {
    if (currentStatusCell) {
        const newStatus = $('#statusSelect').val();
        const comments = $('#statusComments').val();
        
        currentStatusCell.html(getStatusBadge(newStatus));
        
        console.log('Updating status:', {
            rowData: currentRowData,
            newStatus: newStatus,
            comments: comments
        });
        
        // Close the modal
        $('#statusUpdateModal').modal('hide');
    }
});

// Clean up when modal is closed
$('#statusUpdateModal').on('hidden.bs.modal', function () {
    currentStatusCell = null;
    currentRowData = null;
});

           

           
           
            html += `<tr>

                <td class="text-center"><div class="d-flex justify-content-center gap-1 flex-wrap text-nowrap" style="min-width:260px">${renderEventLink(item)}</div></td>
                           
                <td class="text-center text-nowrap editable-status">${getStatusBadge(item.status)}</td>
                <td class="text-center text-nowrap">${item.submitted_on || ""}</td>
                <td class="text-center text-nowrap">${item.submitted_By  || ""}</td>
                <td class="text-center text-nowrap">${item.current_approver  || ""}</td>
                <td class="text-center text-nowrap">${item.next_approver  || ""}</td>
                <td width="70">${actionsMenu}</td>
                
               
            </tr>`;

            if (item.children) {
                html += renderTable(item.children, `${rowId}-child`, level + 1);
            }
        });

        return html;
    }
    
    function initializeDataTable(selector) {
        setTimeout(() => {
            const $table = $(selector);
           // updateAllProgressBars();
            
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
      
            return `<div class="table-actions justify-content-center">
                <a href="#approval-history-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="assets/images/icons/info-i.svg" width="12" height="12"></span>
                </a>                
            </div>`;
       
    }

    function renderEventLink(item) {
  const modalUrls = [
    "#riskDetailsModal",
    "#riskEventDetailsModal",
    "#posDetailsModal",
    "#rpoDetailsModal"
  ];
  
  const isModal = item.url && modalUrls.includes(item.url);
  
  const linkAttrs = isModal
    ? `href="${item.url}" data-bs-toggle="modal" data-bs-target="${item.url}"`
    : `href="${item.url || ''}"`;
    
  return `<a class="text-decoration-none" ${linkAttrs}>${item.event_title || ""}</a>`;
}

});