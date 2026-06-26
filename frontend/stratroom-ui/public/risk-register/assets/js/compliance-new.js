$(document).ready(function () {
    // Load your compliance JSON
    $.getJSON("compliance.json", function (json) {
        const tabs = json[0]?.tab || [];

        tabs.forEach((tab, index) => {
            const tablePrefix = `compliance-${index}`;
            const tabId = `tab-${index}`;

            // 1. Render the HTML for this card and table
            const html = `
                <div id="${tabId}">
                    <div class="card custom-card table-card">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">
                                        ${json[0].pageTitle || 'Untitled'}
                                    </strong>
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
                                <thead class="text-center align-middle">
                                    <tr>
                                        <th>Control ID</th>
                                        <th>Control <br>Description</th>
                                        <th>Regulation/Standard</th>  
                                        <th>Owner</th>                
                                        <th>Risk <br>Level</th>
                                        <th>Control <br>Type</th>
                                        <th>Implementation <br>Status</th>                                        
                                        <th>Last Assessment <br>Date</th>
                                        <th>Next Review <br>Date</th>
                                        <th>Status</th>
                                        <th>Audit <br>Required</th>
                                        <th>Last Audit <br>Date</th>
                                        <th>Audit Findings</th>
                                        <th>Corrective <br>Actions</th>
                                        <th>Action Due <br>Date</th>
                                        <th>Responsible</th>
                                        <th>Evidence File <br>Reference</th>
                                        <th>Notes</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;

            // 2. Append to the main container
            $("#compliance-container").append(html);

            // 3. Initialize the DataTable with data
            $(`#table-${tablePrefix}`).DataTable({
                data: tab.tabledata || [],
                paging: true,
                pageLength: 20,
                lengthChange: false,
                ordering: false,
                info: false,
                responsive: true,
                scrollX: true,
                scrollY: "400px",
                processing: true,
                deferRender: true,
                language: {
                    paginate: {
                        previous: "<i class='fas fa-arrow-left'></i>",
                        next: "<i class='fas fa-arrow-right'></i>"
                    }
                },
                columns: [
                    { data: "control_id", defaultContent: "N/A" },
                    { data: "control_description", defaultContent: "N/A" },
                    {
                        data: "regulation",
                        render: data => Array.isArray(data) ? data.join(", ") : (data || "N/A")
                    },
                    {
                        data: "owner",
                        render: data => Array.isArray(data) && data.length > 0 ? data[0].name : "N/A"
                    },
                    { data: "risk_level", defaultContent: "N/A" },
                    { data: "control_type", defaultContent: "N/A" },
                    { data: "implementation_status", defaultContent: "N/A" },
                    { data: "last_assessment_date", defaultContent: "N/A" },
                    { data: "next_review_date", defaultContent: "N/A" },
                    { data: "status", defaultContent: "N/A" },
                    { data: "audit_required", defaultContent: "N/A" },
                    { data: "last_audit_date", defaultContent: "N/A" },
                    { data: "audit_findings", defaultContent: "N/A" },
                    { data: "corrective_actions", defaultContent: "N/A" },
                    { data: "action_due_date", defaultContent: "N/A" },
                    {
                        data: "responsible_person",
                        render: data => Array.isArray(data) ? data.map(p => p.name).join(", ") : "N/A"
                    },
                    { data: "evidence_reference", defaultContent: "N/A" },
                    { data: "notes", defaultContent: "N/A" },
                    {
                        data: null,
                        render: () => `<button class="btn btn-sm btn-primary">Edit</button>`
                    }
                ],
                 drawCallback: function (settings) {
                     const api = this.api();
                     api.rows().every(function () {
                         const $row = $(this.node());
                         $row.find('td').addClass('editable text-center');
                     });
                 }
            });

            $(`#table-${tablePrefix}`).on('click', 'td.editable', function () {
                const $cell = $(this);

                // Avoid inserting another select if already editing
                if ($cell.find('select').length > 0) return;

                const currentText = $cell.text().trim();

                // Define your dropdown options
                const options = ['Planned', 'In Progress', 'Completed', 'Not Applicable'];

                // Create the select element
                const $select = $('<select class="editor-select2 form-select" style="width:100%; padding: 0.15rem;"></select>');

                // Populate options
                options.forEach(opt => {
                    const $option = $('<option></option>')
                        .val(opt)
                        .text(opt);
                    if (opt === currentText) {
                        $option.prop('selected', true);
                    }
                    $select.append($option);
                });

                // Replace cell content with the select dropdown
                $cell.empty().append($select);

                // Optional: Initialize select2 if needed
                if ($.fn.select2) {
                    $select.select2({
                        width: 'resolve',
                        dropdownParent: $cell
                    });
                }

                // Focus the select
                $select.focus();

                // When changed or blurred, update the cell content
                $select.on('change blur', function () {
                    const newValue = $select.val();
                    $cell.text(newValue);

                    // Optional: Update the underlying DataTable cell value
                    const dt = $(`#table-${tablePrefix}`).DataTable();
                    const cellIndex = dt.cell($cell).index();
                    if (cellIndex) {
                        dt.cell(cellIndex.row, cellIndex.column).data(newValue).draw(false);
                    }
                });
            });



            
        });
    });
});