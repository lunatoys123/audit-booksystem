import React, { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import axios from "axios";

let moment = require("moment");

const ReturnModal = ({
  open,
  setOpen,
  BorrowBookComputerNo,
  DueDate,
  EmployeeName,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const LoginUser = localStorage.getItem("LoginUser");

  const EmailField = useRef(null);
  const cancelButtonRef = useRef(null);
  const SendReminder = async () => {
    if (email === "") {
      setError("Email cannot be Empty");
    } else {
      let sendEmail = true;
      let regex = new RegExp("[a-z0-9]+@aud.gov.hk");
      if (regex.test(email)) {
        await axios
          .post("http://localhost:3002/SendEmail", {
            email,
            BorrowBookComputerNo,
            DueDate: moment(DueDate).format("DD/MM/YYYY"),
            EmployeeName,
          })
          .then((response) => {
            if (response.status !== 200) {
              sendEmail = false;
            }
            console.log(response);
          });

        if (sendEmail) {
          await axios.post("http://localhost:3001/AddLog", {
            EmployeeName,
            ComputerNo: BorrowBookComputerNo,
            LoginUser,
            log:"Send Reminder"
          });

          setOpen(false);
        }
      } else {
        setError("Email Format not match the requirement");
      }
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Send Reminder
                    </Dialog.Title>
                    <div className="mt-2 border w-96 rounded-md bg-gray-50">
                      <div className="flex flex-col">
                        <label className="text-md font-semibold ml-2">
                          Email (Format : xxxx@aud.gov.hk)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          className="border m-2 p-1"
                          onChange={(event) => setEmail(event.target.value)}
                          onFocus={() => setError("")}
                          ref={EmailField}
                        />
                      </div>
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => SendReminder()}
                >
                  Send Reminder
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  ref={cancelButtonRef}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReturnModal;
