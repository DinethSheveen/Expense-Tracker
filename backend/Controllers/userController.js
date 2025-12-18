import { userModel } from "../Models/userModel.js"
import { Types } from "mongoose"

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