import { userModel } from "../Models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"

export const register = async(req,res)=>{
    const {name,username,email,password} = req.body || {}

    if(!name.trim() || !username.trim() || !email.trim() || !password.trim()){
        return res.status(400).json({message : "Please fill in all fields"})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message : "Invalid email format"})
    }

    if(!validator.isStrongPassword(password)){
        return res.status(400).json({message : "Password should atleast be 8 characters long and include uppercase, lowercase, number, and symbol"})
    }

    try {

        const exisitingEmail = await userModel.findOne({email})

        if(exisitingEmail.trim()){            
            return res.status(400).json({message : "Email already exists"})
        }

        const exisitingUsername = await userModel.findOne({username})

        if(exisitingUsername){
            return res.status(400).json({message : "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await userModel.create({name,username,email,password:hashedPassword})
        res.status(201).json({message : "user created"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})        
    }
}
export const login = async(req,res)=>{
    
    const {username,password} = req.body || {}

    if(!username.trim() || !password.trim()){
        return res.status(400).json({message : "Please fill all fields"})
    }

    try {
        const user = await userModel.findOne({username})

        if(!user){
            return res.status(400).json({message : "Invalid credentials"})
        }
        
        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword){
            return res.status(400).json({message : "Invalid credentials"})
        }

        res.status(200).json({message : "Successfull Login"})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})        
    }
}