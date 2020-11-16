const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Team = new Schema({
  user: {
    type: String,
  },
  team: {
    type: String,
  },
  location: {
    type: String,
  },
  complete: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Team", Team);
