import React from 'react';

// Trend indicator: green up arrow, red down arrow, grey dash for stable/flat.
// Inline SVG so it always renders (the old remote PNGs could fail to load).
export const TrendIcon = ({ status }) => {
    const s = (status || '').toLowerCase();

    if (s === 'up') {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Trend up">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="6 11 12 5 18 11" />
            </svg>
        );
    }
    if (s === 'down') {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Trend down">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="6 13 12 19 18 13" />
            </svg>
        );
    }
    // stable / flat / unknown
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" aria-label="Trend stable">
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
};
