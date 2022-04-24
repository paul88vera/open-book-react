// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/users").then((response) => {
      setUserlist(response.data);
      console.log(response.data);
    });
  }, []);

  const submitForm = () => {
    Axios.post("http://localhost:3001/api/log", {
      username: username,
      password: password,
    }).then(() => {
      console.log("Success!");
    });
  };

  return (
    <div className="App">
      <form>
        <h5>LOGIN</h5>
        <label>
          Username:
          <input
            type="text"
            name="Username"
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button onClick={submitForm}>Submit</button>
      </form>
      {userlist.map((val) => {
        return <h5>User: {val.Username} <br/> Password: {val.Password}</h5>;
      })}
    </div>
  );
}

export default App;
