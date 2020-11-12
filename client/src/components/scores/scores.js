import React from "react";
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

function scores() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/"></a>
      </nav>
    </div>
  );
}

export default scores;
