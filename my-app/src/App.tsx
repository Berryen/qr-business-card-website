import React, { useState } from "react";
import "./App.css";
import {
  Share2,
  Send,
  Smartphone,
  Phone,
  Briefcase,
  MapPin,
} from "react-feather";
// import Smartphone from "./asset/smartphone.svg";

const App = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const handleShareClick = () => {
    setPopupVisibility(!isPopupVisible);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-5 sm:py-10 justify-center">
      <div className="relative max-w-screen md:max-w-2xl mx-5 sm:mx-10 md:m-auto p-5 sm:p-10 bg-white shadow-lg rounded-3xl">
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
              <h1 className="text-xl sm:text-2xl">Ong Ping Ping</h1>
              <p className="text-base sm:text-lg text-gray-600">
                Director of Communications
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                YTL Cement Berhad
              </p>
            </div>
            <div className="w-full flex gap-5 pt-5">
              <button className="w-full inline-flex items-center justify-center px-4 py-2 text-base sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                Save Contact
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 text-base sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                Connect
              </button>
            </div>
          </div>
        </div>
        {/* Popup */}
        {isPopupVisible && (
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
                onClick={handleShareClick}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col mx-5 mb-7">
          <div>
            <h2 className="text-xl sm:text-2xl mb-2">About</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Happy to assist with your...
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
              text: "pingping.ong@ytlcement.com.my",
            },
            { icon: <Smartphone color="#4b5563" />, text: "(60) 12 203 8888" },
            {
              icon: <Phone color="#4b5563" />,
              text: "(60) 3 2038 0888 ext 8888",
            },
            {
              icon: <Briefcase color="#4b5563" />,
              text: "YTL Cement Shared Services Sdn Bhd",
            },
            {
              icon: <MapPin color="#4b5563" />,
              text: "26th Floor Menara YTL, Kuala Lumpur",
            },
          ].map((item, index) => (
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
  );
};

export default App;
