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
      className="min-h-screen justify-center py-1 bg-primary bg-cover bg-center"
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
        <div className="flex flex-col min-w-screen min-h-[89vh] m-14 bg-secondary ring-1 ring-stroke rounded-2xl">
          <div className="flex flex-row text-offwhite bg-primary rounded-t-2xl border-b border-stroke">
            {/* First column with Create Card + Chevron */}
            <div className="p-4 w-1/6">
              <div className="flex flex-row items-center p-4 rounded-2xl ring-1 ring-stroke bg-primarybutton">
                <div className="flex flex-row items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-stroke"></div>
                  <p className="text-offwhite">Create Card</p>
                </div>
                <ChevronDown className="w-6 h-6 ml-auto" color="#555557" />
              </div>
            </div>

            {/* Second column, empty or customizable */}
            <div className="w-4/5 border-l border-stroke"></div>
          </div>

          <div className="flex-grow flex flex-row text-offwhite rounded-b-2xl">
            {/* Side navigation bar */}
            <div className="flex flex-col w-1/6 p-12 bg-primary space-y-2 border-r border-stroke rounded-bl-2xl">
              <button className="bg-primarybutton text-left p-4 rounded-2xl ring-1 ring-stroke hover:bg-primarybutton transition duration-200">
                Profile Information
              </button>
              <button className="text-left p-5 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200">
                Connect Links
              </button>
            </div>
            <div className="flex flex-col space-y-10 w-4/5 m-10">
              <div className="flex flex-row space-x-10">
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="username">Username*</label>
                  <input
                    type="text"
                    id="username"
                    className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="displayName">Display Name*</label>
                  <input
                    type="text"
                    id="displayName"
                    className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row space-x-10">
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="jobTitle">Job Title*</label>
                  <input
                    type="text"
                    id="jobTitle"
                    className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-10">
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="company">Company*</label>
                  <input
                    type="text"
                    id="company"
                    className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setCompany(e.target.value)
                  />
                </div>
                <div className="flex flex-col space-y-2 w-1/2"></div>
              </div>
              {/* <div className="flex flex-col space-y-2">
                <label htmlFor="company" >
                  Company*
                </label>
                <input
                  type="text"
                  id="company"
                  className="bg-secondary rounded-xl px-4 py-2 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                  value=""
                  // onChange={(e) => setCompany(e.target.value)
                />
              </div> */}
              <div className="flex flex-row space-x-10">
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="countryCode">Country Code</label>
                  <input
                    type="text"
                    id="countryCode"
                    className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                    value=""
                    // onChange={(e) => setCountryCode(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
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
