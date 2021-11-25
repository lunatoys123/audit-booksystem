import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategories } from "../redux/user/FormSlice";
const EditBook = () => {
  const dispatch = useDispatch();
  const Formcategories = useSelector(selectCategories);
  const [ComputerNo, setComputerNo] = useState("");
  const [open, setOpen] = useState(false);
  const LoginUser = localStorage.getItem("LoginUser");

  //may change to useReducer
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Publisher, setPublisher] = useState("");
  const [Year, setYear] = useState("");
  const [ref, setref] = useState("");
  const [type, setType] = useState("");
  const [remark, setRemark] = useState("");
  const [Categories, setCategories] = useState("");
  const [SecondCategories, setSecondCategories] = useState("");
  const [cyear, setCyear] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const GetBookFromComputerId = async () => {
    await axios
      .get("http://localhost:3001/fetchBookFromComputerNo", {
        params: { ComputerNo },
      })
      .then((response) => {
        if (response.data !== "") {
          console.log(response);
          setOpen(true);
          setTitle(response.data.title);
          setAuthor(response.data.author);
          setPublisher(response.data.publisher);
          setYear(response.data.year);
          setref(response.data.ref || "");
          setType(response.data.type);
          setRemark(response.data.remark || "");
          setCategories(response.data.categories);
          setSecondCategories(response.data.scategories);
          setCyear(response.data.cyear);
          setSource(response.data.source);
          setStatus(response.data.status);

          window.document.getElementById("TitleField").defaultValue =
            response.data.title;
          window.document.getElementById("AuthorField").defaultValue =
            response.data.author;
          window.document.getElementById("PublisherField").defaultValue =
            response.data.publisher;
          window.document.getElementById("YearField").defaultValue =
            response.data.year;
          window.document.getElementById("RefField").defaultValue =
            response.data.ref || "";
          window.document.getElementById("TypeField").defaultValue =
            response.data.type;
          window.document.getElementById("RemarkField").defaultValue =
            response.data.remark || "";
          window.document.getElementById("categoriesField").value =
            response.data.categories;
          window.document.getElementById("SecondCateField").defaultValue =
            response.data.scategories;
          window.document.getElementById("CyearField").defaultValue =
            response.data.cyear;
          window.document.getElementById("SourceField").defaultValue =
            response.data.source;
          window.document.getElementById("statusField").value =
            response.data.status;
        } else {
          alert("no such book record");
        }
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (event.nativeEvent.submitter.id === "Edit") {
      let Edit = false;
      await axios
        .put("http://localhost:3001/EditBook", {
          Title,
          Author,
          Publisher,
          Year,
          ref,
          type,
          remark,
          Categories,
          SecondCategories,
          cyear,
          source,
          status,
          ComputerNo,
        })
        .then((response) => {
          if (response.data.message === "Successfully") {
            Edit = true;
          }
        });

      if (Edit) {
        await axios
          .post("http://localhost:3001/AddLog", {
            ComputerNo,
            Title,
            Author,
            LoginUser,
            log: "Edit Book",
          })
          .then((response) => {
            console.log(response);
            alert("Edit Book Successfully");
          });
      } else {
        alert("Edit Book Failed");
      }
    } else if (event.nativeEvent.submitter.id === "Delete") {
      let Delete = false;
      await axios
        .delete("http://localhost:3001/DeleteBook", {
          data: { ComputerNo },
        })
        .then((response) => {
          if (response.data.message === "Successfully") {
            Delete = true;
          }
        });

      if (Delete) {
        await axios
          .post("http://localhost:3001/AddLog", {
            ComputerNo,
            Title,
            Author,
            LoginUser,
            log: "Delete Book",
          })
          .then((response) => {
            console.log(response);
            alert("Delete Book Successfully");
            setOpen(false);
            window.document.getElementById("ComputerNo").value = "";
          });
      } else {
        alert("Delete Book Failed");
      }
    }
  };
  return (
    <div className="flex flex-col ">
      <div className=" border-b p-1 ">
        <h1 className="text-2xl  text-red-300 font-bold m-2">Edit Book</h1>
      </div>
      <div className="flex items-start justify-start mt-3">
        <label className="text-md font-normal text-center my-auto">
          Computer No
        </label>
        <input
          id="ComputerNo"
          type="text"
          placeholder="Enter Computer No"
          className="border border-gray-200 rounded-sm m-2 px-1 py-2"
          onChange={(event) => setComputerNo(event.target.value)}
          autoComplete="off"
        />
        <button
          type="button"
          className="bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded my-auto"
          onClick={() => GetBookFromComputerId()}
        >
          Commit
        </button>
      </div>
      <div className="flex flex-col mx-auto w-full">
        {open && (
          <form onSubmit={onSubmit} className="w-full max-w-full mt-5 mx-auto">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/12">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                  onChange={(event) => setTitle(event.target.value)}
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
                  onChange={(event) => setAuthor(event.target.value)}
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
                  onChange={(event) => setPublisher(event.target.value)}
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
                  name="YearField"
                  autoComplete="off"
                  required
                  onChange={(event) => setYear(event.target.value)}
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
                  onChange={(event) => setref(event.target.value)}
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
                  onChange={(event) => setType(event.target.value)}
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
                  onChange={(event) => setRemark(event.target.value)}
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
                  onChange={(event) => setCategories(event.target.value)}
                >
                  {Formcategories.map((item) => {
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
                  onChange={(event) => setSecondCategories(event.target.value)}
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
                  onChange={(event) => setCyear(event.target.value)}
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
                  onChange={(event) => setSource(event.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/12">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="statusField"
                >
                  status
                </label>
              </div>
              <div className="md:w-5/12">
                <select
                  className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="statusField"
                  placeholder="Enter categories"
                  name="statusField"
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="CONDEMNED">CONDEMNED</option>
                  <option value="NORMAL">NORMAL</option>
                </select>
              </div>
            </div>
            <div className="flex mt-10 items-start justify-end w-6/12">
              <button
                id="Edit"
                type="submit"
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-2"
              >
                Edit
              </button>
              <button
                id="Delete"
                type="submit"
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-2"
              >
                Delete
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBook;
