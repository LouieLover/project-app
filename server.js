const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const teamRoutes = express.Router();
// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const PORT = process.env.PORT || 3001;

let Team = require("./models/team.model");
// let User = require("./models/userModel");

app.use(cors());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/barteam", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

teamRoutes.route("/").get(function (req, res) {
  Team.find(function (err, teams) {
    if (err) {
      console.log(err);
    } else {
      res.json(teams);
    }
  });
});

teamRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Team.findById(id, function (err, teams) {
    res.json(teams);
  });
});

teamRoutes.route("/:id").put(function (req, res) {
  console.log(req.params.id);
  Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

teamRoutes.route("/:id").delete(function (req, res) {
  console.log(req.params.id);
  Team.findById({ _id: req.params.id })
    .then((dbModel) => dbModel.remove())
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

teamRoutes.route("/add").post(function (req, res) {
  let teams = new Team(req.body);
  teams
    .save()
    .then((teams) => {
      res.status(200).json({ todo: "team added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new team failed");
    });
});

app.use("/teams", teamRoutes);
app.use("/user", require("./routes/user"));

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
