<!--#START Data Collection Form -->
<div class="modal fade data_collection_form" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header modalheadercolor">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="sub_initative_Form">
					<div class="form-row justify-content-center">
						<img width="110" class="rounded-circle" id="upload_link1"
							src="images/user/usrbig7.jpg" alt=""> <input
							id="upload1" type="file" style="display: none" />
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="sub_initative_desc">KPI Name</label> <select
								id="kpi_id" name="sub_initative_desc"
								class="form-control data_field">
								<option></option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group browser-default">
							<label for="attachment">Frequency</label> <select id="attachment"
								name="attachment" class="form-control data_field">
								<option></option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="sub_initative_desc">Element ID</label> <input
								type="text" class="form-control data_field"
								name="sub_initative_desc" id="kpi_id" placeholder="">
						</div>
						<div class="form-group col-md-6">
							<label for="attachment">Element Type</label> <select
								id="attachment" name="attachment"
								class="form-control data_field">
								<option></option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="sub_initative_desc">Data</label> <select
								id="kpi_data" name="kpi_data" class="form-control data_field">
								<option></option>
							</select>
						</div>
						<div class="form-group col-md-6">
							<label for="attachment">Scheduler</label> <select id="attachment"
								name="attachment" class="form-control data_field">
								<option></option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="sub_initative_desc">Responsible</label> <select
								id="responsible" name="responsible"
								class="form-control data_field">
								<option></option>
							</select>
						</div>
						<div class="form-group col-md-6">
							<label for="attachment">Cutoff Date</label> <input type="text"
								class="form-control data_field date_pickers" name="cuttoff_date"
								id="cutoff_date" placeholder="">
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6 d-flex">
							<div class="employee_approval">Approval By</div>
							<div>
								<ul class="list-unstyled order-list">
									<li class="avatar avatar-sm"><img class="rounded-circle"
										src="images/user/user7.jpg" alt="user"></li>
									<li class="avatar avatar-sm"><img class="rounded-circle"
										src="images/user/user8.jpg" alt="user"></li>
									<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><span
										_ngcontent-hhc-c5="" class="badge">+2</span></li>
								</ul>
							</div>
						</div>
						<div class="form-group col-md-6 d-flex">
							<div class="employee_approval">First Approval By</div>
							<div>
								<ul class="list-unstyled order-list">
									<li class="avatar avatar-sm"><img class="rounded-circle"
										src="images/user/user7.jpg" alt="user"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="form-line right">
						<button type="button" class="dataform_save_btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Save">Save</button>
						<button class="dataform_resend_btn" value="Save">Resend</button>
						<button class="dataform_submit_btn" value="Save">Submit</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!--#END Data Collection Form -->