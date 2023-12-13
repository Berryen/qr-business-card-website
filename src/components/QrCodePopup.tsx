import React from "react";
import clsx from "clsx";

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

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* QR code component or image goes here */}
        <img
          src="https://via.placeholder.com/150"
          alt="QR Code"
          className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-md shadow-sm"
        />
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
