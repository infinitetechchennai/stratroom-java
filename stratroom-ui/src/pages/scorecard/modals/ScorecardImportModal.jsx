import React from 'react';

const ScorecardImportModal = () => {
  return (
    <div
      className="modal custom-modal fade file_upload_popup"
      id="file-validate-form"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" data-i18n="File Upload">
              File Upload
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <ul className="form-progressbar">
                  <li>Upload</li>
                  <li>Validation</li>
                  <li>Import</li>
                </ul>
              </div>
              <div className="col-md-12">
                <hr />
              </div>
            </div>

            <div id="file-upload" className="card custom-card">
              <div className="card-body grid gap-3">
                <div className="g-col-12">
                  <div className="form-group">
                    <label className="form-label">Upload File</label>
                    <div className="preview-zone hidden">
                      <div className="box box-solid">
                        <div className="box-body"></div>
                      </div>
                    </div>
                    <div className="dropzone-wrapper">
                      <div className="dropzone-desc">
                        <i className="fas fa-file-upload" style={{ fontSize: '20px' }}></i>
                        <p>Choose a file or drag it here.</p>
                      </div>
                      <input
                        type="file"
                        name="img_logo"
                        className="dropzone"
                        accept=".xlsx, .xls, .csv"
                      />
                    </div>
                    <span id="fileerrorshow" style={{ color: 'red', display: 'none' }}></span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between form-line">
                  <button
                    className="btn btn-primary initative_save_btn"
                    id="next-btn-1"
                    style={{ fontWeight: 600 }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="card custom-card" id="file-validate" style={{ display: 'none' }}>
              <div className="card-body grid gap-3">
                <div className="g-col-12 img-center">
                  <img id="imagevalidate" src="assets/images/not-verified.png" alt="Not-Verified" />
                  <div className="error-div">
                    <table className="error-table">
                      <thead>
                        <tr>
                          <th style={{ width: '150px', textAlign: 'center' }}>SheetName</th>
                          <th style={{ width: '150px', textAlign: 'center' }}>Row-Number</th>
                          <th style={{ width: '150px', textAlign: 'center' }}>CellName</th>
                          <th style={{ width: '250px', textAlign: 'center' }}>Reason</th>
                        </tr>
                      </thead>
                      <tbody className="uploadvalidationSuccess">
                        {/* Content will be populated by JS */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between form-line" id="validateImportHide">
                  {/* Previous/Next buttons will be populated here by JS if needed */}
                </div>
              </div>
            </div>

            <div className="card custom-card" id="file-save" style={{ display: 'none' }}>
              <div className="card-body grid gap-3">
                <div className="g-col-12 img-center">
                  <img id="successimagevalidate" src="assets/images/success.png" alt="Verified" />
                  <span
                    id="statisticmessage"
                    style={{
                      textAlign: 'center',
                      marginLeft: '42% !important',
                      color: 'green',
                      width: '100%',
                      marginRight: '25% !important',
                    }}
                  ></span>
                  <div className="error-div">
                    <table className="error-table">
                      <thead>
                        <tr>
                          <th style={{ width: '300px', textAlign: 'center' }}>Statististics</th>
                          <th style={{ width: '300px', textAlign: 'center' }}>Message</th>
                        </tr>
                      </thead>
                      <tbody className="uploadStatististics">
                        {/* Content will be populated by JS */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between form-line">
                  <button
                    type="button"
                    className="btn btn-label-secondary btn-default1"
                    id="prev-btn2"
                    style={{ fontWeight: 600 }}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-primary initative_save_btn"
                    id="done-btn"
                    style={{ fontWeight: 600 }}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorecardImportModal;
