import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, selectCategories } from "../redux/user/FormSlice";
import { searchBook, fetchTotalPage } from "../redux/user/Dataslice";

const SearchForm = ({
  setTitle,
  setAuthor,
  setPublisher,
  setCategories,
  setYear,
  setDate,
  limit,
  setSubmit,
  setComputerNo,
}) => {
  const dispatch = useDispatch();
  const Categories = useSelector(selectCategories);
  useEffect(() => {
    //get all categories
    dispatch(fetchCategories());
  }, [dispatch]);

  const SubmitForm = (event) => {
    event.preventDefault();
    const computerNo = event.target.ComputerNo.value;
    const Title = event.target.Title.value;
    const Author = event.target.Author.value;
    const Publisher = event.target.Publisher.value;
    const categories = event.target.categories.value;
    const date = event.target.date.value;
    const Year = event.target.Year.value;

    setComputerNo(computerNo);
    setTitle(Title);
    setAuthor(Author);
    setPublisher(Publisher);
    setYear(Year);
    setDate(date);

    if (categories === "Select All") {
      dispatch(
        searchBook({
          computerNo,
          limit,
          Title,
          Author,
          Publisher,
          categories: "",
          date,
          Year,
        })
      );
      dispatch(
        fetchTotalPage({
          computerNo,
          limit,
          Title,
          Author,
          Publisher,
          Year,
          categories: "",
          date,
        })
      );
      setCategories("");
    } else {
      setCategories(categories);
      dispatch(
        searchBook({
          computerNo,
          limit,
          Title,
          Author,
          Publisher,
          categories,
          date,
          Year,
        })
      );
      dispatch(
        fetchTotalPage({
          computerNo,
          limit,
          Title,
          Author,
          Publisher,
          Year,
          categories,
          date,
        })
      );
    }
    setSubmit(true);
  };
  return (
    <div className="flex w-11/12 mx-auto m-2 items-center justify-center divide-y divide-gray-300">
      <form onSubmit={SubmitForm}>
        <div className="flex flex-wrap">
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">
              Computer No
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Computer No"
              name="ComputerNo"
            />
          </div>
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
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Publisher</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Publisher"
              name="Publisher"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Year</label>
            <input
              type="number"
              min="1948"
              max={new Date().getFullYear()}
              className="border border-gray-300 p-1 rounded-md w-40"
              placeholder="Select Year"
              name="Year"
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">
              Categories
            </label>
            <select
              className="border border-gray-300 rounded-md p-1 max-w-full"
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
                    {item.categories}
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
