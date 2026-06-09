let jsonData1; // Global reference

$.ajax({
    url: "dataDrillData.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
        jsonData1 = data;

        // Render chart
       // bdcRenderType02(jsonData1);
       //initDateRangePicker("#bdc-dp-type-02");

    // ldcRenderType02(jsonData1);
cdcRenderType02(jsonData1);
        // Initialize tables
        initializeDrilldownTable("drilldownTable", jsonData1, "Monthly");
        initializeDrilldownTable("drilldownTableView", jsonData1, "Monthly");

         initializeDrilldownTable("drilldowncolumnTable", jsonData1, "Monthly");
         initializeDrilldownTable("line-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("area-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("multiaxis-dchartTable", jsonData1, "Monthly");

        // Listen for dropdown changes
        $(document).on("change", "#dataDrillType", function () {
            let selectedView = $(this).val();
            switchTableView(selectedView, "drilldownTableView", jsonData1);
        });
    },
    error: function (xhr, status, error) {
        console.error("Error loading data:", error);
    }
});

function bdcRenderType02(jsonData1) {
    try {
        const series = [];

        function traverse(node, namePath = []) {
            const currentNamePath = [node.name];

            if (node.data?.monthly) {
                const monthlyData = node.data.monthly;
                const dataPoints = Object.keys(monthlyData).map(month => {
                    const actualStr = monthlyData[month].actual.split(' ')[0];
                    const actualValue = parseFloat(actualStr) * 1000000;
                    return {
                        x: month.split(' ')[0],
                        y: actualValue,
                        z: 12,
                        entityId: node.id,
                        actualDisplay: monthlyData[month].actual,
                        targetDisplay: monthlyData[month].target,
                        gapDisplay: monthlyData[month].gap
                    };
                });

                series.push({
                    name: currentNamePath.join(" "),
                    data: dataPoints
                });
            }

            if (node.children && node.children.length) {
                node.children.forEach(child => traverse(child, currentNamePath));
            }
        }

        traverse(jsonData1[0]);

        if (series.length === 0) throw new Error("No entities with monthly data found");

        const options = {
            series: series,
            chart: {
                height: 340,
                type: "bubble",
                animations: { enabled: true },
                toolbar: { show: true }
            },
            dataLabels: { enabled: false },
            legend: {
                position: "bottom",
                horizontalAlign: "center"
            },
            fill: { opacity: 0.8 },
            xaxis: {
                tickAmount: 12,
                type: "category",
                title: {
                    text: "Month (2025)",
                    style: { fontSize: '12px' }
                }
            },
            yaxis: {
                title: {
                    text: "Value ($)",
                    style: { fontSize: '12px' }
                },
                labels: {
                    formatter: value => "$" + (value / 1000).toFixed(0) + "M"
                }
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const data = w.config.series[seriesIndex].data[dataPointIndex];
                    const seriesName = w.config.series[seriesIndex].name;
                    return `<div style="padding:6px;font-size:12px">
                     <strong>${seriesName}</strong><br>
                        <strong>${data.x} 2025</strong><br>
                        Actual: ${data.actualDisplay}<br>
                        Target: ${data.targetDisplay}<br>
                        Gap: ${data.gapDisplay}<br>
                    </div>`;
                }
            }
        };

        const chartElement = document.querySelector("#bdc-type-02");
        if (chartElement) {
            new ApexCharts(chartElement, options).render();
        } else {
            console.error("Chart container element not found");
        }
    } catch (error) {
        console.error("Error rendering bubble chart:", error);
    }
}

function cdcRenderType02(jsonData1) {
  try {
    const series = [];
    const categoriesSet = new Set();

    console.log(categoriesSet);

    function traverse(node) {
      const execName = node.name;
      const actualData = [];
      const targetData = [];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;

        Object.keys(monthlyData).forEach(month => {
          const label = `${month}`;
          categoriesSet.add(label);

          const actualVal = monthlyData[month].actual;
          const targetVal = monthlyData[month].target;

          actualData.push({
            x: label,
            y: actualVal,
            entityId: node.id,
            actualDisplay: monthlyData[month].actual,
            targetDisplay: monthlyData[month].target,
            gapDisplay: monthlyData[month].gap
          });

          targetData.push({
            x: label,
            y: targetVal,
            entityId: node.id,
            actualDisplay: monthlyData[month].actual,
            targetDisplay: monthlyData[month].target,
            gapDisplay: monthlyData[month].gap
          });
        });

        series.push({
          name: `${execName} Actual`,
          group: execName,
          data: actualData
        });

        series.push({
          name: `${execName} Target`,
          group: execName,
          data: targetData
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(jsonData1[0]);

    const options = {
      series: series,
      chart: {
        type: 'bar',
        height: 450,
        stacked: true,
        toolbar: { show: false },
        scrollBar: {
    enabled: true, // ✅ ApexCharts built-in scrollbar (vertical scroll)
  },
        zoom: {
    enabled: true,                // Enables zoom (mouse/touch drag)
    type: 'x',                    // Zoom on the X-axis only
    autoScaleYaxis: true          // Adjust Y-axis automatically after zoom
  }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          dataLabels: { position: 'top' }
        }
      },
      stroke: {
          width: 1,
          colors: ['#fff']
        },
        dataLabels: {
          enabled: false
        },
      xaxis: {
        categories: Array.from(categoriesSet),
        labels: {
          rotate: -45,
          style: {
            fontSize: '11px'
          }
        },
        
      },
      yaxis: {
        title: {
          text: 'Value ($)',
          style: { fontSize: '12px' }
        },
        labels: {
          //formatter: value => "$" + (value / 1000).toFixed(0) + "M"
          formatter: val => `$${val}M`
        }
      },
       tooltip: {
        
          y: {
            formatter: value => "$" + value + " M"
          }
        },
      
      colors: ['#008FFB', '#00E396'],
      fill: {
        opacity: 1
      }
    };

    const chartElement = document.querySelector("#cdc-type-02");
    if (chartElement) {
      new ApexCharts(chartElement, options).render();
    } else {
      console.error("Chart container element not found");
    }
  } catch (error) {
    console.error("Error rendering chart:", error);
  }
}




function ldcRenderType02(jsonData1) {
  try {
    const series = [];

    console.log(series)

    function traverse(node, namePath = []) {
      const currentNamePath = [node.name];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;
        const dataPoints = Object.keys(monthlyData).map(month => {
          const actualStr = monthlyData[month].actual.split(' ')[0];
          const actualValue = parseFloat(actualStr) * 1000000;
          return {
            x: month.split(' ')[0],
            y: actualValue,
            z: 20,
            entityId: node.id,
            actualDisplay: monthlyData[month].actual,
            targetDisplay: monthlyData[month].target,
            gapDisplay: monthlyData[month].gap
          };
        });

        series.push({
          name: currentNamePath.join(" "),
          //type: "column", // 👈 Add this to make it mixed type compatible
          data: dataPoints
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child, currentNamePath));
      }
    }

    traverse(jsonData1[0]);

    if (series.length === 0) throw new Error("No entities with monthly data found");

    const options = {
      series: series,
      
      chart: {
        height: 340,
        type: "line", 
        animations: { enabled: true },
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.5
          },
          
          
      },
      
     dataLabels: {
  enabled: false,
  formatter: function (val, { seriesIndex, dataPointIndex, w }) {
    const point = w.config.series[seriesIndex].data[dataPointIndex];
    return point.actualDisplay || val;  // fallback to val if missing
  },
  style: {
    fontSize: '12px',
    colors: ["#000"]  // label color
  },
  offsetY: -6
},
markers: {
  size: 6,            // Circle size
  colors: undefined,  // Use series color
  strokeColors: '#fff',
  strokeWidth: 2,
  shape: 'circle',
  hover: {
    size: 8,
    sizeOffset: 2
  }
},

     stroke: {
          curve: 'smooth'
        },
      legend: {
        position: "bottom",
        horizontalAlign: "center"
      },
      fill: { opacity: 0.8 },
      xaxis: {
        tickAmount: 12,
        type: "category",
        title: {
          text: "Month (2025)",
          style: { fontSize: '12px' }
        }
      },
      yaxis: {
        title: {
          text: "Value ($)",
          style: { fontSize: '12px' }
        },
        labels: {
          formatter: value => "$" + (value / 1000).toFixed(0) + "M"
        }
      },
        //        tooltip: {
        //          enabled: true,
            
        //  },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const data = w.config.series[seriesIndex].data[dataPointIndex];
          const seriesName = w.config.series[seriesIndex].name;
          console.log(data);
          return `<div style="padding:6px;font-size:12px">
            <strong>${seriesName}</strong><br>
            <strong>${data.x} 2025</strong><br>
            Actual: ${data.actualDisplay}<br>
            Target: ${data.targetDisplay}<br>
            Gap: ${data.gapDisplay}
          </div>`;
        }
      }
    };

    const chartElement = document.querySelector("#ldc-type-02");
    if (chartElement) {
      new ApexCharts(chartElement, options).render();
    } else {
      console.error("Chart container element not found");
    }
  } catch (error) {
    console.error("Error rendering chart:", error);
  }
}

function adcRenderType02(jsonData1) {
  try {
    const series = [];

    console.log(series)

    function traverse(node, namePath = []) {
      const currentNamePath = [node.name];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;
        const dataPoints = Object.keys(monthlyData).map(month => {
          const actualStr = monthlyData[month].actual.split(' ')[0];
          const actualValue = parseFloat(actualStr) * 1000000;
          return {
            x: month.split(' ')[0],
            y: actualValue,
            z: 20,
            entityId: node.id,
            actualDisplay: monthlyData[month].actual,
            targetDisplay: monthlyData[month].target,
            gapDisplay: monthlyData[month].gap
          };
        });

        series.push({
          name: currentNamePath.join(" "),
          //type: "column", // 👈 Add this to make it mixed type compatible
          data: dataPoints
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child, currentNamePath));
      }
    }

    traverse(jsonData1[0]);

    if (series.length === 0) throw new Error("No entities with monthly data found");

    const options = {
      series: series,
      
      chart: {
        height: 340,
        type: "area", 
        animations: { enabled: true },
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.5
          },
          
          
      },
      
     dataLabels: {
  enabled: false,
  formatter: function (val, { seriesIndex, dataPointIndex, w }) {
    const point = w.config.series[seriesIndex].data[dataPointIndex];
    return point.actualDisplay || val;  // fallback to val if missing
  },
  style: {
    fontSize: '12px',
    colors: ["#000"]  // label color
  },
  offsetY: -6
},
markers: {
  size: 6,            // Circle size
  colors: undefined,  // Use series color
  strokeColors: '#fff',
  strokeWidth: 2,
  shape: 'circle',
  hover: {
    size: 8,
    sizeOffset: 2
  }
},

     stroke: {
          curve: 'smooth'
        },
      legend: {
        position: "bottom",
        horizontalAlign: "center"
      },
      fill: { opacity: 0.8 },
      xaxis: {
        tickAmount: 12,
        type: "category",
        title: {
          text: "Month (2025)",
          style: { fontSize: '12px' }
        }
      },
      yaxis: {
        title: {
          text: "Value ($)",
          style: { fontSize: '12px' }
        },
        labels: {
          formatter: value => "$" + (value / 1000).toFixed(0) + "M"
        }
      },
        //        tooltip: {
        //          enabled: true,
            
        //  },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const data = w.config.series[seriesIndex].data[dataPointIndex];
          const seriesName = w.config.series[seriesIndex].name;
          console.log(data);
          return `<div style="padding:6px;font-size:12px">
            <strong>${seriesName}</strong><br>
            <strong>${data.x} 2025</strong><br>
            Actual: ${data.actualDisplay}<br>
            Target: ${data.targetDisplay}<br>
            Gap: ${data.gapDisplay}
          </div>`;
        }
      }
    };

    const chartElement = document.querySelector("#adc-type-02");
    if (chartElement) {
      new ApexCharts(chartElement, options).render();
    } else {
      console.error("Chart container element not found");
    }
  } catch (error) {
    console.error("Error rendering chart:", error);
  }
}


const headers = {
    "Monthly": `<tr>
        <th rowspan="2" class="align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2" class="text-center text-nowrap align-middle">Name/Period</th>
        ${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
            .map((month, index) => {
                let colors = ["#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a", "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"];
                return `<th colspan="3" class="text-center" style="background-color:${colors[index]};">${month} 2025</th>`;
            }).join("")}
    </tr>
    <tr>
        ${["#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a", "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"]
            .map(color => `
            <th class="text-center" style="background-color:${color};">Actual</th>
            <th class="text-center" style="background-color:${color};">Target</th>
            <th class="text-center" style="background-color:${color};">Gap</th>`).join("")}
    </tr>`,
    "Quarterly": `<tr>
        <th rowspan="2"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2">Name/Period</th>
        ${["Q1", "Q2", "Q3", "Q4"].map((qtr, index) => {
            let colors = ["#FFD700", "#90EE90", "#87CEFA", "#FFB6C1"];
            return `<th colspan="3" class="text-center" style="background-color:${colors[index]};">${qtr} 2025</th>`;
        }).join("")}
    </tr>
    <tr>
        ${["#FFD700", "#90EE90", "#87CEFA", "#FFB6C1"].map(color =>
            `<th style="background-color:${color};">Actual</th>
             <th style="background-color:${color};">Target</th>
             <th style="background-color:${color};">Gap</th>`).join("")}
    </tr>`,
    "Half Yearly": `<tr>
        <th rowspan="2"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2">Name/Period</th>
        ${["H1", "H2"].map((h, index) => {
            let colors = ["#FFA07A", "#20B2AA"];
            return `<th colspan="3" class="text-center" style="background-color:${colors[index]};">${h} 2025</th>`;
        }).join("")}
    </tr>
    <tr>
        ${["#FFA07A", "#20B2AA"].map(color =>
            `<th style="background-color:${color};">Actual</th>
             <th style="background-color:${color};">Target</th>
             <th style="background-color:${color};">Gap</th>`).join("")}
    </tr>`,
    "Annually": `<tr>
        <th rowspan="2"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2">Name/Period</th>
        <th colspan="3" class="text-center" style="background-color:#9370DB; color:#FFFFFF;">2025</th>
    </tr>
    <tr>
        <th style="background-color:#9370DB; color:#FFFFFF;">Actual</th>
        <th style="background-color:#9370DB; color:#FFFFFF;">Target</th>
        <th style="background-color:#9370DB; color:#FFFFFF;">Gap</th>
    </tr>`
};

function loadDrilldownTable(data, tableId, parentId = null, level = 0, view = "") {
    let tbody = $(`#${tableId} tbody`);
    data.forEach(item => {
        let rowId = `row-${tableId}-${item.id}`;
        let parentClass = parentId ? `child-row parent-${tableId}-${parentId}` : "";
        let toggleIcon = item.children ? `<i class="fas fa-plus toggle-icon" data-id="${item.id}" data-table="${tableId}" style="cursor: pointer;"></i>` : "";

        let row = `<tr id="${rowId}" class="${parentClass}" ${parentId ? 'style="display: none;"' : ""}>
            <td class="text-center">${toggleIcon}</td>
            <td><div class="d-flex justify-content-between gap-2"><span style="min-width:180px">${item.name}</span></div></td>`;

        let periods = {
            "Monthly": ["JAN 2025", "FEB 2025", "MAR 2025", "APR 2025", "MAY 2025", "JUN 2025", "JUL 2025", "AUG 2025", "SEP 2025", "OCT 2025", "NOV 2025", "DEC 2025"],
            "Quarterly": ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"],
            "Half Yearly": ["H1 2025", "H2 2025"],
            "Annually": ["2025"]
        };

        periods[view].forEach(period => {
            if (item.data[view.toLowerCase()] && item.data[view.toLowerCase()][period]) {
                let periodData = item.data[view.toLowerCase()][period];
                row += `<td class="text-end text-nowrap">${periodData.currency} ${periodData.actual}</td>
                        <td class="text-end text-nowrap">${periodData.currency} ${periodData.target}</td>
                        <td class="text-end text-nowrap">${periodData.currency} ${periodData.gap}</td>`;
            } else {
                row += `<td>-</td><td>-</td><td>-</td>`;
            }
        });

        row += `</tr>`;
        tbody.append(row);

        if (item.children) {
            loadDrilldownTable(item.children, tableId, item.id, level + 1, view);
        }
    });
}

function initializeDrilldownTable(tableId, jsonData1, view) {
    $(`#${tableId} thead`).html(headers[view]);
    $(`#${tableId} tbody`).empty();
    loadDrilldownTable(jsonData1, tableId, null, 0, view);

    if ($.fn.DataTable.isDataTable(`#${tableId}`)) {
        $(`#${tableId}`).DataTable().destroy();
    }

    $(`#${tableId}`).DataTable({
        "paging": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "responsive": true,
        "scrollX": true,
        "scrollY": '278px',
    });
}

function switchTableView(view, tableId, jsonData1) {
    let table = $(`#${tableId}`);
    if ($.fn.DataTable.isDataTable(table)) {
        table.DataTable().destroy();
        table.find("thead").empty();
        table.find("tbody").empty();
    }
    initializeDrilldownTable(tableId, jsonData1, view);
}

$(document).on("click", ".toggle-icon", function () {
    let id = $(this).data("id");
    let tableId = $(this).data("table");
    let isExpanded = $(this).hasClass("fa-minus");

    if (isExpanded) {
        hideChildren(tableId, id);
    } else {
        $(`.parent-${tableId}-${id}`).show();
    }

    $(this).toggleClass("fa-plus fa-minus");
});

function hideChildren(tableId, parentId) {
    $(`.parent-${tableId}-${parentId}`).each(function () {
        let childId = $(this).attr("id").split("-").pop();
        $(this).hide();
        hideChildren(tableId, childId);
        $(`.toggle-icon[data-id="${childId}"][data-table="${tableId}"]`).removeClass("fa-minus").addClass("fa-plus");
    });
}