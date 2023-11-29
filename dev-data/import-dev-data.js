const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Metric = require("../models/metricsModel");

dotenv.config({ path: "../config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const metrics = JSON.parse(
  fs.readFileSync(`${__dirname}/metrics.json`, "utf-8"),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Metric.create(metrics, { validateBeforeSave: false });
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Metric.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
