import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constant";

const Navbar = () => {
  const history = useHistory();
  const LoginName = localStorage.getItem("LoginUser");

  const GoToAdminPage = () => {
    history.push(ROUTES.AdminPagePath);
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-12">
              <div className="absolute inset-y-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 items-center sm:items-stretch sm:justify-start h-10 sm:flex hidden">
                <div className="flex-shrink-0 flex items-center ">
                  <h1 className="text-white font-medium sm:block hidden">
                    Audit Commission Library System
                  </h1>
                </div>
                <div className="hidden sm:flex sm:ml-6 items-center justify-center">
                  <div className="flex space-x-4">
                    <button
                      className=" hover:bg-gray-700 text-white
                          px-3 py-2 rounded-md text-sm font-medium"
                      onClick={()=>GoToAdminPage()}
                    >
                      Admin
                    </button>
                    <button
                      className=" hover:bg-gray-700 text-white
                          px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Book
                    </button>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <h1 className="text-white">{LoginName}</h1>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button
                as="button"
                className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => GoToAdminPage()}
              >
                Admin
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Book
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
