import React from "react";

const SearchForm = () => {
  return (
    <div className="flex flex-wrap w-11/12 mx-auto m-2">
      <div className="flex flex-wrap">
        <div className="flex flex-col m-2">
          <label className="text-md text-gray-500 font-bold">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
            placeholder="Enter Title"
          />
        </div>
        <div className="flex flex-col m-2">
          <label className="text-md text-gray-500 font-bold">Author</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
            placeholder="Enter Author"
          />
        </div>
        <div className="flex flex-col m-2">
        <label className="text-md text-gray-500 font-bold">Publisher</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
            placeholder="Enter Publisher"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
