

let data = []; // Global variable to store the loaded data
let reportInfo = {}; // Global variable to store report metadata

// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
    $.getJSON("assets/json/initiativesnew.json", function (response) {
        console.log("Data Loaded Successfully", response);
        if (response && response.length > 0 && response[0].data) {
            reportInfo = response[0];
            data = response[0].data;
        } else {
            data = response;
        }
        console.log(data);
        generatePDF();   // Call function after loading data
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Error loading JSON: ", textStatus, error);
        alert("Failed to load data!");
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
        img.onerror = function () {
            resolve(null);
        }
        img.src = url;
    });
}

// ==========================================
// CONFIGURATION
// ==========================================

// Option 1: Local Development (VS Code Live Server)
const BASE_URL = "http://127.0.0.1:5500/mg-portal-new/";

// Option 2: Local XAMPP
// const BASE_URL = "http://localhost/mg-portal-new/";

// Option 3: Production
// const BASE_URL = "https://stratroom.io/"; 

// Define asset paths
let LOGO_URL = "assets/images/logo.png"; // Relative path is safer provided base href is set or we are cautious
let COVER_URL = "assets/images/initiative-bg.jpg";
let ICONS_PATH = "assets/images/icons/";

// Helper to resolve full URL if needed (for jsPDF addImage usually requires base64 or full URL)
// For local valid URLs, we might need absolute. Let's try to use relative if <img> tags work, but for jsPDF we usually need Base64 or absolute.
// Using a helper to ensure we get a loadable URL.
function getFullUrl(path) {
    // return BASE_URL + path; 
    // Attempt to use current origin if BASE_URL is not perfect
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

    // Helper functions from generatepdf.js
    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = [120, 45, 90];
        let periodText = section?.period ? `Period: ${section.period}` : "Period: N/A";
        let titleText = section?.pageTitle ? `${section.pageTitle}` : "N/A";
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
        let title = (section?.pageTitle ? section.pageTitle + " Report" : "Performance Report");
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

    function footer(pageNumber, totalPages) {
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
        pdf.text("Initiatives Projects Report", 10, pageHeight - 10);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        // Page Number
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    // Add Cover Page (assuming for the first item or overall)
    if (Object.keys(reportInfo).length > 0) {
        addCoverPage(reportInfo);
    } else if (data.length > 0) {
        addCoverPage(data[0]);
    }

    let reportStartPage = pdf.internal.getNumberOfPages();

    // Iterate through initiatives
    for (let i = 0; i < data.length; i++) {
        let initiative = data[i];

        let currentY = header(Object.keys(reportInfo).length > 0 ? reportInfo : initiative);

        // 1. Initiative Details Table (Vertical)
        let impactKPIsStr = Array.isArray(initiative.impactKPIs) ? initiative.impactKPIs.join(", ") : "";

        let detailsBody = [
            ["Strategic Initiative Name", initiative.title || ""],
            ["ID", initiative.id || ""],
            ["Department", initiative.department || ""],
            ["Progress", (initiative.progress?.value !== undefined ? initiative.progress.value + "%" : "")],
            ["Start Date - End Date", `${initiative.startDate || ""} - ${initiative.endDate || ""}`],
            ["Perspective", initiative.perspective || ""],
            ["Objective", initiative.objective || ""],
            ["Impact KPIs", impactKPIsStr]
        ];

        pdf.autoTable({
            startY: currentY,
            head: [],
            body: detailsBody,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3, lineColor: [200, 200, 200] },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: [147, 69, 120], textColor: [255, 255, 255], width: 60 },
                1: { width: pageWidth - 60 - 20 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 2. Sub Initiatives & Activities
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("SUB INITIATIVES & ACTIVITIES", 10, currentY);
        currentY += 5;

        let subInitRows = [];
        if (initiative.subInitiatives && initiative.subInitiatives.length > 0) {
            initiative.subInitiatives.forEach(sub => {
                let firstSub = true;
                if (!sub.activities || sub.activities.length === 0) {
                    subInitRows.push([sub.title, "", "", `${sub.startDate} - ${sub.endDate}`, sub.progress?.value + "%"]);
                    return;
                }
                sub.activities.forEach(act => {
                    let firstAct = true;
                    if (!act.tasks || act.tasks.length === 0) {
                        subInitRows.push([firstSub ? sub.title : "", act.title, "", `${act.startDate} - ${act.endDate}`, act.progress?.value + "%"]);
                        firstSub = false;
                        return;
                    }
                    act.tasks.forEach(task => {
                        subInitRows.push([
                            firstSub ? sub.title : "",
                            firstAct ? act.title : "",
                            task.title,
                            `${task.startDate} - ${task.endDate}`,
                            task.progress?.value + "%"
                        ]);
                        firstSub = false;
                        firstAct = false;
                    });
                });
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Sub Initiative", "Activity", "Sub Activity", "Start - End Date", "Progress"]],
            body: subInitRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 45 },
                1: { cellWidth: 45 },
                2: { cellWidth: 40 },
                3: { cellWidth: 40 },
                4: { cellWidth: 20, halign: "center" }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 3. Gantt Chart Table
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(initiative.ganttChartTitle || "Gantt Chart", 10, currentY);
        currentY += 5;

        let ganttRows = [];
        if (initiative.ganttChart) {
            ganttRows = initiative.ganttChart.map(g => [g.name, g.start + " - " + g.end]);
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Task Name", "Start - End Date"]],
            body: ganttRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 40 },
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 4. TASKS
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(initiative.tasksTitle || "TASKS", 10, currentY);
        currentY += 5;

        let taskRows = [];
        if (initiative.tasks) {
            taskRows = initiative.tasks.map(t => [
                t.title,
                t.progress ? t.progress.value + "%" : "",
                `${t.startDate} - ${t.endDate}`,
                t.status
            ]);
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Tasks", "Progress", "Start - End Date", "Status"]],
            body: taskRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 20 },
                2: { cellWidth: 40 },
                3: { cellWidth: 30 },
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 5. MILESTONES
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(initiative.milestonesTitle || "MILESTONES", 10, currentY);
        currentY += 5;

        let mileRows = [];
        if (initiative.milestones) {
            mileRows = initiative.milestones.map(m => [
                m.title,
                m.progress ? m.progress.value + "%" : "",
                m.date,
                m.status
            ]);
        }

        pdf.autoTable({
            startY: currentY,
            head: [["Milestones", "Progress", "Date", "Status"]],
            body: mileRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 20 },
                2: { cellWidth: 40 },
                3: { cellWidth: 30 },
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // 6. COMMENTS
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(initiative.commentsTitle || "COMMENTS", 10, currentY);
        currentY += 5;

        // Custom Comments Table matching the requested layout
        // 2 Columns: Comment Content | Empty

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

        if (initiative.comments) {
            initiative.comments.forEach(c => {
                let mainText = formatCommentText(c);
                let replies = getFlattenedReplies(c.replies);

                let rowCount = Math.max(1, replies.length);

                for (let i = 0; i < rowCount; i++) {
                    let col1 = (i === 0) ? mainText : "";
                    let col2 = (i < replies.length) ? formatCommentText(replies[i]) : "";
                    commentRows.push([col1, col2]);
                }
                // visual separator if multiple roots, but grid handles it.
            });
        }

        pdf.autoTable({
            startY: currentY,
            // The mockup implies a header might exist or just the top border. 
            // We'll use a header to define the width, but maybe empty text if not specified.
            // Using "Comments" and empty string as headers.
            head: [["Comments", "Replies"]],
            body: commentRows,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, lineHeight: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 'auto' } // The rest
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        // Add page break if not last item
        if (i < data.length - 1) {
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

    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }

    pdf.save("initiatives_report.pdf");
}
