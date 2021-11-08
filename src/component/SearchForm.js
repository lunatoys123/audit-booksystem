import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, selectCategories } from "../redux/user/FormSlice";
import { selectPage, fetchTotalPage } from "../redux/user/Dataslice";

const SearchForm = ({
  setTitle,
  setAuthor,
  setPublisher,
  setCategories,
  setDate,
}) => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const Categories = useSelector(selectCategories);
  useEffect(() => {
    //get all categories
    dispatch(fetchCategories());
  }, []);

  const SubmitForm = (event) => {
    event.preventDefault();
    const title = event.target.Title.value;
    const author = event.target.Author.value;
    const publisher = event.target.Publisher.value;
    const categories = event.target.categories.value;
    const date = event.target.date.value;
    setTitle(title);
    setAuthor(author);
    setPublisher(publisher);
    if (categories === "Select All") {
      setCategories("");
    } else {
      setCategories(categories);
    }
    setDate(date);
  };
  return (
    <div className="flex w-11/12 mx-auto m-2 items-center justify-center">
      <form onSubmit={SubmitForm}>
        <div className="flex flex-wrap">
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Title</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Title"
              name="Title"
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Author</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Author"
              name="Author"
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Publisher</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Publisher"
              name="Publisher"
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">
              Categories
            </label>
            <select
              className="border border-gray-300 rounded-md p-1 max-w-max"
              name="categories"
            >
              <option value="Select All">Select All</option>
              {Categories.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.categories}
                    className="text-sm"
                  >
                    {item.categories}({item.catedesc})
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Date</label>
            <input
              type="date"
              placeholder="dd-MM-yyyy"
              className="border border-gray-300 p-1 rounded-md"
              name="date"
            />
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

export default SearchForm;
