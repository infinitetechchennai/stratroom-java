function getDynamicColor(text) {
    if (!text) return 'status-bg-gray';
    const colors = ['status-bg-blue', 'status-bg-indigo', 'status-bg-purple', 'status-bg-pink', 'status-bg-red', 'status-bg-orange', 'status-bg-yellow', 'status-bg-green', 'status-bg-teal', 'status-bg-cyan', 'status-bg-sky-blue', 'status-bg-lime-green'];
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

let DATA = [];
let filtered = [];
let expandedRows = {};
let activeTabs = {};

$(document).ready(function () {
    loadRisks();
});

const ICO = {
    chevron: '<i data-feather="chevron-right" style="width: 14px; height: 14px;"></i>',
    view: '<i data-feather="eye" style="width: 14px; height: 14px;"></i>',
    edit: '<i data-feather="edit-2" style="width: 14px; height: 14px;"></i>',
    del: '<i data-feather="trash-2" style="width: 14px; height: 14px;"></i>',
    plus: '<i data-feather="plus" style="width: 14px; height: 14px;"></i>',
    table: '<i data-feather="layout" style="width: 14px; height: 14px;"></i>',
    more: '<i data-feather="more-vertical" style="width: 14px; height: 14px;"></i>'
};

function statusBadge(status) {
    if (!status) return '';
    let cls = 'status-notstarted';
    let text = status;
    const lower = status.toLowerCase();

    if (lower.includes('critical') || lower.includes('extreme') || lower.includes('high') || lower === 'at risk') cls = 'status-atrisk';
    else if (lower.includes('medium') || lower === 'in progress') cls = 'status-inprogress';
    else if (lower.includes('low') || lower === 'completed') cls = 'status-completed';
    else if (lower === 'on hold') cls = 'status-onhold';

    // Fallback if no exact match but contains medium/low/etc
    if (cls === 'status-notstarted') {
        if (lower.includes('medium')) cls = 'status-onhold';
        if (lower.includes('low')) cls = 'status-completed';
    }

    return `<span class="badge ${cls}"><span class="badge-dot"></span>${text}</span>`;
}

function applyRiskRows(actualData) {
    if (!actualData || actualData.length === 0) {
        DATA = [];
        filtered = [];
        window.DATA = DATA;
        window.filtered = filtered;
        $('#risk-tbody').html('<tr><td colspan="9" class="text-center p-3">No risks found.</td></tr>');
        render();
        return;
    }

    DATA = actualData.map(item => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        title: item.title || "",
        owner: item.owner || { name: "Unknown", image: "assets/images/user/user7.jpg" },
        department: item.department || "",
        riskCategory: item.riskCategory || "",
        riskLevel: item.riskLevel || "",
        status: item.status || "In Progress",
        dateRaised: item.dateRaised || "-",
        dateCompleted: item.dateCompleted || "-",
        inherentRiskScore: item.inherentRiskScore || "",
        residualRiskScore: item.residualRiskScore || "",
        impact: item.impact || "-",
        likelihood: item.likelihood || "-",
        pos: item.pos || "-",
        iso: item.iso || "-",
        infoAsset: item.informationAsset && Array.isArray(item.informationAsset) ? item.informationAsset.join(", ") : (item.infoAsset || item.informationAsset || "-"),
        businessImpact: item.businessImpactKPI && Array.isArray(item.businessImpactKPI) ? item.businessImpactKPI.join(", ") : (item.businessImpact || item.businessImpactKPI || "-"),
        financialImpact: item.financialImpact && Array.isArray(item.financialImpact) ? item.financialImpact.join(", ") : (item.financialImpact || "-"),
        others: item.others || "-",
        nextAssessment: item.nextAssessment || "-",
        versionStatus: item.versionStatus || "Draft",
        causesAndConsequences: item.causesAndConsequences || [],
        controls: item.controls || [],
        riskTreatments: item.riskTreatments || [],
        reviewMonitoring: item.reviewMonitoring || [],
        files: item.files || [],
        comments: item.comments || []
    }));

    filtered = [...DATA];
    window.DATA = DATA;
    window.filtered = filtered;

    syncVersionFilterToData();

    if (typeof applyFilters === 'function') {
        applyFilters();
    } else {
        render();
    }
}

function syncVersionFilterToData() {
    if (!DATA.length) return;
    const draftCount = DATA.filter(function (i) { return (i.versionStatus || 'Draft') === 'Draft'; }).length;
    const approvedCount = DATA.filter(function (i) { return (i.versionStatus || 'Draft') === 'Approved'; }).length;
    if (draftCount === 0 && approvedCount > 0 && currentVersionView === 'Draft') {
        currentVersionView = 'Approved';
        document.querySelectorAll('[onclick*="setVersionFilter"]').forEach(function (btn) {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').indexOf("'Approved'") >= 0) {
                btn.classList.add('active');
            }
        });
    } else if (approvedCount === 0 && draftCount > 0 && currentVersionView === 'Approved') {
        currentVersionView = 'Draft';
        document.querySelectorAll('[onclick*="setVersionFilter"]').forEach(function (btn) {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').indexOf("'Draft'") >= 0) {
                btn.classList.add('active');
            }
        });
    }
}

function loadRisksFromJson() {
    $.getJSON("assets/json/risk_new.json", function (data) {
        let actualData = data;
        if (data && data.length > 0 && data[0].data) {
            actualData = data[0].data;
        }
        applyRiskRows(actualData);
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Error loading risks JSON: ", textStatus, error);
        $('#risk-tbody').html('<tr><td colspan="9" class="text-danger text-center p-3">Failed to load risks data.</td></tr>');
    });
}

function loadRisks() {
    if (window.RiskApiBridge && window.RiskApiBridge.enabled) {
        window.RiskApiBridge.loadDepartments()
            .then(function (depts) {
                window.RiskApiBridge.populateDepartmentFilter(depts);
            })
            .catch(function () { /* dept list optional */ });

        window.RiskApiBridge.loadRisks()
            .then(function (rows) {
                applyRiskRows(rows);
            })
            .catch(function (err) {
                console.error('Risk API load failed', err);
                DATA = [];
                filtered = [];
                window.DATA = DATA;
                window.filtered = filtered;
                $('#risk-tbody').html('<tr><td colspan="9" class="text-danger text-center p-3">Failed to load risks from server.</td></tr>');
                render();
            });
        return;
    }
    loadRisksFromJson();
}

window.loadRisks = loadRisks;

function toggleRow(id) {
    expandedRows[id] = !expandedRows[id];
    if (!activeTabs[id]) activeTabs[id] = 'cause';

    if (expandedRows[id] && window.RiskApiBridge && window.RiskApiBridge.enabled) {
        const risk = DATA.find(function (r) { return r.id === id; });
        if (risk && !risk._detailLoaded) {
            window.RiskApiBridge.loadRiskDetail(id)
                .then(function (detail) {
                    Object.assign(risk, detail);
                    risk._detailLoaded = true;
                    render();
                })
                .catch(function () { render(); });
            return;
        }
    }
    render();
}

function switchTab(iid, tab) {
    activeTabs[iid] = tab;
    render();
}

window.currentVersionView = 'Draft';

window.setVersionFilter = function (val, btn) {
    currentVersionView = val;
    if (btn && btn.parentElement) {
        const buttons = btn.parentElement.querySelectorAll('button');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    } else {
        document.querySelectorAll('[onclick*="setVersionFilter"]').forEach(function (b) {
            b.classList.remove('active');
            if (b.getAttribute('onclick') && b.getAttribute('onclick').indexOf("'" + val + "'") >= 0) {
                b.classList.add('active');
            }
        });
    }
    applyFilters();
};

window.applyFilters = function () {
    const dept = document.getElementById('deptFilter') ? document.getElementById('deptFilter').value : 'All Departments';
    const stat = document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : 'All Status';
    const cat = document.getElementById('categoryFilter') ? document.getElementById('categoryFilter').value : 'All Categories';

    filtered = DATA.filter(item => {
        let matchDept = true;
        let matchStat = true;
        let matchCat = true;
        let matchVer = true;

        if (dept !== 'All Departments' && item.department !== dept) {
            matchDept = false;
        }
        if (stat !== 'All Status' && item.status !== stat) {
            matchStat = false;
        }
        if (cat !== 'All Categories' && item.riskCategory !== cat) {
            matchCat = false;
        }

        const itemVer = item.versionStatus || 'Draft';
        if (currentVersionView !== itemVer) {
            matchVer = false;
        }

        return matchDept && matchStat && matchCat && matchVer;
    });

    window.filtered = filtered;
    render();
};

window.viewRisk = function (id) {
    const risk = DATA.find(r => r.id === id);
    if (!risk) return;

    if (document.getElementById('view-modal-riskcode')) {
        document.getElementById('view-modal-riskcode').innerText = "risk/BOD/" + risk.id;
        document.getElementById('view-modal-description').innerText = risk.title || "-";
        document.getElementById('view-modal-relatedparties').innerText = risk.owner ? risk.owner.name : "-";
        document.getElementById('view-modal-impactcategory').innerText = risk.riskCategory || "-";
        document.getElementById('view-modal-impact').innerText = risk.impact || "-";
        document.getElementById('view-modal-likelihood').innerText = risk.likelihood || "-";
        document.getElementById('view-modal-riskscore').innerText = risk.riskLevel || "-";
        document.getElementById('view-modal-inherentscore').innerText = risk.inherentRiskScore || "-";
        document.getElementById('view-modal-residualscore').innerText = risk.residualRiskScore || "-";

        document.getElementById('view-modal-pos').innerText = risk.pos || "-";
        document.getElementById('view-modal-iso').innerText = risk.iso || "-";
        document.getElementById('view-modal-infoasset').innerText = risk.infoAsset || "-";
        document.getElementById('view-modal-businessimpact').innerText = risk.businessImpact || "-";
        document.getElementById('view-modal-financialimpact').innerText = risk.financialImpact || "-";
        document.getElementById('view-modal-others').innerText = risk.others || "-";


        const contextEl = document.getElementById('view-modal-context');
        if (contextEl) {
            let html = '<div class="d-flex flex-column gap-1 align-items-start">';
            const ctx = risk.context || ['KPI'];
            ctx.forEach(c => {
                html += `<span class="badge text-dark border" style="background:#e2e8f0;">${c}</span>`;
            });
            html += '</div>';
            contextEl.innerHTML = html;
        }

        // Store for tabs
        window.currentViewRisk = risk;
    }
}

function toggleSub(subId) {
    const actRows = document.querySelectorAll('.act-for-' + subId);
    if (actRows.length > 0) {
        const isHidden = actRows[0].style.display === 'none';
        actRows.forEach(r => r.style.display = isHidden ? 'table-row' : 'none');
        const btn = document.querySelector('.btn-sub-' + subId);
        if (btn) btn.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    }
}

function renderOwners(owners, remaining) {
    if (!owners) return '';
    let html = '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
    owners.forEach(owner => {
        html += `<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${owner.name}"><img src="${owner.image}" class="rounded-circle" alt="${owner.name}" width="24" height="24"></li>`;
    });
    if (remaining > 0) {
        html += `<li class="avatar avatar-xs pull-up" data-bs-toggle="modal" data-bs-target="#user_edit_popup"><span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="${remaining} more">+${remaining}</span></li>`;
    }
    html += '</ul>'; return html;
}

function renderCauseAndConsequence(items, riskId) {
    if (!items || !items.length) return '<div class="empty">No Causes and Consequences available</div>';
    let html = '<div class="table-wrapper"><table class="table table-custom border child-table" style="margin-bottom:0;">';
    html += '<thead style="background:#f1f5f9;text-align:left;"><tr><th style="width:30%;">Name</th><th style="width:15%;">Rating</th><th style="width:25%;">Risk/Impact Category</th><th style="width:15%;">Risk Score</th><th style="width:15%;text-align:right;">Actions</th></tr></thead><tbody>';

    const rawChevron = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    items.forEach(cc => {
        const hasCons = cc.consequences && cc.consequences.length > 0;
        const subId = riskId ? riskId + '-' + cc.id : cc.id;
        let caret = hasCons ? `<span class="btn-sub-${subId}" style="display:inline-flex;align-items:center;cursor:pointer;color:#94a3b8;transition:transform 0.2s" onclick="toggleSub('${subId}')">${rawChevron}</span>` : '<span style="width:14px;display:inline-block"></span>';

        let riskCat = cc.riskCategory || 'Operational';
        let possibleEvent = cc.possibleEvent || 'System failure';
        let likelihood = cc.likelihood || 'Possible';
        let impact = cc.impact || 'Moderate';
        let riskScore = cc.riskScore || 'Medium';
        let desc = cc.description || '-';

        html += `
        <tr style="background:#fff;">
            <td style="padding-left:12px !important;"><div class="sub-name" style="display:flex;align-items:center;gap:8px;">${caret}<span class="sub-name-text" style="font-weight:600;color:#1e293b;">${cc.title}</span></div></td>
            <td><span class="badge ${cc.badgeClass}">${cc.badge}</span></td>
            <td>${riskCat}</td>
            <td>${riskScore}</td>
            <td>
                <div class="table-actions justify-content-end">
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#cause-view-modal" onclick="viewCauseDetail('${riskId}', '${cc.id}')">${ICO.view}</button>
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#cause-edit-modal">${ICO.edit}</button>
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#consequence-add-modal">${ICO.plus}</button>
                </div>
            </td>
        </tr>`;

        if (hasCons) {
            cc.consequences.forEach(con => {
                let impCat = con.impactCategory || 'Financial';
                let conEvent = con.possibleEvent || 'Revenue Drop';
                let conLike = con.likelihood || 'Likely';
                let conImp = con.impact || 'Major';
                let conScore = con.riskScore || 'High';
                let conDesc = con.description || '-';

                html += `
                <tr class="act-for-${subId}" style="display:none;background:#f8fafc;border-top:1px solid #f1f5f9;">
                    <td style="padding-left:36px !important;"><div class="sub-name" style="display:flex;align-items:center;gap:8px;"><span style="width:14px;display:inline-block"></span><span class="sub-name-text" style="font-size:12px;color:#475569;font-weight:500;">${con.title}</span></div></td>
                    <td><span class="badge ${con.badgeClass}">${con.badge}</span></td>
                    <td>${impCat}</td>
                    <td>${conScore}</td>
                    <td>
                        <div class="table-actions justify-content-end">
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#consequence-view-modal" onclick="viewConsequenceDetail('${riskId}', '${cc.id}', '${con.id}')">${ICO.view}</button>
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#consequence-edit-modal">${ICO.edit}</button>
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
                        </div>
                    </td>
                </tr>`;
            });
        }
    });
    html += '</tbody></table></div>';
    return html;
}

function renderHeatMap() {
    return `
    <div class="card border-0" style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; min-height: 200px;">
        <div class="card-header" style="border-bottom: 1px solid #f1f5f9; padding: 15px 20px; display: flex; align-items: center; justify-content: space-between;">
            <div class="c-header-left">
                <div class="heat-map">
                    <select id="heatmapselection" name="" class="form-select form-select-sm" style="width: auto;">
                        <option value="inherent">Inherent Heat Map</option>
                        <option value="residual" selected>Residual Heat Map</option>
                    </select>
                </div>
            </div>
            <div class="card-actions" style="display:flex; align-items:center;">
                <div class="heatToggleCheck" style="margin-right: 10px;">
                  <input type="checkbox" id="heatmapToggle" class="d-none">
                  <label class="btn btn-sm btn-icon" for="heatmapToggle">
                    <i data-lucide="chart-scatter" style="width: 14px; height: 14px;"></i>
                  </label>
                </div>
               
            </div>
        </div>
        <div class="card-body" style="padding: 20px;">
            <div id="heatmapChartLarge" style="width:100%; height:320px;"></div>
            <div id="heatmapTableLarge" style="display:none;">
                <table id="inherentTableLarge" class="table table-bordered w-100">
                  <thead style="background:#f1f5f9;">
                    <tr>
                      <th>Impact Name</th>
                      <th>Risk Impact Category</th>
                      <th>Type</th>
                      <th>Impact Value</th>
                      <th>Likelihood Value</th>
                      <th>Risk Score</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
            </div>
        </div>
    </div>`;
}

function renderControls(items, riskId) {
    if (!items || !items.length) return '<div class="empty">No Controls available</div>';
    let html = '<div class="table-wrapper"><table class="table table-custom border child-table" style="margin-bottom:0;">';
    html += '<thead style="background:#f1f5f9;text-align:left;"><tr><th style="width:30%">Title</th><th style="width:20%">Strategy</th><th style="width:15%">Date</th><th style="width:15%">Progress</th><th style="text-align:right">Actions</th></tr></thead><tbody>';

    const rawChevron = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    items.forEach(ctrl => {
        let progressColor = 'fill-gray';
        if (ctrl.progress >= 90) progressColor = 'fill-green';
        else if (ctrl.progress >= 40) progressColor = 'fill-amber';
        else if (ctrl.progress > 0) progressColor = 'fill-red';

        const hasItems = ctrl.items && ctrl.items.length > 0;
        const subId = riskId ? riskId + '-ctrl-' + ctrl.id : 'ctrl-' + ctrl.id;
        let caret = hasItems ? `<span class="btn-sub-${subId}" style="display:inline-flex;align-items:center;cursor:pointer;color:#94a3b8;transition:transform 0.2s" onclick="toggleSub('${subId}')">${rawChevron}</span>` : '<span style="width:14px;display:inline-block"></span>';

        html += `
        <tr style="background:#fff;">
            <td style="padding-left:12px !important;"><div class="sub-name" style="display:flex;align-items:center;gap:8px;">${caret}<span class="sub-name-text" style="font-weight:500;color:#1e293b;">${ctrl.title}</span></div></td>
            <td>${ctrl.strategy || '-'}</td>
            <td>${ctrl.date || '-'}</td>
            <td>
                <div class="progress-wrap">
                    <div class="progress-track"><div class="progress-fill ${progressColor}" style="width: ${ctrl.progress || 0}%"></div></div>
                    <div class="progress-label">${ctrl.progress || 0}%</div>
                </div>
            </td>
            <td>
                <div class="table-actions justify-content-end">
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#reducingPossibility-add-modal" title="Add Child Item">${ICO.plus}</button>
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#reducingImpact-edit-modal">${ICO.edit}</button>
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
                </div>
            </td>
        </tr>`;

        if (hasItems) {
            ctrl.items.forEach(cItem => {
                let itemProgressColor = 'fill-gray';
                if (cItem.progress >= 90) itemProgressColor = 'fill-green';
                else if (cItem.progress >= 40) itemProgressColor = 'fill-amber';
                else if (cItem.progress > 0) itemProgressColor = 'fill-red';

                html += `
                <tr class="act-for-${subId}" style="display:none;background:#f8fafc;border-top:1px solid #f1f5f9;">
                    <td style="padding-left:36px !important;"><div class="sub-name" style="display:flex;align-items:center;gap:8px;"><span style="width:14px;display:inline-block"></span><span class="sub-name-text" style="font-size:12px;color:#475569;font-weight:500;">${cItem.title}</span></div></td>
                    <td><span class="badge ${cItem.statusClass || ''}">${cItem.status || '-'}</span></td>
                    <td>${cItem.date || '-'}</td>
                    <td>
                        <div class="progress-wrap">
                            <div class="progress-track"><div class="progress-fill ${itemProgressColor}" style="width: ${cItem.progress || 0}%"></div></div>
                            <div class="progress-label">${cItem.progress || 0}%</div>
                        </div>
                    </td>
                    <td>
                        <div class="table-actions justify-content-end">
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#reducingPossibility-edit-modal" title="Edit Child Item">${ICO.edit}</button>
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
                        </div>
                    </td>
                </tr>`;
            });
        }
    });
    html += '</tbody></table></div>';
    return html;
}

function renderTreatments(items) {
    if (!items || !items.length) return '<div class="empty">No Risk Treatments available</div>';
    let html = '<div class="table-wrapper"><table class="table table-custom border nested-table child-table" style="margin-bottom:0;">';
    html += '<thead style="background:#f1f5f9;text-align:left;"><tr><th style="width:30%">Reducing Impact</th><th style="width:25%">Reducing Possibility</th><th style="width:15%">Strategy</th><th style="width:15%">Progress</th><th style="text-align:right">Actions</th></tr></thead><tbody>';

    items.forEach(rt => {
        let progressColor = 'fill-cyan';
        html += `
        <tr style="background:#fff;">
            <td style="padding-left:12px;"><span class="sub-name-text" style="font-weight:500;color:#1e293b;">${rt.reducingImpact}</span></td>
            <td><span class="sub-name-text">${rt.reducingPossibility}</span></td>
            <td>${rt.strategy || '-'}</td>
            <td>
                <div class="progress-wrap">
                    <div class="progress-track"><div class="progress-fill ${progressColor}" style="width: ${rt.progress || 0}%"></div></div>
                    <div class="progress-label">${rt.progress || 0}%</div>
                </div>
            </td>
            <td>
                <div class="table-actions justify-content-end">
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#risktreatement-edit-modal">${ICO.edit}</button>
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
                </div>
            </td>
        </tr>`;
    });
    html += '</tbody></table></div>';
    return html;
}

function renderMonitoring(items) {
    if (!items || !items.length) return '<div class="empty">No Review & Monitoring available</div>';
    let html = '<div class="table-wrapper"><table class="table table-custom border nested-table child-table" style="margin-bottom:0;">';
    html += '<thead style="background:#f1f5f9;text-align:left;"><tr><th style="width:40%">Title</th><th style="width:15%">Status</th><th style="width:15%">Date</th><th style="width:15%">Progress</th><th style="text-align:right">Actions</th></tr></thead><tbody>';

    items.forEach(rm => {
        html += `
        <tr style="background:#fff;">
            <td style="padding-left:12px;"><span class="sub-name-text" style="font-weight:500;color:#1e293b;">${rm.title}</span></td>
            <td>${rm.status || '-'}</td>
            <td>${rm.date || '-'}</td>
            <td>
                <div class="progress-wrap">
                    <div class="progress-track"><div class="progress-fill fill-amber" style="width: ${rm.progress || 0}%"></div></div>
                    <div class="progress-label">${rm.progress || 0}%</div>
                </div>
            </td>
            <td>
                <div class="table-actions justify-content-end">
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#reviewMonitoring-edit-modal">${ICO.edit}</button>
                    <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
                </div>
            </td>
        </tr>`;
    });
    html += '</tbody></table></div>';
    return html;
}

function renderAttachmentsTable(attachments) {
    if (!attachments || !attachments.length) return '<div class="empty">No attachments available</div>';
    const rows = attachments.map(a => `
<tr style="background:#fff;">
<td style="padding-left:12px;"><span class="sub-name-text" style="cursor:pointer;text-decoration:underline">${a.fileName || a.title}</span></td>
<td><span class="type-badge">${(a.fileName || "PDF").split('.').pop().toUpperCase()}</span></td>
<td style="color:#64748b">${a.size}</td>
<td style="color:#64748b">${a.date}</td>
<td><div class="table-actions justify-content-end">
<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#attachments-modal" >${ICO.edit}</button>
<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
</div></td>
</tr>`).join('');
    return `<div class="table-wrapper"><table class="table table-custom border nested-table child-table" style="margin-bottom:0;">
<thead style="background:#f1f5f9;"><tr>
<th style="width:35%;text-align:left;">FILE NAME</th>
<th style="width:15%;text-align:left;">TYPE</th>
<th style="width:15%;text-align:left;">SIZE</th>
<th style="width:25%;text-align:left;">DATE UPLOADED</th>
<th style="width:10%;text-align:right;">ACTIONS</th>
</tr></thead>
<tbody>${rows}</tbody>
</table></div>`;
}

function renderCommentsTable(comments) {
    if (!comments || !comments.length) return '<div class="empty">No comments available</div>';

    let commentsHtml = '';
    comments.slice().reverse().forEach(c => {
        commentsHtml += `
        <div class="comment" style="margin-bottom: 15px;">
            <div class="comment-content">
                <div class="comment-card" style="display:flex; align-items:flex-start;">
                    <span class="avatar-initial rounded-circle text-white user-img" style="background:#64748b; width:28px; height:28px; font-size:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${c.user?.name ? c.user.name.substring(0, 2).toUpperCase() : 'U'}</span>
                    <div class="comment-cr" style="margin-left: 10px; flex: 1; min-width: 0;">
                        <div class="comment-highlight" style="background:#f8fafc; padding:10px; border-radius:6px;">
                            <div class="comment-head" style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                <h6 class="user-name" style="margin:0; font-size:13px; font-weight:600; color:#334155;">${c.user?.name || "User"}</h6> 
                                <span class="comment-time" style="font-size:11px; color:#94a3b8; white-space: nowrap; margin-left: 10px;">${c.time || ""}</span>
                            </div>
                            <div class="comment-text" style="font-size:13px; color:#475569; word-wrap: break-word; overflow-wrap: break-word; white-space: pre-wrap;">${c.text}</div>
                        </div>
                        <div class="comment-actions" style="font-size:11px; color:#64748b; margin-top:5px; margin-left:5px;">
                            <span class="like-btn" style="cursor:pointer;">Like</span> ·
                            <span class="like-count">0</span> ·
                            <span class="reply-btn" style="cursor:pointer;">Reply</span> ·
                            <span class="edit-btn" style="cursor:pointer;">Edit</span> ·
                            <span class="delete-btn" style="cursor:pointer;">Delete</span>
                        </div>
                    </div>
                </div>
                <div class="reply-section" style="display: none; margin-left:38px; margin-top:10px;">
                  <div class="input-group" style="border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                      <input type="text" class="form-control reply-input" placeholder="Write a reply..." style="font-size:12px; border:none; box-shadow:none;">
                      <button class="btn btn-sm label-bg-primary reply-post" type="button" style="z-index: 6;">
                        <i data-feather="send" width="14" height="14"></i>
                      </button>
                  </div>
                </div>
                <div class="replies" style="margin-left:38px; margin-top:10px;width:auto"></div>
            </div>
        </div>`;
    });

    return `
<div class="card custom-card table-card h-100" style="border:none; box-shadow:none; margin:0;">
  <div class="card-body overflow-auto comment-history comments-list" style="max-height: 262px; padding: 10px;">
    ${commentsHtml}
  </div>
  <div class="card-footer comment_send" style="padding: 15px 10px; background: transparent; border-top: 1px solid #f1f5f9;">
    <div class="input-group" style="border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
      <input id="comment-input" type="text" class="form-control comment-input" placeholder="Type a comment..."
        aria-label="Write a comment..." style="font-size:13px; border:none; box-shadow:none;">
      <button class="btn label-bg-primary post-comment" type="button">
        <i data-feather="send" width="16" height="16"></i>
      </button>
    </div>
  </div>
</div>`;
}

function renderPanel(risk) {
    const iid = risk.id;
    const tab = activeTabs[iid] || 'cause';

    const tabs = [
        { k: 'cause', label: 'Cause and Consequence', count: risk.causesAndConsequences.length },
        { k: 'heat', label: 'Heat Map', count: 0 },
        { k: 'controls', label: 'Controls', count: risk.controls.length },
        { k: 'treat', label: 'Risk Treatement', count: risk.riskTreatments.length },
        { k: 'monitor', label: 'Review & Monitoring', count: risk.reviewMonitoring.length },
        { k: 'attach', label: 'Attachments', count: risk.files.length },
        { k: 'comments', label: 'Comments', count: risk.comments.length },
    ];

    const tabHtml = tabs.map(t => `
<button class="tab-btn ${tab === t.k ? 'active' : ''}" onclick="switchTab('${iid}','${t.k}')">
${t.label}${t.count > 0 ? `<span class="tab-count">${t.count}</span>` : ''}
</button>`).join('');

    let subContent = '';
    if (tab === 'cause') {
        subContent = `<div class="sub-toolbar">
        <h5 class="subtoolbar-title">Causes and Consequences</h5>
        <div class="toolbar-actions">   
        <div class="action-btn">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#cause-add-modal">${ICO.plus}</button>
         </div>
        </div>
      </div> ${renderCauseAndConsequence(risk.causesAndConsequences, risk.id)}`;
    } else if (tab === 'heat') {
        subContent = `<div class="sub-toolbar">
        <h5 class="subtoolbar-title">Heat Map</h5>
      </div> ${renderHeatMap()}`;
    } else if (tab === 'controls') {
        subContent = `<div class="sub-toolbar">
        <h5 class="subtoolbar-title">Controls</h5>
        <div class="toolbar-actions">   
        <div class="action-btn">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#reducingImpact-add-modal">${ICO.plus}</button>
         </div>
        </div>
      </div> ${renderControls(risk.controls, risk.id)}`;
    } else if (tab === 'treat') {
        subContent = `<div class="sub-toolbar">
        <h5 class="subtoolbar-title">Risk Treatment</h5>
        <div class="toolbar-actions">   
        <div class="action-btn">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#risktreatement-add-modal">${ICO.plus}</button>
         </div>
        </div>
      </div> ${renderTreatments(risk.riskTreatments)}`;
    } else if (tab === 'monitor') {
        subContent = `<div class="sub-toolbar">
        <h5 class="subtoolbar-title">Review & Monitoring</h5>
        <div class="toolbar-actions">   
        <div class="action-btn">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#reviewMonitoring-add-modal">${ICO.plus}</button>
         </div>
        </div>
      </div> ${renderMonitoring(risk.reviewMonitoring)}`;
    } else if (tab === 'attach') {
        subContent = `<div class="sub-toolbar">
        <h5 class="subtoolbar-title">Attachments</h5>
        <div class="toolbar-actions">   
        <div class="action-btn">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#attachments-modal">${ICO.plus}</button>
         </div>
        </div>
      </div> ${renderAttachmentsTable(risk.files)}`;
    } else if (tab === 'comments') {
        subContent = `<div class="sub-toolbar">
        <h5 class="subtoolbar-title">Comments</h5>
      </div> ${renderCommentsTable(risk.comments)}`;
    }

    return `<td colspan="9">
<div class="panel-inner">
  <div class="tabs">${tabHtml}</div>
  ${subContent}
</div>
</td>`;
}

window.toggleAll = function (source) {
    const checkboxes = document.querySelectorAll('#mainTable tbody input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = source.checked;
    });
};

window.currentPage = 1;
window.ITEMS_PER_PAGE = 5;

window.changePage = function (page) {
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;
    render();
};

function render() {
    const tbody = document.getElementById('risk-tbody');
    if (!tbody) return;

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIdx, endIdx);

    let html = '';
    paginated.forEach(risk => {
        const exp = expandedRows[risk.id];
        html += `<tr class="main-row${exp ? ' expanded' : ''}" id="row-${risk.id}">
<td><input type="checkbox" class="row-check"></td>
<td><button class="chevron-btn${exp ? ' open' : ''}" onclick="toggleRow('${risk.id}')">${ICO.chevron}</button></td>
<td>
<div style="display: flex; align-items: start; gap: 8px;">
    <div class="user-card">
            <div class="user-image user-image-sm">
                <img src="${risk.owner.image}" alt="${risk.owner.name}" width="24" height="24">
            </div>
            </div>
    
    <div>
    <div class="initiative-name" style="margin-bottom: 2px;">${risk.title}</div>
    <div class="initiative-meta">${risk.riskCategory ? `<span class="type-badge ${getDynamicColor(risk.riskCategory)} rounded-pill" style="margin-right: 6px;">${risk.riskCategory}</span>` : ''}ID: ${risk.id}</div>
     <div class="initiative-meta">Next Assessment: ${risk.nextAssessment}</div>
    </div>
</div>
</td>
<td><span class="dept-link">${risk.department}</span></td>
<td>${statusBadge(risk.status)}</td>
<td>${statusBadge(risk.riskLevel)}</td>
<td style="color:#64748b;font-size:12px;white-space:nowrap">${risk.dateRaised}</td>
<td style="color:#64748b;font-size:12px;white-space:nowrap">${risk.dateCompleted}</td>
<td><div class="table-actions justify-content-end align-items-center">

<select class="form-select form-select-sm" style="width: auto; display: inline-block; padding: 0px 32px 0px 8px; font-size: 11px; border-color: #e2e8f0; height: 24px;">
  <option selected disabled>All Versions</option>
  <option value="versions 01">Versions 01</option>
  <option value="versions 02">Versions 02</option>
</select>
<button class="btn btn-sm btn-icon">
  <i data-feather="check" style="width: 12px; height: 12px; color: #000;"></i>
</button>
<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#risk-view-modal" onclick="viewRisk('${risk.id}')">${ICO.view}</button>
<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#risk-edit-modal" onclick="openEditRisk('${risk.id}')">${ICO.edit}</button>
<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#delete-modal">${ICO.del}</button>
</div></td>
</tr>`;
        if (exp) {
            html += `<tr class="expanded-panel child-row-container" id="panel-${risk.id}">${renderPanel(risk)}</tr>`;
        }
    });
    tbody.innerHTML = html;

    const paginationContainer = document.getElementById('paginationContainer');
    const rowCountEl = document.getElementById('rowCount');

    if (rowCountEl) {
        rowCountEl.innerText = `${totalItems} risk register${totalItems !== 1 ? 's' : ''}`;
    }

    if (paginationContainer) {
        paginationContainer.innerHTML = `
            <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
            <button class="page-btn active">${currentPage}</button>
            <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        `;
    }

    setTimeout(() => {
        if (document.getElementById('heatmapChartLarge') && typeof renderRiskChart !== 'undefined') {
            renderRiskChart("#heatmapChartLarge", activeRiskChartData, aciveCardtableheat);
        }
        if (document.getElementById('inherentTableLarge') && typeof renderCardtableheat !== 'undefined') {
            renderCardtableheat("#inherentTableLarge", aciveCardtableheat);
        }
    }, 100);

    if (typeof feather !== 'undefined') feather.replace();
    if (window.lucide) lucide.createIcons();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

window.viewCauseDetail = function (riskId, causeId) {
    const risk = DATA.find(r => r.id === riskId);
    if (!risk) return;
    const cause = risk.causesAndConsequences.find(c => c.id === causeId);
    if (!cause) return;

    document.getElementById('view-cause-title').innerText = cause.title || '-';
    document.getElementById('view-cause-riskCategory').innerText = cause.riskCategory || '-';
    document.getElementById('view-cause-possibleEvent').innerText = cause.possibleEvent || '-';
    document.getElementById('view-cause-likelihood').innerText = cause.likelihood || '-';
    document.getElementById('view-cause-impact').innerText = cause.impact || '-';
    document.getElementById('view-cause-riskScore').innerText = cause.riskScore || '-';
    document.getElementById('view-cause-description').innerText = cause.description || '-';
}

window.viewConsequenceDetail = function (riskId, causeId, conId) {
    const risk = DATA.find(r => r.id === riskId);
    if (!risk) return;
    const cause = risk.causesAndConsequences.find(c => c.id === causeId);
    if (!cause) return;
    const con = cause.consequences.find(c => c.id === conId);
    if (!con) return;

    document.getElementById('view-consequence-title').innerText = con.title || '-';
    document.getElementById('view-consequence-impactCategory').innerText = con.impactCategory || '-';
    document.getElementById('view-consequence-possibleEvent').innerText = con.possibleEvent || '-';
    document.getElementById('view-consequence-likelihood').innerText = con.likelihood || '-';
    document.getElementById('view-consequence-impact').innerText = con.impact || '-';
    document.getElementById('view-consequence-riskScore').innerText = con.riskScore || '-';
    document.getElementById('view-consequence-description').innerText = con.description || '-';
}
