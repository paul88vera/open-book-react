const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/users", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.post("/api/log", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlInsert = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sqlInsert, [username, password], (error, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
