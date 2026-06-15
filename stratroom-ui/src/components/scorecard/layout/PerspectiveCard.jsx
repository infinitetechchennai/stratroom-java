import React, { useEffect } from 'react';
import { ScorecardTable } from './ScorecardTable';

export const PerspectiveCard = ({ tab, isActive }) => {
    const tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");

    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
    });

    return (
        <div id={`v-pills-${tablePrefix}`} className={`tab-pane fade ${isActive ? 'show active' : ''}`} role="tabpanel">
            <div className="card custom-card table-card" style={{
                '--stratroom-card-cap-bg': 'var(--stratroom-primary)',
                '--stratroom-card-title-color': 'var(--stratroom-primary-contrast)'
            }}>
                <div className="card-header">
                    <div className="c-header-left">
                        <span className="badge text-bg-success">{tab.totalScore}</span>
                        <h5 className="card-title me-auto mb-0" style={{ lineHeight: '1.2', alignItems: 'center', paddingTop: '2px' }}>
                            <strong>{tab.title}</strong>
                        </h5>
                    </div>
                    <div className="card-actions">
                        <div className="dropdown">
                            <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <span className="icon">
                                  <i data-lucide="ellipsis-vertical" style={{ width: '16px', height: '16px' }}></i>
                                </span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
                                <li>
                                    <a className="dropdown-item" href="#objective-add-modal"
                                        data-bs-toggle="modal" data-translate="actions.add">Add</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#prespective-edit-modal"
                                        data-bs-toggle="modal" data-translate="actions.edit">Edit</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#prespective-view-modal"
                                        data-bs-toggle="modal" data-translate="actions.view">View</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-translate="actions.delete">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <ScorecardTable tabledata={tab.tabledata} tablePrefix={tablePrefix} />
            </div>
        </div>
    );
};
