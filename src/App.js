import React from "react";

const App = () => {
  return (
    <div className="bg-white w-screen h-screen flex">
      <div className="bg-gray-100 bg-opacity-50 m-auto items-center w-2/5 h-auto border border-gray-400 rounded-lg">
        <div className="flex flex-col w-3/5 h-auto justify-center mx-auto">
          <p className="flex justify-center text-3xl font-medium m-3 text-center">
            Audit Commission Book System
          </p>
          <div className="w-auto mx-auto text-center">
            <input
              type="text"
              aria-label="Please enter your username"
              placeholder="username"
              className="text-sm text-grey-base w-4/5 m-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />
            <input
              type="password"
              placeholder="password"
              aria-label="Please enter your password"
              className="text-sm text-grey-base w-4/5 m-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />
            <div className="flex flex-col justify-center">
              <button
                type="button"
                className="bg-blue-400 w-1/2 text-white p-2 rounded mx-auto m-3"
              >
                Admin Login
              </button>
              <p className="mb-3 font-normal">Not An Admin? press here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
