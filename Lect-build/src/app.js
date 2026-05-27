import express from "express";
import NoteModel from "./models/notes.model.js";
 let app = express();
app.use(express.json())

//* @routes POST /api/notes
//* @description Create a new note need title and description in the rewuest body
//* @access Public

app.post("/api/notes",async (req, res)=> {
    const {title, description} = req.body;
// ---------  Validation  ---------------
    if(!title) {
        return res.status(400).json({error: "Title is required"})
    }
    if(!description) {
        return res.status(400).json({error: "Description is required"})
    }

    if(title.trim().length < 3) {
        return res.status(400).json({error: "Title must be at least 3 character long"})
    }

     if(title.trim().length < 10) {
        return res.status(400).json({error: "Description must be at least 10 character long"})
    }


    // --- If validation passes, create the node ----
    const newNote = await NoteModel.create({title, description});

    return res.status(201).json({
        message: "Note Created successfully",
        note: newNote,
    })
})



export default app