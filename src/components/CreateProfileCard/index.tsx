import React, { useState } from "react";
import bg_other from "assets/bg_other.png";
import clsx from "clsx";
import { ChevronDown } from "react-feather";

export const CreateProfileCard: React.FC = () => {
  // ================= STATE
  const [isCreateButtonVisible, setCreateButtonVisible] = useState(true);
  const [isCreateCardVisible, setCreateCardVisible] = useState(false);

  // ================= EVENTS
  const handleCreateClick = () => {
    setCreateButtonVisible(false);
    setCreateCardVisible(true);
  };

  // ================= VARIABLES
  const buttonClass = clsx(
    "w-full",
    "inline-flex",
    "items-center",
    "justify-center",
    "px-4",
    "py-2",
    "text-base",
    "sm:text-lg",
    "rounded-lg"
  );

  // ================= VIEWS
  return (
    <div
      className="min-h-screen justify-center pb-10 pt-21 sm:pb-12 sm:pt-28 bg-primary bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg_other.src})`,
      }}
    >
      {isCreateButtonVisible && (
        <div className="relative min-h-full min-width max-w-screen md:max-w-xl mx-4 sm:mx-10 md:m-auto sm:p-10 bg-secondary ring-1 ring-stroke sm:rounded-2xl">
          <div className="w-full flex gap-5">
            <button
              className={`bg-primarybutton ring-1 ring-stroke text-offwhite ex1 ${buttonClass}`}
              onClick={handleCreateClick}
            >
              Create card +
            </button>
          </div>
        </div>
      )}
      {isCreateCardVisible && (
        <div className="flex flex-col max-w-screen m-14 bg-secondary ring-1 ring-stroke rounded-2xl">
          <div className="flex flex-row items-center justify-between p-4 text-offwhite bg-primary rounded-2xl">
            <div className="flex flex-row items-center justify-between w-72 p-4 rounded-2xl ring-1 ring-stroke bg-primarybutton">
              <div className="flex flex-row items-center justify-between space-x-4">
                <div className="w-14 h-14 rounded-xl bg-stroke"></div>
                <p className="font-medium text-offwhite">Create Card</p>
              </div>
              <ChevronDown className="w-6 h-6" color="#555557" />
            </div>
          </div>
          <div className="flex flex-row items-start justify-between p-4 text-offwhite ring-1 ring-stroke rounded-b-2xl">
            <div className="flex flex-col space-y-4 mr-8">
              <button className="bg-primarybutton text-left w-72 px-4 py-4 rounded-xl ring-1 ring-stroke hover:bg-primarybutton transition duration-200\">
                Profile Information
              </button>
              <span className="text-offwhite p-4">Connect Links</span>
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex flex-col space-y-2">
                <label htmlFor="username" className="font-bold">
                  Username*
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                  value=""
                  // onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="displayName" className="font-bold">
                  Display Name*
                </label>
                <input
                  type="text"
                  id="displayName"
                  className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                  value=""
                  // onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-bold">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                  value=""
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="company" className="font-bold">
                  Company*
                </label>
                <input
                  type="text"
                  id="company"
                  className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                  value=""
                  // onChange={(e) => setCompany(e.target.value)
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="jobTitle" className="font-bold">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                  value=""
                  // onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="countryCode" className="font-bold">
                    Country Code
                  </label>
                  <input
                    type="text"
                    id="countryCode"
                    className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setCountryCode(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="mobileNumber" className="font-bold">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
