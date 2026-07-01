import React, { useState, useRef } from 'react';
import { parseScorecardExcel } from '../../../utils/scorecardExcel';
import { importScorecardActuals } from '../../../services/scorecardV2Api';

function currentDateRange() {
    const y = new Date().getFullYear();
    return localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`;
}

export const DeleteModal = () => {
    return (
        <div className="modal custom-modal custom-delete-modal fade" id="delete-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ "--stratroom-modal-width": "320px" }}>
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="card custom-card delete-card border-0">
                            <div className="card-body">
                                <div className="delete-box">
                                    <h4 className="title">Do you really want to delete?</h4>
                                    <div className="btn-wrap">
                                        <button type="button" className="btn btn-sm btn-label-secondary rounded-pill" data-bs-dismiss="modal" aria-label="Close">
                                            Cancel
                                        </button>
                                        <button className="btn btn-sm btn-danger rounded-pill" value="Yes">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ImportModal = () => {
    const [importing, setImporting] = useState(false);
    const [importMessage, setImportMessage] = useState(null);
    const fileRef = useRef(null);
    const [category, setCategory] = useState("Scorecard Import");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImportMessage(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setImportMessage({ type: 'warning', text: 'Please select a file first.' });
            return;
        }
        
        if (category !== "Scorecard Import") {
            setImportMessage({ type: 'warning', text: 'Only Scorecard Import is currently supported in this UI.' });
            return;
        }

        const pageId = localStorage.getItem('scorecardPageId') || '1';
        setImporting(true);
        setImportMessage({ type: 'info', text: 'Processing...' });
        
        // Yield to browser to paint before heavy synchronous parsing
        await new Promise(r => setTimeout(r, 20));
        
        try {
            const rows = await parseScorecardExcel(selectedFile);
            if (!rows.length) {
                setImportMessage({ type: 'warning', text: 'No KPI rows with Actual/Target values were found in the file.' });
                return;
            }
            const res = await importScorecardActuals(pageId, currentDateRange(), rows);
            let msg = `Import complete — ${res.updated ?? 0} updated, ${res.skipped ?? 0} skipped.`;
            if (res.unmatched > 0) {
                msg += `\n${res.unmatched} row(s) did not match any KPI on this scorecard.`;
            }
            if (res.message) {
                msg += `\n\n${res.message}`;
            }
            setImportMessage({ type: 'success', text: msg });
            
            // Auto reload after a short delay
            setTimeout(() => window.location.reload(), 2000);
        } catch (err) {
            setImportMessage({ type: 'danger', text: 'Import failed: ' + (err?.message || err) });
        } finally {
            setImporting(false);
            setSelectedFile(null);
            if (fileRef.current) {
                fileRef.current.value = '';
            }
        }
    };

    return (
        <div className="modal custom-modal fade" id="import-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">File Upload</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setImportMessage(null); setSelectedFile(null); }}></button>
                    </div>
                    <div className="modal-body">
                        <div id="file-upload" className="card custom-card">
                            <div className="card-body grid gap-3">
                                {importMessage && (
                                    <div className={`alert alert-${importMessage.type} w-100`} role="alert" style={{ whiteSpace: 'pre-line' }}>
                                        {importMessage.text}
                                    </div>
                                )}
                                
                                <div className="g-col-12">
                                    <div className="form-group">
                                        <label htmlFor="importCategory" className="form-label">Import Category</label>
                                        <select 
                                            className="form-select select-dropdown-file-upload w-100" 
                                            name="importCategory" 
                                            id="importCategory" 
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="" disabled hidden>Select Import Category</option>
                                            <option value="ETLUpload">Data Upload</option>
                                            <option value="Scorecard Import">Scorecard</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="g-col-12">
                                    <div className="form-group">
                                        <label className="form-label">Upload File</label>
                                        <label 
                                            htmlFor="file-upload-input" 
                                            className="upload-label upload-box" 
                                            style={{ cursor: importing ? 'not-allowed' : 'pointer', opacity: importing ? 0.7 : 1 }}
                                        >
                                            <div className="upload">
                                                {importing ? (
                                                    <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Uploading...</>
                                                ) : selectedFile ? (
                                                    <span className="text-primary fw-bold"><i className="fa fa-file-excel-o me-2"></i>{selectedFile.name}</span>
                                                ) : (
                                                    "Choose a file or drag it here."
                                                )}
                                            </div>
                                            <input 
                                                type="file" 
                                                id="file-upload-input" 
                                                ref={fileRef}
                                                accept=".xlsx,.xls" 
                                                onChange={handleFile}
                                                disabled={importing}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-between form-line">
                                    <button 
                                        className="btn btn-primary initative_save_btn ms-auto" 
                                        disabled={importing || !selectedFile}
                                        onClick={handleUpload}
                                    >
                                        {importing ? 'Processing...' : 'Upload'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card custom-card" id="file-validate" style={{ display: 'none' }}>
                            <div className="card-body grid gap-3">
                                <div className="g-col-12 img-center">
                                    <img src="/images/Not-Verified.png" alt="Not-Verified" />
                                    <div className="error-div">
                                        <table className="error-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '150px' }}>Row</th>
                                                    <th>Error</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td style={{ width: '150px' }}>1</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>3</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>5</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>8</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>10</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>19</td><td>Contain Special Character</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-between form-line">
                                    <button type="button" className="btn btn-label-secondary btn-default1" id="prev-btn1">Previous</button>
                                    <button className="btn btn-primary initative_save_btn" id="next-btn-2">Next</button>
                                </div>
                            </div>
                        </div>
                        <div className="card custom-card" id="file-save" style={{ display: 'none' }}>
                            <div className="card-body grid gap-3">
                                <div className="g-col-12">
                                    <div className="text-center">
                                        <img src="/images/Success.png" alt="Verified" width="140" />
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="d-flex justify-content-between form-line">
                                    <button type="button" className="btn btn-label-secondary" id="prev-btn2">Previous</button>
                                    <button className="btn btn-primary initative_save_btn" id="done-btn" data-dismiss="modal" aria-label="Close">Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KpiStoryCardModal = () => {
    return (
        <div className="modal custom-modal fade" id="kpi-story-card-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">KPI Story Card</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card table-card">
                            <div className="card-body">
                                <div className="row-table">
                                    <div className="row">
                                        <div className="col-12 col-form-text">
                                            <div className="avatar m-auto">
                                                <img src="/images/user/user7.jpg" width="72" height="72" className="rounded-circle" alt="User" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">KPI Name</label>
                                        <div className="col-md-9 col-form-text">
                                            <p><span>Net Revenue</span></p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Alignment Objectives</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Owner</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Karthik Ramani</span>
                                                <span className="badge rounded-pill label-bg-dark">StratRoom</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Current Actual</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2"><span className="badge rounded-pill label-bg-dark">$2M</span></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Target</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">$2.3M</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Measurement Method</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Monthly financial reports</span>
                                                <span className="badge rounded-pill label-bg-dark">Sales data tracking</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Timelines</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Q1</span>
                                                <span className="badge rounded-pill label-bg-dark">Q2 </span>
                                                <span className="badge rounded-pill label-bg-dark">Q3 </span>
                                                <span className="badge rounded-pill label-bg-dark">Q4 </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Reporting Frequency</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Monthly</span>
                                                <span className="badge rounded-pill label-bg-dark">Quarterly </span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <label htmlFor="supportNeeded" className="col-md-3 col-form-label">Support Needed</label>
                                        <div className="col-md-9 col-form-text">
                                            <textarea className="form-control" id="supportNeeded" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="remarks" className="col-md-3 col-form-label">Remarks</label>
                                        <div className="col-md-9 col-form-text">
                                            <textarea className="form-control" id="remarks" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button className="btn btn-primary" value="Save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CreateTemplateModal = () => {
    return (
        <div className="modal fade" id="create-template" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Templates</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <form id="menuForm">
                                    <div className="grid gap-3">
                                        <div className="g-col-12">
                                            <div className="form-group">
                                                <label htmlFor="menuName" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="menuName" placeholder="Enter Name" required />
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="pageType" className="form-label">Page Type</label>
                                                <select id="pageType" className="form-select" required defaultValue="">
                                                    <option value="" disabled>Select Page Type</option>
                                                    <option value="Plan">Plan</option>
                                                    <option value="Measure">Measure</option>
                                                    <option value="Execute">Execute</option>
                                                    <option value="Govern">Govern</option>
                                                    <option value="Meet">Meet</option>
                                                    <option value="Report">Report</option>
                                                    <option value="Masters">Masters</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="boardType" className="form-label">Board Type</label>
                                                <select id="boardType" className="form-select" required defaultValue="">
                                                    <option value="" disabled>Select Board Type</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button className="btn btn-primary" id="saveMenuBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EditModal = () => {
    return (
        <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <form id="editForm" className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Menu Text</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" id="editInput" className="form-control" required />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
