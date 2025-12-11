import { useContext, useEffect } from "react"
import Chart from "../Components/Chart"
import { TransactionContext } from "../Hooks/TransactionContextProvider"

function Dashboard() {

  const {allIncome,getAllIncome,allExpense,getAllExpense} = useContext(TransactionContext)
  
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

    const minIncome = finances.reduce((currentValue,income)=>{
      return currentValue > income.amount? income.amount : currentValue
    },finances[0].amount)

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

    const minExpense = finances.reduce((currentValue,income)=>{
      return currentValue > income.amount? income.amount : currentValue
    },finances[0].amount)

    const maxExpense = finances.reduce((currentValue,income)=>{
      return currentValue < income.amount? income.amount : currentValue
    },finances[0].amount)
    
    return [minExpense,maxExpense];
  }  
  
  // GETTING THE MAX INCOME
  useEffect(()=>{
    getAllIncome()
    getAllExpense()
  },[])

  return (
    <div className='dashboard flex-1 justify-center rounded-[10px] pt-30 pb-10 px-4'>
      {/* FLEX CONTAINER */}
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:gap-4">
        {/* LEFT - CHART */}
        <Chart/>

        {/* RIGHT - RECENT HISTORY */}
        <div className="history flex-1 w-full px-4 md:w-auto md:px-0">
          <p className="text-center mb-3 font-bold">Recent History</p>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 rounded-[5px]">
              <p>Income</p>
              <p>34</p>
            </div>
            <div className="flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 rounded-[5px]">
              <p>Income</p>
              <p>34</p>
            </div>
            <div className="flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 rounded-[5px]">
              <p>Income</p>
              <p>34</p>
            </div>
          </div>
        </div>
      </div>

      {/* FLEX CONTAINER */}
      <div className="flex justify-between items-start gap-4 mt-5 md:flex-row">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 flex-1 md:flex-2">
          <div className="rounded-[5px] border-2 border-green-800 p-2 font-bold flex flex-col md:text-2xl text-green-500">
            <p>Total Income</p>
            <p>${getTotalIncome()}</p>
          </div>
          <div className="rounded-[5px] border-2 border-red-800 p-2 font-bold flex flex-col md:text-2xl text-red-500">
            <p>Total Expense</p>
            <p>${getTotalExpense()}</p>
          </div>
          <div className="rounded-[5px] border-2 border-cyan-800 p-2 font-bold flex flex-col md:text-2xl text-cyan-500">
            <p>Profit Margin</p>
            <p>${getTotalIncome() - getTotalExpense()}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-between gap-8 h-full">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-3 px-2 font-bold">
              <p>Min</p>
              <p>Max</p>
            </div>
            <div className="flex justify-between items-center gap-3 rounded-[5px] bg-gray-700 border-2 border-gray-500 py-4 px-2">
              <p>{getMinMaxIncome(allIncome)[0]}</p>
              <p>Income</p>
              <p>{getMinMaxIncome(allIncome)[1]}</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-3 px-2 font-bold">
              <p>Min</p>
              <p>Max</p>
            </div>
            <div className="flex justify-between items-center gap-3 rounded-[5px] bg-gray-700 border-2 border-gray-500 py-4 px-2">
              <p>{getMinMaxExpense(allExpense)[0]}</p>
              <p>Expense</p>
              <p>{getMinMaxExpense(allExpense)[1]}</p>
            </div>
          </div>
        </div>
      </div >

    </div>
  )
}

export default Dashboard