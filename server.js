const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const PORT = 3001;

let Todo = require("./models/todo.model");
// let User = require("./models/userModel");

app.use(cors());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, todos) {
    res.json(todos);
  });
});

todoRoutes.route("/:id").put(function (req, res) {
  console.log(req.params.id);
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

todoRoutes.route("/:id").delete(function (req, res) {
  console.log(req.params.id);
  Todo.findById({ _id: req.params.id })
    .then((dbModel) => dbModel.remove())
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

todoRoutes.route("/add").post(function (req, res) {
  let todos = new Todo(req.body);
  todos
    .save()
    .then((todos) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

app.use("/todos", todoRoutes);
app.use("/users", require("./routes/user"));

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
