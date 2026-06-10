<script id="scorecard-template" type="x-tmpl-mustache">
	<div class="row py-2 scorecard-title">
		<div class="col-md-10">
    		<h5 style="padding-top: 10px;">{{ScoreCardName}} <span class="scorecard_status">Good</span></h5>
          	<div aria-label="breadcrumb">
            	<ol class="breadcrumb mb_bcrumb">
              		<li class="breadcrumb-item"><a href="#">{{ScoreCardName}}</a></li>
              		<li class="breadcrumb-item"><a href="#">Standard BSC View</a></li>
            	</ol>
          	</div>
        </div>
        
        <div class="col-md-2" style="padding-top: 16px;">
              <button class="btn btn-custom-secondary scorecarddescription pull-right" data-toggle="modal" data-target=".scorecard_description_popup" onclick="handleScoreCardEvent()" style="margin-left: 4px;">
                <i class="fas fa-cog" style="font-size: 14px;"></i>
              </button>
              
              <a href="#" style="float:right; padding: 2px;position: relative;overflow: hidden;display: inline-block;">
                    <button class="btn btn-custom-secondary pull-right" id="OpenImgUpload" style="margin-left: 4px;"><i class="fas fa-upload"></i>
                    	<input type="file" accept=".xlsx, .xls, .csv" id="importscorescrd" style="position: absolute; left: 0; top: 0; opacity: 0; cursor: pointer;" />
                    </button>
              </a>
              
              <!--<input type="file" type="file" accept=".xlsx, .xls, .csv" id="importscorescrd" style="display: none;" />
              <button class="btn btn-custom-secondary pull-right" id="OpenImgUpload" style="margin-left: 4px;">
                	<i class="fas fa-upload"></i>
              </button>-->

              <button class="btn btn-custom-secondary dropdown-toggle pull-right" data-toggle="dropdown">
              		<i class="far fa-eye"></i>

                	<ul class="dropdown-menu dropdown-hide multi-column columns pull-right" x-placement="bottom-start" 
                		style="position: absolute;will-change: transform;top: 0px;left: 0px;width: 180px;transform: translate3d(0px, 24px, 0px);">
                 
                  	<div class="row">
                    <div class="col-sm-12">
                      <ul class="multi-column-dropdown">
                        <li><a href="#"><label><input type="checkbox" name="financial" value="financial" checked/>Financial</label></a></li>
                        <li><a href="#"><label><input type="checkbox" name="customer" value="customer" checked/>Customer</label></a></li>
                        <li><a href="#"><label><input type="checkbox" name="internal-process" value="internal-process" checked/>Internal Process</label></a></li>
                        <li><a href="#"><label><input type="checkbox" name="learning-growth" value="learning-growth" checked/>Learning and Growth</label></a></li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </button>
         </div>
     </div>



<!-- File Upload Success PopUp Start -->

<div class="modal fade upLoadScoreCardSuccessModal"  role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
                <div class="modal-header">
                        <h6 class="modal-title" id="myLargeModalLabel">Success!</h6>
                        <button type="button" class="close fileuploadclose"
                            data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body" id="scorecardSuccess" style="overflow-x: scroll;" >

                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
                </div>

          </div>
    </div>
</div>

<!-- File Upload Success PopUp End -->




</script>