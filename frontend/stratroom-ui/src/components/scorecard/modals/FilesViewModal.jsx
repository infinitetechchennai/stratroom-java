import React from 'react';

export const FilesViewModal = ({ files = [] }) => {
    // Format date string helper
    const fmtDate = (d) => {
        if (!d) return "";
        try {
            return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));
        } catch {
            return d;
        }
    };

    const items = files.map((f) => ({
        name: f.name || "Attachment",
        file: [f.file || f.uniqueFileReference, f.size].filter(Boolean).join(" "),
        date: fmtDate(f.createdTime),
    }));

    return (
        <div id="files-view_popup" className="modal custom-modal fade" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Files</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card border-0">
                            <div className="card-body">
                                <div className="list-group initiatives-bar">
                                    {items.length === 0 && <div className="text-muted">No files attached</div>}
                                    {items.map((f, i) => (
                                        <div className="list-group-item" key={i}>
                                            <div className="bar-chart">
                                                <div className="d-flex gap-2"><h4 className="title mb-0">{f.name}</h4></div>
                                                <div className="numbers">
                                                    {f.file && <div className="text-muted left">{f.file}</div>}
                                                    {f.date && <div className="text-muted right">{f.date}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
