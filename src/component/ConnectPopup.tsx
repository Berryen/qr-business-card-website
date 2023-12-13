import React from "react";

interface ConnectPopupProps {
  onClose: () => void;
}

const ConnectPopup: React.FC<ConnectPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Connect-specific content goes here */}
        <p className="text-base sm:text-lg text-gray-700">Connect content...</p>
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

export default ConnectPopup;
