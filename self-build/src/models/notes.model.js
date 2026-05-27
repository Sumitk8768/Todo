import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const noteModel = mongoose.model("myNotes",noteSchema)

export default noteModel;