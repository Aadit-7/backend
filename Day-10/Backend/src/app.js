const express = require("express");
const cors = require("cors");
const noteModel = require("./models/notes.model");

const app = express();
app.use(cors());
app.use(express.json());

/*
POST /api/notes
*/

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    msg: "Note created successfully",
    note,
  });
});

/*
GET /api/notes
*/
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    msg: "Note fetched successfully",
    notes,
  });
});

/*
DELETE /api/notes/:id
*/
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    msg: "Note deleted successfully",
  });
});

/*
PATCH /api/notes/:id
*/
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    msg: "Note updated successfully",
  });
});
module.exports = app;
