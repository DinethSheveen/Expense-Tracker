import { createContext, useState } from "react"
import axios from "axios"

export const GlobalContext = createContext()

export default function GlobalContextProvider({children}) {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const addIncome = async(income)=>{
        try {
            const response = await axios.post("http://localhost:3000/api/transactions/income",income)
            setSuccess(response.data.message);
            
        } catch (error) {
            setSuccess(null)
            setError(error.response.data.message);
        }
    }

    const addExpense = async(expense)=>{
        try {
            const response = await axios.post("http://localhost:3000/api/transactions/expense",expense)
            setSuccess(response.data.message);
            
        } catch (error) {
            setSuccess(null)
            setError(error.response.data.message);
        }
    }

    setTimeout(()=>{
        setError(null)
        setSuccess(null)
    },3000)

  return (
    <GlobalContext.Provider value={{addIncome,addExpense,error,success}}>
        {children}  
    </GlobalContext.Provider>
  )
}
