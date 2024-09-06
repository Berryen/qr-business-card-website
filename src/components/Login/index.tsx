import React from "react";

export const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-60 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-700"></div>{" "}
          {/* Placeholder for logo */}
          <h2 className="mt-4 text-2xl font-bold text-gray-100">
            Hello, welcome back!
          </h2>
          <p className="mt-2 text-gray-400">
            First time here?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up for free
            </a>
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 text-gray-200 placeholder-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-stroke"
              placeholder="Your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 text-gray-200 placeholder-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-stroke"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-black bg-white rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stroke"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            You acknowledge that you read, and agree to, our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
