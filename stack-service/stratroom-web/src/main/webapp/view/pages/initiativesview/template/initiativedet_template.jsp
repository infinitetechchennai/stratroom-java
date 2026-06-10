  <script id="initiativedetail-template" type="text/x-handlebars-template">
                            <div class="collapse_arrow_right" style="display: none;">
                                <i class="arrow_collapse_size fas fa-caret-right"></i>
                            </div>
                            <div class="collapse_arrow_left">
                                <i class="arrow_collapse_size fas fa-caret-left"></i>
                            </div>
                            <div class="employee_details">
                            <div class="img_details">
                                <img alt="User" id="initiatieProfile" {{{Owner}}} width="90">
                            </div>
							<div class="employee_top_info">
							<div class="employe_head_info">
                            <div class="initiative_title">
                                <h6 class="formattextreader">{{title}}</h6>
                            </div>
							<div class="employe_head_info_icon">
								{{{initiativeParentEditBtn}}}
	                            {{{initiativeParentuploadBtn}}}
	                            {{{initiativeParentviewBtn}}}
				              	{{{initiativeParentDeleteBtn}}}                 		
							</div>
						</div>
                        <div class="initiative_profile_details" style="text-align: center;">
                            <div class="employee_details_content_info">
                                            <div class="employee_info" style="font-weight: 700;" data-i18n="Department">Department</div>
                               <p class="formattextreader">{{userDept}}</p>

                            </div>
                            <div class="employee_details_content_info init_portion_width">
                                            <div class="employee_info" style="font-weight: 700;">Progress</div>
                                <div class="d-flex_name flex-row_name ini_progress_bar">
                                    <div class="progress-s progress">
                                        <div id="progressbar" class="{{statusLight}}" role="progressbar" aria-valuenow="{{progressval}}" aria-valuemin="0" aria-valuemax="100" style="width:{{progressval}}%">
                                        </div>

                                    </div>

                                    <div class="progress_value font-weight-bold">{{progressvalpercent}}</div>
                                </div>
								</div>
                                        <div class="employee_details_content_info init_portion_width">
                                            <div class="employee_info" style="font-weight: 700;">Impact</div>
                                            <p class="formattextreader">{{impactDesc}}</p>
                                        </div>
                                        <div class="employee_details_content_info init_portion_width">
                                            <div class="employee_info" style="font-weight: 700;">Start / End</div>
                                            <p>{{intiativedaterange}}</p>
                                        </div>
                                        <div class="employee_details_content_info">
                                            <div class="employee_info" style="font-weight: 700;">Remaining</div>
                                            <p>{{diffdays}}</p>
                                        </div>
                                        <div class="employee_details_content_info">
                                            <div class="employee_info" style="font-weight: 700;">Initiative ID</div>
                                            <p>{{initiativeId}}</p> 
											<input type="hidden" name="parentinitiativeId" value="{{id}}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="initiative_rating_details">
                                <div class="d-flex flex-row">
                                    <div class="ini_thrid_row_reaction colfp">
                                        <div class="">
                                            <p class="employee_infocolfp">Status</p>
                                            <div class="good font-weight-bold">{{initiativeStatus}}</div>
                                        </div>
                                        <div class="">
                                            <p class="employee_infocolfp" data-i18n="Reaction">Reaction</p>
                                            <div class="d-flex reaction">
                                                {{{initiativeReaction}}}
                                            </div>
                                        </div>
                                    </div>
                                            <div class="{{displayStatusField}}">   
                                                {{{totalfieldstauts}}}
                                                {{{utiliziedfieldstauts}}}
                                                {{{balancefieldstauts}}}
                                                </div>
                                            <div class="{{displayDataField}}">   
                                                {{{actualfielddatafield}}}
                                                {{{targetfielddatafield}}}
                                                {{{budgetfielddatafield}}}
                                                {{{forecastfielddatafield}}}
                                                <div class="">
                                                <div class="amount" id="button_wrapper">
                                                <button class="btn btn-light number-font"> <i class=" fa fa-angle-up" id="budgetDetailView" ></i></button>
                                            </div>
                                        </div>
                                            </div>

            			</div>	
         		</div>
                 <div class="initiative_rating_detailsdown d-none">
                    <div class="d-flex flex-row">
                  

                        <div class="ini_thrid_row_amount coltp">
                                {{{totalassetbudgetdatafield}}}
                                {{{totalRealizationAssetdatafield}}}
                                {{{totalLiabilitiesBudgetdatafield}}}
                                {{{totalRealizationLiabilitiesdatafield}}}
                                {{{totalBudgetdatafield}}}
                                {{{totalRealizationBudgetdatafield}}}
                        </div>
                        <div class="ini_thrid_row_datafiled colfp">
                            {{{totalAssetBudgetRealization_percentdatafield}}} 
                            {{{totalLiabilitiesRealization_percentdatafield}}} 
                            {{{totalBudgetRealization_percentdatafield}}} 
                            </div>
                        </div>
                    </div>
                </div>

      	</div>
 </script>