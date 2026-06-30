import React, { useEffect, useRef, useState } from 'react';
import { generateScorecardPDF } from '../../../utils/pdfGenerator';
import { exportScorecardToExcel, parseScorecardExcel } from '../../../utils/scorecardExcel';
import { importScorecardActuals } from '../../../services/scorecardV2Api';
import { useScorecardSettings } from '../../../hooks/useScorecardSettings';

function currentDateRange() {
    const y = new Date().getFullYear();
    return localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`;
}

// Reads the reporting period (MM/DD/YYYY - MM/DD/YYYY) from the global picker.
function currentPeriodLabel() {
    const y = new Date().getFullYear();
    const raw = localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`;
    return raw.split('-').join(' - ');
}

function currentUserName() {
    try {
        const p = JSON.parse(localStorage.getItem('profile') || '{}');
        return p.firstName || p.name || p.displayName || p.userName || '';
    } catch {
        return '';
    }
}

// scorecardData: { tab:[...], scorecardName, overallScore } from cardDetailsToTabs
export const ScorecardHeader = ({ scorecardData, pageId, onReload, onExportExcel }) => {
    const { settings } = useScorecardSettings();
    const fileRef = useRef(null);
    const [importMessage, setImportMessage] = useState(null);

    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
        if (window.feather) window.feather.replace();
    }, []);

    const handleGeneratePdf = (e) => {
        e.preventDefault();
        if (!scorecardData?.tab?.length) {
            alert('Scorecard data is still loading.');
            return;
        }
        const pdfData = [{
            pageTitle: scorecardData.scorecardName || 'Scorecard',
            period: currentPeriodLabel(),
            userName: currentUserName(),
            overallScore: scorecardData.overallScore || '',
            tab: scorecardData.tab,
            settings: settings
        }];
        generateScorecardPDF(pdfData);
    };

    const handleExport = (e) => {
        e.preventDefault();
        if (onExportExcel) { onExportExcel(); return; }
        if (!scorecardData?.tab?.length) {
            alert('Scorecard data is still loading.');
            return;
        }
        exportScorecardToExcel(scorecardData, scorecardData.scorecardName || 'Scorecard');
    };

    return (
        <>
            {importMessage && (
                <div className={`alert alert-${importMessage.type} alert-dismissible fade show`} role="alert" style={{ margin: '10px 0', borderLeft: '4px solid', borderRadius: '4px' }}>
                    <div style={{ whiteSpace: 'pre-wrap', paddingRight: '20px' }}>{importMessage.text}</div>
                    <button type="button" className="btn-close" onClick={() => setImportMessage(null)} aria-label="Close"></button>
                </div>
            )}
            <div className="page-header grid gap-2 pb-1">
                <div className="g-col-8 d-flex align-items-center">
                    <h4 className="title">
                        <span className="icon">
                            <i data-lucide="bar-chart-2" style={{ width: '16px', height: '16px' }}></i>
                        </span>
                        <span className="scorecard-title">{scorecardData?.scorecardName || 'Scorecard'}</span>{' '}
                        <span className="badge text-bg-success">{scorecardData?.overallScore || '100%'}</span>
                    </h4>
                </div>
                <div className="load-page page-actions g-col-4">
                    <div className="page-icons">
                        <ul>
                            <li>
                                <a className="active" href="#prespective-add-modal" data-bs-toggle="modal">
                                    <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        data-bs-title="Add Perspective" data-translate="page.scorecard.addPerspective">
                                        <i data-feather="plus" style={{ width: '14px', height: '14px' }}></i>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#import-modal" data-bs-toggle="modal">
                                    <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        data-bs-title="Import Excel">
                                        <i style={{ width: '14px', height: '14px' }} data-feather="upload"></i>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={handleGeneratePdf} data-bs-toggle="tooltip"
                                    data-bs-placement="bottom" data-bs-title="Generate Report">
                                    <i style={{ width: '14px', height: '14px' }} data-feather="printer"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={handleExport} data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
                                    <i style={{ width: '14px', height: '14px' }} data-feather="download"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#add-settings-modal" data-bs-toggle="modal">
                                    <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        data-bs-title="Settings" data-translate="page.scorecard.settings">
                                        <i style={{ width: '14px', height: '14px' }} data-feather="settings"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
