import React, { useEffect, useState } from "react";
import bg_login from "assets/bg_login.png";
import { LoginInfo } from "./props";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

export const Login: React.FC = () => {
  // ================= STATE
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();

  // ================= EVENTS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: username, // Strapi requires 'identifier' for email or username
            password: password,
          }),
        }
      );

      // Check if the response was successful
      const data = await res.json();
      if (res.ok) {
        // Success! Handle the response
        const { jwt, user } = data;

        // Save JWT in localStorage (or you could use cookies)
        localStorage.setItem("token", jwt);

        // Fetch user's profile to check if it exists
        const profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/profiles?filters[slug][$eq]=${user.username}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const profileData = await profileRes.json();
        if (profileData.length === 0) {
          // No profile found, redirect to profile creation
          router.push(`/profile/${user.username}/create`);
        } else {
          // Profile exists, redirect to profile home
          router.push(`/profile/${user.username}/home`);
        }
      } else {
        setGlobalError(data.message[0].messages[0].message);
      }
    } catch (err) {
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  };

  // ================= VIEWS
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-primary bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg_login.src})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }} // Starting state: invisible
        animate={{ opacity: 1 }} // Ending state: fully visible
        transition={{ duration: 1 }} // Duration of the fade-in effect (1 second)
      >
        <div className="w-full max-w-md p-8 space-y-8 rounded-2xl">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-8 shadow-sm rounded-2xl bg-secondary"></div>{" "}
            {/* Placeholder for logo */}
            <h2 className="mt-4 text-2xl font-medium text-offwhite">
              Hello, welcome back!
            </h2>
            <p className="mt-2 text-xs text-offgray">
              First time here?{" "}
              <Link href="/register" className="text-offwhite hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: "" }); // Clear error when typing
                }}
                className={`w-full px-4 py-4 text-offwhite placeholder-offgray bg-primary rounded-xl focus:outline-none ${
                  errors.username
                    ? "ring-2 ring-red-500"
                    : "ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                }`}
                placeholder="Username"
              />
              {/* {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )} */}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" }); // Clear error when typing
                }}
                className={`w-full px-4 py-4 text-offwhite placeholder-offgray bg-primary rounded-xl focus:outline-none ${
                  errors.password
                    ? "ring-2 ring-red-500"
                    : "ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                }`}
                placeholder="Password"
              />
              {/* {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )} */}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-4 font-medium text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
              >
                Sign in
              </button>
            </div>
          </form>
          {globalError && (
            <div className="mt-4 text-sm text-center text-red-500">
              {globalError}
            </div>
          )}
          <div className="mx-16 mt-8 text-center text-xs text-offgray">
            <p>
              You acknowledge that you read, and agree to, our{" "}
              <a href="#" className="text-offwhite hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-offwhite hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
