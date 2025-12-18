import mongoose, { Types } from "mongoose"

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        sparse : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        sparse : true
    },
    password : {
        type : String,
        required : true
    },
    income : [{
        type : Types.ObjectId,
        ref : "income"
    }],
    expense : [{
        type : Types.ObjectId,
        ref : "expense"
    }]
},{timestamps:true}
)

export const userModel = mongoose.model("user",userSchema) 