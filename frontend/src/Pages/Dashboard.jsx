import { useContext, useEffect } from "react"
import Chart from "../Components/Chart"
import { TransactionContext } from "../Hooks/TransactionContextProvider"
import MinMaxFinances from "../Components/MinMaxFinances"
import TotalFinances from "../Components/TotalFinances"
import RecentHistory from "../Components/RecentHistory"
import { AuthContext } from "../Hooks/AuthContextProvider"
import { Navigate } from "react-router-dom"

function Dashboard() {

  const {allIncome,getAllIncome,allExpense,getAllExpense} = useContext(TransactionContext)
  const {state} = useContext(AuthContext)
  
  // GETTING THE TOTAL INCOME
  const getTotalIncome = ()=>{
    const totalIncome = allIncome.reduce((currentTotal,income)=>{
      return currentTotal+income.amount
    },0)

    return totalIncome
  }

  // GETTING THE TOTAL INCOME
  const getTotalExpense = ()=>{
    const totalExpense = allExpense.reduce((currentTotal,expense)=>{
      return currentTotal+expense.amount
    },0)
    return totalExpense;
  }

  // GETTING THE MIN AND MAX INCOME
  const getMinMaxIncome = (finances)=>{
    if(!finances || finances.length===0){
      return 0
    }
    
    // MIN INCOME
    const minIncome = finances.reduce((currentValue,income)=>{
      return currentValue > income.amount? income.amount : currentValue
    },finances[0].amount)

    // MAX INCOME
    const maxIncome = finances.reduce((currentValue,income)=>{
      return currentValue < income.amount? income.amount : currentValue
    },finances[0].amount)

    return [minIncome,maxIncome];
  }  

  // GETTING THE MIN AND MAX EXPENSE
  const getMinMaxExpense = (finances)=>{
    if(!finances || finances.length===0){
      return 0
    }

    // MIN EXPENSE
    const minExpense = finances.reduce((currentValue,income)=>{
      return currentValue > income.amount? income.amount : currentValue
    },finances[0].amount)

    // MAX EXPENSE
    const maxExpense = finances.reduce((currentValue,income)=>{
      return currentValue < income.amount? income.amount : currentValue
    },finances[0].amount)
    
    return [minExpense,maxExpense];
  }  
  
  useEffect(()=>{
    getAllIncome()
    getAllExpense()
  },[])

  return (
      state.isAuthenticated ? 
      <div className='dashboard flex-1 justify-center rounded-[10px] pt-30 pb-10 px-4 2xl:pt-45'>
        {/* FLEX CONTAINER */}
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:gap-4 2xl:gap-8">
          {/* LEFT - CHART */}
          <Chart/>

          {/* RIGHT - RECENT HISTORY */}
          <RecentHistory allIncome={allIncome} allExpense={allExpense}/>
        </div>

        {/* FLEX CONTAINER */}
        <div className="flex flex-col justify-between items-start gap-4 mt-5 xs:flex-row 2xl:mt-10 2xl:gap-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 flex-1 md:flex-2 w-full 2xl:gap-8">
            <TotalFinances getTotalIncome={getTotalIncome} border={"border-green-800"} textColor={"text-green-500"}/>
            <TotalFinances getTotalIncome={getTotalExpense}  border={"border-red-500"} textColor={"text-red-500"}/>

            <div className="rounded-[5px] border-2 border-cyan-800 p-2 font-bold flex flex-col md:text-2xl text-cyan-500 2xl:text-5xl 2xl:p-6 2xl:border-4 2xl:rounded-[10px]">
              <p>Profit Margin</p>
              <p>${getTotalIncome() - getTotalExpense()}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-between gap-8 h-full w-full 2xl:text-5xl 2xl:gap-10">
            <MinMaxFinances getMinMaxFinance={getMinMaxIncome} financeData={allIncome} title={"Income"}/>
            <MinMaxFinances getMinMaxFinance={getMinMaxExpense} financeData={allExpense} title={"Expense"}/>
          </div>
        </div>
      </div>
      : <Navigate to={"/auth/login"}/>
  )
}

export default Dashboard