import React from 'react';

export const ScorecardTabs = ({ tabs, activeTabIndex, onTabChange }) => {
    return (
        <React.Fragment>
            {/* Create dropdown button (visible only on small screens) */}
            <button className="btn btn-primary dropdown-toggle d-lg-none" type="button"
                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {tabs && tabs.length > 0 ? tabs[activeTabIndex].title : 'Menu'}
            </button>
            <ul className="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist" aria-orientation="horizontal">
                {tabs && tabs.map((tab, index) => {
                    const isActive = index === activeTabIndex;
                    return (
                        <button
                            key={index}
                            className={`nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => onTabChange(index)}
                            type="button"
                            role="tab"
                        >
                            <span className="nav-text">
                                {tab.title}
                            </span>
                        </button>
                    );
                })}
            </ul>
        </React.Fragment>
    );
};
