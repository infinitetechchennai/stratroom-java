

let data = []; // Global variable to store the loaded data


// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
    $.getJSON("dataKpiDrillData.json", function(response) {
        
        data = response; // Assign data
        console.log("data",data);
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

const riskImageUrls = {
    green: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg",
    yellow: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
    red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg"
};
const flagImageUrls = {
    green: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-green-i.svg",
    yellow: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-yellow-i.svg",
    red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-red-i.svg"
};
const trendImageUrls = {
    up: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png",
    down: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png",
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
    // await preloadImages();
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    // const logoUrl = "https://stratroom.io/assets/images/logo.png";
    // const coverImage = "https://stratroom.io/projects/mg-portal-new-html/assets/images/scorecard-bg.jpg";
      const logoUrl = "";
    const coverImage = "";
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
            // pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
            //pdf.addImage(logoUrl, "PNG", pageWidth / 2 - 25, 20, 50, 15); 
            //pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight,{ align: "right" });


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
         

        // pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
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

        let tabs;


        if (Array.isArray(section)) {
            tabs = section;
        }else {
            tabs = [section];
        }

        tabs.forEach(tab => {
            if (!tab) return;

        if (y + (tab.length * 6 + 16) > pageHeight - 40) {
            pdf.addPage();
            y = header(section);
        }
        console.log("tab", tab);
        // pdf.setFontSize(12).setFont("helvetica", "bold");
        // pdf.text(`${tab.title} (Total Score: ${tab.totalScore})`, 10, y);
        // y += 5;

        pdf.autoTable({
            startY: y,
           head: [
        [
            { content: "#", rowSpan: 2 },
            { content: "NAME/PERIOD", rowSpan: 2 },
            { content: "JAN 2025", colSpan: 3, styles: { halign: 'center' } },
            { content: "FEB 2025", colSpan: 3, styles: { halign: 'center' } },
            { content: "MAR 2025", colSpan: 3, styles: { halign: 'center' } },
            { content: "APR 2025", colSpan: 3, styles: { halign: 'center' } },
        ],
        [
            { content: "ACTUAL" }, { content: "TARGET" }, { content: "GAP" },
            { content: "ACTUAL" }, { content: "TARGET" }, { content: "GAP" },
            { content: "ACTUAL" }, { content: "TARGET" }, { content: "GAP" },
            { content: "ACTUAL" }, { content: "TARGET" }, { content: "GAP" },
        ]
    ],
            body: processTableData(tab),
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 2, lineColor: [201, 201, 201] },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            margin: { top: 8, left: 10, right: 10 },
            pageBreak: 'avoid',
            didDrawCell: function (data) {
                let imgSize = 4;
                if (data.section === "body") {
                   
                   
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


// function processTableData(items, level = 0) {
//     // Normalize input to an array
//     if (!items) return [];

//     let list = items;

//     console.log("processTableData: items", items);
//     if (!Array.isArray(list)) {
//         if (Array.isArray(items.data)) list = items.data;
//         else if (Array.isArray(items.items)) list = items.items;
//         else if (Array.isArray(items.rows)) list = items.rows;
//         else if (Array.isArray(items.children)) list = items.children;
//         else list = [items]; // wrap single object
//     }

//     if (!Array.isArray(list)) {
//         console.warn('processTableData: unexpected items shape', items);
//         return [];
//     }

//     const tableRows = [];
//     console.log("processTableData: list", list);
//     list.forEach(item => {
//         const idText = (item?.id !== undefined) ? String(item.id) : (item?.name ? String(item.name) : '');
//         const nameText = (item?.name !== undefined) ? String(item.name) : (item?.title ? String(item.title) : '');

//         tableRows.push([
//             //"\u00A0\u00A0".repeat(level) + idText,
//             "\u00A0\u00A0".repeat(level) + nameText,
//         ]);

//         if (Array.isArray(item?.children) && item.children.length) {
//             tableRows.push(...processTableData(item.children, level + 1));
//         }
//     });

//     return tableRows;
// }
function processTableData(items, level = 0) {
    if (!items) return [];

    let list;
    if (Array.isArray(items)) {
        list = items;
    } else if (Array.isArray(items.data)) {
        list = items.data;
    } else if (Array.isArray(items.items)) {
        list = items.items;
    } else if (Array.isArray(items.rows)) {
        list = items.rows;
    } else if (Array.isArray(items.children)) {
        list = items.children;
    } else {
        list = [items];  // wrap as array
    }

    if (!Array.isArray(list)) {
        console.warn("processTableData: unexpected items shape", items);
        return [];
    }

    const tableRows = [];
    list.forEach(item => {
        const countText = "1"
        const nameText = "\u00A0\u00A0".repeat(level) + (item.name || item.title || "");

        console.log("monthly:", item.data.monthly);

        // மாதங்கள்
        const months = ["JAN 2025", "FEB 2025", "MAR 2025", "APR 2025"];
        let row = [countText,nameText];
        months.forEach(m => {
            let monthData = item[m] || {};
            row.push(
                monthData.actual || "",
                monthData.target || "",
                monthData.gap || ""
            );
        });

        tableRows.push(row);

        if (Array.isArray(item.children) && item.children.length) {
            tableRows.push(...processTableData(item.children, level + 1));
        }
    });

    return tableRows;
}

