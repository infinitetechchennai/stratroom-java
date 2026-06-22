import React, { useEffect, useRef, useState } from 'react';
import { generateScorecardPDF } from '../../../utils/pdfGenerator';
import { exportScorecardToExcel, parseScorecardExcel } from '../../../utils/scorecardExcel';
import { importScorecardActuals } from '../../../services/scorecardV2Api';

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
    const fileRef = useRef(null);
    const [importing, setImporting] = useState(false);

    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
        if (window.feather) window.feather.replace();
    }, []);

    const handleImportClick = (e) => {
        e.preventDefault();
        fileRef.current?.click();
    };

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        setImporting(true);
        try {
            const rows = await parseScorecardExcel(file);
            if (!rows.length) {
                alert('No KPI rows with Actual/Target values were found in the file.');
                return;
            }
            const res = await importScorecardActuals(pageId, currentDateRange(), rows);
            alert(`Import complete — ${res.updated ?? 0} updated, ${res.skipped ?? 0} skipped.`);
            if (onReload) onReload();
        } catch (err) {
            alert('Import failed: ' + (err?.message || err));
        } finally {
            setImporting(false);
        }
    };

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
        <div className="page-header grid gap-2 pb-1">
            <div className="g-col-8 d-flex align-items-center">
                <h4 className="title">
                    <span className="icon">
                        <i data-lucide="bar-chart-2" style={{ width: '16px', height: '16px' }}></i>
                    </span>
                    <span data-translate="page.scorecard.title">Scorecard</span>{' '}
                    <span className="badge text-bg-success">{scorecardData?.overallScore || '100%'}</span>
                </h4>
            </div>
            <div className="load-page page-actions g-col-4">
                <div className="page-icons">
                    <ul>
                        <li>
                            <a className="active" href="#kpi-calculator-modal" data-bs-toggle="modal"
                               data-scorecard-formula-launcher="true">
                                <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Scorecard Formula" data-translate="page.scorecard.scorecardFormula">
                                    <i data-feather="plus" style={{ width: '14px', height: '14px' }}></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={handleImportClick}>
                                <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title={importing ? 'Importing…' : 'Import Excel'}>
                                    <i style={{ width: '14px', height: '14px' }} data-feather="download"></i>
                                </span>
                            </a>
                            <input
                                ref={fileRef}
                                type="file"
                                accept=".xlsx,.xls"
                                style={{ display: 'none' }}
                                onChange={handleFile}
                            />
                        </li>
                        <li>
                            <a href="#" onClick={handleGeneratePdf} data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Generate Report">
                                <i style={{ width: '14px', height: '14px' }} data-feather="printer"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={handleExport} data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
                                <i style={{ width: '14px', height: '14px' }} data-feather="upload"></i>
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
    );
};
