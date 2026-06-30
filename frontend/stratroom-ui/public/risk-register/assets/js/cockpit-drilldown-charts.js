let jsonData1; // Global reference
let jsonData2; 

$.ajax({
    url: "dataDrillData.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
        jsonData1 = data;
        // Initialize tables
        initializeDrilldownTable("drilldownTable", jsonData1, "Monthly");
        initializeDrilldownTable("drilldownTableView", jsonData1, "Monthly");

         initializeDrilldownTable("drilldowncolumnTable", jsonData1, "Monthly");
         initializeDrilldownTable("line-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("area-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("multiaxis-dchartTable", jsonData1, "Monthly");

         initializeDrilldownTable("bubble-02-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("column-02-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("line-02-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("area-02-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("pie-02-dchartTable", jsonData1, "Monthly");
         initializeDrilldownTable("multiaxis-02-dchartTable", jsonData1, "Monthly");
         
         initializeDrilldownTable("stacked-02-dchartTable", jsonData1, "Monthly");
        initializeDrilldownTable("radialMulti-02-dchartTable", jsonData1, "Monthly");
        // Listen for dropdown changes
        $(document).on("change", "#dataDrillType", function () {
            let selectedView = $(this).val();
            console.log(selectedView);
            switchDrilldownTableView(selectedView, "drilldownTableView", jsonData1);
        });
    },
    error: function (xhr, status, error) {
        console.error("Error loading data:", error);
    }
});

$.ajax({
    url: "dataKpiDrillData.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
        jsonData2 = data;

      //  initializeKpiDrilldownTable("kpidrilldownTable", jsonData2, "Monthly");
      //  initializeKpiDrilldownTable("kpidrilldownTable", jsonData2, "Quarterly");
      //  initializeKpiDrilldownTable("kpidrilldownTable", jsonData2, "Half Yearly");
      initializeKpiDrilldownTable("kpidrilldownTable", jsonData2, "Annually");
       initializeKpiDrilldownTable("kpidrilldownTableView", jsonData2, "Monthly");
      
        // Listen for dropdown changes
        $(document).on("change", "#dataKpiDrillType", function () {
            let selectedkpiView = $(this).val();
            switchKpiDrilldownTableView(selectedkpiView, "kpidrilldownTableView", jsonData2);
        });
    },
    error: function (xhr, status, error) {
        console.error("Error loading data:", error);
    }
});


//Drilld- Drilldown Chart
function bdcRenderType02(jsonData1) {
  try {
    const bdcExecNames = new Set();
    const bdcExecDataMap = new Map();

    function traverse(node) {
      const bdcExecName = node.name;
      bdcExecNames.add(bdcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, z: 10, bdcExecName });
          targetData.push({ x: month, y: target, z: 8, bdcExecName });
          gapData.push({ x: month, y: gap, z: 4, bdcExecName });
        });

        bdcExecDataMap.set(bdcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("bdcExecSelect");
    select.innerHTML = "";
    bdcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = bdcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
        chart: {
          height: 340,
          type: "bubble",
          animations: { enabled: true },
          toolbar: { show: false }
        },
        dataLabels: { enabled: false },
        fill: { opacity: 0.8 },
        xaxis: {
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const execName = point.execName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${execName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const chartEl = document.querySelector("#bdc-type-02");
      chartEl.innerHTML = ""; // Clear previous chart

      new ApexCharts(chartEl, options).render();
    }

    // Render chart with first exec by default
    const firstExec = Array.from(bdcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // On change event
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering bubble chart:", err);
  }
}
function cdcRenderType02(jsonData1) {
  try {
    const cdcAllExecNames = new Set();
    const execDataMap = new Map();
    const categoriesSet = new Set();

    function traverse(node) {
      const cdcExecName = node.name;
      cdcAllExecNames.add(cdcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;

        Object.keys(monthlyData).forEach(month => {
          const label = `${month}`;
          categoriesSet.add(label);

          const actual = monthlyData[month].actual;
          const target = monthlyData[month].target;
          const gap = monthlyData[month].gap;

          actualData.push({ x: label, y: actual, cdcExecName});
          targetData.push({ x: label, y: target,cdcExecName });
          gapData.push({ x: label, y: gap,cdcExecName });
        });

        execDataMap.set(cdcExecName, {
          actualData,
          targetData,
          gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(jsonData1[0]);

    // Populate dropdown
    const select = document.getElementById("cdcExecSelect");
    cdcAllExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    // Render Chart
    function renderChart(selectedExec) {
      let series = [];

      if (selectedExec === "All") {
        // Only show one executive at a time
        series = [];
      } else {
        const data = execDataMap.get(selectedExec);
        if (data) {
          series = [
            { name: "Actual", data: data.actualData },
            { name: "Target", data: data.targetData },
            { name: "Gap", data: data.gapData }
          ];
        }
      }

      const options = {
        series: series,
        chart: {
          type: 'bar',
          height: 340,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%'
          }
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
          categories: Array.from(categoriesSet),
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: 'Value ($)' },
          labels: { formatter: val => `$${val}M` }
        },
        // tooltip: {
        //   y: { formatter: val => `$${val} M` }
        // },
        tooltip: {
  custom: function({ series, seriesIndex, dataPointIndex, w }) {
    const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
    const month = point.x || 'N/A';
    const cdcExecName = point.cdcExecName || 'N/A';
    const value = point.y ?? '';
    const label = w.globals.seriesNames[seriesIndex];

    return `
      <div style="padding: 8px; font-size: 13px;">
        <strong>${month}</strong><br/>
        ${cdcExecName}<br/>
        ${label}: <b>$${value} M</b>
      </div>
    `;
  }
},

        colors: ['#008FFB', '#00E396', '#FF4560'],
        fill: { opacity: 1 }
      };

      const chartEl = document.querySelector("#cdc-type-02");
      chartEl.innerHTML = ""; // Clear existing chart

      new ApexCharts(chartEl, options).render();
    }

  
    const firstExec = Array.from(cdcAllExecNames)[0];
document.getElementById("cdcExecSelect").value = firstExec;
renderChart(firstExec);

    // Dropdown listener
    select.addEventListener("change", (e) => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Chart render error", err);
  }
}
function ldcRenderType02(jsonData1) {
  try {
    const ldcExecNames = new Set();
    const ldcExecDataMap = new Map();

    function traverse(node) {
      const ldcExecName = node.name;
      ldcExecNames.add(ldcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, ldcExecName });
          targetData.push({ x: month, y: target, ldcExecName });
          gapData.push({ x: month, y: gap, ldcExecName });
        });

        ldcExecDataMap.set(ldcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("ldcExecSelect");
    select.innerHTML = "";
    ldcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = ldcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
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
          toolbar: { show: false }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        dataLabels: { enabled: false },
        markers: {
          size: 5,
          hover: { sizeOffset: 3 }
        },
        xaxis: {
          type: 'category',
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
          shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const ldcExecName = point.ldcExecName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${ldcExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const chartEl = document.querySelector("#ldc-type-02");
      chartEl.innerHTML = "";
      new ApexCharts(chartEl, options).render();
    }

    // Initial load with first executive
    const firstExec = Array.from(ldcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // Dropdown change listener
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering line chart:", err);
  }
}
function adcRenderType02(jsonData1) {
  try {
    const adcExecNames = new Set();
    const adcExecDataMap = new Map();

    function traverse(node) {
      const adcExecName = node.name;
      adcExecNames.add(adcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, adcExecName });
          targetData.push({ x: month, y: target, adcExecName });
          gapData.push({ x: month, y: gap, adcExecName });
        });

        adcExecDataMap.set(adcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("adcExecSelect");
    select.innerHTML = "";
    adcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = adcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
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
          toolbar: { show: false }
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        dataLabels: { enabled: false },
        markers: {
          size: 5,
          hover: { sizeOffset: 3 }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          type: 'category',
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
           shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const adcExecName = point.adcExecName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${adcExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const chartEl = document.querySelector("#adc-type-02");
      chartEl.innerHTML = "";
      new ApexCharts(chartEl, options).render();
    }

    // Initial chart load
    const firstExec = Array.from(adcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // Dropdown event listener
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering area chart:", err);
  }
}
function mdcRenderType02(jsonData1) {
  try {
    const mdcExecNames = new Set();
    const mdcExecDataMap = new Map();

    function traverse(node) {
      const mdcExecName = node.name;
      mdcExecNames.add(mdcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, mdcExecName });
          targetData.push({ x: month, y: target, mdcExecName });
          gapData.push({ x: month, y: gap, mdcExecName });
        });

        mdcExecDataMap.set(mdcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("mdcExecSelect");
    select.innerHTML = "";
    mdcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = mdcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        {
          name: "Actual",
          type: "column",
          data: data.actualData
        },
        {
          name: "Target",
          type: "column",
          data: data.targetData
        },
        {
          name: "Gap",
          type: "line",
          data: data.gapData
        }
      ];

      const categories = data.actualData.map(d => d.x);

      const options = {
        series,
        chart: {
          height: 340,
          type: "line",
          stacked: false,
          toolbar: { show: false }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2, 2, 3],
          curve: 'smooth'
        },
        xaxis: {
          categories,
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: {
            text: "Value ($M)",
            style: { fontSize: '13px' }
          },
          labels: {
            formatter: val => `$${val}`
          }
        },
        tooltip: {
           shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point?.x || 'N/A';
            const mdcExecName = point?.mdcExecName || 'N/A';
            const label = w.globals.seriesNames[seriesIndex];
            const value = point?.y;

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${mdcExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        markers: {
  size: 5,
  hover: { sizeOffset: 4 }
},
        colors: ['#008FFB', '#00E396', '#FEB019'],
        
      };

      const chartEl = document.querySelector("#mdc-type-02");
      chartEl.innerHTML = "";
      new ApexCharts(chartEl, options).render();
    }

    // Initial chart render
    const firstExec = Array.from(mdcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering chart:", err);
  }
}

//Drilld - Chart

function bubbleRenderType02(jsonData1) {
  try {
    const bdcExecNames = new Set();
    const bdcExecDataMap = new Map();

    function traverse(node) {
      const bdcExecName = node.name;
      bdcExecNames.add(bdcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, z: 10, bdcExecName });
          targetData.push({ x: month, y: target, z: 8, bdcExecName });
          gapData.push({ x: month, y: gap, z: 4, bdcExecName });
        });

        bdcExecDataMap.set(bdcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("bdc01ExecSelect");
    select.innerHTML = "";
    bdcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = bdcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
        chart: {
          height: 340,
          type: "bubble",
          animations: { enabled: true },
          toolbar: { show: false }
        },
        dataLabels: { enabled: false },
        fill: { opacity: 0.8 },
        xaxis: {
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const execName = point.execName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${execName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const bubblechartType02 = document.querySelector("#bubblechartType02");
      bubblechartType02.innerHTML = ""; // Clear previous chart
      const bubblelargeType02 = document.querySelector("#bubblelargeType02");
      bubblelargeType02.innerHTML = ""; // Clear previous chart
      new ApexCharts(bubblechartType02, options).render();
      new ApexCharts(bubblelargeType02, options).render();
    
    }

    // Render chart with first exec by default
    const firstExec = Array.from(bdcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // On change event
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering bubble chart:", err);
  }
}
function columnRenderType02(jsonData1) {
  try {
    const cdc01AllExecNames = new Set();
    const execDataMap = new Map();
    const categoriesSet = new Set();

    function traverse(node) {
      const cdc01ExecName = node.name;
      cdc01AllExecNames.add(cdc01ExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;

        Object.keys(monthlyData).forEach(month => {
          const label = `${month}`;
          categoriesSet.add(label);

          const actual = monthlyData[month].actual;
          const target = monthlyData[month].target;
          const gap = monthlyData[month].gap;

          actualData.push({ x: label, y: actual, cdc01ExecName});
          targetData.push({ x: label, y: target,cdc01ExecName });
          gapData.push({ x: label, y: gap,cdc01ExecName });
        });

        execDataMap.set(cdc01ExecName, {
          actualData,
          targetData,
          gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(jsonData1[0]);

    // Populate dropdown
    const select = document.getElementById("cdc01ExecSelect");
    cdc01AllExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    // Render Chart
    function renderChart(cdc1SelectedExec) {
      let series = [];

      if (cdc1SelectedExec === "All") {
        // Only show one executive at a time
        series = [];
      } else {
        const data = execDataMap.get(cdc1SelectedExec);
        if (data) {
          series = [
            { name: "Actual", data: data.actualData },
            { name: "Target", data: data.targetData },
            { name: "Gap", data: data.gapData }
          ];
        }
      }

      const options = {
        series: series,
        chart: {
          type: 'bar',
          height: 340,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%'
          }
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
          categories: Array.from(categoriesSet),
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: 'Value ($)' },
          labels: { formatter: val => `$${val}M` }
        },
        // tooltip: {
        //   y: { formatter: val => `$${val} M` }
        // },
        tooltip: {
  custom: function({ series, seriesIndex, dataPointIndex, w }) {
    const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
    const month = point.x || 'N/A';
    const cdc01ExecName = point.cdc01ExecName || 'N/A';
    const value = point.y ?? '';
    const label = w.globals.seriesNames[seriesIndex];

    return `
      <div style="padding: 8px; font-size: 13px;">
        <strong>${month}</strong><br/>
        ${cdc01ExecName}<br/>
        ${label}: <b>$${value} M</b>
      </div>
    `;
  }
},

        colors: ['#008FFB', '#00E396', '#FF4560'],
        fill: { opacity: 1 }
      };

      const columnchartType02 = document.querySelector("#columnchartType02");
      const columnlargeType02 = document.querySelector("#columnlargeType02");
      columnchartType02.innerHTML = ""; // Clear existing chart
      columnlargeType02.innerHTML = ""; // Clear existing chart

      new ApexCharts(columnchartType02, options).render();
      new ApexCharts(columnlargeType02, options).render();
    }

  
    const firstExec = Array.from(cdc01AllExecNames)[0];
document.getElementById("cdc01ExecSelect").value = firstExec;
renderChart(firstExec);

    // Dropdown listener
    select.addEventListener("change", (e) => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Chart render error", err);
  }
}

function lineRenderType02(jsonData1) {
  try {
    const ldc01ExecNames = new Set();
    const ldc01ExecDataMap = new Map();

    function traverse(node) {
      const ldc01ExecName = node.name;
      ldc01ExecNames.add(ldc01ExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, ldc01ExecName });
          targetData.push({ x: month, y: target, ldc01ExecName });
          gapData.push({ x: month, y: gap, ldc01ExecName });
        });

        ldc01ExecDataMap.set(ldc01ExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("ldc01ExecSelect");
    select.innerHTML = "";
    ldc01ExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = ldc01ExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
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
          toolbar: { show: false }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        dataLabels: { enabled: false },
        markers: {
          size: 5,
          hover: { sizeOffset: 3 }
        },
        xaxis: {
          type: 'category',
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
          shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const ldc01ExecName = point.ldc01ExecName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${ldc01ExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const linechartType02 = document.querySelector("#linechartType02");
      linechartType02.innerHTML = "";
      new ApexCharts(linechartType02, options).render();
      const linechartlargeType02 = document.querySelector("#linechartlargeType02");
      linechartlargeType02.innerHTML = "";
      new ApexCharts(linechartlargeType02, options).render();
    }

    // Initial load with first executive
    const firstExec = Array.from(ldc01ExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // Dropdown change listener
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering line chart:", err);
  }
}

function areaRenderType02(jsonData1) {
  try {
    const adc01ExecNames = new Set();
    const adc01ExecDataMap = new Map();

    function traverse(node) {
      const adc01ExecName = node.name;
      adc01ExecNames.add(adc01ExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, adc01ExecName });
          targetData.push({ x: month, y: target, adc01ExecName });
          gapData.push({ x: month, y: gap, adc01ExecName });
        });

        adc01ExecDataMap.set(adc01ExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("adc01ExecSelect");
    select.innerHTML = "";
    adc01ExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = adc01ExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
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
          toolbar: { show: false }
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        dataLabels: { enabled: false },
        markers: {
          size: 5,
          hover: { sizeOffset: 3 }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          type: 'category',
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
           shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const adc01ExecName = point.adc01ExecName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${adc01ExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const areachartType02 = document.querySelector("#areachartType02");
      areachartType02.innerHTML = "";
      new ApexCharts(areachartType02, options).render();
      const areachartlargeType02 = document.querySelector("#areachartlargeType02");
      areachartlargeType02.innerHTML = "";
      new ApexCharts(areachartlargeType02, options).render();
    }

    // Initial chart load
    const firstExec = Array.from(adc01ExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // Dropdown event listener
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering area chart:", err);
  }
}

function pieRenderType02(jsonData1) {
  try {
    const pdc01ExecNames = new Set();
    const pdc01ExecDataMap = new Map();

    function traverse(node) {
      const name = node.name;
      pdc01ExecNames.add(name);

      const monthlyData = {};

      if (node.data?.monthly) {
        for (const [month, values] of Object.entries(node.data.monthly)) {
          monthlyData[month] = {
            actual: parseFloat(values.actual) || 0,
            target: parseFloat(values.target) || 0,
            gap: Math.abs(parseFloat(values.gap) || 0)
          };
        }

        pdc01ExecDataMap.set(name, monthlyData);
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const execSelect = document.getElementById("pdc01ExecSelect");
    const monthSelect = document.getElementById("pdc01MonthSelect");
    const piechartEl = document.querySelector("#piechartType02");
    const piechartlgEl = document.querySelector("#piechartlargeType02");

    if (!execSelect || !monthSelect || !piechartEl || !piechartlgEl) {
      console.error("Missing required DOM elements.");
      return;
    }

    execSelect.innerHTML = "";
    pdc01ExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      execSelect.appendChild(opt);
    });

    let chart = null;

    function populateMonthDropdown(execName) {
      monthSelect.innerHTML = "";
      const monthData = pdc01ExecDataMap.get(execName);
      if (!monthData) return;

      Object.keys(monthData).forEach(month => {
        const opt = document.createElement("option");
        opt.value = month;
        opt.textContent = month;
        monthSelect.appendChild(opt);
      });
    }

    function renderChart(execName, month) {
      const monthData = pdc01ExecDataMap.get(execName)?.[month];
      if (!monthData) return;

      const series = [monthData.actual, monthData.target, monthData.gap];

      piechartEl.innerHTML = "";
      piechartlgEl.innerHTML = "";

      const options = {
        series,
        chart: {
          
          height: 340,
          type: "pie"
        },
        // title: {
        //   text: `${execName} – ${month}`,
        //   align: "center"
        // },
        labels: ["Actual", "Target", "Gap"],
        colors: ["#00E396", "#FEB019", "#FF4560"],
        legend: {
          position: "bottom"
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            colors: ["#111"]
          },
          dropShadow: {
            enabled: false
          },
          formatter: function (val, opts) {
            return val.toFixed(1) + "%";
          }
        },
        tooltip: {
          custom: function ({ series, seriesIndex, w }) {
            const label = w.globals.labels[seriesIndex];
            const value = series[seriesIndex].toFixed(6);
            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${execName}<br/>
                ${label}: <b>$${value} M</b>
              </div>`;
          }
        }
      };

      if (chart) chart.destroy();
      chart = new ApexCharts(piechartEl, options);
      chart.render();
      chart = new ApexCharts(piechartlgEl, options);
      chart.render();
    }

    const defaultExec = Array.from(pdc01ExecNames)[0];
    if (defaultExec) {
      execSelect.value = defaultExec;
      populateMonthDropdown(defaultExec);
      renderChart(defaultExec, monthSelect.value);
    }

    execSelect.addEventListener("change", e => {
      const selectedExec = e.target.value;
      populateMonthDropdown(selectedExec);
      renderChart(selectedExec, monthSelect.value);
    });

    monthSelect.addEventListener("change", e => {
      renderChart(execSelect.value, e.target.value);
    });

  } catch (err) {
    console.error("Error rendering pie chart:", err);
  }
}

function multiaxisRenderType02(jsonData1) {
  try {
    const mdc01ExecNames = new Set();
    const mdc01ExecDataMap = new Map();

    function traverse(node) {
      const mdc01ExecName = node.name;
      mdc01ExecNames.add(mdc01ExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, mdc01ExecName });
          targetData.push({ x: month, y: target, mdc01ExecName });
          gapData.push({ x: month, y: gap, mdc01ExecName });
        });

        mdc01ExecDataMap.set(mdc01ExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("mdc01ExecSelect");
    select.innerHTML = "";
    mdc01ExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = mdc01ExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        {
          name: "Actual",
          type: "column",
          data: data.actualData
        },
        {
          name: "Target",
          type: "column",
          data: data.targetData
        },
        {
          name: "Gap",
          type: "line",
          data: data.gapData
        }
      ];

      const categories = data.actualData.map(d => d.x);

      const options = {
        series,
        chart: {
          height: 340,
          type: "line",
          stacked: false,
          toolbar: { show: false }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2, 2, 3],
          curve: 'smooth'
        },
        xaxis: {
          categories,
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: {
            text: "Value ($M)",
            style: { fontSize: '13px' }
          },
          labels: {
            formatter: val => `$${val}`
          }
        },
        tooltip: {
           shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point?.x || 'N/A';
            const mdc01ExecName = point?.mdc01ExecName || 'N/A';
            const label = w.globals.seriesNames[seriesIndex];
            const value = point?.y;

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${mdc01ExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        markers: {
  size: 5,
  hover: { sizeOffset: 4 }
},
        colors: ['#008FFB', '#00E396', '#FEB019'],
        
      };

      const multiaxischartType02 = document.querySelector("#multiaxischartType02");
      multiaxischartType02.innerHTML = "";
      new ApexCharts(multiaxischartType02, options).render();
      const multiaxislargeType02 = document.querySelector("#multiaxislargeType02");
      multiaxislargeType02.innerHTML = "";
      new ApexCharts(multiaxislargeType02, options).render();
    }

    // Initial chart render
    const firstExec = Array.from(mdc01ExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering chart:", err);
  }
}
function stackedRenderType02(jsonData1) {
  try {
    const sdc01AllExecNames = new Set();
    const execDataMap = new Map();
    const categoriesSet = new Set();

    function traverse(node) {
      const sdc01ExecName = node.name;
      sdc01AllExecNames.add(sdc01ExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;

        Object.keys(monthlyData).forEach(month => {
          const label = `${month}`;
          categoriesSet.add(label);

          const actual = monthlyData[month].actual;
          const target = monthlyData[month].target;
          const gap = monthlyData[month].gap;

          actualData.push({ x: label, y: actual, sdc01ExecName});
          targetData.push({ x: label, y: target,sdc01ExecName });
          gapData.push({ x: label, y: gap,sdc01ExecName });
        });

        execDataMap.set(sdc01ExecName, {
          actualData,
          targetData,
          gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(jsonData1[0]);

    // Populate dropdown
    const select = document.getElementById("sdc01ExecSelect");
    sdc01AllExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    // Render Chart
    function renderChart(selectedExec) {
      let series = [];

      if (selectedExec === "All") {
        // Only show one executive at a time
        series = [];
      } else {
        const data = execDataMap.get(selectedExec);
        if (data) {
          series = [
            { name: "Actual", data: data.actualData },
            { name: "Target", data: data.targetData },
            { name: "Gap", data: data.gapData }
          ];
        }
      }

      const options = {
        series: series,
        chart: {
          type: 'bar',
          height: 340,
          toolbar: { show: false },
          stacked:true
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '60%'
          }
        },
        dataLabels: { enabled: true },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
         
          title: { text: 'Value ($)' },
          labels: { formatter: val => `$${val}M` }
         
        },
        yaxis: {
          categories: Array.from(categoriesSet),
           labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        // tooltip: {
        //   y: { formatter: val => `$${val} M` }
        // },
        tooltip: {
  custom: function({ series, seriesIndex, dataPointIndex, w }) {
    const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
    const month = point.x || 'N/A';
    const sdc01ExecName = point.sdc01ExecName || 'N/A';
    const value = point.y ?? '';
    const label = w.globals.seriesNames[seriesIndex];

    return `
      <div style="padding: 8px; font-size: 13px;">
        <strong>${month}</strong><br/>
        ${sdc01ExecName}<br/>
        ${label}: <b>$${value} M</b>
      </div>
    `;
  }
},

        colors: ['#008FFB', '#00E396', '#FF4560'],
        fill: { opacity: 1 }
      };

      const stackedchartType02 = document.querySelector("#stackedchartType02");
      stackedchartType02.innerHTML = ""; // Clear existing chart
      new ApexCharts(stackedchartType02, options).render();
      const stackedlargeType02 = document.querySelector("#stackedlargeType02");
      stackedlargeType02.innerHTML = ""; // Clear existing chart
      new ApexCharts(stackedlargeType02, options).render();
    }

  
    const firstExec = Array.from(sdc01AllExecNames)[0];
document.getElementById("sdc01ExecSelect").value = firstExec;
renderChart(firstExec);

    // Dropdown listener
    select.addEventListener("change", (e) => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Chart render error", err);
  }
}


// chart - chart

function bubbleRender(jsonData1) {
  try {
    const bcExecNames = new Set();
    const bcExecDataMap = new Map();

    function traverse(node) {
      const bcExecName = node.name;
      bcExecNames.add(bcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, z: 10, bcExecName });
          targetData.push({ x: month, y: target, z: 8, bcExecName });
          gapData.push({ x: month, y: gap, z: 4, bcExecName });
        });

        bcExecDataMap.set(bcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("bcExecSelect");
    select.innerHTML = "";
    bcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = bcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
        chart: {
          height: 340,
          type: "bubble",
          animations: { enabled: true },
          toolbar: { show: false }
        },
        dataLabels: { enabled: false },
        fill: { opacity: 0.8 },
        xaxis: {
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const execName = point.execName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${execName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const Bubblechart = document.querySelector("#Bubblechart");
      Bubblechart.innerHTML = ""; // Clear previous chart
       new ApexCharts(Bubblechart, options).render();
      const Bubblelarge = document.querySelector("#Bubblelarge");
      Bubblelarge.innerHTML = ""; // Clear previous chart     
      new ApexCharts(Bubblelarge, options).render();
    
    }

    // Render chart with first exec by default
    const firstExec = Array.from(bcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // On change event
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering bubble chart:", err);
  }
}

function columnRender(jsonData1) {
  try {
    const cdAllExecNames = new Set();
    const execDataMap = new Map();
    const categoriesSet = new Set();

    function traverse(node) {
      const cdExecName = node.name;
      cdAllExecNames.add(cdExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;

        Object.keys(monthlyData).forEach(month => {
          const label = `${month}`;
          categoriesSet.add(label);

          const actual = monthlyData[month].actual;
          const target = monthlyData[month].target;
          const gap = monthlyData[month].gap;

          actualData.push({ x: label, y: actual, cdExecName});
          targetData.push({ x: label, y: target,cdExecName });
          gapData.push({ x: label, y: gap,cdExecName });
        });

        execDataMap.set(cdExecName, {
          actualData,
          targetData,
          gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(jsonData1[0]);

    // Populate dropdown
    const select = document.getElementById("cdExecSelect");
    cdAllExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    // Render Chart
    function renderChart(cdc1SelectedExec) {
      let series = [];

      if (cdc1SelectedExec === "All") {
        // Only show one executive at a time
        series = [];
      } else {
        const data = execDataMap.get(cdc1SelectedExec);
        if (data) {
          series = [
            { name: "Actual", data: data.actualData },
            { name: "Target", data: data.targetData },
            { name: "Gap", data: data.gapData }
          ];
        }
      }

      const options = {
        series: series,
        chart: {
          type: 'bar',
          height: 340,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%'
          }
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
          categories: Array.from(categoriesSet),
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: 'Value ($)' },
          labels: { formatter: val => `$${val}M` }
        },
        // tooltip: {
        //   y: { formatter: val => `$${val} M` }
        // },
        tooltip: {
  custom: function({ series, seriesIndex, dataPointIndex, w }) {
    const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
    const month = point.x || 'N/A';
    const cdExecName = point.cdExecName || 'N/A';
    const value = point.y ?? '';
    const label = w.globals.seriesNames[seriesIndex];

    return `
      <div style="padding: 8px; font-size: 13px;">
        <strong>${month}</strong><br/>
        ${cdExecName}<br/>
        ${label}: <b>$${value} M</b>
      </div>
    `;
  }
},

        colors: ['#008FFB', '#00E396', '#FF4560'],
        fill: { opacity: 1 }
      };

      const Columnchart = document.querySelector("#Columnchart");
      const Columnlarge = document.querySelector("#Columnlarge");
      Columnchart.innerHTML = ""; // Clear existing chart
      Columnlarge.innerHTML = ""; // Clear existing chart

      new ApexCharts(Columnchart, options).render();
      new ApexCharts(Columnlarge, options).render();
    }

  
    const firstExec = Array.from(cdAllExecNames)[0];
document.getElementById("cdExecSelect").value = firstExec;
renderChart(firstExec);

    // Dropdown listener
    select.addEventListener("change", (e) => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Chart render error", err);
  }
}
function lineRender(jsonData1) {
  try {
    const lcExecNames = new Set();
    const lcExecDataMap = new Map();

    function traverse(node) {
      const lcExecName = node.name;
      lcExecNames.add(lcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, lcExecName });
          targetData.push({ x: month, y: target, lcExecName });
          gapData.push({ x: month, y: gap, lcExecName });
        });

        lcExecDataMap.set(lcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("lcExecSelect");
    select.innerHTML = "";
    lcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = lcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
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
          toolbar: { show: false }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        dataLabels: { enabled: false },
        markers: {
          size: 5,
          hover: { sizeOffset: 3 }
        },
        xaxis: {
          type: 'category',
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
          shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const lcExecName = point.lcExecName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${lcExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const Linechart = document.querySelector("#Linechart");
      Linechart.innerHTML = "";
      new ApexCharts(Linechart, options).render();
      const Linelarge = document.querySelector("#Linelarge");
      Linelarge.innerHTML = "";
      new ApexCharts(Linelarge, options).render();
    }

    // Initial load with first executive
    const firstExec = Array.from(lcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // Dropdown change listener
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering line chart:", err);
  }
}
    
function areaRender(jsonData1) {
  try {
    const acExecNames = new Set();
    const acExecDataMap = new Map();

    function traverse(node) {
      const acExecName = node.name;
      acExecNames.add(acExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, acExecName });
          targetData.push({ x: month, y: target, acExecName });
          gapData.push({ x: month, y: gap, acExecName });
        });

        acExecDataMap.set(acExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("acExecSelect");
    select.innerHTML = "";
    acExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = acExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
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
          toolbar: { show: false }
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        dataLabels: { enabled: false },
        markers: {
          size: 5,
          hover: { sizeOffset: 3 }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          type: 'category',
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val}M`
          }
        },
        tooltip: {
           shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point.x || "N/A";
            const acExecName = point.acExecName || "N/A";
            const value = point.y ?? '';
            const label = w.globals.seriesNames[seriesIndex];

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${acExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        colors: ['#008FFB', '#00E396', '#FF4560']
      };

      const Areachart = document.querySelector("#Areachart");
      Areachart.innerHTML = "";
      new ApexCharts(Areachart, options).render();
      const Arealarge = document.querySelector("#Arealarge");
      Arealarge.innerHTML = "";
      new ApexCharts(Arealarge, options).render();
    }

    // Initial chart load
    const firstExec = Array.from(acExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    // Dropdown event listener
    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering area chart:", err);
  }
}


function pieRender(jsonData1) {
  try {
    const pcExecNames = new Set();
    const pcExecDataMap = new Map();

    function traverse(node) {
      const name = node.name;
      pcExecNames.add(name);

      const monthlyData = {};

      if (node.data?.monthly) {
        for (const [month, values] of Object.entries(node.data.monthly)) {
          monthlyData[month] = {
            actual: parseFloat(values.actual) || 0,
            target: parseFloat(values.target) || 0,
            gap: Math.abs(parseFloat(values.gap) || 0)
          };
        }

        pcExecDataMap.set(name, monthlyData);
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const execSelect = document.getElementById("pcExecSelect");
    const monthSelect = document.getElementById("pcMonthSelect");
    const piechartEl = document.querySelector("#Piechart");
    const piechartlgEl = document.querySelector("#Pielarge");

    if (!execSelect || !monthSelect || !piechartEl || !piechartlgEl) {
      console.error("Missing required DOM elements.");
      return;
    }

    execSelect.innerHTML = "";
    pcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      execSelect.appendChild(opt);
    });

    let chart = null;

    function populateMonthDropdown(execName) {
      monthSelect.innerHTML = "";
      const monthData = pcExecDataMap.get(execName);
      if (!monthData) return;

      Object.keys(monthData).forEach(month => {
        const opt = document.createElement("option");
        opt.value = month;
        opt.textContent = month;
        monthSelect.appendChild(opt);
      });
    }

    function renderChart(execName, month) {
      const monthData = pcExecDataMap.get(execName)?.[month];
      if (!monthData) return;

      const series = [monthData.actual, monthData.target, monthData.gap];

      piechartEl.innerHTML = "";
      piechartlgEl.innerHTML = "";

      const options = {
        series,
        chart: {
          
          height: 340,
          type: "pie"
        },
        // title: {
        //   text: `${execName} – ${month}`,
        //   align: "center"
        // },
        labels: ["Actual", "Target", "Gap"],
        colors: ["#00E396", "#FEB019", "#FF4560"],
        legend: {
          position: "bottom"
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            colors: ["#111"]
          },
          dropShadow: {
            enabled: false
          },
          formatter: function (val, opts) {
            return val.toFixed(1) + "%";
          }
        },
        tooltip: {
          custom: function ({ series, seriesIndex, w }) {
            const label = w.globals.labels[seriesIndex];
            const value = series[seriesIndex].toFixed(6);
            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${execName}<br/>
                ${label}: <b>$${value} M</b>
              </div>`;
          }
        }
      };

      if (chart) chart.destroy();
      
      chart = new ApexCharts(piechartEl, options);
      chart.render();
      chart = new ApexCharts(piechartlgEl, options);
      chart.render();
    }

    const defaultExec = Array.from(pcExecNames)[0];
    if (defaultExec) {
      execSelect.value = defaultExec;
      populateMonthDropdown(defaultExec);
      renderChart(defaultExec, monthSelect.value);
    }

    execSelect.addEventListener("change", e => {
      const selectedExec = e.target.value;
      populateMonthDropdown(selectedExec);
      renderChart(selectedExec, monthSelect.value);
    });

    monthSelect.addEventListener("change", e => {
      renderChart(execSelect.value, e.target.value);
    });

  } catch (err) {
    console.error("Error rendering pie chart:", err);
  }
}


function multiaxisRender(jsonData1) {
  try {
    const mcExecNames = new Set();
    const mcExecDataMap = new Map();

    function traverse(node) {
      const mcExecName = node.name;
      mcExecNames.add(mcExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        Object.entries(node.data.monthly).forEach(([month, values]) => {
          const { actual, target, gap } = values;

          actualData.push({ x: month, y: actual, mcExecName });
          targetData.push({ x: month, y: target, mcExecName });
          gapData.push({ x: month, y: gap, mcExecName });
        });

        mcExecDataMap.set(mcExecName, {
          actualData, targetData, gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("mcExecSelect");
    select.innerHTML = "";
    mcExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = mcExecDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        {
          name: "Actual",
          type: "column",
          data: data.actualData
        },
        {
          name: "Target",
          type: "column",
          data: data.targetData
        },
        {
          name: "Gap",
          type: "line",
          data: data.gapData
        }
      ];

      const categories = data.actualData.map(d => d.x);

      const options = {
        series,
        chart: {
          height: 340,
          type: "line",
          stacked: false,
          toolbar: { show: false }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2, 2, 3],
          curve: 'smooth'
        },
        xaxis: {
          categories,
          //title: { text: "Month" },
          labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        yaxis: {
          title: {
            text: "Value ($M)",
            style: { fontSize: '13px' }
          },
          labels: {
            formatter: val => `$${val}`
          }
        },
        tooltip: {
           shared: false,
           intersect: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const month = point?.x || 'N/A';
            const mcExecName = point?.mcExecName || 'N/A';
            const label = w.globals.seriesNames[seriesIndex];
            const value = point?.y;

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${mcExecName}<br/>
                ${label}: <b>$${value} M</b>
              </div>
            `;
          }
        },
        markers: {
  size: 5,
  hover: { sizeOffset: 4 }
},
        colors: ['#008FFB', '#00E396', '#FEB019'],
        
      };

      const Multiaxis = document.querySelector("#Multiaxis");
      Multiaxis.innerHTML = "";
      new ApexCharts(Multiaxis, options).render();
      const Multiaxislarge = document.querySelector("#Multiaxislarge");
      Multiaxislarge.innerHTML = "";
      new ApexCharts(Multiaxislarge, options).render();
    }

    // Initial chart render
    const firstExec = Array.from(mcExecNames)[0];
    select.value = firstExec;
    renderChart(firstExec);

    select.addEventListener("change", e => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering chart:", err);
  }
}

function stackedRender(jsonData1) {
  try {
    const scAllExecNames = new Set();
    const execDataMap = new Map();
    const categoriesSet = new Set();

    function traverse(node) {
      const scExecName = node.name;
      scAllExecNames.add(scExecName);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        const monthlyData = node.data.monthly;

        Object.keys(monthlyData).forEach(month => {
          const label = `${month}`;
          categoriesSet.add(label);

          const actual = monthlyData[month].actual;
          const target = monthlyData[month].target;
          const gap = monthlyData[month].gap;

          actualData.push({ x: label, y: actual, scExecName});
          targetData.push({ x: label, y: target,scExecName });
          gapData.push({ x: label, y: gap,scExecName });
        });

        execDataMap.set(scExecName, {
          actualData,
          targetData,
          gapData
        });
      }

      if (node.children?.length) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(jsonData1[0]);

    // Populate dropdown
    const select = document.getElementById("scExecSelect");
    scAllExecNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    // Render Chart
    function renderChart(selectedExec) {
      let series = [];

      if (selectedExec === "All") {
        // Only show one executive at a time
        series = [];
      } else {
        const data = execDataMap.get(selectedExec);
        if (data) {
          series = [
            { name: "Actual", data: data.actualData },
            { name: "Target", data: data.targetData },
            { name: "Gap", data: data.gapData }
          ];
        }
      }

      const options = {
        series: series,
        chart: {
          type: 'bar',
          height: 340,
          toolbar: { show: false },
          stacked:true
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '60%'
          }
        },
        dataLabels: { enabled: true },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
         
          title: { text: 'Value ($)' },
          labels: { formatter: val => `$${val}M` }
         
        },
        yaxis: {
          categories: Array.from(categoriesSet),
           labels: {
            rotate: -45,
            style: { fontSize: '11px' }
          }
        },
        // tooltip: {
        //   y: { formatter: val => `$${val} M` }
        // },
        tooltip: {
  custom: function({ series, seriesIndex, dataPointIndex, w }) {
    const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
    const month = point.x || 'N/A';
    const scExecName = point.scExecName || 'N/A';
    const value = point.y ?? '';
    const label = w.globals.seriesNames[seriesIndex];

    return `
      <div style="padding: 8px; font-size: 13px;">
        <strong>${month}</strong><br/>
        ${scExecName}<br/>
        ${label}: <b>$${value} M</b>
      </div>
    `;
  }
},

        colors: ['#008FFB', '#00E396', '#FF4560'],
        fill: { opacity: 1 }
      };

      const Stackedchart = document.querySelector("#Stackedchart");
      Stackedchart.innerHTML = ""; // Clear existing chart
      new ApexCharts(Stackedchart, options).render();
      const Stackedlarge = document.querySelector("#Stackedlarge");
      Stackedlarge.innerHTML = ""; // Clear existing chart
      new ApexCharts(Stackedlarge, options).render();
    }

  
    const firstExec = Array.from(scAllExecNames)[0];
document.getElementById("scExecSelect").value = firstExec;
renderChart(firstExec);

    // Dropdown listener
    select.addEventListener("change", (e) => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Chart render error", err);
  }
}


function waterfallRender(jsonData1) {
  try {
    const execNames = new Set();
    const execDataMap = new Map();
    const categoriesSet = new Set();

    function traverse(node) {
      const name = node.name;
      execNames.add(name);

      const actualData = [];
      const targetData = [];
      const gapData = [];

      if (node.data?.monthly) {
        for (const [month, val] of Object.entries(node.data.monthly)) {
          categoriesSet.add(month);

          const actual = parseFloat(val.actual) || 0;
          const target = parseFloat(val.target) || 0;
          const gap = parseFloat(val.gap) || 0;

          actualData.push({ x: month, y: [0, actual], execName: name });
          targetData.push({ x: month, y: [0, target], execName: name });
          gapData.push({ x: month, y: [0, gap], execName: name });
        }

        execDataMap.set(name, { actualData, targetData, gapData });
      }

      if (node.children?.length) {
        node.children.forEach(traverse);
      }
    }

    traverse(jsonData1[0]);

    const select = document.getElementById("wcExecSelect");
    if (!select) return console.error("#wcExecSelect not found");

    select.innerHTML = "";
    execNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function renderChart(selectedExec) {
      const data = execDataMap.get(selectedExec);
      if (!data) return;

      const series = [
        { name: "Actual", data: data.actualData },
        { name: "Target", data: data.targetData },
        { name: "Gap", data: data.gapData }
      ];

      const options = {
        series,
        chart: {
          type: "rangeBar",
          height: 340,
          toolbar: { show: false }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
            rangeBarGroupRows: false
          }
        },
        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return `$${(val[1] - val[0]).toFixed(4)}M`;
          },
          style: {
            fontSize: "12px",
            fontWeight: "bold"
          }
        },
        xaxis: {
          categories: Array.from(categoriesSet),
          labels: {
            rotate: -45,
            style: { fontSize: "11px" }
          }
        },
        yaxis: {
          title: { text: "Value ($)" },
          labels: {
            formatter: val => `$${val.toFixed(4)}M`
          }
        },
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const label = w.globals.seriesNames[seriesIndex];
            const month = point.x;
            const value = point.y[1] - point.y[0];
            const execName = point.execName || "";

            return `
              <div style="padding: 8px; font-size: 13px;">
                <strong>${month}</strong><br/>
                ${execName}<br/>
                ${label}: <b>$${value.toFixed(6)} M</b>
              </div>
            `;
          }
        },
        colors: ["#008FFB", "#00E396", "#FF4560"],
        fill: { opacity: 1 },
      };

      const chartEl = document.querySelector("#Waterfallchart");
      const chartModal = document.querySelector("#Waterfalllarge");
      if (!chartEl || !chartModal) return console.error("Chart containers not found");

      chartEl.innerHTML = "";
      chartModal.innerHTML = "";

      new ApexCharts(chartEl, options).render();
      new ApexCharts(chartModal, options).render();
    }

    const defaultExec = Array.from(execNames)[0];
    select.value = defaultExec;
    renderChart(defaultExec);

    select.addEventListener("change", (e) => {
      renderChart(e.target.value);
    });

  } catch (err) {
    console.error("Error rendering waterfall chart:", err);
  }
}


// Sample data matching your image
    const compensationData = [
      {
        name: "Chairman Board of Directors",
        monthly: {
          "JAN 2025": {
            actual: 0.00005,
            target: 0.0016,
            gap: -0.00083
          },
          "FEB 2025": {
            actual: 0.00081,
            target: 0.0016,
            gap: -0.00083
          }
        }
      },
      {
        name: "Chief Executive Officer",
        monthly: {
          "JAN 2025": {
            actual: 0.00081,
            target: 0.0016,
            gap: -0.00083
          },
          "FEB 2025": {
            actual: 0.00081,
            target: 0.0016,
            gap: -0.00083
          }
        }
      },
      {
        name: "Chief Sales Officer",
        monthly: {
          "JAN 2025": {
            actual: 0.00081,
            target: 0.0016,
            gap: -0.00083
          },
          "FEB 2025": {
            actual: 0.00081,
            target: 0.0016,
            gap: -0.00083
          }
        }
      },
      {
        name: "Americas",
        monthly: {
          "JAN 2025": {
            actual: 0.000078,
            target: 0.00029,
            gap: -0.00021
          },
          "FEB 2025": {
            actual: 0.000078,
            target: 0.00029,
            gap: -0.00021
          }
        }
      },
      {
        name: "Asia Pacific",
        monthly: {
          "JAN 2025": {
            actual: 0.00016,
            target: 0.00029,
            gap: -0.00013
          },
          "FEB 2025": {
            actual: 0.00016,
            target: 0.00029,
            gap: -0.00013
          }
        }
      },
      {
        name: "United Kingdom",
        monthly: {
          "JAN 2025": {
            actual: 0.00011,
            target: 0.00029,
            gap: -0.00018
          },
          "FEB 2025": {
            actual: 0.00011,
            target: 0.00029,
            gap: -0.00018
          }
        }
      }
    ];

    // Initialize the dashboard
   
 function radialmultipleRender() {
  const execSelect = document.getElementById('radialExecSelect');
  const monthSelect = document.getElementById('radialMonthSelect');
  let RadialMultichart;
  let RadialMultilarge;

  if (!execSelect || !monthSelect) {
    console.error("radialExecSelect or radialMonthSelect not found.");
    return;
  }

  // Populate executive dropdown
  compensationData.forEach(exec => {
    const option = document.createElement('option');
    option.value = exec.name;
    option.textContent = exec.name;
    execSelect.appendChild(option);
  });

  // Select first executive by default
  if (compensationData.length > 0) {
    execSelect.value = compensationData[0].name;

    // Populate months for the first executive
    const firstExec = compensationData[0];
    const firstMonths = Object.keys(firstExec.monthly);

    firstMonths.forEach(month => {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = month;
      monthSelect.appendChild(option);
    });

    if (firstMonths.length > 0) {
      monthSelect.value = firstMonths[0];
      renderChart(firstExec.name, firstMonths[0]);
    }
  }

  // When executive is selected, populate months
  execSelect.addEventListener('change', function () {
    const selectedExec = this.value;
    monthSelect.innerHTML = '';

    const exec = compensationData.find(e => e.name === selectedExec);
    if (!exec || !exec.monthly) return;

    const months = Object.keys(exec.monthly);
    months.forEach(month => {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = month;
      monthSelect.appendChild(option);
    });

    if (months.length > 0) {
      monthSelect.value = months[0];
      renderChart(selectedExec, months[0]);
    }
  });

  // When month is selected, render chart
  monthSelect.addEventListener('change', function () {
    const selectedExec = execSelect.value;
    const selectedMonth = this.value;

    if (selectedExec && selectedMonth) {
      renderChart(selectedExec, selectedMonth);
    }
  });

  function renderChart(execName, month) {
    const exec = compensationData.find(e => e.name === execName);
    const monthData = exec?.monthly?.[month];
    if (!monthData) return;

    const gapValue = Math.abs(monthData.gap);

    const options = {
      series: [
        monthData.actual * 1_000_000,
        monthData.target * 1_000_000,
        gapValue * 1_000_000
      ],
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: { fontSize: '16px' },
            value: {
              fontSize: '14px',
              formatter: val => `$${(val / 1_000_000).toFixed(6)}M`
            },
            total: {
              show: true,
              label: execName,
              formatter: () => {
                const total = monthData.actual + monthData.target + gapValue;
                return `$${total.toFixed(6)}M`;
              }
            }
          }
        }
      },
      labels: ['Actual', 'Target', 'Gap'],
      colors: ['#00E396', '#FEB019', '#FF4560'],
      legend: {
        show: true,
        position: 'bottom'
      },
      tooltip: {
        custom: ({ series, seriesIndex, w }) => {
          const labels = ['Actual', 'Target', 'Gap'];
          const value = (series[seriesIndex] / 1_000_000).toFixed(6);
          return `
            <div style="padding: 8px; font-size: 13px;">
              <strong>${month}</strong><br/>
              ${execName}<br/>
              ${labels[seriesIndex]}: <b>$${value}M</b>
            </div>`;
        }
      }
    };

    if (RadialMultichart) {
      RadialMultichart.destroy();
    }
    if (RadialMultilarge) {
      RadialMultilarge.destroy();
    }

    RadialMultichart = new ApexCharts(document.querySelector("#RadialMultichart"), options);
    RadialMultichart.render();
     RadialMultilarge = new ApexCharts(document.querySelector("#RadialMultilarge"), options);
    RadialMultilarge.render();
  }
}

 function radialMultiRenderType02() {
  const execSelect = document.getElementById('radialExecSelect-02');
  const monthSelect = document.getElementById('radialMonthSelect-02');
  let RadialMultichart02;
  let RadialMultilarge02;

  if (!execSelect || !monthSelect) {
    console.error("radialExecSelect or radialMonthSelect not found.");
    return;
  }

  // Populate executive dropdown
  compensationData.forEach(exec => {
    const option = document.createElement('option');
    option.value = exec.name;
    option.textContent = exec.name;
    execSelect.appendChild(option);
  });

  // Select first executive by default
  if (compensationData.length > 0) {
    execSelect.value = compensationData[0].name;

    // Populate months for the first executive
    const firstExec = compensationData[0];
    const firstMonths = Object.keys(firstExec.monthly);

    firstMonths.forEach(month => {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = month;
      monthSelect.appendChild(option);
    });

    if (firstMonths.length > 0) {
      monthSelect.value = firstMonths[0];
      renderChart02(firstExec.name, firstMonths[0]);
    }
  }

  // When executive is selected, populate months
  execSelect.addEventListener('change', function () {
    const selectedExec = this.value;
    monthSelect.innerHTML = '';

    const exec = compensationData.find(e => e.name === selectedExec);
    if (!exec || !exec.monthly) return;

    const months = Object.keys(exec.monthly);
    months.forEach(month => {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = month;
      monthSelect.appendChild(option);
    });

    if (months.length > 0) {
      monthSelect.value = months[0];
      renderChart02(selectedExec, months[0]);
    }
  });

  // When month is selected, render chart
  monthSelect.addEventListener('change', function () {
    const selectedExec = execSelect.value;
    const selectedMonth = this.value;

    if (selectedExec && selectedMonth) {
      renderChart02(selectedExec, selectedMonth);
    }
  });

  function renderChart02(execName, month) {
    const exec = compensationData.find(e => e.name === execName);
    const monthData = exec?.monthly?.[month];
    if (!monthData) return;

    const gapValue = Math.abs(monthData.gap);

    const options = {
      series: [
        monthData.actual * 1_000_000,
        monthData.target * 1_000_000,
        gapValue * 1_000_000
      ],
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: { fontSize: '16px' },
            value: {
              fontSize: '14px',
              formatter: val => `$${(val / 1_000_000).toFixed(6)}M`
            },
            total: {
              show: true,
              label: execName,
              formatter: () => {
                const total = monthData.actual + monthData.target + gapValue;
                return `$${total.toFixed(6)}M`;
              }
            }
          }
        }
      },
      labels: ['Actual', 'Target', 'Gap'],
      colors: ['#00E396', '#FEB019', '#FF4560'],
      legend: {
        show: true,
        position: 'bottom'
      },
      tooltip: {
        custom: ({ series, seriesIndex, w }) => {
          const labels = ['Actual', 'Target', 'Gap'];
          const value = (series[seriesIndex] / 1_000_000).toFixed(6);
          return `
            <div style="padding: 8px; font-size: 13px;">
              <strong>${month}</strong><br/>
              ${execName}<br/>
              ${labels[seriesIndex]}: <b>$${value}M</b>
            </div>`;
        }
      }
    };

    if (RadialMultichart02) {
      RadialMultichart02.destroy();
    }
    // if (RadialMultilarge) {
    //   RadialMultilarge.destroy();
    // }

    RadialMultichart02 = new ApexCharts(document.querySelector("#RadialMultichart-02"), options);
    RadialMultichart02.render();
     RadialMultilarge02 = new ApexCharts(document.querySelector("#RadialMultiLargechart-02"), options);
    RadialMultilarge02.render();
  }
}


// Drill Down Table
const headersDrilldownTable = {
    "Monthly": `<tr>
     <th rowspan="2" class="text-center text-nowrap align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>        
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
        ${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
            .map((month, index) => {
                let colors = ["#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a", "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"];
                return `<th colspan="3" class="text-center" style="background-color:${colors[index]};">${month} 2025</th>`;
            }).join("")}
    </tr>
    <tr>
        ${["#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a", "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"]
            .map(color => `
            <th class="text-center align-middle" style="background-color:${color};">Actual</th>
            <th class="text-center align-middle" style="background-color:${color};">Target</th>
            <th class="text-center align-middle" style="background-color:${color};">Gap</th>`).join("")}
    </tr>`,
    "Quarterly": `<tr>
    <th rowspan="2" class="align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
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
    <th rowspan="2" class="text-center text-nowrap align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
        ${["H1", "H2"].map((h, index) => {
            let colors = ["#FFA07A", "#20B2AA"];
            return `<th colspan="3" class="text-center" style="background-color:${colors[index]};">${h} 2025</th>`;
        }).join("")}
    </tr>
    <tr>
        ${["#FFA07A", "#20B2AA"].map(color =>
            `<th class="text-center text-nowrap align-middle" style="background-color:${color};">Actual</th>
             <th class="text-center text-nowrap align-middle" style="background-color:${color};">Target</th>
             <th class="text-center text-nowrap align-middle" style="background-color:${color};">Gap</th>`).join("")}
    </tr>`,
    "Annually": `<tr>
    <th rowspan="2" class="text-center text-nowrap align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
        <th colspan="3" class="text-center" style="background-color:#9370DB; color:#FFFFFF;">2025</th>
    </tr>
    <tr>
        <th class="text-center text-nowrap align-middle" style="background-color:#9370DB; color:#FFFFFF;">Actual</th>
        <th class="text-center text-nowrap align-middle" style="background-color:#9370DB; color:#FFFFFF;">Target</th>
        <th class="text-center text-nowrap align-middle" style="background-color:#9370DB; color:#FFFFFF;">Gap</th>
    </tr>`
};
function loadDrilldownTable(data, tableId, parentId = null, level = 0, view = "") {
    let tbody = $(`#${tableId} tbody`);
    data.forEach(item => {
        let rowId = `row-${tableId}-${item.id}`;
        let parentClass = parentId ? `child-row parent-${tableId}-${parentId}` : "";
        let toggleIcon = item.children ? `<i class="fas fa-plus toggle-icon" data-id="${item.id}" data-table="${tableId}" style="cursor: pointer;"></i>` : "";

         let periods = {
            "Monthly": ["JAN 2025", "FEB 2025", "MAR 2025", "APR 2025", "MAY 2025", "JUN 2025", "JUL 2025", "AUG 2025", "SEP 2025", "OCT 2025", "NOV 2025", "DEC 2025"],
            "Quarterly": ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"],
            "Half Yearly": ["H1 2025", "H2 2025"],
            "Annually": ["2025"]
        };

        for (let period of periods[view]) {
    let periodData = item.data?.[view.toLowerCase()]?.[period];
    if (periodData?.kpistatus) {
        kpistatus = periodData.kpistatus.toLowerCase();
        break;
    }
}

        let gapstatusIcon = (kpistatus === 'green')
  ? `<i class="fas fa-arrow-up text-success"></i>`
  : `<i class="fas fa-arrow-down text-danger"></i>`;
  

  

        

        let row = `<tr id="${rowId}" class="${parentClass}" ${parentId ? 'style="display: none;"' : ""}>
            <td class="text-center align-middle">${toggleIcon}</td>
            <td class="text-center align-middle">${gapstatusIcon}</td>           
            <td><div class="d-flex justify-content-between gap-2"><span style="min-width:180px">${item.name}</span></div></td>`;

       

        periods[view].forEach(period => {
            if (item.data[view.toLowerCase()] && item.data[view.toLowerCase()][period]) {
                let periodData = item.data[view.toLowerCase()][period];
                row += `<td class="text-center text-nowrap align-middle">${periodData.currency} ${periodData.actual}</td>
                        <td class="text-center text-nowrap align-middle">${periodData.currency} ${periodData.target}</td>
                        <td class="text-center text-nowrap align-middle">${periodData.currency} ${periodData.gap}</td>`;
            } else {
                row += `<td class="text-center align-middle">-</td><td class="text-center align-middle">-</td><td class="text-center align-middle">-</td>`;
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
    $(`#${tableId} thead`).html(headersDrilldownTable[view]);
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
function switchDrilldownTableView(view, tableId, jsonData1) {
    let table = $(`#${tableId}`);
    if ($.fn.DataTable.isDataTable(table)) {
        table.DataTable().destroy();
        table.find("thead").empty();
        table.find("tbody").empty();
    }
    initializeDrilldownTable(tableId, jsonData1, view);
}

//KPI Drill Down Table
const headersKpiDrilldownTable = {
    "Monthly": `<tr>
     <th rowspan="2" class="text-center text-nowrap align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
         <th rowspan="2" class="text-center text-nowrap align-middle">Status</th>
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
        ${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
            .map((month, index) => {
                let colors = ["#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a", "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"];
                return `<th colspan="4" class="text-center" style="background-color:${colors[index]};">${month} 2025</th>`;
            }).join("")}
    </tr>
    <tr>
        ${["#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a", "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"]
            .map(color => `
            <th class="text-center align-middle" style="background-color:${color};">Actual</th>
            <th class="text-center align-middle" style="background-color:${color};">Target</th>
            <th class="text-center align-middle" style="background-color:${color};">Gap</th>
             <th class="text-center align-middle" style="background-color:${color};">YTD</th>`).join("")}
    </tr>`,
    "Quarterly": `<tr>
    <th rowspan="2" class="text-center text-nowrap align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2" class="text-center text-nowrap align-middle">Status</th>
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
        ${["Q1", "Q2", "Q3", "Q4"].map((qtr, index) => {
            let colors = ["#FFD700", "#90EE90", "#87CEFA", "#FFB6C1"];
            return `<th colspan="4" class="text-center" style="background-color:${colors[index]};">${qtr} 2025</th>`;
        }).join("")}
    </tr>
    <tr>
        ${["#FFD700", "#90EE90", "#87CEFA", "#FFB6C1"].map(color =>
            `<th class="text-center align-middle" style="background-color:${color};">Actual</th>
             <th class="text-center align-middle" style="background-color:${color};">Target</th>
             <th class="text-center align-middle" style="background-color:${color};">Gap</th>
             <th class="text-center align-middle" style="background-color:${color};">YTD</th>`).join("")}
    </tr>`,
    "Half Yearly": `<tr>
    <th rowspan="2" class="text-center text-nowrap align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2" class="text-center text-nowrap align-middle">Status</th>
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
        ${["H1", "H2"].map((h, index) => {
            let colors = ["#FFA07A", "#20B2AA"];
            return `<th colspan="4" class="text-center" style="background-color:${colors[index]};">${h} 2025</th>`;
        }).join("")}
    </tr>
    <tr>
        ${["#FFA07A", "#20B2AA"].map(color =>
            `<th class="text-center align-middle" style="background-color:${color};">Actual</th>
             <th class="text-center align-middle" style="background-color:${color};">Target</th>
             <th class="text-center align-middle" style="background-color:${color};">Gap</th>
             <th class="text-center align-middle" style="background-color:${color};">YTD</th>`).join("")}
    </tr>`,
    "Annually": `<tr>
    <th rowspan="2" class="text-center text-nowrap align-middle">#</th>
        <th rowspan="2" class="text-center text-nowrap align-middle"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2" class="text-center text-nowrap align-middle">Status</th>
        <th rowspan="2" class="text-nowrap align-middle">Name/Period</th>
        <th colspan="4" class="text-center align-middle" style="background-color:#9370DB; color:#FFFFFF;">2025</th>
    </tr>
    <tr>
        <th class="text-center align-middle" style="background-color:#9370DB; color:#FFFFFF;">Actual</th>
        <th class="text-center align-middle" style="background-color:#9370DB; color:#FFFFFF;">Target</th>
        <th class="text-center align-middle" style="background-color:#9370DB; color:#FFFFFF;">Gap</th>
        <th class="text-center align-middle" style="background-color:#9370DB; color:#FFFFFF;">YTD</th>
    </tr>`
};
function loadKpiDrilldownTable(data, tableId, parentId = null, level = 0, view = "") {
    let tbody = $(`#${tableId} tbody`);
    data.forEach(item => {
        let rowId = `row-${tableId}-${item.id}`;
        let parentClass = parentId ? `child-row parent-${tableId}-${parentId}` : "";
        let toggleIcon = item.children ? `<i class="fas fa-plus toggle-icon" data-id="${item.id}" data-table="${tableId}" style="cursor: pointer;"></i>` : "";
         let periods = {
            "Monthly": ["JAN 2025", "FEB 2025", "MAR 2025", "APR 2025", "MAY 2025", "JUN 2025", "JUL 2025", "AUG 2025", "SEP 2025", "OCT 2025", "NOV 2025", "DEC 2025"],
            "Quarterly": ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"],
            "Half Yearly": ["H1 2025", "H2 2025"],
            "Annually": ["2025"]
        };

       for (let period of periods[view]) {
    let periodData = item.data?.[view.toLowerCase()]?.[period];
    if (periodData?.kpistatus) {
        kpistatus = periodData.kpistatus.toLowerCase();
        break;
    }
}

        let gapstatusIcon = (kpistatus === 'green')
  ? `<i class="fas fa-arrow-up text-success"></i>`
  : `<i class="fas fa-arrow-down text-danger"></i>`;
  

   let kpistatusIcon = (kpistatus === 'green')
  ? `<i class="fas fa-flag text-success"></i>`
  : `<i class="fas fa-flag text-danger"></i>`;

        let row = `<tr id="${rowId}" class="${parentClass}" ${parentId ? 'style="display: none;"' : ""}>
            <td class="text-center">${toggleIcon}</td>
            <td class="text-center">${gapstatusIcon}</td>
             <td class="text-center">${kpistatusIcon}</td>
            <td><div class="d-flex justify-content-between gap-2"><span style="min-width:180px">${item.name}</span></div></td>`;
        periods[view].forEach(period => {
            if (item.data[view.toLowerCase()] && item.data[view.toLowerCase()][period]) {
                let periodData = item.data[view.toLowerCase()][period];
                row += `<td class="text-center align-middle text-nowrap">${periodData.currency} ${periodData.actual}</td>
                        <td class="text-center align-middle text-nowrap">${periodData.currency} ${periodData.target}</td>
                        <td class="text-center align-middle text-nowrap">${periodData.currency} ${periodData.gap}</td>
                        <td class="text-center align-middle text-nowrap">${periodData.currency} ${periodData.ytd}</td>`;
                        
            } else {
                row += `<td class="text-center align-middle">-</td><td class="text-center align-middle">-</td><td class="text-center align-middle">-</td><td class="text-center align-middle">-</td>`;
            }
        });

        row += `</tr>`;
        tbody.append(row);

        if (item.children) {
            loadKpiDrilldownTable(item.children, tableId, item.id, level + 1, view);
        }
    });
}
function initializeKpiDrilldownTable(tableId, jsonData2, view) {
    $(`#${tableId} thead`).html(headersKpiDrilldownTable[view]);
    $(`#${tableId} tbody`).empty();
    loadKpiDrilldownTable(jsonData2, tableId, null, 0, view);

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
function switchKpiDrilldownTableView(view, tableId, jsonData2) {
    let table = $(`#${tableId}`);
    if ($.fn.DataTable.isDataTable(table)) {
        table.DataTable().destroy();
        table.find("thead").empty();
        table.find("tbody").empty();
    }
    initializeKpiDrilldownTable(tableId, jsonData2, view);
}

//common table
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

const reportTemplateRiskColumns = [
  { data: 'departmentName', className:'text-center', visible: false, },
  { data: 'strategicOutcomes', className:'text-center' },
  { data: 'strategicObjectives', className:'text-center' },
  { data: 'coherentActions', className:'text-center' },
  { data: 'subActions', className:'text-center' },
  { data: 'output', className:'text-center' },
  { data: 'responsible', className:'text-center', render: function(data, type, row) {
            // Example user display (modify with your user data)
            return `<span class="badge label-bg-green">${data}</span>`;
        } },
  { data: 'targetPeriod2024_25', className:'text-center' },
  { data: 'plannedImplementationMonths', className:'text-center' },
  { data: 'actualImplementationMonths', className:'text-center' },
  { data: 'performanceStatusAsAt30September2024', className:'text-center',
     render: function (data, type, row) {
    // Make sure data comparison is case-insensitive and trimmed
    const status = (data || '').toString().trim().toLowerCase();

    if (status === 'green') {
      return `<i class="fas fa-flag text-success" title="Green"></i>`;
    } else if (status === 'red') {
      return `<i class="fas fa-flag text-danger" title="Red"></i>`;
    } else if (status === 'yellow' || status === 'amber') {
      return `<i class="fas fa-flag text-warning" title="Yellow"></i>`;
    } else {
      return `<i class="fas fa-flag text-secondary" title="No Status"></i>`;
    }
  } },
  { data: 'implementationRemarks', className:'text-center' },
  { data: 'performanceAnalysisObservationsRecommendations', className:'text-center' },
  { data: 'consolidatedImplementationRemarks', className:'text-center' },
  { data: 'consolidatedPerformanceAnalysisObservationsRecommendations', className:'text-center' },
];




const riskStatusCountColumns = [
    { data:'department', className:'text-center' },
    { data:'low', className:'text-center' },
    { data:'medium', className:'text-center' },
    { data:'high', className:'text-center' },
    { data:'extreme', className:'text-center' }
  ];

  const initiativeRegisterColumns = [
    { data:'department', className:'text-start' },
    { data:'name', className:'text-start' },
   {
  data: 'impact',
  render: function (data, type, row, meta) {
    if (!Array.isArray(data)) return '';

    const colors = [
      'label-bg-orange',
      'label-bg-teal',
      'label-bg-purple',
      'label-bg-yellow',
      'label-bg-blue',
      'label-bg-red',
      'label-bg-dark'
    ];

    const badges = data.map((item, index) => {
      const name = item.name || '';
      const color = colors[index % colors.length];
      return `<span class="badge ${color}">${name}</span>`;
    }).join(' ');

    return `<div class="d-flex gap-1 flex-wrap" style="min-width:160px">${badges}</div>`;
  }
},
    { data:'plannedDate', className:'text-center' },
    { data:'actualDate', className:'text-center' },
     { data:'total', className:'text-center' },
      { data:'utilised', className:'text-center' },
       { data:'balance', className:'text-center' },
    { 
  data: 'progress', 
  className: 'text-center',
  render: function (data, type, row, meta) {
    return `<span class="badge label-bg-green">${data}</span>`;
  }
},
    { data:'target', className:'text-center' },
    { data:'status', className:'text-center' }
  ];


  const ermRiskRegisterColumns = [
  {
    data: 'risk_status',
    className: 'text-center',
    render: function (data, type, row) {
      let color = 'gray';
      let title = '';

      switch (data?.toLowerCase()) {
        case 'red':
          color = 'danger';
          title = 'High Risk';
          break;
        case 'yellow':
          color = 'warning';
          title = 'Medium Risk';
          break;
        case 'green':
          color = 'success';
          title = 'Low Risk';
          break;
      }

      return ` <i class="fas fa-flag text-${color}"></i>`;
    }
  },
  { data: 'department_name', className: 'text-start' },
  { data: 'risk_id', className: 'text-start' },
  { data: 'risk_name', className: 'text-start' },
  { data: 'kpi', className: 'text-center' },
  { data: 'pos', className: 'text-center' },
  { data: 'iso', className: 'text-center' },
  { data: 'information_asset', className: 'text-center' },
  { data: 'others', className: 'text-center' },
  { data: 'inherent_score', className: 'text-center' },
  { data: 'residual_risk_score', className: 'text-center' },
  { data: 'mitigation_plan', className: 'text-start' },
  { data: 'person_in_charge', className: 'text-center' },
  { data: 'target_completion_time', className: 'text-center' },
  { data: 'changes_in_target_completion_time', className: 'text-center' }
];

const riskMonitorsColumns = [
    { 
        data: 'department_name', 
        title: 'Department Name',
        className: 'text-center'
    },
    { 
        data: 'risk_code', 
        title: 'Risk Code',
        className: 'text-center'
    },
    { 
        data: 'risk_name', 
        title: 'Risk Name',
        className: 'text-start'
    },
    { 
        data: 'mitigation_plan', 
        title: 'Mitigation Plan',
        className: 'text-start'
    },
    { 
        data: 'notes', 
        title: 'Notes',
        className: 'text-start',
        render: function(data, type, row) {
            return data || '-'; // Show dash for empty notes
        }
    },
    { 
        data: 'target_completion_time', 
        title: 'Target Completion Time',
        className: 'text-center',
        type: 'date',
        render: function(data) {
            return data ? moment(data, 'MM/DD/YYYY').format('MMM D, YYYY') : '-';
        }
    },
    { 
        data: 'changes_in_target_completion_time', 
        title: 'Changes in Completion',
        className: 'text-center',
        type: 'date',
        render: function(data) {
            return data ? moment(data, 'MM/DD/YYYY').format('MMM D, YYYY') : '-';
        }
    },
    {
  data: 'progress_percentage',
  title: 'Progress (%)',
  className: 'text-center align-middle',
  render: function(data) {
    // Determine color class based on value
    let colorClass = 'bg-success';
    if (data < 40) colorClass = 'bg-danger';
    else if (data < 70) colorClass = 'bg-warning';

    return `
      <div class="progress" style="height: 18px; border-radius: 10px;">
        <div class="progress-bar ${colorClass} progress-bar-striped" 
             role="progressbar" 
             style="width: ${data}%; border-radius: 10px;" 
             aria-valuenow="${data}" 
             aria-valuemin="0" 
             aria-valuemax="100">
          <span class="fw-bold small">${data}%</span>
        </div>
      </div>
    `;
  }
},
    { 
        data: 'status', 
        title: 'Status',
        className: 'text-center',
        render: function(data) {
            const statusClass = data === 'Open' ? 'status-bg-red' : 'status-bg-green';
            return `<span class="badge ${statusClass} rounded-pill">${data}</span>`;
        }
    },
    { 
        data: 'person_in_charge', 
        title: 'Responsible',
        className: 'text-center',
        render: function(data, type, row) {
            // Example user display (modify with your user data)
            return `<ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">
  <li class="avatar avatar-xs pull-up" title="${data}">
    <img 
      src="assets/images/user/usrbig1.jpg" 
      class="rounded-circle" 
      width="24" 
      height="24" 
      alt="User ${data}">
  </li>
</ul>`;
        }
    }
];


const kpiRegisterColumns = [
    { data: "department_name", title: "Department Name" },
    { data: "scorecard", title: "Scorecard" },
    { data: "perspective", title: "Perspective" },
    { data: "objective", title: "Objective" },
    { data: "kpi_name", title: "KPI Name" },
    { 
        data: "status",
        title: "Status",
        render: function(data) {
            const statusClasses = {
                "On Track": "status-bg-green",
                "Exceeding Target": "status-bg-blue",
                "Needs Attention": "status-bg-yellow",
                "At Risk": "status-bg-red"
            };
            return `<span class="badge ${statusClasses[data] || 'status-bg-gray'}">${data}</span>`;
        }
    },
    { data: "actual", title: "Actual", className: "text-end" },
    { data: "target", title: "Target", className: "text-end" },
    { data: "ytd", title: "YTD", className: "text-end" },
    { 
        data: "gap",
        title: "Gap",
        className: "text-end",
        render: function(data) {
            return `<span class="${data >= 0 ? 'text-success' : 'text-danger'}">${data}</span>`;
        }
    },
    { 
        data: "index",
        title: "Index",
        className: "text-end",
        render: function(data) {
            return `${data}%`;
        }
    }
];

const biaRpoReportColumns = [
    { data: "department_name", title: "Department Name" },
    { data: "process", title: "Process" },
    { data: "vital_records", title: "Name of Vital Records" },
    { data: "media_type", title: "Type of Media" },
    { data: "backup_method", title: "Backup Method" },
    { data: "backup_time", title: "Backup Time" },
    { data: "retention", title: "Retention" },
    { 
        data: "recovery_strategy", 
        title: "Database Recovery Strategy",
        render: function(data) {
            return `<span class="text-primary fw-bold">${data}</span>`;
        }
    }
];


const kpiStatusCountColumns = [
  {
    data: 'parent',
    title: 'Parent',
    className: 'text-center align-middle',
    render: function (data, type, row) {
      return row.showParent ? row.parent : '';
    }
  },
  { data: 'child', title: 'Child', className: 'text-start' },
  { data: 'Red', title: 'Red', className: 'text-center' },
  { data: 'LightRed', title: 'Light Red', className: 'text-center' },
  { data: 'Amber', title: 'Amber', className: 'text-center' },
  { data: 'LightGreen', title: 'Light Green', className: 'text-center' },
  { data: 'Green', title: 'Green', className: 'text-center' }
];
const projectStatusCountColumns = [
  { data: 'child', title: 'Child', className: 'text-start' },
  { data: 'Red', title: 'Red', className: 'text-center' },
  { data: 'Amber', title: 'Amber', className: 'text-center' },
  { data: 'Green', title: 'Green', className: 'text-center' }
];

const initiativeProgressCountColumns = [
  { data: 'child', title: 'Child', className: 'text-start' },
  { data: 'Inprogress', title: 'Inprogress', className: 'text-center' },
  { data: 'Completed', title: 'Completed', className: 'text-center' }
];

function generateTableHeader(tableId, columns) {
  const $table = $(tableId);
  let theadHtml = '<thead><tr>';

  columns.forEach(col => {
    theadHtml += `<th class="${col.className || ''}">${col.title || ''}</th>`;
  });

  theadHtml += '</tr></thead>';

  // Remove existing thead if any and add new thead
  $table.find('thead').remove();
  $table.prepend(theadHtml);
}

function preprocessKPIData(rawData) {
  if (rawData.length > 0 && rawData[0].parent && Array.isArray(rawData[0].children)) {
    // Grouped KPI data: flatten and add parent info
    const finalRows = [];
    rawData.forEach(group => {
      group.children.forEach((child, index) => {
        finalRows.push({
          ...child,
          parent: group.parent,
          showParent: index === 0,
          rowspan: group.children.length
        });
      });
    });
    return finalRows;
  } else {
    // Flat project data, just add flags for consistency (not used)
    return rawData.map(item => ({
      ...item,
      showParent: false,
      rowspan: 1
    }));
  }
}

let tableInstance;

function initializeDataTableOnce(tableId, ajaxUrl, columns) {
  if (!$.fn.DataTable.isDataTable('#' + tableId)) {
    tableInstance = $('#' + tableId).DataTable({
      ajax: {
        url: ajaxUrl,
        dataSrc: function (json) {
          console.log("Loaded JSON 1:", json);
          return json;
        }
      },
      columns: columns,
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
  } else {
    tableInstance.ajax.reload(); // ✅ reload fresh data
  }
}


function initializeKpiStatusCountTable(tableId, ajaxUrl, columns, preprocess, hasParentColumn) {
  
  $.getJSON(ajaxUrl, function (rawData) {
    const flattenedData = preprocess(rawData);
    generateTableHeader(tableId, columns);

     if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().clear().destroy();
    }

    const kpiTable = $(tableId).DataTable({
       destroy: true,
      data: flattenedData,
      columns: columns,
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
      },
      createdRow: hasParentColumn ? function (row, data) {
        if (!data.showParent) {
          $('td', row).eq(0).remove();
        } else {
          $('td', row).eq(0).attr('rowspan', data.rowspan);
        }
      }: undefined
    });
    // Checkbox toggle columns visibility
    // $('#kpiStatusFilterContainer input[type="checkbox"]').on('change', function () {
    //   const colIndex = parseInt($(this).data('col-index'));
    //   const isChecked = $(this).is(':checked');
    //   kpiTable.column(colIndex).visible(isChecked);
    // });
  });
}


let tableReportTemplateInstance;
let groupState = {};

function initializeReportTemplateTable(tableId, ajaxUrl, columns) {
  const $table = $('#' + tableId);

  if (!$.fn.DataTable.isDataTable($table)) {
    tableReportTemplateInstance = $table.DataTable({
      ajax: {
        url: ajaxUrl,
        dataSrc: function (json) {
          console.log("Loaded JSON:", json);
          return json.tabledata;
        }
      },
      columns: columns,
      order: [[0, 'asc']],
      rowGroup: {
        dataSrc: 'departmentName',
        startRender: function (rows, group) {
          const collapsed = !!groupState[group];
          const count = rows.count();

          const toggleIcon = collapsed
            ? '<i data-lucide="plus" style="width:14px;height:14px;"></i>'
            : '<i data-lucide="minus" style="width:14px;height:14px;"></i>';

          return $('<tr/>')
            .addClass('group-header bg-light fw-bold')
            .attr('data-group', group)
            .append(
              $('<td colspan="15" class="text-start bg-light" />').html(
                `<div class="d-flex gap-1 align-items-center"><span class="icon toggle-icon" role="button" style="cursor:pointer;">${toggleIcon}</span>${group} <span class="text-muted small">(${count} items)</span></div>`
              )
            );
        }
      },
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
        const api = this.api();

        // Hide rows for collapsed groups
        api.rows().every(function () {
          const d = this.data();
          const node = this.node();
          if (d && d.departmentName) {
            $(node).toggle(!groupState[d.departmentName]);
          }
        });

        // Render Lucide icons after table draw
        if (window.lucide) {
          lucide.createIcons();
        }

        // Keep pagination alignment
        $('.dataTables_paginate').addClass('d-flex justify-content-end');
      }
    });

    // 🔹 CLICK HANDLER — only on toggle icon
    $table.on('click', '.toggle-icon', function (e) {
      e.stopPropagation(); // prevent other click events
      const $groupRow = $(this).closest('tr.group-header');
      const group = $groupRow.data('group');

      groupState[group] = !groupState[group]; // toggle
      tableReportTemplateInstance.draw(false);
      lucide.createIcons({ width: 14, height: 14 });
    });

  } else {
    tableReportTemplateInstance.ajax.reload();
  }
}



const modalTableConfigs = [
  { modal: '#riskcount_view', tableId: 'riskStatusCountsTableView', url: 'dataRiskStatusCount.json', columns: riskStatusCountColumns },
  { modal: '#intreg_view', tableId: 'initiativeRegisterTableView', url: 'dataInitiativeRegister.json', columns: initiativeRegisterColumns },
  
  { modal: '#ermriskreg_view', tableId: 'rmriskRegisterView', url: 'ermRiskRegister.json', columns: ermRiskRegisterColumns },
  { modal: '#riskMonitoringViewModal', tableId: 'riskMonitersRegTableView', url: 'riskMoniters.json', columns: riskMonitorsColumns },
  { modal: '#kpiRegisterViewModal', tableId: 'kpiRegTableView', url: 'kpiRegister.json', columns: kpiRegisterColumns },
  { modal: '#biaRpoReportViewModal', tableId: 'biaRpoReportTableView', url: 'biaRpoReport.json', columns: biaRpoReportColumns }
];

modalTableConfigs.forEach(({ modal, tableId, url, columns }) => {
  $(modal).on('shown.bs.modal', function () {
    initializeDataTableOnce(tableId, url, columns);
  });
});

const kpiStatusModalConfigs = [
  {
    modal: '#kpiStatusCountViewModal',
    tableId: '#kpistatusCountsTableView',
    url: 'kpistatusCounts.json',
    columns: kpiStatusCountColumns,
    hasParent: true
  },
  {
    modal: '#projectStatusCountViewModal',
    tableId: '#projectStatusCountsTableView',
    url: 'projectStatusCounts.json',
    columns: projectStatusCountColumns,
    hasParent: false
  },
  {
    modal: '#initiativeProgressCountViewModal',
    tableId: '#initiativeProgressCountsTableView',
    url: 'initiativeProgressCounts.json',
    columns: initiativeProgressCountColumns,
    hasParent: false
  }
];

kpiStatusModalConfigs.forEach(({ modal, tableId, url, columns, hasParent }) => {
  $(modal).on('shown.bs.modal', function () {
    initializeKpiStatusCountTable(tableId, url, columns, preprocessKPIData, hasParent);
  });
});




 $('#reportTemplateViewModal').on('shown.bs.modal', function () {
   initializeReportTemplateTable('reportTemplateTableView', 'report-template.json', reportTemplateRiskColumns);
  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
  }, 150);
  });

     

  //    $(document).ready(function () {
  //   const modal = new bootstrap.Modal(document.getElementById('riskstatusCountsettings'));
  //   modal.show();
  // });
