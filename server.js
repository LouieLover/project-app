const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const PORT = 3001;

let Todo = require("./models/todo.model");
let User = require("./models/userModel");

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

  // if (!todos) res.status(404).send("data is not found");
  // else todos.todo_Team = req.body.todo_Team;
  // todos.todo_Location = req.body.todo_Location;
  // todos.todo_Description = req.body.todo_Description;
  // todos.todo_completed = req.body.todo_completed;

  // todo
  //   .save()
  //   .then((todos) => {
  //     res.json("Todo updated!");
  //   })
  //   .catch((err) => {
  //     res.status(400).send("Update not possible");
  //   });
  // });
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

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

app.use("/todos", todoRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
