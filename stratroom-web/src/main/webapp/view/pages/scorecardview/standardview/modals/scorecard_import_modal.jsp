<!-- File Validate Form -->

<div class="modal fade file_upload_popup" id="file-validate-form"
	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 style="color: #e9f3f3;" data-i18n="File Upload">File Upload</h4>
				<button type="button" class="close pull-right" data-dismiss="modal">
					&times;</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<ul class="form-progressbar">
							<li>Upload</li>
							<li>Validation</li>
							<li>Import</li>
						</ul>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
				</div>

				<div class="row" id="file-upload">
					<div class="col-md-12">
						<div class="form-group">
							<label class="control-label">Upload File</label>
							<div class="preview-zone hidden">
								<div class="box box-solid">
									<div class="box-body"></div>
								</div>
							</div>
							<div class="dropzone-wrapper">
								<div class="dropzone-desc">
									<i class="fas fa-file-upload" style="font-size: 20px;"></i>
									<p>Choose a file or drag it here.</p>
								</div>
								<input type="file" name="img_logo" class="dropzone"
									accept=".xlsx, .xls, .csv" />
							</div>
							<span id="fileerrorshow"
											style="color: red; display: none"></span>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line right">
							<button class="initative_save_btn" id="next-btn-1"
								style="font-weight: 600;">Next</button>
						</div>
					</div>
				</div>

				<div class="row" id="file-validate" style="display: none;">
					<div class="col-md-12 img-center">
						<img id="imagevalidate" src="images/Not-Verified.png"
							alt="Not-Verified" />
						<div class="error-div">
							<table class="error-table">
								<thead>
									<tr>
										<th style="width: 150px; text-align: center;">SheetName</th>
										<th style="width: 150px; text-align: center;">Row-Number</th>
										<th style="width: 150px; text-align: center;">CellName</th>
										<th style="width: 250px; text-align: center;">Reason</th>
									</tr>

								</thead>
								<tbody class="uploadvalidationSuccess">
									<!-- <tr>
							<td style="width: 150px;">1</td>
							<td>Contain Special Character</td>
						</tr>
						<tr>
							<td style="width: 150px;">3</td>
							<td>Contain Special Character</td>
						</tr>
						<tr>
							<td style="width: 150px;">5</td>
							<td>Contain Special Character</td>
						</tr>
						<tr>
							<td style="width: 150px;">8</td>
							<td>Contain Special Character</td>
						</tr>
						<tr>
							<td style="width: 150px;">10</td>
							<td>Contain Special Character</td>
						</tr>
						<tr>
							<td style="width: 150px;">19</td>
							<td>Contain Special Character</td>
						</tr> -->
								</tbody>
							</table>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line" id="validateImportHide">
							<!-- <button type="button" class="btn-default1 btn" id="prev-btn1"
										style="font-weight: 600;">Previous</button>
									<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button> -->
						</div>
					</div>
				</div>




				<div class="row" id="file-save" style="display: none;">
					<div class="col-md-12">
						<div class="col-md-12 img-center">
							<img id="successimagevalidate" src="images/Success.png" alt="Verified" />
							<span id="statisticmessage" style="text-align: center; margin-left: 42% !important; color :green; width: 100%; margin-right: 25% !important;"></span>							
							<div class="error-div">
								<table class="error-table">
									<thead>
										<tr>
											<th style="width: 300px; text-align: center;">
												Statististics</th>											
											<th style="width: 300px; text-align: center;">Message</th>
										</tr>

									</thead>
									<tbody class="uploadStatististics">
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line">
							<button type="button" class="btn-default1 btn" id="prev-btn2"
								style="font-weight: 600;">Previous</button>
							<button class="initative_save_btn pull-right" id="done-btn"
								style="font-weight: 600;" data-dismiss="modal"
								aria-label="Close">Done</button>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
<!-- END File Validate Form -->