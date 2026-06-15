import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { StatusIcon } from '../ui/StatusIcon';
import { TrendIcon } from '../ui/TrendIcon';
import { ActionMenu } from '../ui/ActionMenu';

export const SubKpiRow = ({ item, parentId, index, level = 2, isVisible = true }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const rowId = `${parentId}-child-${index + 1}`;
    
    const flagStatus = item.flag?.[0]?.status || "red";
    const riskStatus = item.risk?.[0]?.status || "red";
    const trendStatus = item.trend?.[0]?.status || "";

    const hasChildren = item.children && item.children.length > 0;

    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
    });

    return (
        <React.Fragment>
            <tr className={`child-of-${parentId} level-${level}`} data-id={rowId} style={{ display: isVisible ? '' : 'none' }}>
                <td width="30">
                    <div className="d-flex justify-content-end gap-2">
                            <span 
                                className="icon toggle-icon" 
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
                    <a className="text-decoration-none" href={item.url || '#'}>{item.name}</a>
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
                    <ActionMenu level={level} />
                </td>
            </tr>
            {hasChildren && item.children.map((child, idx) => (
                <SubKpiRow key={idx} item={child} parentId={rowId} index={idx} level={level + 1} isVisible={isVisible && isExpanded} />
            ))}
        </React.Fragment>
    );
};
