const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  studentId: {
    type: String, // or Number if student IDs are numeric
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  infractionType: {
    type: String,
    required: true,
  },
  Bgrade: {
    type: Number, // or String if grades are represented as text
    required: true,
  },
  classID: {
    type: String, // 4 digits
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // not sure
  // class: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Class',
  //   required: [true, 'Class must belong to a metric.'],
  // },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: [true, 'Metric must belong to a user'],
  // },
});

const Metric = mongoose.model("Metric", metricSchema);

module.exports = Metric;
