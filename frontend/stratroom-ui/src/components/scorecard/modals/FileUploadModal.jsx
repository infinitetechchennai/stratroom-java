import React, { useState, useEffect } from 'react';

export const FileUploadModal = ({ file, onSave, onCancel }) => {
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (file) {
            setName(file.name || "");
            setSelectedFile(null); // Reset new file selection
        } else {
            setName("");
            setSelectedFile(null);
        }
    }, [file]);

    const handleSave = () => {
        if (onSave) {
            onSave({ ...file, name, newFile: selectedFile });
        }
    };

    return (
        <div className="modal custom-modal fade" id="fileupload-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{file ? "Edit File" : "File Upload"}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="fileUploadName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="fileUploadName" id="fileUploadName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label className="form-label">Upload File</label>
                                            <label htmlFor="kpiFileUploadInput" className="upload-label upload-box" style={{ 
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                                                padding: '2rem', border: '2px dashed #ccc', borderRadius: '8px', cursor: 'pointer',
                                                backgroundColor: '#fafafa'
                                            }}>
                                                <div className="upload" style={{ color: '#666' }}>
                                                    {selectedFile ? selectedFile.name : (file && file.file ? `Existing: ${file.file} (Click to change)` : "Choose a file or drag it here.")}
                                                </div>
                                                <input type="file" id="kpiFileUploadInput" style={{ display: 'none' }} accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" onClick={onCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
