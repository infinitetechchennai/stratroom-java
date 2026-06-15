import React, { useState } from 'react';
import { StatusIcon } from '../ui/StatusIcon';
import { TrendIcon } from '../ui/TrendIcon';
import { ActionMenu } from '../ui/ActionMenu';
import { KpiRow } from './KpiRow';

export const ObjectiveRow = ({ item, parentId, index }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const rowId = parentId ? `${parentId}-child-${index + 1}` : `row-${index}`;
    
    const flagStatus = item.flag?.[0]?.status || "red";
    const riskStatus = item.risk?.[0]?.status || "red";
    const trendStatus = item.trend?.[0]?.status || "";

    const hasChildren = item.children && item.children.length > 0;

    return (
        <React.Fragment>
            <tr className={`${parentId ? `child-of-${parentId} ` : ''}level-0`} data-id={rowId}>
                <td width="30">
                    <div className="d-flex justify-content-end gap-2">
                        <StatusIcon status={flagStatus} type="flag" />
                    </div>
                </td>
                <td width="80">{item.id}</td>
                <td>
                    {item.name}
                </td>
                <td width="50" className="text-center">{item.period}</td>
                <td width="50" className="text-center">{item.score}</td>
                <td width="50" className="text-center">
                    <TrendIcon status={trendStatus} />
                </td>
                <td width="50" className="text-center">{item.baseline}</td>
                <td width="50" className="text-end">{item.actual}</td>
                <td width="50" className="text-end">{item.target}</td>
                <td width="50" className="text-center">
                    <StatusIcon status={riskStatus} type="risk" />
                </td>
                <td width="70">
                    <ActionMenu level={0} />
                </td>
            </tr>
            {hasChildren && item.children.map((child, idx) => (
                <KpiRow key={idx} item={child} parentId={rowId} index={idx} isVisible={isExpanded} />
            ))}
        </React.Fragment>
    );
};
