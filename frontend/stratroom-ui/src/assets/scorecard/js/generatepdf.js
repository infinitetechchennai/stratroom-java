

let data = []; // Global variable to store the loaded data


// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
    $.getJSON("scorecard.json", function(response) {
        console.log("Data Loaded Successfully", response);
        data = response; // Assign data
        console.log(data);
        generatePDF();   // Call function after loading data
    }).fail(function(jqxhr, textStatus, error) {
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
        img.src = url;
    });
}

// ==========================================
// CONFIGURATION
// Uncomment the BASE_URL you want to use.
// ==========================================

// Option 1: Local Development (VS Code Live Server)
const BASE_URL = "http://127.0.0.1:5500/"; 

// Option 2: Local XAMPP
// const BASE_URL = "http://localhost/mg-portal-new/";

// Option 3: Production
// const BASE_URL = "https://stratroom.io/"; 

// Define asset paths
let LOGO_URL = BASE_URL + "assets/images/logo.png";
let COVER_URL = BASE_URL + "assets/images/scorecard-bg.jpg"; // Default local path
let ICONS_PATH = BASE_URL + "assets/images/icons/";

// Production Overrides (because production structure is different)
if (BASE_URL.includes("stratroom.io")) {
    ICONS_PATH = "https://stratroom.io/projects/mg-portal-html/assets/images/icons/";
    COVER_URL = "https://stratroom.io/projects/mg-portal-new-html/assets/images/scorecard-bg.jpg";
    LOGO_URL = "https://stratroom.io/assets/images/logo.png";
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

    // Helper function to add full-page images
    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = [120, 45, 90];
        let periodText = section?.period ? `Period: ${section.period}` : "Period: N/A";
        let titleText = section?.pageTitle ? `${section.pageTitle}` : "N/A";
             pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
            //pdf.addImage(logoUrl, "PNG", pageWidth / 2 - 25, 20, 50, 15); 
            pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight,{ align: "right" });


            pdf.setTextColor(171, 80, 103);
            pdf.setFontSize(32);
            pdf.setFont("helvetica", "bold");
            // pdf.text("Performance <br/>Report".toUpperCase(), pageWidth / 2, 50, { align: "center" });

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
            pdf.lines([[pageWidth/2, 0],[20, cfh],  [-90, 0] ], -20, pageHeight - cfh, [1, 1], 'F');

           
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

        // Add Cover Page
      
       
    function header(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
         const textStartY = imgY + 5;
         let title = (section?.pageTitle ? section.pageTitle + " Report" : "Performance Report");
         let score = section?.overallScore ? `${section.overallScore}` : "";
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
        pdf.text(`Name: ${name} | Score: ${score}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });           
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }


    function footer(pageNumber, totalPages) {
        let footerHeight = 20;
        let footerHeightsm = 10;
        let bgColor = [120, 45, 90]; // Adjusted color to match

    // Draw footer base rectangle
    pdf.setFillColor(...bgColor);
    pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');

    // Draw angled shape
    pdf.setFillColor(...bgColor);
    pdf.lines([
    [pageWidth/2, 0],   // Move right (top horizontal line)
    [20, footerHeight],  // Diagonal slant
    [-90, 0]   // Move left to close the shape
    ], -20, pageHeight - footerHeight, [1, 1], 'F');

    // White Text Styling
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");

    // Footer Title
    pdf.text("Corporate Performance Report", 10, pageHeight - 10);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    // Page Number
    pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4,{ align: "right" });
    }

    addCoverPage(data[0]);


let reportStartPage = pdf.internal.getNumberOfPages(); // First actual report page

    data.forEach(section => {
        let y = header(section);
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
    });
    let totalReportPages = pdf.internal.getNumberOfPages() - (reportStartPage - 1);
    for (let i = reportStartPage; i <= pdf.internal.getNumberOfPages(); i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), totalReportPages);
    }
    pdf.save("report.pdf");
}


function processTableData(items, level = 0) {
    let tableRows = [];
    items.forEach(item => {
        tableRows.push([
            item.flag[0]?.status || "",
            "\u00A0\u00A0".repeat(level) + item.id,
            "\u00A0\u00A0".repeat(level) + item.name,
            item.period || "",
            item.score || "",
            item.trend[0]?.status || "",
            item.baseline || "",
            item.actual || "",
            item.target || "",
            item.risk[0]?.status || ""
        ]);

        if (item.children?.length) {
            tableRows = tableRows.concat(processTableData(item.children, level + 1));
        }
    });
    return tableRows;
}
