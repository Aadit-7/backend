const express = require("express");
const notesModel = require("./models/notes.models");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/*
POST /api/notes
*/
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const notes = await notesModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note created successfully",
    notes,
  });
});

/*
- GET /api/notes
*/
app.get("/api/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({
    message: "Notes featched successfully",
    notes,
  });
});

/*
- DELETE /api/notes/:id
*/
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/*
- PATCH /api/notes/:id
*/
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await notesModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note updated successfully",
  });
});

module.exports = app;
