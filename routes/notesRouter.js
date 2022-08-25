const express = require("express");
const router = express.Router();
const fsUtils = require("../helpers/fsUtils");

// GET Route for retrieving all the tips
router.get("/", (req, res) => {
  fsUtils
    .readFromFile("./db/db.json")
    .then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
router.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    fsUtils.readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;
