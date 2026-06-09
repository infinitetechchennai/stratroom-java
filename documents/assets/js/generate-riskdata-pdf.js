

let riskData = []; // Global variable to store the loaded data

// Function to load JSON data and generate PDF
function loadRiskDataAndGeneratePDF() {
    $.getJSON("assets/json/risk.json", function(response) {
        console.log("Risk Data Loaded Successfully", response);
        riskData = response;
        generateRiskPDF();
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Error loading Risk JSON: ", textStatus, error);
        alert("Failed to load risk data!");
    });
}

function getBase64ImageRisk(url) {
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
            resolve(null);
        }
        img.src = url;
    });
}

// ==========================================
// CONFIGURATION
// ==========================================

let RISK_LOGO_URL = "assets/images/logo.png";
let RISK_COVER_URL = "assets/images/initiative-bg.jpg";

function getRiskFullUrl(path) {
   return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + path;
}

const { jsPDF: jsPDFRisk } = window.jspdf;


async function generateRiskPDF() {
    let pdf = new jsPDFRisk();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = RISK_LOGO_URL;
    const coverImage = RISK_COVER_URL;
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    // Helper functions
    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        let bgColor = [120, 45, 90];
        let periodText = section?.period ? `Period: ${section.period}` : "Period: N/A";
        let titleText = section?.pageTitle ? `${section.pageTitle}` : "Risk Register";

        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight, { align: "right" });

        pdf.setTextColor(171, 80, 103);
        pdf.setFontSize(32);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });
        pdf.text("REPORT", pageWidth / 2, 70, { align: "center" });

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, pageWidth / 2, 85, { align: "center" });

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - 10, pageWidth, 10, 'F');

        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth/2, 0],[20, 20], [-90, 0] ], -20, pageHeight - 20, [1, 1], 'F');

        // Left side decorative shape
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
    }

    function header(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let title = (section?.pageTitle ? section.pageTitle + " Report" : "Risk Register");

        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Name: ${section?.userName || ""}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${section?.period || ""}`, marginRight, textStartY + 10, { align: "right" });
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
        pdf.text("Risk Register Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    // Add Cover Page
    if (riskData.length > 0) {
        addCoverPage(riskData[0]);
    }

    let reportStartPage = pdf.internal.getNumberOfPages();

    // Iterate through risk items
    for (let i = 0; i < riskData.length; i++) {
        let risk = riskData[i];

        let currentY = header(risk);

        // 1. Risk Details Table (Vertical key-value)
        let kpisStr = Array.isArray(risk.businessImpactKPI) ? risk.businessImpactKPI.join(", ") : "";
        let financialStr = Array.isArray(risk.financialImpact) ? risk.financialImpact.join(", ") : "";
        let assetStr = Array.isArray(risk.informationAsset) ? risk.informationAsset.join(", ") : "";

        let detailsBody = [
            ["Risk Title", risk.title || ""],
            ["Department", risk.department || ""],
            ["Related Parties", risk.relatedParties || ""],
            ["Risk Category", risk.riskCategory || ""],
            ["Inherent Risk Score", risk.inherentRiskScore || ""],
            ["Residual Risk Score", risk.residualRiskScore || ""],
            ["Risk Level", risk.riskLevel || ""],
            ["Risk Code", risk.riskCode || ""],
            ["Version", risk.version !== undefined ? String(risk.version) : ""],
            ["Date Raised", risk.dateRaised || ""],
            ["Next Assessment", risk.nextAssessment || ""],
            ["Date Completed", risk.dateCompleted || ""],
            ["Business Impact KPI", kpisStr],
            ["Financial Impact", financialStr],
            ["POS", risk.pos || ""],
            ["ISO", risk.iso || ""],
            ["Information Asset", assetStr],
            ["Others", risk.others || ""]
        ];

        pdf.autoTable({
            startY: currentY,
            head: [],
            body: detailsBody,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3, lineColor: [200, 200, 200] },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: [147, 69, 120], textColor: [255, 255, 255], cellWidth: 60 },
                1: { cellWidth: pageWidth - 60 - 20 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 2. Causes & Consequences
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("CAUSES & CONSEQUENCES", 10, currentY);
        currentY += 5;

        let causeRows = [];
        if (risk.causesAndConsequences && risk.causesAndConsequences.length > 0) {
            risk.causesAndConsequences.forEach(cause => {
                let firstCause = true;
                if (!cause.consequences || cause.consequences.length === 0) {
                    causeRows.push([cause.title, cause.badge, "", ""]);
                    return;
                }
                cause.consequences.forEach(con => {
                    causeRows.push([
                        firstCause ? cause.title : "",
                        firstCause ? cause.badge : "",
                        con.title,
                        con.badge
                    ]);
                    firstCause = false;
                });
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Cause", "Severity", "Consequence", "Severity"]],
            body: causeRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 65 },
                1: { cellWidth: 30 },
                2: { cellWidth: 65 },
                3: { cellWidth: 30 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 3. Controls
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("CONTROLS", 10, currentY);
        currentY += 5;

        let controlRows = [];
        if (risk.controls && risk.controls.length > 0) {
            risk.controls.forEach(ctrl => {
                let firstCtrl = true;
                if (!ctrl.items || ctrl.items.length === 0) {
                    controlRows.push([ctrl.title, ctrl.strategy, ctrl.progress + "%", ctrl.date, "", "", ""]);
                    return;
                }
                ctrl.items.forEach(item => {
                    controlRows.push([
                        firstCtrl ? ctrl.title : "",
                        firstCtrl ? ctrl.strategy : "",
                        firstCtrl ? ctrl.progress + "%" : "",
                        firstCtrl ? ctrl.date : "",
                        item.title,
                        item.status,
                        item.progress + "%"
                    ]);
                    firstCtrl = false;
                });
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Control", "Strategy", "Progress", "Date", "Sub-Control", "Status", "Progress"]],
            body: controlRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 49 },
                1: { cellWidth: 16, halign: "center" },
                2: { cellWidth: 16, halign: "center" },
                3: { cellWidth: 22 },
                4: { cellWidth: 49 },
                5: { cellWidth: 22 },
                6: { cellWidth: 16, halign: "center" }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 4. Risk Treatments
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("RISK TREATMENTS", 10, currentY);
        currentY += 5;

        let treatmentRows = [];
        if (risk.riskTreatments && risk.riskTreatments.length > 0) {
            risk.riskTreatments.forEach(t => {
                treatmentRows.push([
                    t.reducingImpact || "",
                    t.reducingPossibility || "",
                    t.strategy || "",
                    t.progress + "%",
                    t.date || ""
                ]);
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Reducing Impact", "Reducing Possibility", "Strategy", "Progress", "Date"]],
            body: treatmentRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 60 },
                1: { cellWidth: 60 },
                2: { cellWidth: 20},
                3: { cellWidth: 20, halign: "center" },
                4: { cellWidth: 30 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 5. Review & Monitoring
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("REVIEW & MONITORING", 10, currentY);
        currentY += 5;

        let monitorRows = [];
        if (risk.reviewMonitoring && risk.reviewMonitoring.length > 0) {
            monitorRows = risk.reviewMonitoring.map(m => [
                m.title,
                m.status,
                m.progress + "%",
                m.date
            ]);
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Title", "Status", "Progress", "Date"]],
            body: monitorRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 30},
                2: { cellWidth: 20, halign: "center" },
                3: { cellWidth: 30 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 6. Inherent Heat Map
        if (typeof populateInherentTable !== 'undefined' && populateInherentTable.length > 0) {
            if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("INHERENT HEAT MAP", 10, currentY);
            currentY += 5;

            let inherentRows = populateInherentTable.map(item => [
                item.impactName || "",
                item.category || "",
                item.type || "",
                String(item.impactValue || ""),
                String(item.likelihoodValue || ""),
                item.riskScore || ""
            ]);

            pdf.autoTable({
                startY: currentY,
                head: [["Impact Name", "Risk Impact Category", "Type", "Impact Value", "Likelihood Value", "Risk Score"]],
                body: inherentRows,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
                headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
                columnStyles: {
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 30 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 22 },
                    4: { cellWidth: 25 },
                    5: { cellWidth: 22 }
                },
                margin: { left: 10, right: 10, bottom: 25 }
            });

            currentY = pdf.lastAutoTable.finalY + 10;
        }

        // 7. Residual Heat Map
        if (typeof populateResidualTable !== 'undefined' && populateResidualTable.length > 0) {
            if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("RESIDUAL HEAT MAP", 10, currentY);
            currentY += 5;

            let residualRows = populateResidualTable.map(item => [
                item.impactName || "",
                item.category || "",
                item.type || "",
                String(item.impactValue || ""),
                String(item.likelihoodValue || ""),
                item.riskScore || ""
            ]);

            pdf.autoTable({
                startY: currentY,
                head: [["Impact Name", "Risk Impact Category", "Type", "Impact Value", "Likelihood Value", "Risk Score"]],
                body: residualRows,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
                headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
                columnStyles: {
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 30 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 22 },
                    4: { cellWidth: 25 },
                    5: { cellWidth: 22 }
                },
                margin: { left: 10, right: 10, bottom: 25 }
            });

            currentY = pdf.lastAutoTable.finalY + 10;
        }

        // 8. Comments
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(risk.commentsTitle || "COMMENTS", 10, currentY);
        currentY += 5;

        function getFlattenedReplies(replies) {
            let flat = [];
            if (!replies) return flat;
            replies.forEach(r => {
                flat.push(r);
                if (r.replies && r.replies.length > 0) {
                    flat = flat.concat(getFlattenedReplies(r.replies));
                }
            });
            return flat;
        }

        function formatCommentText(c) {
             let userLine = `${c.user?.name || "User"} (${c.time})`;
             let msgLine = `${c.text}`;
             return `${userLine}\n${msgLine}`;
        }

        let commentRows = [];
        if (risk.comments) {
            risk.comments.forEach(c => {
                let mainText = formatCommentText(c);
                let replies = getFlattenedReplies(c.replies);

                let rowCount = Math.max(1, replies.length);

                for (let j = 0; j < rowCount; j++) {
                    let col1 = (j === 0) ? mainText : "";
                    let col2 = (j < replies.length) ? formatCommentText(replies[j]) : "";
                    commentRows.push([col1, col2]);
                }
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Comments", "Replies"]],
            body: commentRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        // Add page break if not last item
        if (i < riskData.length - 1) {
            pdf.addPage();
        }
    }

    // Add page numbers
    const totalPages = pdf.internal.getNumberOfPages();
    let reportPageCount = totalPages - (reportStartPage - 1);

    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }

    pdf.save("risk_register_report.pdf");
}
