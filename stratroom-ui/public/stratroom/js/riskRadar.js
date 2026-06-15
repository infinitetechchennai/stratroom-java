
  const riskCategoriesFilter = [
    "Strategic Risk", "Operational Risk", "Financial Risk", "Compliance & Legal Risk",
    "Technology Risk", "Reputational Risk", "Human Capital Risk", "Environmental, Social & Governance (ESG) Risk",
    "Political Risk", "Regulatory Risk", "Market Risk", "Cybersecurity Risk", "Supply Chain Risk",
    "Project & Program Risk", "Third-Party/Vendor Risk", "Innovation & R&D Risk",
    "Health & Safety Risk", "Business Continuity & Resilience Risk", "Ethical/Conduct Risk", "Investment Risk"
  ];

  const riskCategoryPopoverTrigger = document.getElementById('popoverFilterRiskCategory');

  let riskCategoryPopover;

  const createRiskCategoryContent = () => {
    const content = document.createElement('div');
    content.innerHTML = `
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="h6 mb-0">
           <i class="fas fa-filter me-1 text-primary"></i> Filter Risk Category
          </h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <button class="btn btn-sm btn-light select-all-risk">Select All</button>
          <button class="btn btn-sm btn-light deselect-all-risk">Deselect All</button>
        </div>
        <div class="d-flex flex-column gap-2 pageViewOption" style="max-height: 300px; overflow-y: auto;">
          ${riskCategoriesFilter.map(category => `
            <div class="form-check">
              <input class="form-check-input filter-risk" id="rc-${category.replace(/\s+/g, '')}" type="checkbox" value="${category}" checked>
              <label class="form-check-label" for="rc-${category.replace(/\s+/g, '')}">${category}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return content;
  };

  riskCategoryPopover = new bootstrap.Popover(riskCategoryPopoverTrigger, {
    html: true,
    placement: 'bottom',
    content: createRiskCategoryContent,
    sanitize: false,
    container: 'body',
    trigger: 'manual'
  });

  // Open popover on button click
  riskCategoryPopoverTrigger.addEventListener('click', () => {
    riskCategoryPopover.toggle();
  });

  function filterKpiCardsByRisk() {
    const checked = Array.from(document.querySelectorAll('.filter-risk:checked')).map(cb => cb.value);
    const allChecked = checked.length === riskCategoriesFilter.length;
    const cards = document.querySelectorAll('.riskRow');

    cards.forEach(card => {
      const riskText = card.querySelector('.riCategory')?.textContent.trim();
      card.style.display = (allChecked || checked.includes(riskText)) ? '' : 'none';
    });
  }
  // Bind events
   
// filterKpiCardsByRisk();
  // Delegate interactions
  document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-close')) {
      riskCategoryPopover.hide();
    }
     document.querySelectorAll('.filter-risk').forEach(cb => {
      cb.addEventListener('change', filterKpiCardsByRisk);
    });
    if (e.target.classList.contains('select-all-risk')) {
      document.querySelectorAll('.filter-risk').forEach(cb => cb.checked = true);
      filterKpiCardsByRisk();
    }
    if (e.target.classList.contains('deselect-all-risk')) {
      document.querySelectorAll('.filter-risk').forEach(cb => cb.checked = false);
      filterKpiCardsByRisk();
    }
  });

     document.querySelectorAll(".gauge-wrapper").forEach((wrapper, index) => {
            const chartEl = wrapper.querySelector("[data-chart]");
            const needleEl = wrapper.querySelector("[data-needle]");
            const slider = wrapper.querySelector(".speedSlider");
            const defaultValue = parseInt(slider.value);
            
 const gaugeLabels = wrapper.querySelector(".gauge-labels");
             gaugeLabels && (gaugeLabels.innerHTML = `
  <span class="label low">Low</span>
  <span class="label medium">Medium</span>
  <span class="label high">High</span>
`);

            const options = {
                chart: {
                    type: 'radialBar',
                    height: 120,
                    width: 120,
                    sparkline: { enabled: true },
                    offsetY: 0,
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        track: {
                            background: "rgba(238, 238, 238, 0.8)",
                            strokeWidth: '100%',
                        },
                        dataLabels: {
                            show: false
                        },
                        hollow: {
                            size: '60%',
                        }
                    }
                },
                series: [100], // Always full to show background
                labels: ['Risk'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        gradientToColors: ['#00FF00'],
                        stops: [0, 50, 100],
                        colorStops: [
                            { offset: 0, color: "#00DD44", opacity: 0.9 },
                            { offset: 30, color: "#88DD00", opacity: 0.9 },
                            { offset: 50, color: "#FFDD00", opacity: 0.9 },
                            { offset: 70, color: "#FF8800", opacity: 0.9 },
                            { offset: 100, color: "#FF4444", opacity: 0.9 }
                        ]
                    }
                },
                stroke: {
                    lineCap: "round",
                    width: 8
                }
            };

            const chart = new ApexCharts(chartEl, options);
            chart.render();

            const updateGauge = (val) => {
                const value = parseInt(val);
                slider.value = value;
                const angle = -90 + (value * 180 / 100);
                needleEl.style.transform = `translateX(-50%) rotate(${angle}deg)`;
            };

            // Init with default
            updateGauge(defaultValue);

            // Event listener
            slider.addEventListener('input', (e) => {
                updateGauge(e.target.value);
            });

            // Optional: expose for external trigger
            wrapper.updateGauge = updateGauge;

            
        });
   