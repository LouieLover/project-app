import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
      const tokenResponse = await axios.post("/user/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenResponse.data) {
        const userRes = await axios.get("/user/", {
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

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Nav userData={userData} logout={logout} />

        <br />
        {userData.user && (
          <Switch>
            <Route path="/edit/:id" component={EditTeam} />
            <Route path="/user" component={CreateTeam} />
            <Route path={["/teams", "/"]} exact component={TeamList} />
          </Switch>
        )}
        {!userData.user && (
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/edit/:id" component={Login} />
            <Route path="/user" component={Login} />
            <Route path={["/teams", "/"]} component={Login} />
          </Switch>
        )}
      </UserContext.Provider>
    </Router>
  );
}

export default App;
