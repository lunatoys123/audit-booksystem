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
  const computerNo = req.query.computerNo;
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

  if (computerNo !== "") {
    query += " and acc = " + computerNo+" ";
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
    query += " and date >= " + date + " ";
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
    query += " and acc = " + computerNo+" ";
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
    query += " and date >= " + date + " ";
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

app.listen(3001, () => {
  console.log("listen to port 3001");
  console.log("set up database: " + db);
});
