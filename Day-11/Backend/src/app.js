const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

/* POST /api1/notes */
app.post("/api1/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({ title, description });

  res.status(201).json({
    msg: "Note created",
    note,
  });
});

/* GET /api1/notes */
app.get("/api1/notes", async (req, res) => {
  const note = await noteModel.find();

  res.status(200).json({
    msg: "Note fetched",
    note,
  });
});

/* DELETE /api1/notes/:id */
app.delete("/api1/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    msg: "Note deleted",
  });
});

/* PATCH /api1/notes/:id */
app.patch("/api1/notes/:id", async (req, res) => {
  const id = req.params.id;

  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, {
    description: description,
  });

  res.status(200).json({
    msg: "Note updated",
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
