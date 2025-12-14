import mongoose from "mongoose"

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
    }
},{timestamps:true}
)

export const userModel = mongoose.model("user",userSchema) 