import React from 'react';

const PerspectiveHeaderRowTemplate = () => {
  return (
    <thead style={{ backgroundColor: '#f8f9fa' }}>
      <tr>
        <th width="30" className="text-center">Status</th>
        <th width="80">ID</th>
        <th style={{ minWidth: '260px' }}>Name</th>
        <th width="80" className="text-center">Period</th>
        <th width="60" className="text-center">Score</th>
        <th width="60" className="text-center">Trend</th>
        <th width="90" className="text-end">Actual</th>
        <th width="90" className="text-end">Target</th>
        <th width="90" className="text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default PerspectiveHeaderRowTemplate;
