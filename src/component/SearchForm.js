import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {selectPage} from '../redux/user/Dataslice'

const SearchForm = () => {
  const page = useSelector(selectPage);

  useEffect(()=>{
    //get all categories
  },[])

  const SubmitForm = (event)=>{
    event.preventDefault();
    
  }
  return (
    <div className="flex w-11/12 mx-auto m-2 items-center justify-center">
      <form onSubmit={}>
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
              name='Author'
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Publisher</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter Publisher"
              name='Publisher'
            />
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">
              Categories
            </label>
            <select className="border border-gray-300 rounded-md p-1 w-64"></select>
          </div>
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">
              Second Categories
            </label>
            <select className="border border-gray-300 rounded-md p-1 w-64"></select>
          </div>
          <div className="flex flex-col m-2 items-center justify-center">
            <button
              className="border border-gray-300 w-40 rounded-sm bg-blue-400 text-white font-bold"
              type='submit'
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
