<script id="chartDefaultTemplate" type="text/x-handlebars-template">
	                    <div class="row blockContainer" style="margin-top: 2%;">
                        <div class="col-lg-4 col-md-4 col-sm-12 chartBlock" id="template" style="display:none">
                            <div class="chart_container_bg">
                                <div class="chart_top_menu"
                                style="background-color: #1e252d;color:#fff; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                                    <div class="chart_top_menu_left">
                                        <!-- <i class="fas fa-flag chart_kpi_flag" aria-hidden="true"></i> -->
                                    </div>
                                    <span class="chartidentifier" data-chartidentifier=""></span>
                                    <div class="chart_top_kpi_dropdown">
                                        <div class="" style="margin-top: 5px;">
                                            <select name="attachment" class="form_dropdown_text form_kpi" style="display: block; background-color: transparent;">
                                            <option value="">--Select KPI--</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="chart_top_menu_right">
                                        <ul class="header-dropdown m-r--2 pt-2 d-flex">
                                            <li class="dropdown m-t--5">
                                                <!-- <i class="fa fa-info-circle" aria-hidden="true" data-toggle="modal" data-target="#viewModal"></i> -->
                                                <a href="#" onclick="return false;" class="chartsettings" data-toggle="" role="button" aria-haspopup="true" aria-expanded="true">
                                                    <i class="fa fa-cog" 
                                                    style=" font-size: 13px; color: #e7e7e7; padding-right: 5px; margin-top: 10px; margin-bottom: -10px;" aria-hidden="true"></i>
                                                </a>
                                                <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                    <li>
                                                        <div class="">
                                                            <div class="form-group kpi_create_initives mb-0 m-t-5">
                                                                <label for="kpi_start_end_date">Chart Size</label>
                                                                <select name="chartstype" class="mr-4 chart-selection chartchange" style="display: block;">
                                                                    <option value="">--Chart Select--</option>
                                                                    <option value="1">Standard Chart</option>
							                                        <option value="3">Line Chart</option>
							                                        <option value="4">Box Chart</option>
							                                        <option value="5">Pie Chart</option>
							                                        <option value="6">Bubble Chart</option>
							                                        <option value="9">Waterfall Chart</option>
							                                        <option value="13">Scatter Chart</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="settings_axis">
                                                            <div class="chart_size">X-axis</div>
                                                            <div class="chart_size">
                                                                <div class="form-group kpi_create_initives">
                                                                    <select class="chartchange" name="chartsxaxis" style="display: block;">
                                                                        <option value="actual" data-i18n="Actual">Actual</option>
                                                                        <option value="target" data-i18n="Target">Target</option>
                                                                        <option value="budget" data-i18n="Budget">Budget</option>
                                                                        <option value="forecast" data-i18n="Forecast">Forecast</option>                        
                                                                        <option value="gap" data-i18n='Gap'>Gap</option>
																		<option value="period" data-i18n="Period">Period</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="chart_size">
                                                                <div class="form-group color_picks_1">
                                                                    <div class="input-group">
                                                                        <div class="input-group-append">
                                                                            <span class="input-group-text pickr xAxisColor"></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="settings_axis p-0 m-t--10">
                                                            <div class="chart_size">Y-axis</div>
                                                            <div class="chart_size">
                                                                <div class="form-group kpi_create_initives">
                                                                    <select class="chartchange" name="chartsyaxis" style="display: block;">
                                                                        <option value="actual" data-i18n="Actual">Actual</option>
                                                                        <option value="target" data-i18n="Target">Target</option>
                                                                        <option value="budget" data-i18n="Budget">Budget</option>
                                                                        <option value="forecast" data-i18n="Forecast">Forecast</option>                        
                                                                        <option value="gap" data-i18n='Gap'>Gap</option>
																		<option value="period" data-i18n="Period">Period</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="chart_size">
                                                                <div class="form-group color_picks_1">
                                                                    <div class="input-group">
                                                                        <div class="input-group-append">
                                                                            <span class="input-group-text pickr yAxisColor"></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="">
                                                            <div class="form-group">
                                                                <label for="kpi_start_end_date" class="m-0">Data field</label>
                                                                <select class="form-control browser-default mt-1 paramList" name="params[]" multiple="multiple">
                                                                        <option value="actual" data-i18n="Actual">Actual</option>
                                                                        <option value="target" data-i18n="Target">Target</option>
                                                                        <option value="budget" data-i18n="Budget">Budget</option>
                                                                        <option value="forecast" data-i18n="Forecast">Forecast</option>                        
                                                                        <option value="gap" data-i18n='Gap'>Gap</option>
																		<option value="period" data-i18n="Period">Period</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="removeBlock"> Remove </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="chart_kpi_boxs">
                                    <div class="chart_kpi_parameter param-budget">
                                        <div class="" style="font-weight: 600;" data-i18n="Budget">Budget</div>
                                        <div class="">8.31</div>
                                    </div>
                                    <div class="chart_kpi_parameter param-forecast">
                                        <div class="" style="font-weight: 600;" data-i18n="Forecast">Forecast</div>
                                        <div class="">12.6</div>
                                    </div>
                                </div>
                                <input type="hidden" class="selectVal" />
                                <div class="chart_kpi_chart_box chart_kpi_box_size" aria-hidden="true" data-toggle="modal" data-target=".all_chart_popup">
                                    <div class="chart-area divResize" style="height:33vh;"></div>
                                    <div id="tag"></div>
                                </div>
                                <div class="chart_kpi_boxs" style="margin-top: -15px;">
                                    <div class="chart_kpi_parameter param-actual">
                                        <div class="" style="font-weight: 600;" data-i18n="Actual">Actual</div>
                                        <div class="">10.56</div>
                                    </div>
                                    <div class="chart_kpi_parameter param-target">
                                        <div class="" style="font-weight: 600;" data-i18n="Target">Target</div>
                                        <div class="">88.7</div>
                                    </div>
                                    <div class="chart_kpi_parameter param-gap">
                                        <div class="" style="font-weight: 600;" data-i18n='Gap'>Gap</div>
                                        <div class="">10.5</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-lg-4 col-md-4 col-sm-12 chartBlock">
                            <button class="btn add-block" data-lastid="1" style="background-color: #3A6596; color: #fff;">Add New Block</button>
                            <!-- <a href="#" class="add-block">Add New Block</a> -->
                        </div>
                    </div>
</script>