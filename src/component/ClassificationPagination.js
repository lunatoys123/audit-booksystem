import React, { useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import {
  NextPage,
  PreviousPage,
  fetchToCertainPage,
  SearchClassification,
} from "../redux/user/ClassificationSlice";

const ClassificationPagination = (props) => {
  const dispatch = useDispatch();
  const page = props.page;
  const limit = props.limit;
  const totalPage = props.totalPage;
  const elements = document.getElementsByTagName("button");

  useEffect(() => {
    styleCleanUp(elements);
    targetButtonUpdate(elements, page);
  }, [page, elements]);

  const styleCleanUp = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains("border-indigo-500")) {
        elements[i].classList.remove("border-indigo-500");
      }
      if (elements[i].classList.contains("text-indigo-600")) {
        elements[i].classList.remove("text-indigo-600");
      }
      elements[i].classList.add("border-gray-300");
      elements[i].classList.remove("bg-indigo-50");
    }
  };

  const targetButtonUpdate = (elements, targetPage) => {
    for (let i = 0; i < elements.length; i++) {
      if (Number(elements[i].innerHTML) === targetPage) {
        elements[i].classList.add("bg-indigo-50");
        elements[i].classList.add("text-indigo-600");
      }
    }
  };

  const goToNextPage = () => {
    if (page < totalPage) {
      dispatch(NextPage({ page, limit }));
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      dispatch(PreviousPage({ page, limit }));
    }
  };

  const GoToCertainPage = (event) => {
    const targetPage = Number(event.target.innerHTML);
    if (targetPage <= totalPage) {
      dispatch(fetchToCertainPage({ page: targetPage, limit }));
    }
  };

  const goToFirstPage = () => {
    dispatch(fetchToCertainPage({ page: 1, limit }));
  };

  const goToLastPage = () => {
    dispatch(fetchToCertainPage({ page: totalPage, limit }));
  };

  const changeOffset = (event) => {
    const limit = event.target.value;
    dispatch(SearchClassification({ limit }));
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 w-full mx-auto">
      <div className="flex-1 flex justify-between sm:hidden">
        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </button>
        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="mx-auto">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <div className="flex items-center justify-center pr-2">
              <select
                className="border border-gray-300 p-2 rounded-md"
                onChange={(event) => changeOffset(event)}
              >
                <option value="5"> 5 records per page</option>
                <option value="10"> 10 records per page</option>
                <option value="50"> 50 records per page</option>
                <option value="100"> 100 records per page</option>
              </select>
            </div>
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => goToFirstPage()}
            >
              <span className="sr-only">FirstPage</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => goToPreviousPage()}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-current="page"
              className="z-10 bg-indigo-50 text-indigo-600 relative border-gray-300 inline-flex items-center px-4 py-2 border text-sm font-medium"
              onClick={(event) => GoToCertainPage(event)}
            >
              {page < 3 ? 1 : page - 2}
            </button>
            <button
              type="button"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              onClick={(event) => GoToCertainPage(event)}
            >
              {page < 3 ? 2 : page - 1}
            </button>
            <button
              type="button"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              onClick={(event) => GoToCertainPage(event)}
            >
              {page < 3 ? 3 : page}
            </button>

            <button
              type="button"
              disabled={page + 1 > totalPage ? true : false}
              className={`${
                page + 1 <= totalPage && totalPage >= 4
                  ? `bg-white hover:bg-gray-50 text-gray-500 border-gray-300   hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium`
                  : `hidden `
              } `}
              onClick={(event) => GoToCertainPage(event)}
            >
              {page < 3 ? 4 : page + 1}
            </button>
            <button
              type="button"
              className={`${
                page + 2 <= totalPage && totalPage >= 5
                  ? `bg-white hover:bg-gray-50 text-gray-500 border-gray-300   hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium`
                  : `hidden `
              } `}
              disabled={page + 2 > totalPage ? true : false}
              onClick={(event) => GoToCertainPage(event)}
            >
              {page < 3 ? 5 : page + 2}
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => goToNextPage()}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => goToLastPage()}
            >
              <span className="sr-only">Last Page</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ClassificationPagination;
