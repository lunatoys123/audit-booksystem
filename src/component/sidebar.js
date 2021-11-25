import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
const Sidebar = ({ PanelButtons, setPanelButtons }) => {
  const [SideBarOpen, setSidebarOpen] = useState(true);

  const SideBarButton = (event) => {
    let newArray = [];
    PanelButtons.map((item) => {
      if (item.name === event.target.innerText) {
        newArray.push({ name: item.name, current: true });
      } else if (item.current) {
        newArray.push({ name: item.name, current: false });
      } else {
        newArray.push(item);
      }

      return null;
    });
    setPanelButtons(newArray);
  };
  return (
    <div className="flex flex-col">
      {SideBarOpen === false && (
        <div
          className="flex border h-screen w-max bg-gray-100 items-center hover:cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <ArrowRightIcon className="w-5 h-5" />
        </div>
      )}
      <div
        className={`${
          SideBarOpen ? "" : "hidden"
        } h-screen bg-gray-100 border rounded-sm `}
      >
        <div className="flex flex-col mt-10">
          <button
            className="w-max p-3 border border-gray-300 content-start "
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-md font-bold text-center">
            Audit Commission Book System
          </h1>
        </div>
        <nav className="mt-10">
          {PanelButtons.map((item) => {
            return (
              <button
                key={item.name}
                className={`${
                  item.current
                    ? `flex items-center mt-5 py-2 px-8  border-r-4 bg-gray-200 text-gray-700 border-gray-700 w-full`
                    : `flex items-center mt-5 py-2 px-8 text-gray-600 border-r-4 border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700 w-full`
                }`}
                onClick={(event) => SideBarButton(event)}
              >
                <span className="font-medium mx-auto">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
