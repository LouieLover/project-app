import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/createTeam";
import EditTodo from "./components/editTeam";
import TodosList from "./components/teamList";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import user from "./components/auth/AuthOptions";
import UserContext from "./context/userContext";
import userLogin from "./components/login";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenResponse.data) {
        const userRes = await axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  var options = {
    method: "GET",
    url: "https://sportspage-feeds.p.rapidapi.com/games",
    headers: {
      "x-rapidapi-key": "eb45bf77dfmshf915d7ada5b551ep155d70jsn029abbe4cef7",
      "x-rapidapi-host": "sportspage-feeds.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          SportsMeet
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/user" component={userLogin}>
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/teams">
                Team List
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create">
                New Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/edit/:id">
                Edit Team
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <br />
      <UserContext.Provider value={{ userData, setUserData }}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/teams" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/user" component={userLogin} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
