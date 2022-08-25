const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/api/notes", require("./notesRouter"));

// GET Route for homepage
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// GET Route for feedback page
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

//The 404 Route (ALWAYS Keep this as the last route)
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/pages/404.html"));
});

module.exports = router;
