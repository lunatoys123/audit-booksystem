import React, { useState } from "react";
import Navbar from "../component/navbar";
import SearchTable from "../component/SearchTable";
import SearchForm from "../component/SearchForm";
import Pagination from "../component/Pagination"
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
      <SearchForm
        setTitle={setTitle}
        setAuthor={setAuthor}
        setPublisher={setPublisher}
        setYear={setYear}
        setCategories={setCategories}
        setDate={setDate}
      />
      <SearchTable
        Title={Title}
        Author={Author}
        Publisher={Publisher}
        Year={Year}
        categories={categories}
        date={date}
      />
      <Pagination />
    </>
  );
};

export default Main;
