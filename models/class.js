const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  // add
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
