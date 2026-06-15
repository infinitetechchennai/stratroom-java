import React from 'react';

const trendImageUrls = {
    up: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png",
    down: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png",
};

export const TrendIcon = ({ status }) => {
    const src = trendImageUrls[status];
    if (!src) return null;
    return <img src={src} width="12" height="12" alt={`Trend ${status}`} />;
};
