import { userModel } from "../Models/userModel.js"
import { Types } from "mongoose"
import bcrypt from "bcryptjs"
import validator from "validator"

export const uploadPicture = async(req, res)=> {
    const {userId} = req.params
  
    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user id"})
    }

    try {
        const user = await userModel.findByIdAndUpdate(userId,{image:req.file.filename})

        if(!user){
            return res.status(400).json({message : "Invalid user id"})
        }

        res.status(200).json({message : "Updated successfully... Refresh to visualize"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const changePassword = async(req,res)=>{
    const {currentPassword,newPassword,confirmPassword} = req.body
    const {userId} = req.params
    
    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user id"})
    }

    if(!currentPassword || !newPassword || !confirmPassword){
        return res.status(400).json({message : "Fill in all fields to proceed changing the password"})
    }

    try {
        const user = await userModel.findById(userId)
        
        if(!user){
            return res.status(404).json({message : "No user found with this id"})
        }

        const passwordMatch = await bcrypt.compare(currentPassword,user.password)

        if(!passwordMatch){
            return res.status(400).json({message : "Your current password is incorrect"})
        }

        if(!validator.isStrongPassword(newPassword)){
            return res.status(400).json({message : "Your new password is not strong enough. Use atleast 8 characters, including a sybmol, a special character, a uppercase letter, a lowercase letter"})
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({message : "Your new password don't match"})
        }

        const newHashPassword = await bcrypt.hash(newPassword,10)
        
        const updatedUser = await userModel.findByIdAndUpdate(userId,{password : newHashPassword})
        
        res.status(200).json({message : "Password Changed Successfully"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}