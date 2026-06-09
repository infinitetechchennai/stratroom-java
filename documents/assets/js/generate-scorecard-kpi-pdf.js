

let scorecardKpiData = []; // Global variable to store the loaded data

// Function to load JSON data and generate PDF
function generateScorecardKpiPDF() {
    $.getJSON("assets/json/scorecard-kpi.json", function (response) {
        console.log("Data Loaded Successfully", response);
        scorecardKpiData = response; // Assign data
        console.log(scorecardKpiData);
        generatePDF();   // Call function after loading data
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Error loading JSON: ", textStatus, error);
        alert("Failed to load data!");
    });
}

// ==========================================
// CONFIGURATION
// ==========================================

// Define asset paths
let SCORECARD_LOGO_URL = "assets/images/logo.png"; // Relative path is safer provided base href is set or we are cautious
let SCORECARD_COVER_URL = "assets/images/initiative-bg.jpg";

// const { jsPDF } = window.jspdf; // Already loaded globally


async function generatePDF() {
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = SCORECARD_LOGO_URL;
    const coverImage = SCORECARD_COVER_URL;
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    // Helper functions from generatepdf.js
    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = [120, 45, 90];
        let periodText = section?.period ? `Period: ${section.period}` : "Period: N/A";
        let titleText = section?.pageTitle ? `${section.pageTitle} Report` : "N/A";
        let sbtitleText = section?.title ? `${section.title}` : "N/A";
        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);

        pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight, { align: "right" });


        pdf.setTextColor(171, 80, 103);
        pdf.setFontSize(32);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });

        // Reduce font size and color for subtitle, with linebreaks for long text
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(18);
        let splitSubtitle = pdf.splitTextToSize(sbtitleText.toUpperCase(), pageWidth - 40);
        pdf.text(splitSubtitle, pageWidth / 2, 70, { align: "center" });

        // Adjust top space for period text based on subtitle length
        let periodY = 70 + (splitSubtitle.length * 8) + 15;

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, pageWidth / 2, periodY, { align: "center" });


        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
        // Draw angled shape
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth / 2, 0], [20, cfh], [-90, 0]], -20, pageHeight - cfh, [1, 1], 'F');


        const shapeWidth = 20;
        const shapeHeight = pageHeight / 2; // 50% of the page height

        pdf.setFillColor(...bgColor);
        pdf.lines(
            [
                [15, 0],    // Move right (width of the shape)
                [0, pageHeight / 3],  // Move down (50% of page height)
                [-15, 15], // Move left and diagonally up for the slanted bottom
                [0, - (pageHeight / 2 - 15)]  // Move straight up to close the shape
            ],
            0,  // Start from X = 0 (left edge)
            0,  // Start from Y = top of the page
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
        let title = (section?.pageTitle ? section.pageTitle + " Report" : "KPI Report");
        let name = section?.userName ? `${section.userName}` : "";
        let period = section?.period ? `${section.period}` : "";

        // Use logoUrl global or passing? Using global LOGO_URL variable captured 
        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
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

        // Draw footer base rectangle
        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');

        // Draw angled shape
        pdf.setFillColor(...bgColor);
        pdf.lines([
            [pageWidth / 2, 0],   // Move right (top horizontal line)
            [20, footerHeight],  // Diagonal slant
            [-90, 0]   // Move left to close the shape
        ], -20, pageHeight - footerHeight, [1, 1], 'F');

        // White Text Styling
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");

        // Footer Title
        pdf.text(reportTitle || "KPI Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        // Page Number
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    // Add Cover Page (assuming for the first item or overall)
    if (scorecardKpiData.length > 0) {
        addCoverPage(scorecardKpiData[0]);
    }

    let reportStartPage = pdf.internal.getNumberOfPages();

    // Iterate through data elements (KPIs)
    for (let i = 0; i < scorecardKpiData.length; i++) {
        let item = scorecardKpiData[i];

        let currentY = header(item);

        // 1. KPI Details & Configuration Table
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

        // 3. Data Table
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

        // 3. Strategic Initiatives
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.strategicInitiativesTitle || "Influencing Strategic Initiatives", 10, currentY);
        currentY += 5;

        let initiativeRows = [];
        let numInitiatives = 0;

        if (item.strategicInitiatives && Array.isArray(item.strategicInitiatives)) {
            numInitiatives = item.strategicInitiatives.length;
            item.strategicInitiatives.forEach((initiative, idx) => {
                let row = [];
                // Only first row spans down
                if (idx === 0) {
                    row.push({
                        content: "Strategic Initiatives",
                        rowSpan: numInitiatives + 1, // +1 for the header row equivalent
                        styles: { valign: 'middle', halign: 'center', fillColor: [147, 69, 120], textColor: [255, 255, 255], fontStyle: 'bold' }
                    });
                }
                row.push(initiative.initiativesName || initiative.strategicInitiative || initiative.initiativeName || "");
                row.push(initiative.progress !== undefined ? String(initiative.progress) : "");
                initiativeRows.push(row);
            });
        }

        // We'll manually push a header row above our initiative rows if there are any
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

            // Now append the actual data rows without the first column
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

        // 4. Success Criteria
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

        // Add page break if not last item
        if (i < scorecardKpiData.length - 1) {
            pdf.addPage();
        }

    }

    // Add page numbers
    const totalPages = pdf.internal.getNumberOfPages();
    let reportPageCount = totalPages - (reportStartPage - 1);

    // Cover page is page 1, but maybe we want page numbers starting after cover?
    // scorecard PDF (reference) logic:
    // for (let i = reportStartPage; i <= pdf.internal.getNumberOfPages(); i++) {
    //      footer(i - (reportStartPage - 1), totalReportPages);
    // }
    // Let's emulate that. 
    // "reportStartPage" is set after cover page. 
    // Wait, cover page adds a page at the end of its function logic in generatepdf.js (line 175: pdf.addPage()).
    // So reportStartPage will be 2.

    // Determine global title for footer from the first element
    let globalFooterTitle = (scorecardKpiData.length > 0 && scorecardKpiData[0].pageTitle)
        ? scorecardKpiData[0].pageTitle + " Report"
        : "Performance Report";

    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount, globalFooterTitle);
    }

    pdf.save("scorecard_kpi_report.pdf");
}
