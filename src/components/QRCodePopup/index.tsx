import React, { useEffect, useState, useRef } from "react";
import { X, Copy, Download } from "react-feather";
import QRCodeStyling from "@solana/qr-code-styling";
import ytl_logo from "assets/ytl_logo.svg";
import html2canvas from "html2canvas";
import clsx from "clsx";
import { AlertPopup } from "components/AlertPopup";

// ================= INTERFACES / TYPES
interface QrCodePopupProps {
  onClose: () => void;
  profileName: string;
}

export const QrCodePopup: React.FC<QrCodePopupProps> = ({
  onClose,
  profileName,
}) => {
  // ================= STATE
  const qrcodeRef = useRef<HTMLDivElement | null>(null);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [showAlert, setShowAlert] = useState(false);

  // ================= VARIABLES
  const currentURL = window.location.href;
  const ytl_logoString = ytl_logo.src;
  const buttonClass = clsx(
    "w-full",
    "inline-flex",
    "items-center",
    "justify-center",
    "px-4",
    "py-2",
    "text-base",
    "sm:text-lg",
    "bg-white",
    "rounded-md",
    "shadow-sm"
  );

  // ================= EVENTS
  const generateQRCode = (): QRCodeStyling => {
    const isMobileView = window.innerWidth <= 768;
    const qrCode: QRCodeStyling = new QRCodeStyling({
      width: isMobileView ? 230 : 300,
      height: isMobileView ? 230 : 300,
      image: ytl_logoString,
      data: currentURL,
      dotsOptions: {
        color: "#181818",
        type: "rounded",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 11,
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      cornersDotOptions: {
        type: "dot",
      },
    });

    qrCode.update({
      data: window.location.href,
    });

    return qrCode;
  };

  const [qrCode, setQRCode] = useState(generateQRCode);

  const handleDownloadImage = async () => {
    const element = document.getElementById("qrcodeprint");

    if (element instanceof HTMLElement) {
      const canvas = await html2canvas(element, { scale: 2 });
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      link.href = data;
      link.download = `${profileName
        ?.toLowerCase()
        .replace(/\s+/g, "-")}-qr.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Element not found or is not an HTMLElement");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // ================= EFFECTS
  useEffect(() => {
    if (qrcodeRef.current) {
      qrCode.append(qrcodeRef.current);
    }
  }, [qrCode]);

  // ================= VIEWS
  return (
    <div className="popup-overlay" onClick={onClose}>
      {showAlert && (
        <AlertPopup text="Copied to clipboard!" onClose={closeAlert} />
      )}
      {/* Container for popup content */}
      <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Popup content */}
        <div className="popup-content">
          {/* QR code component */}
          <div className="mb-4" id="qrcodeprint" ref={qrcodeRef} />
          {/* Copy link */}
          <div className="flex flex-col">
            {/* <div className="flex mb-3 justify-between">
              <h2 className="text-base sm:text-lg">Copy page link</h2>
            </div> */}
            <div className="relative">
              <input
                type="text"
                className="w-full text-xs sm:text-sm text-gray-600 bg-gray-100 py-4 pl-4 pr-12 rounded-xl truncate"
                value={currentUrl}
                readOnly
              />
              <a
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={handleCopyToClipboard}
              >
                <Copy color="#505050" />
              </a>
            </div>
          </div>
          {/* Download button */}
          <button
            className="cursor-pointer mt-4 place-self-center rounded-xl pt-2"
            onClick={handleDownloadImage}
          >
            <Download color="#505050" />
          </button>
        </div>
        <div
          className="cursor-pointer mt-5 place-self-center bg-white bg-opacity-25 p-2 rounded-full focus:bg-opacity-30 hover:bg-opacity-30"
          onClick={onClose}
        >
          <X color="#505050" size={24} />
        </div>
      </div>
    </div>
  );
};

export default QrCodePopup;
