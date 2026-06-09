// $("#widget_type").change(function () {
//   var value = $(this).val().toLowerCase();
//   $(".widget").hide();
//   if (value) $("." + value).show();
// }).change();

$("#widget_type_01").change(function () {
   var value = $(this).val().toLowerCase();
   $(".widget-1").hide();
   if (value) $("." + value).show();
   // if (value === "chart-type-1") {
   //  $(".column-option").show();
   // }else{
   //  $(".column-option").hide();
   // }
}).change();

$("#widget_type_02").change(function () {
   var value = $(this).val().toLowerCase();
   $(".widget-2").hide();
   if (value) $("." + value).show();
   // if (value === "chart-type-2") {
   //  $(".column-option").show();
   // }else{
   //  $(".column-option").hide();
   // }
}).change();






$("#chart-setting-div").on("click", ".remove-btn", function (e) {
   $(this).parents(".chart-setting-clone").remove();
});
$("#add-chart-setting").click(function () {
   $("#chart-setting-div").append(`
        <div class="row g-3 chart-setting-clone">
         <div class="col-12">
            <hr style="border-top: 1px solid #505050"/>
          </div>
          <div class="col-md-12 text-end">
            <button class="btn btn-danger rounded-circle remove-btn" type="button">
              <i class="fas fa-close"></i>
            </button>
          </div>
          <div class="col-md-10">
            <label for="" class="form-label">Display Name</label>
            <input
              type="text"
              class="form-control browser-default"
            />
          </div>
          <div class="col-md-2 color_picks_1">
            <label class="form-label"
              for="sub_initative_progress"
              style="text-align: left"
              >Color</label
            >
            <div class="input-group" style="margin-bottom: 0">
              <div class="input-group-append">
                <span
                  class="input-group-text pickr"
                  style="
                    width: 90px;
                    border-radius: 0px;
                    height: 30px;
                  "
                ></span>
              </div>
            </div>
          </div>

          <div class="form-group col-md-12">
            <label for="" class="form-label">Data Field</label>
            <input
              type="text"
              class="form-control browser-default"
              id="kpi_formula"
              readonly
              data-toggle="modal"
              data-target="#kpi_formula_popup"
              role="button"
            />
            <a
              href="#"
              id="kpi_trigger1"
              data-toggle="modal"
              data-target=".kpi_formula_popup"
            ></a>
          </div>

          <div class="form-group col-md-6">
            <label for="" class="form-label">Axis</label>
            <select class="form-control browser-default">
              <option value="Y-axis">Y-axis</option>
              <option value="Z-axis">Z-axis</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="" class="form-label">Type</label>
            <select class="form-control browser-default">
              <option value="Actual">Actual</option>
              <option value="Target">Target</option>
              <option value="Budget">Budget</option>
              <option value="Forecast">Forecast</option>
              <option value="Gap">Gap</option>
            </select>
          </div>
         
        </div>`);
});

function dragStart(event) {
   event.dataTransfer.setData("dragData", event.target.id);
}

function allowDrop(event) {
   event.preventDefault();
}

function drop(event) {
   event.preventDefault();
   var data = event.dataTransfer.getData("dragData");

   //   Widget Type Text Start
   if (data == "normalTextType1") {
      $("#text-body").append(`
   <div class="card text-start text-card text-card-main border">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
              <div class="icon">
                <img width="16" height="16" src="assets/images/icons/dollar-i.svg" alt="dollar">
              </div>
              <div class="text-muted period ms-auto">
                Jan 2019 - Dec 2020
              </div>
              <div class="dropdown">
                <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                  <li>
                    <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body p-2">
              <h4 class="card-title mb-2">Total RevenueTotal RevenueTotal RevenueTotal RevenueTotal Revenue</h4>
              <h5 class="amount mb-1 mt-auto">$ 202.35 M</h5>
              <div class="d-flex gap-2 align-items-center">               
                <div class="amount-trend">$ 202.36 M</div>
                <div class="d-flex gap-1 ms-auto">
                  <a href="#kpi-story-card-modal" data-bs-toggle="modal"
                                                            class="icon link">
                                                            <img width="16" height="16"
                                                                src="assets/images/icons/link-i.svg" alt="Link">
                                                        </a>
                <span class="icon trend-low">
                  <img width="16" height="16" src="assets/images/icons/down-i.png" alt="Trend Low">
                </span>
              </div>
              </div>
            </div>
          </div>
    `);
   }
   if (data == "normalTextType2") {
      $("#text-body").append(`
      <div class="card text-start text-card text-card-main border">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
              <div class="icon">
                <img width="16" height="16" src="assets/images/icons/percent-i.svg"" alt="percent">
              </div>
              <div class="text-muted period ms-auto">
                Jan 2019 - Dec 2020
              </div>
              <div class="dropdown">
                <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                  <li>
                    <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body p-2">
              <h4 class="card-title mb-2">Total RevenueTotal RevenueTotal RevenueTotal RevenueTotal RevenueTotal Revenue </h4>
              <h5 class="amount mb-1 mt-auto">$ 202.35 M</h5>
              <div class="d-flex gap-2 align-items-center">               
                <div class="amount-trend">$ 202.36 M</div>
                <div class="d-flex gap-1 ms-auto">
                  <a href="#kpi-story-card-modal" data-bs-toggle="modal"
                                                            class="icon link">
                                                            <img width="16" height="16"
                                                                src="assets/images/icons/link-i.svg" alt="Link">
                                                        </a>
                <span class="icon trend-up">
                  <img width="16" height="16" src="assets/images/icons/up-i.png" alt="Trend Low">
                </span>
              </div>
              </div>
            </div>
          </div>`);
   }
   if (data == "chartTextType") {
      $("#text-body").append(`
     <div class="card text-start text-card text-card-main border">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
              <div class="icon">
                <img width="16" height="16" src="assets/images/icons/kpi-i.svg" alt="kpi">
              </div>
              <div class="text-muted period ms-auto">
                Jan 2019 - Dec 2020
              </div>
              <div class="dropdown">
                <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                  <li>
                    <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body p-2">
              <h4 class="card-title mb-2">Total Revenue</h4>
              <h5 class="amount mb-1 mt-auto">$ 202.35 M</h5>
              <div class="d-flex gap-2 align-items-center">               
                <div class="amount-trend">$ 202.36 M</div>
                <div class="d-flex gap-1 ms-auto">
                  <a href="#kpi-story-card-modal" data-bs-toggle="modal"
                                                            class="icon link">
                                                            <img width="16" height="16"
                                                                src="assets/images/icons/link-i.svg" alt="Link">
                                                        </a>
                <span class="icon trend-low">
                  <img width="16" height="16" src="assets/images/icons/down-i.png" alt="Trend Low">
                </span>
              </div>
              </div>
            </div>
          </div>`);
   }
   if (data == "normalTextType4") {
      $("#text-body").append(`
       <div class="card text-start text-card text-card-main border">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
              <div class="icon">
                <img width="16" height="16" src="assets/images/icons/hash-i.svg"" alt="hash">
              </div>
              <div class="text-muted period ms-auto">
                Jan 2019 - Dec 2020
              </div>
              <div class="dropdown">
                <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                  <li>
                    <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body p-2">
              <h4 class="card-title mb-2">Total Revenue</h4>
              <h5 class="amount mb-1 mt-auto">$ 202.35 M</h5>
              <div class="d-flex gap-2 align-items-center">               
                <div class="amount-trend">$ 202.36 M</div>
                <div class="d-flex gap-1 ms-auto">
                   <a href="#kpi-story-card-modal" data-bs-toggle="modal"
                                                            class="icon link">
                                                            <img width="16" height="16"
                                                                src="assets/images/icons/link-i.svg" alt="Link">
                                                        </a>
                <span class="icon trend-up">
                  <img width="16" height="16" src="assets/images/icons/up-i.png" alt="Trend Low">
                </span>
              </div>
              </div>
            </div>
          </div>`);
   }
   //   Widget Type Text End



   // bubble-chart-type-02
   if (data == "bubble-chart-type-02") {
      $("#dashboard-body").append(` <div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">

                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured) New</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm"
                                        id="datePickerBLType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>

                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID2" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="bubblechartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#bubble-large-type02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="bubblechartTab">
                                <div style="width: 100%;" id="bubblechartType02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab2"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table mb-0"
                                        id="drilldownTable2" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerBLType02");
      bubbleRenderType02();
      $("#drilldownTable2").paging({
         limit: 4
      });
      $("#tableTabID2").click(function () {
         $("#bubblechartTab").hide();
         $("#tableTab2").show();
         $("#tableTabID2").hide();
         $("#bubblechartTabID").show();
         $("#csv_option1").show();
      });
      $("#bubblechartTabID").click(function () {
         $("#tableTab2").hide();
         $("#bubblechartTab").show();
         $("#tableTabID2").show();
         $("#bubblechartTabID").hide();
         $("#csv_option1").hide();
      });
   }

   function bubbleRenderType02() {
      var options = {
         series: [{
               name: "Bubble1",
               data: [{
                  x: 20,
                  y: 54,
                  z: 24,
               }, ],
            },
            {
               name: "Bubble2",
               data: [{
                  x: 30,
                  y: 24,
                  z: 32,
               }, ],
            },
            {
               name: "Bubble3",
               data: [{
                  x: 43,
                  y: 34,
                  z: 15,
               }, ],
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
      var bubblechartType02 = new ApexCharts(
         document.querySelector("#bubblechartType02"),
         options
      ).render();
      var bubblelargeType02 = new ApexCharts(
         document.querySelector("#bubblelargeType02"),
         options
      ).render();
   }

   //bubble-chart-type-02 end


   // column-chart-type-02
   if (data == "column-chart-type-02") {
      $("#dashboard-body").append(`<div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm"
                                        id="datePickerCLType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID3" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="columnchartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#column-large-type02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="columnchartTab">
                                <div style="width: 100%;" id="columnchartType02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab3"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="drilldownTable3" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerCLType02");
      columnRenderType02();
      $("#drilldownTable3").paging({
         limit: 4
      });

      $("#tableTabID3").click(function () {
         $("#columnchartTab").hide();
         $("#tableTab3").show();
         $("#tableTabID3").hide();
         $("#columnchartTabID").show();
         $("#csv_option2").show();
      });
      $("#columnchartTabID").click(function () {
         $("#tableTab3").hide();
         $("#columnchartTab").show();
         $("#tableTabID3").show();
         $("#columnchartTabID").hide();
         $("#csv_option2").hide();
      });
   }

   function columnRenderType02() {
      var options = {
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

      var columnchartType02 = new ApexCharts(
         document.querySelector("#columnchartType02"),
         options
      ).render();
      var columnlargeType02 = new ApexCharts(
         document.querySelector("#columnlargeType02"),
         options
      ).render();
   }

   //column-chart-type-02 end


   // line-chart-type-02
   if (data == "line-chart-type-02") {
      $("#dashboard-body").append(` <div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerLType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID4" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="linechartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#line-large-type02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="linechartTab">
                                <div style="width: 100%;" id="linechartType02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab4"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="drilldownTable4" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerLType02");
      lineRenderType02();
      $("#drilldownTable4").paging({
         limit: 4
      });

      $("#tableTabID4").click(function () {
         $("#linechartTab").hide();
         $("#tableTab4").show();
         $("#tableTabID4").hide();
         $("#linechartTabID").show();
         $("#csv_option3").show();
      });
      $("#linechartTabID").click(function () {
         $("#tableTab4").hide();
         $("#linechartTab").show();
         $("#tableTabID4").show();
         $("#linechartTabID").hide();
         $("#csv_option3").hide();
      });
   }

   function lineRenderType02() {
      var options = {
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


      var linechartType02 = new ApexCharts(
         document.querySelector("#linechartType02"),
         options
      ).render();
      var linechartlargeType02 = new ApexCharts(
         document.querySelector("#linechartlargeType02"),
         options
      ).render();
   }

   //line-chart-type-02 end


   // area-chart-type-02 start
   if (data == "area-chart-type-02") {
      $("#dashboard-body").append(`   <div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm"
                                        id="datePickerARType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID1" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="areachartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#area-large-type02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="areachartTab">
                                <div style="width: 100%;" id="areachartType02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab1"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="drilldownTable1" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerARType02");
      areaRenderType02();
      $("#drilldownTable1").paging({
         limit: 4
      });

      $("#tableTabID1").click(function () {
         $("#areachartTab").hide();
         $("#tableTab1").show();
         $("#tableTabID1").hide();
         $("#areachartTabID").show();
         $("#csv_option4").show();
      });
      $("#areachartTabID").click(function () {
         $("#tableTab1").hide();
         $("#areachartTab").show();
         $("#tableTabID1").show();
         $("#areachartTabID").hide();
         $("#csv_option4").hide();
      });
   }

   function areaRenderType02() {
      var options = {
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
         }, ],
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
      var areachartType02 = new ApexCharts(
         document.querySelector("#areachartType02"),
         options
      ).render();
      var areachartlargeType02 = new ApexCharts(
         document.querySelector("#areachartlargeType02"),
         options
      ).render();
   }

   //area-chart-type-02 end

   // pie-chart-type-02 start
   if (data == "pie-chart-type-02") {
      $("#dashboard-body").append(`<div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm"
                                        id="datePickerPIEType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID5" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="piechartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#pie-large-type02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="piechartTab">
                                <div style="width: 100%;" id="piechartType02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab5"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="drilldownTable5" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerPIEType02");
      pieRenderType02();
      $("#drilldownTable5").paging({
         limit: 4
      });

      $("#tableTabID5").click(function () {
         $("#piechartTab").hide();
         $("#tableTab5").show();
         $("#tableTabID5").hide();
         $("#piechartTabID").show();
         $("#csv_option5").show();
      });
      $("#piechartTabID").click(function () {
         $("#tableTab5").hide();
         $("#piechartTab").show();
         $("#tableTabID5").show();
         $("#piechartTabID").hide();
         $("#csv_option5").hide();
      });
   }

   function pieRenderType02() {
      var options = {
         series: [44, 55, 13, 43, 22],
         chart: {
            width: 426,
            type: "pie",
         },
         labels: ["Jan", "Feb", "Mar", "Apr", "Jun"],
         responsive: [{
            breakpoint: 480,
            options: {
               chart: {
                  width: 200,
               },
               legend: {
                  position: "bottom",
                  horizontalAlign: "center",
                  floating: true,
               },
            },
         }, ],
      };

      var piechartType02 = new ApexCharts(
         document.querySelector("#piechartType02"),
         options
      ).render();
      var piechartlargeType02 = new ApexCharts(
         document.querySelector("#piechartlargeType02"),
         options
      ).render();
   }
   //pie-chart-type-02 end


   // multiaxis-chart-type-02 start
   if (data == "multiaxis-chart-type-02") {
      $("#dashboard-body").append(`<div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm"
                                        id="datePickerMAType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID6" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="multiaxischartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#multiaxis-large-type02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="multiaxischartTab">
                                <div style="width: 100%;" id="multiaxischartType02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab6"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="drilldownTable5" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerMAType02");
      multiaxisRenderType02();
      $("#drilldownTable5").paging({
         limit: 4
      });
      $("#drilldownTable6").paging({
         limit: 4
      });

      $("#tableTabID6").click(function () {
         $("#multiaxischartTab").hide();
         $("#tableTab6").show();
         $("#tableTabID6").hide();
         $("#multiaxischartTabID").show();
         $("#csv_option6").show();
      });
      $("#multiaxischartTabID").click(function () {
         $("#tableTab6").hide();
         $("#multiaxischartTab").show();
         $("#tableTabID6").show();
         $("#multiaxischartTabID").hide();
         $("#csv_option6").hide();
      });
   }

   function multiaxisRenderType02() {
      var options = {
         series: [{
               name: "Income",
               type: "column",
               data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
            },
            {
               name: "Cashflow",
               type: "column",
               data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
            },
         ],
         chart: {
            height: 323,
            type: "line",
            stacked: false,
         },
         dataLabels: {
            enabled: false,
         },
         stroke: {
            width: [1, 1, 4],
         },
         xaxis: {
            categories: [
               "Jan",
               "Feb",
               "Mar",
               "Apr",
               "May",
               "Jun",
               "Jul",
               "Aug",
            ],
            title: {
               text: "Period",
               style: {
                  color: "#555",
               },
            },
         },
         yaxis: [{
               axisTicks: {
                  show: true,
               },
               axisBorder: {
                  show: true,
                  color: "#008FFB",
               },
               labels: {
                  style: {
                     colors: "#008FFB",
                  },
               },
               title: {
                  text: "Income (thousand crores)",
                  style: {
                     color: "#008FFB",
                  },
               },
               tooltip: {
                  enabled: true,
               },
            },
            {
               seriesName: "Income",
               opposite: true,
               axisTicks: {
                  show: true,
               },
               axisBorder: {
                  show: true,
                  color: "#00E396",
               },
               labels: {
                  style: {
                     colors: "#00E396",
                  },
               },
               title: {
                  text: "Operating Cashflow (thousand crores)",
                  style: {
                     color: "#00E396",
                  },
               },
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
         legend: {
            horizontalAlign: "center",
         },
      };


      var multiaxischartType02 = new ApexCharts(
         document.querySelector("#multiaxischartType02"),
         options
      ).render();
      var multiaxislargeType02 = new ApexCharts(
         document.querySelector("#multiaxislargeType02"),
         options
      ).render();
   }
   //multiaxis-chart-type-02 end


   // stacked-chart-type-02 start
   if (data == "stacked-chart-type-02") {
      $("#dashboard-body").append(` <div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm"
                                        id="datePickerSTType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID7" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="stackedchartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#stacked-large-type02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="stackedchartTab">
                                <div style="width: 100%;" id="stackedchartType02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="drilldownTable7"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="drilldownTable5" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerSTType02");
      stackedRenderType02();
      $("#drilldownTable7").paging({
         limit: 4
      });

      $("#tableTabID7").click(function () {
         $("#stackedchartTab").hide();
         $("#tableTab7").show();
         $("#tableTabID7").hide();
         $("#stackedchartTabID").show();
         $("#csv_option7").show();
      });
      $("#stackedchartTabID").click(function () {
         $("#tableTab7").hide();
         $("#stackedchartTab").show();
         $("#tableTabID7").show();
         $("#stackedchartTabID").hide();
         $("#csv_option7").hide();
      });
   }

   function stackedRenderType02() {
      var options = {
         series: [{
               name: "Marine Sprite",
               data: [44, 55, 41, 37, 22, 43, 21],
            },
            {
               name: "Striking Calf",
               data: [53, 32, 33, 52, 13, 43, 32],
            },
            {
               name: "Tank Picture",
               data: [12, 17, 11, 9, 15, 11, 20],
            },
            {
               name: "Bucket Slope",
               data: [9, 7, 5, 8, 6, 9, 4],
            },
            {
               name: "Reborn Kid",
               data: [25, 12, 19, 32, 25, 24, 10],
            },
         ],
         chart: {
            type: "bar",
            height: 323,
            stacked: true,
         },
         plotOptions: {
            bar: {
               horizontal: true,
            },
         },
         stroke: {
            width: 1,
            colors: ["#fff"],
         },
         xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            title: {
               text: "Period",
            },
            labels: {
               formatter: function (val) {
                  return val + "K";
               },
            },
         },
         yaxis: {
            title: {
               text: "$ (thousand)",
            },
         },
         tooltip: {
            y: {
               formatter: function (val) {
                  return val + "K";
               },
            },
         },
         fill: {
            opacity: 1,
         },
         legend: {
            position: "bottom",
            horizontalAlign: "center",
         },
      };

      var stackedchartType02 = new ApexCharts(
         document.querySelector("#stackedchartType02"),
         options
      ).render();
      var stackedlargeType02 = new ApexCharts(
         document.querySelector("#stackedlargeType02"),
         options
      ).render();
   }
   //stacked-chart-type-02 end


   // negativeColumn-chart-type-02 start
   if (data == "negativeColumn-chart-type-02") {
      $("#dashboard-body").append(` <div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="ncc-dp-type-02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-light p-1 fas fa-table" id="tableTabID8" style=""></i>
                                    <i class="btn btn-light p-1 fas fa-chart-line" id="negativecolumnTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#ncc-lg-type-02"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="negativecolumnchartTab">
                                <div style="width: 100%;" id="ncc-type-02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab8"
                                style="display: none;">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="ncc-table-type-02" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#ncc-dp-type-02");
      nccRenderType02();
      $("#ncc-table-type-02").paging({
         limit: 4
      });
      $("#tableTabID8").click(function () {
         $("#negativecolumnchartTab").hide();
         $("#tableTab8").show();
         $("#tableTabID8").hide();
         $("#negativecolumnTabID").show();
         $("#csv_option8").show();
      });
      $("#negativecolumnTabID").click(function () {
         $("#tableTab8").hide();
         $("#negativecolumnchartTab").show();
         $("#tableTabID8").show();
         $("#negativecolumnTabID").hide();
         $("#csv_option8").hide();
      });
   }

   function nccRenderType02() {
      var options = {
         series: [{
            name: "Cash Flow",
            data: [
               1.45,
               5.42,
               5.9,
               -0.42,
               -12.6,
               -18.1,
               -18.2,
               -14.16,
               -11.1,
               -6.09,
               0.34,
               3.88,
               13.07,
               5.8,
               2,
               7.37,
               8.1,
               13.57,
               15.75,
               17.1,
               19.8,
               -27.03,
               -54.4,
               -47.2,
               -43.3,
               -18.6,
               -48.6,
               -41.1,
               -39.6,
               -37.6,
               -29.4,
               -21.4,
               -2.4,
            ],
         }, ],
         chart: {
            type: "bar",
            height: 323,
         },
         plotOptions: {
            bar: {
               colors: {
                  ranges: [{
                        from: -100,
                        to: -46,
                        color: "#F15B46",
                     },
                     {
                        from: -45,
                        to: 0,
                        color: "#FEB019",
                     },
                  ],
               },
               columnWidth: "80%",
            },
         },
         dataLabels: {
            enabled: false,
         },
         yaxis: {
            title: {
               text: "$ (thousand)",
            },
            labels: {
               formatter: function (y) {
                  return y.toFixed(0) + "%";
               },
            },
         },
         xaxis: {
            type: "datetime",
            title: {
               text: "Period",
            },
            categories: [
               "2011-01-01",
               "2011-02-01",
               "2011-03-01",
               "2011-04-01",
               "2011-05-01",
               "2011-06-01",
               "2011-07-01",
               "2011-08-01",
               "2011-09-01",
               "2011-10-01",
               "2011-11-01",
               "2011-12-01",
               "2012-01-01",
               "2012-02-01",
               "2012-03-01",
               "2012-04-01",
               "2012-05-01",
               "2012-06-01",
               "2012-07-01",
               "2012-08-01",
               "2012-09-01",
               "2012-10-01",
               "2012-11-01",
               "2012-12-01",
               "2013-01-01",
               "2013-02-01",
               "2013-03-01",
               "2013-04-01",
               "2013-05-01",
               "2013-06-01",
               "2013-07-01",
               "2013-08-01",
               "2013-09-01",
            ],
            labels: {
               rotate: -90,
            },
         },
         legend: {
            position: "bottom",
            horizontalAlign: "center",
            floating: true,
            offsetY: 30,
         },
      };
      var ncctype02 = new ApexCharts(
         document.querySelector("#ncc-type-02"),
         options
      ).render();
      var nccmodaltype02 = new ApexCharts(
         document.querySelector("#ncc-modal-type-02"),
         options
      ).render();
   }
   //negativeColumn-chart-type-02 end






   // bubble-dchart-type-02 start
   if (data == "bubble-dchart-type-02") {
      $("#dashboard-body").append(`<div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured) New</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="bdc-dp-type-02" />
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>

                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body row">
                            <div class="col-12 col-md-6">
                                <div style="width: 100%;" id="bdc-type-02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="table-responsive" style="height: 326px;">
                                    <table id="bdc-table-type-02"
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table mb-0">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#bdc-dp-type-02");
      bdcRenderType02();
      $("#bdc-table-type-02").paging({
         limit: 4
      });
     
      
   }

   function bdcRenderType02() {
      var options = {
         series: [{
               name: "Bubble1",
               data: [{
                  x: 20,
                  y: 54,
                  z: 24,
               }, ],
            },
            {
               name: "Bubble2",
               data: [{
                  x: 30,
                  y: 24,
                  z: 32,
               }, ],
            },
            {
               name: "Bubble3",
               data: [{
                  x: 43,
                  y: 34,
                  z: 15,
               }, ],
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
      var bdctype02 = new ApexCharts(
         document.querySelector("#bdc-type-02"),
         options
      ).render();
   }
   //bubble-dchart-type-02 end


   
   // column-dchart-type-02 start
   if (data == "column-dchart-type-02") {
      $("#dashboard-body").append(` <div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="cdc-dp-type-02" />
                                </div>
                            </div>
                            <div class="card-actions">


                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>

                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body row">
                            <div class="col-12 col-md-6">
                                <div style="width: 100%;" id="cdc-type-02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="cdc-table-type-02" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#cdc-dp-type-02");
      cdcRenderType02();
      $("#cdc-table-type-02").paging({
         limit: 4
      });
   }

   function cdcRenderType02() {
      var options = {
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

      var cdctype02 = new ApexCharts(
         document.querySelector("#cdc-type-02"),
         options
      ).render();
     
   }

   //column-dchart-type-02 end



 // line-dchart-type-02
   if (data == "line-dchart-type-02") {
      $("#dashboard-body").append(` <div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="ldc-dp-02" />
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>

                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body row">
                            <div class="col-12 col-md-6">
                                <div style="width: 100%;" id="ldc-type-02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="ldc-table-02" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#ldc-dp-02");
      ldcRenderType02();
      $("#ldc-table-02").paging({
         limit: 4
      });
   }

   function ldcRenderType02() {
      var options = {
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


      var ldctype02 = new ApexCharts(
         document.querySelector("#ldc-type-02"),
         options
      ).render();
   }

   //line-dchart-type-02 end


   // area-dchart-type-02 start
   if (data == "area-dchart-type-02") {
      $("#dashboard-body").append(` <div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="adc-dp-02" />
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>

                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body row">
                            <div class="col-12 col-md-6">
                                <div style="width: 100%;" id="adc-type-02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="adc-table-02">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#adc-dp-02");
      adcRenderType02();
      $("#adc-table-02").paging({
         limit: 4
      });
   }

   function adcRenderType02() {
      var options = {
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
         }, ],
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
      var adcRenderType02 = new ApexCharts(
         document.querySelector("#adc-type-02"),
         options
      ).render();     
   }
   // area-dchart-type-02 end
  // multiaxis-dchart-type-02 start
  if (data == "multiaxis-dchart-type-02") {
   $("#dashboard-body").append(`<div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div
                            class="card-header">
                            <div class="c-header-left">
                            <h5 class="card-title">
                                <strong editable="true" contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)">% Customer
                                    conversion rate (measured)</strong>
                            </h5>
                            <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="mdc-dp-02" />
                                </div>
                            </div>
                            <div class="card-actions">
                               
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>

                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body row">
                            <div class="col-12 col-md-6">
                                <div style="width: 100%;" id="mdc-type-02"></div>
                                <div id="tagNew"></div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="table-responsive" style="height: 326px;">
                                    <table
                                        class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                        id="mdc-table-02" style="margin-bottom: 0px !important;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="width: 40px;">
                                                    <i class="fas fa-arrow-up"></i>
                                                    <i class="fas fa-arrow-down"></i>
                                                </th>
                                                <th rowspan="2" style="width: 198px;">
                                                    Name/Period
                                                </th>
                                                <th colspan="4">
                                                    Q1 2020
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="width: 98px;">Actual</th>
                                                <th style="width: 98px;">Target</th>
                                                <th style="width: 98px;">Baseline</th>
                                                <th style="width: 98px;">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Sales and Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-down"></i></td>
                                                <td>Human Resource and admin</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Product Design</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Development Process</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                            <tr>
                                                <td><i class="fas fa-arrow-up"></i></td>
                                                <td>Marketing</td>
                                                <td>28.53425%</td>
                                                <td>24.53425%</td>
                                                <td>38.53425%</td>
                                                <td>24.53425%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
   initDateRangePicker("#mdc-dp-02");
   mdcRenderType02();
   $("#mdc-table-02").paging({
      limit: 4
   });
}

function mdcRenderType02() {
   var options = {
      series: [{
            name: "Income",
            type: "column",
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
         },
         {
            name: "Cashflow",
            type: "column",
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
         },
      ],
      chart: {
         height: 323,
         type: "line",
         stacked: false,
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         width: [1, 1, 4],
      },
      xaxis: {
         categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
         ],
         title: {
            text: "Period",
            style: {
               color: "#555",
            },
         },
      },
      yaxis: [{
            axisTicks: {
               show: true,
            },
            axisBorder: {
               show: true,
               color: "#008FFB",
            },
            labels: {
               style: {
                  colors: "#008FFB",
               },
            },
            title: {
               text: "Income (thousand crores)",
               style: {
                  color: "#008FFB",
               },
            },
            tooltip: {
               enabled: true,
            },
         },
         {
            seriesName: "Income",
            opposite: true,
            axisTicks: {
               show: true,
            },
            axisBorder: {
               show: true,
               color: "#00E396",
            },
            labels: {
               style: {
                  colors: "#00E396",
               },
            },
            title: {
               text: "Operating Cashflow (thousand crores)",
               style: {
                  color: "#00E396",
               },
            },
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
      legend: {
         horizontalAlign: "center",
      },
   };
   var mdctype02 = new ApexCharts(
      document.querySelector("#mdc-type-02"),
      options
   ).render();
  
}
//multiaxis-dchart-type-02 end













   //   Widget Type Chart Start
   if (data == "BubbleChart") {
      $("#dashboard-body")
         .append(` <div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">

                            <div class="c-header-left">
                                <h5 class="card-title"><strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerBL" />
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#bubble-large"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div style="width: 100%;" id="Bubblechart"></div>
                            <div id="tag"></div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerBL");
      bubbleRender();
   }

   function bubbleRender() {
      var options = {
         series: [{
               name: "Bubble1",
               data: [{
                  x: 20,
                  y: 54,
                  z: 24,
               }, ],
            },
            {
               name: "Bubble2",
               data: [{
                  x: 30,
                  y: 24,
                  z: 32,
               }, ],
            },
            {
               name: "Bubble3",
               data: [{
                  x: 43,
                  y: 34,
                  z: 15,
               }, ],
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

      var chart = new ApexCharts(
         document.querySelector("#Bubblechart"),
         options
      ).render();
      var bubbleChart = new ApexCharts(
         document.querySelector("#Bubblelarge"),
         options
      ).render();
   }

   if (data == "ColumnChart") {
      $("#dashboard-body")
         .append(` <div class="g-col-12 g-col-md-6">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title"><strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer conversion rate
                                        (measured)</strong></h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerCL" />
                                </div>

                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#column-large"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>

                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div class="card-body">
                            <div id="Columnchart"></div>
                            <div id="tag"></div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerCL");
      columnRender();
   }

   function columnRender() {
      var options = {
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

      var chart = new ApexCharts(
         document.querySelector("#Columnchart"),
         options
      ).render();
      var columnChart = new ApexCharts(
         document.querySelector("#Columnlarge"),
         options
      ).render();
   }


   if (data == "LineChart") {
      $("#dashboard-body")
         .append(` <div class="g-col-12 g-col-md-6 chart">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerL" />
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#line-large"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div class="card-body">
                            <div id="Linechart"></div>
                            <div id="tag"></div>
                        </div>
                    </div>
                </div>`);

      initDateRangePicker("#datePickerL");
      lineRender();
   }

   function lineRender() {
      var options = {
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

      var chart = new ApexCharts(
         document.querySelector("#Linechart"),
         options
      ).render();
      var bubbleChart = new ApexCharts(
         document.querySelector("#Linelarge"),
         options
      ).render();
   }


   if (data == "AreaChart") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6 chart">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer conversion rate
                                        (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerAR" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#area-large"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="Areachart"></div>
                            <div id="tag"></div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerAR");
      areaRender();
   }

   function areaRender() {
      var options = {
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
         }, ],
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

      var chart = new ApexCharts(
         document.querySelector("#Areachart"),
         options
      ).render();
      var areaChart = new ApexCharts(
         document.querySelector("#Arealarge"),
         options
      ).render();
   }

   if (data == "PieChart") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6 chart">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer conversion rate
                                        (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerPIE" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#pie-large"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="Piechart"></div>
                            <div id="tag"></div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerPIE");
      pieRender();
   }

   function pieRender() {
      var options = {
         series: [44, 55, 13, 43, 22],
         chart: {
            width: 426,
            type: "pie",
         },
         labels: ["Jan", "Feb", "Mar", "Apr", "Jun"],
         responsive: [{
            breakpoint: 480,
            options: {
               chart: {
                  width: 200,
               },
               legend: {
                  position: "bottom",
                  horizontalAlign: "center",
                  floating: true,
               },
            },
         }, ],
      };

      var chart = new ApexCharts(
         document.querySelector("#Piechart"),
         options
      ).render();
      var pieChart = new ApexCharts(
         document.querySelector("#Pielarge"),
         options
      ).render();
   }


   if (data == "WaterfallChart") {
      $("#dashboard-body")
         .append(` <div class="g-col-12 g-col-md-6 chart">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer conversion rate
                                        (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerWF" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#waterfall-large"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="Waterfallchart"></div>
                            <div id="tag"></div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerWF");
      waterfallRender();
   }

   function waterfallRender() {
      var options = {
         series: [{
               data: [{
                     x: "Jan",
                     y: [1, 5],
                  },
                  {
                     x: "Feb",
                     y: [4, 6],
                  },
                  {
                     x: "Mar",
                     y: [5, 8],
                  },
                  {
                     x: "Apr",
                     y: [3, 11],
                  },
               ],
            },
            {
               data: [{
                     x: "Jan",
                     y: [2, 6],
                  },
                  {
                     x: "Feb",
                     y: [1, 3],
                  },
                  {
                     x: "Mar",
                     y: [7, 8],
                  },
                  {
                     x: "Apr",
                     y: [5, 9],
                  },
               ],
            },
         ],
         chart: {
            type: "rangeBar",
            height: 323,
         },
         plotOptions: {
            bar: {
               horizontal: false,
            },
         },
         dataLabels: {
            enabled: true,
         },
         legend: {
            position: "bottom",
            horizontalAlign: "center",
         },
         xaxis: {
            title: {
               text: "Period",
            },
         },
         yaxis: {
            title: {
               text: "$ (thousand)",
            },
         },
      };

      var chart = new ApexCharts(
         document.querySelector("#Waterfallchart"),
         options
      ).render();
      var waterfallChart = new ApexCharts(
         document.querySelector("#Waterfalllarge"),
         options
      ).render();
   }

   if (data == "MultiAxis") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6 chart">
  <div class="card custom-card map-card h-100">
    <div class="card-header">
        <div class="c-header-left">
      <h5 class="card-title">
        <strong
        editable="true"
        contenteditable="true"
        onkeypress="return (this.innerText.length <= 36)"
        >% Customer conversion rate (measured)</strong
        >
      </h5>
      <div class="date-picker">
        <input class="top_datepicker form-control form-control-sm" id="datePickerMA"/>
      </div>
      </div>
      <div class="card-actions">
     
      <div class="dropdown">
        <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
          <li>
            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" onclick="return false;">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#multiaxis-large" data-bs-toggle="modal">Enlarge</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <div class="card-body">
      <div id="Multiaxis"></div>
      <div id="tag"></div>
    </div>
  </div>
</div>`);
      initDateRangePicker("#datePickerMA");
      multiaxisRender();
   }

   function multiaxisRender() {
      var options = {
         series: [{
               name: "Income",
               type: "column",
               data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
            },
            {
               name: "Cashflow",
               type: "column",
               data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
            },
         ],
         chart: {
            height: 323,
            type: "line",
            stacked: false,
         },
         dataLabels: {
            enabled: false,
         },
         stroke: {
            width: [1, 1, 4],
         },
         xaxis: {
            categories: [
               "Jan",
               "Feb",
               "Mar",
               "Apr",
               "May",
               "Jun",
               "Jul",
               "Aug",
            ],
            title: {
               text: "Period",
               style: {
                  color: "#555",
               },
            },
         },
         yaxis: [{
               axisTicks: {
                  show: true,
               },
               axisBorder: {
                  show: true,
                  color: "#008FFB",
               },
               labels: {
                  style: {
                     colors: "#008FFB",
                  },
               },
               title: {
                  text: "Income (thousand crores)",
                  style: {
                     color: "#008FFB",
                  },
               },
               tooltip: {
                  enabled: true,
               },
            },
            {
               seriesName: "Income",
               opposite: true,
               axisTicks: {
                  show: true,
               },
               axisBorder: {
                  show: true,
                  color: "#00E396",
               },
               labels: {
                  style: {
                     colors: "#00E396",
                  },
               },
               title: {
                  text: "Operating Cashflow (thousand crores)",
                  style: {
                     color: "#00E396",
                  },
               },
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
         legend: {
            horizontalAlign: "center",
         },
      };

      var chart = new ApexCharts(
         document.querySelector("#Multiaxis"),
         options
      ).render();

      var multiChart = new ApexCharts(
         document.querySelector("#Multiaxislarge"),
         options
      ).render();
   }

   if (data == "StackedChart") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6 chart">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">% Customer conversion rate
                                        (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerST" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#Stackedchart-large"
                                                data-bs-toggle="modal">Enlarge</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="Stackedchart"></div>
                            <div id="tag"></div>
                        </div>
                    </div>
                </div>`);
      initDateRangePicker("#datePickerST");
      stackedRender();
   }

   function stackedRender() {
      var options = {
         series: [{
               name: "Marine Sprite",
               data: [44, 55, 41, 37, 22, 43, 21],
            },
            {
               name: "Striking Calf",
               data: [53, 32, 33, 52, 13, 43, 32],
            },
            {
               name: "Tank Picture",
               data: [12, 17, 11, 9, 15, 11, 20],
            },
            {
               name: "Bucket Slope",
               data: [9, 7, 5, 8, 6, 9, 4],
            },
            {
               name: "Reborn Kid",
               data: [25, 12, 19, 32, 25, 24, 10],
            },
         ],
         chart: {
            type: "bar",
            height: 323,
            stacked: true,
         },
         plotOptions: {
            bar: {
               horizontal: true,
            },
         },
         stroke: {
            width: 1,
            colors: ["#fff"],
         },
         xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            title: {
               text: "Period",
            },
            labels: {
               formatter: function (val) {
                  return val + "K";
               },
            },
         },
         yaxis: {
            title: {
               text: "$ (thousand)",
            },
         },
         tooltip: {
            y: {
               formatter: function (val) {
                  return val + "K";
               },
            },
         },
         fill: {
            opacity: 1,
         },
         legend: {
            position: "bottom",
            horizontalAlign: "center",
         },
      };

      var chart = new ApexCharts(
         document.querySelector("#Stackedchart"),
         options
      ).render();
      var stackedChart = new ApexCharts(
         document.querySelector("#Stackedlarge"),
         options
      ).render();
   }


   if (data == "RadialMulti") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6 chart">
  <div class="card custom-card map-card h-100">
    <div class="card-header">
        <div class="c-header-left">
      <h5 class="card-title">
        <strong
        editable="true"
        contenteditable="true"
        onkeypress="return (this.innerText.length <= 36)"
        >% Customer conversion rate (measured)</strong
        >
      </h5>
      <div class="date-picker">
        <input class="top_datepicker form-control form-control-sm" id="datePickerRM"/>
      </div>
      </div>
      <div class="card-actions">
    
      <div class="dropdown">
        <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
          <li>
            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" onclick="return false;">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#radial-large" data-bs-toggle="modal">Enlarge</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <div class="card-body">
      <div id="RadialMultichart"></div>
      <div id="tag"></div>
    </div>
  </div>
</div>`);
      initDateRangePicker("#datePickerRM");
      radialmultipleRender();
   }

   function radialmultipleRender() {
      var options = {
         series: [44, 55, 67, 83],
         chart: {
            height: 336,
            type: "radialBar",
         },
         plotOptions: {
            radialBar: {
               dataLabels: {
                  name: {
                     fontSize: "22px",
                  },
                  value: {
                     fontSize: "16px",
                  },
                  total: {
                     show: true,
                     label: "Total",
                     formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 249;
                     },
                  },
               },
            },
         },
         labels: ["Jan", "Feb", "Mar", "Apr"],
      };

      var chart = new ApexCharts(
         document.querySelector("#RadialMultichart"),
         options
      ).render();
      var radialmultipleChart = new ApexCharts(
         document.querySelector("#RadialMultilarge"),
         options
      ).render();
   }

   //   Widget Type Chart End

   //   Widget Type Table Start
   if (data == "drilldownDragDiv") {
      $("#dashboard-body").append(` <div class="g-col-12">
                    <div class="card custom-card table-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Drill Down Table</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker14" />
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#drilldown_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#drilldown_view" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div class="card-body table-container">
                            <div class="table-responsive">
                                <table class="table table-bordered dashboard-task-infos align-center dashboard-table"
                                    id="drilldownTable">
                                    <thead class="bg-light">
                                        <tr>
                                            <th rowspan="2" style="width: 40px;">
                                                <i class="fas fa-arrow-up"></i>
                                                <i class="fas fa-arrow-down"></i>
                                            </th>
                                            <th rowspan="2" style="width: 198px;">
                                                Name/Period
                                            </th>
                                            <th colspan="3">
                                                Q1 2020
                                            </th>
                                        </tr>
                                        <tr>
                                            <th style="width: 98px;">Actual</th>
                                            <th style="width: 98px;">Target</th>
                                            <th style="width: 98px;">Gap</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Sales and Marketing</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td>Human Resource and admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Product Design</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Development Process</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Marketing</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td>Admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td>Admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td>Admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Sales and Marketing</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td>Human Resource and admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Product Design</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Development Process</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr>
                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td>Marketing</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="navigation-wrap"></div>
                        </div>
                    </div>
                </div>`);
      $(document).ready(function () {
         $("#drilldownTable").paging({
            limit: 6
         });
      });
      initDateRangePicker("#datePicker14");
      drilldownRender();

   }

   if (data == "kpidrilldownDragDiv") {
      $("#dashboard-body").append(`<div class="g-col-12">
                    <div class="card custom-card table-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">KPI Drill Down Table</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker15" />
                                </div>
                            </div>
                            <div class="card-actions">


                                <div class="dropdown">
                                    <button class="btn btn-light p-1 show" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#drilldown_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#drilldown_view" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div class="card-body table-container">
                            <div class="table-responsive">
                                <table
                                    class="table table-bordered dashboard-task-infos align-center dashboard-table kpidrilldownTable"
                                    id="kpidrilldownTable">
                                    <thead>
                                        <tr>

                                            <th rowspan="2" style="width: 45px;">
                                                <i class="fas fa-arrow-up"></i>
                                                <i class="fas fa-arrow-down"></i>
                                            </th>
                                            <th rowspan="2" style="width: 80px;">
                                                Status
                                            </th>
                                            <th rowspan="2" style="width: 240px;">
                                                Name/Period
                                            </th>
                                            <th colspan="4">
                                                Q1 2020
                                            </th>
                                        </tr>
                                        <tr>
                                            <th style="width: 128px;">Actual</th>
                                            <th style="width:128px;">Target</th>
                                            <th style="width: 140px;">Gap</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></i></td>
                                            <td id="name"><i class=" fa fa-angle-down" id="fafa"></i>Sales and Marketing
                                            </td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</i></td>
                                        </tr>

                                        <tr class="cchild " id="child1">

                                            <td></td>
                                            <td></td>
                                            <td id="name">Sales and Marketing <br />- SubMeasure</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="cchild " id="child2">

                                            <td></td>
                                            <td></td>
                                            <td id="name">Sales and Marketing <br />- SubMeasure</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>

                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td><i class="fas fa-flag" style="color:red"></td>
                                            <td id="name"><i class=" fa fa-angle-down" id="fafa"></i>Human Resource
                                                <br />and admin
                                            </td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425% </td>
                                        </tr>
                                        <tr class="cchild active">

                                            <td></td>
                                            <td></td>
                                            <td id="name">Human Resource and<br /> admin - Submeasure</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td><i class="fas fa-flag" style="color:yellow"></td>
                                            <td id="name">Product Design</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Development Process</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Marketing</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>

                                        </tr>
                                        <tr class="parent">


                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td><i class="fas fa-flag" style="color:red"></td>
                                            <td id="name">Sales and Marketing</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-down"></i></td>
                                            <td><i class="fas fa-flag" style="color:red"></td>
                                            <td id="name">Human Resource and admin</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Product Design</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">
                                            <td><i class="fas fa-arrow-up"></i></td>


                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Development Process</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                        <tr class="parent">

                                            <td><i class="fas fa-arrow-up"></i></td>
                                            <td><i class="fas fa-flag" style="color:green"></td>
                                            <td id="name">Marketing</td>
                                            <td>28.53425%</td>
                                            <td>24.53425%</td>
                                            <td>38.53425%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="navigation-wrap"></div>
                        </div>
                    </div>
                </div>`);
      $(document).ready(function () {
         $(".kpidrilldownTable").paging({
            limit: 5
         });
         $('table').on('click', 'tr.parent #fafa', function (event) {
            event.stopPropagation();
            $(this).closest('tr.parent').toggleClass('open');
            $(this).closest('tr.parent').nextUntil('tr.parent').toggle();

         });
         $('td i').click(function () {
            $(this).toggleClass('fa fa-angle-down');
            $(this).toggleClass('fa fa-angle-right');
         });


      });

      initDateRangePicker("#datePicker15");

      drilldownRender();
   }

   if (data == "kpistatusCount") {
      $("#dashboard-body").append(`<div class="g-col-12 select-toggle myinitiative sub_initiatives">
                    <div class="card custom-card table-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">KPI Status Count </strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker18" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#kpistatusCountsettingsModal"
                                                data-bs-toggle="modal">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#kpicount_view"
                                                data-bs-toggle="modal">View</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body table-container">
                            <div class="table-responsive">
                                <table
                                    class="table table-bordered  dashboard-task-infos align-center dashboard-table kpistatusCount"
                                    id="kpistatusCountsettings">
                                    <thead>
                                        <tr>

                                            <th editable="true" contenteditable="true" style="width: 150px;">
                                                Parent
                                            </th>
                                            <th editable="true" contenteditable="true" style="width: 150px;">Child</th>
                                            <th editable="true" contenteditable="true" style="width:50px;">Red</th>
                                            <th editable="true" contenteditable="true" style="width: 50px;">Amber</th>
                                            <th editable="true" contenteditable="true" style="width: 50px;">Green</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <th id=parent rowspan="2">Technology</th>
                                            <td class=child>Infra</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green">3 </td>
                                        </tr>
                                        <tr>

                                            <td class=child>Project New</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>
                                        <tr>

                                            <th id=parent rowspan="2">Branding</th>
                                            <td class=child>Brand Planning</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green">3 </td>
                                        </tr>
                                        <tr>

                                            <td class=child>Accounting</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>
                                        <tr>

                                            <th id=parent rowspan="3">IED Stategy</th>
                                            <td class=child>Trainer</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green">3 </td>
                                        </tr>
                                        <tr>

                                            <td class=child>Administration officers</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>
                                        <tr>

                                            <td class=child>Auxiliary Staff</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                            <div class="navigation-wrap"></div>
                        </div>
                    </div>
                </div>`);
      $(document).ready(function () {
         $(".kpistatusCount").paging({
            limit: 8
         });



      });
      initDateRangePicker("#datePicker18");
      drilldownRender();
   }

   if (data == "projectstatusCount") {
      $("#dashboard-body").append(`<div class="g-col-12 select-toggle myinitiative sub_initiatives">
                    <div class="card custom-card table-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Project Status
                                        Count </strong>
                                </h5>
                                <div class="date-picker ">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker19" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-light p-1" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#kpistatusCountsettingsModal"
                                                data-bs-toggle="modal" onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#kpicount_view" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                        </div>

                        <div class="card-body table-container">
                            <div class="table-responsive">
                                <table
                                    class="table table-bordered dashboard-task-infos align-center dashboard-table kpistatusCount"
                                    id="kpistatusCountsettings">
                                    <thead>
                                        <tr>

                                            <th editable="true" contenteditable="true" style="width: 150px;">
                                                Parent
                                            </th>
                                            <th editable="true" contenteditable="true" style="width: 150px;">Child</th>
                                            <th editable="true" contenteditable="true" style="width:50px;">Red</th>
                                            <th editable="true" contenteditable="true" style="width: 50px;">Amber</th>
                                            <th editable="true" contenteditable="true" style="width: 50px;">Green</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <th id=parent rowspan="2">Technology</th>
                                            <td class=child>Infra</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green">3 </td>
                                        </tr>
                                        <tr>

                                            <td class=child>Project New</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>
                                        <tr>

                                            <th id=parent rowspan="2">Branding</th>
                                            <td class=child>Brand Planning</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green">3 </td>
                                        </tr>
                                        <tr>

                                            <td class=child>Accounting</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>
                                        <tr>

                                            <th id=parent rowspan="3">IED Stategy</th>
                                            <td class=child>Trainer</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green">3 </td>
                                        </tr>
                                        <tr>

                                            <td class=child>Administration officers</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>
                                        <tr>

                                            <td class=child>Auxiliary Staff</td>
                                            <td id="Red">1</td>
                                            <td id="amber">2</td>
                                            <td id="green"> 3</td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                            <div class="navigation-wrap"></div>
                        </div>
                    </div>
                </div>`);
      $(document).ready(function () {
         $(".kpistatusCount").paging({
            limit: 8
         });
      });
      initDateRangePicker("#datePicker19");
      drilldownRender();
   }

   if (data == "riskstatusCount") {
      $("#dashboard-body").append(`
        <div class="g-col-12 select-toggle myinitiative sub_initiatives">
          <div class="card table-card border h-100">
            <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
              <h5 class="card-title fs-6 mb-0">
                <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Risk Status Count</strong>
              </h5>
              <div class="d-flex gap-3">
                <div class="date-picker ">
                  <input class="top_datepicker form-control form-control-sm" id="datePicker17" />
                </div>
        
        
                <div class="dropdown">
                  <button class="btn btn-link p-1" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li>
                      <a class="dropdown-item" href="#riskstatusCountsettings" data-bs-toggle="modal"
                        onclick="return false;">Settings</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#riskcount_view" data-bs-toggle="modal" onclick="return false;">View</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                    </li>
                  </ul>
                </div>
        
        
              </div>
            </div>
            
            <div class="card-body table-container">
              <div class="table-responsive">
                <table class="table table-bordered dashboard-task-infos align-center dashboard-table kpistatusCount"
                  id="kpistatusCountsettings">
                  <thead>
                    <tr>
                      
                        <th  class="pjparent"
                      style="width: 150px; ">
                      <strong
                      editable="true"
                      contenteditable="true"
                      onkeypress="return (this.innerText.length <= 36)"
                        >Department  </strong
                      > 
                       
                      </th>
                  
                      <th class="pjgren"
                    style="width:50px;">
                    <strong
                    editable="true"
                    contenteditable="true"
                    onkeypress="return (this.innerText.length <= 25)"
                      >Low</strong
                    </th>
                      <th class="pjamber"
                    style="width: 50px;">
                    <strong
                    editable="true"
                    contenteditable="true"
                    onkeypress="return (this.innerText.length <= 25)"
                      >Medium</strong</th>
                   
                      <th class="pjchilld"
                     style="width: 50px;">
                     <strong
                    editable="true"
                    contenteditable="true"
                    onkeypress="return (this.innerText.length <= 36)"
                      >High</strong
                    ></th>
                      
                      <th  class="pjparent"
                    style="width: 50px; ">
                    <strong
                    editable="true"
                    contenteditable="true"
                    onkeypress="return (this.innerText.length <= 36)"
                      >Extreme  </strong
                    > 
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      
                    <th class="pjparent" id=parent  >EKU</th>
                    <td class=pjchilld>1</td>
                   
                   <td class="pjamber" id="amber">2</td>
                    <td class="pjgren" id="amber">3</td>
                    <td class="pjgren" id="Red"> 3</td>
                  </tr>
                  <tr >
                      
                      <th class="pjparent" id=parent  >OTI</th>
                      <td class=pjchilld>1</td>
                     
                     <td class="pjamber" id="amber">2</td>
                      <td class="pjgren" id="amber"> 3</td>
                      <td class="pjgren" id="Red"> 3</td>
                    </tr>
              
        
                  </tbody>
                </table>
              </div>
              <div class="navigation-wrap"></div>
            </div>
          </div>
        </div>`);
      $(document).ready(function () {
         $(".kpistatusCount").paging({
            limit: 8
         });
      });
      initDateRangePicker("#datePicker17");
      drilldownRender();
   }
   if (data == "riskeventdatabase") {
      $("#dashboard-body").append(`
            <div class="g-col-12 select-toggle myinitiative sub_initiatives">
              <div class="card table-card border h-100">
                <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                  <h5 class="card-title fs-6 mb-0">
                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Risk Event Data Base</strong>
                  </h5>
                  <div class="d-flex gap-3">
                    <div class="date-picker ">
                      <input class="top_datepicker form-control form-control-sm" id="datePicker12" />
                    </div>
            
            
                    <div class="dropdown">
                      <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li>
                          <a class="dropdown-item" href="#riskevendatab" data-bs-toggle="modal"
                            onclick="return false;">Settings</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#riskreg_view" data-bs-toggle="modal" onclick="return false;">View</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                        </li>
                      </ul>
                    </div>
            
            
                  </div>
                </div>
                
                <div class="card-body table-container">
                  <div class="table-responsive">
                    <table class="table table-bordered riskEventDatabase"
                      id="riskEventDatabase">
                      <thead >
                        <tr>
                            <th class="position" width=130px" id="blue" rowspan="2">DEPARTMENT</th>
                            <th class="position" width="130px" id="blue" rowspan="2">
                                DATE OF INCIDENT</th>
                            <th class="position" width="180px" id="blue" rowspan="2">RISK CODE
                            </th>
                            <th width="280px" id="blue" rowspan="2">INCIDENT</th>
                            <th width="190px" id="blue" rowspan="2">
                                TYPE OF EVENT</th>
                            <th width="440px" id="blue" colspan="2">
                                THE CAUSE OF THE INCIDENT</th>
                            <th width="400px" id="greenss" colspan="3">
                                IMPACT / LOSS </th>
                            <th width="390px" id="greenss" rowspan="2">
                                CORRECTIVE ACTION</th>
                            <th width="390px " id="moa" rowspan="3">
                                RISK MITIGATION (CORRECTIVE ACTION)</th>
                            <th width="190px" id="moa" rowspan="3">
                                EVENT STATUS</th>
                            <th width="140px" id="grey" rowspan="3">
                                INVENTOR / REPORTER</th>
                                
                        </tr>
                        <tr>
            
                            <th width="60px" id="greenss">CATEGORY
                            </th>
                            <th width="40px" id="greenss">DESCRIPTION
                            </th>
                            <th width="190px" id="greenss">CATEGORY
                            </th>
                            <th width="160px" id="greenss">DESCRIPTION
                            </th>
                            <th width="160px" id="greenss">IMPACT LEVELS
                            </th>
            
            
                        </tr>
            
            
            
                    </thead>
            
                    <tbody>
            
                        <tr>
                            <td >
                                EKU
                            </td>
                            <td >
                                07/03/2023
                            </td>
                            <td >
                                R/P/KPP-EKU/007
                            </td>
                            <td >S1B1 stops at SECTRPS1D</td>
                            <td > Near Miss Event</td>
                            <td>Tools</td>
                            <td>Disorders in the OAS</td>
                            <td>Service</td>
                            <td> Deployed SIBI Process</td>
                            <td></td>
                            <td >'Workaround from OAS</td>
                            <td ></td>
                            <td >Close</td>
                            <td >EKU</td>
                        
            
            
                        </tr>
                   
                   
            
                        <tr>
                            <td >
                                EKU
                            </td>
                            <td >
                                07/05/2023
                            </td>
                            <td >
                                R/P/KPP-EKU/007
                            </td>
                            <td >There are Cotrade instructions that send back to CM
                            </td>
                            <td > Near Miss Event</td>
                            <td>Tools</td>
                            <td>Disorders in the OAS</td>
                            <td>Service</td>
                            <td> Deployed SIBI Process</td>
                            <td></td>
                            <td >Fulfillment of obligations is carried out manually
                                through the REU AK</td>
                            <td ></td>
                            <td >Open</td>
                            <td >EKU</td>
                          
            
            
                        </tr>
                      
                    </tbody>
                    </table>
                  </div>
                  <div class="navigation-wrap"></div>
                </div>
              </div>
            </div>`);
      $(document).ready(function () {
         $(".riskEventDatabase").paging({
            limit: 8
         });
      });
      initDateRangePicker("#datePicker12");
      drilldownRender();
   }

   if (data == "dataDragDiv") {
      $("#dashboard-body").append(`
              <div class="g-col-12 select-toggle myinitiative sub_initiatives">
                <div class="card table-card border h-100">
                  <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                    <h5 class="card-title fs-6 mb-0">
                      <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Data Table</strong>
                    </h5>
                    <div class="d-flex gap-3">
                      <div class="date-picker ">
                        <input class="top_datepicker form-control form-control-sm" id="datePicker20" />
                      </div>
              
              
                      <div class="dropdown">
                        <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                          <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                          <li>
                            <a class="dropdown-item" href="#datatable_setting" data-bs-toggle="modal"
                              onclick="return false;">Settings</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#datatable_view" data-bs-toggle="modal" onclick="return false;">View</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                          </li>
                        </ul>
                      </div>
              
              
                    </div>
                  </div>
                  
                  <div class="card-body table-container">
                    <div class="table-responsive">
                      <table class="table table-bordered dataTable"
                        id="dataTable">           
                                  <thead>
                                    <tr>
                                      <th style="width: 80px;">Period</th>
                                      <th style="width: 98px;">Actual</th>
                                      <th style="width: 98px;">Target</th>
                                      <th style="width: 98px;">Gap</th>
                                      <th style="width: 98px;">YTT</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Q1 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q2 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q3 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q4 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q1 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q2 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q3 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q4 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q2 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q3 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q4 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q1 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q2 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q3 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                    <tr>
                                      <td>Q4 2019</td>
                                      <td>28%</td>
                                      <td>24%</td>
                                      <td>38.091%</td>
                                      <td>38%</td>
                                    </tr>
                                  </tbody>
                      </table>
                    </div>
                    <div class="navigation-wrap"></div>
                  </div>
                </div>
              </div>`);
      $(document).ready(function () {
         $(".dataTable").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker20");
      dataRender();
   }

   if (data == "riskRegDiv") {
      $("#dashboard-body").append(`
                  <div class="g-col-12 select-toggle myinitiative sub_initiatives">
                    <div class="card table-card border h-100">
                      <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                        <h5 class="card-title fs-6 mb-0">
                          <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Risk Register</strong>
                        </h5>
                        <div class="d-flex gap-3">
                          <div class="date-picker ">
                            <input class="top_datepicker form-control form-control-sm" id="datePicker16" />
                          </div>
                  
                  
                          <div class="dropdown">
                            <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                              <li>
                                <a class="dropdown-item" href="#riskreg_setting" data-bs-toggle="modal"
                                  onclick="return false;">Settings</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#riskreg_view" data-bs-toggle="modal" onclick="return false;">View</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                              </li>
                            </ul>
                          </div>
                  
                  
                        </div>
                      </div>
                      
                      <div class="card-body table-container">
                        <div class="table-responsive">
                          <table class="table table-bordered riskRegisterPageNav"
                            id="riskRegister">
                           
                                      <thead>
                                        <tr>
                                          <th width="60px">Status</th>   
                                          <th width="60px">ID</th>
                                          <th width="100px">Deportment</th> 
                                          <th width="100px">Related Parties</th> 
                                          <th width="260px">Name</th>
                                          <th width="120px">Category</th>
                                          <th width="270px">KPI</th>
                                          <th width="270px">POS</th>
                                          <th width="270px">ISO</th>
                                          <th width="220px">Information Asset</th>
                                          <th width="120px">Others</th>
                                          <th width="120px">Impact</th>
                                          <th width="120px">Likelihood</th>
                                          <th width="80px">Score</th>
                                          <th width="120px">Inherent Risk Score</th>
                                          <th width="120px">Residual Risk Score</th>
                                          <th width="120px">Date of Compeleted</th>
                                          <th width="180px">Raised on</th>
                                          <th width="120px">Next Assessment</th>
                                          
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <i
                                              class="fas fa-flag"
                                              style="color: #28f76d;"
                                            ></i>
                                          </td>
                                          <td>12</td>
                                          <td>Human Resources</td>
                                          <td>EKU/KEA</td>
                                          <td>Failure to meet compliance obligations</td>
                                          <td>Regulatory</td>
                                          <td> SEPARATE TRANSACTION DETERMINATION POSTS</td>
                                          <td>:POST EFFECT PARAMETERS CALCULATION</td>
                                          <td>SMM/SMKI/SMKU</td>
                                          <td> Softcopy Document (Code A) </td>
                                          
                                          <td></td>
                                          <td style="color: #28f76d;">
                                            Tolerable
                                          </td>
                                       
                                         
                                          <td style="color: #f72f28;">High</td>
                                          <td>3</td>
                                          <td>A2</td>
                                          <td>C1</td>
                                          <td>23-05-2020</td>
                                          <td>23-06-2020</td>
                                          <td>23-06-2020</td>
                                                 </tr>
                                                 <tr>
                                          <td>
                                            <i
                                              class="fas fa-flag"
                                              style="color: #28f76d;"
                                            ></i>
                                          </td>
                                          <td>12</td>
                                          <td>Financial</td>
                                          <td> EKU/KEA</td>
                                          <td>Failure to meet compliance obligations</td>
                                          <td>Regulatory</td>
                                          <td> SEPARATE TRANSACTION DETERMINATION POSTS</td>
                                          <td>:POST EFFECT PARAMETERS CALCULATION</td>
                                          <td>SMM/SMKI/SMKU </td>
                                          <td>Physical Storage (Flashdisk)</td>
                                          <td></td>
                                          <td style="color: #28f76d;">
                                            Tolerable
                                          </td>
                                       
                                         
                                          <td style="color: #f72f28;">High</td>
                                          <td>3</td>
                                          <td>E3</td>
                                          <td>A4</td>
                                          <td>23-05-2020</td>
                                          <td>23-06-2020</td>
                                          <td>23-06-2020</td>
                                        </tr>
                                      </tbody>
                          </table>
                        </div>
                        <div class="navigation-wrap"></div>
                      </div>
                    </div>
                  </div>`);
      $(document).ready(function () {
         $(".riskRegisterPageNav").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker16");
      dataRender();
   }

   if (data == "ermriskRegDiv") {
      $("#dashboard-body").append(`
                      <div class="g-col-12 select-toggle myinitiative sub_initiatives">
                        <div class="card table-card border h-100">
                          <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                            <h5 class="card-title fs-6 mb-0">
                              <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">ERM Risk Register</strong>
                            </h5>
                            <div class="d-flex gap-3">
                              <div class="date-picker ">
                                <input class="top_datepicker form-control form-control-sm" id="datePicker21" />
                              </div>
                      
                      
                              <div class="dropdown">
                                <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                  <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                  <li>
                                    <a class="dropdown-item" href="#ermriskreg_setting" data-bs-toggle="modal"
                                      onclick="return false;">Settings</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#riskreg_view" data-bs-toggle="modal" onclick="return false;">View</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                  </li>
                                </ul>
                              </div>
                      
                      
                            </div>
                          </div>
                          
                          <div class="card-body table-container">
                            <div class="table-responsive">
                              <table class="table table-bordered rmriskRegister"
                                id="rmriskRegister">        
                                          <thead>
                                            <tr>
                                              <th width="60px">Status</th>
                                              <th width="60px">ID</th>
                                              <th width="360px">Name</th>
                                              <th width="120px">Category</th>
                                              <th width="60px">Impact</th>
                                              <th width="60px">Likelihood</th>
                                              <th width="60px">Context</th>
                                              <th width="120px">Cause</th>
                                              <th width="120px">Consequence</th>
                                            
                                              <th width="80px">Inherent Risk Score</th>
                                             
                                              <th width="120px">Reducing Impact</th>
                                              <th width="120px">Reducing the Possibility</th>
                                              <th width="120px">Control Type</th>
                                              <th width="120px">Control Effectiveness</th>
                                              <th width="60px">Residual Risk Score</th>
                                            
                                              
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color: #28f76d;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                              <td>People</td>
                                              <td style="color: #28f76d;">
                                                3
                                              </td>
                                              <td style="color: #28f76d;">A</td>
                                              <td>KPI</td>
                                              <td>The Eclears system has a problem. The support system has a problem. The user network has a
                                            problem. </td>
                                              
                                            
                                              <td>'Record every event that occurs in the operational log and follow up with IT </td>
                                              <td>E4</td>
                                              <td>'1. Ensuring preparation of Batch settlement</td>
                                              <td> Asking the IT team to restart the report server </td>
                                              <td>Preventive</td>
                                              <td>Fully Effective</td>
                                               
                                               <td>A3</td>
                      
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color:  #f72f28;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                              <td>Procedure</td>
                                              <td style="color:  #f72f28;">
                                                4
                                              </td>
                                              <td style="color: #f72f28;">E</td>
                                              <td>POS</td>
                                              <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                            <td>Service disruption to capital market agencies</td>
                                            <td>E2</td>
                                             
                                              
                                              <td> Asking the IT team to restart the report server </td>
                                              <td>1. Equity Clearing POS 2. Coordination with SRO 3. Availability of replacement personnel</td>
                                              <td>Corrective</td>
                                              <td>Fully Effective</td>
                                              <td>A2</td>
                                             
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color:  #f72f28;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                              <td>Procedure</td>
                                              <td style="color:  #f72f28;">
                                                4
                                              </td>
                                              <td style="color: #f72f28;">E</td>
                                              <td>ISO</td>
                                              <td>Poor cashﬂow Outstanding debts uncollectable Loss
                                                  of revenue</td>
                                            <td> Operational disruption (required files not available)</td>
                             
                                            <td>E4</td>
                                             
                                              
                                              <td> . Availability of spare laptops that can be used for business operations at alternate sites</td>
                                              <td> Coordination with SRO </td>
                                              <td>Corrective</td>
                                              <td>Partially Effective</td>
                                               <td>A2</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color: #28f76d;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td> Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                              <td>Tools</td>
                                              <td style="color: #28f76d;">
                                                B
                                              </td>
                                              <td style="color: #f72f28;">4</td>
                                              <td>KPI</td>
                                                <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                            <td>Service disruption to capital market agencies</td>
                                              <td>E4</td>
                                              
                                              <td>Ask the IT Team to do a workaround (cot: send manual sync, do backups)</td>
                                              <td>'- POS Transaction Settlement Service Report - </td>
                                              <td>Preventive</td>
                                              <td>Fully Effective</td>
                                              <td>A3</td>
                                            </tr>
                         <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color: #28f76d;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                              <td>People</td>
                                              <td style="color: #28f76d;">
                                                3
                                              </td>
                                              <td style="color: #28f76d;">A</td>
                                              <td>Information Asset</td>
                                              <td>The Eclears system has a problem. The support system has a problem. The user network has a
                                           </td>
                                            <td>DHK cannot be printed with the appropriate data</td>
                                              <td>E3</td>
                                              
                                              <td>'Record every event that occurs in the operational log and follow up with IT </td>
                                              <td>'1. Ensuring preparation of Batch settlement</td>
                                              <td>Preventive</td>
                                              <td>Not Effective</td>
                                               <td>A4</td>
                      
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color:  #f72f28;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                              <td>Procedure</td>
                                              <td style="color:  #f72f28;">
                                                4
                                              </td>
                                              <td style="color: #f72f28;">E</td>
                                              <td>Information Asset</td>
                                              <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                            <td>Service disruption to capital market agencies</td>
                                            
                                              <td>E4</td>
                                              
                                              <td> Asking the IT team to restart the report server </td>
                                              <td>1. Equity Clearing POS 2. Coordination with SRO 3. Availability of replacement personnel</td>
                                              <td>Corrective</td>
                                              <td>Fully Effective</td>
                                               <td>A2</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color:  #f72f28;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                              <td>Procedure</td>
                                              <td style="color:  #f72f28;">
                                                4
                                              </td>
                                              <td style="color: #f72f28;">E</td>
                                              <td>Others</td>
                                              <td>Poor cashﬂow Outstanding debts uncollectable Loss
                                                  of revenue</td>
                                            <td> Operational disruption (required files not available)</td>
                                           
                                              
                                              <td>E4</td>
                                              
                                              <td> Asking the IT team to restart the report server </td>
                                              <td>1. Equity Clearing POS 2. Coordination with SRO 3. Availability of replacement personnel</td>
                                              <td>Corrective</td>
                                              <td>Fully Effective</td>
                                               <td>A2</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color: #28f76d;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td> Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                              <td>Tools</td>
                                              <td style="color: #28f76d;">
                                                B
                                              </td>
                                              <td style="color: #f72f28;">4</td>
                                              <td>KPI</td>
                                                <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                            <td>Service disruption to capital market agencies</td>
                                              <td>E4</td>
                                              
                                              <td>Ask the IT Team to do a workaround (cot: send manual sync, do backups)</td>
                                              <td>'- POS Transaction Settlement Service Report - Protecting physical media (flash disk) with a password or encryption - Outgoing document log book - Ensuring the party receiving the information</td>
                                              <td>Preventive</td>
                                              <td>Not Effective</td>
                                              <td>A3</td>
                                            </tr>
                                            <tr>   
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color: #28f76d;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                              <td>People</td>
                                              <td style="color: #28f76d;">
                                                3
                                              </td>
                                              <td style="color: #28f76d;">A</td>
                                              <td>KPI</td>
                                              <td>The Eclears system has a problem. The support system has a problem. The user network has a
                                            problem. </td>
                                            <td>DHK cannot be printed with the appropriate data</td>
                                              <td>E3</td>
                                              
                                              <td>'Record every event that occurs in the operational log and follow up with IT </td>
                                              <td>'1. Ensuring preparation of Batch settlement</td>
                                              <td>Preventive</td>
                                              <td>Fully Effective</td>
                                               <td>A4</td>
                      
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color:  #f72f28;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                              <td>Procedure</td>
                                              <td style="color:  #f72f28;">
                                                4
                                              </td>
                                              <td style="color: #f72f28;">E</td>
                                              <td>KPI</td>
                                              <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                            <td>Service disruption to capital market agencies</td>
                                              
                                              <td>E4</td>
                                              
                                              <td> Asking the IT team to restart the report server 6. Availability of spare laptops that can be used for business operations at alternate sites</td>
                                              <td>1. Equity Clearing POS 2. Coordination with SRO 3. Availability of replacement personnel</td>
                                              <td>Corrective</td>
                                              <td>Partially Effective</td>
                                               <td>A2</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color:  #f72f28;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                              <td>Procedure</td>
                                              <td style="color:  #f72f28;">
                                                4
                                              </td>
                                              <td style="color: #f72f28;">E</td>
                                              <td>POS</td>
                                              <td>Poor cashﬂow Outstanding debts uncollectable Loss
                                                  of revenue</td>
                                            <td> Operational disruption (required files not available)</td>
                             
                                              
                                              <td>E4</td>
                                              
                                              <td> Asking the IT team to restart the report server 6. Availability of spare laptops that can be used for business operations at alternate sites</td>
                                              <td>1. Equity Clearing POS 2. Coordination with SRO 3. Availability of replacement personnel</td>
                                              <td>Corrective</td>
                                              <td>Fully Effective</td>
                                               <td>A2</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color: #28f76d;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td> Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                              <td>Tools</td>
                                              <td style="color: #28f76d;">
                                                B
                                              </td>
                                              <td style="color: #f72f28;">4</td>
                                              <td>ISO</td>
                                                <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                            <td>Service disruption to capital market agencies</td>
                                              <td>B4</td>
                                              
                                              <td>Ask the IT Team to do a workaround (cot: send manual sync, do backups)</td>
                                              <td>'- POS Transaction Settlement Service Report - Protecting physical media (flash disk) with a password or encryption - Outgoing document log book - Ensuring the party receiving the information</td>
                                              <td>Preventive</td>
                                              <td>Fully Effective</td>
                                              <td>A3</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <i
                                                  class="fas fa-flag"
                                                  style="color:  #f72f28;"
                                                ></i>
                                              </td>
                                              <td>12</td>
                                              <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                              <td>Procedure</td>
                                              <td style="color:  #f72f28;">
                                                4
                                              </td>
                                              <td style="color: #f72f28;">E</td>
                                              <td>KPI</td>
                                              <td>Poor cashﬂow Outstanding debts uncollectable Loss
                                                  of revenue</td>
                                            <td> Operational disruption (required files not available)</td>
                             
                                              
                                              <td>E4</td>
                                              
                                              <td> Asking the IT team to restart the report server 6. Availability of spare laptops that can be used for business operations at alternate sites</td>
                                              <td>1. Equity Clearing POS 2. Coordination with SRO 3. Availability of replacement personnel</td>
                                              <td>Corrective</td>
                                              <td>Fully Effective</td>
                                               <td>A2</td>
                                            </tr>
                                          </tbody>
                              </table>
                            </div>
                            <div class="navigation-wrap"></div>
                          </div>
                        </div>
                      </div>`);
      $(document).ready(function () {
         $(".rmriskRegister").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker21");
      dataRender();
   }

   if (data == "riskmonitersreg") {
      $("#dashboard-body").append(`
                        <div class="g-col-12">
                          <div class="card table-card border h-100">
                            <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                              <h5 class="card-title fs-6 mb-0">
                                <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Risk Monitoring Register-table</strong>
                              </h5>
                              <div class="d-flex gap-3">
                                <div class="date-picker ">
                                  <input class="top_datepicker form-control form-control-sm" id="datePicker13" />
                                </div>
                        
                        
                                <div class="dropdown">
                                  <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                  </button>
                                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                    <li>
                                      <a class="dropdown-item" href="#riskmonitors" data-bs-toggle="modal"
                                        onclick="return false;">Settings</a>
                                    </li>
                                    
                                    <li>
                                      <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                    </li>
                                    <li>
                                      <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                    </li>
                                    <li>
                                      <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                    </li>
                                  </ul>
                                </div>
                        
                        
                              </div>
                            </div>
                            
                            <div class="card-body table-container">
                              <div class="table-responsive">
                                <table class="table table-bordered riskMonitersReg"
                                  id="riskMonitersReg">           
                                  <thead>
                                    <tr>
                                      <th width="60px"> <strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      >Risk ID</strong
                                    ></th>
                                      <th width="60px"> <strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      > Name of Risk</strong
                                    ></th>
                                      <th width="160px"> <strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      > Mitigation Plan</strong
                                    >/<br/> Risk Treatment Plan (RTP)</th>
                                      <th width="120px"> <strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      >Target completion Time</strong
                                    ></th>
                                      <th width="120px"><strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      > Impact</strong
                                    ></th>
                                      <th width="120px"><strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      >Change in the completion time</strong
                                    ></th>
                                      <th width="80px"> <strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      > % Completion</strong
                                    ></th>
                                      <th width="120px" > <strong
                                    editable="true"
                                    contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)"
                                      > Status</strong
                                    ></th>
                                      
                                    
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>12</td>
                                      <td>Price and transaction data to be uploaded were not successfully uploaded</td>
                                      <td>Does not comply with KPEI regulations for sending DHK to AK no later than 19.30</td>
                                      <td >
                                        28/03/2023
                                      </td>
                                      <td>Major</td>
                                      <td>23-05-2023</td>
                                      <td>80%</td>
                                      <td>open</td>
                                     
                                    </tr>
                                   
                                    <tr>
                                      <td>22</td>
                                      <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                      <td>AK complaint 3. SRO complaint</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Major</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>open</td>
                                     
                                    </tr>
                                       
                                
                                    <tr>
                                      <td>23</td>
                                      <td>Intraday facilities are not available</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>insignificant</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                  
                                    <tr>
                                      <td>34</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                    <tr>
                                      <td>55</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>'KPI unit target is not achieved</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                    <tr>
                                      <td>22</td>
                                      <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                      <td>AK complaint 3. SRO complaint</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Major</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>open</td>
                                     
                                    </tr>
                                       
                                
                                    <tr>
                                      <td>23</td>
                                      <td>Intraday facilities are not available</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>insignificant</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                  
                                    <tr>
                                      <td>34</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                    <tr>
                                      <td>55</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>'KPI unit target is not achieved</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                    <tr>
                                      <td>22</td>
                                      <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                      <td>AK complaint 3. SRO complaint</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Major</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>open</td>
                                     
                                    </tr>
                                       
                                
                                    <tr>
                                      <td>23</td>
                                      <td>Intraday facilities are not available</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>insignificant</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                  
                                    <tr>
                                      <td>34</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                    <tr>
                                      <td>55</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>'KPI unit target is not achieved</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                    <tr>
                                      <td>22</td>
                                      <td>Delays in delivery times and inaccuracies in DHK Equity values</td>
                                      <td>AK complaint 3. SRO complaint</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Major</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>open</td>
                                     
                                    </tr>
                                       
                                
                                    <tr>
                                      <td>23</td>
                                      <td>Intraday facilities are not available</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>insignificant</td>
                                      <td>03-05-2023</td>
                                      <td>90%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                  
                                    <tr>
                                      <td>34</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>Received a formal warning without any sanctions/claims for not complying with the 19.30 DHK shipping regulations</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                    <tr>
                                      <td>55</td>
                                      <td>Time delays and inaccuracies in the results of Equity transaction Settlement values</td>
                                      <td>'KPI unit target is not achieved</td>
                                      <td >
                                        26/10/2022
                                      </td>
                                      <td>Moderate</td>
                                      <td>03-05-2023</td>
                                      <td>60%</td>
                                      <td>Close</td>
                                     
                                    </tr>
                                   
                                   
                                  </tbody>
                                </table>
                              </div>
                              <div class="navigation-wrap"></div>
                            </div>
                          </div>
                        </div>`);
      $(document).ready(function () {
         $(".riskMonitersReg").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker13");
      dataRender();
   }

   if (data == "biareport") {
      $("#dashboard-body").append(`
                          <div class="g-col-12">
                            <div class="card table-card border h-100">
                              <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                <h5 class="card-title fs-6 mb-0">
                                  <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">BIA Report</strong>
                                </h5>
                                <div class="d-flex gap-3">
                                  <div class="date-picker ">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker22" />
                                  </div>
                          
                          
                                  <div class="dropdown">
                                    <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                      <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                      <li>
                                        <a class="dropdown-item" href="#bia_setting" data-bs-toggle="modal"
                                          onclick="return false;">Settings</a>
                                      </li>
                                      
                                      <li>
                                        <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                      </li>
                                      <li>
                                        <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                      </li>
                                      <li>
                                        <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                      </li>
                                    </ul>
                                  </div>
                          
                          
                                </div>
                              </div>
                              
                              <div class="card-body table-container">
                                <div class="table-responsive">
                                  <table class="table table-bordered biaReport"
                                    id="biaReport">           
                                    <thead>
                                      <tr>
                                        <th width="60px"><strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        > Products/Services</strong
                                      ></th>
                                        <th width="60px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        > Process (POS)</strong
                                      ></th>
                                        <th width="160px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        >Inputs vital records</strong
                                      ></th>
                                        <th width="180px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        >Database recovery strategy</strong
                                      ></th>
                                        <th width="120px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        > Maximum Allowable Outage</strong
                                      > </th>
                                        <th width="140px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        > Recovery Time Objective (RTO)</strong
                                      ></th>
                                        <th width="120px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        > Recovery Point Objective (RPO)</strong
                                      ></th>
                                        <th width="120px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        > Availability of DRC system</strong
                                      ></th>
                                        <th width="120px"> <strong
                                      editable="true"
                                      contenteditable="true"
                                      onkeypress="return (this.innerText.length <= 36)"
                                        > Business Solutions</strong
                                      ></th>
                                        
                                      
                                        
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Disbursement of Intraday Facility</td>
                                        <td>Money and securities monitoring</td>
                                        <td>'- Data on the need for disbursement of funds -Form. SPPI-Internet Banking Overbooking Control Sheet</td>
                                        <td >
                                          Will be determined in the CMT Meeting as needed with a choice of method: 1. Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes) 2. Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                                        </td>
                                        <td>2 hours</td>
                                        <td>1 hours 28 minutes</td>
                                          <td></td>
                                        <td>Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                        </td>             
                                        <td>Contact the KPEI & KSEI IT Team to dobalanced injection </td>
                                       
                                      </tr>
                                     
                                      <tr>
                                        <td>Equity Clearing</td>
                                        <td>Equity Clearing</td>
                                        <td>Price & Transaction Data</td>
                                        <td >
                                          ' - Using the Failover method: active data in DRC, not sent to NDC - Users access the DRC version of catalufa with the addresscataluf20
                                        </td>
                                        <td>3 hours</td>
                                        <td>1 hours 23 minutes</td>
                                        <td></td>
                                        <td>Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes)</td>
                                        <td> Request for extension of service time with external parties (SRO and Payment Bank) 3. Initiate BCP activation</td>
                                      </tr>
                                      <tr>
                                        <td>Disbursement of Intraday Facility</td>
                                        <td>Money and securities monitoring</td>
                                        <td>'- Data on the need for disbursement of funds -Form. SPPI-Internet Banking Overbooking Control Sheet</td>
                                        <td >
                                          Will be determined in the CMT Meeting as needed with a choice of method: 1. Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes) 2. Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                                        </td>
                                        <td>2 hours</td>
                                        <td>1 hours 28 minutes/td>
                                          <td></td>
                                        <td>Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                        </td>             
                                        <td>Contact the KPEI & KSEI IT Team to dobalanced injection </td>
                                       
                                      </tr>
                                     
                                      <tr>
                                        <td>Equity Clearing</td>
                                        <td>Equity Clearing</td>
                                        <td>Price & Transaction Data</td>
                                        <td >
                                          ' - Using the Failover method: active data in DRC, not sent to NDC - Users access the DRC version of catalufa with the addresscataluf20
                                        </td>
                                        <td>3 hours</td>
                                        <td>1 hours 23 minutes</td>
                                        <td></td>
                                        <td>Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes)</td>
                                        <td> Request for extension of service time with external parties (SRO and Payment Bank) 3. Initiate BCP activation</td>
                                      </tr>
                                      <tr>
                                        <td>Disbursement of Intraday Facility</td>
                                        <td>Money and securities monitoring</td>
                                        <td>'- Data on the need for disbursement of funds -Form. SPPI-Internet Banking Overbooking Control Sheet</td>
                                        <td >
                                          Will be determined in the CMT Meeting as needed with a choice of method: 1. Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes) 2. Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                                        </td>
                                        <td>2 hours</td>
                                        <td>1 hours 28 minutes/td>
                                          <td></td>
                                        <td>Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                        </td>             
                                        <td>Contact the KPEI & KSEI IT Team to dobalanced injection </td>
                                       
                                      </tr>
                                     
                                      <tr>
                                        <td>Equity Clearing</td>
                                        <td>Equity Clearing</td>
                                        <td>Price & Transaction Data</td>
                                        <td >
                                          ' - Using the Failover method: active data in DRC, not sent to NDC - Users access the DRC version of catalufa with the addresscataluf20
                                        </td>
                                        <td>3 hours</td>
                                        <td>1 hours 23 minutes</td>
                                        <td></td>
                                        <td>Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes)</td>
                                        <td> Request for extension of service time with external parties (SRO and Payment Bank) 3. Initiate BCP activation</td>
                                      </tr>
                                      <tr>
                                        <td>Disbursement of Intraday Facility</td>
                                        <td>Money and securities monitoring</td>
                                        <td>'- Data on the need for disbursement of funds -Form. SPPI-Internet Banking Overbooking Control Sheet</td>
                                        <td >
                                          Will be determined in the CMT Meeting as needed with a choice of method: 1. Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes) 2. Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                                        </td>
                                        <td>2 hours</td>
                                        <td>1 hours 28 minutes/td>
                                          <td></td>
                                        <td>Switchover: data is active in DRC, also sent to NDC (activation time is around 45 minutes )
                        </td>             
                                        <td>Contact the KPEI & KSEI IT Team to dobalanced injection </td>
                                       
                                      </tr>
                                     
                                      <tr>
                                        <td>Equity Clearing</td>
                                        <td>Equity Clearing</td>
                                        <td>Price & Transaction Data</td>
                                        <td >
                                          ' - Using the Failover method: active data in DRC, not sent to NDC - Users access the DRC version of catalufa with the addresscataluf20
                                        </td>
                                        <td>3 hours</td>
                                        <td>1 hours 23 minutes</td>
                                        <td></td>
                                        <td>Failover: data is active in DRC, not sent to NDC (activation time is around 15 minutes)</td>
                                        <td> Request for extension of service time with external parties (SRO and Payment Bank) 3. Initiate BCP activation</td>
                                      </tr>
                                         
                                    </tbody>
                                  </table>
                                </div>
                                <div class="navigation-wrap"></div>
                              </div>
                            </div>
                          </div>`);
      $(document).ready(function () {
         $(".biaReport").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker22");
      dataRender();
   }

   if (data == "rpobiareport") {
      $("#dashboard-body").append(`
                            <div class="g-col-12">
                              <div class="card table-card border h-100">
                                <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                  <h5 class="card-title fs-6 mb-0">
                                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">BIA – RPO Report</strong>
                                  </h5>
                                  <div class="d-flex gap-3">
                                    <div class="date-picker ">
                                      <input class="top_datepicker form-control form-control-sm" id="datePicker23" />
                                    </div>
                            
                            
                                    <div class="dropdown">
                                      <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                      </button>
                                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                          <a class="dropdown-item" href="#bia_setting-2" data-bs-toggle="modal"
                                            onclick="return false;">Settings</a>
                                        </li>
                                        
                                        <li>
                                          <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                        </li>
                                        <li>
                                          <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                        </li>
                                        <li>
                                          <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                      </ul>
                                    </div>
                            
                            
                                  </div>
                                </div>
                                
                                <div class="card-body table-container">
                                  <div class="table-responsive">
                                    <table class="table table-bordered rpoBiaReport"
                                      id="rpoBiaReport">           
                                      <thead>
                                        <tr>
                                           
                                          
                                            <th class="position" width="180px" id="blue" > <strong
                          editable="true"
                          contenteditable="true"
                          onkeypress="return (this.innerText.length <= 36)"
                          > Process(POS)</strong
                          ></th>
                                          
                                            <th width="240px" id="grey" >
                                                 <strong
                          editable="true"
                          contenteditable="true"
                          onkeypress="return (this.innerText.length <= 36)"
                          > Name of Vital Records</strong
                          ></th>
                          
                                            <th width="80px" id="grey" >
                                                 <strong
                          editable="true"
                          contenteditable="true"
                          onkeypress="return (this.innerText.length <= 36)"
                          > Type of Media</strong
                          ></th>
                                            <th width="140px" id="grey" >
                                                 <strong
                          editable="true"
                          contenteditable="true"
                          onkeypress="return (this.innerText.length <= 36)"
                          > Backup Method</strong
                          ></th>
                                            <th width="140px" id="grey" >
                                                 <strong
                          editable="true"
                          contenteditable="true"
                          onkeypress="return (this.innerText.length <= 36)"
                          > Backup Time</strong
                          ></th>
                                            <th width="140px" id="moa" >
                                                <strong
                          editable="true"
                          contenteditable="true"
                          onkeypress="return (this.innerText.length <= 36)"
                          > Retention </strong
                          ></th>
                          
                                            <th width="490px" id="moa" >
                                                 <strong
                          editable="true"
                          contenteditable="true"
                          onkeypress="return (this.innerText.length <= 36)"
                          > Database Recovery Strategy</strong
                          ></th>
                                          
                                        </tr>
                                     
                                        </tr>
                          
                                    </thead>
                          
                                    <tbody>
                          
                                        <tr>
                                           
                                          
                                            <td rowspan="4">
                                                Money and securities monitoring
                                            </td>
                                         
                                            <td rowspan="3">1) Data balance 2) Data position 3) Data
                                                instructions</td>
                                            <td rowspan="3">e-CLEARS System Database</td>
                                            <td rowspan="3">Replication</td>
                                            <td rowspan="3">5-10 minutes (depending on number of transactions
                                                and size of redolog)</td>
                                            <td rowspan="3">2 working days (Transactional data needed to process
                                                the service)</td>
                                            <td rowspan="3">Will be determined in the CMT Meeting as needed with
                                                a choice of method: 1. Failover: data is active in DRC, not sent
                                                to NDC (activation time is around 15 minutes) 2. Switchover:
                                                data is active in DRC, also sent to NDC (activation time is
                                                around 45 minutes )
                                            </td>
                                          
                                        </tr>
                                        
                                    </tbody>
                                    </table>
                                  </div>
                                  <div class="navigation-wrap"></div>
                                </div>
                              </div>
                            </div>`);
      $(document).ready(function () {
         $(".rpoBiaReport").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker23");
      dataRender();
   }

   if (data == "posbiareport") {
      $("#dashboard-body").append(`
                              <div class="g-col-12">
                                <div class="card table-card border h-100">
                                  <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                    <h5 class="card-title fs-6 mb-0">
                                      <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">BIA – POS Report</strong>
                                    </h5>
                                    <div class="d-flex gap-3">
                                      <div class="date-picker ">
                                        <input class="top_datepicker form-control form-control-sm" id="datePicker24" />
                                      </div>
                              
                              
                                      <div class="dropdown">
                                        <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                          <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                          <li>
                                            <a class="dropdown-item" href="#bia_setting-1" data-bs-toggle="modal"
                                              onclick="return false;">Settings</a>
                                          </li>
                                          
                                          <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                          </li>
                                          <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                          </li>
                                          <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                          </li>
                                        </ul>
                                      </div>
                              
                              
                                    </div>
                                  </div>
                                  
                                  <div class="card-body table-container">
                                    <div class="table-responsive">
                                      <table class="table table-bordered posBiaReport"
                                        id="posBiaReport">           
                                        <thead>
                                          <tr>
                                             
                                              <th class="position" width="130px" id="blue" rowspan="3">
                                                  <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >Product/Services </strong
                            ></th>
                                             
                                              <th width="280px" id="blue" rowspan="3"> <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >Sub Process (Activity in POS) </strong
                            ></th>
                                              <th width="190px" id="blue" colspan="2" rowspan="2">
                                                   <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >Working Time (during normal conditions) </strong
                            ></th>
                                              <th width="40px" id="blue" rowspan="3">
                                                   <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            > Frequency</strong
                            ></th>
                                              <th width="400px" colspan="4">
                                                   <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            > Resource Support</strong
                            ></th>
                                              <th width="490px" rowspan="3">
                                                   <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >Output </strong
                            ></th>
                                              <th width="180px " id="moa" rowspan="3">
                                                   <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >MAO Final</strong
                            ></th>
                                              <th width="490px" id="moa" rowspan="3">
                                                   <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            > Strategies and Solutions</strong
                            ></th>
                                              <!-- <th width="240px" id="grey" rowspan="3">
                                                  Name of Vital Records</th>
                            
                                              <th width="80px" id="grey" rowspan="3">
                                                  Type of Media</th>
                                              <th width="140px" id="grey" rowspan="3">
                                                  Backup Method</th>
                                              <th width="140px" id="grey" rowspan="3">
                                                  Backup Time</th>
                                              <th width="140px" id="moa" rowspan="3">
                                                  Retention</th>
                            
                                              <th width="490px" id="moa" rowspan="3">
                                                  Database Recovery Strategy</th> -->
                                             
                                          </tr>
                                          <tr>
                            
                                              <th width="60px" rowspan="2"> <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            > Technology</strong
                            >
                                              </th>
                                              <th width="40px" colspan="2"> <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >People </strong
                            >
                                              </th>
                                              <th width="40px" rowspan="2"> <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >Inputs(vital Record) </strong
                            >
                                              </th>
                                          </tr>
                                          <tr>
                            
                                              <th width="40px" id="blue"> <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >Start </strong
                            >
                                              </th>
                                              <th width="40px" id="blue"> <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            >End</strong
                            >
                            
                                              <th width="240px" > <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            > Internal</strong
                            >
                                              </th>
                                              <th width="140px" > <strong
                            editable="true"
                            contenteditable="true"
                            onkeypress="return (this.innerText.length <= 36)"
                            > External</strong
                            >
                                              </th>
                                          </tr>
                                          </tr>
                            
                                      </thead>
                            
                                      <tbody>
                            
                                          <tr>
                                              
                                              <td rowspan="4">
                                                  Equity Settlement
                                              </td>
                                             
                                              <td>Monitor the fulfillment of the obligation to hand over Money and
                                                  Securities in the Settlement Account</td>
                                              <td rowspan="4">05.00</td>
                                              <td rowspan="4">13.30</td>
                                              <td rowspan="4">Daily</td>
                                              <td rowspan="4">'Telephone/Mobile - intranet (liability monitoring)
                                                  - e-Clears - Internet network</td>
                                              <td rowspan="4">'2 EKU staff, 1 EKU head, 1 OAS staff, 1 DTE staff,
                                                  1 OAS head, 1 DTE head, 1 PSB/PMU staff, 1 PSB/PMU head, 1 UUM,
                                                  1 KIP (CC)</td>
                                              <td rowspan="4"></td>
                                              <td rowspan="4">- Data balance - Data position - Data instructions -
                                                  DHK</td>
                                              <td rowspan="4">'1. ACS & Guarantee Fund Usage Report 2. Balance
                                                  Details 3. Instruction Details 4. Information on TD Completion
                                                  Status from KSEI 5. TFT Completion Report 6. Obligation
                                                  Accomplishment Report (OAR) 7. Client Outstanding Report (COR)
                                                  8. Client Accomplishment Report (CAR) 9. Allocation Acquisition
                                                  Report (AAR)</td>
                                              <td rowspan="4">2 hours</td>
                                              <td rowspan="4"> 1. Contact the KPEI & KSEI IT Team to dobalanced
                                                  injection 2. Request for extension of service time with external
                                                  parties (SRO and Payment Bank) 3. Initiate BCP activation</td>
                                          
                                            
                                          </tr>
                                          <!-- <tr>
                            
                            
                                              <td> Contact AKs who have not fulfilled their obligations & contact
                                                  Settlement Agents to carry out reafirmations</td>
                            
                            
                                          </tr>
                                          <tr>
                                              <td>Carry out the Final Settlement Process</td>
                            
                                          </tr>
                                          <tr>
                                              <td>Create ACS & GFU reports</td>
                            
                                              <td>4) DHK</td>
                                              <td>Sharing Folders</td>
                                              <td>File sync between DC and DRC</td>
                                              <td>Every time there is a data change</td>
                                              <td></td>
                                              <td> - Using the Failover method: active data in DRC, not sent to
                                                  NDC - Users access the DRC version of catalufa with the
                                                  addresscataluf20</td>
                                          </tr>
                                          <tr>
                                              <td rowspan="6">2</td>
                                              <td rowspan="6">Equity Clearing</td>
                                              <td rowspan="6">Equity Clearing</td>
                                              <td>Perform Withdrawal and check the validity of SID Data from KSEI
                                                  email and upload data</td>
                                              <td rowspan="6">16.15</td>
                                              <td rowspan="6">19.30</td>
                                              <td rowspan="6">Daily</td>
                                              <td rowspan="3">'- KPEI FTP - e-CLEARS - email - SIK Desktop and web
                                                  SIK - Telephone/Mobile - Catalufa - Network</td>
                                              <td rowspan="3">'1 EKU staff, 1 OAS staff, 1 DTE staff, 1 OAS head,
                                                  1 DTE head, 1 PSB/PMU staff, 1 PSB/PMU head, 1 UUM</td>
                                              <td rowspan="3"></td>
                                              <td rowspan="3"></td>
                                              <td rowspan="6">DHK (List of Clearing Results)</td>
                                              <td rowspan="6 ">4 hours</td>
                                              <td rowspan="6">'1. Reprint DHK 2. Redraw data after the data is
                                                  available at the Exchange FTP 3. Reconfirm data with IDX using
                                                  Recapitulation data 4. Initiate BCP activation</td>
                                              <td rowspan="6 ">Data on the need for disbursement of funds</td>
                                              <td rowspan="6 ">e-CLEARS System Database</td>
                                              <td rowspan="6 ">Replication</td>
                                              <td rowspan="6 ">5-10 minutes (depending on number of transactions
                                                  and size of redolog)</td>
                                              <td rowspan="6 ">2 working days (Transactional data needed to
                                                  process the service)</td>
                                              <td rowspan="6 ">Will be determined in the CMT Meeting as needed
                                                  with a choice of method: 1. Failover: data is active in DRC, not
                                                  sent to NDC (activation time is around 15 minutes) 2.
                                                  Switchover: data is active in DRC, also sent to NDC (activation
                                                  time is around 45 minutus)</td>
                                                 
                                          </tr>
                            
                            
                            
                            
                                          <tr>
                            
                            
                                              <td>Checking the readiness of the data in FTP Exchange - KPEI and
                                                  withdrawing price & transaction data</td>
                            
                            
                                          </tr>
                                          <tr>
                                              <td>Reconcile Price & Transaction data and make clarifications to
                                                  the Exchange</td>
                            
                                          </tr>
                                          <tr>
                                              <td>Perform TD Revocation from Trade and send withdrawal information
                                              </td>
                                              <td></td>
                                              <td></td>
                                              <td>KSEI</td>
                                              <td>ID data</td>
                            
                                          </tr>
                                          <tr>
                                              <td>Carry out the Clearing Process and validate the clearing results
                                                  and Perform Reconciliation with the OTI Division and Check
                                                  Outstanding SRE</td>
                                              <td></td>
                                              <td></td>
                                              <td rowspan="2">IDX</td>
                                              <td rowspan="2">Price & Transaction Data</td>
                            
                                          </tr>
                            
                                          <tr>
                                              <td>
                                                  Generate Report, ensure completeness, and ensure report
                                                  availability at EAE and back up report files</td>
                                              <td></td>
                                              <td></td>
                            
                                          </tr>
                            
                                          <tr>
                            
                            
                                              <td rowspan="4">3</td>
                                              <td rowspan="4">Disbursement of Intraday Facility</td>
                                              <td rowspan="4">Disbursement of Intraday Facility</td>
                                              <td>'Sending Total Transfer of AK Funds Clearing Results T+0 to the
                                                  Bank providing FI</td>
                                              <td rowspan="4"> 08.00</td>
                                              <td rowspan="4">11.00</td>
                                              <td rowspan="4">Daily</td>
                                              <td rowspan="4">'- eclears - Intranet (Liability Monitoring) -
                                                  network</td>
                                              <td rowspan="4">'1 EKU staff, 1 EKU head, 1 OAS staff, 1 DTE staff,
                                                  1 OAS head, 1 DTE head, 1 PSB/PMU staff, 1 PSB/PMU staff, 1 UUM
                                                  staff</td>
                                              <td rowspan="4">Daily</td>
                                              <td rowspan="2">'- Data on the need for disbursement of funds -Form.
                                                  SPPI-Internet Banking Overbooking Control Sheet</td>
                                              <td rowspan="4">FI Disbursement Funds in the Account</td>
                                              <td rowspan="4">2 hours</td>
                                              <td rowspan="4"> 1. Changing the FI provider bank to another
                                                  available bank. 2. Contact KPEI & KSEI's IT Team to dobalanced
                                                  injection 3. Initiate BCP activation</td>
                                              <td rowspan="2"> SPPI document - WT overbooking control sheet</td>
                                              <td rowspan="2">Sharing Folders</td>
                                              <td rowspan="2">File sync between DC and DRC</td>
                                              <td rowspan="2">Every time there is a data change</td>
                                              <td rowspan="2"> </td>
                                              <td rowspan="2">- Using the Failover method: active data in DRC, not
                                                  sent to NDC - Users access the DRC version of catalufa with the
                                                  addresscataluf20</td>
                            
                            
                                          </tr>
                                          <tr>
                            
                            
                                              <td>'Check Intraday Facility Usage via Message in e-CLEARS/td>
                            
                            
                                          </tr>
                                          <tr>
                            
                            
                                              <td>'Send FI requests that are created automatically from e-CLEARS
                                                  to FI-providing banks via email less than 30 minutes after the
                                                  request is received.</td>
                            
                                              <td> - Data on the use of FI funds</td>
                                              <td>e-CLEARS System Database </td>
                                              <td> Replication </td>
                                              <td>5-10 minutes (depending on number of transactions and size of
                                                  redolog) </td>
                                              <td>'2 working days (Transactional data needed to process the
                                                  service) </td>
                                              <td>Will be determined in the CMT Meeting as needed with a choice of
                                                  method: 1. Failover: data is active in DRC, not sent to NDC
                                                  (activation time is around 15 minutes) 2. Switchover: data is
                                                  active in DRC, also sent to NDC (activation time is around 45
                                                  minutes ) </td>
                            
                                          </tr>
                                          <tr>
                            
                            
                                              <td>'Input FI applications, monitor and approve FI applications via
                                                  internet banking</td>
                            
                            
                                          </tr>
                                          <tr>
                            
                            
                                              <td rowspan="3">4</td>
                                              <td rowspan="3">Intraday Facility Returns</td>
                                              <td rowspan="3">Intraday Facility Returns</td>
                                              <td>'Prepare a WT (Wire Transfer) Control Sheet and Print SPPI FI
                                              </td>
                                              <td rowspan="3">13.00</td>
                                              <td rowspan="3">15.00</td>
                                              <td rowspan="3">Daily</td>
                                              <td rowspan="2">'- e-Clears - Network</td>
                                              <td rowspan="3">'1 EKU staff, 1 EKU head, 1 OAS staff, 1 DTE staff,
                                                  1 OAS head, 1 DTE head, 1 PSB/PMU staff, 1 PSB/PMU staff, 1 UUM
                                                  staff</td>
                                              <td rowspan="3">KSEI</td>
                                              <td rowspan="3">'SPPI document - WT overbooking control sheet - Data
                                                  on the use of FI funds</td>
                                              <td rowspan="3"> SPPI document</td>
                                              <td rowspan="3">2 hours</td>
                                              <td rowspan="3"> 1. Contact Paying Bank and KSEI to extend the
                                                  return period 2. Carry out manual transfer (offline) 3. Contact
                                                  KPEI & KSEI's IT Team to carry outbalanced injection 4. Initiate
                                                  BCP activation</td>
                            
                                          </tr>
                            
                                          <tr>
                            
                            
                                              <td>'Create a WT book-entry</td>
                            
                            
                                          </tr>
                                          <tr>
                            
                            
                                              <td>'Checking and giving approval for the suitability of the WT
                                                  input results from the inputer</td>
                                              <td>'CBEST</td>
                            
                            
                                          </tr> -->
                            
                                      </tbody>
                                      </table>
                                    </div>
                                    <div class="navigation-wrap"></div>
                                  </div>
                                </div>
                              </div>`);
      $(document).ready(function () {
         $(".posBiaReport").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker24");
      dataRender();
   }

   if (data == "b-trading-hours") {
      $("#dashboard-body").append(`
                                <div class="g-col-12">
                                  <div class="card table-card border h-100">
                                    <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                      <h5 class="card-title fs-6 mb-0">
                                        <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Business Process Based on Trading Hours</strong>
                                      </h5>
                                      <div class="d-flex gap-3">
                                        <div class="date-picker ">
                                          <input class="top_datepicker form-control form-control-sm" id="datePicker25" />
                                        </div>
                                
                                
                                        <div class="dropdown">
                                          <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                            <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                          </button>
                                          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                            <li>
                                              <a class="dropdown-item" href="#bpbhot_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                            </li>
                                            
                                            <li>
                                              <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                            </li>
                                            <li>
                                              <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                            </li>
                                            <li>
                                              <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                            </li>
                                          </ul>
                                        </div>
                                
                                
                                      </div>
                                    </div>
                                    
                                    <div class="card-body table-container">
                                      <div class="table-responsive">
                                        <table class="table table-bordered bTradingHours"
                                          id="bTradingHours">           
                                          <thead>
                                            <tr>
                                              <th width="60px">  <strong
                                            editable="true"
                                            contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)"
                                              >Classification</strong
                                            > </th>
                                              <th width="60px">  <strong
                                            editable="true"
                                            contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)"
                                              >Start Time ciritical</strong
                                            > </th>
                                              <th width="60px">  <strong
                                            editable="true"
                                            contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)"
                                              >End Time ciritical</strong
                                            ></th>
                                              <th width="60px">  <strong
                                            editable="true"
                                            contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)"
                                              >Amount Service</strong
                                            ></th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>Before the Trading </td>
                                              <td>4:00</td>
                                              <td>8:55</td>
                                              <td>4</td>
                                                </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div class="navigation-wrap"></div>
                                    </div>
                                  </div>
                                </div>`);
      $(document).ready(function () {
         $(".bTradingHours").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker25");
      dataRender();
   }

   if (data == "occurrence") {
      $("#dashboard-body").append(`
                                  <div class="g-col-12">
                                    <div class="card table-card border h-100">
                                      <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                        <h5 class="card-title fs-6 mb-0">
                                          <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Risk Events Frequency of Occurrence</strong>
                                        </h5>
                                        <div class="d-flex gap-3">
                                          <div class="date-picker ">
                                            <input class="top_datepicker form-control form-control-sm" id="datePicker29" />
                                          </div>
                                  
                                  
                                          <div class="dropdown">
                                            <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                              <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                              <li>
                                                <a class="dropdown-item" href="#refot_setting" data-bs-toggle="modal"
                                                  onclick="return false;">Settings</a>
                                              </li>
                                              
                                              <li>
                                                <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                              </li>
                                              <li>
                                                <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                              </li>
                                              <li>
                                                <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                              </li>
                                            </ul>
                                          </div>
                                  
                                  
                                        </div>
                                      </div>
                                      
                                      <div class="card-body table-container">
                                        <div class="table-responsive">
                                          <table class="table table-bordered refOccurrence"
                                            id="refOccurrence">           
                                            <thead>
                                              <tr>
                                                <th width="60px"> <strong
                                              editable="true"
                                              contenteditable="true"
                                              onkeypress="return (this.innerText.length <= 36)"
                                                >Process Name</strong
                                              ></th>
                                                <th width="60px"> <strong
                                              editable="true"
                                              contenteditable="true"
                                              onkeypress="return (this.innerText.length <= 36)"
                                                >Yearly</strong
                                              ></th>
                                           
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>Gangguan pada settlement</td>
                                                <td>19</td>
                                                  </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div class="navigation-wrap"></div>
                                      </div>
                                    </div>
                                  </div>`);
      $(document).ready(function () {
         $(".refOccurrence").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker29");
      dataRender();
   }

   if (data == "pb-critical") {
      $("#dashboard-body").append(`
                                    <div class="g-col-12">
                                      <div class="card table-card border h-100">
                                        <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                          <h5 class="card-title fs-6 mb-0">
                                            <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Process Business Critical</strong>
                                          </h5>
                                          <div class="d-flex gap-3">
                                            <div class="date-picker ">
                                              <input class="top_datepicker form-control form-control-sm" id="datePicker26" />
                                            </div>
                                    
                                    
                                            <div class="dropdown">
                                              <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                                <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                              </button>
                                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                <li>
                                                  <a class="dropdown-item" href="#pbc_setting" data-bs-toggle="modal"
                                                    onclick="return false;">Settings</a>
                                                </li>
                                                
                                                <li>
                                                  <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                                </li>
                                                <li>
                                                  <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                                </li>
                                                <li>
                                                  <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                                </li>
                                              </ul>
                                            </div>
                                    
                                    
                                          </div>
                                        </div>
                                        
                                        <div class="card-body table-container">
                                          <div class="table-responsive">
                                            <table class="table table-bordered pbCritical"
                                              id="pbCritical">           
                                              <thead>
                                                <tr>
                                                  <th width="60px"> <strong
                                                editable="true"
                                                contenteditable="true"
                                                onkeypress="return (this.innerText.length <= 36)"
                                                  >Critical</strong
                                                ></th>
                                                  <th width="60px"><strong
                                                editable="true"
                                                contenteditable="true"
                                                onkeypress="return (this.innerText.length <= 36)"
                                                  > Less Critical</strong
                                                ></th>
                                             
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>75%</td>
                                                  <td>28%</td>
                                                    </tr>
                                              </tbody>
                                              </table>
                                          </div>
                                          <div class="navigation-wrap"></div>
                                        </div>
                                      </div>
                                    </div>`);
      $(document).ready(function () {
         $(".pbCritical").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker26");
      dataRender();
   }

   if (data == "drcavailability") {
      $("#dashboard-body").append(`
                                      <div class="g-col-12">
                                        <div class="card table-card border h-100">
                                          <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                            <h5 class="card-title fs-6 mb-0">
                                              <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">List of Availability of a DRC system</strong>
                                            </h5>
                                            <div class="d-flex gap-3">
                                              <div class="date-picker ">
                                                <input class="top_datepicker form-control form-control-sm" id="datePicker27" />
                                              </div>
                                      
                                      
                                              <div class="dropdown">
                                                <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                                  <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                  <li>
                                                    <a class="dropdown-item" href="#laoadrc_setting" data-bs-toggle="modal"
                                                      onclick="return false;">Settings</a>
                                                  </li>
                                                  
                                                  <li>
                                                    <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                                  </li>
                                                  <li>
                                                    <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                                  </li>
                                                  <li>
                                                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                                  </li>
                                                </ul>
                                              </div>
                                      
                                      
                                            </div>
                                          </div>
                                          
                                          <div class="card-body table-container">
                                            <div class="table-responsive">
                                              <table class="table table-bordered drcAvailability"
                                                id="drcAvailability">           
                                                <thead>
                                                  <tr>
                                                    <th width="60px"> <strong
                                                  editable="true"
                                                  contenteditable="true"
                                                  onkeypress="return (this.innerText.length <= 36)"
                                                    > No</strong
                                                  ></th>
                                                    <th width="60px"> <strong
                                                  editable="true"
                                                  contenteditable="true"
                                                  onkeypress="return (this.innerText.length <= 36)"
                                                    > Sistem</strong
                                                  ></th>
                                                    <th width="60px"><strong
                                                  editable="true"
                                                  contenteditable="true"
                                                  onkeypress="return (this.innerText.length <= 36)"
                                                    > RTO</strong
                                                  ></th>
                                                    <th width="60px"><strong
                                                  editable="true"
                                                  contenteditable="true"
                                                  onkeypress="return (this.innerText.length <= 36)"
                                                    > Status Ketersediaan DRC</strong
                                                  ></th>
                                        
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <td>1</td>
                                                    <td>clear</td>
                                                    <td><90</td>
                                                    <td></td>
                                                      </tr>
                                                </tbody>
                                                </table>
                                            </div>
                                            <div class="navigation-wrap"></div>
                                          </div>
                                        </div>
                                      </div>`);
      $(document).ready(function () {
         $(".drcAvailability").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker27");
      dataRender();
   }

   if (data == "intRegDiv") {
      $("#dashboard-body").append(`
                                        <div class="g-col-12">
                                          <div class="card table-card border h-100">
                                            <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                              <h5 class="card-title fs-6 mb-0">
                                                <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Initiative Register</strong>
                                              </h5>
                                              <div class="d-flex gap-3">
                                                <div class="date-picker ">
                                                  <input class="top_datepicker form-control form-control-sm" id="datePicker28" />
                                                </div>
                                        
                                        
                                                <div class="dropdown">
                                                  <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                                    <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                                  </button>
                                                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                    <li>
                                                      <a class="dropdown-item" href="#intreg_setting" data-bs-toggle="modal"
                                                        onclick="return false;">Settings</a>
                                                    </li>
                                                    <li>
                                                      <a class="dropdown-item" href="#intreg_view" data-bs-toggle="modal"
                                                        onclick="return false;">View</a>
                                                    </li>
                                                    
                                                    <li>
                                                      <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                                                    </li>
                                                    <li>
                                                      <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                                    </li>
                                                    <li>
                                                      <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                                    </li>
                                                  </ul>
                                                </div>
                                        
                                        
                                              </div>
                                            </div>
                                            
                                            <div class="card-body table-container">
                                              <div class="table-responsive">
                                                <table class="table table-bordered intRegDiv"
                                                  id="intRegDiv">           
                                                  <thead>
                                                    <tr>
                                                      <th width="60px">Status</th>
                                                      <th width="380px">Name</th>
                                                      <th width="120px">Impact</th>
                                                      <th width="160px">Planned Start/ End Date</th>
                                                      <th width="160px">Actual Start/ End Date</th>
                                                      <th width="100px">Progress</th>
                                                      <th width="80px">Total</th>
                                                      <th width="80px">Utilised</th>
                                                      <th width="80px">Balance</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Lorem ipsum dolor sit amet, sed do eiusmod tempor 
                                                        ut labore et dolore magna aliqua.
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                        <i
                                                          class="fas fa-flag"
                                                          style="color: #28f76d;"
                                                        ></i>
                                                      </td>
                                                      <td>
                                                        Initiative Register
                                                      </td>
                                                      <td>
                                                        Tolerable
                                                      </td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>23-05-2020/23-05-2021</td>
                                                      <td>80%</td>
                                                      <td>$ 66345</td>
                                                      <td>$ 33234</td>
                                                      <td>$ 36714</td>
                                                    </tr>
                                                  </tbody>
                                                  </table>
                                              </div>
                                              <div class="navigation-wrap"></div>
                                            </div>
                                          </div>
                                        </div>`);
      $(document).ready(function () {
         $(".intRegDiv").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker28");
      dataRender();
   }

   if (data == "cockTypeDiv") {
      $("#dashboard-body").append(`<div class="g-col-12">
<div class="card border rmTableContainer">
      <div class="card-header d-flex flex-wrap justify-content-between align-items-center gap-3">
         <div class="">
            <p class="head mb-0">Welcome , Sujata Sreenivas !</p>
            <p class="head1 btn btn-link p-0 mb-0" data-bs-toggle="modal" data-bs-target="#filterModal">QBRM Dashboard</p>
         </div>

         <div class="d-flex flex-wrap gap-2">
            <div class="d-flex  align-items-center rounded border">

               <select class="form-select border-0" name="state" id="maxRows" style="width: 70px; height: 30px; font-size:10px;">
                  <option value="5000">Display ALL</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="70">70</option>
                  <option value="100">100</option>
               </select>
                     <div class="p-2">

                     <p id="5000" class="size_chart mb-0" style="font-size:10px;">
                        Showing ALL</p>

                     <p id="5" class="size_chart mb-0" style="font-size:10px;">Showing
                        <strong>1</strong> to <strong>5</strong> of <strong id="demo"></strong> rows </p>
                     <p id="10" class="size_chart mb-0" style="font-size:10px;">Showing
                        <strong>1</strong> to <strong>10</strong>of <strong class="demo">61</strong> rows </p>
                     <p id="15" class="size_chart mb-0" style="font-size:10px;">Showing
                        <strong>1</strong> to <strong>15</strong> of <strong class="demo">61</strong> rows </p>
                     <p id="20" class="size_chart mb-0" style="font-size:10px;">Showing
                        <strong>1</strong> to <strong>20</strong>of <strong class="demo">61</strong>rows </p>
                     <p id="50" class="size_chart mb-0" style="font-size:10px;">Showing
                        <strong>1</strong> to <strong>50</strong>of <strong class="demo">61</strong>8 rows </p>
                     <p id="70" class="size_chart mb-0" style="font-size:10px;">Showing
                        <strong>1</strong> to <strong>70</strong> of <strong class="demo">61</strong>rows </p>
                     <p id="100" class="size_chart mb-0" style="font-size:10px;">
                        Showing <strong>1</strong> to <strong>100</strong>of <strong class="demo">61</strong> rows </p>
                     </div>
            </div>

            <div class="col-auto">
               
                  <button class="btn btn-sm btn-secondary" id="search1">
                     <i class="fas fa-search" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Search"></i></button>
              
            
<div style="display: none" id="search_section1">
               <div class="input-group" style="width: 300px;">
                  <input id="myInput" type="text" class="form-control form-control-sm"
                  placeholder="Search..." aria-label="Search..." aria-describedby="button-addon2">
                  <button class="btn btn-outline-secondary" type="button" id="close_search1"><i class="fas fa-times icon"></i></button>
                </div>
</div>



            </div>
            <div class="dropdown">
               <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i class="fas fa-upload" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Export"></i>
               </button>
               <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Export PDF</a></li>
                  <li><a class="dropdown-item" href="#">Export CSV</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
               </ul>
            </div>
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#filterModal">
               <i class="fas fa-filter" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Filter"></i>
            </button>
         </div>
      </div>

      <div class="card-body table-container">
         <div class="table-responsive">
            <table class="table access-control-table table-sortable" id="table-id" style="width: 2000px;
               overflow-x:auto;
               ">
               <thead class="zui-table">
                  <tr>
                     <th id="bu_col_head">BU</th>
                     <th id="nps_col_head">NPS%(no. of NPS Response)</th>
                     <th id="cov_col_head" style="padding:12px !important;">Coverage%</th>
                     <th id="pg_col_head">% Projects Green on Costa <br> (no. of projects received fa-user- feedback)</th>
                     <th id="np_col_head">Ns & PS%(no. of NSPS feedback)</th>
                     <th id="pgt_col_head">% Projects Green on Timeliness(no. of Projects)</th>
                     <th id="ev_col_head">Effort Variance (in person months)</th>
                     <th id="cr_col_head" style="padding:12px !important;">CR($)</th>
                     <th id="pgq_col_head">% Projects Green on Quality(no. of projects)</th>
                     <th id="pgp_col_head">% Projects Green on PCI</th>
                     <th id="eoe_col_head">Escalations (Open Escalations)</th>
                     <th id="wo_col_head">No.of Watch-Outs (Open Watch_Outs) </th>
                     <th id="oca_col_head">N0. of Open Casual Analysis</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Hi-Tech Communication & Media<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="green fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Manufacturing <br> Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Industrial & Consumer <br> Products<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Plant Engineering<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col">Digital Products <br> & Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td class="bu_col"> Digital Manufacturing<br>
                        Services<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="nps_col">86.32% (190)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cov_col">62.77%<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view1"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pg_col">93.68% (174)<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="np_col">0.33% (1)<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgt_col">97.92% (156)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="ev_col"> <br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="cr_col"> <br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgq_col">99.62% (142)<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" grren fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="pgp_col">100.00%<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="eoe_col">94.66<br>
                        <span>
                           <i class="yellow fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" red fas fa-arrow-down" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="wo_col">1<br>
                        <span>
                           <i class="red fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" green fas fa-arrow-up" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                     <td class="oca_col">2<br>
                        <span>
                           <i class="green fas fa-flag" style="font-size: 10px !important"></i>
                           <i class="gray fas fa-eye" href="#" data-bs-toggle="modal" data-bs-target="#view"
                              style="font-size: 10px !important"></i>
                           <i class=" yellow fas fa-arrow-right" style="font-size: 10px !important"></i>
                        </span>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div class="navigation-wrap"></div>

         
      </div>
   <div class="modal fade" id="view" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
         <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title fs-5">View</h4>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <div class="row">
                  <div class="col-12">
                     <textarea name="name" cols="30" rows="3" disabled="true"
                        class="form-control browser-default persp_name">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing elit.</textarea>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="modal fade" id="view1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
         <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title fs-5">Escalations</h4>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <div class="row">
                  <div class="col-12 form-group table-container">
                     <div class="table-responsive">
                        <table class="table access-control-table" style="width: 100%;
                        overflow-x:auto;
                        ">
                           <thead>
                              <tr>
                                 <th style="width: 18%; color: #fff;">
                                    Customer Name
                                 </th>
                                 <th style="color: #fff;" class="btd">Issue Details</th>
                                 <th style="color: #fff;" class="btd">Escalation Date</th>
                                 <th style="color: #fff;" class="btd">Root cause/s of Issue</th>
                                 <th style="color: #fff;" class="btd">Last Received CSAT Score, NPS</th>
                                 <th style="color: #fff;" class="btd">LD Clause Applicable (Yes/No)</th>
                                 <th style="color: #fff;" class="btd">Pendency(Days) from Raised Date</th>
                                 <th style="color: #fff;" class="btd">Criricality(Amber, Red)</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td class="btd">Customer
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"><span> <i class="red fas fa-flag"
                                          style="font-size: 10px !important"></i></span></td>
                              </tr>
                              <tr>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                              </tr>
                              <tr>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                              </tr>
                              <tr>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                              </tr>
                              <tr>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                              </tr>
                              <tr>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                              </tr>
                              <tr>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                              </tr>
                              <tr>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                                 <td class="btd"></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   
   <div class="modal left fade" id="filterModal" tabindex="" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
         <div class="modal-content">
            <div class="modal-header bg-transparent border-0"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
            <div class="modal-body">


          <div class="d-grid gap-3">
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide" id="bu_col"
                     onchange="hide_show_table(this.id);" />
                  BU
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>

            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide"
                     id="nps_col" onchange="hide_show_table(this.id);" />
                  NPS%
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide"
                     id="cov_col" onchange="hide_show_table(this.id);" />
                  Coverage%
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>

            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide" id="pg_col"
                     onchange="hide_show_table(this.id);" />
                  % Projects Green on Costa
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>

            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide" id="np_col"
                     onchange="hide_show_table(this.id);" />
                  Ns & PS%
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>

            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide"
                     id="pgt_col" onchange="hide_show_table(this.id);" />
                  % Projects Green on Timeliness
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>

            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide" id="ev_col"
                     onchange="hide_show_table(this.id);" />
                  Effort Variance
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide" id="cr_col"
                     onchange="hide_show_table(this.id);" />
                  CR ($)
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide"
                     id="pgq_col" onchange="hide_show_table(this.id);" />
                  % Projects Green on Quality
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide"
                     id="pgp_col" onchange="hide_show_table(this.id);" />
                  % Projects Green on PCI
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide"
                     id="eoe_col" onchange="hide_show_table(this.id);" />
                  Escalations
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide" id="wo_col"
                     onchange="hide_show_table(this.id);" />
                  No.of Watch-Outs
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
            <div class="form-check">
               <label class="form-check-label" style="
               font-size: 14px;
               font-weight: 500;
               color: #444444;
               ">
                  <input class="form-check-input" type="checkbox" checked="checked" value="hide"
                     id="oca_col" onchange="hide_show_table(this.id);" />
                  No.of Open Casual Analysis
                  <span class="form-check-sign">
                     <span class="check"></span>
                  </span>
               </label>
            </div>
          </div>


               
            </div>
         </div>
      </div>
   </div>
</div>
</div>`);

      $(document).ready(function () {
         var count = $("#table-id tr").length;
         document.getElementById("demo").innerHTML = count;

         var pagingInstance;

         // Function to initialize the paging plugin with the given limit
         function initPaging(limit) {
            // Destroy any existing paging instance
            if (pagingInstance) {
               pagingInstance.paging('destroy');
            }

            // Reset row visibility for pagination to work properly
            $("#table-id tbody tr").show(); // Show all rows before reinitializing pagination

            // Initialize new paging instance
            pagingInstance = $("#table-id").paging({
               limit: limit
            });
         }

         // Initial pagination setup with default limit (6)
         initPaging(6);

         // Listen for changes in the #maxRows dropdown
         $("#maxRows").change(function () {
            var newLimit = parseInt($(this).val(), 10); // Get the selected value as a number

            if (newLimit === 5000) {
               // If "Display ALL" is selected, show all rows and hide pagination controls
               $("#table-id tbody tr").show(); // Show all rows
               $(".pagination").hide(); // Hide pagination controls
            } else {
               // If a number is selected, reinitialize paging with the new limit
               initPaging(newLimit); // Reinitialize paging with the new limit
               $(".pagination").show(); // Show pagination controls
            }
         });


      });

      $(document).ready(function () {
         $(".size_chart").hide();
         $("#5").show();
         $("#maxRows").change(function () {
            $(".size_chart").hide();
            $("#" + $(this).val()).show();
         });

         $("#search1").click(function () {
            $("#search_section1").show();
            $("#search1").hide();
         });

         $("#close_search1").click(function () {
            $("#search1").show();
            $("#search_section1").hide();
         });

      });



      $(document).ready(function () {
         $(function () {
            var pressed = false;
            var start = undefined;
            var startX, startWidth;

            $("table th").mousedown(function (e) {
               start = $(this);
               pressed = true;
               startX = e.pageX;
               startWidth = $(this).width();
               $(start).addClass("resizing");
            });

            $(document).mousemove(function (e) {
               if (pressed) {
                  $(start).width(startWidth + (e.pageX - startX));
               }
            });

            $(document).mouseup(function () {
               if (pressed) {
                  $(start).removeClass("resizing");
                  pressed = false;
               }
            });
         });
      });

      $(document).ready(function () {
         function sortTableByColumn(table, column, asc = true) {
            const dirModifier = asc ? 1 : -1;
            const tBody = table.tBodies[0];
            const rows = Array.from(tBody.querySelectorAll("tr"));

            // Sort each row
            const sortedRows = rows.sort((a, b) => {
               const aColText = a
                  .querySelector(`td:nth-child(${column + 1})`)
                  .textContent.trim();
               const bColText = b
                  .querySelector(`td:nth-child(${column + 1})`)
                  .textContent.trim();

               return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
            });

            // Remove all existing TRs from the table
            while (tBody.firstChild) {
               tBody.removeChild(tBody.firstChild);
            }

            // Re-add the newly sorted rows
            tBody.append(...sortedRows);

            // Remember how the column is currently sorted
            table
               .querySelectorAll("th")
               .forEach((th) =>
                  th.classList.remove("th-sort-asc", "th-sort-desc")
               );
            table
               .querySelector(`th:nth-child(${column + 1})`)
               .classList.toggle("th-sort-asc", asc);
            table
               .querySelector(`th:nth-child(${column + 1})`)
               .classList.toggle("th-sort-desc", !asc);
         }

         document
            .querySelectorAll(".table-sortable th")
            .forEach((headerCell) => {
               headerCell.addEventListener("click", () => {
                  const tableElement =
                     headerCell.parentElement.parentElement.parentElement;
                  const headerIndex = Array.prototype.indexOf.call(
                     headerCell.parentElement.children,
                     headerCell
                  );
                  const currentIsAscending =
                     headerCell.classList.contains("th-sort-asc");

                  sortTableByColumn(
                     tableElement,
                     headerIndex,
                     !currentIsAscending
                  );
               });
            });
      });

      $(document).ready(function () {
         $(".zui-table")
            .find("th")
            .each(function () {
               $(this).click(function () {
                  $(".zui-table th")
                     .not($(this))
                     .prop("contenteditable", false);
                  $(this).prop("contenteditable", true);
               });
               $(this).blur(function () {
                  $(this).prop("contenteditable", false);
               });
            });
      });


   }


   if (data == "singleWindow") {
      $("#dashboard-body").append(`<div class="g-col-12 card-window g-col-md-6">
   <div class="card border">
      <div class="card-header border-0 bg-transparent d-flex justify-content-between">       
             <div class="">
            <input class="top_datepicker form-control form-control-sm" id="datePicker17"/>
         </div>
            <div class="dropdown">
               <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
               </button>
               <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                 <li>
                   <a class="dropdown-item" href="#intreg_setting" data-bs-toggle="modal" onclick="return false;">Settings</a>
                 </li>
                 <li>
                   <a class="dropdown-item" href="#intreg_view" data-bs-toggle="modal" onclick="return false;">View</a>
                 </li>
                 
                 <li>
                   <a class="dropdown-item" href="#" onclick="return false;">Download PDF</a>
                 </li>
                 <li>
                   <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                 </li>
                 <li>
                   <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                 </li>               
               </ul>
             </div>

        
      </div>
   <div class="card-body">
      <div class="grid gap-3">         
         <div class="g-col-12">
            <div class="d-flex align-items-center justify-content-between banner color-cyan p-4">
<div>
   <h4 class="bannerfont">Single Window</h4>
            <p class="bannerfont1">Hello  Sujata Sreenivas, Welcome back!<p>
</div>
<div>
<img height="150" src="assets/images/require.png" style="object-fit: contain;">
</div>
            </div>
            
           
         </div>
         <div class="g-col-12 g-col-lg-3">
            <h3 class="h5 text-center ">Development PDLC </h3>
            <div class="section effect1 grid gap-2">                                 
               <div class="card-view color-purple text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Requirement</h4>
                  <p>
                     <span>Tools,</span>
                     <span>Artifacts,</span>
                     <span>Templates</span>
                  </p>
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-purple text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Design</h4>                  
                   <p><span>Tools,</span> <span>Artifacts,</span> <span>Templates</span> </p>
                   <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-purple text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Develop</h4>                                    
                   <p><span>Tools,</span> <span>Artifacts,</span> <span>Templates</span> </p>
                   <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-purple text-center g-col-12  p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Testing</h4>                                    
                   <p><span>Tools,</span> <span>Artifacts,</span> <span>Templates</span> </p>
                   <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-purple text-center g-col-12  p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Project Closure</h4>                                    
                   <p><span>Tools,</span> <span>Artifacts,</span> <span>Templates</span> </p>
                   <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
           </div>

         </div>
         <div class="g-col-12 g-col-lg-6">
            <h3 class="h5 text-center ">Project Monitoring</h3>
            <div class="section effect1 grid gap-2 px-4 border-start border-end">                                 
               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                 
                  <h4 class="h6">Criticality Assessment</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Risk & Opportunity</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Rsource, Skill Plan</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Estimation, Task Plan (Milestones,Dependencies..)</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Contract  Management (KPS)</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Change Requests</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Defects (Internal, External)</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Escalations</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Metrics</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">DAR</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-cyan text-center g-col-12 g-col-md-6 p-2">                  
                  <h4 class="h6">Supplier Management</h4>                  
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

            </div>
         </div>
         <div class="g-col-12 g-col-lg-3">
            <h3 class="h5 text-center ">Others</h3>
            <div class="section effect1 grid gap-2" style="--stratroom-columns:1">                                 
               <div class="card-view color-orange text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Project Initiation*</h4>                 
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-orange text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Tailoring (mask tailored blocks)</h4>                 
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-orange text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Tailoring (mask tailored blocks)</h4>                 
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>

               <div class="card-view color-orange text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">PRM(SMR)</h4>                 
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-orange text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">PSR</h4>                 
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-orange text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Cst. Supplied Items</h4>                 
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
               <div class="card-view color-orange text-center g-col-12 p-2">
                  <span class="icon fs-1"><i class="fas fa-folder file"></i></span>
                  <h4 class="h6">Knowledge Portal</h4>                 
                  <div class="d-flex flex-wrap gap-2 justify-content-center">
                     <a href="#" class="fa fa-eye view" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></a>
                     <a href="#" class="fa fa-edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"></a>
                     <a href="#" class="fas fa-link fa-rotate-45" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Link"></a>
                     <a href="#" class="red fa fa-flag" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save"></a>
                  </div>               
               </div>
            </div>
         </div>
      </div>

   </div>
      
</div>
</div>
`);
      $(document).ready(function () {
         $("#intRegister").paging({
            limit: 7
         });
      });
      initDateRangePicker("#datePicker17");
      dataRender();

      $(document).ready(function () {
         $(".int-reg-multi-select").select2();
      });
   }


}


$(document).ready(function () {
  // Function to update the class based on selection
  function updateGridColumns() {
      $("#dashboard-body").removeClass("column2-checked column3-checked");

      if ($("#column2").is(":checked")) {
          $("#dashboard-body").addClass("column2-checked");
      } else if ($("#column3").is(":checked")) {
          $("#dashboard-body").addClass("column3-checked");
      }
  }

  // Run on page load (to apply the default checked option)
  updateGridColumns();

  // Listen for changes in radio button selection
  $("input[name='updategridRadio']").change(function () {
      updateGridColumns();
  });
});
