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

     if(description.trim().length < 10) {
        return res.status(400).json({error: "Description must be at least 10 character long"})
    }


    // --- If validation passes, create the node ----
    const newNote = await NoteModel.create({title, description});

    return res.status(201).json({
        message: "Note Created successfully",
        note: newNote,
    })
})
// //* @routes GET /api/notes
//* @description Gets all notes
//* @access Public

app.get("/api/notes",async (req,res)=>{
    const notes = await NoteModel.find()

     return res.status(200).json({
        message: "Notes fechhed successfully",
        notes,
    })
})

// //* @routes PATCH /api/notes
//* @description Update a note by id require description in the request body
//* @access Public

app.patch("/api/notes/:id", async (req,res)=>{
    const {id} = req.params;
    const {description} = req.body

    //------Validation -------
    if(!description)
        return res.status(400).json({error: "Description is required"})

     if(description.length < 10)
        return res.status(400).json({error: "Description must be atleast 10 characters long"})

     const note = await NoteModel.findById(id)

     if(!note)
        return res.status(400).json({error: "note not found"})

     note.description = description,
    await note.save()

return res.status(200).json({
        message: "Notes updated successfully",
        note,
    })
})


export default app
