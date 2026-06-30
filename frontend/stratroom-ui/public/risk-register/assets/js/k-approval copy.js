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
                            <div class="card-actions">
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#task-add-modal">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                    <i class="fas fa-plus"></i>
                  </span>
                </button>
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

            const itemId = item.approver_id
            
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
            $(document).on("click", "td.editable-status", function() {
                const $cell = $(this);
                // const currentText = $cell.text().trim();

                // Avoid creating multiple selects
                if ($cell.find("select").length) return;

                // Create and populate the <select>
                const $select = $("<select class='form-select form-select-sm'>").append(
                    statusOptions.map(status =>
                        // $("<option>").val(status).text(status).prop("selected", status === currentText)
                        $("<option>").val(status).text(status).prop("selected", status)
                    )
                );

                $cell.empty().append($select);
                $select.select2({
                    width: "100%",
                    selectionCssClass: 'form-control form-control-sm p-0'
                }).focus();
                // $select.focus();

                // Update badge on change/blur
                $select.on("blur change", function() {
                    const newStatus = $select.val();
                    $cell.html(getStatusBadge(newStatus));
                });
                // Handle outside click
                $(document).on("mousedown.select2Outside", function(event) {
                    if (!$(event.target).closest(".select2-container, .select-dropdown").length) {
                        const newStatus = $select.val();
                        $cell.html(getStatusBadge(newStatus));
                        $(document).off("mousedown.select2Outside");                        
                    }
                });
            });

           
           
            html += `<tr>

                <td class="text-center"><div class="d-flex justify-content-center gap-1 flex-wrap text-nowrap" style="min-width:260px"><a href="${item.url || ""}">${item.event_title || ""}</a></div></td>
                           
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
                
                    table.column(6).search(searchTerms.join('|'), true, false).draw();
                  });

            } else {
                $(selector).DataTable().columns.adjust().draw();
            }
        }, 200);
    }
    function getActionsMenu(itemId) {
      
            return `<div class="table-actions justify-content-end">
                <a href="#objective-view-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="assets/images/icons/info-i.svg" width="12" height="12"></span>
                </a>                
            </div>`;
       
    }

});