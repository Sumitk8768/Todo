import mongoose from "mongoose"

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/todo")
        console.log("MongoDB comnnected successfully")
    } catch (error) {
        console.log("Error in connecting Database", error)
    }
}

export default connectDB