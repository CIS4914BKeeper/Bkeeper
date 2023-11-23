// const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Metric = require("../models/metricsModel");

exports.getOverview = (req, res) => {
  res.status(200).render("overview", {
    title: "Bkeeper",
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getSignupRequestForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Request your account",
  });
};

exports.getPasswordForm = (req, res) => {
  res.status(200).render("setPassword", {
    title: "Set your password",
  });
};

exports.getApprove = (req, res) => {
  res.status(200).send({
    status: "success",
    message: "User signup request sent for admin review",
  });
};

exports.getDashboard = async (req, res) => {
  res.status(200).render("dashboard", {
    title: "Dashboard",
  });
};

// Metrics intake
exports.metricsIntake = (req, res) => {
  res.render("metricsIntake");
};

exports.getMetricData = async (req, res) => {
  const user = await User.findById(req.user.id);
  const classNames = user.class;

  const data = {};

  classNames.forEach((e) => {
    data[e] = 0;
  });

  try {
    // Query metrics and increment counts based on the class
    // const id = user.studentId.toString();

    // const metrics = await Metric.find({ studentId: { $in: id } });
    const metrics = await Metric.find({ studentId: { $in: user.studentId } });

    metrics.forEach((metric) => {
      const className = metric.classID;

      data[className] += 1; // Increment the count for the class
    });
  } catch (error) {
    // console.error("Error querying metrics:", error);
  }

  res.status(200).json({
    status: "success",
    data,
  });
};
