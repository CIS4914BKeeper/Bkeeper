const mongoose = require('mongoose');

const MetricsSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
});

const Metrics = mongoose.model('Metrics', MetricsSchema);

module.exports = Metrics;
