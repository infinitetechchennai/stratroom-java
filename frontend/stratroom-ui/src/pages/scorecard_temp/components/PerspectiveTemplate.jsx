import React from 'react';

const PerspectiveTemplate = ({
  showhidetitle = '',
  displayblock = 'block',
  scorecardStatuslight = '',
  scorecardStatusvalueofweight = '',
  title = '',
  defaultscr = '',
  perspectiveOptionsicon = null,
  headerRow = null,
  bodyRows = null,
  id = '',
}) => {
  return (
    <div id={id} data-scrid={Scrid} className="tab-pane fade show active">
      <div className="card custom-card table-card" style={{ width: '100%' }}>
        <div className="card-header" style={{ backgroundColor: '#1f2d63', color: 'white' }}>
          <div className="c-header-left">
            {scorecardStatusvalueofweight && (
              <span className="badge text-bg-success">{scorecardStatusvalueofweight}</span>
            )}
            <h5 className="card-title me-auto" style={{ color: 'white' }}>
              <strong>{title}</strong>
            </h5>
          </div>
          <div className="card-actions">
            {/* The dropdown actions matching legacy */}
            <div className="dropdown">
              <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <span className="icon">
                  <i data-lucide="ellipsis-vertical" style={{ width: '16px', height: '16px', color: 'white' }}></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered w-100 m-0">
            {headerRow}
            {bodyRows}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerspectiveTemplate;
