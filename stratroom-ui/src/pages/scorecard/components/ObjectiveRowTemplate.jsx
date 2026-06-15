import React from 'react';

const ObjectiveRowTemplate = ({
  statusLight = null,
  objectiveDisplayId = '',
  objectiveName = '',
  actual = '',
  target = '',
  score = '',
  trendIcon = null,
  objectiveOptionsicon = null,
  children = null,
  scoreCardId = '',
  objectiveId = ''
}) => {
  return (
    <tbody>
      <tr data-scorecard-id={scoreCardId} data-objective-id={objectiveId} style={{ backgroundColor: '#f2f2f2' }}>
        <td className="text-center">{statusLight}</td>
        <td>{objectiveDisplayId}</td>
        <td style={{ textAlign: 'left' }}>
          <strong>{objectiveName}</strong>
        </td>
        <td className="text-center"></td>
        <td className="text-center">{score}</td>
        <td className="text-center">{trendIcon}</td>
        <td className="text-end">{actual}</td>
        <td className="text-end">{target}</td>
        <td className="text-center">
          {objectiveOptionsicon}
        </td>
      </tr>
      {children}
    </tbody>
  );
};

export default ObjectiveRowTemplate;
