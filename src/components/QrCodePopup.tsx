import React from "react";
import clsx from "clsx";
import QRCode from "react-qr-code";

interface QrCodePopupProps {
  onClose: () => void;
}

const QrCodePopup: React.FC<QrCodePopupProps> = ({ onClose }) => {
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

  const currentURL = window.location.href;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* QR code component */}
        <QRCode value={currentURL} size={224} />
        {/* Close button */}
        <button
          className={`border border-color-sky text-color-sky ex1 mt-3 ${buttonClass}`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QrCodePopup;
