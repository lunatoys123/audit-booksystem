import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectPage,
  SelectLimit,
  SelectData,
  SelectTotalPage,
  fetchClassification,
  fetchTotalClassification,
} from "../redux/user/ClassificationSlice";
import Modal from "../component/Classificationmodal";
import ClassificationPagination from "../component/ClassificationPagination";

const Classification = () => {
  const dispatch = useDispatch();
  const page = useSelector(SelectPage);
  const limit = useSelector(SelectLimit);
  const data = useSelector(SelectData);
  const totalPage = useSelector(SelectTotalPage);

  const [open, setOpen] = useState(false);
  const [action, setaction] = useState("");
  const [categoriesKey, setCategoriesKey] = useState("");

  useEffect(() => {
    dispatch(fetchClassification({ page, limit }));
    dispatch(fetchTotalClassification({ limit }));
  }, [dispatch, page, limit]);

  const EditCategories = (categories) => {
    setaction("Edit");
    setCategoriesKey(categories);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col w-full mx-auto mt-3">
        <div className="flex flex-col">
          <h1 className="text-center font-bold text-red-300 text-3xl">
            Classification
          </h1>
          <button
            className="border text-center text-sm w-14 bg-indigo-400 rounded-sm text-white border-gray-300 hover:bg-opacity-60"
            onClick={() => {
              setaction("Add");
              setOpen(true);
            }}
          >
            Add
          </button>
        </div>
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
                      Categories
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Categories Description
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
                  {data.map((item) => {
                    return (
                      <tr key={item.categories}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.categories}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.catedesc}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <button
                            className="border text-center text-md w-14 mr-2 border-gray-300 rounded-sm bg-blue-300 text-white hover:bg-opacity-60"
                            onClick={() => {
                              EditCategories(item.categories);
                            }}
                          >
                            Edit
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
      <ClassificationPagination
        totalPage={totalPage}
        limit={limit}
        page={page}
      />
      <Modal
        open={open}
        setOpen={setOpen}
        action={action}
        categoriesKey={categoriesKey}
        page={page}
        limit={limit}
      />
    </>
  );
};

export default Classification;
