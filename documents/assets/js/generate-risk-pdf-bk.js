let data = [];

function loadDataAndGeneratePDF() {
    $.getJSON("assets/json/risk.json", function(response) {
        console.log("Risk Data Loaded Successfully", response);
        data = response;
        generatePDF();
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Error loading JSON: ", textStatus, error);
        alert("Failed to load risk data!");
    });
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
        img.onerror = function() {
            resolve(null);
        }
        img.src = url;
    });
}

const BASE_URL = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
let LOGO_URL = "assets/images/logo.png";
let COVER_URL = "assets/images/initiative-bg.jpg";
const { jsPDF } = window.jspdf;

async function generatePDF() {
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = LOGO_URL;
    const coverImage = COVER_URL;
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = [120, 45, 90];
        let titleText = section?.title ? `${section.title}` : "Risk Report";
        
        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight,{ align: "right" });

        pdf.setTextColor(171, 80, 103);
        pdf.setFontSize(28);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center", maxWidth: pageWidth - 40 });
        pdf.text("RISK REPORT", pageWidth / 2, 80, { align: "center" });

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth/2, 0],[20, cfh],  [-90, 0] ], -20, pageHeight - cfh, [1, 1], 'F');

        pdf.setFillColor(...bgColor);
        pdf.lines(
            [[15, 0], [0, pageHeight / 3], [-15, 15], [0, - (pageHeight / 2 - 15)]],
            0, 0, [1, 1], 'F'
        );

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");      
        pdf.text(`Generated Date:  ${submissionDate} `, 10, pageHeight - 12);          
        pdf.addPage();
    }

    function header(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let title = section?.title ? section.title : "Risk Report";
        let owner = section?.owner?.name ? section.owner.name : "";
         
        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text("Risk Details", marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Owner: ${owner}`, marginRight, textStartY + 6, { align: "right" });
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
        pdf.lines([[pageWidth/2, 0], [20, footerHeight], [-90, 0]], -20, pageHeight - footerHeight, [1, 1], 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Risk Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4,{ align: "right" });
    }

    if (data.length > 0) {
        addCoverPage(data[0]);
    }
    
    let reportStartPage = pdf.internal.getNumberOfPages();

    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let currentY = header(item);

        // 1. Risk Details Table
        let detailsBody = [
            ["Risk Name", item.title || ""],
            ["Risk Code", item.riskCode || ""],
            ["Department", item.department || ""],
            ["Risk Code/Level", `${item.riskCode || ""} / ${item.riskLevel || ""}`],
            ["Inherent Risk Score", item.inherentRiskScore || ""],
            ["Residual Risk Score", item.residualRiskScore || ""],
            ["Date Raised", item.dateRaised || ""],
            ["Next Assessment", item.nextAssessment || ""],
            ["Business Impact", Array.isArray(item.businessImpactKPI) ? item.businessImpactKPI.join(", ") : ""],
            ["Financial Impact", Array.isArray(item.financialImpact) ? item.financialImpact.join(", ") : ""],
            ["Information Asset", Array.isArray(item.informationAsset) ? item.informationAsset.join(", ") : ""]
        ];

        pdf.autoTable({
            startY: currentY,
            head: [],
            body: detailsBody,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3, lineColor: [200, 200, 200] },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: [147, 69, 120],textColor: [255, 255, 255], width: 60 },
                1: { width: pageWidth - 60 - 20 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });
        
        currentY = pdf.lastAutoTable.finalY + 10;

        // 2. Causes and Consequences
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.causeAndConsequenceTitle || "CAUSES AND CONSEQUENCES", 10, currentY);
        currentY += 5;

        let causesRows = [];
        if (item.causesAndConsequences) {
            item.causesAndConsequences.forEach(cc => {
                let firstRow = true;
                if (!cc.consequences || cc.consequences.length === 0) {
                    causesRows.push([cc.title, cc.badge, "", ""]);
                    return;
                }
                cc.consequences.forEach(con => {
                    causesRows.push([
                        firstRow ? cc.title : "",
                        firstRow ? cc.badge : "",
                        con.title,
                        con.badge
                    ]);
                    firstRow = false;
                });
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Cause", "Risk Level", "Consequence", "Risk Level"]],
            body: causesRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8,overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 3. Controls
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.controlsTitle || "CONTROLS", 10, currentY);
        currentY += 5;

        let controlsRows = [];
        if (item.controls) {
            item.controls.forEach(ctrl => {
                let firstRow = true;
                if (!ctrl.items || ctrl.items.length === 0) {
                    controlsRows.push([ctrl.title, ctrl.strategy, ctrl.progress + "%", "", "", ""]);
                    return;
                }
                ctrl.items.forEach(cItem => {
                    controlsRows.push([
                        firstRow ? ctrl.title : "",
                        firstRow ? ctrl.strategy : "",
                        firstRow ? ctrl.progress + "%" : "",
                        cItem.title,
                        cItem.status,
                        cItem.progress + "%"
                    ]);
                    firstRow = false;
                });
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Control", "Strategy", "Progress", "Item", "Status", "Progress"]],
            body: controlsRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8,overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 50 },
                3: { cellWidth: 50 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 4. Treatments
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.riskTreatmentsTitle || "TREATMENTS", 10, currentY);
        currentY += 5;

        let treatmentsRows = [];
        if (item.riskTreatments) {
            item.riskTreatments.forEach(t => {
                treatmentsRows.push([t.reducingImpact, t.reducingPossibility, t.strategy, t.progress + "%", t.date]);
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Reducing Impact", "Reducing Possibility", "Strategy", "Progress", "Date"]],
            body: treatmentsRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8,overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 5. Review & Monitoring
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.reviewMonitoringTitle || "REVIEW & MONITORING", 10, currentY);
        currentY += 5;

        let monitoringRows = [];
        if (item.reviewMonitoring) {
            item.reviewMonitoring.forEach(m => {
                monitoringRows.push([m.title, m.status, m.progress + "%", m.date]);
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Monitoring Review", "Status", "Progress", "Date"]],
            body: monitoringRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8,overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 6. Comments
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(item); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(item.commentsTitle || "COMMENTS", 10, currentY);
        currentY += 5;

        let commentRows = [];
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

        if (item.comments) {
            item.comments.forEach(c => {
                let mainText = formatCommentText(c);
                let replies = getFlattenedReplies(c.replies);
                
                let rowCount = Math.max(1, replies.length);
                for (let i = 0; i < rowCount; i++) {
                    let col1 = (i === 0) ? mainText : "";
                    let col2 = (i < replies.length) ? formatCommentText(replies[i]) : "";
                    commentRows.push([col1, col2]);
                }
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Comments", "Replies"]], 
            body: commentRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8,overflow: 'linebreak'},
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 80 }, 
                1: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        if (i < data.length - 1) {
            pdf.addPage();
        }
    }

    const totalPages = pdf.internal.getNumberOfPages();
    let reportPageCount = totalPages - (reportStartPage - 1);
    
    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }

    pdf.save("risk_report.pdf");
}
