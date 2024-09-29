import React, { useState, useEffect } from "react";
import bg_other from "assets/bg_other.png";
import clsx from "clsx";
import { ChevronDown, Camera } from "react-feather";
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
import Link from "next/link";

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

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
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
  const [profileData, setProfileData] = useState<any>(null);
  const [globalError, setGlobalError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvPreviewURL, setCvPreviewURL] = useState<string | null>(null);

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

  const uploadProfilePhoto = async (photoFile: File) => {
    const formData = new FormData();
    formData.append("files", photoFile);

    const uploadRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const uploadData = await uploadRes.json();

    if (uploadRes.ok && uploadData.length > 0) {
      return uploadData[0].id; // Return the ID of the uploaded file
    } else {
      throw new Error("Image upload failed");
    }
  };

  const uploadCv = async (cvFile: File) => {
    const formData = new FormData();
    formData.append("files", cvFile);

    const uploadRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const uploadData = await uploadRes.json();

    if (uploadRes.ok && uploadData.length > 0) {
      return uploadData[0].id; // Return the ID of the uploaded CV
    } else {
      throw new Error("CV upload failed");
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authenticatedUserId = getAuthenticatedUser();

    try {
      let profilePhotoId = null;
      let cvFileId = null;

      if (profilePhoto) {
        profilePhotoId = await uploadProfilePhoto(profilePhoto);
      }

      if (cvFile) {
        cvFileId = await uploadCv(cvFile);
      }
      // Prepare data to send to Strapi
      const profileData = {
        data: {
          profilePhoto: profilePhotoId,
          cv: cvFileId,
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
              <div className="w-4/5 border-l border-stroke place-content-center">
                <p className="text-offwhite text-lg font-semibold pl-5">
                  Create Profile Card
                </p>
                <p className="text-offwhite pt-2 pl-5">
                  Create a personal card unique to you The information you
                  provide will be displayed on your profile card.
                </p>
              </div>
            </div>

            <div className="flex-grow flex flex-row text-offwhite rounded-b-2xl">
              {/* Side navigation bar */}
              <div className="flex flex-col w-1/6 p-12 bg-primary space-y-2 border-r border-stroke rounded-bl-2xl">
                <button className="bg-primarybutton text-left p-4 rounded-2xl ring-1 ring-stroke hover:bg-primarybutton transition duration-200">
                  Card Information
                </button>
                <div className="flex-grow"></div>
                <div className="text-left p-4 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200">
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-10 w-4/5 m-10">
                <div className="flex flex-col space-y-10 pb-16">
                  <div className="flex flex-row space-x-10">
                    {/* <div className="flex flex-col space-y-2 w-1/2">
                      <label htmlFor="profilePhoto">Profile Picture</label>
                      <input
                        type="file"
                        id="profilePhoto"
                        className="w-32 h-32 bg-primary object-cover rounded-full cursor-pointer hover:opacity-80"
                        onChange={(e) =>
                          setProfilePhoto(e.target.files?.[0] || null)
                        }
                        required
                      />
                    </div> */}
                    <div className="flex flex-col space-y-2 w-1/2">
                      <label htmlFor="profilePhoto">
                        <div className="relative">
                          <input
                            type="file"
                            id="profilePhoto"
                            className="hidden" // Hide the input
                            onChange={(e) =>
                              setProfilePhoto(e.target.files?.[0] || null)
                            }
                            required
                          />
                          <div className="w-32 h-32 bg-primary object-cover rounded-full flex items-center justify-center cursor-pointer hover:opacity-80">
                            <Camera color="#555557" className="w-6 h-6" />
                            {/* Increase icon size if needed */}
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col space-y-2 w-1/2">
                      <label htmlFor="cv">CV / Resume</label>
                      <input
                        type="file"
                        id="cv"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setCvFile(file);

                          if (file) {
                            setCvPreviewURL(URL.createObjectURL(file)); // Create a local URL for preview
                          } else {
                            setCvPreviewURL(null); // Reset preview if no file is selected
                          }
                        }}
                        accept=".pdf, .doc, .docx" // Accept PDF and Word documents
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById("cv")?.click()}
                        className="bg-primary text-offwhite text-left rounded-xl px-4 py-4 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke hover:bg-secondary"
                      >
                        {cvFile ? cvFile.name : "Choose File"}
                      </button>
                      {cvPreviewURL && (
                        <a
                          href={cvPreviewURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Preview CV
                        </a>
                      )}
                      {!cvFile && profileData?.attributes.cv.data && (
                        <p className="text-offgray">
                          Current CV:{" "}
                          {profileData.attributes.cv.data.attributes.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row space-x-10">
                    <div className="flex flex-col space-y-2 w-1/2">
                      <label htmlFor="username">Username*</label>
                      <input
                        type="text"
                        id="username"
                        className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
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
                        className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
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
                        className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
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
                      className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
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
                      className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
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
                      className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2"></div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2 relative">
                    <label htmlFor="countryCodeMobile">
                      Country Code (Mobile)
                    </label>
                    <select
                      id="countryCodeMobile"
                      className="bg-primary rounded-xl px-4 py-4 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke appearance-none"
                      value={countryCodeMobile}
                      onChange={(e) => setCountryCodeMobile(e.target.value)}
                    >
                      <option value="">Select Country Code</option>
                      <option value="Malaysia (60)">Malaysia (60)</option>
                      <option value="Singapore (65)">Singapore (65)</option>
                      <option value="Vietnam (84)">Vietnam (84)</option>
                    </select>
                    <div className="absolute inset-y-0 pt-6 right-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-6 h-6" color="#555557" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2 relative">
                    <label htmlFor="countryCode">Country Code (Work)</label>
                    <select
                      id="countryCode"
                      className="bg-primary rounded-xl px-4 py-4 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke appearance-none"
                      value={countryCodeOffice}
                      onChange={(e) => setCountryCodeOffice(e.target.value)}
                    >
                      <option value="">Select Country Code</option>
                      <option value="Malaysia (60)">Malaysia (60)</option>
                      <option value="Singapore (65)">Singapore (65)</option>
                      <option value="Vietnam (84)">Vietnam (84)</option>
                    </select>
                    <div className="absolute inset-y-0 pt-6 right-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-6 h-6" color="#555557" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="officeNumber">Office Number</label>
                    <input
                      type="tel"
                      id="officeNumber"
                      className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={officeNumber}
                      onChange={(e) => setOfficeNumber(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="extensionNumber">
                      Office Extension Number
                    </label>
                    <input
                      type="tel"
                      id="extensionNumber"
                      className="bg-primary rounded-xl px-4 py-3 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={extensionNumber}
                      onChange={(e) => setExtensionNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2"></div>
                </div> */}
                <div className="flex flex-grow"></div>
                <div className="flex flex-col place-self-end mt-10 w-36">
                  <button
                    type="submit"
                    className="px-4 py-3 text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
