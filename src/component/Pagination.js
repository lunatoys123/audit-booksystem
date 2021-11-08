import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { fetchNextPage, previousPage } from "../redux/user/Dataslice";

const Pagination = (props) => {
  const dispatch = useDispatch();
  const page = props.page;
  const limit = props.limit;
  const elements = document.getElementsByTagName("button");
  const centerButton = useRef(null);
  const totalPage = props.totalPage;

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

  const centerButtonOperation = () => {
    if (!centerButton.current.classList.contains("text-indigo-600")) {
      centerButton.current.classList.add("text-indigo-600");
    }

    if (centerButton.current.classList.contains("border-gray-300")) {
      centerButton.current.classList.remove("border-gray-300");
    }

    if (!centerButton.current.classList.contains("bg-indigo-50")) {
      centerButton.current.classList.add("bg-indigo-50");
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
    const Title = props.Title;
    const Author = props.Author;
    const Publisher = props.Publisher;
    const categories = props.categories;
    const date = props.date;
    const Year = props.Year;

    const targetPage = Number(page + 1);

    styleCleanUp(elements);

    if (targetPage > 3) {
      centerButtonOperation();
    } else {
      targetButtonUpdate(elements, targetPage);
    }

    if (page < totalPage) {
      dispatch(
        fetchNextPage({
          page,
          limit,
          Title,
          Author,
          Publisher,
          categories,
          date,
          Year,
        })
      );
    }
  };

  const goToPreviousPage = () => {
    const Title = props.Title;
    const Author = props.Author;
    const Publisher = props.Publisher;
    const categories = props.categories;
    const date = props.date;
    const Year = props.Year;

    const targetPage = Number(page - 1);
    if (targetPage >= 1) {
      styleCleanUp(elements);
    }

    if (targetPage >= 3) {
      centerButtonOperation();
    } else {
      targetButtonUpdate(elements, targetPage);
    }

    if (page > 1)
      dispatch(
        previousPage({
          page,
          limit,
          Title,
          Author,
          Publisher,
          categories,
          date,
          Year,
        })
      );
  };

  const GoToCertainPage = (event) =>{
    styleCleanUp(elements);
    const targetPage = Number(event.target.innderHTML());
    if(targetPage >= 3){
      centerButtonOperation();
    }else{
      event.target.classList.add("text-indigo-600");
      event.target.classList.remove("border-gray-300");
      event.target.classList.add("bg-indigo-50");
    }

    if(targetPage <= totalPage){
      
    }
  }
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => goToPreviousPage()}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-current="page"
              className="z-10 bg-indigo-50 text-indigo-600 relative border-gray-300 inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {page < 3 ? 1 : page - 2}
            </button>
            <button
              type="button"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {page < 3 ? 2 : page - 1}
            </button>
            <button
              type="button"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              ref={centerButton}
            >
              {page < 3 ? 3 : page}
            </button>

            <button
              type="button"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              // disabled={page + 1 > totalPage ? true : false}
            >
              {page < 3 ? 4 : page + 1}
            </button>
            <button
              type="button"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              // disabled={page + 2 > totalPage ? true : false}
            >
              {page < 3 ? 5 : page + 2}
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => goToNextPage()}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
