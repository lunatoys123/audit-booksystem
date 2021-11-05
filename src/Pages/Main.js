import React, { useState } from "react";
import Navbar from "../component/navbar";
import SearchTable from "../component/SearchTable";
import SearchForm from "../component/SearchForm";
const Main = () => {
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Publisher, setPublisher] = useState("");
  const [Year, setYear] = useState("");
  const [categories, setCategories] = useState("");
  const [SecondCategories, setSecondCategories] = useState("");

  return (
    <>
      <Navbar />
      <SearchForm
        setTitle={setTitle}
        setAuthor={setAuthor}
        setPublisher={setPublisher}
        setYear={setYear}
        setCategories={setCategories}
        setSecondCategories={setSecondCategories}
      />
      <SearchTable
        Title={Title}
        Author={Author}
        Publisher={Publisher}
        Year={Year}
        categories={categories}
        SecondCategories={SecondCategories}
      />
    </>
  );
};

export default Main;
