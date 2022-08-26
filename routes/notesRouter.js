const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fsUtils = require("../helpers/fsUtils");
const fs = require("fs");

// GET Route for retrieving all notes
router.get("/", (req, res) => {
  fsUtils
    .readFromFile("./db/db.json")
    .then((data) => res.json(JSON.parse(data)));
});

// GET route for retreiving one note
router.get("/:id", (req, res) => {
  // req.params.id is stored in the the / after "title" in the URL
  const requestedNoteID = req.params.id;

  const notes = require("../db/db.json");

  for (let i = 0; i < notes.length; i++) {
    if (requestedNoteID === notes[i].id) {
      return res.json(notes[i]);
    }
  }

  // Return a message if the title doesn't exist in our DB
  return res.json("No note found");
});

// POST Route for a new note
router.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    fsUtils.readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

// GET route for retreiving one note
router.delete("/:id", (req, res) => {
  // req.params.id is stored in the the / after "title" in the URL
  const noteIDtoDelete = req.params.id;

  const notes = JSON.parse(fs.readFileSync("./db/db.json"));

  const newNotes = [];

  for (const note of notes) {
    if (noteIDtoDelete !== note.id) {
      // Push it to the array if it's not the one to be deleted
      newNotes.push(note);
    }
  }
  fsUtils.writeToFile("./db/db.json", newNotes);

  // Return a message if the title doesn't exist in our DB
  return res.json(`${noteIDtoDelete} deleted`);
});

module.exports = router;
