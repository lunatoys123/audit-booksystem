import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBorrowHistory,
  fetchTotalBorrowHistory,
  SelectPage,
  SelectLimit,
  SelectData,
  SelectTotalPage,
} from "../redux/user/borrowHistorySlice";
import Moment from 'react-moment';

import BorrowForm from "../component/borrowForm";
import BorrowPagination from "../component/BorrowPagination";

const Borrow = () => {
  const dispatch = useDispatch();
  const page = useSelector(SelectPage);
  const limit = useSelector(SelectLimit);

  const [ComputerNo, SetComputerNo] = useState("");
  const [EmployeeName, SetEmployeeName] = useState("");
  const [BorrowState, SetBorrowState] = useState("");
  const data = useSelector(SelectData);
  const totalPage = useSelector(SelectTotalPage);

  useEffect(() => {
    dispatch(
      fetchBorrowHistory({ page, limit, ComputerNo, EmployeeName, BorrowState })
    );
    dispatch(
      fetchTotalBorrowHistory({ limit, ComputerNo, EmployeeName, BorrowState })
    );
  }, [dispatch, page, limit, ComputerNo, EmployeeName, BorrowState]);

  return (
    <>
      <BorrowForm
        SetComputerNo={SetComputerNo}
        SetEmployeeName={SetEmployeeName}
        SetBorrowState={SetBorrowState}
      />
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-96 overflow-y-scroll w-full mx-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Borrow id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    computer no
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Borrow date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Due date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => {
                  return (
                    <tr key={item.bid}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.bid}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.acc}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Moment format="DD/MM/YYYY">
                            {item.inputDate}
                          </Moment>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Moment format="DD/MM/YYYY">
                            {item.dueDate}
                          </Moment>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.status}
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
      <BorrowPagination
        page={page}
        limit={limit}
        ComputerNo={ComputerNo}
        EmployeeName={EmployeeName}
        BorrowState={BorrowState}
        totalPage={totalPage}
      />
    </>
  );
};

export default Borrow;
