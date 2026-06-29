import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusIcon } from '../ui/StatusIcon';
import { TrendIcon } from '../ui/TrendIcon';
import { ActionMenu } from '../ui/ActionMenu';
import { KpiRow } from './KpiRow';
import { useScorecardSettings } from '../../../hooks/useScorecardSettings';

export const ObjectiveRow = ({ item, parentId, index }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const rowId = parentId ? `${parentId}-child-${index + 1}` : `row-${index}`;
    const { settings } = useScorecardSettings();
    
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

    // Calculate flag status based on threshold if customPerformance is enabled
    let flagStatus = item.flag?.[0]?.status || "red";
    if (s.customPerformance === 'true' && item.score != null && item.score !== 'N/A') {
        const score = parseFloat(item.score);
        if (!isNaN(score)) {
            if (s.aggregationType === 'Five Status') {
                const t1 = parseFloat(s.threshold1) || 40;
                const t2 = parseFloat(s.threshold2) || 80;
                const t3 = parseFloat(s.threshold3) || 90;
                const t4 = parseFloat(s.threshold4) || 60;
                const t5 = parseFloat(s.threshold5) || 75;
                if (score < t1) flagStatus = "red";
                else if (score < t4) flagStatus = "orange";
                else if (score < t5) flagStatus = "yellow";
                else if (score < t2) flagStatus = "lightgreen";
                else flagStatus = "green";
            } else if (s.aggregationType === 'Three Status') {
                const t1 = parseFloat(s.threshold1) || 40;
                const t2 = parseFloat(s.threshold2) || 80;
                if (score < t1) flagStatus = "red";
                else if (score < t2) flagStatus = "yellow";
                else flagStatus = "green";
            }
        }
    }

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
                    <Link className="text-decoration-none" to={`/kpi-story-card/${item.pk || item.id}`}>{item.name}</Link>
                </td>
                <td width="50" className="text-center">{item.period}</td>
                <td width="50" className="text-center">{item.score}</td>
                {showTrend && (
                    <td width="50" className="text-center">
                        <TrendIcon status={trendStatus} />
                    </td>
                )}
                {showBaseline && <td width="50" className="text-center">{item.baseline || ''}</td>}
                {showActual && <td width="50" className="text-end">{item.actual || ''}</td>}
                {showTarget && <td width="50" className="text-end">{item.target || ''}</td>}
                {showStrech && <td width="50" className="text-end">{item.strech || ''}</td>}
                {showStable && <td width="50" className="text-center">{item.stable || ''}</td>}
                {showIndex && <td width="50" className="text-center">{item.index || ''}</td>}
                {showShrink && <td width="50" className="text-center">{item.shrink || ''}</td>}
                {showRisk && (
                    <td width="50" className="text-center">
                        <StatusIcon status={riskStatus} type="risk" />
                    </td>
                )}
                <td width="70">
                    <ActionMenu level={0} item={item} />
                </td>
            </tr>
            {hasChildren && item.children.map((child, idx) => (
                <KpiRow key={idx} item={child} parentId={rowId} index={idx} isVisible={isExpanded} />
            ))}
        </React.Fragment>
    );
};
