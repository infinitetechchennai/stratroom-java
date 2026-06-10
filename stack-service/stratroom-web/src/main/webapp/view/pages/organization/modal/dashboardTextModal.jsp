<div class="modal fade" id="text_setting" tabindex="-1" aria-labelledby="textSettingLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      
      <div class="modal-header">
        <h5 class="modal-title">Text Settings</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <form id="dashbard_text_Form">
          <div class="row g-3">

            <div class="col-md-12">
              <label>Display Name</label>
              <input name="displayname" id="displayname" type="text" class="form-control" />
            </div>

            <div class="col-md-6">
              <label>Card Type</label>
              <select class="form-select" name="card_type_select" id="card_type_select">
                <option value="Text">Icon</option>
                <option value="Chart">Chart</option>
              </select>
            </div>

            <div class="col-md-6">
              <label>Select Icon</label>
              <select class="form-select" name="icon_select" id="icon_select">
                <option value="$ Dollar">$ Dollar</option>
                <option value="% Percentage">% Percentage</option>
                <option value="# Number"># Number</option>
              </select>
            </div>

            <div class="col-md-6">
              <label>Data Field</label>
              <input 
                type="text" 
                name="datafield" 
                id="text_formula_widget"
                class="form-control"
                readonly
                data-bs-toggle="modal" 
                data-bs-target="#text_kpi_formula_popup"
                onclick="handleTextFormulaEvent('KPI')" 
              />
            </div>

            <div class="col-md-6">
              <label>Period</label>
              <input type="text" name="period" id="period" class="form-control daterangepicker-field-period" />
            </div>

            <!-- Hidden -->
            <input type="hidden" name="action" value="">
            <input type="hidden" name="id" value="">
            <input type="hidden" name="type" value="">
            <input type="hidden" id="kpiFieldName" value="Actual">

            <div class="col-12"><hr/></div>

            <!-- 🔥 FIXED BUTTON -->
            <div class="col-12 text-end">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" id="" class="btn btn-primary" onclick="savedashboardText()">Save</button>
            </div>

          </div>
        </form>
      </div>

    </div>
  </div>
</div>

