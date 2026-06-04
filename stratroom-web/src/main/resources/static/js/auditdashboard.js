    // ===== INIT DATA & VARIABLES =====
        const rootStyle = getComputedStyle(document.body);
        function getCssVar(varName, fallback) {
            return rootStyle.getPropertyValue(varName).trim() || fallback;
        }

        // Check mode on render to give labels proper visibility
        function getTextColor() { return getCssVar('--bs-body-color', '#1e293b'); }
        function getMutedColor() { return getCssVar('--bs-secondary-color', '#64748b'); }
        function getGridColor() { return getCssVar('--bs-border-color', '#e2e8f0'); }

        const AUDITS = [
            { id: "AUD-2025-001", title: "SOX Financial Controls Review", framework: "SOX", type: "Internal", status: "Closed", priority: "Critical", auditor: "Priya Mehta", owner: "CFO Office", start: "2025-01-10", end: "2025-02-14", findings: 3, open: 0, progress: 100, score: 91 },
            { id: "AUD-2025-002", title: "GDPR Data Processing Audit", framework: "GDPR", type: "Internal", status: "Closed", priority: "High", auditor: "Karan Iyer", owner: "DPO", start: "2025-02-01", end: "2025-03-15", findings: 7, open: 1, progress: 100, score: 74 },
            { id: "AUD-2025-003", title: "ISO 27001 Surveillance Audit", framework: "ISO 27001", type: "External", status: "In Progress", priority: "High", auditor: "BSI Auditors", owner: "CISO", start: "2025-03-01", end: "2025-04-30", findings: 5, open: 3, progress: 68, score: 81 },
            { id: "AUD-2025-004", title: "SEBI CSCRF Cybersecurity Review", framework: "CSCRF", type: "Regulatory", status: "In Progress", priority: "Critical", auditor: "Rajesh Kumar", owner: "CISO", start: "2025-03-10", end: "2025-05-10", findings: 4, open: 4, progress: 45, score: 67 },
            { id: "AUD-2025-005", title: "COBIT IT Governance Assessment", framework: "COBIT", type: "Internal", status: "Planned", priority: "Medium", auditor: "Ananya Sharma", owner: "IT Lead", start: "2025-05-01", end: "2025-06-15", findings: 0, open: 0, progress: 0, score: null },
            { id: "AUD-2025-006", title: "ESG Sustainability Disclosure Audit", framework: "ESG", type: "External", status: "Planned", priority: "Medium", auditor: "EY Advisory", owner: "Sustainability Officer", start: "2025-05-20", end: "2025-07-01", findings: 0, open: 0, progress: 0, score: null },
            { id: "AUD-2025-007", title: "Vendor Third-Party Risk Review", framework: "Internal", type: "Internal", status: "In Progress", priority: "High", auditor: "Nisha Patel", owner: "Procurement", start: "2025-03-15", end: "2025-04-15", findings: 6, open: 5, progress: 55, score: 70 },
            { id: "AUD-2025-008", title: "Access Control & IAM Audit", framework: "ISO 27001", type: "Internal", status: "Closed", priority: "High", auditor: "Karan Iyer", owner: "IT Security", start: "2025-01-20", end: "2025-02-28", findings: 4, open: 0, progress: 100, score: 88 },
            { id: "AUD-2025-009", title: "Business Continuity Plan Review", framework: "Internal", type: "Internal", status: "Overdue", priority: "High", auditor: "Vikram Singh", owner: "Risk Management", start: "2025-02-01", end: "2025-03-01", findings: 2, open: 2, progress: 80, score: 62 },
            { id: "AUD-2025-010", title: "SOX IT General Controls Q1", framework: "SOX", type: "Internal", status: "Closed", priority: "High", auditor: "Priya Mehta", owner: "IT Compliance", start: "2025-01-05", end: "2025-01-31", findings: 2, open: 0, progress: 100, score: 95 },
        ];

        const FINDINGS = [
            { id: "FND-001", audit: "AUD-2025-002", title: "Consent records incomplete for legacy users", severity: "High", status: "Open", owner: "Privacy Governance", due: "2025-04-30", age: 45, framework: "GDPR" },
            { id: "FND-002", audit: "AUD-2025-003", title: "Encryption at rest not enforced on 3 servers", severity: "Critical", status: "In Progress", owner: "CISO", due: "2025-04-15", age: 28, framework: "ISO 27001" },
            { id: "FND-003", audit: "AUD-2025-003", title: "Patch management SLA breached for 12 systems", severity: "High", status: "Open", owner: "IT Ops", due: "2025-04-20", age: 22, framework: "ISO 27001" },
            { id: "FND-004", audit: "AUD-2025-003", title: "DR test not conducted in past 18 months", severity: "Medium", status: "Open", owner: "IT Infrastructure", due: "2025-05-31", age: 22, framework: "ISO 27001" },
            { id: "FND-005", audit: "AUD-2025-004", title: "SOC monitoring gap - 6hr window unlogged", severity: "Critical", status: "Open", owner: "SOC Manager", due: "2025-04-10", age: 18, framework: "CSCRF" },
            { id: "FND-006", audit: "AUD-2025-004", title: "Vulnerability scan cadence below policy", severity: "High", status: "Open", owner: "Security Ops", due: "2025-04-25", age: 18, framework: "CSCRF" },
            { id: "FND-007", audit: "AUD-2025-004", title: "MFA not enforced for privileged accounts", severity: "Critical", status: "In Progress", owner: "IAM Admin", due: "2025-04-08", age: 18, framework: "CSCRF" },
            { id: "FND-008", audit: "AUD-2025-004", title: "Incident response playbook outdated (2022)", severity: "Medium", status: "Open", owner: "Cybersecurity Officer", due: "2025-05-15", age: 18, framework: "CSCRF" },
            { id: "FND-009", audit: "AUD-2025-007", title: "3 vendors missing NDA / DPA agreements", severity: "High", status: "Open", owner: "Legal", due: "2025-04-28", age: 14, framework: "Internal" },
            { id: "FND-010", audit: "AUD-2025-007", title: "No SLA monitoring for Tier-1 vendors", severity: "High", status: "Open", owner: "Procurement", due: "2025-05-10", age: 14, framework: "Internal" },
            { id: "FND-011", audit: "AUD-2025-007", title: "Access revocation delayed >30 days for 2 vendors", severity: "Critical", status: "Open", owner: "IAM Admin", due: "2025-04-12", age: 14, framework: "Internal" },
            { id: "FND-012", audit: "AUD-2025-009", title: "BCP not tested against cloud failover scenario", severity: "High", status: "In Progress", owner: "Risk Management", due: "2025-03-30", age: 40, framework: "Internal" },
            { id: "FND-013", audit: "AUD-2025-009", title: "RTO targets undefined for 2 critical applications", severity: "High", status: "Open", owner: "IT Architecture", due: "2025-04-05", age: 40, framework: "Internal" },
        ];

        const TREND = [
            { month: "Oct", opened: 4, closed: 2, score: 72 },
            { month: "Nov", opened: 6, closed: 4, score: 75 },
            { month: "Dec", opened: 3, closed: 5, score: 79 },
            { month: "Jan", opened: 8, closed: 6, score: 83 },
            { month: "Feb", opened: 5, closed: 7, score: 85 },
            { month: "Mar", opened: 9, closed: 4, score: 78 },
        ];

        const STATUS_META = {
            Closed: { color: "#16a34a", bg: "#dcfce7" }, // Using clearer green for the text over white
            "In Progress": { color: "#2563eb", bg: "#dbeafe" },
            Planned: { color: "#9333ea", bg: "#f3e8ff" },
            Overdue: { color: "#dc2626", bg: "#fee2e2" },
            Open: { color: "#ea580c", bg: "#ffedd5" }
        };

        const SEV_META = {
            Critical: { color: "#ef4444", dot: "●" },
            High: { color: "#f97316", dot: "●" },
            Medium: { color: "#eab308", dot: "●" },
            Low: { color: "#22c55e", dot: "●" },
        };

        const FW_COLORS = {
            SOX: "#f59e0b", GDPR: "#3b82f6", "ISO 27001": "#06b6d4",
            CSCRF: "#ef4444", COBIT: "#a855f7", ESG: "#22c55e", Internal: "#64748b"
        };

        const totalAudits = AUDITS.length;
        const closed = AUDITS.filter(a => a.status === "Closed").length;
        const inProgress = AUDITS.filter(a => a.status === "In Progress").length;
        const overdue = AUDITS.filter(a => a.status === "Overdue").length;

        const totalFindings = FINDINGS.length;
        const openFindings = FINDINGS.filter(f => f.status !== "Closed").length;
        const criticalOpen = FINDINGS.filter(f => f.severity === "Critical" && f.status !== "Closed").length;

        const validScores = AUDITS.filter(a => a.score);
        const avgScore = Math.round(validScores.reduce((s, a) => s + a.score, 0) / validScores.length);

        // Filter states
        let sevFilter = "All";
        let statusFilter = "All";

        // Chart instances
        let trendChartInstance = null;
        let typeChartInstance = null;
        let fwChartInstance = null;
        let auditsTableInstance = null;
        let findingsTableInstance = null;

        // Build the UI
        function initUI() {
            // populate top KPIs
            if (overdue > 0) {
                document.getElementById('ov-overdue').style.display = 'flex';
                document.getElementById('ov-overdue-val').textContent = `${overdue} OVERDUE`;
            }

            document.getElementById('avg-score-percent').textContent = avgScore;
            document.getElementById('avg-score-detail').textContent = `${avgScore}/100`;

            document.getElementById('val-audits').textContent = totalAudits;
            document.getElementById('val-closed').textContent = closed;
            document.getElementById('sub-closed').textContent = `${Math.round(closed / totalAudits * 100)}% completion`;
            document.getElementById('val-inprog').textContent = inProgress;
            document.getElementById('val-overdue').textContent = overdue;
            document.getElementById('val-findings').textContent = openFindings;
            document.getElementById('sub-findings').textContent = `of ${totalFindings} total`;
            document.getElementById('val-crit').textContent = criticalOpen;

            renderCharts();
            renderSevBars();
            renderScoreList();
            initAuditsTable();
            initFindingsTable();
        }

        function renderCharts() {
            // 1. Trend Chart
            const tCtx = document.getElementById('trendChart').getContext('2d');
            trendChartInstance = new Chart(tCtx, {
                type: 'line',
                data: {
                    labels: TREND.map(t => t.month),
                    datasets: [
                        {
                            label: 'Opened',
                            data: TREND.map(t => t.opened),
                            borderColor: '#f97316',
                            backgroundColor: 'rgba(249, 115, 22, 0.15)',
                            borderWidth: 2,
                            pointRadius: 0,
                            fill: true,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Closed',
                            data: TREND.map(t => t.closed),
                            borderColor: '#22c55e',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            borderWidth: 2,
                            pointRadius: 0,
                            fill: true,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Score',
                            data: TREND.map(t => t.score),
                            borderColor: '#3b82f6',
                            borderWidth: 2,
                            pointBackgroundColor: '#3b82f6',
                            pointRadius: 4,
                            fill: false,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }
                    },
                    interaction: { mode: 'index', intersect: false },
                    scales: {
                        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                        y: { grid: { color: getGridColor() }, ticks: { font: { size: 10 } } },
                        y1: { position: 'right', min: 60, max: 100, grid: { display: false }, ticks: { font: { size: 10 } } }
                    }
                }
            });

            // 2. Type Pie
            const typeData = [
                { name: "Internal", value: AUDITS.filter(a => a.type === "Internal").length, color: "#3b82f6" },
                { name: "External", value: AUDITS.filter(a => a.type === "External").length, color: "#a855f7" },
                { name: "Regulatory", value: AUDITS.filter(a => a.type === "Regulatory").length, color: "#f59e0b" },
            ];
            const pCtx = document.getElementById('typePieChart').getContext('2d');
            typeChartInstance = new Chart(pCtx, {
                type: 'doughnut',
                data: {
                    labels: typeData.map(d => d.name),
                    datasets: [{
                        data: typeData.map(d => d.value),
                        backgroundColor: typeData.map(d => d.color),
                        borderWidth: 0
                    }]
                },
                options: { cutout: '70%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
            // Legend
            document.getElementById('typeLegend').innerHTML = typeData.map(d =>
                `<div class="col-12 d-flex align-items-center gap-2 mb-1">
          <span class="legend-dot" style="background:${d.color};"></span>
          <span style="font-size:11px; color:var(--bs-secondary-color);">${d.name}</span>
          <span class="ms-auto fw-bold" style="font-size:12px; color:${d.color};">${d.value}</span>
        </div>`
            ).join('');

            // 3. Framework Bar
            const fwCounts = {};
            FINDINGS.forEach(f => { fwCounts[f.framework] = (fwCounts[f.framework] || 0) + 1; });
            const fwBarData = Object.entries(fwCounts).map(([k, v]) => ({ name: k, value: v, color: FW_COLORS[k] || "#64748b" }));
            fwBarData.sort((a, b) => b.value - a.value);

            const bCtx = document.getElementById('fwBarChart').getContext('2d');
            fwChartInstance = new Chart(bCtx, {
                type: 'bar',
                data: {
                    labels: fwBarData.map(d => d.name),
                    datasets: [{
                        label: 'Findings',
                        data: fwBarData.map(d => d.value),
                        backgroundColor: fwBarData.map(d => d.color),
                        barPercentage: 0.6
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                        y: { grid: { color: getGridColor() }, ticks: { font: { size: 11 } } }
                    }
                }
            });
        }

        function renderSevBars() {
            const findingsBySev = ["Critical", "High", "Medium", "Low"].map(s => ({
                name: s, value: FINDINGS.filter(f => f.severity === s).length, color: SEV_META[s].color
            }));

            let html = '';
            findingsBySev.forEach(f => {
                const pct = (f.value / totalFindings) * 100;
                html += `
        <div class="mb-3">
          <div class="d-flex justify-content-between mb-1" style="font-size: 11px;">
            <span style="color:${f.color}; font-weight:600;">${f.name}</span>
            <span style="color:var(--bs-secondary-color); font-weight:600;">${f.value}</span>
          </div>
          <div class="aud-mini-bar-bg">
            <div class="aud-mini-bar-fill fade-width" style="width:${pct}%; background:${f.color};"></div>
          </div>
        </div>
        `;
            });
            document.getElementById('sevBarsContainer').innerHTML = html;
            document.getElementById('sevTotalOpen').textContent = openFindings;
        }

        function renderScoreList() {
            const sorted = [...AUDITS].filter(a => a.score).sort((a, b) => b.score - a.score);
            let html = '';
            sorted.forEach(a => {
                let scColor = a.score >= 85 ? "#22c55e" : a.score >= 70 ? "#f59e0b" : "#ef4444";
                html += `
        <div class="d-flex align-items-center gap-2">
          <div style="font-size: 11px; width: 24px; text-align: right; color: var(--bs-secondary-color); font-weight:600;">${a.score}</div>
          <div class="flex-grow-1 aud-mini-bar-bg mx-2" style="background:var(--bs-border-color);">
            <div class="aud-mini-bar-fill fade-width" style="width:${a.score}%; background:${scColor};"></div>
          </div>
          <div class="text-truncate" style="font-size: 10px; color: var(--bs-secondary-color); width: 80px;">${a.framework}</div>
          <div style="width: 70px; text-align:right;"><span class="aud-badge" style="background:${STATUS_META[a.status].bg}; color:${STATUS_META[a.status].color}">${a.status}</span></div>
        </div>
        `;
            });
            document.getElementById('scoresContainer').innerHTML = html;
        }

        function getProgBar(progress) {
            let color = progress === 100 ? "#22c55e" : "#3b82f6";
            return `<div class="d-flex align-items-center gap-2">
                <div class="aud-mini-bar-bg" style="width: 60px;">
                  <div class="aud-mini-bar-fill" style="width:${progress}%; background:${color};"></div>
                </div>
                <span style="font-size:9px; color:var(--bs-secondary-color); font-weight:600;">${progress}%</span>
              </div>`;
        }

        function initAuditsTable() {
            let html = '';
            AUDITS.forEach(a => {
                let scColor = !a.score ? 'var(--bs-secondary-color)' : a.score >= 85 ? "#22c55e" : a.score >= 70 ? "#f59e0b" : "#ef4444";
                let openCol = a.open > 0 ? `<span style="color:#f97316; font-weight:700;">${a.open}</span><span style="color:var(--bs-secondary-color);">/${a.findings}</span>` : `<span style="color:var(--bs-secondary-color);">0/${a.findings}</span>`;

                html += `
        <tr>
          <td style="color: #3b82f6; font-size:11px; font-weight:600;">${a.id}</td>
          <td style="color: var(--bs-body-color); font-weight:500;">
            <div class="text-truncate" style="max-width:220px;" title="${a.title}">${a.title}</div>
          </td>
          <td><span style="color:${FW_COLORS[a.framework] || '#888'}; font-size:10px; font-weight:700;">${a.framework}</span></td>
          <td style="color:var(--bs-secondary-color); font-size:11px;">${a.type}</td>
          <td><span class="aud-badge" style="background:${STATUS_META[a.status]?.bg}; color:${STATUS_META[a.status]?.color}">${a.status}</span></td>
          <td><span class="aud-badge" style="color:${SEV_META[a.priority]?.color}; border:1px solid ${SEV_META[a.priority]?.color}55;">${a.priority}</span></td>
          <td>${getProgBar(a.progress)}</td>
          <td class="text-center" style="color:${scColor}; font-weight:700;">${a.score || '—'}</td>
          <td class="text-center">${openCol}</td>
          <td style="color:var(--bs-secondary-color); font-size:11px;">${a.owner}</td>
        </tr>
        `;
            });
            document.getElementById('auditsTableBody').innerHTML = html;
            auditsTableInstance = $('#auditsTable').DataTable({
                "order": [],
                lengthChange: false,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: true,
                scrollX: true,
                info: false,
                dom: 't'
            });
        }

        function initFindingsTable() {
            findingsTableInstance = $('#findingsTable').DataTable({
                "order": [],
                lengthChange: false,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: true,
                scrollX: true,
                info: false,
                dom: 't'
            });
            renderFindingsTable();
        }

        function renderFindingsTable() {
            const filtered = FINDINGS.filter(f =>
                (sevFilter === "All" || f.severity === sevFilter) &&
                (statusFilter === "All" || f.status === statusFilter)
            );

            findingsTableInstance.clear();
            filtered.forEach(f => {
                let isOverdue = new Date(f.due) < new Date("2025-04-01"); // mockup static date logic
                let ageColor = f.age > 30 ? "#ef4444" : f.age > 14 ? "#f97316" : "var(--bs-secondary-color)";
                let statusBadge = f.status === "Open" ? `<span class="aud-badge" style="background:#ffedd5; color:#ea580c;">Open</span>` : `<span class="aud-badge" style="background:#dbeafe; color:#2563eb;">In Progress</span>`;

                findingsTableInstance.row.add([
                    `<span style="color:var(--bs-secondary-color); font-size:11px; font-weight:600;">${f.id}</span>`,
                    `<div class="text-truncate fw-medium" style="max-width:280px;" title="${f.title}">${f.title}</div>`,
                    `<div style="font-size:11px; font-weight:700; color:${SEV_META[f.severity].color};"><span class="me-1">●</span>${f.severity}</div>`,
                    statusBadge,
                    `<span style="color:${FW_COLORS[f.framework] || '#888'}; font-size:10px; font-weight:700;">${f.framework}</span>`,
                    `<span style="color:var(--bs-secondary-color); font-size:11px;">${f.owner}</span>`,
                    `<span style="color:${isOverdue ? '#ef4444' : 'var(--bs-secondary-color)'}; font-weight:${isOverdue ? '700' : '400'}; font-size:11px;">${f.due}</span>${isOverdue ? ' <span style="font-size:8px; color:#ef4444; font-weight:700; background:#fee2e2; padding:2px 4px; border-radius:3px;">OVERDUE</span>' : ''}`,
                    `<span style="color:${ageColor}; font-weight:${f.age > 30 ? '700' : '500'}; font-size:11px;">${f.age}d</span>`
                ]);
            });
            findingsTableInstance.draw();


        }

        // Tab Resize fix for ChartJS & DataTables
        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            if (e.target.id === "audits-tab") {
                auditsTableInstance.columns.adjust().draw();
            }
            if (e.target.id === "findings-tab") {
                findingsTableInstance.columns.adjust().draw();
            }
        });

        // Filtering logic
        $('.aud-filter-btn').on('click', function () {
            let type = $(this).data('type');
            let val = $(this).data('filter');

            $(`.aud-filter-btn[data-type="${type}"]`).removeClass('active');
            $(this).addClass('active');

            if (type === 'sev') sevFilter = val;
            if (type === 'status') statusFilter = val;

            renderFindingsTable();
        });

        document.addEventListener('DOMContentLoaded', function () {
            initUI();
        });