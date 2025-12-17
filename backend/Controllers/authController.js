import { userModel } from "../Models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import createToken from "../Config/jwt.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

export const register = async(req,res)=>{
    const {name,username,email,password} = req.body || {}

    if(!name || !username || !email || !password){
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

        if(exisitingEmail){            
            return res.status(400).json({message : "Email already exists"})
        }

        const exisitingUsername = await userModel.findOne({username})

        if(exisitingUsername){
            return res.status(400).json({message : "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await userModel.create({name,username,email,password:hashedPassword})
        res.status(201).json({message : "Account Registered Successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})        
    }
}
export const login = async(req,res)=>{
    
    const {username,password} = req.body || {}

    if(!username || !password){
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

        const {password:hashedPassword,...rest} = user._doc 

        // JWT CREATE FUNCTION
        const token = createToken(user)

        // SET COOKIE
        res
        .cookie("access_token",token,{
            httpOnly:true,
            maxAge : 3600*1000,
            sameSite : "strict",
            secure : true
        })
        .status(200)
        .json({
            message : "Successfull Login",
            userInfo:rest
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})        
    }
}

//VERIFY USER
export const getMe = async(req,res)=>{
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json({message : "Unauthorized user"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await userModel.findById(decoded.id).select("-password")
        res.status(200).json({message : "Authorized user",userInfo:user })
    } catch (error) {
        res.status(401).json({message : "Invalid token"})
    }
} 