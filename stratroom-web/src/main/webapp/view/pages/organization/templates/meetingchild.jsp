<script id="swotchild-template" type="x-tmpl-mustache">
	<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div class="card cardBox swotboxdefaultBox">
              <div class="row">
                
                <div class="col-12">
                  <span class="card-icons pull-right">
                    {{{enableeditBtn}}}
                    {{{enabledeleteBtn}}}
                  </span>
                </div>
                
           <div class="col-12">
              <div data-swotfulltext="{{fullname}}">
              	<div class="pagecolumncontent">
        			<div class="nameText">
          				<h5 class="page-card-desc line-clamp">{{name}}</h5>
          			</div>	
          		</div>	
          	  </div>
			<div class="meetingtimeText meetingline-clamp">
              <p class="meeting-time meetingtimecontent">
                {{{meeting_date}}}
                {{{meetingtime}}}                
              </p>
				<p>
				<span class="pull-left" style="font-weight: 600;"><i style="font-size: 10px; padding-right:5px"  class="fas fa-circle {{highlightstatus}}"></i>{{status}}</span>
				</p>
             </div>
			
			<div class="locationText locationline-clamp">	
              <p class="meeting-location">
                <span><i class="fas fa-map-marker-alt"></i> Location: {{meeting_location}}</span>
              </p>
            </div>
          </div>
          
          <div class="col-6">
              <h6>Initiated By</h6>
              <div class="d-flex flex-column" style="margin-left: 15px;">
                <ul class="list-unstyled order-list d-flex">{{{initiatedby}}}</ul>
              </div>
            </div>

			<div class="col-6">
                  <h6>Attendees</h6>
                  <div class="d-flex flex-column">
                  	{{{subinitiativeUserSlecteditem}}}
                    <ul class="list-unstyled order-list d-flex" {{{enableOwnerBtn}}}>
                      {{{subinitiativeUser}}}
					</ul>
                  </div>
                </div>
              </div>
                

              <div class="row text-center" style="background-color: #1e252d;border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;">

                <div class="col-md-12 card-footer">
                  <a href="#" {{{enableRecommendation}}}  class="card-footer-icon">
                    <i class="fas fa-clipboard" data-toggle="tooltip" data-placement="bottom" title="Recommendation"></i>
                  </a>

                  <a href="#" {{{enableAction}}} class="card-footer-icon">
                    <i class="fas fa-bolt" data-toggle="tooltip" data-placement="bottom" title="Action"></i>
                  </a>
                  
                  <!--<a href="#" data-awslink="{{swot_attachment}}" id="viewfilelink_{{id}}" class="card-footer-icon openattachement">
                    <i class="fas fa-eye" data-toggle="tooltip" data-placement="bottom" title="View"></i>
                  </a>-->


				 <a href="#" class="card-footer-icon" {{{enableFileupload}}} >
                    	<i class="fas fa-paperclip"  data-id="{{id}}" data-toggle="tooltip" data-placement="bottom" title="Attachment" onclick="handleUploadShow('{{id}}')"></i>
                 </a>
                  
				 <!-- <a href="#" class="card-footer-icon">
                    <label for="file-input1">
                      <i class="fas fa-paperclip" data-toggle="tooltip" data-placement="bottom" title="Attachment"></i>
                    </label>
                    <input class="file-input1" data-id="{{id}}" style="position: absolute; right: 40px; width: 15px; opacity: 0; cursor: pointer;" type="file"/>
                  </a> -->
                </div>
              </div>
            </div>
          </div>
</script>