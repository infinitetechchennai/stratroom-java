

let data = []; // Global variable to store the loaded data


// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
     generatePDF(); 
}


const { jsPDF } = window.jspdf;

async function generatePDF() {
  
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = "http://127.0.0.1:5500/assets/images/logo.png";

    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    function header() {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
         const textStartY = imgY + 5;
         let title = ("Drill Down Table Report");
         let score = "100";
         let name = "Sajin";
         let period = "Q1 2023";
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
        pdf.line(10, imgHeight + 14, pageWidth - 10, imgHeight + 14);
        return imgHeight + 20;
    }
 pdf.addPage();

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
    pdf.text("Drill Down Table Report", 10, pageHeight - 10);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    // Page Number
    pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4,{ align: "right" });
    }

    // addCoverPage(data[0]);



// let y = header();


 let reportStartPage = pdf.internal.getNumberOfPages(); // First actual report page

    y = header();
    let totalReportPages = pdf.internal.getNumberOfPages() - (reportStartPage - 1);
    for (let i = reportStartPage; i <= pdf.internal.getNumberOfPages(); i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), totalReportPages);
    }
    pdf.save("report.pdf");
}




