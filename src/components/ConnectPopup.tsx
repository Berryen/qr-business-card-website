import React, { useState } from "react";
import clsx from "clsx";
interface ConnectPopupProps {
  onClose: () => void;
  profile: ProfileInfo;
}
interface ProfileInfo {
  id: number;
  attributes: {
    countryCodeMobile: string;
    countryCodeOffice: string;
    mobileNumber: string;
    officeNumber: string;
    extensionNumber: string;
  };
}

const ConnectPopup: React.FC<ConnectPopupProps> = ({ onClose, profile }) => {
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
    if (selectedOption === "whatsapp") {
      // Generate WhatsApp link
      const countryCode = getCountryCode(profile.attributes.countryCodeMobile);
      const whatsappLink = `https://api.whatsapp.com/send?phone=${countryCode}${profile.attributes.mobileNumber}`;

      // Redirect to WhatsApp link
      window.location.href = whatsappLink;
    } else {
      // Handle other connect actions based on the selectedOption
      console.log("Connecting via:", selectedOption);
    }

    // Close the popup
    onClose();
  };

  const getCountryCode = (countryName: string): string => {
    switch (countryName) {
      case "Malaysia (60)":
        return "60";
      case "Singapore (65)":
        return "65";
      case "Vietnam (84)":
        return "84";
      default:
        return countryName;
    }
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
