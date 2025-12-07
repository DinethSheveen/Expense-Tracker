import { createContext, useState } from "react"
import axios from "axios"

export const TransactionContext = createContext()

export default function TransactionContextProvider({children}) {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [allIncome,setAllIncome] = useState([])

    // ADD INCOME
    const addIncome = async(income)=>{
        try {
            const response = await axios.post("http://localhost:3000/api/transactions/income",income)
            setError(null)
            setSuccess(response.data.message);
            setTimeout(()=>{
                setSuccess(null)
            },3000)
            
        } catch (error) {
            setSuccess(null)
            setError(error.response.data.message);
        }
    }

    // ADD EXPENSES
    const addExpense = async(expense)=>{
        try {
            const response = await axios.post("http://localhost:3000/api/transactions/expense",expense)
            setError(null)
            setSuccess(response.data.message);
            setTimeout(()=>{
                setError(null)
                setSuccess(null)
            },3000)
            
        } catch (error) {
            setSuccess(null)
            setError(error.response.data.message);
        }
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

  return (
    <TransactionContext.Provider value={{addIncome,addExpense,getAllIncome,allIncome,error,success}}>
        {children}  
    </TransactionContext.Provider>
  )
}
