import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTeam from "./components/createTeam";
import EditTeam from "./components/editTeam";
import TeamList from "./components/teamList";
import Nav from "./components/nav";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import user from "./components/auth/AuthOptions";
import UserContext from "./context/userContext";
// import userLogin from "./components/login";
// import Scores from "./components/scores/scores";

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
      <Nav />
      <br />
      <UserContext.Provider value={{ userData, setUserData }}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/teams" exact component={TeamList} />
        <Route path="/edit/:id" component={EditTeam} />
        <Route path="/user" component={CreateTeam} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
