import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="flex flex-col bg-gray-100 items-center sm:rounded-3xl gap-5 p-10">
            <div>
              <img
                className="w-32 h-32 object-cover rounded-full shadow-md"
                src="https://via.placeholder.com/150"
                alt="Contact Avatar"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl">Ong Ping Ping</h1>
              <p className="text-gray-600">Director of Communications</p>
              <p className="text-gray-600">YTL Cement Berhad</p>
            </div>
            <div className="flex gap-5">
              <button className="w-20 inline-flex items-center justify-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                Save
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Ong Ping Ping</h2>
              <p className="text-gray-600">Director of Communications</p>
              <p className="text-gray-600">YTL Cement Berhad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
