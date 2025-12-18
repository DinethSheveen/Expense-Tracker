import { Types } from "mongoose"
import { expenseModel } from "../Models/expenseModel.js"
import validator from "validator"
import { userModel } from "../Models/userModel.js"

export const retreiveExpense = async(req,res)=>{

    const {userId} = req.params

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message:"Invalid user id"})
    }

    try {
        const user = await userModel.findById(userId).populate({path : "expense",options:{sort : {createdAt:-1}}})

        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        
        const expense = user.expense

        if(!expense){
            return res.status(200).json({message:"Expense list is empty. Please add the expense details"})
        }

        res.status(200).json({message : expense})
    
        } catch (error) {
            res.status(500).json({message:error.message})
        }
}
export const addExpense = async(req,res)=>{
    const {userId} = req.params
    const {title,amount,category,description,date} = req.body
    
    if(!title || !amount || !category || !description || !date){
        return res.status(400).json({message:"Please fill in all fields"})
    }

    const parsedAmount = parseFloat(amount)

    if(isNaN(parsedAmount)){
        return res.status(400).json({message:"Amount should be a number"})
    }

    if(!validator.isDate(date)){
        return res.status(400).json({message:"Date format should be (YYYY-MM-DD)"})
    }

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message:"Invalid user id"})
    }

    try {
        const expense = await expenseModel.create({title,amount:parsedAmount,category,description,date,user:userId})

        const user = await userModel.findByIdAndUpdate(userId,{$push:{expense}},{new:true})

        res.status(201).json({message:"Expense Added Successfully"})

    } catch (error) {        
        res.status(500).json({message:error.message})
    }
}

export const deleteExpense = async(req,res)=>{
    const {expenseId,userId} = req.params
    
    if(!expenseId){
        return res.status(400).json({message : "Missing expense id"})
    }

    if(!Types.ObjectId.isValid(expenseId)){
        return res.status(400).json({message : "Invalid expense id"})
    }

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user id"})
    }

    try {
        const expense = await expenseModel.findByIdAndDelete(expenseId)
        const user = await userModel.findByIdAndUpdate(userId,{$pull:{expense:expenseId}})

        res.status(200).json({message : "Expense Deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

export const expenseByDate = async(req,res)=>{

    const {userId} = req.params

    if(!Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid user id"})
    }

    try {
        const user = await userModel.findById(userId).sort({date:1}).populate("expense") 

        const expense = user.expense

        if(!expense){
            return res.status(200).json({message:"Expense list is empty. Please add the expense details"})
        }

        res.status(200).json({message : expense})
    } 
    catch (error) {
        res.status(500).json({message:error.message})
    }
}