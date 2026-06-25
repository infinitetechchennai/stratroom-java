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
        <div class="grid gap-3 chart-setting-clone">
         <div class="g-col-12">
            <hr style="border-top: 1px solid #505050"/>
          </div>
          <div class="g-col-12 text-end">
            <button class="btn btn-danger rounded-circle remove-btn" type="button">
              <i class="fas fa-close"></i>
            </button>
          </div>
          <div class="g-col-12 g-col-md-9">
            <label for="" class="form-label">Display Name</label>
            <input
              type="text"
              class="form-control browser-default"
            />
          </div>
          <div class="g-col-12 g-col-md-3 color_picks_1">
            <label class="form-label"
              for="sub_initative_progress"
              style="text-align: left"
              >Color</label
            >
            <div class="input-group">
             <input id="option1color1" type="text" class="form-control" />
                <span class="input-group-text pickr"></span>             
            </div>
          </div>

          <div class="form-group g-col-md-12">
            <label for="" class="form-label">Data Field</label>
            <input
              type="text"
              class="form-control browser-default"
              id="kpi_formula"
              readonly
              data-toggle="modal"
              data-target="#kpi-calculator-modal"
              role="button"
            />
            <a
              href="#"
              id="kpi_trigger1"
              data-toggle="modal"
              data-target=".kpi-calculator-modal"
            ></a>
          </div>

          <div class="form-group g-col-12 g-col-md-6">
            <label for="" class="form-label">Axis</label>
            <select class="form-control browser-default">
              <option value="Y-axis">Y-axis</option>
              <option value="Z-axis">Z-axis</option>
            </select>
          </div>
          <div class="form-group g-col-12 g-col-md-6">
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

// $("#add-chart-setting").click(function () {
//    $("#chart-setting-div").append(`
//         <div class="row g-3 chart-setting-clone">
//          <div class="col-12">
//             <hr style="border-top: 1px solid #505050"/>
//           </div>
//           <div class="col-md-12 text-end">
//             <button class="btn btn-danger rounded-circle remove-btn" type="button">
//               <i class="fas fa-close"></i>
//             </button>
//           </div>
//           <div class="col-md-10">
//             <label for="" class="form-label">Display Name</label>
//             <input
//               type="text"
//               class="form-control browser-default"
//             />
//           </div>
//           <div class="col-md-2 color_picks_1">
//             <label class="form-label"
//               for="sub_initative_progress"
//               style="text-align: left"
//               >Color</label
//             >
//             <div class="input-group" style="margin-bottom: 0">
//               <div class="input-group-append">
//                 <span
//                   class="input-group-text pickr"
//                   style="
//                     width: 90px;
//                     border-radius: 0px;
//                     height: 30px;
//                   "
//                 ></span>
//               </div>
//             </div>
//           </div>

//           <div class="form-group col-md-12">
//             <label for="" class="form-label">Data Field</label>
//             <input
//               type="text"
//               class="form-control browser-default"
//               id="kpi_formula"
//               readonly
//               data-toggle="modal"
//               data-target="#kpi-calculator-modal"
//               role="button"
//             />
//             <a
//               href="#"
//               id="kpi_trigger1"
//               data-toggle="modal"
//               data-target=".kpi-calculator-modal"
//             ></a>
//           </div>

//           <div class="form-group col-md-6">
//             <label for="" class="form-label">Axis</label>
//             <select class="form-control browser-default">
//               <option value="Y-axis">Y-axis</option>
//               <option value="Z-axis">Z-axis</option>
//             </select>
//           </div>
//           <div class="form-group col-md-6">
//             <label for="" class="form-label">Type</label>
//             <select class="form-control browser-default">
//               <option value="Actual">Actual</option>
//               <option value="Target">Target</option>
//               <option value="Budget">Budget</option>
//               <option value="Forecast">Forecast</option>
//               <option value="Gap">Gap</option>
//             </select>
//           </div>
         
//         </div>`);
// });

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
      $("#text-body").append(`<div class="card text-start text-card text-card-main border"
    style="--stratroom-border-color:#d3f4f1; --stratroom-card-bg:#f2fbfa">
    <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
        <div class="icon">
            <img width="16" height="16" src="assets/images/icons/dollar-i.svg" alt="dollar">
        </div>
        <div class="text-muted period ms-auto text-end">
            <!-- Jan 2019 - Dec 2020 -->
            <input class="top_datepicker form-control form-control-sm " id="datePickerTextCard01" />


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
        <h5 class="amount mb-1 mt-auto text-danger">$ 202.35 M</h5>
        <div class="d-flex gap-2 align-items-center">
            <div class="amount-trend">$ 202.36 M</div>
            <div class="d-flex gap-1 ms-auto">
                <a href="#kpi-story-card-modal" data-bs-toggle="modal" class="icon link">
                    <img width="16" height="16" src="assets/images/icons/link-i.svg" alt="Link">
                </a>
                <span class="icon trend-low">
                    <img width="16" height="16" src="assets/images/icons/down-i.png" alt="Trend Low">
                </span>
            </div>
        </div>
    </div>
</div>`);
 initDateRangePicker("#datePickerTextCard01"); 

   }
   if (data == "normalTextType2") {
      $("#text-body").append(`<div class="card text-start text-card text-card-main border"
     style="--stratroom-border-color:#e1fec9; --stratroom-card-bg:#f1ffe5">
    <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
        <div class="icon">
            <img width="16" height="16" src="assets/images/icons/percent-i.svg" alt="percent">
        </div>
        <div class="text-muted period ms-auto">
            <input class="top_datepicker form-control form-control-sm " id="datePickerTextCard02" />
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
        <h5 class="amount mb-1 mt-auto text-success">$ 202.35 M</h5>
        <div class="d-flex gap-2 align-items-center">
            <div class="amount-trend">$ 202.36 M</div>
            <div class="d-flex gap-1 ms-auto">
                <a href="#kpi-story-card-modal" data-bs-toggle="modal" class="icon link">
                    <img width="16" height="16" src="assets/images/icons/link-i.svg" alt="Link">
                </a>
                <span class="icon trend-up">
                    <img width="16" height="16" src="assets/images/icons/up-i.png" alt="Trend Low">
                </span>
            </div>
        </div>
    </div>
</div>`);
 initDateRangePicker("#datePickerTextCard02"); 
   }
   if (data == "chartTextType") {
      $("#text-body").append(`<div class="card text-start text-card text-card-main border"
            style="--stratroom-border-color:#f5eeeb; --stratroom-card-bg:#faf7f6">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                <div class="icon">
                    <img width="16" height="16" src="assets/images/icons/kpi-i.svg" alt="kpi">
                </div>
                <div class="text-muted period ms-auto">
                    <input class="top_datepicker form-control form-control-sm " id="datePickerTextCard03" />
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
                <h5 class="amount mb-1 mt-auto text-danger">$ 202.35 M</h5>
                <div class="d-flex gap-2 align-items-center">
                    <div class="amount-trend">$ 202.36 M</div>
                    <div class="d-flex gap-1 ms-auto">
                        <a href="#kpi-story-card-modal" data-bs-toggle="modal" class="icon link">
                            <img width="16" height="16" src="assets/images/icons/link-i.svg" alt="Link">
                        </a>
                        <span class="icon trend-low">
                            <img width="16" height="16" src="assets/images/icons/down-i.png" alt="Trend Low">
                        </span>
                    </div>
                </div>
            </div>
        </div>`);
         initDateRangePicker("#datePickerTextCard03"); 
   }
   if (data == "normalTextType4") {
      $("#text-body").append(`<div class="card text-start text-card text-card-main border" style="--stratroom-border-color:#fef4c7; --stratroom-card-bg:#fffbea">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
              <div class="icon">
                <img width="16" height="16" src="assets/images/icons/hash-i.svg" alt="hash">
              </div>
              <div class="text-muted period ms-auto">
                <input class="top_datepicker form-control form-control-sm " 
                                        id="datePickerTextCard04" />
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
              <h5 class="amount mb-1 mt-auto text-success">$ 202.35 M</h5>
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
           initDateRangePicker("#datePickerTextCard04"); 
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

                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID2" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="bubblechartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                                  <div class="form-group text-end">
                                <select id="bdc01ExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="bubblechartType02"></div>
                              
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab2"
                                style="display: none;">

 <table class="table table-bordered w-100" id="bubble-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>

                              
                            </div>
                        </div>
                    </div>
                </div>`);

                if (typeof jsonData1 !== "undefined") {
            bubbleRenderType02(jsonData1);
            initializeDrilldownTable("bubble-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }

        initDateRangePicker("#datePickerBLType02"); 
      
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

   //bubble-chart-type-02 end


   // column-chart-type-02
   if (data == "column-chart-type-02") {
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
                                        id="datePickerCLType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID3" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="columnchartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                                <div class="form-group text-end">
                                <select id="cdc01ExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="columnchartType02"></div>
                               
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab3"
                                style="display: none;">

<table class="table table-bordered w-100" id="column-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>

                               
                            </div>
                        </div>
                    </div>
                </div>`);



                if (typeof jsonData1 !== "undefined") {
            columnRenderType02(jsonData1);
            initializeDrilldownTable("column-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
   
      initDateRangePicker("#datePickerCLType02");
     
     

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
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID4" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="linechartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                                <div class="form-group text-end">
                                <select id="ldc01ExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="linechartType02"></div>
                               
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab4"
                                style="display: none;">

<table class="table table-bordered w-100" id="line-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>

                               
                            </div>
                        </div>
                    </div>
                </div>`);

      if (typeof jsonData1 !== "undefined") {
            lineRenderType02(jsonData1);
            initializeDrilldownTable("line-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }


      initDateRangePicker("#datePickerLType02");
      

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

   

   //line-chart-type-02 end


   // area-chart-type-02 start
   if (data == "area-chart-type-02") {
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
                                        id="datePickerARType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID1" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="areachartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                                <div class="form-group text-end">
                                <select id="adc01ExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="areachartType02"></div>
                               
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab1"
                                style="display: none;">
<table class="table table-bordered w-100" id="area-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>

                                
                            </div>
                        </div>
                    </div>
                </div>`);


if (typeof jsonData1 !== "undefined") {
            areaRenderType02(jsonData1);
            initializeDrilldownTable("area-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }

      initDateRangePicker("#datePickerARType02");
     

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
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID5" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="piechartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                                <div class="form-group text-center mb-2">
                                <select id="pdc01ExecSelect">
                                </select>
                                <select id="pdc01MonthSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="piechartType02"></div>
                                
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab5"
                                style="display: none;">
<table class="table table-bordered w-100" id="pie-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>


                                
                            </div>
                        </div>
                    </div>
                </div>`);

if (typeof jsonData1 !== "undefined") {
            pieRenderType02(jsonData1);
            initializeDrilldownTable("pie-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }

      initDateRangePicker("#datePickerPIEType02");
   
     

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

   //pie-chart-type-02 end


   // multiaxis-chart-type-02 start
   if (data == "multiaxis-chart-type-02") {
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
                                        id="datePickerMAType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID6" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="multiaxischartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                                
 <div class="form-group text-end">
                                <select id="mdc01ExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="multiaxischartType02"></div>
                               
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="tableTab6"
                                style="display: none;">


                                <table class="table table-bordered w-100" id="multiaxis-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>

                               
                            </div>
                        </div>
                    </div>
                </div>`);

       if (typeof jsonData1 !== "undefined") {
            multiaxisRenderType02(jsonData1);
            initializeDrilldownTable("multiaxis-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }


      initDateRangePicker("#datePickerMAType02");
     

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
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID7" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="stackedchartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                                 <div class="form-group text-end">
                                <select id="sdc01ExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="stackedchartType02"></div>
                            
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="drilldownTable7"
                                style="display: none;">
                                  <table class="table table-bordered w-100" id="stacked-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>

                                
                            </div>
                        </div>
                    </div>
                </div>`);
                if (typeof jsonData1 !== "undefined") {
            stackedRenderType02(jsonData1);
            initializeDrilldownTable("stacked-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePickerSTType02");
     $("#tableTabID7").click(function () {
        $(this).hide();
        $("#stackedchartTab").hide();
         $("#stackedchartTabID").show();
         $("#drilldownTable7").show();
      });
      $("#stackedchartTabID").click(function () {
        $(this).hide();
         $("#drilldownTable7").hide();

         $("#stackedchartTab").show();
         $("#tableTabID7").show();
      });
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
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID8" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="negativecolumnTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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



     // radialMulti-chart-type-02 start
   if (data == "radialMulti-chart-type-02") {
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
                                        id="datePickerRMCType02" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div>
                                    <i class="btn btn-sm btn-icon fas fa-table" id="tableTabID9" style=""></i>
                                    <i class="btn btn-sm btn-icon fas fa-chart-line" id="radialMultichartTabID"
                                        style="display: none;"></i>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                        <li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#radialMulti-large-type02"
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
                            <div id="radialMultichartTab">
                                <div class="form-group text-end">
                                <select id="radialExecSelect-02">
                                </select>
                                <select id="radialMonthSelect-02">
                                </select>
                                </div>
                       <div id="RadialMultichart-02"></div>
                            
                            </div>
                            <div class="flex-column employee_div_body_box activities-box" id="drilldownTable9"
                                style="display: none;">
                                  <table class="table table-bordered w-100" id="radialMulti-02-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>

                                
                            </div>
                        </div>
                    </div>
                </div>`);
                if (typeof jsonData1 !== "undefined") {
            radialMultiRenderType02(jsonData1);
            initializeDrilldownTable("radialMulti-02-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePickerRMCType02");
      
     $("#tableTabID9").click(function () {
        $(this).hide();
        $("#radialMultichartTab").hide();
         $("#radialMultichartTabID ").show();
         $("#drilldownTable9").show();
      });
      $("#radialMultichartTabID").click(function () {
        $(this).hide();
         $("#drilldownTable9").hide();

         $("#radialMultichartTab").show();
         $("#tableTabID9").show();
      });
   }
   //radialMulti-chart-type-02 end




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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewdataDrillModal"
                        onclick="return false;">View</a>
                    </li>
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
                        <div class="card-body row g-2">
                            <div class="col-12 col-md-6">
                                 <div class="form-group text-end">
                                <select id="bdcExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="bdc-type-02"></div>
                             
                            </div>
                            <div class="col-12 col-md-6">
                                    <table class="table table-bordered w-100" id="drilldownTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>                              
                            </div>
                        </div>
                    </div>
                </div>`);

                 if (typeof jsonData1 !== "undefined") {
            bdcRenderType02(jsonData1);
            initializeDrilldownTable("drilldownTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
        initDateRangePicker("#bdc-dp-type-02");
   }

   
   //bubble-dchart-type-02 end


   
   // column-dchart-type-02 start
   if (data == "column-dchart-type-02") {
      $("#dashboard-body").append(`<div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">%
                                        Customer
                                        conversion rate (measured)</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="cdc-dp-type-02" />
                                </div>
                            </div>
                            <div class="card-actions">                                
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                
                                        <li>
                                            <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                                data-bs-target="#viewdataDrillModal" onclick="return false;">View</a>
                                        </li>
                                        <li>
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
                                <div class="form-group text-end">
                                <select id="cdcExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="cdc-type-02"></div>
                
                            </div>
                            <div class="col-12 col-md-6">                            
                                <table class="table table-bordered w-100" id="drilldowncolumnTable">
                                    <thead></thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>`);

 if (typeof jsonData1 !== "undefined") {
            cdcRenderType02(jsonData1);
            initializeDrilldownTable("drilldowncolumnTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
        initDateRangePicker("#cdc-dp-type-02");

   }

   

   //column-dchart-type-02 end



 // line-dchart-type-02
   if (data == "line-dchart-type-02") {
      $("#dashboard-body").append(`<div class="g-col-12">
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                    <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewdataDrillModal"
                        onclick="return false;">View</a>
                    </li>
                                        <li>    
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
                                 <div class="form-group text-end">
                                <select id="ldcExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="ldc-type-02"></div>
                                
                            </div>
                            <div class="col-12 col-md-6">
                                 <table class="table table-bordered w-100" id="line-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table> 
                            </div>
                        </div>
                    </div>
                </div>`);
 if (typeof jsonData1 !== "undefined") {
            ldcRenderType02(jsonData1);
            initializeDrilldownTable("line-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
        initDateRangePicker("#ldc-dp-02");      
   }

   

   //line-dchart-type-02 end


   // area-dchart-type-02 start
   if (data == "area-dchart-type-02") {
      $("#dashboard-body").append(`<div class="g-col-12">
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="">
                                    <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewdataDrillModal"
                        onclick="return false;">View</a>
                    </li>
                                        <li>    
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
                                <div class="form-group text-end">
                                <select id="adcExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="adc-type-02"></div>
                            </div>
                            <div class="col-12 col-md-6">
                                 <table class="table table-bordered w-100" id="area-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>`);

if (typeof jsonData1 !== "undefined") {
            adcRenderType02(jsonData1);
            initializeDrilldownTable("area-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
        initDateRangePicker("#adc-dp-02"); 
   }

   
   // area-dchart-type-02 end
  // multiaxis-dchart-type-02 start
  if (data == "multiaxis-dchart-type-02") {
   $("#dashboard-body").append(` <div class="g-col-12">
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewdataDrillModal"
                        onclick="return false;">View</a>
                    </li>
                                        <li>
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
                                 <div class="form-group text-end">
                                <select id="mdcExecSelect">
                                </select>
                                </div>
                                <div style="width: 100%;" id="mdc-type-02"></div>
                            </div>
                            <div class="col-12 col-md-6">
                               <table class="table table-bordered w-100" id="multiaxis-dchartTable">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>`);

if (typeof jsonData1 !== "undefined") {
            mdcRenderType02(jsonData1);
            initializeDrilldownTable("multiaxis-dchartTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
        initDateRangePicker("#mdc-dp-02"); 

   


}


//multiaxis-dchart-type-02 end













   //   Widget Type Chart Start
   if (data == "BubbleChart") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6">
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                            <div class="form-group text-end">
                                <select id="bcExecSelect">
                                </select>
                                </div>
                            <div style="width: 100%;" id="Bubblechart"></div>
                        </div>
                    </div>
                </div>`);
                if (typeof jsonData1 !== "undefined") {
            bubbleRender(jsonData1);
            
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePickerBL");
    
   }

   

   if (data == "ColumnChart") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6">
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                             <div class="form-group text-end">
                                <select id="cdExecSelect">
                                </select>
                                </div>
                            <div id="Columnchart"></div>
                        </div>
                    </div>
                </div>`);

         if (typeof jsonData1 !== "undefined") {
            columnRender(jsonData1);
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePickerCL");
   }



   if (data == "LineChart") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6 chart">
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                             <div class="form-group text-end">
                                <select id="lcExecSelect">
                                </select>
                                </div>
                            <div id="Linechart"></div>
                        </div>
                    </div>
                </div>`);

         if (typeof jsonData1 !== "undefined") {
            lineRender(jsonData1);
        } else {
            console.error("jsonData1 not loaded yet.");
        }

      initDateRangePicker("#datePickerL");
      
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                            <div class="form-group text-end">
                                <select id="acExecSelect">
                                </select>
                                </div>
                            <div id="Areachart"></div>
                        </div>
                    </div>
                </div>`);

         if (typeof jsonData1 !== "undefined") {
            areaRender(jsonData1);
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePickerAR");
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                            <div class="form-group text-center">
                                <select id="pcExecSelect">
                                </select>
                                <select id="pcMonthSelect">
                                </select>
                                </div>
                            <div id="Piechart"></div>
                        </div>
                    </div>
                </div>`);
                if (typeof jsonData1 !== "undefined") {
            pieRender(jsonData1);
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePickerPIE");
   }



   if (data == "WaterfallChart") {
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
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerWF" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                             <div class="form-group text-end">
                                <select id="wcExecSelect">
                                </select>
                                </div>
                            <div id="Waterfallchart"></div>
                        </div>
                    </div>
                </div>`);
                if (typeof jsonData1 !== "undefined") {
            waterfallRender(jsonData1);
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePickerWF");
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
        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
         <div class="form-group text-end">
                                <select id="mcExecSelect">
                                </select>
                                </div>
      <div id="Multiaxis"></div>
    </div>
  </div>
</div>`);

if (typeof jsonData1 !== "undefined") {
            multiaxisRender(jsonData1);
        } else {
            console.error("jsonData1 not loaded yet.");
        }

      initDateRangePicker("#datePickerMA");
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
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
                             <div class="form-group text-end">
                                <select id="scExecSelect">
                                </select>
                                </div>
                            <div id="Stackedchart"></div>
                        </div>
                    </div>
                </div>`);
if (typeof jsonData1 !== "undefined") {
            stackedRender(jsonData1);
        } else {
            console.error("jsonData1 not loaded yet.");
        }


      initDateRangePicker("#datePickerST");
      
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
        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
        <div class="form-group text-end">
                                <select id="radialExecSelect">
                                </select>
                                <select id="radialMonthSelect">
                                </select>
                                </div>
      <div id="RadialMultichart"></div>
    </div>
  </div>
</div>`);
// if (typeof jsonData1 !== "undefined") {
//             radialmultipleRender();
//         } else {
//             console.error("jsonData1 not loaded yet.");
//         }
       radialmultipleRender();
      initDateRangePicker("#datePickerRM");

      
   }

   
   if (data == "GanttChart") {
      $("#dashboard-body")
         .append(`
<div class="g-col-12 g-col-md-6 chart">
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
        <input class="top_datepicker form-control form-control-sm" id="datePickerGC"/>
      </div>
      </div>
      <div class="card-actions">
    
      <div class="dropdown">
        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
          <li>
            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" onclick="return false;">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#chart_view_popup" data-bs-toggle="modal">Enlarge</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <div class="card-body overflow-auto gantt-chart" style="height: 340px;">
         <div id="gantt" style="width: 100%"></div>
    </div>
  </div>
</div>`);

      //  radialmultipleRender();
     ganttChartRender();
      initDateRangePicker("#datePickerGC");

      
   }
if (data == "HeatMap") {
      $("#dashboard-body")
         .append(`<div class="g-col-12 g-col-md-6">
    <div class="card custom-card table-card table-container">
        <div class="card-header">
            <div class="c-header-left">
                <div class="heat-map">

                    <select id="heatmapselection" name="" class="form-select form-select-sm">
                        <option value="inherent">Inherent Heat Map</option>
                        <option value="residual">Residual Heat Map</option>
                    </select>
                </div>
                <div class="date-picker">
                    <input class="top_datepicker form-control form-control-sm" id="datePickerHMC" />
                </div>
            </div>


            <div class="card-actions">
                <div class="heatToggleCheck">
                    <input type="checkbox" id="heatmapToggle" class="d-none">
                    <label class="btn btn-sm btn-icon" for="heatmapToggle">
                        <i class="fas fa-chart-line"></i>
                    </label>
                </div>

                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">

                        <li>
                            <a class="dropdown-item" href="#heatmapViewModal" data-bs-toggle="modal">View</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body overflow-auto" style="height: 340px;">

            <div id="heatmapChart" style="width:100%; height:340px; display:block;"></div>

            <div id="heatmapTable" style="display:none;">
                <table id="inherentTable" class="table table-bordered w-100">
                    <thead>
                        <tr>
                            <th>Impact Name</th>
                            <th>Risk Impact Category</th>
                            <th>Type</th>
                            <th>Impact Value</th>
                            <th>Likelihood Value</th>
                            <th>Risk Score</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

        </div>
    </div>
</div>`);

      //  radialmultipleRender();
    heatmapRender();
      initDateRangePicker("#datePickerHMC");

      
   }

   

   //   Widget Type Chart End

   //   Widget Type Table Start
   if (data == "drilldownDragDiv") {
      $("#dashboard-body").append(`<div class="g-col-12">
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
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
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
                                            <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                
                        <div class="card-body">
                            <table class="table table-bordered w-100" id="drilldownTable">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>`);

                  if (typeof jsonData1 !== "undefined") {
            initializeDrilldownTable("drilldownTable", jsonData1, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
       
      
      initDateRangePicker("#datePicker14");
     

   }

   if (data == "kpidrilldownDragDiv") {
      $("#dashboard-body").append(`<div class="g-col-12">
                    <div class="card custom-card table-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">KPI
                                        Drill Down Table</strong>
                                </h5>
                                <div class="date-picker">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker15" />
                                </div>
                            </div>
                            <div class="card-actions">


                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon show" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#kpi-drilldown-setting-modal" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#kpi_drilldown_view" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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

                        <div class="card-body">
                            <table class="table table-bordered w-100" id="kpidrilldownTable">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>`);
      if (typeof jsonData1 !== "undefined") {         
            initializeKpiDrilldownTable("kpidrilldownTable", jsonData2, "Monthly");
        } else {
            console.error("jsonData1 not loaded yet.");
        }
      initDateRangePicker("#datePicker15");
      
   }

   if (data == "kpistatusCount") {
      $("#dashboard-body").append(`<div class="g-col-12">
    <div class="card custom-card table-card h-100">
        <div class="card-header">
            <div class="c-header-left">
                <h5 class="card-title">
                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">KPI Status Count </strong>
                </h5>
                <div class="date-picker">
                    <input class="top_datepicker form-control form-control-sm" id="datePicker18" />
                </div>
            </div>
            <div class="card-actions">

                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li>
                            <a class="dropdown-item" href="#kpistatusCountsettingsModal"
                                data-bs-toggle="modal">Settings</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#kpiStatusCountViewModal" data-bs-toggle="modal">View</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
        <div class="card-body">
            <table class="table table-bordered w-100" id="kpistatusCountsTable"></table>

        </div>
    </div>
</div>`);
       
   initializeKpiStatusCountTable(
  '#kpistatusCountsTable',
  'kpistatusCounts.json',
  kpiStatusCountColumns,
  preprocessKPIData,
  true // hasParentColumn
); 
        
      initDateRangePicker("#datePicker18");
   }

   if (data == "projectstatusCount") {
      $("#dashboard-body").append(`<div class="g-col-12">
    <div class="card custom-card table-card h-100">
        <div class="card-header">
            <div class="c-header-left">
                <h5 class="card-title">
                    <strong editable="true" contenteditable="true"
                        onkeypress="return (this.innerText.length <= 36)">Project Status Count </strong>
                </h5>
                <div class="date-picker ">
                    <input class="top_datepicker form-control form-control-sm" id="datePicker19" />
                </div>
            </div>
            <div class="card-actions">

                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li>
                            <a class="dropdown-item" href="#projectStatusCountettingsModal" data-bs-toggle="modal"
                                onclick="return false;">Settings</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#projectStatusCountViewModal" data-bs-toggle="modal"
                                onclick="return false;">View</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
            <table class="table table-bordered w-100" id="projectStatusCountsTable">

            </table>
        </div>
    </div>
</div>`);

    
 initializeKpiStatusCountTable(
  '#projectStatusCountsTable',
  'projectStatusCounts.json',
  projectStatusCountColumns,
  preprocessKPIData,
  false // no parent column
);
initDateRangePicker("#datePicker19");
      
   }

   if (data == "riskstatusCount") {
      $("#dashboard-body").append(` <div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Risk Status Count</strong>
                                </h5>
                                <div class="date-picker ">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker17" />
                                </div>
                            </div>
                
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#riskstatusCountsettings" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#riskcount_view" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>
                                        <li>
                                           <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                
                        <div class="card-body">
                            <table class="table table-bordered w-100" id="riskStatusCountsTable">
                                <thead>
                                    <tr>
                                        <th class="text-start">Department Name</th>
                                        <th>LOW</th>
                                        <th>MEDIUM</th>
                                        <th>HIGH</th>
                                        <th>EXTREME</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>`);
      initializeDataTableOnce('riskStatusCountsTable', 'dataRiskStatusCount.json', riskStatusCountColumns);
     
      initDateRangePicker("#datePicker17");
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
                         <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                           <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                               <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
      $("#dashboard-body").append(`<div class="g-col-12">
    <div class="card custom-card h-100">
        <div class="card-header">
            <div class="c-header-left">
                <h5 class="card-title">
                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">ERM Risk Register</strong>
                </h5>
                <div class="date-picker ">
                    <input class="top_datepicker form-control form-control-sm" id="datePicker21" />
                </div>
            </div>
            <div class="card-actions">
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li>
                            <a class="dropdown-item" href="#ermriskreg_setting" data-bs-toggle="modal"
                                onclick="return false;">Settings</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#ermriskreg_view" data-bs-toggle="modal"
                                onclick="return false;">View</a>
                        </li>
                        <li>
                           <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
        <div class="card-body">
            <table class="table table-bordered w-100" id="ermriskRegister">
                <thead>
                    <tr>
                        <th>Risk <br> Status</th>
                        <th>Department <br> Name</th>
                        <th>Risk ID</th>
                        <th>Risk <br> Name</th>
                        <th>KPI</th>
                        <th>POS</th>
                        <th>ISO</th>
                        <th>Information Asset</th>
                        <th>Others</th>
                        <th>Inherent Score</th>
                        <th>Residual Risk Score</th>
                        <th>Mitigation <br> Plan</th>
                        <th>Person in Charge</th>
                        <th>Target <br>Completion Time</th>
                        <th>Changes in The <br> Target Completion <br> Time</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>`);
     initializeDataTableOnce('ermriskRegister', 'ermRiskRegister.json', ermRiskRegisterColumns);
      initDateRangePicker("#datePicker21");

   }

   if (data == "riskmonitersreg") {
      $("#dashboard-body").append(`<div class="g-col-12">
                <div class="card custom-card h-100">
                    <div class="card-header">
                        <div class="c-header-left">
                            <h5 class="card-title">
                                <strong editable="true" contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)">Risk Monitoring</strong>
                            </h5>
                            <div class="date-picker ">
                                <input class="top_datepicker form-control form-control-sm" id="datePicker13" />
                            </div>
                        </div>
                        <div class="card-actions">
                            <div class="dropdown">
                                <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                    <li>
                                        <a class="dropdown-item" href="#riskmonitors" data-bs-toggle="modal"
                                            onclick="return false;">Settings</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#riskMonitoringViewModal" data-bs-toggle="modal"
                                            onclick="return false;">View</a>
                                    </li>
            
                                    <li>
                                       <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                        <table class="table table-bordered w-100" id="riskMonitersRegTable">
                            <tr>
                                <th>Department <br> Name</th>
                                <th>Risk Code</th>
                                <th>Risk <br> Name</th>
                                <th>Mitigation <br> Plan</th>
                                <th>Notes</th>
                                <th>Target <br>Completion Time</th>
                                <th>Changes in The <br> Target Completion <br> Time</th>
                                <th>Progress(%)</th>
                                <th>Status</th>
                                <th>Person in <br> Charge</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>`);
      initializeDataTableOnce('riskMonitersRegTable', 'riskMoniters.json', riskMonitorsColumns);
      initDateRangePicker("#datePicker13");
      
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
                                       <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
      $("#dashboard-body").append(`<div class="g-col-12">
                            <div class="card custom-card h-100">
                                <div class="card-header">
                                    <div class="c-header-left">
                                        <h5 class="card-title">
                                            <strong editable="true" contenteditable="true"
                                                onkeypress="return (this.innerText.length <= 36)">BIA-RPO Report</strong>
                                        </h5>
                                        <div class="date-picker ">
                                            <input class="top_datepicker form-control form-control-sm" id="datePicker23" />
                                        </div>
                        
                                    </div>                        
                                    <div class="card-actions">                                                                        
                                        <div class="dropdown">
                                            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                                <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                <li>
                                                    <a class="dropdown-item" href="#biaRpoReportSettings" data-bs-toggle="modal"
                                                        onclick="return false;">Settings</a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" href="#biaRpoReportViewModal" data-bs-toggle="modal"
                                                        onclick="return false;">View</a>
                                                </li>
                        
                                                <li>
                                                   <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                        
                                <div class="card-body">                        
                                    <table class="table table-bordered w-100" id="biaRpoReportTable">
                                        <thead>
                                            <tr>
                                                <th>Department Name</th>
                                                <th>Process</th>
                                                <th>Name of Vital Records</th>
                                                <th>Type of Media</th>
                                                <th>Backup Method</th>
                                                <th>Backup Time</th>
                                                <th>Retention</th>
                                                <th>Database Recovery Strategy</th>
                                            </tr>
                                        </thead>
                                    </table>
                    
                                </div>
                            </div>
                        </div>`);
                        initializeDataTableOnce('biaRpoReportTable', 'biaRpoReport.json', biaRpoReportColumns);
      
      initDateRangePicker("#datePicker23");
      
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
                                           <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                                             <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                                               <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                                                 <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                                                   <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
      $("#dashboard-body").append(` <div class="g-col-12">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Initiative Register</strong>
                                </h5>
                                <div class="date-picker ">
                                    <input class="top_datepicker form-control form-control-sm" id="datePicker28" />
                                </div>
                            </div>
                
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
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
                                           <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                
                        <div class="card-body">
                
                            <table class="table table-bordered w-100" id="initiativeRegisterTable">
                                <thead>
                                    <tr>
                                        <th class="text-start">Department Name</th>
                                        <th>Name</th>
                                        <th>Impact</th>
                                        <th>Planned Start/ End Date</th>
                                        <th>Actual Start/ End Date</th>
                                        <th>Progress</th>
                                        <th>Target</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                        <th>Utilised</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                            </table>
                
                
                
                        </div>
                    </div>
                </div>`);
      initializeDataTableOnce('initiativeRegisterTable', 'dataInitiativeRegister.json', initiativeRegisterColumns);
      initDateRangePicker("#datePicker28");
     
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
                  <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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

    if (data == "intProgressCountDiv") {
      $("#dashboard-body").append(`<div class="g-col-12">
                    <div class="card custom-card table-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Initiative Progress Count Table</strong>
                                </h5>
                                <div class="date-picker ">
                                    <input class="top_datepicker form-control form-control-sm" id="datePickerIPC" />
                                </div>
                            </div>
                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#initiativeProgressCountSettingsModal"
                                                data-bs-toggle="modal" onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#initiativeProgressCountViewModal" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>
                                        <li>
                                           <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                            <table class="table table-bordered w-100" id="initiativeProgressCountsTable">
                                
                            </table>                        
                        </div>
                    </div>
                </div>`)
      initializeKpiStatusCountTable(
  '#initiativeProgressCountsTable',
  'initiativeProgressCounts.json',
  initiativeProgressCountColumns,
  preprocessKPIData,
  false // no parent column
);
initDateRangePicker("#datePickerIPC");
    }


    if (data == "kpiRegisterDiv") {
       $("#dashboard-body").append(`<div class="g-col-12">
                            <div class="card custom-card h-100">
                                <div class="card-header">
                                    <div class="c-header-left">
                                        <h5 class="card-title">
                                            <strong editable="true" contenteditable="true"
                                                onkeypress="return (this.innerText.length <= 36)">KPI Register</strong>
                                        </h5>
                                        <div class="date-picker ">
                                            <input class="top_datepicker form-control form-control-sm" id="datePickerKPIR" />
                                        </div>
                        
                                    </div>
                        
                                    <div class="card-actions">
                        
                        
                        
                                        <div class="dropdown">
                                            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                                <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                <li>
                                                    <a class="dropdown-item" href="#kpiRegisterSettings" data-bs-toggle="modal"
                                                        onclick="return false;">Settings</a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" href="#kpiRegisterViewModal" data-bs-toggle="modal"
                                                        onclick="return false;">View</a>
                                                </li>
                        
                                                <li>
                                                   <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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
                        
                                <div class="card-body">                        
                                    <table class="table table-bordered w-100" id="kpiRegTable">
                                        <thead>
                                            <tr>
                                                <th>Department Name</th>
                                                <th>Scorecard</th>
                                                <th>Perspective</th>
                                                <th>Objective</th>
                                                <th>KPI Name</th>
                                                <th>Status</th>
                                                <th>Actual</th>
                                                <th>Target</th>
                                                <th>YTD</th>
                                                <th>Gap</th>
                                                <th>Index</th>
                                            </tr>
                                        </thead>
                                    </table>
                    
                                </div>
                            </div>
                        </div>`)
       initializeDataTableOnce('kpiRegTable', 'kpiRegister.json', kpiRegisterColumns);
       initDateRangePicker("#datePickerKPIR");
    }

     if (data == "reportTemplateDiv") {
       $("#dashboard-body").append(`<div class="g-col-12">
    <div class="card custom-card h-100">
        <div class="card-header">
            <div class="c-header-left">
                <h5 class="card-title">
                    <strong editable="true" contenteditable="true"
                        onkeypress="return (this.innerText.length <= 36)">Report Template</strong>
                </h5>
                <div class="date-picker ">
                    <input class="top_datepicker form-control form-control-sm" id="datePickerRTT" />
                </div>

            </div>

            <div class="card-actions">



                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li>
                            <a class="dropdown-item" href="#report_template_setting" data-bs-toggle="modal"
                                onclick="return false;">Settings</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#reportTemplateViewModal" data-bs-toggle="modal"
                                onclick="return false;">View</a>
                        </li>

                        <li>
                           <a class="dropdown-item" href="#" onclick="loadDataAndGeneratePDF()">Download PDF</a>
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

        <div class="card-body">
            <table class="table table-bordered w-100 text-nowrap" id="reportTemplateTable01"
                style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
                <thead class="align-middle">
                    <tr>
                        <th>Department Name</th>
                        <th>Strategic Outcomes</th>
                        <th>Strategic Objectives</th>
                        <th>Coherent Actions</th>
                        <th>Sub-Actions</th>
                        <th>Output</th>
                        <th>Responsible</th>
                        <th style="min-width: 200px;max-width: 200px;white-space: normal;">Target Period<br> 2024/25
                        </th>
                        <th style="min-width: 200px;max-width: 200px;white-space: normal;">Planned<br> Implementation
                            Months</th>
                        <th style="min-width: 200px;max-width: 200px;white-space: normal;">Actual<br> Implementation
                            Months</th>
                        <th style="min-width: 200px;max-width: 200px;white-space: normal;">Performance Status<br> As At
                            30 September 2024</th>
                        <th>Implementation Remarks</th>
                        <th style="min-width: 280px;max-width: 280px;white-space: normal;">Performance Analysis<br>
                            Observations Recommendations</th>
                        <th style="min-width: 280px;max-width: 280px;white-space: normal;">Consolidated<br>
                            Implementation Remarks</th>
                        <th style="min-width: 280px;max-width: 280px;white-space: normal;">Consolidated Performance<br>
                            Analysis Observations Recommendations</th>
                    </tr>
                </thead>
            </table>

        </div>
    </div>
</div>`)
      initializeReportTemplateTable('reportTemplateTable01', 'report-template.json', reportTemplateRiskColumns);
       initDateRangePicker("#datePickerRTT");
       setTimeout(() => {
    if (window.lucide) lucide.createIcons();
  }, 150); // small delay ensures modal is fully in DOM
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



