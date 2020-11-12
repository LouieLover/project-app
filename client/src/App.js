import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Chat from "./components/chat";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import user from "./components/auth/AuthOptions";
import UserContext from "./context/userContext";
import axios from "axios";

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
class App extends Component {
  render() {
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
                  <Link to="/chat" className="nav-link">
                    Chat
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/user" className="nav-link">
                    User
                  </Link>
                </li>
                {/* <li className="navbar-item">{options}</li> */}
              </ul>
              const [scores] = useState([]);
            </div>
          </nav>

          <br />
          {/* <UserContext.Provider value={{ userData, setUserData }}> */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/todos" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/user" component={user} />
          <Route path="/chat" component={Chat} />
          {/* </UserContext.Provider> */}
        </div>
      </Router>
    );
  }
}

export default App;
