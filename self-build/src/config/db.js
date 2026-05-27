import mongoose from "mongoose"

async function connectDB (){
    try {
        await mongoose.connect("mongodb://localhost:27017/todo")
        console.log("mongodb connected sucessfully")
    } catch (error) {
        console.log("error in connecting mongodb")
    }
}

export default connectDB;