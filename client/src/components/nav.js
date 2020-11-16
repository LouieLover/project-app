import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="login">
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
                <a className="nav-link" href="/login">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/teams">
                  Team List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user">
                  New Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/edit/:id">
                  Edit Team
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
