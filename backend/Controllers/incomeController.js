import { Types } from "mongoose"
import { incomeModel } from "../Models/incomeModel.js"
import  validator from "validator"

export const retreiveIncome = async(_,res)=>{
    try {
        const income = await incomeModel.find().sort({createdAt:-1})

        if(!income){
            return res.status(200).json({message:"Income list is empty. Please add the income details"})
        }

        res.status(200).json({message : income})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const addIncome = async(req,res)=>{

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

    try {
        const income = await incomeModel.create({title,amount,category,description,date})

        res.status(201).json({message:"Income Added Successfully"})
        
    } catch (error) {        
        res.status(500).json({message:error.message})
    }
}
export const updateIncome = async(req,res)=>{
    const incomeId = req.params.id
    const {title,amount,category,description,date} = req.body

    if(!incomeId){
        return res.status(400).json({message : "Missing income id"})
    }

    if(!Types.ObjectId.isValid(incomeId)){
        return res.status(400).json({message : "Invalid income id"})
    }

    if(!title || !amount || !category || !description || !date){
        return res.status(400).json({message : "Fill in all required fields"})
    }

    try {
        const income = await incomeModel.findByIdAndUpdate({_id:incomeId},{title,amount,category,description,date})
        res.status(200).json({message : "Income Updated Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const deleteIncome = async(req,res)=>{
    const incomeId = req.params.id

    if(!incomeId){
        return res.status(400).json({message : "Missing income id"})
    }

    if(!Types.ObjectId.isValid(incomeId)){
        return res.status(400).json({message : "Invalid income id"})
    }

    try {
        const income = await incomeModel.findByIdAndDelete(incomeId)

        res.status(200).json({message : "Income Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}