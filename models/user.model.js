const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  todo_team: {
    type: String,
  },
  todo_location: {
    type: String,
  },
  todo_description: {
    type: String,
  },
  todo_completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", Todo);
