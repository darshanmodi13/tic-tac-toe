const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  roomId: {
    type: String,
  },
  users: {
    type: {String},
  },
});

module.exports = mongoose.model("Game", GameSchema);
