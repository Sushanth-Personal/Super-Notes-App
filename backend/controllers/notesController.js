const express = require("express");
const Notes = require("../models/notesModel.js");

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    if (!notes || notes.length === 0) {
      res.status(404).json({ message: "Notes not found" });
    } else {
      const filteredNotes = notes.filter(
        (note) => note.groupName === req.params.groupName
      );
      res.status(200).json(filteredNotes);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting notes", error });
  }
};

const createNotes = async (req, res) => {
  try {
    const { groupName,groupColor,shortForm,notes } = req.body;
    const newNote = new Notes({ groupName, groupColor,shortForm, notes });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

module.exports = {getNotes,createNotes};
