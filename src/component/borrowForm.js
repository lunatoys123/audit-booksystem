import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBorrowHistory, SelectLimit } from "../redux/user/borrowHistorySlice";

const BorrowForm = ({ SetComputerNo, SetEmployeeName, SetBorrowState }) => {
  const dispatch = useDispatch();
  const limit = useSelector(SelectLimit);
  const SubmitForm = (event) => {
    event.preventDefault();
    const ComputerNo = event.target.Computer.value;
    const EmployeeName = event.target.Employee.value;
    const BorrowState = event.target.Action.value;

    if (BorrowState === "Select All") {
      SetComputerNo(ComputerNo);
      SetEmployeeName(EmployeeName);
      SetBorrowState("");
      dispatch(
        SearchBorrowHistory({
          limit,
          ComputerNo,
          EmployeeName,
          BorrowState: "",
        })
      );
    } else {
      SetComputerNo(ComputerNo);
      SetEmployeeName(EmployeeName);
      SetBorrowState(BorrowState);
      dispatch(
        SearchBorrowHistory({ limit, ComputerNo, EmployeeName, BorrowState })
      );
    }
  };
  return (
    <div className="flex w-10/12 mx-auto m-2 items-center justify-center divide-y divide-gray-300">
      <form onSubmit={SubmitForm}>
        <div className="flex flex-wrap">
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">
              computer no
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Computer No"
              name="Computer"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">
              Employee Name
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Employee Name"
              name="Employee"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Action</label>
            <select
              className="border border-gray-300 rounded-md p-1 max-w-full"
              name="Action"
            >
              <option value="Select All">Select All</option>
              <option value="RETURNED">RETURNED</option>
              <option value="BORROWED">BORROWED</option>
            </select>
          </div>

          <div className="flex flex-col m-2 items-end justify-end">
            <button
              className="border border-gray-300 w-40 rounded-md bg-blue-400 text-white font-bold hover:bg-blue-700 h-10"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BorrowForm;
