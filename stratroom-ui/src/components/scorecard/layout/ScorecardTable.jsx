import React from 'react';
import { ObjectiveRow } from '../rows/ObjectiveRow';
import { useScorecardSettings } from '../../../hooks/useScorecardSettings';

export const ScorecardTable = ({ tabledata, tablePrefix }) => {
    const { settings, loading } = useScorecardSettings();
    
    // Default to true if loading or settings not set
    const s = settings || {};
    const showActual = s.scorecardactual !== 'false';
    const showTarget = s.scorecardtarget !== 'false';
    const showBaseline = s.scorecardbaseline === 'true'; // default false
    const showTrend = s.scorecardtrend !== 'false';
    const showRisk = s.scorecardrisk !== 'false';
    const showStrech = s.scorecardstrech === 'true'; // default false
    const showStable = s.scorecardstable === 'true'; // default false
    const showIndex = s.scorecardindex !== 'false'; // default true
    const showShrink = s.scorecardshrink === 'true'; // default false

    return (
        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-bordered w-100 mb-0" id={`table-${tablePrefix}`}>
                    <thead>
                    <tr>
                        <th width="30">Status</th>
                        <th width="80">ID</th>
                        <th>Name</th>
                        <th width="50" className="text-center">Period</th>
                        <th width="50" className="text-center">Score</th>
                        {showTrend && <th width="50" className="text-center">Trend</th>}
                        {showBaseline && <th width="50" className="text-center">Baseline</th>}
                        {showActual && <th width="50" className="text-end">Actual</th>}
                        {showTarget && <th width="50" className="text-end">Target</th>}
                        {showStrech && <th width="50" className="text-end">Strech</th>}
                        {showStable && <th width="50" className="text-center">Stable</th>}
                        {showIndex && <th width="50" className="text-center">Index</th>}
                        {showShrink && <th width="50" className="text-center">Shrink</th>}
                        {showRisk && <th width="50" className="text-center">Risk</th>}
                        <th width="70" className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tabledata && tabledata.map((item, index) => (
                        <ObjectiveRow key={index} item={item} parentId={tablePrefix} index={index} />
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};
