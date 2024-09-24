import React, { useEffect, useState } from "react";
import bg_login from "assets/bg_login.png";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

export const Register: React.FC = () => {
  // ================= STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();

  // ================= EVENTS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    let tempErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Username validation
    if (!username) {
      tempErrors.username = "Please enter your username.";
      isValid = false;
    }

    // Email validation
    if (!email) {
      tempErrors.email = "Please enter your email.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      tempErrors.password = "Please enter your password.";
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(tempErrors);

    // Proceed only if validation passes
    if (!isValid) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      // Check if the response was successful
      const data = await res.json();
      if (res.ok) {
        const { jwt, user } = data;

        // Save JWT in localStorage (or you could use cookies)
        localStorage.setItem("token", jwt);

        // Redirect to the user's profile
        router.push(`/profile/${user.username}/home`);
      } else {
        const errorMessage =
          data?.error?.message ||
          data?.message?.[0]?.messages?.[0]?.message ||
          "An unexpected error occurred.";

        if (
          errorMessage.includes("Email") ||
          errorMessage.includes("Username")
        ) {
          setErrors({
            ...errors,
            email: errorMessage,
            username: errorMessage,
          });
        } else {
          setErrors({
            ...errors,
            password: errorMessage,
          });
        }
        setGlobalError(errorMessage); // Set the error globally
      }
    } catch (err) {
      setGlobalError("An unexpected error occurred. Please try again.");
    }
    //     // Log error data for debugging
    //     console.error("Error response data:", data);

    //     const errorMessage =
    //       data?.error?.message ||
    //       data?.message?.[0]?.messages?.[0]?.message ||
    //       "An unexpected error occurred.";

    //     if (
    //       errorMessage.includes("Email") ||
    //       errorMessage.includes("Username")
    //     ) {
    //       setErrors({ ...errors, email: errorMessage, password: errorMessage });
    //     } else {
    //       setErrors({ ...errors, password: errorMessage });
    //     }
    //   }
    // } catch (err) {
    //   console.error("Network or unexpected error:", err);
    //   setErrors({
    //     ...errors,
    //     password: "An unexpected error occurred. Please try again.",
    //   });
    // }
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
              Hello, welcome!
            </h2>
            <p className="mt-2 text-xs text-offgray">
              Already have an account?{" "}
              <Link href="/" className="text-offwhite hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" }); // Clear error when typing
                }}
                className={`w-full px-4 py-3 text-offwhite placeholder-offgray bg-primary rounded-xl focus:outline-none ${
                  errors.email
                    ? "ring-2 ring-red-500"
                    : "ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                }`}
                placeholder="Email"
              />
              {/* {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )} */}
            </div>
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
                className={`w-full px-4 py-3 text-offwhite placeholder-offgray bg-primary rounded-xl focus:outline-none ${
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
                className={`w-full px-4 py-3 text-offwhite placeholder-offgray bg-primary rounded-xl focus:outline-none ${
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
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: "" }); // Clear error when typing
                }}
                className={`w-full px-4 py-3 text-offwhite placeholder-offgray bg-primary rounded-xl focus:outline-none ${
                  errors.confirmPassword
                    ? "ring-2 ring-red-500"
                    : "ring-1 ring-stroke focus:ring-2 focus:ring-stroke"
                }`}
                placeholder="Confirm password"
              />
              {/* {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )} */}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-medium text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
              >
                Register
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
