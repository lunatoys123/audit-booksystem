import React from "react";
import { SearchLog, fetchTotalLog } from "../redux/user/LogSlice";
import { useDispatch } from "react-redux";
const LogForm = ({ setUser, setAction, limit }) => {
  const dispatch = useDispatch();
  const SubmitForm = (event) => {
    event.preventDefault();
    const user = event.target.User.value;
    const Action = event.target.Action.value;

    if(Action ==='Select All'){
        setUser(user);
        setAction("");
        dispatch(SearchLog({ limit, user, Action:"" }));
        dispatch(fetchTotalLog({ limit, user, Action:"" }));
    }else{
        setUser(user);
        setAction(Action);
    
        dispatch(SearchLog({ limit, user, Action }));
        dispatch(fetchTotalLog({ limit, user, Action }));
    }
  };


  return (
    <div className="flex w-10/12 mx-auto m-2 items-center justify-center divide-y divide-gray-300">
      <form onSubmit={SubmitForm}>
        <div className="flex flex-wrap">
          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">User</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Enter User"
              name="User"
            />
          </div>

          <div className="flex flex-col m-2">
            <label className="text-md text-gray-500 font-bold">Action</label>
            <select
              className="border border-gray-300 rounded-md p-1 max-w-full"
              name="Action"
            >
              <option value="Select All">Select All</option>
              <option value="Renew Book">Renew Book</option>
              <option value="Edit Book">Edit Book</option>
              <option value="Add Book">Add Book</option>
              <option value="Return Book">Return Book</option>
              <option value="Borrow Book">Borrow Book</option>
              <option value="Send Reminder">Send Reminder</option>
            </select>
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

export default LogForm;
