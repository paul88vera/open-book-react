const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddb",
});

app.use(
  cors({
    origin: ["https://demo.inleague.io/"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  session({
    key: "userId",
    secret: "thissismysecretsshhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/authenticate", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send({ message: "You need a token, bud... Try again" });
  } else {
    jwt.verify(token, "thissismysecretsshhhhh", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("api/v1/authenticate", verifyJWT, (req, res) => {
  res.send({ message: "You're authenticated, bro!" });
});

app.get("/api/v1//authenticate", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
    res.send({ message: "You're logged in!" });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/api/v1/authenticate", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  bcrypt.hash(password, saltRounds, (error, hash) => {
    if (error) {
      throw (error);
    }
    const sqlInsert = "INSERT INTO users (Username, Password) VALUES (?,?);";
    db.query(sqlInsert, [username, hash], (error, result) => {
      res.send(result);
    });
  });
});

app.post("/api/v1/authenticate", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT Username FROM cruddb.users WHERE Username = (?)",
    username,
    (error, result) => {
      if (error) {
        res.send({ error: error });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "thissismysecretsshhhhh", {
              expiresIn: 300,
            });

            res.session.user = result;
            res.json({ auth: true, token: token, result: result });
          } else {
            res.send({
              auth: false,
              message: "Wrong username/password combination!",
            });
          }
        });
      } else {
        res.json({ auth: false, message: "User doesn't exist!" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
