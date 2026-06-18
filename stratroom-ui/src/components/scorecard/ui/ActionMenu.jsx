import React, { useRef, useEffect } from 'react';
import { downloadKpiReport } from '../../../utils/kpiReport';
import { useScorecardContext } from '../../../context/ScorecardContext';

export const ActionMenu = ({ level, item }) => {
    const dropdownRef = useRef(null);
    const { setStoryCardItem } = useScorecardContext();

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
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openAddKpi(item?.pk)} data-translate="actions.add">Add</button></li>
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openEditObjective(item?.pk)} data-translate="actions.edit">Edit</button></li>
                    <li><a className="dropdown-item" href="#objective-view-modal" data-bs-toggle="modal" data-translate="actions.view">View</a></li>
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openDeleteModal('objective', item?.pk)} data-translate="actions.delete">Delete</button></li>
                </ul>
            </div>
        </div>
    );

    // Level 1 = KPI row (file-text, link, badge-info, dropdown with Add/Edit/View/Delete)
    const renderLevel1 = () => (
        <div className="table-actions justify-content-end">
             <a href="#" onClick={(e) => { e.preventDefault(); downloadKpiReport(item?.kpiPk ?? item?.id); }}
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="file-text" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
             <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   className="btn btn-sm btn-icon" onClick={() => setStoryCardItem(item)}>
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
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openAddSubKpi(item?.pk)} data-translate="actions.add">Add</button></li>
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openEditKpi(item?.pk)} data-translate="actions.edit">Edit</button></li>
                    <li><a className="dropdown-item" href="#kpi-view-modal" data-bs-toggle="modal" data-translate="actions.view">View</a></li>
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openDeleteModal('kpi', item?.pk)} data-translate="actions.delete">Delete</button></li>
                </ul>
            </div>
        </div>
    );

    // Level >= 2 = Sub-KPI rows (file-text, link, badge-info, dropdown with Edit/View/Delete only)
    const renderLevelDeep = () => (
        <div className="table-actions justify-content-end">
            <a href="#" onClick={(e) => { e.preventDefault(); downloadKpiReport(item?.kpiPk ?? item?.id); }}
                   className="btn btn-sm btn-icon">
                <span className="icon"><i data-lucide="file-text" style={{ width: '16px', height: '16px' }}></i></span>
            </a>
            <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   className="btn btn-sm btn-icon" onClick={() => setStoryCardItem(item)}>
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
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openEditSubKpi(item?.pk)} data-translate="actions.edit">Edit</button></li>
                    <li><a className="dropdown-item" href="#subkpi-view-modal" data-bs-toggle="modal" data-translate="actions.view">View</a></li>
                    <li><button className="dropdown-item" onClick={() => window.scorecardActions?.openDeleteModal('subkpi', item?.pk)} data-translate="actions.delete">Delete</button></li>
                </ul>
            </div>
        </div>
    );

    if (level === 0) return renderLevel0();
    if (level === 1) return renderLevel1();
    return renderLevelDeep();
};
