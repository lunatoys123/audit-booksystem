import React, { useEffect, useState } from "react";
import Log from "./Log";
import Sidebar from "../component/sidebar";
import Borrow from "./borrowHistory";
import Classification from "./Classification";
import AddBook from "./AddBook";
import EditBook from "./EditBook";
import BorrowBook from "./borrowbook";
import ReturnBook from "./ReturnBook";
import Navbar from "../component/navbar";
const Book = () => {
  const [PanelButtons, setPanelButtons] = useState([
    { name: "View Logs", current: true },
    { name: "Add Books", current: false },
    { name: "Edit Books", current: false },
    { name: "Borrow Book", current: false },
    { name: "Return / Renew Book", current: false },
    { name: "Classification", current: false },
    { name: "Borrow Books History", current: false },
  ]);

  useEffect(() => {
    document.title = "Book";
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex space-x-4">
        <div className="flex-auto">
          <Sidebar
            PanelButtons={PanelButtons}
            setPanelButtons={setPanelButtons}
          />
        </div>
        <div className="flex-auto flex-col w-10/12 mx-auto">
          {PanelButtons.find((button) => button.name === "View Logs")
            .current && <Log />}

          {PanelButtons.find((button) => button.name === "Borrow Books History")
            .current && <Borrow />}
          {PanelButtons.find((button) => button.name === "Classification")
            .current && <Classification />}
          {PanelButtons.find((button) => button.name === "Add Books")
            .current && <AddBook />}
          {PanelButtons.find((button) => button.name === "Edit Books")
            .current && <EditBook />}
          {PanelButtons.find((button) => button.name === "Borrow Book")
            .current && <BorrowBook />}
          {PanelButtons.find((button) => button.name === "Return / Renew Book")
            .current && <ReturnBook />}
        </div>
      </div>
    </>
  );
};

export default Book;
