import "helpers/polyfill";
import React, { useState, useEffect } from "react";
import bg_other from "assets/bg_other.png";
import { usePathname, useSearchParams } from "next/navigation";
import { ProfileInfo } from "./props";
import Head from "next/head";
import { useRouter } from "next/router";
import { fetchStrapiAPI } from "helpers/api";
import logo_fyp from "assets/logo_fyp.png";
import { isAuthenticated as clearAuthToken } from "helpers/authUtils";
import { motion } from "framer-motion";
import Link from "next/link";

// ================= INTERFACES / TYPES
interface ProfileProps {
  profileData: ProfileInfo;
}

export const EditConnectLinks: React.FC<ProfileProps> = () => {
  const router = useRouter();

  // ================= STATE
  const [profileData, setProfileData] = useState<ProfileInfo | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // Controlled form states for user input
  const [displayName, setDisplayName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [countryCodeMobile, setCountryCodeMobile] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCodeOffice, setCountryCodeOffice] = useState<string>("");
  const [officeNumber, setOfficeNumber] = useState<string>("");
  const [extensionNumber, setExtensionNumber] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState("");
  const [displayOnProfile, setDisplayOnProfile] = useState(true);

  // ================= HOOKS
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const logo = logo_fyp.src;

  // ================= EVENTS
  const handleLogout = () => {
    clearAuthToken(); // Clear the token from localStorage or cookies
    setIsAuthenticated(false); // Update the state
    router.push("/"); // Redirect to login page
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch the profile by slug to get the profile ID
      const fetchProfileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/profiles?filters[slug][$eq]=${profileData?.attributes.slug}`
      );
      const fetchProfileData = await fetchProfileResponse.json();

      // Assuming the profile exists, extract the profile ID
      const profileId = fetchProfileData.data[0]?.id;

      if (!profileId) {
        throw new Error("Profile not found");
      }

      // Now that you have the profile ID, update the profile
      const updatedProfile = {
        name: displayName,
        slug,
        email,
        company,
        jobTitle,
        location,
        countryCodeMobile,
        mobileNumber,
        countryCodeOffice,
        officeNumber,
        extensionNumber,
        linkedIn,
      };

      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/profiles/${profileId}`,
        {
          method: "PUT",
          body: JSON.stringify({ data: updatedProfile }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update profile");
      }
      console.log(JSON.stringify({ data: updatedProfile }));

      // Redirect or display success message
      alert("Profile updated successfully!");
      router.push(`/profile/${profileData?.attributes.slug}/edit-connections`);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // ================= EFFECTS
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!pathname) {
          throw new Error("Pathname is null or undefined.");
        }

        // Use pathname or searchParams to extract slug
        const pathSegments = pathname?.split("/") || [];
        const slugFromPathname =
          pathSegments.length > 1
            ? pathSegments[pathSegments.length - 2]
            : null;
        const slugFromSearchParams = searchParams?.get("slug");

        const slug = slugFromPathname || slugFromSearchParams;

        if (!slug) {
          throw new Error("Slug not found in pathname or searchParams");
        }

        const { data } = await fetchStrapiAPI(`/profiles/${slug}`, {
          populate: "*",
        });

        setProfileData(data);

        // Prefill form inputs with fetched data
        setDisplayName(data.attributes.name || "");
        setSlug(data.attributes.slug || "");
        setEmail(data.attributes.email || "");
        setCompany(data.attributes.company || "");
        setJobTitle(data.attributes.jobTitle || "");
        setLocation(data.attributes.location || "");
        setCountryCodeMobile(data.attributes.countryCodeMobile || "");
        setMobileNumber(data.attributes.mobileNumber || "");
        setCountryCodeOffice(data.attributes.countryCodeOffice || "");
        setOfficeNumber(data.attributes.officeNumber || "");
        setExtensionNumber(data.attributes.extensionNumber || "");
        setLinkedIn(data.attributes.linkedIn || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [pathname, searchParams]);

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
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col min-w-screen min-h-[89vh] m-14 bg-secondary ring-1 ring-stroke rounded-2xl">
          <div className="flex flex-row text-offwhite bg-primary rounded-t-2xl border-b border-stroke">
            {/* First column with Create Card + Chevron */}
            <div className="p-4 w-1/6">
              <div className="flex flex-row items-center p-4 rounded-2xl ring-1 ring-stroke bg-primarybutton">
                <div className="flex flex-row items-center space-x-4">
                  <Link
                    href={`/profile/${slug}/home`}
                    className="w-14 h-14 rounded-xl bg-stroke"
                  ></Link>
                  <p className="text-offwhite">Edit Card</p>
                </div>
                {/* <ChevronDown className="w-6 h-6 ml-auto" color="#555557" /> */}
              </div>
            </div>

            {/* Second column, empty or customizable */}
            <div className="w-4/5 border-l border-stroke place-content-center">
              <p className="text-offwhite text-lg font-semibold pl-5">
                Manage Connections
              </p>
              <p className="text-offwhite pt-2 pl-5">
                When someone clicks the “Connect” button, they will see the
                connections you have chosen to display. Please note that these
                settings do not affect what is shown on your profile card. For
                example, if you disable WhatsApp from being displayed, your
                phone number will still appear on your profile card.
              </p>
            </div>
          </div>

          <div className="flex-grow flex flex-row text-offwhite rounded-b-2xl">
            {/* Side navigation bar */}
            <div className="flex flex-col w-1/6 p-12 bg-primary space-y-2 border-r border-stroke rounded-bl-2xl">
              <Link
                href={`/profile/${slug}/edit-profile`}
                className="text-left p-4 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200"
              >
                <button>Card Information</button>
              </Link>
              <button
                type="button"
                className="bg-primarybutton text-left p-4 rounded-2xl ring-1 ring-stroke hover:bg-primarybutton transition duration-200"
              >
                Connect Links
              </button>
              <Link
                href={`/profile/${slug}/account`}
                className="text-left p-4 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200"
              >
                <button>Change Password</button>
              </Link>
            </div>
            <div className="flex flex-col space-y-10 w-4/5 m-10">
              <div className="flex flex-col space-y-10 pb-16">
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      type="text"
                      id="linkedin"
                      className="bg-secondary rounded-tl-xl rounded-tr-xl mt-2 px-4 py-4 border border-stroke focus:ring-2 focus:ring-stroke"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                    />
                    <div className="flex items-center justify-between px-4 py-4 bg-secondary rounded-bl-xl rounded-br-xl border-b border-l border-r border-stroke">
                      {/* Label for Display Toggle */}
                      <span className="text-offwhite">Display on profile</span>

                      {/* Toggle Switch */}
                      <label
                        htmlFor="display-toggle"
                        className="relative inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="display-toggle"
                          className="sr-only peer"
                          checked={displayOnProfile}
                          onChange={(e) =>
                            setDisplayOnProfile(e.target.checked)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-500"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      type="text"
                      id="linkedin"
                      className="bg-secondary rounded-tl-xl rounded-tr-xl mt-2 px-4 py-4 border border-stroke focus:ring-2 focus:ring-stroke"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                    />
                    <div className="flex items-center justify-between px-4 py-4 bg-secondary rounded-bl-xl rounded-br-xl border-b border-l border-r border-stroke">
                      {/* Label for Display Toggle */}
                      <span className="text-offwhite">Display on profile</span>

                      {/* Toggle Switch */}
                      <label
                        htmlFor="display-toggle"
                        className="relative inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="display-toggle"
                          className="sr-only peer"
                          checked={displayOnProfile}
                          onChange={(e) =>
                            setDisplayOnProfile(e.target.checked)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-500"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      type="text"
                      id="linkedin"
                      className="bg-secondary rounded-tl-xl rounded-tr-xl mt-2 px-4 py-4 border border-stroke focus:ring-2 focus:ring-stroke"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                    />
                    <div className="flex items-center justify-between px-4 py-4 bg-secondary rounded-bl-xl rounded-br-xl border-b border-l border-r border-stroke">
                      {/* Label for Display Toggle */}
                      <span className="text-offwhite">Display on profile</span>

                      {/* Toggle Switch */}
                      <label
                        htmlFor="display-toggle"
                        className="relative inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="display-toggle"
                          className="sr-only peer"
                          checked={displayOnProfile}
                          onChange={(e) =>
                            setDisplayOnProfile(e.target.checked)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-500"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2"></div>
                </div>
              </div>
              <div className="flex flex-row space-x-10 justify-between">
                <div className="flex flex-col w-1/2"></div>
                <div className="flex flex-row space-x-10">
                  <Link
                    href={`/profile/${slug}/home`}
                    className="flex flex-col mt-10 w-36"
                  >
                    <button
                      type="button"
                      className="px-4 py-3 text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
                    >
                      Back to home
                    </button>
                  </Link>
                  <div className="flex flex-col mt-10 w-36">
                    <button
                      type="submit"
                      className="px-4 py-3 text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
                    >
                      Submit
                    </button>
                  </div>
                  {/* <div className="flex flex-col mt-10 w-36">
                      <button
                        type="button"
                        className="px-4 py-3 text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
