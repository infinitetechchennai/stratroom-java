import React, { useEffect } from 'react';
import { generateScorecardPDF } from '../../../utils/pdfGenerator';
import scorecardDataFile from '../../../data/scorecard.json';

export const ScorecardHeader = () => {
    useEffect(() => {
        // Initialize lucide icons for the bar-chart-2 icon
        if (window.lucide) {
            window.lucide.createIcons();
        }
        // Initialize feather icons for plus, download, printer, upload, settings
        if (window.feather) {
            window.feather.replace();
        }
    }, []);

    return (
        <div className="page-header grid gap-2 pb-1">
            <div className="g-col-8 d-flex align-items-center">
                <h4 className="title">
                    <span className="icon">
                        <i data-lucide="bar-chart-2" style={{ width: '16px', height: '16px' }}></i>
                    </span>
                    <span data-translate="page.scorecard.title">Scorecard</span> <span
                        className="badge text-bg-success">100%</span>
                </h4>
            </div>
            <div className="load-page page-actions g-col-4">
                <div className="page-icons">
                    <ul>
                        <li>
                            <a className="active" href="#perspective-add-modal" data-bs-toggle="modal">
                                <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Add Perspective" data-translate="page.scorecard.addPrespective">
                                    <i data-feather="plus" style={{ width: '14px', height: '14px' }}></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#import-modal" data-bs-toggle="modal">
                                <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Import">
                                    <i style={{ width: '14px', height: '14px' }} data-feather="download"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                if (window.generateScorecardPDF) window.generateScorecardPDF();
                            }} data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Generate Report">
                                <i style={{ width: '14px', height: '14px' }} data-feather="printer"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
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
