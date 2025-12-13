import dayjs from "dayjs";

function RecentHistory({allIncome,allExpense}) {

    allIncome.forEach((income)=>{
        income.type = "Income"
    })

    allExpense.forEach((expense)=>{
        expense.type = "Expense"
    })    
    
    const allFinances = [...allIncome,...allExpense]
    
    //SORTING THE FINANCES ACCORDING TO THE DATE
    allFinances.sort((a,b)=>{
        return (dayjs(b.date).valueOf() - (dayjs(a.date).valueOf()))
    })

    // FIRST 3 TRANSACTIONS
    const recentFinances = allFinances.slice(0,3)

  return (
    <div className="history flex-1 w-full px-4 md:w-auto md:px-0">
        <p className="text-center mb-3 font-bold">Recent History</p>
        <div className="flex flex-col gap-5">
            {
                recentFinances.map((finance)=>{
                    return(
                        <div key={finance._id} className={`flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 font-bold rounded-[5px] ${finance.type === "Income"? "text-green-400" : "text-red-400"}`}>
                            <p>{finance.type}</p>
                            <p>{finance.amount}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default RecentHistory