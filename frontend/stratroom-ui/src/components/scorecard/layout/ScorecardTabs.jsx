import React, { useState } from 'react';
import { useScorecardContext } from '../../../context/ScorecardContext';
import { Edit2, Check, X } from 'lucide-react';

export const ScorecardTabs = ({ tabs, activeTabIndex, onTabChange }) => {
    const { editPerspectiveName } = useScorecardContext();
    const [editingTabIndex, setEditingTabIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const startEditing = (index, currentTitle, e) => {
        e.stopPropagation();
        setEditingTabIndex(index);
        setEditValue(currentTitle);
    };

    const cancelEditing = (e) => {
        e.stopPropagation();
        setEditingTabIndex(null);
        setEditValue('');
    };

    const saveEdit = (index, tabId, e) => {
        if (e) e.stopPropagation();
        if (editValue.trim() && editValue !== tabs[index].title) {
            editPerspectiveName(tabId, editValue.trim());
        }
        setEditingTabIndex(null);
        setEditValue('');
    };

    return (
        <React.Fragment>
            {/* Create dropdown button (visible only on small screens) */}
            <button className="btn btn-primary dropdown-toggle d-lg-none" type="button"
                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {tabs && tabs.length > 0 ? (tabs[activeTabIndex]?.title || tabs[0]?.title || 'Menu') : 'Menu'}
            </button>
            <ul className="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist" aria-orientation="horizontal">
                {tabs && tabs.map((tab, index) => {
                    const isActive = index === activeTabIndex;
                    const isEditing = index === editingTabIndex;
                    const isHovered = index === hoveredIndex;

                    return (
                        <div
                            key={index}
                            className={`nav-link ${isActive ? 'active' : ''} d-flex align-items-center position-relative`}
                            onClick={() => { if (!isEditing) onTabChange(index); }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: isEditing ? 'default' : 'pointer', minHeight: '40px', padding: '0.5rem 1rem' }}
                            role="tab"
                        >
                            {isEditing ? (
                                <div className="d-flex align-items-center gap-2" onClick={e => e.stopPropagation()}>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-sm" 
                                        value={editValue} 
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') saveEdit(index, tab.pk, e);
                                            if (e.key === 'Escape') cancelEditing(e);
                                        }}
                                        autoFocus
                                        style={{ minWidth: '120px' }}
                                    />
                                    <span className="text-success cursor-pointer" onClick={(e) => saveEdit(index, tab.pk, e)}>
                                        <Check size={16} />
                                    </span>
                                    <span className="text-danger cursor-pointer" onClick={cancelEditing}>
                                        <X size={16} />
                                    </span>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center w-100 justify-content-between">
                                    <span className="nav-text" onDoubleClick={(e) => startEditing(index, tab.title, e)}>
                                        {tab.title}
                                    </span>
                                    {isHovered && (
                                        <span className="text-muted cursor-pointer ms-2" onClick={(e) => startEditing(index, tab.title, e)} title="Edit Perspective">
                                            <Edit2 size={14} />
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </ul>
        </React.Fragment>
    );
};
