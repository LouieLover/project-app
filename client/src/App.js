import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import user from "./components/auth/AuthOptions";
import UserContext from "./context/userContext";

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

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" target="_blank"></a>
          <Link to="/" className="navbar-brand"></Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Submit
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/todos" className="nav-link">
                  Team Info
                </Link>
              </li>

              <li className="navbar-item">
                <Link to="/user" className="nav-link">
                  User
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <br />
        <UserContext.Provider value={{ userData, setUserData }}>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/todos" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/user" component={user} />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
