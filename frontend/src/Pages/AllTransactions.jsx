import { useContext, useEffect, useMemo, useState } from "react"
import { TransactionContext } from "../Hooks/TransactionContextProvider"
import dayjs from "dayjs"
import { AuthContext } from "../Hooks/AuthContextProvider"
import { Navigate } from "react-router-dom"

function AllTransactions() {

  const {allIncome,allExpense,getAllIncome,getAllExpense} = useContext(TransactionContext)
  const {state} = useContext(AuthContext)
  
  const [sortBy, setSortBy] = useState("Select an option")
  const [filterBy, setFilterBy] = useState("All")

  allIncome.forEach((income)=>{return (income.type = "Income")})

  allExpense.forEach((expense)=>{return (expense.type = "Expense")})

  // FORMATTING THE DATE
  const formattedDate = (date)=>{
    return dayjs(date).format("DD-MM-YYYY")
  }

  // SORTING AND FILTERING
  const sortedAndFilteredFinances = useMemo(() => {
  const data = [...allIncome,...allExpense]

  // SORT
  switch (sortBy) {
    case "Most Expensive":
      data.sort((a, b) => b.amount - a.amount)
      break
    case "Least Expensive":
      data.sort((a, b) => a.amount - b.amount)
      break
    case "Latest - Oldest":
      data.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
      break
    case "Oldest - Latest":
      data.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
      break
    default:
      break
  }

  // FILTER
  if (filterBy === "All"){ return data}

  return data.filter(record => record.type === filterBy)
  
}, [allIncome,allExpense, sortBy, filterBy])

  useEffect(()=>{
    getAllIncome()
    getAllExpense()
  },[])

  return (
    state.isAuthenticated ?
    <div className='all-transactions pt-20 2xl:pt-40 2xl:text-4xl'>
      {/* CONTROLS */}
      <div className="flex justify-center items-center flex-wrap gap-2 my-4 2xl:gap-4">
        <div className="flex justify-center items-center p-2 2xl:gap-4">
          <p className="font-bold p-2">Sort By</p>
          <select className="border border-white p-1 rounded-[10px] cursor-pointer" value={sortBy} onChange={(e)=>{setSortBy(e.target.value)}}>
            <option value="Select an option" className="bg-gray-800 2xl:text-[15px]">Select an option</option>
            <option value="Most Expensive" className="bg-gray-800 2xl:text-[15px]">Most Expensive</option>
            <option value="Least Expensive" className="bg-gray-800 2xl:text-[15px]">Least Expensive</option>
            <option value="Latest - Oldest" className="bg-gray-800 2xl:text-[15px]">Latest - Oldest</option>
            <option value="Oldest - Latest" className="bg-gray-800 2xl:text-[15px]">Oldest - Latest</option>
          </select>
        </div>
        <div className="flex justify-center items-center p-2 2xl:gap-4">
          <p className="font-bold p-2">Filter By</p>
          <select className="border border-white p-1 rounded-[10px] cursor-pointer" value={filterBy} onChange={(e)=>{setFilterBy(e.target.value)}}>
            <option value="All" className="bg-gray-800 2xl:text-[15px]">All</option>
            <option value="Income" className="bg-gray-800 2xl:text-[15px]">Income</option>
            <option value="Expense" className="bg-gray-800 2xl:text-[15px]">Expense</option>
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
      {sortedAndFilteredFinances && sortedAndFilteredFinances.map((finance) => {
        return (
            <div key={finance._id} className="grid grid-cols-1 sm:grid-cols-4 border-b last:border-b-0 2xl:py-10">

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
          )
      })}
    </div>
    :<Navigate to={"/auth/login"}/>
  )
}

export default AllTransactions