import React, { useState } from "react";
import Navbar from "../component/navbar";
import SearchTable from "../component/SearchTable";
import SearchForm from "../component/SearchForm";
import Pagination from "../component/Pagination";
const Main = () => {
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Publisher, setPublisher] = useState("");
  const [Year, setYear] = useState("");
  const [categories, setCategories] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <Navbar />
      <SearchTable />
    </>
  );
};

export default Main;
