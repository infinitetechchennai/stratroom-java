let data = []; // Global variable to store the loaded data

// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
    $.getJSON("assets/json/audit-management-new.json", function (response) {
        console.log("Audit Data Loaded Successfully", response);
        data = response; // Assign data
        generatePDF();   // Call function after loading data
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Error loading JSON: ", textStatus, error);
        alert("Failed to load audit data!");
    });
}

function fmtDateTime(dStr) {
    if (!dStr) return '-';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(d.getDate()).padStart(2, '0');
    let hrs = d.getHours();
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12 || 12;
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${months[d.getMonth()]} ${day} ${d.getFullYear()} ${hrs}:${mins} ${ampm}`;
}

function fmtDate(dStr) {
    if (!dStr) return '-';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(d.getDate()).padStart(2, '0');
    return `${months[d.getMonth()]} ${day} ${d.getFullYear()}`;
}

function getBase64Image(url) {
    return new Promise((resolve) => {
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = function () {
            resolve(null);
        }
        img.src = url;
    });
}

// ==========================================
// CONFIGURATION
// ==========================================

let LOGO_URL = "assets/images/logo.png";
let COVER_URL = "assets/images/initiative-bg.jpg";
let ICONS_PATH = "assets/images/icons/";

const riskImageUrls = {
    green: ICONS_PATH + "buzzer-green-i.svg",
    yellow: ICONS_PATH + "buzzer-yellow-i.svg",
    red: ICONS_PATH + "buzzer-red-i.svg"
};
const flagImageUrls = {
    green: ICONS_PATH + "flag-green-i.svg",
    yellow: ICONS_PATH + "flag-yellow-i.svg",
    red: ICONS_PATH + "flag-red-i.svg"
};
const trendImageUrls = {
    up: ICONS_PATH + "up-i.png",
    down: ICONS_PATH + "down-i.png",
};

const riskImages = {};
const flagImages = {};
const trendImages = {};

async function preloadImages() {
    await Promise.all(
        Object.entries(riskImageUrls).map(async ([key, url]) => {
            riskImages[key] = await getBase64Image(url);
        })
    );
    await Promise.all(
        Object.entries(flagImageUrls).map(async ([key, url]) => {
            flagImages[key] = await getBase64Image(url);
        })
    );
    await Promise.all(
        Object.entries(trendImageUrls).map(async ([key, url]) => {
            trendImages[key] = await getBase64Image(url);
        })
    );
}

const { jsPDF } = window.jspdf;

async function generatePDF() {
    await preloadImages();
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = LOGO_URL;
    const coverImage = COVER_URL;
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    const BRAND_COLOR = [120, 45, 90]; // Deep Purple

    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = BRAND_COLOR;
        let periodText = section?.period ? `Period: ${section.period}` : "Period: All Time";
        let titleText = section?.pageTitle ? section.pageTitle : "AUDIT MANAGEMENT";
        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);

        pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight, { align: "right" });

        pdf.setTextColor(171, 80, 103);
        pdf.setFontSize(32);
        pdf.setFont("helvetica", "bold");

        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });
        pdf.text("Report".toUpperCase(), pageWidth / 2, 70, { align: "center" });

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, pageWidth / 2, 85, { align: "center" });

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
        // Draw angled shape
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth / 2, 0], [20, cfh], [-90, 0]], -20, pageHeight - cfh, [1, 1], 'F');

        const shapeWidth = 20;
        const shapeHeight = pageHeight / 2;

        pdf.setFillColor(...bgColor);
        pdf.lines(
            [
                [15, 0],
                [0, pageHeight / 3],
                [-15, 15],
                [0, - (pageHeight / 2 - 15)]
            ],
            0,
            0,
            [1, 1],
            'F'
        );

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Generated Date:  ${submissionDate} `, 10, pageHeight - 12);
        pdf.text(periodText, 10, pageHeight - 6);

        pdf.addPage();
    };

    function header(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let title = section?.title ? `Audit: ${section.id}` : "Audit Details";
        let name = reportData?.userName ? `${reportData.userName}` : "";
        let period = reportData?.period ? `${reportData.period}` : "";

        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        if (name) pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
        if (period) pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }

    function footer(pageNumber, totalPages) {
        let footerHeight = 20;
        let footerHeightsm = 10;
        let bgColor = BRAND_COLOR;

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');

        pdf.setFillColor(...bgColor);
        pdf.lines([
            [pageWidth / 2, 0],
            [20, footerHeight],
            [-90, 0]
        ], -20, pageHeight - footerHeight, [1, 1], 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");

        pdf.text("Audit Management Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    // Extract report structure from wrapper if it exists
    let reportData = (data.length > 0 && data[0].audits) ? data[0] : null;
    let auditsList = reportData ? reportData.audits : data;

    // Add Cover Page
    if (reportData || auditsList.length > 0) {
        addCoverPage(reportData || auditsList[0]);
    }

    let reportStartPage = pdf.internal.getNumberOfPages() + 1;
    let pageColors = {};

    // Add KPIs Page on the current blank page
    let kpiY = header({ title: "Audit Summary Dashboard" });

    let kpiData = reportData && reportData.kpis ? reportData.kpis : [];

    // Fallback if KPIs are not explicitly provided
    if (!kpiData || kpiData.length === 0) {
        let totalAudits = auditsList.length;
        let inProgress = auditsList.filter(i => i.status === 'In Progress').length;
        let planned = auditsList.filter(i => i.status === 'Planned').length;
        let underReview = auditsList.filter(i => i.status === 'Under Review').length;

        kpiData = [
            { label: "TOTAL AUDITS", value: totalAudits, sub: "all registered audits" },
            { label: "IN PROGRESS", value: inProgress, sub: "currently active" },
            { label: "PLANNED", value: planned, sub: "yet to commence" },
            { label: "UNDER REVIEW", value: underReview, sub: "awaiting final signoff" }
        ];
    }

    // Ensure valColor exists for backwards compatibility
    kpiData.forEach(k => {
        if (!k.valColor) {
            if (k.label.toUpperCase().includes('TOTAL')) k.valColor = [0, 0, 0];
            else if (k.label.toUpperCase().includes('PROGRESS')) k.valColor = [41, 128, 185];
            else if (k.label.toUpperCase().includes('PLANNED')) k.valColor = [231, 76, 60];
            else if (k.label.toUpperCase().includes('REVIEW')) k.valColor = [39, 174, 96];
            else k.valColor = [0, 0, 0];
        }
    });

    let cardW = 80;
    let cardH = 30;
    let gap = 5;
    let totalKpiWidth = (cardW * 2) + gap;
    let totalKpiHeight = (cardH * 2) + gap;

    let startX = (pageWidth - totalKpiWidth) / 2;
    let kpiCenterY = (pageHeight - totalKpiHeight) / 2;

    // Common Title for KPIs
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(120, 45, 90);
    pdf.text("AUDIT SYSTEM SUMMARY", pageWidth / 2, kpiCenterY - 15, { align: "center" });

    for (let k = 0; k < 4; k++) {
        let row = Math.floor(k / 2);
        let col = k % 2;
        let x = startX + col * (cardW + gap);
        let y = kpiCenterY + row * (cardH + gap);

        pdf.setDrawColor(220, 220, 220);
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(x, y, cardW, cardH, 3, 3, 'FD');

        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.text(kpiData[k].label, x + 5, y + 8);

        pdf.setTextColor(...kpiData[k].valColor);
        pdf.setFontSize(18);
        pdf.setFont("helvetica", "bold");
        pdf.text(kpiData[k].value.toString(), x + 5, y + 18);

        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(kpiData[k].sub, x + 5, y + 25);
    }

    // Iterate through audits
    for (let i = 0; i < auditsList.length; i++) {
        let audit = auditsList[i];

        pdf.addPage();
        const currentStartPage = pdf.internal.getNumberOfPages();
        let currentY = header(audit);

        // 1. Audit Header Card
        let boxY = currentY;
        let boxHeight = 28;

        let catColor = BRAND_COLOR;
        pdf.setFillColor(...catColor);
        pdf.roundedRect(10, boxY, pageWidth - 20, boxHeight, 3, 3, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        let catLabel = audit.cat ? audit.cat.toUpperCase() : "UNKNOWN";
        pdf.text(`${audit.id} - ${catLabel}`, 15, boxY + 7);

        let riskText = audit.risk || "Medium";
        let riskBg = [254, 243, 199];
        let riskCol = [120, 53, 15];
        if (riskText === 'High') { riskBg = [254, 226, 226]; riskCol = [192, 57, 43]; }
        else if (riskText === 'Low') { riskBg = [220, 252, 231]; riskCol = [30, 110, 54]; }

        pdf.setFillColor(...riskBg);
        let badgeW = 20;
        let badgeH = 7;
        let badgeX = pageWidth - 15 - badgeW;
        let badgeY = boxY + 4;
        pdf.roundedRect(badgeX, badgeY, badgeW, badgeH, 3.5, 3.5, 'F');
        pdf.setTextColor(...riskCol);
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${riskText} Risk`, badgeX + badgeW / 2, badgeY + 4.5, { align: 'center' });

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        let titleLines = pdf.splitTextToSize(audit.title || "No Title", pageWidth - 30);
        pdf.text(titleLines, 15, boxY + 14);

        let sBadgeW = 32;
        let sBadgeH = 6;
        let sBadgeY = boxY + 19;
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(15, sBadgeY, sBadgeW, sBadgeH, 3, 3, 'F');
        pdf.setTextColor(...catColor);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(audit.status || "Planned", 15 + sBadgeW / 2, sBadgeY + 4.1, { align: 'center' });

        pdf.setTextColor(230, 230, 230);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.text(`Audit Period: ${audit.period}  |  Completion: ${audit.progress || '0%'}`, 15 + sBadgeW + 5, sBadgeY + 4.1);

        currentY = boxY + boxHeight + 12;

        // --- Table 1: Audit Summary Details ---
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2]);
        pdf.text("Audit Summary Details", 10, currentY);
        currentY += 4;

        const summaryBody = [
            ["Description", audit.desc || 'No detailed description provided.'],
            ["Auditors", audit.auditors || '-'],
            ["Department / BU", audit.dept || '-'],
            ["Audit Period", audit.period || '-'],
            ["Start Date", fmtDate(audit.sdate)],
            ["End Date", fmtDate(audit.edate)],
            ["Next Review Date", fmtDate(audit.ndate)],
            ["Current Status", audit.status || '-'],
            ["Risk Rating", audit.risk || '-'],
            ["Progress Bar", audit.progress || '-'],
            ["Scope of Audit", audit.scope || 'No specific scope defined.'],
            ["Criteria / Standards", audit.criteria || 'Standard corporate policies.'],
            ["Updated By", audit.updated_by || '-']
        ];

        pdf.autoTable({
            startY: currentY,
            body: summaryBody,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3, halign: 'left' },
            columnStyles: {
                0: { fillColor: [245, 245, 245], fontStyle: 'bold', cellWidth: 50 },
                1: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10, bottom: 20 }
        });
        currentY = pdf.lastAutoTable.finalY + 12;

        // --- Table 3: Findings Details ---
        let findings = audit.findings || [];
        if (findings.length > 0) {
            if (currentY > pageHeight - 50) { pdf.addPage(); currentY = header(audit); }
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2]);
            pdf.text("Audit Findings", 10, currentY);
            currentY += 4;

            for (let fIdx = 0; fIdx < findings.length; fIdx++) {
                let f = findings[fIdx];
                if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(audit); }

                const findingBody = [
                    ["Finding ID", f.id],
                    ["Type", f.type || '-'],
                    ["Severity", f.severity || '-'],
                    ["Title", f.title || '-'],
                    ["Description", f.desc || '-'],
                    ["Owner", f.owner || '-'],
                    ["Status", f.status || '-']
                ];

                pdf.autoTable({
                    startY: currentY,
                    body: findingBody,
                    theme: 'grid',
                    styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3, halign: 'left' },
                    columnStyles: {
                        0: { fillColor: [245, 245, 245], fontStyle: 'bold', cellWidth: 50 },
                        1: { cellWidth: 'auto' }
                    },
                    margin: { left: 10, right: 10, bottom: 20 }
                });
                currentY = pdf.lastAutoTable.finalY + 6;
            }
            currentY += 6;
        }

        // --- Table 4: Linked Issues Details ---
        let issues = audit.issues || [];
        if (issues.length > 0) {
            if (currentY > pageHeight - 50) { pdf.addPage(); currentY = header(audit); }
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2]);
            pdf.text("Linked Issues", 10, currentY);
            currentY += 4;

            for (let issIdx = 0; issIdx < issues.length; issIdx++) {
                let iss = issues[issIdx];
                if (currentY > pageHeight - 45) { pdf.addPage(); currentY = header(audit); }

                const issueBody = [
                    ["Issue ID", iss.id],
                    ["Title", iss.title || '-'],
                    ["Cause / Root Cause", `${iss.cause || '-'} / ${iss.root || '-'}`],
                    ["Severity", iss.severity || '-'],
                    ["Status", iss.status || '-'],
                    ["Owner", iss.owner || '-'],
                    ["Due Date", fmtDate(iss.due)],
                    ["Recommendation", iss.recommendation || '-'],
                    ["Response", iss.response || '-']
                ];

                pdf.autoTable({
                    startY: currentY,
                    body: issueBody,
                    theme: 'grid',
                    styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3, halign: 'left' },
                    columnStyles: {
                        0: { fillColor: [245, 245, 245], fontStyle: 'bold', cellWidth: 50 },
                        1: { cellWidth: 'auto' }
                    },
                    margin: { left: 10, right: 10, bottom: 20 }
                });
                currentY = pdf.lastAutoTable.finalY + 6;
            }
            currentY += 6;
        }

        // --- Table 5: Corrective Actions / Tasks ---
        let tasks = audit.tasks || [];
        if (tasks.length > 0) {
            if (currentY > pageHeight - 50) { pdf.addPage(); currentY = header(audit); }
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text("Actions / Tasks", 10, currentY);
            currentY += 4;

            let taskRows = tasks.map(t => [
                t.title,
                t.status || "Pending",
                t.owner || "-"
            ]);

            pdf.autoTable({
                startY: currentY,
                head: [["Action / Task Item", "Status", "Owner"]],
                body: taskRows,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3 },
                headStyles: { fillColor: BRAND_COLOR, textColor: [255, 255, 255] },
                margin: { left: 10, right: 10, bottom: 20 }
            });
            currentY = pdf.lastAutoTable.finalY + 12;
        }

        // --- Table 6: Comments ---
        let comments = audit.comments || [];
        if (comments.length > 0) {
            if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(audit); }
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.text("Comments History", 10, currentY);
            currentY += 4;

            let commentRows = comments.map(c => [
                `${c.user || "User"}\n(${c.time || ""})`,
                c.text || c
            ]);

            pdf.autoTable({
                startY: currentY,
                head: [["User / Time", "Comment"]],
                body: commentRows,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3 },
                headStyles: { fillColor: BRAND_COLOR, textColor: [255, 255, 255] },
                columnStyles: {
                    0: { cellWidth: 50 },
                    1: { cellWidth: 'auto' }
                },
                margin: { left: 10, right: 10, bottom: 20 }
            });
            currentY = pdf.lastAutoTable.finalY + 12;
        }

        const currentEndPage = pdf.internal.getNumberOfPages();
        for (let p = currentStartPage; p <= currentEndPage; p++) {
            pageColors[p] = catColor;
        }
    }

    const totalPages = pdf.internal.getNumberOfPages();
    let reportPageCount = totalPages - (reportStartPage - 1);

    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }

    pdf.save("audit_management_report.pdf");
}
