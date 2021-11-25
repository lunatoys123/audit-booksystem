import React from "react";
import SearchTable from "../component/SearchTable";
import { useHistory } from "react-router";
import * as ROUTES from "../constant"

const ForEmployee = () => {
  const history = useHistory();

  const goToLoginPage = () =>{
      history.push(ROUTES.LoginPagePath);
  }
  return (
    <>
      <div className="border w-full h-full">
        <button className="rounded border border-gray-300 p-2 m-2 bg-purple-600 shadow-md text-white font-bold hover:bg-opacity-50"
        onClick={()=>goToLoginPage()}>
          Back To Login
        </button>
      </div>
      <SearchTable />
    </>
  );
};

export default ForEmployee;
