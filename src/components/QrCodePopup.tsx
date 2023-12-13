import React from "react";

interface QrCodePopupProps {
  onClose: () => void;
}

const QrCodePopup: React.FC<QrCodePopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* QR code component or image goes here */}
        <img
          src="https://via.placeholder.com/150"
          alt="QR Code"
          className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-md shadow-md"
        />
        {/* Close button */}
        <button
          className="mt-3 px-4 py-2 w-full inline-flex items-center justify-center text-base sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100d"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QrCodePopup;
