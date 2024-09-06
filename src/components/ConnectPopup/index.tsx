import React, { useState } from "react";
import { X, Mail, Phone, Briefcase, Linkedin, Copy } from "react-feather";
import WhatsApp from "assets/whatsapp.svg";
import Image from "next/image";
import { AlertPopup } from "components/AlertPopup";

// ================= INTERFACES / TYPES
interface ConnectPopupProps {
  onClose: () => void;
  profile: ProfileInfo;
}
interface ProfileInfo {
  id: number;
  attributes: {
    emailId: string;
    domain: string;
    countryCodeMobile: string;
    countryCodeOffice: string;
    mobileNumber: string;
    officeNumber: string;
    extensionNumber: string;
    linkedIn: string;
    showWhatsapp: boolean;
  };
}

export const ConnectPopup: React.FC<ConnectPopupProps> = ({
  onClose,
  profile,
}) => {
  // ================= STATE
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [showAlert, setShowAlert] = useState(false);

  // ================= VARIABLES
  const WhatsAppIcon = () => (
    <Image src={WhatsApp} alt="WhatsApp" width={24} height={24} />
  );

  // ================= EVENTS
  const handleOptionChange = (option: string) => {
    // Set the selected option
    setSelectedOption(option);

    // Handle the connect action based on the selectedOption
    if (option === "whatsapp") {
      // Generate WhatsApp link
      const countryCode = getCountryCode(profile.attributes.countryCodeMobile);
      const whatsappLink = `https://api.whatsapp.com/send?phone=${countryCode}${profile.attributes.mobileNumber}`;
      // Redirect to WhatsApp link
      window.open(whatsappLink, "_blank");
    } else if (option === "email") {
      // Generate mailto link
      const emailLink = `mailto:${profile.attributes.emailId}${profile.attributes.domain}?subject=I%20would%20like%20to%20connect%20with%20you!`;
      // Redirect to mailto link
      window.location.href = emailLink;
    } else if (option === "phone") {
      // Generate tel link
      const telLink = `tel:+${getCountryCode(
        profile.attributes.countryCodeMobile
      )}${profile.attributes.mobileNumber}`;
      // Redirect to tel link
      window.location.href = telLink;
    } else if (option === "office") {
      // Generate tel link for office number
      const officeTelLink = `tel:+${getCountryCode(
        profile.attributes.countryCodeOffice
      )}${profile.attributes.officeNumber}`;
      // Redirect to tel link
      window.location.href = officeTelLink;
    } else if (option === "linkedin") {
      window.open(profile.attributes.linkedIn, "_blank");
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

  const connectionOptions = [
    ...(profile.attributes.showWhatsapp && profile.attributes.mobileNumber
      ? [{ value: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> }]
      : []),
    { value: "email", label: "Email", icon: <Mail color="#555557" /> },
    ...(profile.attributes.mobileNumber
      ? [{ value: "phone", label: "Phone", icon: <Phone color="#555557" /> }]
      : []),
    ...(profile.attributes.officeNumber
      ? [
          {
            value: "office",
            label: "Office",
            icon: <Briefcase color="#555557" />,
          },
        ]
      : []),
    ...(profile.attributes.linkedIn
      ? [
          {
            value: "linkedin",
            label: "LinkedIn",
            icon: <Linkedin color="#555557" />,
          },
        ]
      : []),
  ];

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // ================= VIEWS
  return (
    <div className="popup-overlay" onClick={onClose}>
      {showAlert && (
        <AlertPopup text="Copied to clipboard!" onClose={closeAlert} />
      )}
      {/* Container for popup content */}
      <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Popup content */}
        <div className="popup-content min-w-72 sm:min-w-96">
          <div className="flex w-full mb-3 justify-between">
            <h2 className="text-offwhite text-xl sm:text-2xl">Connect with</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {connectionOptions.map((option) => (
              <div key={option.value} className="relative">
                <a
                  className={`flex flex-col w-full items-center cursor-pointer pt-5 pb-3 mb-2 mt-4 rounded-xl bg-primary ring-1 ring-stroke hover:bg-secondary
                  ${selectedOption === option.value}`}
                  onClick={() => handleOptionChange(option.value)}
                >
                  <div className="mb-2">{option.icon}</div>
                </a>
                <div className="absolute w-full text-center text-xs sm:text-sm text-offwhite">
                  {option.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex mt-12 mb-3 justify-between">
              <h2 className="text-offwhite text-base sm:text-lg">
                Copy page link
              </h2>
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-full text-xs sm:text-sm text-offwhite bg-primary ring-1 ring-stroke py-4 pl-4 pr-12 rounded-xl truncate"
                value={currentUrl}
                readOnly
              />
              <a
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={handleCopyToClipboard}
              >
                <Copy color="#555557" />
              </a>
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer mt-5 place-self-center bg-stroke bg-opacity-25 p-2 rounded-full focus:bg-opacity-30 hover:bg-opacity-30"
          onClick={onClose}
        >
          <X color="#555557" size={24} />
        </div>
      </div>
    </div>
  );
};

export default ConnectPopup;
