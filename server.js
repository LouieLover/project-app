const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 3001;

let Todo = require("./models/todo.model");

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

todoRoutes.route("/update/:id").post(function (req, res) {
  Todo.findById(req.params.id, function (err, todos) {
    if (!todos) res.status(404).send("data is not found");
    else todos.todo_Team = req.body.todo_Team;
    todos.todo_Location = req.body.todo_Location;
    todos.todo_Description = req.body.todo_Description;
    todos.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then((todos) => {
        res.json("Todo updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
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
// app.use("/", todoRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
