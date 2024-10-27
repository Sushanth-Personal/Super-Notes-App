const express = require("express");
const Notes = require("../models/notesModel.js");

const getNotes = async (req, res) => {
  try {
    
    const { id } = req.params; // Extract id from params
    console.log("Id request",id);
    if (!id) { // If no id is provided, fetch all notes
      const notes = await Notes.find();
      if (!notes || notes.length === 0) {
        res.status(404).json({ message: "Groups not found" });
      } else {
        res.status(200).json(notes);
      }
    } else { // If an id is provided, fetch the specific note
      const note = await Notes.findById(id);
      if (!note) {
        res.status(404).json({ message: "Note not found" });
      } else {
        res.status(200).json(note);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting notes", error });
  }
};

const createNotes = async (req, res) => {
  try {
    const { groupName, groupColor, shortForm ,notes} = req.body;
    console.log("Backend",notes);
    const newNote = new Notes({ groupName, groupColor, shortForm,notes });
    await newNote.save();
    res.status(201).json(newNote); // Return the newly created note
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const { id } = req.params;
    const selectedGroup = await Notes.findById(id);
    
    if (!selectedGroup) {
      return res.status(404).json({ message: "Note not found" });
    }

    selectedGroup.notes = notes || selectedGroup.notes;
   
    await selectedGroup.save();
    res.status(200).json({ message: "Note updated successfully", note: selectedGroup }); // Return success response
  } catch (error) {
    console.error("Error updating notes", error);
    res.status(500).json({ message: "Error updating note", error });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    // Delete the note by its ID
    const notes = await Notes.findByIdAndDelete(id);

    // Check if the note existed and was deleted
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note", error });
  }
};
module.exports = { getNotes, createNotes, updateNotes,deleteNotes};
