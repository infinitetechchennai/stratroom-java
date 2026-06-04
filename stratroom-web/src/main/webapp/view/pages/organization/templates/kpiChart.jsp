<script id="kpiChartViewTemplate" type="text/x-handlebars-template">
<div class="card custom-card table-card h-100">
  <div class="card-header d-flex justify-content-between align-items-center">
    <div class="c-header-left d-flex align-items-center">
      <h5 class="card-title mb-0 d-flex align-items-center">
        {{{kpichartInlineEditIcon}}}
      </h5>
    </div>
    
    <div class="card-actions d-flex align-items-center gap-2">
      <!-- Chart Type Dropdown -->
      <div class="dropdown">
        <button class="btn btn-sm btn-icon" type="button" id="kpigettypeofchartview" data-bs-toggle="dropdown" aria-expanded="false">
          {{{charticonchange}}}
        </button>
        <ul class="dropdown-menu dropdown-menu-end p-2 shadow apexchartsdrop" aria-labelledby="kpigettypeofchartview">
          <li class="d-flex justify-content-evenly px-2">
            <a href="#" class="highlightchart" id="columnchrtactive" onclick="drawChart('#chartdiv_init',2)" data-toggle="tooltip" title="Column">
              <img src="images/widgets/Column.png" alt="Column Chart" width="16" />
            </a>
            <a href="#" class="highlightchart" id="linechrtactive" onclick="drawChart('#chartdiv_init',3)" data-toggle="tooltip" title="Line">
              <img src="images/widgets/Line.png" alt="Line Chart" width="16" />
            </a>
            <a href="#" class="highlightchart" id="areachrtactive" onclick="drawChart('#chartdiv_init',4)" data-toggle="tooltip" title="Area">
              <img src="images/widgets/Area.png" alt="Area Chart" width="16" />
            </a>
          </li>
        </ul>
      </div>

    
         {{{kpiParentOptions}}}
    </div>
  </div>

  <div class="card-body">
    <div id="chartdiv_init" class="chartviewtemplatediv" data-id="1" style="width: 100%;"></div>
    <div id="chartdiv_expandinit" style="width:100%;display:none;"></div>
    <div id="tag"></div>
  </div>
</div>

                        </script>