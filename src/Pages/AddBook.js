import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategories } from "../redux/user/FormSlice";
import axios from "axios";
const AddBook = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const LoginUser = localStorage.getItem("LoginUser");
  const formSubmit = async (event) => {
    event.preventDefault();
    const Title = event.target.TitleField.value;
    const Author = event.target.AuthorField.value;
    const Publisher = event.target.PublisherField.value;
    const Year = event.target.YearField.value;
    const ref = event.target.RefField.value;
    const type = event.target.TypeField.value;
    const remark = event.target.RemarkField.value;
    const categories = event.target.categoriesField.value;
    const SecondCategories = event.target.SecondCateField.value;
    const cyear = event.target.CyearField.value;
    const source = event.target.SourceField.value;

    await axios
      .post("http://localhost:3001/AddBook", {
        Title,
        Author,
        Year,
        Publisher,
        ref,
        type,
        remark,
        categories,
        SecondCategories,
        cyear,
        source,
      })
      .then((response) => {
        if (response.data.message === "Insert successful") {
          console.log(response);
        } else if (response.data.message === "error") {
          console.log("Error when Insert");
        }
      });

    await axios
      .post("http://localhost:3001/AddLog", {
        Title,
        Author,
        log: "Add Book",
        LoginUser,
      })
      .then((response) => {
        console.log(response);
        alert("Add Book Successfully");
      });
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <div className=" border-b p-1 ">
          <h1 className="text-2xl  text-red-300 font-bold">Add Book</h1>
        </div>
        <form className="w-full max-w-full mt-5" onSubmit={formSubmit}>
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-center mx-auto"
                htmlFor="TitleField"
              >
                Title
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="TitleField"
                type="text"
                placeholder="Enter Title"
                name="TitleField"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="AuthorField"
              >
                Author
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="AuthorField"
                type="text"
                placeholder="Enter Author"
                name="AuthorField"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="PublisherField"
              >
                Publisher
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="PublisherField"
                type="text"
                placeholder="Enter Publisher"
                name="PublisherField"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="YearField"
              >
                Year
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="YearField"
                type="number"
                placeholder="Enter Year"
                min="1800"
                max={new Date().getFullYear()}
                defaultValue="1800"
                name="YearField"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="RefField"
              >
                ref
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="RefField"
                type="text"
                placeholder="Enter Ref"
                autoComplete="off"
                name="RefField"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="TypeField"
              >
                Type
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="TypeField"
                type="text"
                placeholder="Enter Type"
                autoComplete="off"
                name="TypeField"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="RemarkField"
              >
                Remark
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="RemarkField"
                type="text"
                placeholder="Enter Remark"
                autoComplete="off"
                name="RemarkField"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="categoriesField"
              >
                categories
              </label>
            </div>
            <div className="md:w-5/12">
              <select
                className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="categoriesField"
                placeholder="Enter categories"
                name="categoriesField"
              >
                {categories.map((item) => {
                  return (
                    <option key={item.categories} value={item.categories}>
                      {item.categories}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="SecondCateField"
              >
                Second Categories
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="SecondCateField"
                type="text"
                placeholder="Enter Second Categories"
                autoComplete="off"
                name="SecondCateField"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="CyearField"
              >
                cyear
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="CyearField"
                type="text"
                placeholder="Enter Cyear"
                autoComplete="off"
                name="CyearField"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/12">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="SourceField"
              >
                Source
              </label>
            </div>
            <div className="md:w-5/12">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="SourceField"
                type="text"
                placeholder="Enter source"
                autoComplete="off"
                name="SourceField"
              />
            </div>
          </div>
          <div className="flex  mt-10 items-start justify-end w-6/12">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-2"
              type="submit"
            >
              Add
            </button>
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-2"
              type="reset"
            >
              reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBook;
