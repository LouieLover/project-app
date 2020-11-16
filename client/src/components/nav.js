import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ userData, logout }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
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
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {!userData.user && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/teamlist">
                Team List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                New Team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/edit/:id">
                Edit Team
              </Link>
            </li>
            {userData.user && <button onClick={logout}>Log out</button>}
          </ul>
        </div>
      </nav>
    </div>
  );
}
