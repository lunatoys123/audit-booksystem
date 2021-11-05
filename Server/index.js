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
  const secondCategories = req.query.SecondCategories;

  const start_of = limit * (page - 1);

  let query = "select acc, title, author, year, publisher, date, categories, scategories, bstatus from bookmaster where 1=1 ";

  if(Title !==''){
    query +=" and title like '%"+Title+"'% ";
  }

  if(Author !==''){
    query += " and author like '%"+Author+"%' ";
  }

  if(Publisher !==''){
    query += " and publisher like '%"+Publisher+"%' ";
  }

  if(categories !==''){
    query += " and categories like '%"+categories+"%' ";
  }

  if(secondCategories !==''){
    query += " and scategories like '%"+secondCategories+"%' ";
  }

  query += "limit ?,?";
  db.query(query,[start_of, limit], (err, result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
});

app.get("/AllBooks", (req, res) => {
  db.query(
    "select acc, title, author, year, publisher, unix_timestamp(date) * 1000 as stamp, categories, scategories, bstatus from bookmaster limit 5",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("set up database " + db);
  console.log("Server listen to 3001");
});
