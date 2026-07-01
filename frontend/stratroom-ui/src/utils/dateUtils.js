export function parseDateRange(dateRangeString) {
    if (!dateRangeString || typeof dateRangeString !== 'string') return { start: null, end: null };
    const parts = dateRangeString.split('-');
    if (parts.length !== 2) return { start: null, end: null };
    
    const parsedStart = new Date(parts[0].trim());
    const parsedEnd = new Date(parts[1].trim());
    
    if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
        return { start: null, end: null };
    }
    
    return { start: parsedStart, end: parsedEnd };
}

export function getMonthCount(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
}

export function generatePeriodBoundary(startDate, monthOffset) {
    if (!startDate) return null;
    let year = startDate.getFullYear();
    let month = startDate.getMonth() + monthOffset;
    
    // Handle month overflow correctly
    year += Math.floor(month / 12);
    month = month % 12;
    if (month < 0) {
        month += 12;
    }
    
    return new Date(year, month, 1);
}
