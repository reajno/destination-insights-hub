// ExportButton.jsx
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ExportButton = () => {
  const handleExport = async () => {
    const element = document.getElementById("dashboard-content");

    if (!element) {
      console.error("Dashboard content not found.");
      return;
    }

    // Strip unsupported OKLCH styles before rendering
    element.querySelectorAll("*").forEach((el) => {
      const computed = window.getComputedStyle(el);
      if (computed.color.includes("oklch")) {
        el.style.color = "#000000";
      }
      if (computed.backgroundColor.includes("oklch")) {
        el.style.backgroundColor = "#ffffff";
      }
    });

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      const pdfWidth = pageWidth - 20;
      const pdfHeight = pdfWidth / ratio;

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");
    } catch (err) {
      console.error("Failed to export PDF:", err);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Export Dashboard as PDF
    </button>
  );
};

export default ExportButton;
