let data = []; // Global variable to store the loaded data

// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
    $.getJSON("assets/json/universal-incident-registry.json", function (response) {
        console.log("Data Loaded Successfully", response);
        data = response; // Assign data
        generatePDF();   // Call function after loading data
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Error loading JSON: ", textStatus, error);
        alert("Failed to load data!");
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

const BASE_URL = "http://127.0.0.1:5500/mg-portal-new/";

let LOGO_URL = "assets/images/logo.png";
let COVER_URL = "assets/images/initiative-bg.jpg";
let ICONS_PATH = "assets/images/icons/";

function getFullUrl(path) {
    return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + path;
}

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

    const BRAND_COLOR = [120, 45, 90];

    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = BRAND_COLOR;
        let periodText = section?.period ? `Period: ${section.period}` : "Period: All Time";
        let titleText = section?.pageTitle ? section.pageTitle : "INCIDENT REGISTRY";
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
        let title = section?.pageTitle ? section.pageTitle : "Incident Details";
        let name = section?.userName ? `${section.userName}` : "";
        let period = section?.period ? `${section.period}` : "";

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

    function footer(pageNumber, totalPages, color) {
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

        pdf.text("Incident Registry Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    // Extract report structure from wrapper if it exists
    let reportData = (data.length > 0 && data[0].incidents) ? data[0] : null;
    let incidentsList = reportData ? reportData.incidents : data;

    // Add Cover Page
    if (reportData || incidentsList.length > 0) {
        addCoverPage(reportData || incidentsList[0]);
    }

    let reportStartPage = pdf.internal.getNumberOfPages() + 1;
    let pageColors = {};

    // Add KPIs Page on the current blank page
    let kpiY = header({ pageTitle: "Incident Registry Dashboard", userName: reportData?.userName, period: reportData?.period });

    let kpiData = reportData && reportData.kpis ? reportData.kpis : [];

    // Fallback if KPIs are not explicitly provided
    if (!kpiData || kpiData.length === 0) {
        let totalLogged = incidentsList.length;
        let openIncidents = incidentsList.filter(i => i.status !== 'Closed').length;
        let criticalSev = incidentsList.filter(i => i.sev === 'Critical').length;
        let closed = incidentsList.filter(i => i.status === 'Closed').length;

        kpiData = [
            { label: "TOTAL LOGGED", value: totalLogged, sub: "all time incidents" },
            { label: "OPEN INCIDENTS", value: openIncidents, sub: "awaiting resolution" },
            { label: "CRITICAL SEVERITY", value: criticalSev, sub: "requires attention" },
            { label: "CLOSED", value: closed, sub: "resolved successfully" }
        ];
    }

    // Ensure valColor exists for backwards compatibility
    kpiData.forEach(k => {
        if (!k.valColor) {
            if (k.label.toUpperCase().includes('TOTAL')) k.valColor = [0, 0, 0];
            else if (k.label.toUpperCase().includes('OPEN')) k.valColor = [41, 128, 185];
            else if (k.label.toUpperCase().includes('CRITICAL')) k.valColor = [231, 76, 60];
            else if (k.label.toUpperCase().includes('CLOSED')) k.valColor = [39, 174, 96];
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
    pdf.text("INCIDENT REGISTRY SUMMARY", pageWidth / 2, kpiCenterY - 15, { align: "center" });

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



    // Iterate through incidents
    for (let i = 0; i < incidentsList.length; i++) {
        let initiative = incidentsList[i];

        pdf.addPage();
        const currentStartPage = pdf.internal.getNumberOfPages();
        let currentY = header(initiative);

        // 1. List View Header
        let boxY = currentY;
        let boxHeight = 28;

        let catColor = BRAND_COLOR;
        pdf.setFillColor(...catColor);
        pdf.roundedRect(10, boxY, pageWidth - 20, boxHeight, 3, 3, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        let catLabel = initiative.cat ? initiative.cat.toUpperCase() : "UNKNOWN";
        pdf.text(`${initiative.id} - ${catLabel}`, 15, boxY + 7);

        let sevText = initiative.sev || "Unknown";
        let sevBg = [220, 252, 231];
        let sevCol = [30, 110, 54];
        if (sevText === 'Critical') { sevBg = [254, 226, 226]; sevCol = [192, 57, 43]; }
        else if (sevText === 'High') { sevBg = [255, 237, 213]; sevCol = [156, 52, 0]; }
        else if (sevText === 'Medium') { sevBg = [254, 243, 199]; sevCol = [120, 53, 15]; }

        pdf.setFillColor(...sevBg);
        let badgeW = 20;
        let badgeH = 7;
        let badgeX = pageWidth - 15 - badgeW;
        let badgeY = boxY + 4;
        pdf.roundedRect(badgeX, badgeY, badgeW, badgeH, 3.5, 3.5, 'F');
        pdf.setTextColor(...sevCol);
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.text(sevText, badgeX + badgeW / 2, badgeY + 4.5, { align: 'center' });

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        let titleLines = pdf.splitTextToSize(initiative.title || "No Title", pageWidth - 30);
        pdf.text(titleLines, 15, boxY + 14);

        let sBadgeW = 32;
        let sBadgeH = 6;
        let sBadgeY = boxY + 19;
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(15, sBadgeY, sBadgeW, sBadgeH, 3, 3, 'F');
        pdf.setTextColor(...catColor);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(initiative.status || "New", 15 + sBadgeW / 2, sBadgeY + 4.1, { align: 'center' });

        pdf.setTextColor(230, 230, 230);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        const diffDays = Math.ceil(Math.abs(new Date() - new Date(initiative.idate)) / (1000 * 60 * 60 * 24));
        const openStatus = initiative.status === 'Closed' ? 'Closed' : diffDays + ' days open';
        pdf.text(`Reported ${fmtDateTime(initiative.rdate)}  -  ${openStatus}`, 15 + sBadgeW + 5, sBadgeY + 4.1);

        currentY = boxY + boxHeight + 12;

        // --- Table 1: Incident Summary Details ---
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2]);
        pdf.text("Incident Summary Details", 10, currentY);
        currentY += 4;

        const summaryBody = [
            ["Description", initiative.desc || 'No detailed description provided.'],
            ["Location", initiative.location || '-'],
            ["Witnesses", initiative.witnesses || 'None reported'],
            ["Root Cause", initiative.root || '-'],
            ["Impact Level", initiative.impact || '-'],
            ["Regulatory Flag", initiative.regflag || 'None'],
            ["Reported By", initiative.rby || '-'],
            ["Reported Date", fmtDate(initiative.rdate)],
            ["Assigned To", initiative.ato || '-'],
            ["Team Members", initiative.team?.join(', ') || 'None'],
            ["Escalation Path", initiative.esc || 'None']
        ];

        pdf.autoTable({
            startY: currentY,
            body: summaryBody,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3 },
            columnStyles: {
                0: { fillColor: [245, 245, 245], fontStyle: 'bold', cellWidth: 50 },
                1: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10 }
        });
        currentY = pdf.lastAutoTable.finalY + 12;

        // --- Table 2: Corrective Actions ---
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("Corrective Actions", 10, currentY);
        currentY += 4;

        let tasks = initiative.tasks || [];
        let correctiveRows = tasks.length > 0 ? tasks.map(t => [t.title || t.text || t]) : [["No corrective actions recorded."]];

        pdf.autoTable({
            startY: currentY,
            head: [["Action Items"]],
            body: correctiveRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 3 },
            headStyles: { fillColor: BRAND_COLOR, textColor: [255, 255, 255] },
            margin: { left: 10, right: 10 }
        });
        currentY = pdf.lastAutoTable.finalY + 10;

        // --- Table 3: Actions / Tasks ---
        if (currentY > pageHeight - 60) { pdf.addPage(); currentY = header(initiative); }
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("Actions / Tasks", 10, currentY);
        currentY += 4;

        let taskRows = tasks.length > 0 ? tasks.map(t => [
            t.title || t.text || t,
            t.status || "Pending",
            t.owner || initiative.ato || "-"
        ]) : [["No actions / tasks recorded.", "-", "-"]];

        pdf.autoTable({
            startY: currentY,
            head: [["Action / Task", "Status", "Owner"]],
            body: taskRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 3, lineHeight: 1.3 },
            headStyles: { fillColor: BRAND_COLOR, textColor: [255, 255, 255] },
            margin: { left: 10, right: 10, bottom: 20 }
        });
        currentY = pdf.lastAutoTable.finalY + 10;

        // --- Table 4: Comments ---
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("Comments", 10, currentY);
        currentY += 4;

        let comments = initiative.comments || [];
        let commentRows = comments.length > 0 ? comments.map(c => [
            `${c.user || "User"} (${c.time || ""})`,
            c.text || c
        ]) : [["-", "No comments recorded."]];

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
        currentY = pdf.lastAutoTable.finalY + 10;

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

    pdf.save("universal_incident_registry_report.pdf");
}
