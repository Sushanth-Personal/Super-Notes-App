const express = require("express");
const User = require("../models/userModel.js");
const mongoose = require("mongoose");

const getGroups = async (req, res) => {
  try {
    const { userId } = req.params; // Extract id from params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "invalid user ID format" });
    }

    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } }, // Match the user by ID
      {
        $project: {
          groups: {
            $map: {
              input: "$groups",
              as: "group",
              in: {
                groupId: "$$group.groupId",
                groupName: "$$group.groupName",
                groupColor: "$$group.groupColor",
                shortForm: "$$group.shortForm",
              },
            },
          },
        },
      },
    ]);

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user[0].groups); // Return the first matched user
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting groups", error });
  }
};

const getNotes = async (req, res) => {
  try {
    const { userId, groupId } = req.params;

    const intGroupId = parseInt(groupId, 10);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "invalid user ID format" });
    }

    const groupObject = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId), // Ensure userId is defined correctly
        },
      },
      {
        $project: {
          groups: {
            $filter: {
              input: { $ifNull: ["$groups", []] },
              as: "group",
              cond: { $eq: ["$$group.groupId", intGroupId] },
            },
          },
        },
      },
    ]);

    if (!groupObject.length) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(groupObject[0].groups[0].notes);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting groups", error });
  }
};

const createNotes = async (req, res) => {
  try {
    const { userId, groupName, groupColor, shortForm, notes } =
      req.body;

    // Step 1: Find the user by userId
    const user = await User.findById(userId); // Assuming userId is the same as _id in the User schema

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // User not found
    }

    // Step 2: Create the new group with the note
    const newGroup = {
      groupId: user.groups.length + 1, // Assign groupId based on the current number of groups
      groupName,
      groupColor,
      shortForm,
      notes: [], // Initialize the notes array
    };

    // Add the notes to the new group
    if (notes && notes.length > 0) {
      newGroup.notes.push(...notes); // Spread operator to add multiple notes
    }

    // Step 3: Push the new group to the user's groups array
    user.groups.push(newGroup);

    // Step 4: Save the updated user document
    await user.save();

    res.status(201).json(user); // Return the newly created group with its notes
  } catch (error) {
    console.error("Error creating note:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const { userId, groupId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific group within the user's groups array
    const selectedGroup = user.groups.find(
      (group) => group.groupId.toString() === groupId
    );

    if (!selectedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }
    // Add the new note to the group's notes array
    selectedGroup.notes = notes;
    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Note updated successfully",
      note: selectedGroup,
    });
  } catch (error) {
    console.error("Error updating notes", error);
    res.status(500).json({ message: "Error updating note", error });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { userId, groupId } = req.params;

    if (!userId || !groupId) {
      return res.status(400).json({ message: "User ID and Group ID are required" });
    }

    // Convert groupId to an integer
    const groupIdInt = parseInt(groupId, 10);

    // Use MongoDB's updateOne method with the $pull operator to remove the group from the groups array
    const result = await User.updateOne(
      { _id: userId }, // Find the user by userId
      { $pull: { groups: { groupId: groupIdInt } } } // Remove the group with the given groupId
    );

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Error deleting group", error });
  }
};


module.exports = {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getGroups,
};
