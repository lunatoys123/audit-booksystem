import React, { useEffect } from "react";
import Navbar from "../component/navbar";
import SearchTable from "../component/SearchTable";
const Main = () => {
  useEffect(()=>{
    document.title="Main";
  },[])
  return (
    <>
      <Navbar />
      <SearchTable />
    </>
  );
};

export default Main;
