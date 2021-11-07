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

  if (Title !== "") {
    query += " and title like '%" + Title + "'% ";
  }

  if (Author !== "") {
    query += " and author like '%" + Author + "%' ";
  }

  if (Publisher !== "") {
    query += " and publisher like '%" + Publisher + "%' ";
  }

  if (Year !== "") {
    query += " and year like '%" + Year + "%' ";
  }

  if (categories !== "") {
    query += " and categories like '%" + categories + "%' ";
  }

  if (date !== "") {
    query += " and date like '%" + date + "%' ";
  }

  query += "limit ?,?";
  db.query(query, [start_of, limit], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/fetchCategories",(req, res)=>{
  db.query("select * from classification",(err, result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
});


app.get("/fetchTotalPage", (req, res)=>{
  const Title = req.query.Title;
  const Author = req.query.Author;
  const Publisher = req.query.Publisher;
  const Year = req.query.Year;
  const categories = req.query.categories;
  const date = req.query.date;

  query = "select count(*) as totalNumber from bookmaster where 1=1 "

  
  if (Title !== "") {
    query += " and title like '%" + Title + "'% ";
  }

  if (Author !== "") {
    query += " and author like '%" + Author + "%' ";
  }

  if (Publisher !== "") {
    query += " and publisher like '%" + Publisher + "%' ";
  }

  if (Year !== "") {
    query += " and year like '%" + Year + "%' ";
  }

  if (categories !== "") {
    query += " and categories like '%" + categories + "%' ";
  }

  if (date !== "") {
    query += " and date like '%" + date + "%' ";
  }

  db.query(query, (err, result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(...result);
    }
  })

})
