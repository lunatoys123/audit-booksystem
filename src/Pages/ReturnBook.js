import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectPage,
  SelectLimit,
  SelectData,
  SelectTotalPage,
  fetchBorrowedBook,
  SearchBorrowedBook,
  fetchTotalBorrowedBook,
} from "../redux/user/ReturnSlice";
import Moment from "react-moment";
import axios from "axios";
import ReturnBookPagination from "../component/ReturnBookPagination";
import ReturnModal from "../component/ReturnModal";

const ReturnBook = () => {
  const dispatch = useDispatch();
  const page = useSelector(SelectPage);
  const limit = useSelector(SelectLimit);
  const data = useSelector(SelectData);
  const totalPage = useSelector(SelectTotalPage);
  const LoginUser = localStorage.getItem("LoginUser");

  const [ComputerNo, setComputerNo] = useState("");
  const [BorrowBookComputerNo, setBookComputerNo] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [EmployeeName, setEmployeeName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBorrowedBook({ page, limit, ComputerNo }));
    dispatch(fetchTotalBorrowedBook({ limit, ComputerNo }));
  }, [dispatch, page, limit, ComputerNo]);

  const submitForm = (event) => {
    event.preventDefault();
    const ComputerNo = event.target.ComputerNoField.value;
    setComputerNo(ComputerNo);

    dispatch(SearchBorrowedBook({ limit, ComputerNo }));
  };

  const ReturnBook = async (bid, ComputerNo, EmployeeName) => {
    let Alter = true;
    await axios
      .put("http://localhost:3001/AlterBorrowRecord", {
        bid,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === "failed") {
          Alter = false;
        }
      });

    if (Alter) {
      await axios
        .post("http://localhost:3001/AddLog", {
          ComputerNo,
          EmployeeName,
          LoginUser,
          log: "Return Book",
        })
        .then((response) => {
          console.log(response);
        });

      await axios
        .put("http://localhost:3001/AlterBookStatus", {
          ComputerNo,
        })
        .then((response) => {
          console.log(response);
        });
    }
    dispatch(fetchBorrowedBook({ page, limit, ComputerNo: "" }));
    dispatch(fetchTotalBorrowedBook({ limit, ComputerNo: "" }));
    alert("Return Book Successful");
  };

  const RenewBook = async (bid, ComputerNo, EmployeeName) => {
    let renew = true;
    await axios
      .put("http://localhost:3001/RenewBook", {
        bid,
      })
      .then((response) => {
        if(response.data.message ==="failed"){
          renew = false;
        }
        console.log(response);
      });
    
      if(renew){
        await axios.post("http://localhost:3001/AddLog",{
          ComputerNo, LoginUser, log:"Renew Book", EmployeeName
        })
        dispatch(fetchBorrowedBook({ page, limit, ComputerNo:"" }));
        dispatch(fetchTotalBorrowedBook({ limit, ComputerNo:"" }));
        alert("Renew Book Successfully");
      }
      
  };

  const setUpEmail = (ComputerNo, dueDate, EmployeeName) => {
    setOpen(true);
    setBookComputerNo(ComputerNo);
    setDueDate(dueDate);
    setEmployeeName(EmployeeName);
  };

  return (
    <div className="flex flex-col">
      <div className="border-b p-1">
        <h1 className="text-2xl text-red-300 font-bold m-2">
          Return / Renew Book
        </h1>
      </div>
      <div className="flex flex-col mt-3">
        <form
          className="flex items-start justify-start w-1/2"
          onSubmit={submitForm}
        >
          <label className="md:1/4 text-md p-2">Computer No</label>
          <input
            type="number"
            className="md:w-2/4 p-2 border border-gray-300 rounded-md mr-2"
            placeholder="Enter Computer No"
            name="ComputerNoField"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded my-auto"
          >
            Submit
          </button>
        </form>
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
                    Computer No
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Employee name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Borrow Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Return Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => {
                  return (
                    <tr key={item.bid}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.acc}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Moment format="DD/MM/YYYY">{item.inputDate}</Moment>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Moment format="DD/MM/YYYY">{item.dueDate}</Moment>
                        </div>
                      </td>
                      <td className="px-3 py-4 flex items-center justify-center">
                        <button
                          className="border text-center text-md  w-max mr-2 border-gray-300 rounded-sm bg-blue-300 text-white hover:bg-opacity-60 p-1"
                          onClick={() => RenewBook(item.bid, item.acc, item.name)}
                        >
                          Renew
                        </button>
                        <button
                          className="border text-center text-md  w-max mr-2 border-gray-300 rounded-sm bg-red-300 text-white hover:bg-opacity-60 p-1"
                          onClick={() =>
                            ReturnBook(item.bid, item.acc, item.name)
                          }
                        >
                          Return
                        </button>
                        <button
                          className="border text-center text-md  mr-2 border-gray-300 rounded-sm bg-purple-300 text-white hover:bg-opacity-60 whitespace-nowrap w-max p-1"
                          onClick={() =>
                            setUpEmail(item.acc, item.dueDate, item.name)
                          }
                        >
                          Send Reminder
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
      <ReturnModal
        open={open}
        setOpen={setOpen}
        BorrowBookComputerNo={BorrowBookComputerNo}
        DueDate={DueDate}
        EmployeeName={EmployeeName}
      />
      <ReturnBookPagination
        page={page}
        limit={limit}
        totalPage={totalPage}
        ComputerNo={ComputerNo}
      />
    </div>
  );
};

export default ReturnBook;
