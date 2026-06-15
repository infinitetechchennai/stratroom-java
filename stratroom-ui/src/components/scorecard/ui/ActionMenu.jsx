import React, { useRef, useEffect } from 'react';
import { generateScorecardKpiPDF } from '../../../utils/pdfGenerator';

export const ActionMenu = ({ level }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Re-init lucide icons inside action cells after render
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    // Level 0 = Perspective row (objective-view-modal, dropdown with Add/Edit/View/Delete)
    const renderLevel0 = () => (
        <div className="table-actions justify-content-end">
            <a href="#objective-view-modal" data-bs-toggle="modal" type="button"
               className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="badge-info" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
            <div className="dropdown" ref={dropdownRef}>
                <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                    <i data-lucide="ellipsis-vertical" style={{ width: '16px', height: '16px' }}></i>
                </button>
                <ul className="dropdown-menu border-0 shadow">
                    <li><a className="dropdown-item" href="#kpi-add-modal" data-bs-toggle="modal" data-translate="actions.add">Add</a></li>
                    <li><a className="dropdown-item" href="#objective-edit-modal" data-bs-toggle="modal" data-translate="actions.edit">Edit</a></li>
                    <li><a className="dropdown-item" href="#objective-view-modal" data-bs-toggle="modal" data-translate="actions.view">View</a></li>
                    <li><a className="dropdown-item" href="#delete-modal" data-bs-toggle="modal" data-translate="actions.delete">Delete</a></li>
                </ul>
            </div>
        </div>
    );

    // Level 1 = KPI row (file-text, link, badge-info, dropdown with Add/Edit/View/Delete)
    const renderLevel1 = () => (
        <div className="table-actions justify-content-end">
             <a href="#" onClick={(e) => { e.preventDefault(); generateScorecardKpiPDF(); }}
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="file-text" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
             <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="link" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
            <a href="#kpi-view-modal" data-bs-toggle="modal" type="button"
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="badge-info" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
            <div className="dropdown" ref={dropdownRef}>
                <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                    <i data-lucide="ellipsis-vertical" style={{ width: '16px', height: '16px' }}></i>
                </button>
                <ul className="dropdown-menu border-0 shadow">
                    <li><a className="dropdown-item" href="#subkpi-add-modal" data-bs-toggle="modal" data-translate="actions.add">Add</a></li>
                    <li><a className="dropdown-item" href="#kpi-edit-modal" data-bs-toggle="modal" data-translate="actions.edit">Edit</a></li>
                    <li><a className="dropdown-item" href="#kpi-view-modal" data-bs-toggle="modal" data-translate="actions.view">View</a></li>
                    <li><a className="dropdown-item" href="#delete-modal" data-bs-toggle="modal" data-translate="actions.delete">Delete</a></li>
                </ul>
            </div>
        </div>
    );

    // Level >= 2 = Sub-KPI rows (file-text, link, badge-info, dropdown with Edit/View/Delete only)
    const renderLevelDeep = () => (
        <div className="table-actions justify-content-end">
            <a href="#" onClick={(e) => { e.preventDefault(); generateScorecardKpiPDF(); }}
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="file-text" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
            <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="link" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
            <a href="#subkpi-view-modal" data-bs-toggle="modal" type="button"
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="badge-info" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
            <div className="dropdown" ref={dropdownRef}>
                <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                    <i data-lucide="ellipsis-vertical" style={{ width: '16px', height: '16px' }}></i>
                </button>
                <ul className="dropdown-menu border-0 shadow">
                    <li><a className="dropdown-item" href="#subkpi-edit-modal" data-bs-toggle="modal" data-translate="actions.edit">Edit</a></li>
                    <li><a className="dropdown-item" href="#subkpi-view-modal" data-bs-toggle="modal" data-translate="actions.view">View</a></li>
                    <li><a className="dropdown-item" href="#delete-modal" data-bs-toggle="modal" data-translate="actions.delete">Delete</a></li>
                </ul>
            </div>
        </div>
    );

    if (level === 0) return renderLevel0();
    if (level === 1) return renderLevel1();
    return renderLevelDeep();
};
