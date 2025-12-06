import { Types } from "mongoose"
import { expenseModel } from "../Models/expenseModel.js"
import validator from "validator"

export const retreiveExpense = async(_,res)=>{
    try {
            const expense = await expenseModel.find() 
    
            if(!expense){
                return res.status(200).json({message:"Expense list is empty. Please add the expense details"})
            }
    
            res.status(200).json({message : expense})
    
        } catch (error) {
            res.status(500).json({message:error.message})
        }
}
export const addExpense = async(req,res)=>{
    const {title,amount,category,description,date} = req.body
    
    const parsedAmount = parseFloat(amount)

    if(isNaN(parsedAmount)){
        return res.status(400).json({message:"Amount should be a number"})
    }

    if(!validator.isDate(date)){
        return res.status(400).json({message:"Date format should be (YYYY-MM-DD)"})
    }

    if(!title || !amount || !category || !description || !date){
        return res.status(400).json({message:"Please fill in all fields"})
    }

    try {
        const expense = await expenseModel.create({title,amount,category,description,date})

        res.status(201).json({message:"Expense Added Successfully"})

    } catch (error) {        
        res.status(500).json({message:error.message})
    }
}
export const updateExpense = async(req,res)=>{
    try {
        const expenseId = req.params.id
        const {title,amount,category,description,date} = req.body
    
        if(!expenseId){
            return res.status(400).json({message : "Missing expense id"})
        }
    
        if(!Types.ObjectId.isValid(expenseId)){
            return res.status(400).json({message : "Invalid expense id"})
        }
    
        if(!title || !amount || !category || !description || !date){
            return res.status(400).json({message : "Fill in all required fields"})
        }
    
        try {
            const expense = await expenseModel.findByIdAndUpdate({_id:expenseId},{title,amount,category,description,date})
            res.status(200).json({message : "Expense Updated Successfully"})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const deleteExpense = async(req,res)=>{
    const expenseId = req.params.id
    
    if(!expenseId){
        return res.status(400).json({message : "Missing expense id"})
    }

    if(!Types.ObjectId.isValid(expenseId)){
        return res.status(400).json({message : "Invalid expense id"})
    }

    try {
        const expense = await expenseModel.findByIdAndDelete(expenseId)

        res.status(200).json({message : "Expense Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}