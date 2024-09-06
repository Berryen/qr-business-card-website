import React, { useEffect, useState } from "react";
import bg_login from "assets/bg_login.png";

export const Login: React.FC = () => {
  // ================= STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // ================= EVENTS
  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      tempErrors.email = "Please enter your email.";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Please enter your password.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (handleValidation(e)) {
      // proceed with form submission
      console.log("Form is valid");
    }
  };

  // ================= VIEWS
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg_login.src})`,
      }}
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
            <a href="#" className="text-offwhite hover:underline">
              Sign up for free
            </a>
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
              placeholder="Your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-medium text-primary bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
            >
              Sign in
            </button>
          </div>
        </form>
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
    </div>
  );
};
