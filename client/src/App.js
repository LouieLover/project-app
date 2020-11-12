import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Chat from "./components/chat";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import UserContext from "./context/userContext";

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
                  <Link to="/Login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/Register" className="nav-link">
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
              </ul>
            </div>
          </nav>

          <br />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/todos" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />

          <Route path="/chat" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
