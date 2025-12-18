import { Types } from "mongoose"
import { incomeModel } from "../Models/incomeModel.js"
import  validator from "validator"
import { userModel } from "../Models/userModel.js"

export const retreiveIncome = async(req,res)=>{

    const {userId} = req.params

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user"})
    }

    try {
        const user = await userModel.findById(userId).populate("income").sort({createdAt:-1})

        const income = user.income

        if(!income){
            return res.status(200).json({message:"Income list is empty. Please add the income details"})
        }

        res.status(200).json({message : income})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const addIncome = async(req,res)=>{
    const {userId} = req.params
    const {title,amount,category,description,date} = req.body

    if(!title || !amount || !category || !description || !date){
        return res.status(400).json({message:"Please fill in all fields"})
    }

    const parsedAmount = parseFloat(amount)

    if(isNaN(parsedAmount)){
        return res.status(400).json({message:"Amount should be a number"})
    }

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message:"Invalid user id"})
    }

    if(!validator.isDate(date)){
        return res.status(400).json({message:"Date format should be (YYYY-MM-DD)"})
    }

    try {
        const income = await incomeModel.create({title,amount:parsedAmount,category,description,date,user:userId})

        const user = await userModel.findByIdAndUpdate(userId,{$push:{income}},{new:true})

        res.status(201).json({message:"Income Added Successfully"})
        
    } catch (error) {        
        res.status(500).json({message:error.message})
    }
}

export const deleteIncome = async(req,res)=>{
    const {incomeId,userId} = req.params

    if(!incomeId){
        return res.status(400).json({message : "Missing income id"})
    }

    if(!Types.ObjectId.isValid(incomeId)){
        return res.status(400).json({message : "Invalid income id"})
    }

    try {
        const income = await incomeModel.findByIdAndDelete(incomeId)

        const user = await userModel.findByIdAndUpdate(userId,{$pull:{income:incomeId}})

        res.status(200).json({message : "Income Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const incomeByDate = async(req,res)=>{

    const {userId} = req.params

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user id"})
    }

    try {
        const user = await userModel.findById(userId).populate("income").sort({date:1}) 

        const income = user.income

        if(!income){
            return res.status(200).json({message:"Expense list is empty. Please add the expense details"})
        }

        res.status(200).json({message : income})
    
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}