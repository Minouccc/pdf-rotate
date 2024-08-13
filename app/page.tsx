import { PdfDownload } from "./PdfDownload";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-col">
        <div className="p-2.5 flex justify-between items-center box-border h-[64px]">
          <div>
            <a href="" className="p-2.5 flex text-xl font-semibold">
              <svg
                viewBox="0 0 64 36"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[1.125rem]"
              >
                <path
                  fill="black"
                  d="M41.3111 0H37.6444C30.3111 0 24.6889 4.15556 21.7556 9.28889C18.8222 3.91111 12.9556 0 5.86667 0H2.2C0.977781 0 0 0.977779 0 2.2V5.86667C0 16.1333 8.31111 24.2 18.3333 24.2H19.8V33C19.8 34.2222 20.7778 35.2 22 35.2C23.2222 35.2 24.2 34.2222 24.2 33V24.2H25.6667C35.6889 24.2 44 16.1333 44 5.86667V2.2C43.5111 0.977779 42.5333 0 41.3111 0ZM19.3111 19.5556H17.8444C10.2667 19.5556 4.15556 13.4444 4.15556 5.86667V4.4H5.62222C13.2 4.4 19.3111 10.5111 19.3111 18.0889V19.5556ZM39.1111 5.86667C39.1111 13.4444 33 19.5556 25.4222 19.5556H23.9556V18.0889C23.9556 10.5111 30.0667 4.4 37.6444 4.4H39.1111V5.86667Z"
                ></path>
              </svg>
              <span className="h-[1.125rem] leading-[1.125rem]">PDF.ai</span>
            </a>
          </div>
          <div>
            <div className="flex justify-center items-center">
              <a href="" className="p-2.5 font-medium text-base">
                Pricing
              </a>
              <a href="" className="p-2.5 font-medium text-base">
                Chrome extension
              </a>
              <a href="" className="p-2.5 font-medium text-base">
                Use cases
              </a>
              <a href="" className="p-2.5 font-medium text-base">
                Get started →
              </a>
            </div>
          </div>
        </div>
        <div className="bg-[#f7f5ee] min-h-[calc(100vh-64px)]">
          <div className="p-[5rem] mx-auto min-h-full">
            <div className="w-full min-h-full mx-auto">
              <div className="flex flex-col text-center mb-6 md:mb-10 justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold">
                  Rotate PDF Pages
                </h1>
                <p className="mt-2 text-gray-600 max-w-xs sm:max-w-md md:max-w-lg mx-auto">
                  Simply click on a page to rotate it. You can then download
                  your modified PDF.
                </p>
              </div>
              <div className="w-full flex justify-center">
                <PdfDownload></PdfDownload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
