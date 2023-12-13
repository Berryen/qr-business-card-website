import React, { useState } from "react";
import clsx from "clsx";

interface ConnectPopupProps {
  onClose: () => void;
}

const ConnectPopup: React.FC<ConnectPopupProps> = ({ onClose }) => {
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

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleConnect = () => {
    // Handle the connect action based on the selectedOption
    // For simplicity, I'm just logging the selected option here
    console.log("Connecting via:", selectedOption);

    // Close the popup
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content w-60 sm:w-80">
        <h2 className="text-xl sm:text-2xl mb-5">Connect with</h2>

        <div className="flex flex-col divide-y divide-gray-300">
          <div className="flex items-center">
            <input
              type="radio"
              id="whatsapp"
              value="whatsapp"
              checked={selectedOption === "whatsapp"}
              onChange={() => handleOptionChange("whatsapp")}
            />
            <label
              htmlFor="whatsapp"
              className="ml-2 py-2 text-base sm:text-lg text-gray-600 truncate"
            >
              WhatsApp
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="email"
              value="email"
              checked={selectedOption === "email"}
              onChange={() => handleOptionChange("email")}
            />
            <label
              htmlFor="email"
              className="ml-2 py-2 text-base sm:text-lg text-gray-600 truncate"
            >
              Email
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="phone"
              value="phone"
              checked={selectedOption === "phone"}
              onChange={() => handleOptionChange("phone")}
            />
            <label
              htmlFor="phone"
              className="ml-2 py-2 text-base sm:text-lg text-gray-600 truncate"
            >
              Phone
            </label>
          </div>
        </div>

        <div className="w-full flex gap-5 mt-5">
          {/* Close button */}
          <button
            className={`border border-color-sky text-color-sky ex1 ${buttonClass}`}
            onClick={onClose}
          >
            Close
          </button>
          <button
            className={`bg-color-sky text-white ex2 ${buttonClass}`}
            onClick={handleConnect}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectPopup;
