const { jsPDF } = window.jspdf;

async function generatePDF() {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const marginLeft = 10;
  const marginRight = pageWidth - marginLeft;
  const submissionDate = new Date().toLocaleDateString();
  
  // Convert logo to Base64 (replace with your actual base64)
 const logoUrl = "https://stratroom.io/assets/images/logo.png";

  // HEADER
  function header() {
    const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
    const textY = imgY + 5;
    const title = "PESTEL Analysis Table Report";
    const score = "100";
    const name = "Sajin";
    const period = "Q1 2023";

    pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text(title, marginRight, textY - 3, { align: "right" });

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Generated Date: ${submissionDate}`, marginRight, textY + 2, { align: "right" });
    pdf.text(`Name: ${name} | Score: ${score}`, marginRight, textY + 7, { align: "right" });
    pdf.text(`Period: ${period}`, marginRight, textY + 12, { align: "right" });
    pdf.line(10, imgHeight + 14, pageWidth - 10, imgHeight + 14);
    
    return imgHeight + 20; // Return y start for content
  }

  // FOOTER
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
    pdf.text("PESTEL Analysis Table Report", 10, pageHeight - 10);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    // Page Number
    pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4,{ align: "right" });
    }

  // Render header + content
  let y = header();
  pdf.setFontSize(10);
  pdf.text("Sample content goes here...", 10, y + 10);

  // Multiple pages example
  for (let i = 0; i < 2; i++) {
    pdf.addPage();
    y = header();
    pdf.text(`Page ${i + 2} content`, 10, y + 10);
  }

  // Add footer to all pages
  const totalPages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    footer(i, totalPages);
  }

  pdf.save("report.pdf");
}

function loadDataAndGeneratePDF() {
  generatePDF();
}
