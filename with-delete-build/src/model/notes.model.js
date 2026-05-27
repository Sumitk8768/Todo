import mongoose from "mongoose"

let noteSchema = new mongoose.Schema({
    title:String,
    description: String
})

let noteModel = mongoose.model("note_2", noteSchema);

export default noteModel;