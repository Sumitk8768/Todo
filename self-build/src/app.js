import express from "express";
import noteModel from "./models/notes.model.js";
let app = express();
app.use(express.json());

//* @routes POST /api/notes
//* @description Create a new note need title and description in the rewuest body
//* @access Public

app.post("/api/notes", async (req, res) => {
  let { title, description } = req.body;

  // -----  Validatation ---------
  if (!title || !title.trim())
    return res.status(400).json({ error: "Title not found" });

  if (!description)
    return res.status(400).json({ error: "Description not found" });

  if (title.trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Title must be at least 3 character long" });
  }

  if (description.trim().length < 10) {
    return res
      .status(400)
      .json({ error: "Description must be at least 10 character long" });
  }

  // IF validation passes then, createing note
  const newNote = await noteModel.create({ title, description });

  return res.status(201).json({
    message: "Note Created successfully",
    note: newNote,
  });
});

//* @routes get /api/notes
//* @description get all notes
//* @access Public

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  return res.status(200).json({
    message: "Notes fechhed successfully",
    notes,
  });
});

//* @routes PATCH /api/notes
//* @description updating note description by id
//* @access Public
app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  //------validation-------
  if (!description)
    return res.status(400).json({ error: "Description is required" });

  if (description.length < 10)
    return res
      .status(400)
      .json({ error: "Description must be atleast 10 characters long" });

  const note = await noteModel.findById(id);

  if (!note) return res.status(400).json({ error: "note not found " });

  note.description = description;
  await note.save();

  return res.status(200).json({
    message: "Notes updated successfully",
    note,
  });
});

export default app;
