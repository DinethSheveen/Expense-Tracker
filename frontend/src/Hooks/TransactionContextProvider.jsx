import { createContext, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "./AuthContextProvider"

export const TransactionContext = createContext()

export default function TransactionContextProvider({children}) {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [deleteSuccess, setDeleteSuccess] = useState(null)
    const [allIncome,setAllIncome] = useState([])
    const [allExpense,setAllExpense] = useState([])

    const {state} = useContext(AuthContext)

    // ADD INCOME
    const addIncome = async(income)=>{
        try {
            const response = await axios.post(`http://localhost:3000/api/transactions/income/${state.user && state.user._id}`,income)
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
            const response = await axios.post(`http://localhost:3000/api/transactions/expense/${state.user && state.user._id}`,expense)
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

        if(!state.user){
            return null
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/transactions/income/${state.user._id}`)
            setAllIncome(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    // RETRIEVE EXPENSES
    const getAllExpense = async()=>{

        if(!state.user){
            return null
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/transactions/expense/${state.user._id}`)
            setAllExpense(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    // DELETE INCOME
    const deleteIncome = async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3000/api/transactions/income/${id}/${state.user && state.user._id}`)
            setDeleteSuccess(response.data.message)
            setTimeout(()=>{
                setDeleteSuccess(null)
            },3000)
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE EXPENSE
    const deleteExpense = async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3000/api/transactions/expense/${id}/${state.user && state.user._id}`)
            setDeleteSuccess(response.data.message)
            setTimeout(()=>{
                setDeleteSuccess(null)
            },3000)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <TransactionContext.Provider value={{addIncome,getAllIncome,allIncome,deleteIncome,deleteSuccess,addExpense,getAllExpense,allExpense,deleteExpense,error,success}}>
        {children}  
    </TransactionContext.Provider>
  )
}
