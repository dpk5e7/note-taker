const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/api/notes", require("./notesRouter"));

// GET Route for feedback page
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

// Send anything but /notes to index.html
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
