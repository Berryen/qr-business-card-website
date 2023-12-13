import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/global.css";
import {
  Share2,
  Send,
  Smartphone,
  Phone,
  Briefcase,
  MapPin,
} from "react-feather";
import QrCodePopup from "./QrCodePopup";
import ConnectPopup from "./ConnectPopup";
import clsx from "clsx";

interface ProfileInfo {
  id: number;
  attributes: {
    name: string;
    about: string;
    slug: string;
    domain: string;
    email: string;
    jobTitle: string;
    company: string;
    countryCodeMobile: string;
    countryCodeOffice: string;
    mobileNumber: string;
    officeNumber: string;
    extensionNumber: string;
    location: string;
  };
}

const Profile: React.FC = () => {
  const buttonClass = clsx(
    "w-full",
    "inline-flex",
    "items-center",
    "justify-center",
    "px-4",
    "py-2",
    "text-base",
    "sm:text-lg",
    "text-gray-700",
    "bg-white",
    "border",
    "border-gray-300",
    "rounded-md",
    "shadow-sm",
    "hover:bg-gray-100"
  );

  const [isSharePopupVisible, setSharePopupVisibility] = useState(false);
  const [isConnectPopupVisible, setConnectPopupVisibility] = useState(false);

  const handleShareClick = () => {
    setSharePopupVisibility(!isSharePopupVisible);
  };

  const handleConnectClick = () => {
    setConnectPopupVisibility(!isConnectPopupVisible);
  };

  const headers = { "Content-Type": "application/json" };
  const [profiles, setProfiles] = useState<ProfileInfo[]>([]);
  const { slug } = useParams();

  useEffect(() => {
    fetch("http://localhost:1337/api/profiles", {
      headers,
      method: "GET",
    })
      .then((response) => response.json())
      .then(({ data }) => setProfiles(data))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);

  const profileToDisplay = profiles.find(
    (profile) => profile.attributes.slug === slug
  );

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

  // useEffect(() => {
  //   fetch("http://localhost:1337/api/profiles", {
  //     headers,
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Data from the API:", data);
  //       setProfiles(data.data);
  //     })
  //     .catch((error) => console.error("Error fetching profiles:", error));
  // }, []);

  return (
    <div>
      {profileToDisplay ? (
        <div className="min-h-screen bg-gray-100 py-5 sm:py-10 justify-center">
          <div className="relative min-width max-w-screen md:max-w-2xl mx-5 sm:mx-10 md:m-auto p-5 sm:p-10 bg-white shadow-lg rounded-3xl">
            <div className="flex flex-col bg-gray-100 items-center rounded-3xl gap-5 p-5 mb-7">
              <div
                className="absolute top-11 right-11 sm:top-16 sm:right-16 cursor-pointer"
                onClick={handleShareClick}
              >
                <Share2 color="#4b5563" />
              </div>
              <img
                className="w-32 h-32 object-cover rounded-full shadow-md"
                src="https://via.placeholder.com/150"
                alt="Contact Avatar"
              />
              <div className="w-full divide-y divide-gray-300">
                <div className="flex flex-col items-center pb-5">
                  <h1 className="text-xl sm:text-2xl">
                    {profileToDisplay.attributes.name}
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600">
                    {profileToDisplay.attributes.jobTitle}
                    {/* Director of Communications */}
                  </p>
                  <p className="text-base sm:text-lg text-gray-600">
                    {profileToDisplay.attributes.company}
                  </p>
                </div>
                <div className="w-full flex gap-5 pt-5">
                  <button className={buttonClass}>Save Contact</button>
                  <button className={buttonClass} onClick={handleConnectClick}>
                    Connect
                  </button>
                  {isConnectPopupVisible && (
                    <ConnectPopup onClose={handleConnectClick} />
                  )}
                </div>
              </div>
            </div>
            {/* Popup */}
            {isSharePopupVisible && <QrCodePopup onClose={handleShareClick} />}
            <div className="flex flex-col mx-5 mb-7">
              <div>
                <h2 className="text-xl sm:text-2xl mb-2">About</h2>
                <p className="text-base sm:text-lg text-gray-600">
                  {profileToDisplay.attributes.about}
                </p>
              </div>
            </div>
            {/* <div className="flex flex-col mx-5 divide-y divide-gray-300">
          <div className="inline-flex">
            <div className="px-3">
              <Send color="#4b5563" />
            </div>
            <p className="text-lg text-gray-600 pb-3">
              pingping.ong@ytlcement.com.my
            </p>
          </div>
          <div className="inline-flex">
            <div className="px-3">
              <Smartphone color="#4b5563" />
            </div>
            <p className="text-lg text-gray-600 py-3">(60) 12 203 8888</p>
          </div>
          <div className="inline-flex">
            <div className="px-3">
              <Phone color="#4b5563" />
            </div>
            <p className="text-lg text-gray-600 py-3">
              (60) 3 2038 0888 ext 8888
            </p>
          </div>
          <div className="inline-flex">
            <div className="px-3">
              <Briefcase color="#4b5563" />
            </div>
            <p className="text-lg text-gray-600 py-3">
              YTL Cement Shared Services Sdn Bhd
            </p>
          </div>
          <div className="inline-flex">
            <div className="px-3">
              <MapPin color="#4b5563" />
            </div>
            <p className="text-lg text-gray-600 py-3">
              26th Floor Menara YTL, Kuala Lumpur
            </p>
          </div>
        </div> */}
            <div className="flex flex-col mx-5 divide-y divide-gray-300">
              {[
                {
                  icon: <Send color="#4b5563" />,
                  text: `${profileToDisplay.attributes.slug}${profileToDisplay.attributes.domain}`,
                },
                {
                  icon: <Smartphone color="#4b5563" />,
                  text: `(${getCountryCode(
                    profileToDisplay.attributes.countryCodeMobile
                  )}) ${profileToDisplay.attributes.mobileNumber}`,
                },
                {
                  icon: <Phone color="#4b5563" />,
                  text: profileToDisplay.attributes.officeNumber
                    ? `(${getCountryCode(
                        profileToDisplay.attributes.countryCodeOffice
                      )}) ${profileToDisplay.attributes.officeNumber} ext ${
                        profileToDisplay.attributes.extensionNumber
                      }`
                    : `(${getCountryCode(
                        profileToDisplay.attributes.countryCodeOffice
                      )}) ${profileToDisplay.attributes.extensionNumber}`,
                },
                {
                  icon: <Briefcase color="#4b5563" />,
                  text: profileToDisplay.attributes.company,
                },
                {
                  icon: <MapPin color="#4b5563" />,
                  text: profileToDisplay.attributes.location,
                },
              ]
                .filter((item) => item.text) // Filter out items with empty or falsy text values
                .map((item, index) => (
                  <div key={index} className="inline-flex">
                    <div className="pl-2 pr-4 self-center">{item.icon}</div>
                    <ul className="text-base sm:text-lg text-gray-600 py-3 truncate">
                      {item.text}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Profile not found</p>
      )}
    </div>
  );
};

export default Profile;
