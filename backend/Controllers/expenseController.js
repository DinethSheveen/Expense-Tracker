import { expenseModel } from "../Models/expenseModel.js"

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
    try {
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const updateExpense = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const deleteExpense = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}