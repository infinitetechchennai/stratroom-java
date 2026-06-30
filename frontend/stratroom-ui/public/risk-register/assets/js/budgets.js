$(document).ready(function () {


  // var customColors = [
  //   "#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869",
  // "#ef654a", "#55ae88", "#df96a1", "#ffd14e", "#f58b57",
  // "#dabc40", "#4fa9dc", "#84c4a0", "#f0a6ca", "#a1d1e6",
  // "#c1bc9e", "#ea9999", "#a9d18e", "#9dc3e6"
  // ];
  var customColors = [
    "#d8cce1", // Lavender
    "#f7c5d0", // Soft Pink
    "#d7cde8", // Pastel Purple
    "#b6e0e0", // Aqua Mint
    "#fcd5b5", // Peach
    "#f8b5a4", // Soft Coral
    "#aedcc0", // Mint Green
    "#e5b6c9", // Rose Quartz
    "#fde39b", // Pastel Yellow
    "#c5dedd", // Powder Teal
    "#ffe0ac", // Apricot
    "#ffcfd2", // Blush
    "#e2f0cb", // Light Lime
    "#c3d6f3", // Baby Blue
    "#e5d4ed", // Mauve
    "#ffdab9", // Peach Puff
    "#d0e6a5", // Light Avocado
    "#e0c3fc", // Lavender Mist
    "#b5ead7", // Seafoam
    "#fff1c1"  // Light Cream
];


  var columnColorMap = {};

  $('#budgetTable thead tr').each(function(rowIndex) {
    var colIndex = 0;

    $(this).children('th').each(function() {
      // Skip columns already covered by rowspan
      while (columnColorMap[colIndex] && columnColorMap[colIndex].rowspanRemaining > 0) {
        columnColorMap[colIndex].rowspanRemaining--;
        colIndex++;
      }

      // Assign color based on column index
      var color = customColors[colIndex % customColors.length];
      $(this).css('background-color', color);

      // Track rowspan if exists
      var rowspan = parseInt($(this).attr('rowspan')) || 1;
      if (rowspan > 1) {
        columnColorMap[colIndex] = {
          rowspanRemaining: rowspan - 1
        };
      }

      colIndex++;
    });
  });
  
  
  var table;
  var newRowAdded = false; // Track if new row is added
  var yearDropDownOptions = [];
  var monthDropDownOptions = [];
  var versionDropDownOptions = [];
  var glAccountDropDownOptions = [];
  var glnameDropDownOptions = [];
  var budgetTypeDropDownOptions = [];
  var initiativeDescDropDownOptions = [];
  var outcomeDropDownOptions = [];
  var objectiveDropDownOptions = [];
  var subInitiativeDescDropDownOptions = [];
  var activityDescDropDownOptions = [];
  var subActivityDesDropDownOptions = [];
  var currencyDropDownOptions = [];
  var numberofQuantityDropDownOptions = [];
  var unitAmountDropDownOptions = [];
  var totalBudgetDropDownOptions = [];
  var divisionDropDownOptions = [];
  var ownerNameDropDownOptions = [];
  var notesDropDownOptions = [];
  var statusDropDownOptions = [];



  // Initialize the DataTable
  if (!$.fn.DataTable.isDataTable('#budgetTable')) {
    table = $('#budgetTable').DataTable({
     // dom: 'Bfrtip',
      // buttons: [{
      //   extend: 'colvis',
      //   text: 'Choose Columns',
      //   columns: [1, 2, 3],
      //   columnText: function(dt, idx, title) {
      //     //return title || 'Column ' + (idx + 1);
      //     var headerCell = dt.table().header().rows[0].cells[idx];
      // return $(headerCell).text().trim() || 'Column ' + (idx + 1);
      //   }
      // }],
      
      paging: true,
      pageLength: 20,
      lengthChange: false,
      // searching: false,
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
      ajax: {
        url: "budgets-list.json", // Your JSON file path
        method: "GET",
        dataType: "json",
        dataSrc: function (json) {
          // Build year dropdown options from data
          json.data.forEach(function (item) {
            const year = item.budgetValues.year || "";
            const month = item.budgetValues.month || "";
            const version = item.budgetValues.version || "";
            const glAccount = item.budgetValues.glAccount || "";
            const glname = item.budgetValues.glname || "";
            const budgetType = item.budgetValues.budgetType || "";
            const initiativeDesc = item.budgetValues.initiativeDesc || "";
            const outcome = item.budgetValues.outcome || "";
            const objective = item.budgetValues.objective || "";
            const subInitiativeDesc = item.budgetValues.subInitiativeDesc || "";
            const activityDesc = item.budgetValues.activityDesc || "";
            const subActivityDes = item.budgetValues.subActivityDes || "";
            const currency = item.budgetValues.currency || "";
            const numberofQuantity = item.budgetValues.numberofQuantity || "";
            const unitAmount = item.budgetValues.unitAmount || "";
            const totalBudget = item.budgetValues.totalBudget || "";
            const division = item.budgetValues.division || "";
            const ownerName = item.budgetValues.ownerName || "";
            const notes = item.budgetValues.notes || "";
            const status = item.status || "";

            console.log("item",item.status)

            // Check and add to dropdown options if not already present
            if (year && !yearDropDownOptions.find(opt => opt.id === year)) {
              yearDropDownOptions.push({
                id: year,
                text: year
              });
            }

            if (month && !monthDropDownOptions.find(opt => opt.id === month)) {
              monthDropDownOptions.push({
                id: month,
                text: month
              });
            }

            if (version && !versionDropDownOptions.find(opt => opt.id === version)) {
              versionDropDownOptions.push({
                id: version,
                text: version
              });
            }

            if (glAccount && !glAccountDropDownOptions.find(opt => opt.id === glAccount)) {
              glAccountDropDownOptions.push({
                id: glAccount,
                text: glAccount
              });
            }

            if (glname && !glnameDropDownOptions.find(opt => opt.id === glname)) {
              glnameDropDownOptions.push({
                id: glname,
                text: glname
              });
            }

            if (budgetType && !budgetTypeDropDownOptions.find(opt => opt.id === budgetType)) {
              budgetTypeDropDownOptions.push({
                id: budgetType,
                text: budgetType
              });
            }

            if (initiativeDesc && !initiativeDescDropDownOptions.find(opt => opt.id === initiativeDesc)) {
              initiativeDescDropDownOptions.push({
                id: initiativeDesc,
                text: initiativeDesc
              });
            }

            if (outcome && !outcomeDropDownOptions.find(opt => opt.id === outcome)) {
              outcomeDropDownOptions.push({
                id: outcome,
                text: outcome
              });
            }

            if (objective && !objectiveDropDownOptions.find(opt => opt.id === objective)) {
              objectiveDropDownOptions.push({
                id: objective,
                text: objective
              });
            }

            if (subInitiativeDesc && !subInitiativeDescDropDownOptions.find(opt => opt.id === subInitiativeDesc)) {
              subInitiativeDescDropDownOptions.push({
                id: subInitiativeDesc,
                text: subInitiativeDesc
              });
            }

            if (activityDesc && !activityDescDropDownOptions.find(opt => opt.id === activityDesc)) {
              activityDescDropDownOptions.push({
                id: activityDesc,
                text: activityDesc
              });
            }

            if (subActivityDes && !subActivityDesDropDownOptions.find(opt => opt.id === subActivityDes)) {
              subActivityDesDropDownOptions.push({
                id: subActivityDes,
                text: subActivityDes
              });
            }

            if (currency && !currencyDropDownOptions.find(opt => opt.id === currency)) {
              currencyDropDownOptions.push({
                id: currency,
                text: currency
              });
            }

            if (numberofQuantity && !numberofQuantityDropDownOptions.find(opt => opt.id === numberofQuantity)) {
              numberofQuantityDropDownOptions.push({
                id: numberofQuantity,
                text: numberofQuantity
              });
            }
            if (unitAmount && !unitAmountDropDownOptions.find(opt => opt.id === unitAmount)) {
              unitAmountDropDownOptions.push({
                id: unitAmount,
                text: unitAmount
              });
            }
            if (totalBudget && !totalBudgetDropDownOptions.find(opt => opt.id === totalBudget)) {
              totalBudgetDropDownOptions.push({
                id: totalBudget,
                text: totalBudget
              });
            }

            if (division && !divisionDropDownOptions.find(opt => opt.id === division)) {
              divisionDropDownOptions.push({
                id: division,
                text: division
              });
            }

            if (ownerName && !ownerNameDropDownOptions.find(opt => opt.id === ownerName)) {
              ownerNameDropDownOptions.push({
                id: ownerName,
                text: ownerName
              });
            }

            if (notes && !notesDropDownOptions.find(opt => opt.id === notes)) {
              notesDropDownOptions.push({
                id: notes,
                text: notes
              });
            }
            if (status && !statusDropDownOptions.find(opt => opt.id === status)) {
              statusDropDownOptions.push({
                id: status,
                text: status
              });
            }
          
          });
          return json.data;
        }
      },
      columns: [{
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1; // SI.NO
          }
        },
        {
          data: 'budgetValues.year',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-dark rounded-pill dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.month',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-dark rounded-pill dropdown-toggle">${data || ''}</span>`;
          },
        },
        {
          data: 'budgetValues.version',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect justify-content-center">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.glAccount',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.glname',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.budgetType',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-red rounded-pill dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.initiativeDesc',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.outcome',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect justify-content-center">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.objective',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect justify-content-center">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.subInitiativeDesc',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.activityDesc',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.subActivityDes',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.currency',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-pink rounded-pill dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.numberofQuantity',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-cyan rounded-pill justify-content-center">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.unitAmount',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-cyan rounded-pill justify-content-center">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.totalBudget',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-cyan rounded-pill justify-content-center">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.division',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.ownerName',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="badge label-bg-pink rounded-pill dropdown-toggle">${data || ''}</span>`;
          }
        },
        {
          data: 'budgetValues.notes',
          defaultContent: 'N/A',
          render: function (data) {
            return `<span class="tdSelect justify-content-center" style="max-width: 200px; display: inline-block;">${data || ''}</span>`;
          }
        },
        { data: 'status', defaultContent: 'N/A',
          render: function (data) {
          return `${data || ''}`;
        },visible: false,searchable: true },
        {
          data: null,
          render: function (data, type, row, meta) {
            return '<div class="table-actions justify-content-center"><div class="btn btn-sm btn-icon" href="#delete-modal" data-bs-toggle="modal"><span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></span></div></div>';
          }
        }       
      ],
      initComplete: function (settings, json) {
        console.log('Table Loaded');
        // let select2Columns = [1, 4, 6, 15];
        this.api().columns().every(function () {
          var title = this.header();
          title = $(title).html().replace(/[\W]/g, '-'); // Sanitize title for use
          var column = this;
          if (column.index() === 0 || column.index() === 21) return; // Skip first column
          var select = $('<select class="select2" style="width: min(200px,100%);"></select>')
            .appendTo($(column.header()).empty())
            .on('change', function () {
              var data = $.map($(this).select2('data'), function (value) {
                return value.text ? '^' + $.fn.dataTable.util.escapeRegex(value.text) + '$' : null;
              });
              var val = data.length ? data.join('|') : "";
              column.search(val, true, false).draw();
            });


          column.data().unique().sort().each(function (d) {
            if (d) {
              select.append('<option value="' + d + '">' + d + '</option>');
            }
          });

          select.select2({
            multiple: true,
            closeOnSelect: false,
             placeholder: "Select " + title,
             allowClear: true,
             tags: true,
             selectionCssClass: 'form-select form-select-sm rounded-pill custom-multiple p-0 pe-3 px-1 bg-transparent text-dark',
             dropdownCssClass: 'select2-multiple-dropdown'
          });

          select.val(null).trigger('change');


        })
      },
      drawCallback: function (settings) {
        $('.dataTables_filter').addClass('d-none');
        $('.dataTables_paginate').addClass('d-flex justify-content-end');
      }
    });

    
const theadCells = table.table().header().rows[0].cells;

let popoverContent = `
  <div>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="h6 mb-0">Filter Table Head</h5>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="d-flex flex-column gap-2 pageViewOption">
`;

// Loop through header cells (skip first and last columns if needed)
const excludedIndices = [1,2,3, 8, 10, 12];
for (let i = 1; i < theadCells.length - 1; i++) {
  if (excludedIndices.includes(i)) continue;
  const title = $(theadCells[i]).text().trim();
  const id = `ftablethead-column-${i.toString().padStart(4, '0')}`;
  popoverContent += `
    <div class="form-check">
      <input class="form-check-input filter-table-th" id="${id}" type="checkbox" value="${title}" checked data-col="${i}">
      <label class="form-check-label" for="${id}">${title}</label>
    </div>
  `;
}

popoverContent += `</div></div>`;

// Initialize Bootstrap popover
const popoverTrigger = document.getElementById('popoverFiltertableHead');
new bootstrap.Popover(popoverTrigger, {
  html: true,
  placement: 'bottom',
  content: popoverContent,
  sanitize: false,
  container: 'body'
});

// Handle popover close button
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-close')) {
    bootstrap.Popover.getInstance(popoverTrigger)?.hide();
  }
});

// Handle show/hide column logic when checkbox is toggled
$(document).on('change', '.filter-table-th', function () {
  const colIndex = $(this).data('col');
  const visible = $(this).is(':checked');
  table.column(colIndex).visible(visible);
});

// let statusDropDownOptions = [];

// Apply filter on checkbox change
$(document).on('change', '.filter-status', function () {
  // Collect checked values
   statusDropDownOptions = [];
  $('.filter-status:checked').each(function () {
    statusDropDownOptions.push($(this).val());
  });

  // Apply regex search to Status column
  const statusRegex = statusDropDownOptions.length
    ? '^(' + statusDropDownOptions.map(val => $.fn.dataTable.util.escapeRegex(val)).join('|') + ')$'
    : '';

  // Assuming Status is in column index 4 (adjust this to match your table)
  const statusColIndex = 20;
  table.column(statusColIndex).search(statusRegex, true, false).draw();
});
}

  // Add editable class after draw
 $('#budgetTable').on('draw.dt', function () {
      lucide.createIcons();
  $('#budgetTable tbody tr').each(function () {
    $(this).find('td').each(function (colIndex) {
      // Apply editable and text-center to all
      $(this).addClass('editable text-center');

      // Only apply text-nowrap if not column 19
      if (colIndex !== 19) {
        $(this).addClass('text-nowrap');
      } else {
        $(this).removeClass('text-nowrap'); // remove in case previously added
      }
    });
  });
});


  // Handle cell click to edit
  $('#budgetTable tbody').on('click', 'td.editable', function () {
    var $cell = $(this);

    if ($cell.find('select').length === 0) { // If no select already
      var currentText = $cell.text().trim();
      var select = $('<select class="editor-select2" style="width:100%;"></select>');

      var colIndex = $cell.index(); // get clicked column index
      var optionsList = [];

      const excludedIndexes = [3, 8, 9, 14,15,16,19];

      // if (colIndex >= 1 && colIndex <= 16) {
      if (colIndex >= 1 && colIndex <= 19 && !excludedIndexes.includes(colIndex)) {
        // Name or Position columns → dropdown
        var select = $('<select class="editor-select2" style="width:100%;"></select>');
        // var optionsList = (colIndex === 1) ? nameDownOptions : positionDownOptions;

        var optionsList = (
          colIndex === 1) ? yearDropDownOptions :
          (colIndex === 2) ? monthDropDownOptions :
          (colIndex === 3) ? versionDropDownOptions :
          (colIndex === 4) ? glAccountDropDownOptions :
          (colIndex === 5) ? glnameDropDownOptions :
          (colIndex === 6) ? budgetTypeDropDownOptions :
          (colIndex === 7) ? initiativeDescDropDownOptions :
          (colIndex === 8) ? outcomeDropDownOptions :
          (colIndex === 9) ? objectiveDropDownOptions :
          (colIndex === 10) ? subInitiativeDescDropDownOptions :
          (colIndex === 11) ? activityDescDropDownOptions :
          (colIndex === 12) ? subActivityDesDropDownOptions :
          (colIndex === 13) ? currencyDropDownOptions :
          (colIndex === 14) ? numberofQuantityDropDownOptions :
          (colIndex === 15) ? unitAmountDropDownOptions :
          (colIndex === 16) ? totalBudgetDropDownOptions :
          (colIndex === 17) ? divisionDropDownOptions :
          (colIndex === 18) ? ownerNameDropDownOptions :
          (colIndex === 19) ? notesDropDownOptions : "";

        optionsList.forEach(function (opt) {
          select.append('<option value="' + opt.id + '">' + opt.text + '</option>');
        });

        $cell.empty().append(select);
        select.select2({
          placeholder: "Select Name/Position",
          tags: true
        }).val(currentText).trigger('change');
        select.select2("open");

        select.on('select2:close', function () {
          var newVal = select.val();
 // Define badge class by column index
 let badgeClass = "tdSelect dropdown-toggle"; // default
 if (colIndex === 1) badgeClass = "badge label-bg-dark rounded-pill dropdown-toggle";         // Version
 else if (colIndex === 2) badgeClass = "badge label-bg-dark rounded-pill dropdown-toggle"; // Currency
 else if (colIndex === 6) badgeClass = "badge label-bg-red rounded-pill dropdown-toggle"; // totalBudget
 else if (colIndex === 13) badgeClass = "badge label-bg-pink rounded-pill dropdown-toggle";   // Budget Type
 else if (colIndex === 14) badgeClass = "badge label-bg-blue rounded-pill dropdown-toggle";   // Budget Type
 else if (colIndex === 15) badgeClass = "badge label-bg-yellow rounded-pill dropdown-toggle";   // Budget Type
 else if (colIndex === 16) badgeClass = "badge label-bg-cyan rounded-pill dropdown-toggle";   // Budget Type
 else if (colIndex === 18) badgeClass = "badge label-bg-pink rounded-pill dropdown-toggle";   // Budget Type
//  else if (colIndex === 4) badgeClass = "tdSelect dropdown-toggle";   // Budget Type
//  else if (colIndex === 4 || colIndex === 5 || colIndex === 7) badgeClass = "tdSelect dropdown-toggle"; // Initiative/S

          $cell.html(`<span class="${badgeClass}">${newVal}</span>`);
          table.columns.adjust().draw(false);
        });
      }

    }

if ($cell.find('input, textarea').length === 0) {
  var colIndex = $cell.index();

  if ([3, 14, 15, 16, 19].includes(colIndex)) {
    const currentText = $cell.text().trim();

    // Prevent duplicate inputs
    if ($cell.find("input, textarea").length) return;

    let editor;

    if (colIndex === 19) {
      // Use textarea for column 19
      editor = $('<textarea class="form-control form-control-sm text-center" rows="2"></textarea>');
    } else {
      // Use text input for other editable columns
      editor = $('<input type="text" class="form-control form-control-sm text-center">');
    }

    editor.val(currentText);
    $cell.empty().append(editor);
    editor.focus().select();

    editor.on("blur change", function () {
      const newVal = editor.val();

      // === Badge Rendering for Columns 14, 15, 16 ===
      if ([14, 15, 16].includes(colIndex)) {
        // Choose color class dynamically (or use logic)
        const badgeClass = 'label-bg-cyan'; // replace with condition if needed
        $cell.html(`<span class="badge ${badgeClass} rounded-pill justify-content-center">${newVal}</span>`);
      }

      // === Custom Styling for Column 19 ===
      else if (colIndex === 19) {
        $cell.html(`<span class="tdSelect justify-content-center" style="max-width: 200px; display: inline-block;">${newVal}</span>`);
      }

      // === Default Rendering ===
      else {
        $cell.html(newVal);
      }
    });
  }
}



  });

  $('#addRowBtn').on('click', function () {
    // Add a new empty row
    var newRowData = {
      budgetValues: {
        year: '',
        month: '',
        version: '',
        glAccount: '',
        glname: '',
        budgetType: '',
        initiativeDesc: '',
        outcome: '',
        objective: '',
        subInitiativeDesc: '',
        activityDesc: '',
        subActivityDes: '',
        currency: '',
        numberofQuantity: '',
        unitAmount: '',
        totalBudget: '',
        division: '',
        ownerName: '',
        notes: '',
        status: '',
      }
    };

    // Add the new row to the table
    table.row.add(newRowData).draw(false);

    const theadCellsTitle = table.table().header().rows[0].cells;
    console.log("theadCellsTitle",theadCellsTitle);

    // Move to last page
    var lastPage = table.page.info().pages - 1;
    table.page(lastPage).draw(false);

    // Apply select2 to the new row's columns
    setTimeout(function () {
  const lastRowIndex = table.rows().count() - 1;
  const $theadCells = theadCellsTitle; // assumed global or passed

  table.columns().every(function () {
    const colIndex = this.index();

    // Skip fixed columns if needed
    if (colIndex === 0 || colIndex === 21) return;

    const $cell = $(table.cell(lastRowIndex, colIndex).node());
    const title = $($theadCells[colIndex]).text().trim();

    // Handle specific columns with input or textarea
    if ([3, 14, 15, 16].includes(colIndex)) {
      const input = $('<input type="text" class="form-control form-control-sm text-center">')
        .val('')
        .appendTo($cell.empty())
        .focus();
      return;
    }

    if (colIndex === 19) {
      const textarea = $('<textarea class="form-control form-control-sm text-center" rows="2" style="max-width:200px;"></textarea>')
        .val('')
        .appendTo($cell.empty())
        .focus();
      return;
    }

    // Default: use Select2 for other columns
    const select = $('<select class="select2" style="width: 100%"></select>')
      .appendTo($cell.empty())
      .on('change', function () {
        const selected = $(this).val();
        // Optional: handle value after change
      });

    // Populate select with unique values from the column
    this.data().unique().sort().each(function (d) {
      if (d) {
        select.append(`<option value="${d}">${d}</option>`);
      }
    });

    select.select2({
      placeholder: "Select " + title,
      dropdownParent: $('#budgetTable') // ensure it works in modals
    });

    select.val(null).trigger('change');
  });

  // Optional: focus first editable cell in the new row
  $('#budgetTable tbody tr:last td:eq(3)').trigger('click');
}, 100);
// Delay to ensure table redraws

  });
});

