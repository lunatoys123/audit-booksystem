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
    "Select count(*) as num, uname from user where uname=? and upassword = ? ",
    [username, password],
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result);
            res.send(...result);
        }
    }
  );

});

app.listen(3001, () => {
  console.log("set up database " + db);
  console.log("Server listen to 3001");
});
