import React, { useState } from "react";
import axios from "axios";
const Borrowbook = () => {
  const [EmployeeName, setEmployeeName] = useState("");
  const [ComputerNo, setComputerNo] = useState("");
  const [BorrowList, setBorrowList] = useState([]);
  const LoginUser = localStorage.getItem("LoginUser");

  const AddComputerNoToTable = async () => {
    let available = false;
    let title = "";
    let author = "";
    if (ComputerNo === "") {
      alert("Computer No should not be empty");
      return;
    } else if (
      BorrowList.length > 0 &&
      BorrowList.find((borrow) => borrow.ComputerNo === ComputerNo) != null
    ) {
      alert("Book exist in borrow list");
      return;
    }
    await axios
      .get("http://localhost:3001/CheckAvailability", {
        params: { ComputerNo },
      })
      .then((response) => {
        if (response.data.number) {
          available = true;
          title = response.data.title;
          author = response.data.author;
          console.log(response.data);
        }
      });

    if (available) {
      setBorrowList([...BorrowList, { ComputerNo, title, author }]);
    } else {
      alert("Book " + ComputerNo + " is not available. ");
    }
    setComputerNo("");
    window.document.getElementById("ComputerNoField").value = "";
  };

  const DeleteBorrowItem = (ComputerNo) => {
    let newBorrowList = [...BorrowList];
    const BorrowItem = BorrowList.find(
      (borrow) => borrow.ComputerNo === ComputerNo
    );
    const Index = BorrowList.indexOf(BorrowItem);
    newBorrowList.splice(Index, 1);
    setBorrowList(newBorrowList);
  };

  const Borrowbook = async () => {
    if (EmployeeName === "") {
      alert("Employee name cannot be Empty");
      return;
    }

    let borrow = true;
    for (let i = 0; i < BorrowList.length; i++) {
      let no_error = true;

      const { ComputerNo, title, author } = BorrowList[i];
      await axios
        .put("http://localhost:3001/BorrowBook", {
          ComputerNo,
        })
        .then((response) => {
          if (response.data.message === "failed") {
            no_error = false;
          }
        });

      if (no_error) {
        await axios
          .post("http://localhost:3001/AddLog", {
            ComputerNo,
            EmployeeName,
            Title: title,
            Author: author,
            LoginUser,
            log: "Borrow Book",
          })
          .then((response) => {
            console.log(response);
          });

        await axios
          .post("http://localhost:3001/AddBorrowRecord", {
            ComputerNo,
            EmployeeName,
          })
          .then((response) => {
            console.log(response);
          });
      } else {
        borrow = no_error;
        break;
      }
    }
    if (borrow) {
      alert("Borrow Book Successfully");
    } else {
      alert("Borrow Book Failed");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border-b p-1">
        <h1 className="text-2xl text-red-300 font-bold m-2">Borrow Book</h1>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-start justify-start mt-3 w-1/2">
          <label className="text-md font-normal text-center my-auto md:w-1/4">
            Employee name
          </label>
          <input
            type="text"
            placeholder="Enter Employee name"
            className="border border-gray-200 rounded-sm m-2 px-1 py-2 md:w-2/4"
            onChange={(event) => setEmployeeName(event.target.value)}
          />
        </div>
        <div className="flex items-start justify-start mt-3 w-1/2 ">
          <label
            className="text-md font-normal text-center my-auto md:w-1/4"
            htmlFor="ComputerNoField"
          >
            Computer No
          </label>
          <input
            id="ComputerNoField"
            type="number"
            placeholder="Enter Computer No"
            className="border border-gray-200 rounded-sm px-1 py-2 md:w-2/4 m-2"
            onChange={(event) => setComputerNo(event.target.value)}
            min="0"
            autoComplete="off"
          />
          <button
            type="button"
            className="bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded my-auto md:w-1/4"
            onClick={() => AddComputerNoToTable()}
          >
            Add
          </button>
        </div>
      </div>
      <div className="my-2 overflow-x-auto h-96 overflow-y-scroll w-full mx-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Computer no
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Book Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Operation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {BorrowList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.ComputerNo}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.author}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-500 cursor-pointer">
                          <button
                            type="button"
                            onClick={() => DeleteBorrowItem(item.ComputerNo)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end w-11/12">
        {BorrowList.length > 0 && (
          <button
            type="button"
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => Borrowbook()}
          >
            Borrow
          </button>
        )}
      </div>
    </div>
  );
};

export default Borrowbook;
