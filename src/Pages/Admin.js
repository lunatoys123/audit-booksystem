import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUserData, SelectUserData } from "../redux/user/userslice";
import axios from "axios";
import Navbar from "../component/navbar";
import Modal from "../component/modal";
const Admin = () => {
  const dispatch = useDispatch();
  const data = useSelector(SelectUserData);

  const [open, setOpen] = useState(false);
  const [action, setaction] = useState("");
  const [UserId, setUserId] = useState("");

  const EditUser = (userId) => {
    setaction("Edit");
    setUserId(userId);
    setOpen(true);
  };

  const deleteUser = async (Userid) => {
    await axios
      .delete("http://localhost:3001/deleteUser", {
        data: { Userid },
      })
      .then((response) => {
        console.log(response.data);
      });

    dispatch(GetUserData());
  };

  useEffect(() => {
    dispatch(GetUserData());
  }, [dispatch]);

  useEffect(()=>{
    document.title="Admin";
  },[])

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-11/12 mx-auto mt-3">
        <h1 className="text-center font-semibold text-red-800 text-3xl">Admin</h1>
        <div className="flex items-end justify-end">
          <button
            className="border text-center text-md w-14 bg-indigo-400 rounded-sm text-white border-gray-300 hover:bg-opacity-60"
            onClick={() => {
              setaction("Add");
              setOpen(true);
            }}
          >
            ADD
          </button>
        </div>
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      User_id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      User password
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Administrator
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Operation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => {
                    return (
                      <tr key={item.uid}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 text-center">
                            {item.uid}
                          </div>
                        </td>
                        <td className="px-3 py-4 overflow-clip">
                          <div className="text-sm text-gray-900 text-center">
                            {item.uname}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 text-center">
                            ****
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 text-center">
                            {item.administrator}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap flex items-center justify-center">
                          <button
                            className="border text-center text-md  w-14 mr-2 border-gray-300 rounded-sm bg-blue-300 text-white hover:bg-opacity-60"
                            onClick={() => {
                              EditUser(item.uid);
                            }}
                          >
                            EDIT
                          </button>
                          <button
                            className="border text-center text-md  w-14 mr-2 border-gray-300 rounded-sm bg-red-300 text-white hover:bg-opacity-60"
                            onClick={() => {
                              deleteUser(item.uid);
                            }}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} action={action} userId={UserId} />
    </>
  );
};

export default Admin;
