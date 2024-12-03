import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// กำหนด `workerSrc` ให้กับ pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const TourDeatilandCost = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null); // จำนวนหน้าของ PDF
  const [currentPage, setCurrentPage] = useState(1); // หน้าปัจจุบันที่กำลังแสดง
  const [pdfDoc, setPdfDoc] = useState(null); // เก็บข้อมูล PDF

  const loadPdf = async () => {
    try {
      const loadedPdfDoc = await pdfjsLib.getDocument(`/pdf/${pdf}`).promise;
      setPdfDoc(loadedPdfDoc);
      setNumPages(loadedPdfDoc.numPages); // กำหนดจำนวนหน้า PDF
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  useEffect(() => {
    loadPdf();
  }, [pdf]);

  // ฟังก์ชันเรนเดอร์ PDF ลงใน canvas
  const renderPage = async (pageNum) => {
    if (!pdfDoc) return;

    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });

    // สร้าง canvas ใหม่แทนที่เดิม
    const newCanvas = document.createElement("canvas");
    const newContext = newCanvas.getContext("2d");
    newCanvas.height = viewport.height;
    newCanvas.width = viewport.width;

    // เรนเดอร์หน้า PDF
    await page.render({
      canvasContext: newContext,
      viewport: viewport,
    }).promise;

    // เพิ่ม canvas ใหม่ใน DOM แทนที่เก่า
    const pdfContainer = document.getElementById("pdf-container");
    pdfContainer.innerHTML = ""; // ลบ canvas เก่า
    pdfContainer.appendChild(newCanvas); // เพิ่ม canvas ใหม่
  };

  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage]);

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto text-gray-700 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-700 text-center">
        Tour Detail & Cost
      </h2>

      {/* แสดง PDF โดยใช้ canvas */}
      <div className="flex justify-center my-6" id="pdf-container">
        {/* จะมี canvas ใหม่ถูกเพิ่มที่นี่ทุกครั้งที่การเรนเดอร์เสร็จสมบูรณ์ */}
      </div>

      {/* ปุ่มสำหรับ Next และ Previous */}
      <div className="flex justify-between items-center mt-6">
        {/* ปุ่ม Previous */}
        <button
          onClick={goToPrevPage}
          className={`flex items-center px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Previous
        </button>

        {/* ข้อมูลจำนวนหน้า */}
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {numPages}
        </span>

        {/* ปุ่ม Next */}
        <button
          onClick={goToNextPage}
          className={`flex items-center px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${
            currentPage === numPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          disabled={currentPage === numPages}
        >
          Next
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TourDeatilandCost;
