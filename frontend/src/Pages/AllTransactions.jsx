import { useContext, useEffect } from "react"
import { TransactionContext } from "../Hooks/TransactionContextProvider"
import dayjs from "dayjs"

function AllTransactions() {

  const {allIncome,allExpense,getAllIncome,getAllExpense} = useContext(TransactionContext)
  
  useEffect(()=>{
    getAllIncome()
    getAllExpense()
  },[])

  allIncome.forEach((income)=>{
    return (
      income.type = "Income"
    )
  })

  allExpense.forEach((expense)=>{
    return (
      expense.type = "Expense"
    )
  })

  const allFinances = [...allIncome,...allExpense]

  const formattedDate = (date)=>{
    return dayjs(date).format("DD-MM-YYYY")
  }

  return (
    <div className='all-transactions pt-20'>
      {/* CONTROLS */}
      <div className="flex justify-center items-center flex-wrap gap-2 my-4">
        <div className="flex justify-center items-center p-2">
          <p className="font-bold p-2">Sort By</p>
          <select className="border border-white p-1 rounded-[10px] cursor-pointer">
            <option value="Increasing" className="bg-gray-800">Increasing</option>
            <option value="Decreasing" className="bg-gray-800">Decreasing</option>
            <option value="New - Old" className="bg-gray-800">New - Old</option>
            <option value="Old - New" className="bg-gray-800">Old - New</option>
          </select>
        </div>
        <div className="flex justify-center items-center p-2">
          <p className="font-bold p-2">Filter By</p>
          <select className="border border-white p-1 rounded-[10px] cursor-pointer">
            <option value="Income" className="bg-gray-800">Income</option>
            <option value="Expense" className="bg-gray-800">Expense</option>
          </select>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="hidden sm:grid grid-cols-4 font-semibold border-b">
        <div className="p-3">Date</div>
        <div className="p-3 text-right">Title</div>
        <div className="p-3 text-right">Type</div>
        <div className="p-3 text-right">Amount</div>
      </div>

      {/* Rows */}
      {allFinances.map((finance) => {
        return (
          <div key={finance._id} className="grid grid-cols-1 sm:grid-cols-4 border-b last:border-b-0">

            {/* DATE */}
            <div className="p-3 font-medium">
              <span className="sm:hidden font-semibold">Date : </span>
              {formattedDate(finance.date)}
            </div>

            {/* TITLE */}
            <div className="p-3 flex justify-between items-center sm:block">
              <span className="sm:hidden font-semibold">Title</span>
              <div className="text-right">{finance.title}</div>
            </div>

            {/* TYPE */}
            <div className="p-3 flex justify-between items-center sm:block">
              <span className="sm:hidden font-semibold">Type</span>
              <div className="text-right">{finance.type}</div>
            </div>

            {/* AMOUNT */}
            <div className="p-3 flex justify-between items-center sm:block">
              <span className="sm:hidden font-semibold">Amount</span>
              <div className="text-right">{finance.amount}</div>
            </div>
          </div>
        );
      })}
      
    </div>
  )
}

export default AllTransactions