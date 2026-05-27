import app from "./src/app.js";
import connectDB from "./src/config/db.js";

// calling db function
connectDB()

// server is running
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

