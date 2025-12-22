import { Types } from "mongoose"

// VALIDATING THE USER
export const verifyUserId = (req,res,next)=>{
    const {userId} = req.params
    
    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user id"})
    }

    // ATTACHING THE USER TO USE IN THE CONTROLLER
    req.validatedUser = userId

    next()
}