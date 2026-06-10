<script id="swotchild-template" type="x-tmpl-mustache">
	<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div class="card cardBox swotboxdefaultBox">
              <div class="row">
                <div class="col-sm-1 col-1">
                  <span class="{{colorwrap}}">{{swottexttype}}</span>
                </div>
                
                <div class="col-sm-8 col-8">
                  <span style="display: inherit;text-align: center;font-size: 12px;">
                    <strong>Type :</strong> {{type}}
                  </span>
                </div>
                
                <div class="col-sm-0 col-0 swoteditdeleteicons">
                <p>
                  <span class="card-icons">
                    {{{enableeditBtn}}}
                    {{{enabledeleteBtn}}}
                  </span>
                  </p>
                </div>
                
                <div class="col-12">
                	<div  data-swotfulltext="{{fullname}}">
                		<div class="nameText line-clamp">
                  			<p class="page-card-desc pagecolumncontent">{{name}}</p>
                  		</div>	
                  	</div>

					<div class="nameText impactcontent">
                  		<p class="business-impact line-clamp">
                    		<span data-i18n="Department">Department : </span>
                    		<span>{{departmentname}}</span>
                  		</p>
                  	</div>

                  	<div class="nameText impactcontent">
                  		<p class="business-impact line-clamp">
                    		<span>Business Impact : </span>
                    		<span>{{impactname}}</span>
                  		</p>
                  	</div>
                  
                  	<p class="business-impact">
                    	<span>Next Due : </span>
                    	<span>{{dateRange}}</span>
                  	</p>
                </div>
                
                <div class="col-6" style="text-align: center;">
                  <h6 style="font-size: 12px;text-align: left;">Responsible</h6>
                  <div class="d-flex flex-column">
                  	{{{subinitiativeUserSlecteditem}}}
                    <ul class="list-unstyled order-list d-flex" {{{enableOwnerBtn}}}>
                      {{{subinitiativeUser}}}
                  	</ul>
                  </div>
                </div>
                <div class="col-6 status" style="text-align: center;">
                  <h6 style="font-size: 12px;">Status</h6>
                  <span>
                    <i class="fas fa-flag" style="color:{{flagcolor}} !important"></i>
                  </span>
                </div>
              </div>

              <div class="row text-center" style="background-color: #1e252d;border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;">

                <div class="col-md-12 card-footer">
                  <a href="#" class="card-footer-icon" {{{enableRecommendation}}}>
                    <i class="fas fa-clipboard" data-toggle="tooltip" data-placement="bottom" title="Recommendation"></i>
                  </a>

                  <a href="#" class="card-footer-icon" {{{enableAction}}}>
                    <i class="fas fa-bolt" data-toggle="tooltip" data-placement="bottom" title="Action"></i>
                  </a>
                  
                  <!--<a href="#" data-awslink="{{swot_attachment}}" id="viewfilelink_{{id}}" class="card-footer-icon openattachement">
                    <i class="fas fa-eye" data-toggle="tooltip" data-placement="bottom" title="View"></i>
                  </a>-->

				 <a href="#"  class="card-footer-icon"  {{{enableFileupload}}}>
                    	<i class="fas fa-paperclip"  data-id="{{id}}" data-toggle="tooltip" data-placement="bottom" title="Attachment" onclick="handleUploadShow('{{id}}')"></i>
                 </a>

                 <!-- <a href="#" class="card-footer-icon">
                    <label for="file-input1">
                      <i class="fas fa-paperclip" data-toggle="tooltip" data-placement="bottom" title="Attachment"></i>
                    </label>
                    <input class="file-input1" data-id="{{id}}" style="position: absolute; right: 25px; width: 15px; opacity: 0; cursor: pointer;" type="file"/>
                  </a> -->
                </div>
              </div>
            </div>
          </div>
</script>