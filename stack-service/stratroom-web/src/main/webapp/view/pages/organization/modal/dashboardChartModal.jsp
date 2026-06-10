
<div class="modal custom-modal fade" id="chart_setting" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div  class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                    <div class="modal-content">
                        
                        <div class="modal-header">
				           <h5 class="modal-title">Chart Settings</h5>
				             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				        </div>
				        
             <div class="modal-body">
              <form id="dashbard_chart_Form"> 
             <table id="chart_table" class="table table-bordered">
              <thead class="bg-light">
                <tr>
                  <th style="font-size: 14px !important;background-color: white;"> 
                    <div data-i18n="Data Fields">Data Fields</div>
                    <div class="focused pull-right">
                      <div class="form-control rounded-circle pointer addchartsettings" id="chart-setting">
                        <i class="fa fa-plus"></i>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            
              <tbody style="display: -webkit-inline-box;height: 410px;overflow-x: hidden;">
                <tr>
                  <td style="text-align: left;">
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Display Name">Display Name</label>
                        <input type="text" id="displaynamechart" name="displaynamechart" class="form-control browser-default" value="" autocomplete="off"/>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Axis">Axis</label>
                        <select class="form-control browser-default" name="displayaxischart" id="displayaxischart" disabled>
                          <option value="x" data-i18n="X-Axis">X-Axis</option>
                          <option value="y" data-i18n="Y-Axis">Y-Axis</option>
                          <option value="z" data-i18n="Z-Axis">Z-Axis</option>
                        </select>
                      </div>
						<div class="form-group col-md-12">
		                <label for="" data-i18n="Measurement Frequency">Measurement Frequency</label>
		                <select class="form-control browser-default" name="chartfrequency" id="chartfrequency">
							<option value="Monthly" data-i18n="Monthly">Monthly</option>
							<option value="Quarterly" data-i18n="Quarterly">Quarterly</option>
							<option value="Half Yearly" data-i18n="Half Yearly">Half Yearly</option>
							<option value="Annually" data-i18n="Annually">Annually</option>
						</select>
		              </div>
                      <div class="col-12">
                        <hr style="border: 1px solid #505050;" />
                      </div>
                    </div>
                    <div id="chart-setting-div">
                    	<div class="row">
                    	</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>            
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="id" value="" />
				<input type="hidden" id="charttypeField" value="" />
				
              <div class="row" style="float: right;">
              <div class="col-12">
                <div class="form-line right">
                 <button type="button" class="btn btn-label-secondary" data-dismiss="modal">
    Cancel
</button>

<button type="button" class="btn btn-primary" onclick="savedashboardChart()">
    Save
</button>

                </div>
              </div>
            </div>
            </form>
		</div>		
		</div>
	</div>
</div>




<!-- <div
  class="modal custom-modal fade kpi_description_popup"
  id="kpi-add-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
	aria-hidden="true"
  
  tabindex="-1"
  role="dialog"
  aria-labelledby="Add KPI"
  aria-hidden="true"
>
  <div
    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title kpiHeader" >Add KPI</h4>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
              <form id="dashbard_chart_Form"> 
             <table id="chart_table" class="table table-bordered">
              <thead class="bg-light">
                <tr>
                  <th style="font-size: 14px !important;background-color: white;"> 
                    <div data-i18n="Data Fields">Data Fields</div>
                    <div class="focused pull-right">
                      <div class="form-control rounded-circle pointer addchartsettings" id="chart-setting">
                        <i class="fa fa-plus"></i>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            
              <tbody style="display: -webkit-inline-box;height: 410px;overflow-x: hidden;">
                <tr>
                  <td style="text-align: left;">
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Display Name">Display Name</label>
                        <input type="text" id="displaynamechart" name="displaynamechart" class="form-control browser-default" value="" autocomplete="off"/>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Axis">Axis</label>
                        <select class="form-control browser-default" name="displayaxischart" id="displayaxischart" disabled>
                          <option value="x" data-i18n="X-Axis">X-Axis</option>
                          <option value="y" data-i18n="Y-Axis">Y-Axis</option>
                          <option value="z" data-i18n="Z-Axis">Z-Axis</option>
                        </select>
                      </div>
						<div class="form-group col-md-12">
		                <label for="" data-i18n="Measurement Frequency">Measurement Frequency</label>
		                <select class="form-control browser-default" name="chartfrequency" id="chartfrequency">
							<option value="Monthly" data-i18n="Monthly">Monthly</option>
							<option value="Quarterly" data-i18n="Quarterly">Quarterly</option>
							<option value="Half Yearly" data-i18n="Half Yearly">Half Yearly</option>
							<option value="Annually" data-i18n="Annually">Annually</option>
						</select>
		              </div>
                      <div class="col-12">
                        <hr style="border: 1px solid #505050;" />
                      </div>
                    </div>
                    <div id="chart-setting-div">
                    	<div class="row">
                    	</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>            
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="id" value="" />
				<input type="hidden" id="charttypeField" value="" />
				
              <div class="row" style="float: right;">
              <div class="col-12">
                <div class="form-line right">
                 <button type="button" class="btn btn-label-secondary" data-dismiss="modal">
    Cancel
</button>

<button type="button" class="btn btn-primary" onclick="savedashboardChart()">
    Save
</button>

                </div>
              </div>
            </div>
            </form>
		</div>		
    </div>
  </div>
</div>  -->