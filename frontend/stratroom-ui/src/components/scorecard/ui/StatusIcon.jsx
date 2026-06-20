import React from 'react';

const riskImageUrls = {
    green: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg",
    yellow: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
    red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg"
};
const flagImageUrls = {
    green: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-green-i.svg",
    yellow: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-yellow-i.svg",
    red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-red-i.svg"
};

export const StatusIcon = ({ status, type = 'flag' }) => {
    const urls = type === 'risk' ? riskImageUrls : flagImageUrls;
    const src = urls[status] || urls['red']; // Default red

    if (!src) return null;

    return <img src={src} width="16" height="16" alt={`${type} ${status}`} />;
};
