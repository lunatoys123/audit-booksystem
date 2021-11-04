import React from "react";
import Navbar from "../component/navbar";
import SearchTable from "../component/SearchTable";
import SearchForm from '../component/SearchForm'
const Main = () => {
 

  return (
    <>
      <Navbar />
      <SearchForm />
      <SearchTable />
    </>
  );
};

export default Main;
