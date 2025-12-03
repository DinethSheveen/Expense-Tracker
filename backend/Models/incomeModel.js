import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
    title:{
        type : String,
        required:true,
        maxLength : 20
    },
    amount:{
        type : Number,
        required:true,
    },
    category:{
        type : String,
        required:true,
    },
    description:{
        type : String,
        required:true,
    },
    date:{
        type : Date,
        required:true,
    }
},{timestamps:true})

export const incomeModel = mongoose.model("income",incomeSchema)