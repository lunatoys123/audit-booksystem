import React, { useEffect, useState } from "react";
import LogForm from "../component/LogForm";
import LogPagination from "../component/LogPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLog,
  SelectData,
  SelectPage,
  SelectLimit,
  fetchTotalLog,
  SelectTotalPage,
} from "../redux/user/LogSlice";
import Moment from "react-moment";
const Log = () => {
  const dispatch = useDispatch();
  const data = useSelector(SelectData);
  const [user, setUser] = useState("");
  const [Action, setAction] = useState("");
  const page = useSelector(SelectPage);
  const limit = useSelector(SelectLimit);
  const totalPage = useSelector(SelectTotalPage);

  useEffect(() => {
    dispatch(fetchLog({ page, limit, user, Action }));
    dispatch(fetchTotalLog({ limit, user, Action }));
  }, [dispatch, page, limit, user, Action]);

  return (
    <>
      <LogForm setUser={setUser} setAction={setAction} limit={limit} />
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
                    Log no
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    information
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    user
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => {
                  return (
                    <tr key={item.lid}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.lid}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.laction}
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="text-sm text-gray-900">
                          {item.linformation}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.uname}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Moment format="DD/MM/YYYY">{item.ldate}</Moment>
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
      <LogPagination
        user={user}
        Action={Action}
        page={page}
        limit={limit}
        totalPage={totalPage}
      />
    </>
  );
};

export default Log;
