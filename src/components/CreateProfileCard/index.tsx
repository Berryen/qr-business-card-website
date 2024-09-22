import React, { useState, useEffect } from "react";
import bg_other from "assets/bg_other.png";
import clsx from "clsx";
import { ChevronDown } from "react-feather";
import Head from "next/head";
import { useRouter } from "next/router";
import { fetchStrapiAPI } from "helpers/api";
import logo_fyp from "assets/logo_fyp.png";
import { ProfileInfo } from "./props";
import {
  isAuthenticated as checkAuth,
  getAuthToken,
  getAuthenticatedUser,
  clearAuthToken,
} from "helpers/authUtils";

// ================= INTERFACES / TYPES
interface ProfileProps {
  profileData: ProfileInfo;
}

export const CreateProfileCard: React.FC<ProfileProps> = () => {
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

  // ================= STATE
  const [isCreateButtonVisible, setCreateButtonVisible] = useState(true);
  const [isCreateCardVisible, setCreateCardVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [countryCodeMobile, setCountryCodeMobile] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCodeOffice, setCountryCodeOffice] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");
  const [extensionNumber, setExtensionNumber] = useState("");
  const [profileData, setProfileData] = useState<any>(null);
  const [globalError, setGlobalError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();
  const logo = logo_fyp.src;

  // ================= EVENTS
  const handleCreateClick = () => {
    setCreateButtonVisible(false);
    setCreateCardVisible(true);
  };
  const handleLogout = () => {
    clearAuthToken(); // Clear the token from localStorage or cookies
    setIsAuthenticated(false); // Update the state
    router.push("/"); // Redirect to login page
  };
  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authenticatedUserId = getAuthenticatedUser();

    try {
      // Prepare data to send to Strapi
      const profileData = {
        data: {
          profilePhoto: 1,
          name: displayName,
          slug: username.toLowerCase().replace(/\s+/g, "-"), // Create slug from username
          email,
          jobTitle,
          company,
          location,
          countryCodeMobile,
          mobileNumber,
          countryCodeOffice,
          officeNumber,
          extensionNumber,
          users: authenticatedUserId,
        },
      };

      // Send the data to Strapi API using fetch
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/profiles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );
      console.log("pf2" + JSON.stringify(profileData));

      // Parse the response
      const data = await res.json();

      if (res.ok) {
        // Success: Profile created
        alert("Profile created successfully!");

        // Optionally redirect user to their profile page
        router.push(`/profile/${username}/home`);
      } else {
        // Handle errors
        console.error("Failed to create profile:", data);
        setGlobalError(
          "Profile creation failed. Please check your inputs and try again."
        );
      }
    } catch (err) {
      console.error("Error submitting profile form:", err);
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  };

  // ================= EFFECTS
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const usernameQuery = router.query.username;

        // Check if `usernameQuery` is an array or a string
        if (!usernameQuery) {
          throw new Error("Logged in user's username not found");
        }

        const username = Array.isArray(usernameQuery)
          ? usernameQuery[0]
          : usernameQuery;

        setUsername(username); // Set the username in the input field
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // router.push(`/profile/${router.query.username}/create`); // Redirect to create page if needed
      }
    };

    if (router.isReady) {
      fetchProfileData();
    }
  }, [router]);

  // ================= VIEWS
  return (
    <div
      className="min-h-screen justify-center py-1 bg-primary bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg_other.src})`,
      }}
    >
      <Head>
        <title>Create Profile Card</title>
      </Head>
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
        <form onSubmit={handleFormSubmit}>
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
                <button className="text-left p-4 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200">
                  Connect Links
                </button>
              </div>
              <div className="flex flex-col space-y-10 w-4/5 m-10">
                <div className="flex flex-col space-y-10 pb-16">
                  <div className="flex flex-row space-x-10">
                    <div className="flex flex-col space-y-2 w-1/2">
                      <label htmlFor="username">Username*</label>
                      <input
                        type="text"
                        id="username"
                        className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                        value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                        readOnly
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-2 w-1/2">
                      <label htmlFor="displayName">Display Name*</label>
                      <input
                        type="text"
                        id="displayName"
                        className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-2 w-1/2"></div>
                  </div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="company">Company*</label>
                    <input
                      type="text"
                      id="company"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="jobTitle">Job Title*</label>
                    <input
                      type="text"
                      id="jobTitle"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>
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
                    <label htmlFor="location">Location*</label>
                    <input
                      type="text"
                      id="location"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2"></div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="countryCode">Country Code (Mobile)</label>
                    <input
                      type="text"
                      id="countryCode"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={countryCodeMobile}
                      onChange={(e) => setCountryCodeMobile(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="countryCode">Country Code (Work)</label>
                    <input
                      type="text"
                      id="countryCode"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={countryCodeOffice}
                      onChange={(e) => setCountryCodeOffice(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="officeNumber">Office Number</label>
                    <input
                      type="tel"
                      id="officeNumber"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={officeNumber}
                      onChange={(e) => setOfficeNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="extensionNumber">
                      Office Extension Number
                    </label>
                    <input
                      type="tel"
                      id="extensionNumber"
                      className="bg-secondary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={extensionNumber}
                      onChange={(e) => setExtensionNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2"></div>
                </div>
                <div className="flex flex-row space-x-10 justify-between">
                  <div className="flex flex-col w-1/2"></div>
                  <div className="flex flex-col mt-10 w-36">
                    <button
                      type="submit"
                      className="px-4 py-3 text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="flex flex-col mt-10 w-36">
                    <button
                      className="px-4 py-3 text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
