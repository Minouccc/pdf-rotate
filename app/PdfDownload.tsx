"use client";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { PDFDocument, degrees } from "pdf-lib";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function PdfDownload() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageRotations, setPageRotations] = useState<Record<number, number>>(
    {}
  );
  const [rotationAll, setRotationAll] = useState<number>(0);
  const [inputVisible, setInputVisible] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleRotate = (pageNumber: number, angle: number) => {
    setPageRotations((prevRotations) => ({
      ...prevRotations,
      [pageNumber]: (prevRotations[pageNumber] || 0) + angle,
    }));
  };

  const handleRotateAll = () => {
    setRotationAll((prevRotation) => prevRotation + 90); // Rotate all by 90 degrees
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleRemovePdf = () => {
    setFile(null);
    setNumPages(null);
    setPageRotations({});
    setRotationAll(0);
    setInputVisible(true);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
  };

  const handleDownload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const existingPdfBytes = new Uint8Array(reader.result as ArrayBuffer);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      for (let i = 0; i < pages.length; i++) {
        const rotation = (pageRotations[i + 1] || 0) + rotationAll;
        if (rotation !== 0) {
          pages[i].setRotation(degrees(rotation));
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "rotated.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (file) {
      setInputVisible(false);
    } else {
      setInputVisible(true);
    }
  }, [file]);

  return (
    <div className="pdf-viewer">
      <div className="flex justify-center">
        {inputVisible && <input type="file" onChange={handleFileChange} />}
        {!inputVisible && (
          <div>
            <button
              className="bg-[#ff612f] w-[6rem] h-[2rem] rounded text-white mr-4"
              onClick={handleRotateAll}
            >
              Rotate all
            </button>
            <button
              className="bg-[#333] w-[8rem] h-[2rem] rounded text-white mr-4 "
              onClick={handleRemovePdf}
            >
              Remove PDF
            </button>
            <button
              className="rounded text-white mr-4 w-10 h-10 bg-slate-300 text-lg font-semibold"
              onClick={handleZoomIn}
            >
              +
            </button>
            <button
              className="rounded text-white mr-4 w-10 h-10 bg-slate-300 text-lg font-semibold"
              onClick={handleZoomOut}
            >
              -
            </button>
          </div>
        )}
      </div>
      {file && (
        <div className="flex flex-wrap ">
          <Document file={file} onLoadSuccess={handleDocumentLoadSuccess}>
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="flex items-center justify-center"
                  style={{
                    width: `${250 * scale}px`,
                    height: `${300 * scale}px`,
                    backgroundColor: "#ccc",
                    position: "relative",
                    margin: "10px",
                  }}
                >
                  <Page
                    pageNumber={index + 1}
                    rotate={(pageRotations[index + 1] || 0) + rotationAll}
                    width={200}
                    scale={scale}
                  />
                  <div className="absolute top-2 right-2 bg-[#ff612f] w-6 h-6 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      onClick={() => handleRotate(index + 1, 90)}
                      fill="#FFFFFF"
                    >
                      <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"></path>
                    </svg>
                  </div>
                </div>
              ))}
          </Document>
        </div>
      )}
      {!inputVisible && (
        <div className="flex text-center justify-center">
          <button
            className="bg-[#ff612f] w-[8rem] h-[2rem] rounded text-white mt-10"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
