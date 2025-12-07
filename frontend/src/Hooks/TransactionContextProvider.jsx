import { createContext, useState } from "react"
import axios from "axios"

export const TransactionContext = createContext()

export default function TransactionContextProvider({children}) {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [deleteSuccess, setDeleteSuccess] = useState(null)
    const [allIncome,setAllIncome] = useState([])
    const [allExpense,setAllExpense] = useState([])

    // ADD INCOME
    const addIncome = async(income)=>{
        try {
            const response = await axios.post("http://localhost:3000/api/transactions/income",income)
            setError(null)
            setSuccess(response.data.message);            
        } catch (error) {
            setSuccess(null)
            setError(error.response.data.message);
        }
        setTimeout(()=>{
            setSuccess(null)
            setError(null)
        },3000)
    }

    // ADD EXPENSES
    const addExpense = async(expense)=>{
        try {
            const response = await axios.post("http://localhost:3000/api/transactions/expense",expense)
            setError(null)
            setSuccess(response.data.message);            
        } catch (error) {
            setSuccess(null)
            setError(error.response.data.message);
        }
        setTimeout(()=>{
            setSuccess(null)
            setError(null)
        },3000)
    }

    // RETRIEVE INCOME
    const getAllIncome = async()=>{
        try {
            const response = await axios.get("http://localhost:3000/api/transactions/income")
            setAllIncome(response.data.message);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // RETRIEVE EXPENSES
    const getAllExpense = async()=>{
        try {
            const response = await axios.get("http://localhost:3000/api/transactions/expense")
            setAllExpense(response.data.message);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // DELETE INCOME
    const deleteIncome = async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3000/api/transactions/income/${id}`)
            setDeleteSuccess(response.data.message)
            setTimeout(()=>{
                setDeleteSuccess(null)
            },3000)
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE EXPENSE

  return (
    <TransactionContext.Provider value={{addIncome,getAllIncome,allIncome,deleteIncome,deleteSuccess,addExpense,getAllExpense,allExpense,error,success}}>
        {children}  
    </TransactionContext.Provider>
  )
}
