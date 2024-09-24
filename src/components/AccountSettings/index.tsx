import "helpers/polyfill";
import React, { useState, useEffect } from "react";
import bg_other from "assets/bg_other.png";
import { usePathname, useSearchParams } from "next/navigation";
import { ProfileInfo } from "./props";
import Head from "next/head";
import { useRouter } from "next/router";
import { fetchStrapiAPI } from "helpers/api";
import { isAuthenticated as clearAuthToken } from "helpers/authUtils";
import Link from "next/link";

// ================= INTERFACES / TYPES
interface ProfileProps {
  profileData: ProfileInfo;
}

export const AccountSettings: React.FC<ProfileProps> = () => {
  // ================= STATE
  const [profileData, setProfileData] = useState<ProfileInfo | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [slug, setSlug] = useState<string>(""); //same as username, just different collection type (Profile)
  const [password, setPassword] = useState(""); //current password
  const [newPassword, setNewPassword] = useState(""); //new password
  const [confirmPassword, setConfirmPassword] = useState(""); //confirm new password
  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();

  // ================= HOOKS
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ================= EVENTS
  const handleLogout = () => {
    clearAuthToken(); // Clear the token from localStorage or cookies
    setIsAuthenticated(false); // Update the state
    router.push("/"); // Redirect to login page
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    let tempErrors = {
      password: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Password validation
    if (!password) {
      tempErrors.password = "Please enter your password.";
      isValid = false;
    }

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword =
        "New password and confirmation password do not match.";
      isValid = false;
    }

    setErrors(tempErrors);

    // Proceed only if validation passes
    if (!isValid) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: password,
            password: newPassword,
            passwordConfirmation: confirmPassword,
          }),
        }
      );

      // Check if the response was successful
      const data = await res.json();
      if (res.ok) {
        alert("Password changed successfully.");
        router.push(`/profile/${slug}/account`);
      } else {
        const errorMessage =
          data?.error?.message ||
          data?.message?.[0]?.messages?.[0]?.message ||
          "An unexpected error occurred.";
        setGlobalError(errorMessage);
      }
    } catch (err) {
      setGlobalError("An unexpected error occurred. Please try again.");
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

        // Use pathname or searchParams to extract username
        const pathSegments = pathname?.split("/") || [];
        const usernameFromPathname =
          pathSegments.length > 1
            ? pathSegments[pathSegments.length - 2]
            : null;
        const usernameFromSearchParams = searchParams?.get("username");

        const username = usernameFromPathname || usernameFromSearchParams;

        if (!username) {
          throw new Error("Slug not found in pathname or searchParams");
        }

        // must use profiles instead of users
        // configuration made in strapi to get profiles by slug/username
        // users still gets by id
        const { data } = await fetchStrapiAPI(`/profiles/${username}`, {
          populate: "*",
        });

        setProfileData(data);

        // Prefill form inputs with fetched data
        setSlug(data.attributes.slug);
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
      <form onSubmit={handleSubmit}>
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
                  <p className="text-offwhite">Account Settings</p>
                </div>
                {/* <ChevronDown className="w-6 h-6 ml-auto" color="#555557" /> */}
              </div>
            </div>

            {/* Second column, empty or customizable */}
            <div className="w-4/5 border-l border-stroke"></div>
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
              <Link
                href={`/profile/${slug}/edit-connections`}
                className="text-left p-4 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200"
              >
                <button type="button">Connect Links</button>
              </Link>
              <button
                type="button"
                className="bg-primarybutton text-left p-4 rounded-2xl ring-1 ring-stroke hover:bg-primarybutton transition duration-200"
              >
                Change Password
              </button>
              <div className="flex-grow"></div>
              <Link
                href={`/profile/${slug}/home`}
                className="text-left p-4 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200"
              >
                <button type="button">Back to home</button>
              </Link>
              <div className="text-left p-4 rounded-2xl hover:ring-1 hover:ring-stroke hover:bg-primarybutton transition duration-200">
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-10 w-4/5 m-10">
              <div className="flex flex-col space-y-10">
                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="bg-primary rounded-xl px-4 py-4 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2"></div>
                </div>

                <div className="flex flex-row space-x-10">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      className="bg-primary rounded-xl px-4 py-4 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="bg-primary rounded-xl px-4 py-4 focus:outline-none ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
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
    </div>
  );
};
