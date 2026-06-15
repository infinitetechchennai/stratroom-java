import React from 'react';

const ScorecardTemplate = ({
  ScoreCardName = 'ScoreCardName',
  score_value = '',
  message = '',
  scorecardhtmlcontent = null
}) => {
  return (
    <>
      <div className="row py-2 scorecard-title">
        <div className="col-md-10">
          <h5 style={{ paddingTop: '10px' }} className="pageTitleStatus">
            {scorecardhtmlcontent || (
              <>
                {ScoreCardName} <span className="scorecard_status">Good</span>
              </>
            )}
            <span id="score" style={{ display: 'none' }}>{score_value}</span>
          </h5>
          <div aria-label="breadcrumb">
            <ol className="breadcrumb mb_bcrumb">
              <li className="breadcrumb-item">
                <a href="#">{ScoreCardName}</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Standard BSC View</a>
              </li>
            </ol>
          </div>
        </div>

        <div className="col-md-2" style={{ paddingTop: '16px' }}>
          <button
            className="btn btn-custom-secondary scorecarddescription pull-right"
            data-toggle="modal"
            data-target=".scorecard_description_popup"
            onClick={() => {
              if (window.handleScoreCardEvent) window.handleScoreCardEvent();
            }}
            style={{ marginLeft: '4px' }}
          >
            <i className="fas fa-cog" style={{ fontSize: '14px' }}></i>
          </button>

          <a
            href="#"
            style={{
              float: 'right',
              padding: '2px',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            <button
              className="btn btn-custom-secondary pull-right"
              id="OpenImgUpload"
              style={{ marginLeft: '4px' }}
            >
              <i className="fas fa-upload"></i>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                id="importscorescrd"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
            </button>
          </a>

          <button
            className="btn btn-custom-secondary dropdown-toggle pull-right"
            data-toggle="dropdown"
          >
            <i className="far fa-eye"></i>

            <ul
              className="dropdown-menu dropdown-hide multi-column columns pull-right"
              x-placement="bottom-start"
              style={{
                position: 'absolute',
                willChange: 'transform',
                top: '0px',
                left: '0px',
                width: '180px',
                transform: 'translate3d(0px, 24px, 0px)',
              }}
            >
              <div className="row">
                <div className="col-sm-12">
                  <ul className="multi-column-dropdown">
                    <li>
                      <a href="#">
                        <label>
                          <input
                            type="checkbox"
                            name="financial"
                            value="financial"
                            defaultChecked
                          />
                          Financial
                        </label>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <label>
                          <input
                            type="checkbox"
                            name="customer"
                            value="customer"
                            defaultChecked
                          />
                          Customer
                        </label>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <label>
                          <input
                            type="checkbox"
                            name="internal-process"
                            value="internal-process"
                            defaultChecked
                          />
                          Internal Process
                        </label>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <label>
                          <input
                            type="checkbox"
                            name="learning-growth"
                            value="learning-growth"
                            defaultChecked
                          />
                          Learning and Growth
                        </label>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </ul>
          </button>
        </div>
      </div>

      {message && (
        <div className="container-fluid">
          <div className="tableview" style={{ backgroundColor: 'white', padding: '10px', marginTop: '10px', borderRadius: '10px' }}>
            <center><h3>{message}</h3></center>
          </div>
        </div>
      )}

      {/* File Upload Success PopUp Start */}
      <div className="modal fade upLoadScoreCardSuccessModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="myLargeModalLabel">
                Success!
              </h6>
              <button
                type="button"
                className="close fileuploadclose"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              id="scorecardSuccess"
              style={{ overflowX: 'scroll' }}
            ></div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                data-i18n="Ok"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* File Upload Success PopUp End */}
    </>
  );
};

export default ScorecardTemplate;
