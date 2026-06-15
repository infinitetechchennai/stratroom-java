import React from 'react';
import { ObjectiveRow } from '../rows/ObjectiveRow';

export const ScorecardTable = ({ tabledata, tablePrefix }) => {
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
                        <th width="50" className="text-center">Trend</th>
                        <th width="50" className="text-center">Baseline</th>
                        <th width="50" className="text-end">Actual</th>
                        <th width="50" className="text-end">Target</th>
                        <th width="50" className="text-center">Risk</th>
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
