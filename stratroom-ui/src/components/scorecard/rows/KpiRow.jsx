import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusIcon } from '../ui/StatusIcon';
import { TrendIcon } from '../ui/TrendIcon';
import { ActionMenu } from '../ui/ActionMenu';
import { SubKpiRow } from './SubKpiRow';

export const KpiRow = ({ item, parentId, index, isVisible = true }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const rowId = `${parentId}-child-${index + 1}`;
    
    const flagStatus = item.flag?.[0]?.status || "red";
    const riskStatus = item.risk?.[0]?.status || "red";
    const trendStatus = item.trend?.[0]?.status || "";

    const hasChildren = item.children && item.children.length > 0;

    const toggleRef = useRef(null);
    
    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
    });

    return (
        <React.Fragment>
            <tr className={`child-of-${parentId} level-1`} data-id={rowId} style={{ display: isVisible ? '' : 'none' }}>
                <td width="30">
                    <div className="d-flex justify-content-end gap-2">
                            <span 
                                className="icon toggle-icon" 
                                ref={toggleRef}
                                data-target={`${rowId}-child`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
                                    setIsExpanded(!isExpanded);
                                }}
                            >
                                {isExpanded ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                            </span>
                        <StatusIcon status={flagStatus} type="flag" />
                    </div>
                </td>
                <td width="80">{item.id}</td>
                <td>
                    <Link className="text-decoration-none" to="/kpi-story-card">{item.name}</Link>
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
                    <ActionMenu level={1} />
                </td>
            </tr>
            {hasChildren && item.children.map((child, idx) => (
                <SubKpiRow key={idx} item={child} parentId={rowId} index={idx} isVisible={isExpanded} />
            ))}
        </React.Fragment>
    );
};
