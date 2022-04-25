// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
// import Login from "./Pages/login";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/users")
      .then((response) => {
        setUserlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        console.log("Success!", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitForm = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log("Success!", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //* trying something here... erase in a bit
    // .then(() => {
    //   return loggedIn;
    // })
  };

  return (
    <div className="App">
      <form>
        <h5>Login</h5>
        <label>
          Username:
          <input
            type="text"
            name="Username"
            onChange={(e) => {
              if (!login) {
                setUsernameReg(e.target.value);
              } else {
                setUsername(e.target.value);
              }
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="Password"
            onChange={(e) => {
              if (!login) {
                setPasswordReg(e.target.value);
              } else {
                setPassword(e.target.value);
              }
            }}
          />
        </label>
        <button onClick={login}>Login</button>
        <br />
        <a onClick={submitForm}>Register</a>
      </form>
      {/* <Login /> */}
      {userlist.map((val) => {
        return (
          <h5>
            User: {val.Username} <br /> Password: {val.Password}
          </h5>
        );
      })}
    </div>
  );
}

export default App;
