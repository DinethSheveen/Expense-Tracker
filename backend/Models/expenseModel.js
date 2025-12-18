import mongoose, { Types } from "mongoose";

const expenseSchema = mongoose.Schema({
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
    },
    user : {
        type  : Types.ObjectId,
        ref : "user",
        required : true
    }
},{timestamps:true})

export const expenseModel = mongoose.model("expense",expenseSchema)