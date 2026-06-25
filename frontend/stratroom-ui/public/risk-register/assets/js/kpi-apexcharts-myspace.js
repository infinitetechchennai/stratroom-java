(function() {
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function(type, listener, options) {
    const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
    
    if (passiveEvents.includes(type)) {
      if (typeof options === 'boolean') {
        // Convert boolean to object with passive: true
        options = { capture: options, passive: true };
      } else if (typeof options === 'object' && options !== null) {
        // Ensure passive is true
        options.passive = true;
      } else {
        // Default to passive: true
        options = { passive: true };
      }
    }

    originalAddEventListener.call(this, type, listener, options);
  };
})();
    var bubbleChart = {
        series: [{
          name: "Bubble1",
          data: [{
            x: 20,
            y: 54,
            z: 24,
          },],
        },
        {
          name: "Bubble2",
          data: [{
            x: 30,
            y: 24,
            z: 32,
          },],
        },
        {
          name: "Bubble3",
          data: [{
            x: 43,
            y: 34,
            z: 15,
          },],
        },
        ],
        chart: {
          height: 323,
          type: "bubble",
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
        },
        fill: {
          opacity: 0.8,
        },
        xaxis: {
          tickAmount: 12,
          type: "category",
          title: {
            text: "Period",
          },
        },
        yaxis: {
          max: 70,
          title: {
            text: "$ (thousand)",
          },
        },
      };
    var columnChart = {
        series: [{
          name: "Website Blog",
          type: "column",
          data: [440, 505, 414, 671, 227, 413, 201],
        },
        {
          name: "Social Media",
          type: "column",
          data: [23, 42, 35, 27, 43, 22, 17],
        },
        ],
        chart: {
          height: 323,
          type: "line",
        },
        stroke: {
          width: [0, 4],
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [1],
        },
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        xaxis: {
          title: {
            text: "Period",
            offsetY: 7,
          },
        },
        yaxis: [{
          title: {
            text: "$ (thousand)",
          },
        },
        {
          opposite: true,
        },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
          },
        },
      };
    var lineChart = {
        series: [{
          name: "High - 2013",
          data: [24, 29, 33, 36, 32, 32, 33],
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13],
        },
        ],
        chart: {
          height: 323,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: true,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          title: {
            text: "Month",
          },
        },
        yaxis: {
          title: {
            text: "Temperature",
          },
          min: 5,
          max: 40,
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
        },
      };
    var areaChart = {
        chart: {
          height: 323,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        series: [{
          name: "Series 1",
          data: [45, 52, 38, 45, 19, 23, 2],
        },],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          title: {
            text: "Period",
          },
        },
        yaxis: {
          title: {
            text: "$ (thousand)",
          },
        },
        legend: {
          show: true,
          position: "bottom",
          horizontalAlign: "center",
        },
      };

let activeViewMode = lineChart;
let drawChart;

function renderdrawChart(containerId, viewMode) {

  const container = document.querySelector(containerId); 
  
  // Fix: container is now defined
  if (container) {
    container.innerHTML = ""; // Clear previous chart content
    drawChart = new ApexCharts(container, viewMode); // Create chart
    drawChart.render(); // Render chart
  } else {
    console.error(`Element with ID ${containerId} not found.`);
  }
}

// Call the function with the correct container ID
renderdrawChart("#chartdiv_init",activeViewMode);

  document.querySelectorAll("#control-view .drawChart").forEach((button) => {
    button.addEventListener("click", function () {

      this.addEventListener('wheel, touchstart', function(event) {
  event.preventDefault();  // Now this is fine
}, { passive: false });

      const mode = this.dataset.value;
     // Map the button's value to the appropriate chart config

     drawChart.destroy();

    switch (mode) {
      case 'bubble':
      activeViewMode = bubbleChart;
        break;
      case 'column':
      activeViewMode = columnChart;
        break;
      case 'line':
      activeViewMode = lineChart;
        break;
      case 'area':
      activeViewMode = areaChart;
        break;
      default:
      activeViewMode = bubbleChart; // Default fallback
        break;
    }
      renderdrawChart("#chartdiv_init", activeViewMode);
      document.querySelectorAll("#control-view .drawChart ").forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

document.getElementById("bubble-large").addEventListener("shown.bs.modal", function () {
  renderdrawChart("#Bubblelarge",activeViewMode);
});
  