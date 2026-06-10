
        <!--#TABLE Popup -->
        <div class="modal fade" id="bigTable" tabindex="-1" role="dialog" aria-labelledby="bigTable" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 100% !important;">
                <div class="modal-content">
                    <div class="modal-header chart_kpi_title">
                        <h4>Data Drill</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" id="loadcontent">
                            
                            <div class="col-lg-12 col-md-12">
                                <div class="card">
                                    <div class="header" style="background-color: #3A6596;">
                                        <div class="row">
                                            <div class="col-md-10"></div>
                                            <div class="col-md-2">
                                                <select id="categoryreporttype" data-kpiid="" name="" class="form-control" style='font-family:"Poppins", sans-serif !important;'>
                                                    <option value="Monthly" data-i18n="Monthly">Monthly</option>
                                                    <option value="Quarterly" data-i18n="Quarterly">Quarterly</option>
                                                    <option value="HalfYearly" data-i18n="Half Yearly">Half Yearly</option>
                                                    <option value="Annually" data-i18n="Annually">Annually</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tableBody">
                                    	<!-- <div class="table-responsive datadrilltableview box">
                                            
                                        </div>-->
                                        <div class="table-responsive monthview box" style="display: none;">
                                            
                                        </div>
                                        <div class="table-responsive quaterview box" style="display: none;">
                                            
                                        </div>
                                        <div class="table-responsive halfyearview box" style="display: none;">
                                            
                                        </div>
                                        <div class="table-responsive annualview box" style="display: none;">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        <!--#TABLE Popup -->