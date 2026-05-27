import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

const NodeModel = mongoose.model('notes', noteSchema)

export default NodeModel;t