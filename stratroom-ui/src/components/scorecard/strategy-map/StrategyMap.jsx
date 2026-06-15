import React, { useState, useEffect } from 'react';

export const StrategyMap = ({ tabs, onBackToTable }) => {
    const [showArrows, setShowArrows] = useState(true);

    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
    });

    if (!tabs || tabs.length === 0) {
        return <p className="smap-empty">No data available for Strategy Map.</p>;
    }

    return (
        <div className="smap-wrapper">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                    <h4 style={{ margin: 0, color: '#1e293b', fontWeight: 700, fontSize: '16px' }}>Strategy Map</h4>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>Cause-and-effect relationships across perspectives</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        className="btn btn-outline-secondary btn-sm" 
                        style={{ background: '#fff', borderColor: '#e2e8f0', color: '#475569', fontWeight: 600, padding: '6px 12px', borderRadius: '6px' }} 
                        onClick={() => setShowArrows(!showArrows)}
                    >
                        {showArrows ? 'Hide Arrows' : 'Show Arrows'}
                    </button>
                    <button 
                        className="btn btn-outline-secondary btn-sm" 
                        style={{ background: '#fff', borderColor: '#e2e8f0', color: '#475569', fontWeight: 600, padding: '6px 12px', borderRadius: '6px' }} 
                        onClick={onBackToTable}
                    >
                        &larr; Back to Table
                    </button>
                </div>
            </div>

            <div className="smap-container w-100" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {tabs.map((tab, pi) => {
                    const objectives = tab.tabledata || [];
                    const pScore = tab.totalScore || '';
                    const pName = tab.title || `Perspective ${pi + 1}`;

                    return (
                        <React.Fragment key={pi}>
                            <div className="smap-lane-new" style={{ display: 'flex', alignItems: 'stretch', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc', overflow: 'hidden', minHeight: '80px' }}>
                                {/* Left dark box */}
                                <div className="smap-perspective-box" style={{ background: '#1e293b', color: '#fff', padding: '15px', width: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: '11px', lineHeight: 1.3, marginBottom: '6px' }}>{pName}</div>
                                    <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#00d284' }}>{pScore}</div>
                                </div>

                                {/* Objectives wrapper */}
                                <div className="smap-objectives-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '15px', flexGrow: 1, alignItems: 'center' }}>
                                    {objectives.length === 0 ? (
                                        <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>No objectives</div>
                                    ) : (
                                        objectives.map((obj, oi) => {
                                            const status = (obj.flag?.[0]?.status || '').toLowerCase();
                                            let scoreColor = '#1e293b'; // default
                                            if (status === 'green') scoreColor = '#10b981';
                                            else if (status === 'yellow') scoreColor = '#f59e0b';
                                            else if (status === 'red') scoreColor = '#ef4444';

                                            const kpiCount = obj.children ? obj.children.length : 0;
                                            const oScore = obj.score || '';

                                            return (
                                                <div 
                                                    key={oi} 
                                                    className="smap-node-new" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#objective-view-modal" 
                                                    style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', minWidth: '180px', flex: '1 1 200px', maxWidth: '300px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                                                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'none'; }}
                                                >
                                                    <div style={{ fontWeight: 600, fontSize: '11px', color: '#1e293b', marginBottom: '4px' }}>{obj.name || '—'}</div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                                                        <span style={{ fontWeight: 'bold', fontSize: '12px', color: scoreColor }}>{oScore}</span>
                                                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>{kpiCount} KPI{kpiCount !== 1 ? 's' : ''}</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Arrow Divider */}
                            {pi < tabs.length - 1 && (
                                <div className="smap-arrow-divider" style={{ display: showArrows ? 'flex' : 'none', justifyContent: 'center', margin: '-5px 0' }}>
                                    <span style={{ color: '#00a8cc', fontWeight: 600, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <i data-lucide="chevron-up" style={{ width: '16px', height: '16px' }}></i> Supports
                                    </span>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
