import React from 'react';

export const KpiRowTemplate = ({
  kpiId = '',
  statusLight = null,
  kpiDisplayId = '',
  hasSubKpi = false,
  kpiName = '',
  kpiPeriod = '',
  kpiScore = '',
  trendIcon = null,
  kpiActual = '',
  kpiTarget = '',
  kpiOptionsicon = null,
  objectiveId = '',
  isExpanded = false,
  onToggle = () => {}
}) => {
  return (
    <tr data-kpi-id={kpiId} data-objective-id={objectiveId} style={{ backgroundColor: 'white' }}>
      <td className="text-center">{statusLight}</td>
      <td>{kpiDisplayId}</td>
      <td onClick={onToggle} style={{ cursor: hasSubKpi ? 'pointer' : 'default', textAlign: 'left', minWidth: '260px' }}>
        {hasSubKpi && (
          <i className={`fa ${isExpanded ? 'fa-angle-down' : 'fa-angle-right'}`} style={{ marginRight: '5px' }}></i>
        )}
        <a href="#" style={{ fontWeight: 'normal', color: '#007bff', textDecoration: 'none' }}>
          {kpiName}
        </a>
      </td>
      <td className="text-center">{kpiPeriod}</td>
      <td className="text-center">{kpiScore}</td>
      <td className="text-center">{trendIcon}</td>
      <td className="text-end">{kpiActual}</td>
      <td className="text-end">{kpiTarget}</td>
      <td className="text-center">{kpiOptionsicon}</td>
    </tr>
  );
};

export const SubKpiRowTemplate = ({
  kpiId = '',
  statusLight = null,
  kpiDisplayId = '',
  kpiName = '',
  kpiPeriod = '',
  kpiScore = '',
  trendIcon = null,
  kpiActual = '',
  kpiTarget = '',
  kpiOptionsicon = null,
  objectiveId = '',
  subKpiId = '',
  isVisible = false
}) => {
  return (
    <tr data-parent-kpi-id={kpiId} data-objective-id={objectiveId} data-subkpi-id={subKpiId} style={{ display: isVisible ? 'table-row' : 'none', backgroundColor: 'white' }}>
      <td className="text-center">{statusLight}</td>
      <td>{kpiDisplayId}</td>
      <td style={{ textAlign: 'left', paddingLeft: '2rem', minWidth: '260px' }}>
        <a href="#" style={{ fontWeight: 'normal', color: '#007bff', textDecoration: 'none' }}>
          {kpiName}
        </a>
      </td>
      <td className="text-center">{kpiPeriod}</td>
      <td className="text-center">{kpiScore}</td>
      <td className="text-center">{trendIcon}</td>
      <td className="text-end">{kpiActual}</td>
      <td className="text-end">{kpiTarget}</td>
      <td className="text-center">{kpiOptionsicon}</td>
    </tr>
  );
};

export const KpiGroupTemplate = ({ kpi, objectiveId, getStatusIcon, getTrendIcon, getActionsMenu }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const kv = kpi.kpiValue || {};

  return (
    <React.Fragment>
      <KpiRowTemplate
        objectiveId={objectiveId}
        kpiId={kpi.id}
        kpiDisplayId={kpi.kpiId}
        hasSubKpi={kpi.subKpiList && kpi.subKpiList.length > 0}
        kpiName={kv.name}
        kpiPeriod={kv.kpi_measurement}
        kpiScore={kv.thresholdResult}
        trendIcon={getTrendIcon(kv.trend)}
        kpiActual={kv.actual ? `${kv.actual} ${kv.kpiCurrency || ''}` : ''}
        kpiTarget={kv.target ? `${kv.target} ${kv.kpiCurrency || ''}` : ''}
        statusLight={getStatusIcon(kv.statusLight)}
        kpiOptionsicon={getActionsMenu ? getActionsMenu(1) : null}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      {kpi.subKpiList?.map((subKpi) => {
        const sk = subKpi.subKpiValue || {};
        return (
          <SubKpiRowTemplate
            key={subKpi.id}
            objectiveId={objectiveId}
            kpiId={kpi.id}
            subKpiId={subKpi.id}
            kpiDisplayId={subKpi.subKpiId}
            kpiName={sk.subMeasureName}
            kpiPeriod={sk.kpi_measurement}
            kpiScore={sk.thresholdResult}
            trendIcon={getTrendIcon(sk.trend)}
            kpiActual={sk.actual ? `${sk.actual} ${sk.targetCurrency || ''}` : ''}
            kpiTarget={sk.target ? `${sk.target} ${sk.targetCurrency || ''}` : ''}
            statusLight={getStatusIcon(sk.statusLight)}
            kpiOptionsicon={getActionsMenu ? getActionsMenu(2) : null}
            isVisible={isExpanded}
          />
        );
      })}
    </React.Fragment>
  );
};
