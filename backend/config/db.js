const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Successfully Connected with MongoDB");
  } catch (error) {
    console.error("Server Error:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = ConnectDB;

module.exports = ConnectDB;
