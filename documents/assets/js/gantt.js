// Task Data
const ganttTasks = [
  {
      start: "2024-09-03",
      end: "2024-09-20",
      name: "Implement Energy Efficiency Measures",
      id: "Task 0",
      owner: "assets/images/user/usrbig10.jpg",
      progress: 20,
      budget: "$ 1000000",
      utillized: "$ 600000",
      balance: "$ 400000",
      custom_class: "initiatives-gantt-color",
    },
    {
      start: "2024-09-14",
      end: "2024-09-17",
      name: "Upgrade Lighting Systems to LED",
      id: "Task 1",
      owner: "assets/images/user/usrbig9.jpg",
      progress: 90,
      budget: "$ 5,00,000",
      utillized: "$ 2,00,000",
      balance: "$ 3,00,000",
      dependencies: "Task 0",
      custom_class: "subinitiatives-gantt-color",
    },
    {
      start: "2024-09-15",
      end: "2024-09-25",
      name: "Install Smart HVAC Systems",
      id: "Task 2",
      owner: "assets/images/user/usrbig8.jpg",
      progress: 100,
      budget: "$ 5,00,000",
      utillized: "$ 2,00,000",
      balance: "$ 3,00,000",
      dependencies: "Task 0",
      custom_class: "subinitiatives-gantt-color",
    },
    {
      start: "2024-09-23",
      end: "2024-09-25",
      name: "Conduct a comprehensive audit of all existing lighting systems across facilities to identify areas where upgrades are needed",
      id: "Task 5",
      owner: "assets/images/user/usrbig5.jpg",
      progress: 90,
      budget: "$ 5,00,000",
      utillized: "$ 2,00,000",
      balance: "$ 3,00,000",
      dependencies: "Task 2",
      custom_class: "activities-gantt-color",
    },
    {
      start: "2024-09-23",
      end: "2024-09-25",
      name: "test",
      id: "Task 6",
      owner: "assets/images/user/usrbig5.jpg",
      progress: 90,
      budget: "$ 5,00,000",
      utillized: "$ 2,00,000",
      balance: "$ 3,00,000",
      dependencies: "Task 5",
      custom_class: "subactivities-gantt-color",
    },
    {
      start: "2024-09-25",
      end: "2024-09-25",
      name: "Complete the lighting audit across all major venues",
      id: "Task 3",
      owner: "assets/images/user/usrbig7.jpg",
      progress: 55,
      budget: "$ 5,00,000",
      utillized: "$ 2,00,000",
      balance: "$ 3,00,000",
      dependencies: "Task 2",
      custom_class: "activities-gantt-color",
    },
    {
      start: "2024-09-25",
      end: "2024-09-25",
      name: "Finalize selection of LED suppliers and negotiate contracts",
      id: "Task 4",
      owner: "assets/images/user/usrbig6.jpg",
      progress: 75,
      budget: "$ 5,00,000",
      utillized: "$ 2,00,000",
      balance: "$ 3,00,000",
      dependencies: "Task 2",
      custom_class: "activities-gantt-color",
    },
];

// Initialize Gantt Chart
let gantt;

function renderGantt(containerId, viewMode = "Month") {
  const container = document.querySelector(containerId);

  // Clear the container before rendering
  container.innerHTML = "";

  // Create the Gantt chart
  gantt = new Gantt(containerId, ganttTasks, {
    header_height: 70,
    column_width: 100,
    step: 24,
    view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
    bar_height: 18,
    bar_corner_radius: 10,
    arrow_curve: 5,
    padding: 20,
    view_mode: viewMode,
    date_format: "MMM-DD",
    popup_trigger: "false",
    on_click: () => {},
  on_date_change: () => {},
  on_progress_change: () => {},
  
    on_view_change: function () {
      // Delay to wait for DOM render
      
    setTimeout(() => {
      const containerElement = document.querySelector(containerId);
      enforceMinBarWidth(containerId);

      // Disable bar dragging
      const bars = containerElement.querySelectorAll(".bar-group");
      bars.forEach(bar => {
        bar.addEventListener("mousedown", ganttstopEvent, true);
      });

      // Remove handle groups
      const handles = containerElement.querySelectorAll(".handle-group");
      handles.forEach(handle => handle.remove());

      // ✅ Format labels only in Month view
      
 
   
    if (viewMode === "Month") {
      formatMonthLabels(containerId);
     }
     if (viewMode === "Day") {
      formatDayLabels(containerId);
    }
    if (viewMode === "Week") {
      formatWeekLabels(containerId);
    }
    }, 10); // small delay to allow DOM render
  },
  });
}
function ganttstopEvent(e) {
  e.stopImmediatePropagation();
  e.preventDefault();
}
function formatMonthLabels(containerId) {
  const container = document.querySelector(containerId);
  const lowerTexts = container.querySelectorAll(".lower-text");
  const monthYLabels = container.querySelectorAll(".upper-text");

  // Shift month-year upper labels
  monthYLabels.forEach(label => {
    const currentY = parseFloat(label.getAttribute("y") || "0");
    label.setAttribute("y", currentY - 18);
  });

  // Loop through each label and infer correct year using gantt_start + index * month offset
  lowerTexts.forEach((label, index) => {
    const rawText = label.textContent.trim();
    const baseDate = new Date(gantt.gantt_start);
    const displayDate = new Date(baseDate.setMonth(baseDate.getMonth() + index));

    const month = displayDate.toLocaleDateString("en-US", { month: "short" });
    const year = displayDate.getFullYear();

    const x = label.getAttribute("x");
    const y = parseFloat(label.getAttribute("y") || "0");
    label.setAttribute("y", y - 15);
    label.setAttribute("text-anchor", "middle");

    label.innerHTML = `${month}<tspan x="${x}" dy="1.2em" class="gantt-month-year">${year}</tspan>`;
  });
}
function formatDayLabels(containerId) {
  const container = document.querySelector(containerId);
  const dayLabels = container.querySelectorAll(".lower-text");
  const dayMLabels = container.querySelectorAll(".upper-text");

  const ganttStart = new Date(gantt.gantt_start);
  let lastMonth = -1;
  let upperLabelIndex = 0;

  dayLabels.forEach((label, index) => {
    // Clone base date
    const labelDate = new Date(ganttStart);
    labelDate.setDate(labelDate.getDate() + index);

    const weekday = labelDate.toLocaleDateString("en-US", { weekday: "short" });
    const dateNum = labelDate.getDate();
    const x = label.getAttribute("x");
    const y = parseFloat(label.getAttribute("y") || "0");

    label.setAttribute("y", y - 18);
    label.setAttribute("text-anchor", "middle");
    label.innerHTML = `${weekday}<tspan x="${x}" dy="1.5em" class="gantt-day-date">${dateNum}</tspan>`;

    // Handle upper (month-year) labels correctly
    const month = labelDate.getMonth();
    const year = labelDate.getFullYear();

    if (month !== lastMonth && upperLabelIndex < dayMLabels.length) {
      const upperLabel = dayMLabels[upperLabelIndex];
      const yUpper = parseFloat(upperLabel.getAttribute("y") || "0");
      upperLabel.setAttribute("y", yUpper - 18);
      upperLabel.textContent = `${labelDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      })}`;

      lastMonth = month;
      upperLabelIndex++;
    }
  });
}
function formatWeekLabels(containerId) {
  const container = document.querySelector(containerId);
  const weekLabels = container.querySelectorAll(".lower-text");
  const svg = container.querySelector("svg");

  // Clear existing upper-text (month) labels
  const existingMonthLabels = container.querySelectorAll(".upper-text");
  existingMonthLabels.forEach(label => label.remove());

  let lastMonth = "";
  const baseDate = new Date(gantt.gantt_start);

  weekLabels.forEach((label, index) => {
    const weekDate = new Date(gantt.gantt_start);
    weekDate.setDate(baseDate.getDate() + index * 7);

    const weekday = weekDate.toLocaleDateString("en-US", { weekday: "short" });
    const dayMonth = weekDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short"
    });

    // Set new label format
    const x = label.getAttribute("x");
    const y = parseFloat(label.getAttribute("y") || "0");
    label.setAttribute("y", y - 15);
    label.setAttribute("text-anchor", "middle");
    label.innerHTML = `
      ${weekday}
      <tspan x="${x}" dy="1.2em" class="gantt-week-date">${dayMonth}</tspan>
    `;

    // Inject month header before the first week of the month
    const month = weekDate.toLocaleDateString("en-US", { month: "long" });
    const year = weekDate.getFullYear();
    const monthYear = `${month} ${year}`;

    if (monthYear !== lastMonth) {
      lastMonth = monthYear;

      const monthText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      monthText.setAttribute("x", x);
      monthText.setAttribute("y", y - 40);
      monthText.setAttribute("text-anchor", "middle");
      monthText.setAttribute("class", "gantt-month-label");
      monthText.textContent = monthYear;
      svg.appendChild(monthText);
    }
  });
}
function enforceMinBarWidth(containerId, minWidth = 100) {
const container = document.querySelector(containerId);
if (!container) return;

const bars = container.querySelectorAll(".bar-group");

bars.forEach((group, index) => {
  const bar = group.querySelector("rect.bar");
  const progress = group.querySelector("rect.bar-progress");
  const label = group.querySelector("text.bar-label");

  if (!bar) return;

  const originalWidth = parseFloat(bar.getAttribute("width") || "0");

  if (originalWidth < minWidth) {
    // Adjust bar width
    bar.setAttribute("width", minWidth);

    // Adjust bar-progress proportionally
    if (progress) {
      const progressWidth = parseFloat(progress.getAttribute("width") || "0");
      const ratio = progressWidth / originalWidth;
     // progress.setAttribute("width", ratio * minWidth);
     const progressValue = ganttTasks[index]?.progress || 0;
     let minProgressWidth = 0;
     if (progressValue > 0 && progressValue <= 20) {
       minProgressWidth = 20;
     } else if (progressValue > 20) {
       minProgressWidth = ratio * minWidth;
     }

      progress.setAttribute("width", Math.max(ratio * minWidth, minProgressWidth)); // min 2px visible

      console.log(progressWidth);
      console.log(ratio);
    }

    // Adjust label position to avoid overlap
    const x = parseFloat(bar.getAttribute("x") || "0");
    if (label) {
      label.setAttribute("x", x + minWidth + 5); // move right of min bar
    }
  }
});
}
// Initial render in the main container
renderGantt("#gantt");
document.querySelectorAll("#control-view button").forEach((button) => {
  button.addEventListener("click", function () {
    const mode = this.dataset.value;
    renderGantt("#ganttModalContainer", mode);
    // Highlight the active button
    document.querySelectorAll("#control-view button").forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

// Render Gantt in Modal
document.getElementById("chart_view_popup").addEventListener("shown.bs.modal", function () {
    renderGantt("#ganttModalContainer", gantt.view_mode);
  });
 function menuToggle() {
      const treeTable = document.getElementById("TreeTable");
      const frappeGantt = document.getElementById("FrappeGantt");
    
      // Toggle visibility of TreeTable
      const isTreeTableHidden = treeTable.hidden;
      treeTable.hidden = !isTreeTableHidden;
    
      // Adjust FrappeGantt width class
      frappeGantt.className = isTreeTableHidden ? "g-col-12 g-col-md-8" : "g-col-12 g-col-md-12";
      $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    }
    
    $(document).ready(function () {
      $('#ganttChartable').DataTable({
             "lengthChange": false,
             "paging": true,
             "pageLength": 5,
             "pagingType": "simple_numbers",
             "searching": false,
             "ordering": false,
             "info": false,
             "responsive": false,
             "scrollX": true,
             "language": {
               "paginate": {
                 "previous": "<i class='fas fa-arrow-left'></i>",
                 "next": "<i class='fas fa-arrow-right'></i>"
               }
             },
             "drawCallback": function () {
               $('.dataTables_paginate').addClass('d-flex justify-content-end');
             }
     
     
     
           });
         
           $('#chart_view_popup').on('shown.bs.modal', function () {
       $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
     });
     })