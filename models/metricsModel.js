const mongoose = require('mongoose');
const Class = require('./class');

const metricSchema = new mongoose.Schema({
  studentID: {
    type: String, // or Number if student IDs are numeric
    required: true,
    unique: true,
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
    type: Number, // 4 digits
    required: true,
  },
  classID: {
    type: String,
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

const Metric = mongoose.model('Metric', metricSchema);

module.exports = Metric;
