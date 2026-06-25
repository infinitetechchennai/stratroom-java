// Define colors
var colors = {
    "critical": "#ca0101",
    "bad": "#FF6E00",
    "medium": "#FFFF00",
    "good": "#5dbe24",
    "verygood": "#0b7d03"
};
var inherent = [{
    "y": "Tidak Signifikan",
    "x": "Hampir Tidak \nPernah Terjadi",
    "color": colors.verygood,
    "likelihood": 6,
    "impact": 1,
    "status": "A1",
    "value": 1,
    "name": "A1"
}, {
    "y": "Ringan",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 2,
    "color": colors.verygood,
    "status": "A2",
    "value": 2
}, {
    "y": "Moderat",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 3,
    "color": colors.verygood,
    "status": "A3",
    "value": 3,
}, {
    "y": "Berat",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 4,
    "color": colors.bad,
    "status": "A4",
    "value": 4
}, {
    "y": "Fatal",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 5,
    "color": colors.critical,
    "status": "A5",
    "value": 5
},

{
    "y": "Tidak Signifikan",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 1,
    "color": colors.verygood,
    "status": "B1",
    "value": 2
}, {
    "y": "Ringan",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 2,
    "color": colors.verygood,
    "status": "B2",
    "value": 4
}, {
    "y": "Moderat",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 3,
    "color": colors.medium,
    "status": "B3",
    "value": 6
}, {
    "y": "Berat",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 4,
    "color": colors.bad,
    "status": "B4",
    "value": 8
}, {
    "y": "Fatal",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 5,
    "color": colors.critical,
    "status": "B5",
    "value": 10
}, {
    "y": "Tidak Signifikan",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 1,
    "color": colors.medium,
    "status": "C1",
    "value": 3
}, {
    "y": "Ringan",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 2,
    "color": colors.medium,
    "status": "C2",
    "value": 6
}, {
    "y": "Moderat",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 3,
    "color": colors.bad,
    "status": "C3",
    "value": 9
}, {
    "y": "Berat",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 4,
    "color": colors.bad,
    "status": "C4",
    "value": 12
}, {
    "y": "Fatal",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 5,
    "color": colors.critical,
    "status": "C5",
    "value": 15
}, {
    "y": "Tidak Signifikan",
    "x": "Sering",
    "likelihood": 9,
    "impact": 1,
    "color": colors.bad,
    "status": "D1",
    "value": 4
}, {
    "y": "Ringan",
    "x": "Sering",
    "likelihood": 9,
    "impact": 2,
    "color": colors.bad,
    "status": "D2",
    "value": 8
}, {
    "y": "Moderat",
    "x": "Sering",
    "likelihood": 9,
    "impact": 3,
    "color": colors.bad,
    "status": "D3",
    "value": 12
}, {
    "y": "Berat",
    "x": "Sering",
    "likelihood": 9,
    "impact": 4,
    "color": colors.critical,
    "status": "D4",
    "value": 16
}, {
    "y": "Fatal",
    "x": "Sering",
    "likelihood": 9,
    "impact": 5,
    "color": colors.critical,
    "status": "D5",
    "value": 20
}, {
    "y": "Tidak Signifikan",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 1,
    "color": colors.bad,
    "status": "E1",
    "value": 5
}, {
    "y": "Ringan",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 2,
    "color": colors.critical,
    "status": "E2",
    "value": 10
}, {
    "y": "Moderat",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 3,
    "color": colors.critical,
    "status": "E3",
    "value": 15
}, {
    "y": "Berat",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 4,
    "color": colors.critical,
    "status": "E4",
    "value": 20
}, {
    "y": "Fatal",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 5,
    "color": colors.critical,
    "status": "E5",
    "value": 25
}
];
var residual = [{
    "y": "Tidak Signifikan",
    "x": "Hampir Tidak \nPernah Terjadi",
    "color": colors.verygood,
    "likelihood": 6,
    "impact": 1,
    "status": "A1",
    "value": 1,
    "name": "A1"
}, {
    "y": "Ringan",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 2,
    "color": colors.verygood,
    "status": "A2",
    "value": 2
}, {
    "y": "Moderat",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 3,
    "color": colors.verygood,
    "status": "A3",
    "value": 3,
}, {
    "y": "Berat",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 4,
    "color": colors.bad,
    "status": "A4",
    "value": 4
}, {
    "y": "Fatal",
    "x": "Hampir Tidak \nPernah Terjadi",
    "likelihood": 6,
    "impact": 5,
    "color": colors.critical,
    "status": "A5",
    "value": 5
},

{
    "y": "Tidak Signifikan",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 1,
    "color": colors.verygood,
    "status": "B1",
    "value": 2
}, {
    "y": "Ringan",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 2,
    "color": colors.verygood,
    "status": "B2",
    "value": 4
}, {
    "y": "Moderat",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 3,
    "color": colors.medium,
    "status": "B3",
    "value": 6
}, {
    "y": "Berat",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 4,
    "color": colors.bad,
    "status": "B4",
    "value": 8
}, {
    "y": "Fatal",
    "x": "Sangat Jarang",
    "likelihood": 7,
    "impact": 5,
    "color": colors.critical,
    "status": "B5",
    "value": 10
}, {
    "y": "Tidak Signifikan",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 1,
    "color": colors.medium,
    "status": "C1",
    "value": 3
}, {
    "y": "Ringan",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 2,
    "color": colors.medium,
    "status": "C2",
    "value": 6
}, {
    "y": "Moderat",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 3,
    "color": colors.bad,
    "status": "C3",
    "value": 9
}, {
    "y": "Berat",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 4,
    "color": colors.bad,
    "status": "C4",
    "value": 12
}, {
    "y": "Fatal",
    "x": "Jarang",
    "likelihood": 8,
    "impact": 5,
    "color": colors.critical,
    "status": "C5",
    "value": 15
}, {
    "y": "Tidak Signifikan",
    "x": "Sering",
    "likelihood": 9,
    "impact": 1,
    "color": colors.bad,
    "status": "D1",
    "value": 4
}, {
    "y": "Ringan",
    "x": "Sering",
    "likelihood": 9,
    "impact": 2,
    "color": colors.bad,
    "status": "D2",
    "value": 8
}, {
    "y": "Moderat",
    "x": "Sering",
    "likelihood": 9,
    "impact": 3,
    "color": colors.bad,
    "status": "D3",
    "value": 12
}, {
    "y": "Berat",
    "x": "Sering",
    "likelihood": 9,
    "impact": 4,
    "color": colors.critical,
    "status": "D4",
    "value": 16
}, {
    "y": "Fatal",
    "x": "Sering",
    "likelihood": 9,
    "impact": 5,
    "color": colors.critical,
    "status": "D5",
    "value": 20
}, {
    "y": "Tidak Signifikan",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 1,
    "color": colors.bad,
    "status": "E1",
    "value": 5
}, {
    "y": "Ringan",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 2,
    "color": colors.critical,
    "status": "E2",
    "value": 10
}, {
    "y": "Moderat",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 3,
    "color": colors.critical,
    "status": "E3",
    "value": 15
}, {
    "y": "Berat",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 4,
    "color": colors.critical,
    "status": "E4",
    "value": 20
}, {
    "y": "Fatal",
    "x": "Sangat Sering",
    "likelihood": 10,
    "impact": 5,
    "color": colors.critical,
    "status": "E5",
    "value": 25
}
];

var populateInherentTable = [
    {
        impactName: "Loss of revenue, lower facility utilization rate",
        category: "Operational",
        type: "Consequence",
        impactValue: 3,
        likelihoodValue: "B",
        riskScore: "B3"
    }
];

var populateResidualTable = [
    {
        impactName: "Increased maintenance cost",
        category: "Financial",
        type: "Consequence",
        impactValue: 4,
        likelihoodValue: "A",
        riskScore: "A1"
    }
];

// Initialize the chart
let activeRiskChartData = inherent;
let aciveCardtableheat = populateInherentTable;
let riskChart;
const heatmapToggle = document.querySelector('#heatmapToggle');
const heatmapChart = document.querySelector('#heatmapChart');
const heatmapChartLarge = document.querySelector('#heatmapChartLarge');
const heatmapTable = document.querySelector('#heatmapTable');
const heatmapTableLarge = document.querySelector('#heatmapTableLarge');

const theme = localStorage.getItem("theme") || "light";
const isDarkTheme = theme === "dark";

const labelColor = isDarkTheme ? am4core.color("#fff") : am4core.color("#000");


function renderRiskChart(containerId, chartData, populateTableData) {
    const container = document.querySelector(containerId);
    if (!container) return;
    am4core.useTheme(am4themes_animated);
    riskChart = am4core.create(container, am4charts.XYChart);

    // Map additional data for comparison
    chartData.forEach(dataPoint => {

        // Compare `dataPoint.status` with `populateTableData.riskScore`
        const matchedEntry = populateTableData.find(entry => entry.riskScore === dataPoint.status);

        if (matchedEntry) {
            dataPoint.showLabel = true; // Add a flag to show the bullet label
            dataPoint.additionalInfo = matchedEntry.riskScore; // Pass additional data
        } else {
            dataPoint.showLabel = false; // Hide bullet label if no match
        }
    });

    // Assign the data to the chart
    riskChart.data = chartData;

    // Configure the axes
    var xAxis = riskChart.xAxes.push(new am4charts.CategoryAxis());
    var yAxis = riskChart.yAxes.push(new am4charts.CategoryAxis());
    var series = riskChart.series.push(new am4charts.ColumnSeries());
    xAxis.dataFields.category = "y";
    yAxis.dataFields.category = "x";

    xAxis.renderer.labels.template.fill = labelColor;
    yAxis.renderer.labels.template.fill = labelColor;


    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.minGridDistance = 30;

    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = false;
    yAxis.renderer.minGridDistance = 30;

    // Configure the series
    // var series = riskChart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "y";
    series.dataFields.categoryY = "x";
    series.dataFields.value = "value";
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 0;

    // Configure column appearance
    var column = series.columns.template;
    column.strokeWidth = 2;
    column.strokeOpacity = 1;
    column.stroke = am4core.color("#000");
    column.tooltipText = "{status}";
    column.width = am4core.percent(100);
    column.height = am4core.percent(100);
    column.column.cornerRadius(6, 6, 6, 6);
    column.propertyFields.fill = "color";

    // Configure bullet appearance
    var bullet2 = series.bullets.push(new am4charts.LabelBullet());
    bullet2.label.text = "{status}";
    bullet2.label.fontSize = 11;
    bullet2.label.fontWeight = "bold";
    bullet2.label.strokeWidth = 0;
    bullet2.label.fill = am4core.color("#000");
    bullet2.interactionsEnabled = false;
    bullet2.zIndex = 10;
    // Conditionally display bullet label if a match is found
    bullet2.propertyFields.hidden = "showLabel"; // Use the showLabel flag
    bullet2.label.text = "{additionalInfo}"; // Show additional data if available

    // Handle contrast automatically
    // bullet2.label.adapter.add("fill", function(fill, target) {
    //   const color = am4core.color(target.dataItem.dataContext.color);
    //   const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
    //   return luminance > 0.6 ? am4core.color("#000") : am4core.color("#fff");
    // });
}


// Render the initial chart
renderRiskChart('#heatmapChart', activeRiskChartData, aciveCardtableheat);


function renderCardtableheat(containertableId, tableData) {
    //const containerTable = document.querySelector(containerId);

    const inherentTableBody = document.querySelector(`${containertableId} tbody`);
    if (!inherentTableBody) return;
    inherentTableBody.innerHTML = ""; // Clear existing rows

    tableData.forEach(row => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${row.impactName}</td>
            <td>${row.category}</td>
            <td>${row.type}</td>
            <td>${row.impactValue}</td>
            <td>${row.likelihoodValue}</td>
            <td>${row.riskScore}</td>
        `;
        inherentTableBody.appendChild(tableRow);
    });
    // Important: init after data is appended

}


renderCardtableheat('#inherentTable', aciveCardtableheat);

// Event delegation for dynamically rendered elements
document.body.addEventListener('change', function(event) {
    // Handle heatmapToggle
    if (event.target.id === 'heatmapToggle') {
        const hChart = document.querySelector('#heatmapChart');
        const hTable = document.querySelector('#heatmapTable');
        const hChartLarge = document.querySelector('#heatmapChartLarge');
        const hTableLarge = document.querySelector('#heatmapTableLarge');
        
        if (event.target.checked) {
            if(hChart) hChart.style.display = "none";
            if(hTable) hTable.style.display = "block";
            if(hChartLarge) hChartLarge.style.display = "none";
            if(hTableLarge) hTableLarge.style.display = "block";
            if($('#inherentTable').length && $.fn.DataTable.isDataTable('#inherentTable')) $('#inherentTable').DataTable().columns.adjust().draw();
            if($('#inherentTableLarge').length && $.fn.DataTable.isDataTable('#inherentTableLarge')) $('#inherentTableLarge').DataTable().columns.adjust().draw();
        } else {
            if(hChart) hChart.style.display = "block";
            if(hTable) hTable.style.display = "none";
            if(hChartLarge) hChartLarge.style.display = "block";
            if(hTableLarge) hTableLarge.style.display = "none";
        }
    }

    // Handle heatmapselection
    if (event.target.id === 'heatmapselection') {
        const riskChartMode = event.target.value;
        if (riskChart) {
            riskChart.dispose();
        }

        if (riskChartMode === "inherent") {
            activeRiskChartData = inherent;
            aciveCardtableheat = populateInherentTable;
        } else if (riskChartMode === "residual") {
            activeRiskChartData = residual;
            aciveCardtableheat = populateResidualTable;
        } else {
            activeRiskChartData = inherent;
            aciveCardtableheat = populateInherentTable;
        }
        
        const hChart = document.querySelector('#heatmapChart');
        if (hChart) {
            renderRiskChart('#heatmapChart', activeRiskChartData, aciveCardtableheat);
            renderCardtableheat('#inherentTable', aciveCardtableheat);
        }
        
        const hChartLarge = document.querySelector('#heatmapChartLarge');
        if (hChartLarge) {
            renderRiskChart('#heatmapChartLarge', activeRiskChartData, aciveCardtableheat);
            renderCardtableheat('#inherentTableLarge', aciveCardtableheat);
        }
    }
});
const heatmapViewModal = document.getElementById("heatmapViewModal");

if (heatmapViewModal) {
    heatmapViewModal.addEventListener("shown.bs.modal", function () {

        if ($.fn.DataTable.isDataTable('#inherentTableLarge')) {
            $('#inherentTableLarge').DataTable().destroy();
        }
        renderCardtableheat('#inherentTableLarge', aciveCardtableheat);
        setTimeout(function () {
            renderRiskChart("#heatmapChartLarge", activeRiskChartData, aciveCardtableheat);
        }, 100); // Slight delay ensures DOM is ready
    });
}

// Initialize DataTable
function initializeDataTable(tableId) {
    const table = $('#' + tableId);
    if ($.fn.DataTable.isDataTable(table)) {
        table.DataTable().clear().destroy(); // Properly destroy it before reinitializing
    }
    table.DataTable({
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
            $('.dataTables_paginate').addClass('d-flex justify-content-end');
        }
    });
}
// initializeDataTable('inherentTable');







