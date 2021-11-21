import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserData,
  SelectUpdateUsername,
  SelectupdateUserPassword,
  GetUpdateUserData,
} from "../redux/user/userslice";
import axios from "axios";

const Modal = ({ open, setOpen, action, userId }) => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [error, setErrorMessage] = useState("");

  const userNameToupdate = useSelector(SelectUpdateUsername);
  const userPasswordToupdate = useSelector(SelectupdateUserPassword);

  const usernameField = useRef(null);
  const userpasswordField = useRef(null);

  useEffect(() => {
    if (open === false) {
      if (action === "Add") {
        setUserName("");
        setUserpassword("");
        setErrorMessage("");
      }
    } else {
      if (action === "Edit") {
        dispatch(GetUpdateUserData({ userId }));
        setUserName(userNameToupdate);
        setUserpassword(userPasswordToupdate);

        if(usernameField.current !=null){
            usernameField.current.defaultValue = userNameToupdate;
        }

        if(userpasswordField.current !=null){
            userpasswordField.current.defaultValue = userPasswordToupdate;
        }
        
      }
    }
  }, [open, action, userId, dispatch, userNameToupdate, userPasswordToupdate]);


  const UserOperation = async () => {
    let check = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!check.test(userpassword)) {
      setErrorMessage(
        "Password must be over the length of 8, at least have one uppercase , one lowercase and one number"
      );
    } else {
      if (action === "Add") {
        let existedAccount = false;

        await axios
          .get("http://localhost:3001/checkUserExist", {
            params: { username },
          })
          .then((response) => {
            if (Number(response.data.number) >= 1) {
              existedAccount = true;
            }
          });

        if (!existedAccount) {
          await axios
            .post("http://localhost:3001/addUser", {
              username,
              userpassword,
            })
            .then((response) => {
              console.log(response.data);
            });
          dispatch(GetUserData());
          setOpen(false);
        } else {
          setErrorMessage("user already existed in the System");
        }
      } else if (action === "Edit") {
        await axios
          .put("http://localhost:3001/updateUser", {
            userId,
            username,
            userpassword,
          })
          .then((response) => {
            console.log(response.data);
          });
        dispatch(GetUserData());
        setOpen(false);
      }
    }
  };

  const cancelButtonRef = useRef(null);

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
                      {action === "Edit" ? "update User" : "Add User"}
                    </Dialog.Title>
                    <div className="mt-2 border w-96 rounded-md bg-gray-50">
                      <div className="flex flex-col">
                        <label className="text-md font-semibold ml-2">
                          username
                        </label>
                        <input
                          type="text"
                          placeholder="Enter username"
                          className="border m-2 p-1"
                          onChange={(event) => setUserName(event.target.value)}
                          ref={usernameField}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-md font-semibold ml-2">
                          user password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="border m-2 p-1"
                          onChange={(event) =>
                            setUserpassword(event.target.value)
                          }
                          ref={userpasswordField}
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
                  onClick={() => UserOperation()}
                >
                  {action === "Edit" ? "update User" : "Add user"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
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

export default Modal;
