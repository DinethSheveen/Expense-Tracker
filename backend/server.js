import "dotenv/config"
import express from "express"
import dbConnect from "./Config/dbConfig.js"
import router from "./Routes/transactionRouter.js"

// APP DECLARATION
const app = express() 

// PORT
const PORT = process.env.PORT || 3000

// MIDDLEWARE CONFIG
app.use(express.json())

// ROUTING
app.use("/api/transactions",router)

// APP LISTEN
app.listen(PORT,async()=>{
    await dbConnect()
    console.log(`Server is running on http://localhost:${PORT}`);
})