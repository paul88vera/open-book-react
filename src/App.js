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
  //eslint-disable-next-line
  const [userlist, setUserlist] = useState([]);

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://demo.inleague.io/api/v1/authenticate")
      .then((response) => {
        setUserlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const login = () => {
    Axios.post("https://demo.inleague.io/api/v1/authenticate", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data);
        setLoginStatus(true);
      }
    });
  };

  const register = () => {
    Axios.post("https://demo.inleague.io/api/v1/authenticate", {
      username: usernameReg,
      password: passwordReg,
    }).then(() => {
      console.log("You're Registered!");
    });
  };

  // TODO For a button to check Authentication
  // const userAuthenticated = () => {
  //   Axios.get("http://localhost:3001/UserAuth", {
  //     headers: {
  //       "x-access-token": "pv88era",
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <div className="App">
      <form>
        <h5>Login</h5>
        <label>
          Username:
          <input
            type="text"
            name="Username"
            autoComplete="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="Password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button onClick={login}>Login</button>
      </form>

      <form>
        <h5>Register</h5>
        <label>
          Username:
          <input
            type="text"
            name="Username"
            autoComplete="username"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="Password"
            autoComplete="current-password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </label>
        <button onClick={register}>Register</button>
      </form>

      <h3>{loginStatus}</h3>

      {/* <Login isLoggedIn={true} /> */}
      {/* {userlist.map((val) => {
        return (
          <div >
            User: {val.Username} <br /> Password: {val.Password}
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
