import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ICONS_PATH = "/stratroom/images/icons/";
const LOGO_URL = "/stratroom/images/logo.png";
const COVER_URL = "/stratroom/images/scorecard-bg.jpg";

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
        img.onerror = function() {
            // fallback if image fails to load
            resolve("");
        };
        img.src = url;
    });
}

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

export async function generateScorecardPDF(scorecardData) {
    await preloadImages();
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = await getBase64Image(LOGO_URL);
    const coverImage = await getBase64Image(COVER_URL);
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = [120, 45, 90];
        let periodText = section?.period ? `Period: ${section.period}` : "Period: N/A";
        let titleText = section?.pageTitle ? `${section.pageTitle}` : "N/A";
        
        if (coverImage) pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        if (logoUrl) pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight, { align: "right" });

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
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth/2, 0],[20, cfh],  [-90, 0] ], -20, pageHeight - cfh, [1, 1], 'F');

        pdf.setFillColor(...bgColor);
        pdf.lines(
            [
                [15, 0],   
                [0, pageHeight / 3],  
                [-15, 15], 
                [0, - (pageHeight / 2 - 15)]  
            ],
            0, 0, [1, 1], 'F'
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
        let title = (section?.pageTitle ? section.pageTitle + " Report" : "Performance Report");
        let score = section?.overallScore ? `${section.overallScore}` : "";
        let name = section?.userName ? `${section.userName}` : "";
        let period = section?.period ? `${section.period}` : "";
        
        if (logoUrl) pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Name: ${name} | Score: ${score}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });           
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }

    function footer(pageNumber, totalPages) {
        let footerHeight = 20;
        let footerHeightsm = 10;
        let bgColor = [120, 45, 90]; 

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');

        pdf.setFillColor(...bgColor);
        pdf.lines([
            [pageWidth/2, 0],   
            [20, footerHeight],  
            [-90, 0]   
        ], -20, pageHeight - footerHeight, [1, 1], 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Corporate Performance Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4,{ align: "right" });
    }

    function processTableData(items, level = 0) {
        let tableRows = [];
        items.forEach(item => {
            tableRows.push([
                item.flag?.[0]?.status || "",
                "\u00A0\u00A0".repeat(level) + item.id,
                "\u00A0\u00A0".repeat(level) + item.name,
                item.period || "",
                item.score || "",
                item.trend?.[0]?.status || "",
                item.baseline || "",
                item.actual || "",
                item.target || "",
                item.risk?.[0]?.status || ""
            ]);

            if (item.children?.length) {
                tableRows = tableRows.concat(processTableData(item.children, level + 1));
            }
        });
        return tableRows;
    }

    if (scorecardData && scorecardData[0]) {
        addCoverPage(scorecardData[0]);
        let reportStartPage = pdf.internal.getNumberOfPages(); 

        scorecardData.forEach(section => {
            let y = header(section);
            if (section.tab) {
                section.tab.forEach(tab => {
                    if (!tab.tabledata) return;

                    if (y + (tab.tabledata.length * 6 + 16) > pageHeight - 40) {
                        pdf.addPage();
                        y = header(section);
                    }
                    pdf.setFontSize(12).setFont("helvetica", "bold");
                    pdf.text(`${tab.title} (Total Score: ${tab.totalScore})`, 10, y);
                    y += 5;

                    pdf.autoTable({
                        startY: y,
                        head: [["Flag", "ID", "Name", "Period", "Score", "Trend", "Baseline", "Actual", "Target", "Risk"]],
                        body: processTableData(tab.tabledata),
                        theme: 'grid',
                        styles: { fontSize: 10, cellPadding: 2, lineColor: [201, 201, 201] },
                        headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
                        margin: { top: 8, left: 10, right: 10 },
                        pageBreak: 'avoid',
                        didDrawCell: function (data) {
                            let imgSize = 4;
                            if (data.section === "body") {
                                if (data.column.index === 0) {
                                    let flagStatus = data.row.raw[0]?.toLowerCase();
                                    if (flagImages[flagStatus]) {
                                        pdf.setFillColor(255, 255, 255);
                                        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
                                        pdf.setDrawColor(201,201,201); 
                                        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                                        pdf.addImage(flagImages[flagStatus], "PNG", data.cell.x + (data.cell.width - imgSize) / 2, data.cell.y + (data.cell.height - imgSize) / 2, imgSize, imgSize);
                                    }
                                }
                                if (data.column.index === 5) {
                                    let trendStatus = data.row.raw[5]?.toLowerCase();
                                    if (trendImages[trendStatus]) {
                                        pdf.setFillColor(255, 255, 255);
                                        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
                                        pdf.setDrawColor(201,201,201); 
                                        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                                        pdf.addImage(trendImages[trendStatus], "PNG", data.cell.x + (data.cell.width - imgSize) / 2, data.cell.y + (data.cell.height - imgSize) / 2, imgSize, imgSize);
                                    }
                                }
                                if (data.column.index === 9) {
                                    let riskStatus = data.row.raw[9]?.toLowerCase();
                                    if (riskImages[riskStatus]) {
                                        pdf.setFillColor(255, 255, 255);
                                        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
                                        pdf.setDrawColor(201,201,201); 
                                        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                                        pdf.addImage(riskImages[riskStatus], "PNG", data.cell.x + (data.cell.width - imgSize) / 2, data.cell.y + (data.cell.height - imgSize) / 2, imgSize, imgSize);
                                    }
                                }
                            }
                        }
                    });
                    y = pdf.lastAutoTable.finalY + 10;
                });
            }
        });

        let totalReportPages = pdf.internal.getNumberOfPages() - (reportStartPage - 1);
        for (let i = reportStartPage; i <= pdf.internal.getNumberOfPages(); i++) {
            pdf.setPage(i);
            footer(i - (reportStartPage - 1), totalReportPages);
        }
    }

    pdf.save("report.pdf");
}

export async function generateScorecardKpiPDF(scorecardKpiData) {
    // We can fetch data inline if not passed, but passing is better for React
    if (!scorecardKpiData) {
        try {
            const res = await fetch("/stratroom/json/scorecard-kpi.json");
            scorecardKpiData = await res.json();
        } catch (e) {
            console.error("Failed to fetch kpi data", e);
            return;
        }
    }

    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    
    const logoUrl = await getBase64Image(LOGO_URL);
    const coverImage = await getBase64Image("/stratroom/images/initiative-bg.jpg");
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = [120, 45, 90];
        let periodText = section?.period ? `Period: ${section.period}` : "Period: N/A";
        let titleText = section?.pageTitle ? `${section.pageTitle} Report` : "N/A";
        let sbtitleText = section?.title ? `${section.title}` : "N/A";
        
        if (coverImage) pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        if (logoUrl) pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight, { align: "right" });

        pdf.setTextColor(171, 80, 103);
        pdf.setFontSize(32);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });

        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(18);
        let splitSubtitle = pdf.splitTextToSize(sbtitleText.toUpperCase(), pageWidth - 40);
        pdf.text(splitSubtitle, pageWidth / 2, 70, { align: "center" });

        let periodY = 70 + (splitSubtitle.length * 8) + 15;

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, pageWidth / 2, periodY, { align: "center" });

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth / 2, 0], [20, cfh], [-90, 0]], -20, pageHeight - cfh, [1, 1], 'F');

        pdf.setFillColor(...bgColor);
        pdf.lines(
            [
                [15, 0],    
                [0, pageHeight / 3],  
                [-15, 15], 
                [0, - (pageHeight / 2 - 15)]  
            ],
            0, 0, [1, 1], 'F'
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
        let title = (section?.pageTitle ? section.pageTitle + " Report" : "KPI Report");
        let name = section?.userName ? `${section.userName}` : "";
        let period = section?.period ? `${section.period}` : "";

        if (logoUrl) pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }

    function footer(pageNumber, totalPages, reportTitle) {
        let footerHeight = 20;
        let footerHeightsm = 10;
        let bgColor = [120, 45, 90];

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
        pdf.text(reportTitle || "KPI Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    if (scorecardKpiData.length > 0) {
        addCoverPage(scorecardKpiData[0]);
    }

    let reportStartPage = pdf.internal.getNumberOfPages();

    for (let i = 0; i < scorecardKpiData.length; i++) {
        let item = scorecardKpiData[i];
        let currentY = header(item);

        let detailsRows = [];
        if (item.kpiDetails) {
            detailsRows.push(
                ["KPI Name", item.kpiDetails.kpiName || ""],
                ["Aligned Perspective", item.kpiDetails.alignedPerspective || ""],
                ["Alignment Objectives", item.kpiDetails.alignmentObjectives || ""],
                ["Owner", item.kpiDetails.owner || ""],
                ["Current Actual", item.kpiDetails.currentActual || ""],
                ["Target", item.kpiDetails.target || ""],
                ["Trend", item.kpiDetails.trend || ""]
            );
        }

        if (item.configuration) {
            detailsRows.push(
                ["Reporting Frequency", item.configuration.reportingFrequency || ""],
                ["Measurement Frequency", item.configuration.measurementFrequency || ""],
                ["KPI Type", item.configuration.kpiType || ""],
                ["Polarity", item.configuration.polarity || ""],
                ["Performance", item.configuration.performance || ""],
                ["Contribution", item.configuration.contribution || ""],
                ["Weight Percent", item.configuration.weightPercent || ""],
                ["Sub Weight", item.configuration.subWeight || ""]
            );
        }

        pdf.autoTable({
            startY: currentY,
            head: [],
            body: detailsRows,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3, lineColor: [200, 200, 200] },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: [147, 69, 120], textColor: [255, 255, 255], cellWidth: 50 },
                1: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.dataTableTitle || "Data Table", 10, currentY);
        currentY += 5;

        let tableRows = [];
        if (item.dataTable && Array.isArray(item.dataTable)) {
            tableRows = item.dataTable.map(row => [
                row.period || "",
                row.actual !== undefined ? row.actual : "",
                row.target !== undefined ? row.target : "",
                row.gap !== undefined ? row.gap : "",
                row.ytd !== undefined ? row.ytd : ""
            ]);
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Period", "Actual", "Target", "Gap", "YTD"]],
            body: tableRows,
            theme: 'grid',
            styles: { halign: 'center', fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.strategicInitiativesTitle || "Influencing Strategic Initiatives", 10, currentY);
        currentY += 5;

        let initiativeRows = [];
        let numInitiatives = 0;

        if (item.strategicInitiatives && Array.isArray(item.strategicInitiatives)) {
            numInitiatives = item.strategicInitiatives.length;
        }

        let finalInitiativeBody = [];
        if (numInitiatives > 0) {
            finalInitiativeBody.push([
                {
                    content: "Strategic Initiatives",
                    rowSpan: numInitiatives + 1,
                    styles: { valign: 'middle', halign: 'center', fillColor: [147, 69, 120], textColor: [255, 255, 255], fontStyle: 'bold' }
                },
                { content: "Initiatives name", styles: { fillColor: [147, 69, 120], textColor: [255, 255, 255], fontStyle: 'bold' } },
                { content: "progress", styles: { halign: 'center', fillColor: [147, 69, 120], textColor: [255, 255, 255], fontStyle: 'bold' } }
            ]);

            item.strategicInitiatives.forEach((initiative) => {
                finalInitiativeBody.push([
                    { content: initiative.initiativesName || initiative.strategicInitiative || initiative.initiativeName || "", styles: { fillColor: [255, 255, 255], textColor: [51, 51, 51], fontStyle: 'normal' } },
                    { content: initiative.progress !== undefined ? String(initiative.progress) : "", styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [51, 51, 51], fontStyle: 'normal' } }
                ]);
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [],
            body: finalInitiativeBody,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3, lineHeight: 1.8, overflow: 'linebreak', lineColor: [200, 200, 200] },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 25 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.successCriteriaTitle || "Success Criteria", 10, currentY);
        currentY += 5;

        let successCriteriaRows = [];
        if (item.successCriteria) {
            successCriteriaRows = [
                ["Description", item.successCriteria.description || ""],
                ["Risks", item.successCriteria.risks !== undefined ? String(item.successCriteria.risks) : ""],
                ["Support Needed", item.successCriteria.supportNeeded || ""],
                ["Remarks", item.successCriteria.remarks || ""]
            ];
        }

        pdf.autoTable({
            startY: currentY,
            head: [],
            body: successCriteriaRows,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3, lineColor: [200, 200, 200] },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: [147, 69, 120], textColor: [255, 255, 255], cellWidth: 50 },
                1: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        if (i < scorecardKpiData.length - 1) {
            pdf.addPage();
        }
    }

    const totalPages = pdf.internal.getNumberOfPages();
    let reportPageCount = totalPages - (reportStartPage - 1);

    let globalFooterTitle = (scorecardKpiData.length > 0 && scorecardKpiData[0].pageTitle)
        ? scorecardKpiData[0].pageTitle + " Report"
        : "Performance Report";

    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount, globalFooterTitle);
    }

    pdf.save("scorecard_kpi_report.pdf");
}
