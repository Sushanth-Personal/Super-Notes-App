const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the note schema
const noteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
});

// Define the group schema
const groupSchema = new mongoose.Schema(
  {
    groupId: {
      type: Number,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    groupColor: {
      type: String,
      required: true,
    },
    shortForm: {
      type: String,
      required: true,
    },
    notes: [noteSchema], // Use noteSchema for the notes array
  },
  { timestamps: true }
);

// Define the user authentication schema
const authSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true, // Ensure each username is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure each email is unique
      match: /.+\@.+\..+/, // Basic email format validation
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String, // Store the refresh token
    },
    groups: [groupSchema], // Embed groups array
  },
  { timestamps: true }
);

//Pre-save middleware to hash the password
authSchema.pre("save", async function (next) {
  console.log("pre save");
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

// Method to compare passwords
authSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Static method for user login
authSchema.statics.login = async function (identifier, password) {
  const user = await this.findOne({
    $or: [
      { userName: identifier },
      { email: identifier },
    ],
  },{password:1},{refreshToken:1});
 
  if (!user) {
    throw new Error("User not found");
  }
  // Check if the password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  return user._id;
};

// Export the user model
const User = mongoose.model("User", authSchema);
module.exports = User;
