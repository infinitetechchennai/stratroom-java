import React, { useState, useEffect } from 'react';

export const ThresholdSelector = ({ idPrefix, defaultThreshold = "option_3", disabled = false }) => {
    const [thresholdCount, setThresholdCount] = useState(defaultThreshold);

    // Allow external code (e.g. ScorecardPage) to push a value into this component
    // even when the select is disabled (native change events are blocked on disabled elements).
    useEffect(() => {
        const handler = (e) => {
            if (e.detail?.prefix === idPrefix) {
                setThresholdCount(e.detail.value);
            }
        };
        window.addEventListener('thresholdExternalSet', handler);
        return () => window.removeEventListener('thresholdExternalSet', handler);
    }, [idPrefix]);

    return (
        <div className="grid gap-3">
            <div className="g-col-12">
                <select
                    name={`${idPrefix}Threshold`}
                    id={`${idPrefix}Threshold`}
                    className={`form-select select-dropdown-add-kpi`}
                    data-placeholder="Select Threshold"
                    value={thresholdCount}
                    onChange={(e) => setThresholdCount(e.target.value)}
                    disabled={disabled}
                >
                    <option value="" disabled>Select Threshold</option>
                    <option value="option_3">Three Status</option>
                    <option value="option_4">Five Status</option>
                </select>
            </div>
            <div className="g-col-12">
                <div className="color-pickers">
                    <div className="scorecard-color-pickers d-flex flex-wrap gap-3">
                        <div className="input-group" style={{ width: '120px' }}>
                            <input id={`option1color1_${idPrefix}`} type="text" className="form-control" disabled={disabled} />
                            <span className="input-group-text pickr" style={{ backgroundColor: '#ff0000', width: '30px', cursor: 'pointer' }}></span>
                        </div>

                        {(thresholdCount === "option_2" || thresholdCount === "option_3" || thresholdCount === "option_4") && (
                            <div className="input-group" style={{ width: '120px' }}>
                                <input id={`option1color2_${idPrefix}`} type="text" className="form-control" disabled={disabled} />
                                <span className="input-group-text pickr" style={{ backgroundColor: thresholdCount === "option_4" ? '#FF4B3E' : '#FFC107', width: '30px', cursor: 'pointer' }}></span>
                            </div>
                        )}

                        {(thresholdCount === "option_3" || thresholdCount === "option_4") && (
                            <div className="input-group" style={{ width: '120px' }}>
                                <input id={`option1color3_${idPrefix}`} type="text" className="form-control" disabled={disabled} />
                                <span className="input-group-text pickr" style={{ backgroundColor: thresholdCount === "option_4" ? '#FFC107' : '#027D02', width: '30px', cursor: 'pointer' }}></span>
                            </div>
                        )}

                        {thresholdCount === "option_4" && (
                            <>
                                <div className="input-group" style={{ width: '120px' }}>
                                    <input id={`option1color4_${idPrefix}`} type="text" className="form-control" disabled={disabled} />
                                    <span className="input-group-text pickr" style={{ backgroundColor: '#5FCD5F', width: '30px', cursor: 'pointer' }}></span>
                                </div>
                                <div className="input-group" style={{ width: '120px' }}>
                                    <input id={`option1color5_${idPrefix}`} type="text" className="form-control" disabled={disabled} />
                                    <span className="input-group-text pickr" style={{ backgroundColor: '#027D02', width: '30px', cursor: 'pointer' }}></span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
