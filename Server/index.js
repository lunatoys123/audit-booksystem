const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "tony",
  host: "localhost",
  password: "Lunatoys123",
  database: "lib",
});

app.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  db.query(
    "Select uname from user where uname=? and upassword = ? ",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.get("/fetchBooks", (req, res) => {
  console.log(req.query);
  const ComputerNo = req.query.computerNo;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const Title = req.query.Title;
  const Author = req.query.Author;
  const Publisher = req.query.Publisher;
  const Year = req.query.Year;
  const categories = req.query.categories;
  const date = req.query.date;

  const start_of = limit * (page - 1);

  let query =
    "select acc, title, author, year, publisher, date, categories, scategories, bstatus from bookmaster where 1=1 ";

  if (ComputerNo !== "") {
    query += " and acc = " + ComputerNo + " ";
  }
  if (Title !== "") {
    query += " and title like '%" + Title + "%' ";
  }

  if (Author !== "") {
    query += " and author like '%" + Author + "%' ";
  }

  if (Publisher !== "") {
    query += " and publisher like '%" + Publisher + "%' ";
  }

  if (Year !== "") {
    query += " and year >= " + Year + " ";
  }

  if (categories !== "") {
    query += " and categories like '%" + categories + "%' ";
  }

  if (date !== "") {
    query += " and date >= '" + date + "' ";
  }

  query += "limit ?,?";
  console.log(query);
  db.query(query, [start_of, limit], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/fetchCategories", (req, res) => {
  db.query("select * from classification", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/fetchTotalPage", (req, res) => {
  const computerNo = req.query.computerNo;
  const Title = req.query.Title;
  const Author = req.query.Author;
  const Publisher = req.query.Publisher;
  const Year = req.query.Year;
  const categories = req.query.categories;
  const date = req.query.date;

  query = "select count(*) as totalNumber from bookmaster where 1=1 ";

  if (computerNo !== "") {
    query += " and acc = " + computerNo + " ";
  }

  if (Title !== "") {
    query += " and title like '%" + Title + "%' ";
  }

  if (Author !== "") {
    query += " and author like '%" + Author + "%' ";
  }

  if (Publisher !== "") {
    query += " and publisher like '%" + Publisher + "%' ";
  }

  if (Year !== "") {
    query += " and year >= " + Year + " ";
  }

  if (categories !== "") {
    query += " and categories like '%" + categories + "%' ";
  }

  if (date !== "") {
    query += " and date >= '" + date + "' ";
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(...result);
    }
  });
});

app.get("/getUser", (_req, res) => {
  db.query("select * from user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteUser", (req, res) => {
  const userId = req.body.Userid;

  db.query("delete from user where uid = ?", [userId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getUserNameAndPassword", (req, res) => {
  const UserId = req.query.userId;

  db.query(
    "Select uname as username, upassword as userpassword from user where uid = ?",
    [UserId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.get("/checkUserExist", (req, res) => {
  const username = req.query.username;

  db.query(
    "select count(*) as number from user where uname = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.post("/addUser", (req, res) => {
  const username = req.body.username;
  const userpassword = req.body.userpassword;

  db.query(
    "insert into user values(null,?,?,'Y','N')",
    [username, userpassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateUser", (req, res) => {
  const userId = req.body.userId;
  const username = req.body.username;
  const password = req.body.userpassword;

  db.query(
    "update user set uname = ? , upassword = ? where uid = ?",
    [username, password, userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/fetchLog", (req, res) => {
  console.log(req.query);
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const user = req.query.user;
  const Action = req.query.Action;

  const start_of = limit * (page - 1);
  let query =
    "select lid , laction, linformation, uid as uname, ldate from log where 1=1 ";

  if (user !== "") {
    query += " and uid like '%" + user + "%' ";
  }

  if (Action !== "") {
    query += " and laction like '%" + Action + "%' ";
  }
  query += "limit ?,?";
  console.log(query);
  db.query(query, [start_of, limit], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/fetchTotalLog", (req, res) => {
  const user = req.query.user;
  const Action = req.query.Action;

  let query = "Select count(*) as totalNumber from log where 1=1 ";

  if (user !== "") {
    query += " and uid like '%" + user + "%' ";
  }

  if (Action !== "") {
    query += " and laction like '%" + Action + "%' ";
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(...result);
    }
  });
});

app.get("/fetchBorrowHistory", (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const start_of = limit * (page - 1);

  const ComputerNo = req.query.ComputerNo;
  const EmployeeName = req.query.EmployeeName;
  const BorrowState = req.query.BorrowState;

  let query = "Select * from borrow where 1=1 ";

  if (ComputerNo !== "") {
    query += " and acc like '%" + ComputerNo + "%' ";
  }

  if (EmployeeName !== "") {
    query += " and name like '%" + EmployeeName + "%' ";
  }

  if (BorrowState !== "") {
    query += " and status like '%" + BorrowState + "%' ";
  }

  query += "limit ?,? ";

  db.query(query, [start_of, limit], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/fetchTotalBorrowHistory", (req, res) => {
  const ComputerNo = req.query.ComputerNo;
  const EmployeeName = req.query.EmployeeName;
  const BorrowState = req.query.BorrowState;

  let query = "Select count(*) as totalNumber from borrow where 1=1 ";

  if (ComputerNo !== "") {
    query += " and acc like '%" + ComputerNo + "%' ";
  }

  if (EmployeeName !== "") {
    query += " and name like '%" + EmployeeName + "%' ";
  }

  if (BorrowState !== "") {
    query += " and status like '%" + BorrowState + "%' ";
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(...result);
    }
  });
});

app.get("/fetchClassification", (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const start_of = limit * (page - 1);

  db.query(
    "Select * from classification limit ?,?",
    [start_of, limit],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/checkCategoriesExist", (req, res) => {
  const categories = req.query.categories;

  db.query(
    "Select count(*) as number from classification where categories = ?",
    [categories],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.post("/addCategories", (req, res) => {
  const categories = req.body.categories;
  const categoriesDescription = req.body.categoriesDescription;

  db.query(
    "insert into classification values(?,?)",
    [categories, categoriesDescription],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/GetClassificationData", (req, res) => {
  const categoriesKey = req.query.categoriesKey;

  db.query(
    "select * from classification where categories = ?",
    [categoriesKey],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.put("/updateCategories", (req, res) => {
  const categories = req.body.categories;
  const categoriesDescription = req.body.categoriesDescription;

  db.query(
    "update classification set categories = ? , catedesc = ? where categories = ?",
    [categories, categoriesDescription, categories],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/fetchTotalClassification", (_req, res) => {
  db.query(
    "Select count(*) as totalNumber from classification",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.get("/fetchCategories", (req, res) => {
  db.query("select * from classification", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/AddBook", (req, res) => {
  const Title = req.body.Title;
  const Author = req.body.Author;
  const Year = req.body.Year;
  const Publisher = req.body.Publisher;
  const ref = req.body.ref;
  const type = req.body.type;
  const remark = req.body.remark;
  const categories = req.body.categories;
  const SecondCategories = req.body.SecondCategories;
  const cyear = req.body.cyear;
  const source = req.body.source;

  db.query(
    "insert into bookmaster values(null, ?, ?, ?, 0, ?, ?,0,CURDATE(),?,?,?,?,?,'NORMAL','AVAILABLE',0,CURDATE(),?)",
    [
      Title,
      Author,
      Year,
      Publisher,
      ref,
      type,
      remark,
      categories,
      SecondCategories,
      cyear,
      source,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "error" });
      } else {
        res.send({ result, message: "Insert successful" });
      }
    }
  );
});

app.post("/AddLog", (req, res) => {
  const ComputerNo = req.body.ComputerNo;
  const Title = req.body.Title;
  const Author = req.body.Author;
  const LoginUser = req.body.LoginUser;
  const log = req.body.log;
  const EmployeeName = req.body.EmployeeName;
  let actionString = "";
  if (log === "Add Book") {
    actionString =
      "Book Added to the System:[ Title: " +
      Title +
      " Author: " +
      Author +
      " ]";
  } else if (log === "Borrow Book") {
    actionString =
      "ComputerNo: " +
      ComputerNo +
      ", Title: " +
      Title +
      ", Author: " +
      Author +
      " borrow by " +
      EmployeeName;
  } else if (log === "Return Book") {
    actionString =
      "Book (Computer No. " + ComputerNo + ") have returned by " + EmployeeName;
  } else if (log === "Send Reminder") {
    actionString =
      "Reminder had been sent to " +
      EmployeeName +
      " for book (Computer No: " +
      ComputerNo +
      ") ";
  } else if (log === "Renew Book") {
    actionString =
      " Book (Computer No. " +
      ComputerNo +
      ") have been renewed for " +
      EmployeeName;
  } else if (log === "Edit Book") {
    actionString =
      "Book Edited: [ComputerNo: " +
      ComputerNo +
      ", Title: " +
      Title +
      ", Author: " +
      Author +
      "] ";
  } else if (log === "Delete Book") {
    actionString =
      "Book Deleted: [ComputerNo: " +
      ComputerNo +
      ", Title: " +
      Title +
      ", Author: " +
      Author +
      "] ";
  }

  db.query(
    "insert into log values(null, ?, ?, ?, SYSDATE())",
    [log, actionString, LoginUser],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ message: "Successfully", result });
      }
    }
  );
});

app.get("/fetchBookFromComputerNo", (req, res) => {
  const computerNo = req.query.ComputerNo;
  db.query(
    "select title, author, year, publisher, ref, type, remark, categories, scategories, cyear, status, source from bookmaster where acc = ?",
    [computerNo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.put("/EditBook", (req, res) => {
  const computerNo = req.body.ComputerNo;
  const Title = req.body.Title;
  const Author = req.body.Author;
  const Publisher = req.body.Publisher;
  const year = req.body.Year;
  const ref = req.body.ref;
  const type = req.body.type;
  const remark = req.body.remark;
  const Categories = req.body.Categories;
  const SecondCategories = req.body.SecondCategories;
  const cyear = req.body.cyear;
  const source = req.body.source;
  const status = req.body.status;

  if (status === "CONDEMNED") {
    db.query(
      "update bookmaster set title = ? , author = ?, year = ?, publisher = ?, ref= ?, type=?, remark = ?, categories = ?, scategories = ?, cyear=?, source = ?, status = ?, bstatus ='NOT AVAILABLE' where acc = ?",
      [
        Title,
        Author,
        year,
        Publisher,
        ref,
        type,
        remark,
        Categories,
        SecondCategories,
        cyear,
        source,
        status,
        computerNo,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ message: "failed" });
        } else {
          res.send({ message: "Successfully", result });
        }
      }
    );
  } else if (status === "NORMAL") {
    db.query(
      "update bookmaster set title = ? , author = ?, year = ?, publisher = ?, ref= ?, type=?, remark = ?, categories = ?, scategories = ?, cyear=?, source = ?, status = ? where acc = ?",
      [
        Title,
        Author,
        year,
        Publisher,
        ref,
        type,
        remark,
        Categories,
        SecondCategories,
        cyear,
        source,
        status,
        computerNo,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ message: "failed" });
        } else {
          res.send({ message: "Successfully", result });
        }
      }
    );
  }
});

app.delete("/DeleteBook", (req, res) => {
  const ComputerNo = req.body.ComputerNo;
  console.log(ComputerNo);
  db.query(
    "delete from bookmaster where acc = ?",
    [ComputerNo],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "failed" });
      } else {
        res.send({ message: "Successfully", result });
      }
    }
  );
});

app.get("/CheckAvailability", (req, res) => {
  const ComputerNo = req.query.ComputerNo;
  db.query(
    "select count(*) as number, title, author from bookmaster where acc = ? and status ='NORMAL' and bstatus='AVAILABLE'",
    [ComputerNo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(...result);
      }
    }
  );
});

app.put("/BorrowBook", (req, res) => {
  const ComputerNo = req.body.ComputerNo;

  db.query(
    "update bookmaster set bstatus = 'NOT AVAILABLE' where acc = ?",
    [ComputerNo],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "failed" });
      } else {
        res.send({ message: "Successfully", result });
      }
    }
  );
});

app.post("/AddBorrowRecord", (req, res) => {
  const ComputerNo = req.body.ComputerNo;
  const EmployeeName = req.body.EmployeeName;

  db.query(
    "insert into borrow values(null , ?,?,CURDATE(),date_add(CURDATE(), interval 3 month),'BORROWED')",
    [ComputerNo, EmployeeName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/fetchBorrowedBook", (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const ComputerNo = req.query.ComputerNo;

  const start_of = limit * (page - 1);

  let query = "Select * from borrow where status ='BORROWED' and 1=1 ";

  if (ComputerNo !== "") {
    query += " and acc = " + ComputerNo + " ";
  }

  query += " limit ?,? ";
  db.query(query, [start_of, limit], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/fetchTotalBorrowedBook", (req, res) => {
  const ComputerNo = req.query.ComputerNo;

  let query =
    "Select count(*) as totalNumber from borrow where status ='BORROWED' and 1=1 ";

  if (ComputerNo !== "") {
    query += " and acc = " + ComputerNo + " ";
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(...result);
    }
  });
});

app.put("/AlterBorrowRecord", (req, res) => {
  const bid = req.body.bid;

  db.query(
    "update borrow set dueDate = CURDATE(), status='RETURNED' where bid = ?",
    [bid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "failed" });
      } else {
        res.send({ message: "Successfully", result });
      }
    }
  );
});

app.put("/AlterBookStatus", (req, res) => {
  const ComputerNo = req.body.ComputerNo;

  db.query(
    "update bookmaster set bstatus='AVAILABLE' where acc = ?",
    [ComputerNo],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/RenewBook", (req, res) => {
  const bid = req.body.bid;

  db.query(
    "update borrow set dueDate = date_add(dueDate, interval 3 month) where bid = ?",
    [bid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("listen to port 3001");
  console.log("set up database: " + db);
});
