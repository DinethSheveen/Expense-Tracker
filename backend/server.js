import "dotenv/config"
import express from "express"
import dbConnect from "./Config/dbConfig.js"
import transactionRouter from "./Routes/transactionRouter.js"
import userRouter from "./Routes/userRouter.js"
import cors from "cors"
import authRouter from "./Routes/authRouter.js"
import cookieParser from "cookie-parser"

// APP DECLARATION
const app = express() 

// PORT
const PORT = process.env.PORT || 3000

// MIDDLEWARE CONFIG
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin : "http://localhost:5173",credentials:true}))
app.use("/images",express.static("public/images"))

// ROUTING
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/transactions",transactionRouter)

// APP LISTEN
app.listen(PORT,async()=>{
    await dbConnect()
    console.log(`Server is running on http://localhost:${PORT}`);
})