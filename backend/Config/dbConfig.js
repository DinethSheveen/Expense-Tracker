import "dotenv/config"
import mongoose from "mongoose"

const dbConnect = async()=>{
    const DB_URI = process.env.MONGODB_URI
    try {
        await mongoose.connect(DB_URI).then(()=>{
            console.log("Connected to the database");
        })
    } catch (error) {        
        console.log(error);
    }
}

export default dbConnect