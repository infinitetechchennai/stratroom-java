 <script id="initiative-template" type="text/x-handlebars-template">
             <div class="d-flex flex-column sub_initiative_sidebar_details {{initiativeSidebarHighLight}} {{initiativeProgressSideBar}} sidebareventId{{id}}" onclick="initiativedetail('{{id}}')">
                                <div class="d-flex flex-row p-b-5">
                                    <div class="flex-column profile_image" style = "width : 15%">
                                        <img {{{Owner}}} alt="User">
                                    </div>   
                                <div class="d-flex flex-column flex-fill  profile_content" style = "width : 75%;min-height:55px;max-height:55px;">
								
                                    <p class="formattextreader" style="text-overflow:ellipsis">{{intiative_content}}</p>
								</div>
								</div>
                                <div class="d-flex flex-row justify-content-between m-t--10">
                                    <div class="flex-column ini_side_depart_bar">
                                    <div class="employee_info">{{department}}</div>
                                    <div class="d-flex flex-row department_bar">
                                        <div class="progress-s progress">
                                            <div class="progress-bar width-per-{{progressval}} rounded-pill bar_height {{initiativeProgressBar}}" role="progressbar" aria-valuenow="{{progressval}}" aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>
                                        <div class="progress_value">{{progress_val_per}}</div>
                                        </div>
                                    </div>  
                                    <div class="d-flex flex-column ini_side_due">
                                        <span class="employee_info">Due By</span>{{dueDate}}</div>
                                    </div>
                                </div>
                            </div>
</script>