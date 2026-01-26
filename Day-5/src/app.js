const express = require("express");

const app = express();
app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.send("Note created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.send("Note deleted");
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  //   notes[req.params.index].title = req.body.title;

  res.send("Note modified");
});

module.exports = app;
