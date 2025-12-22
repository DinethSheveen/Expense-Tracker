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
    <div className="history flex-1 w-full px-4 md:w-auto md:px-0 overflow-scroll">
        <p className="text-center mb-3 font-bold 2xl:text-5xl 2xl:mb-6">Recent History</p>
        <div className="flex flex-col gap-5 2xl:text-3xl 2xl:gap-7 overflow-scroll">
            {
                recentFinances.length!==0?
                recentFinances.map((finance)=>{
                    return(
                        <div key={finance._id} className={`flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 font-bold rounded-[5px] 2xl:rounded-[10px] 2xl:py-6 ${finance.type === "Income"? "text-green-400" : "text-red-400"}`}>
                            <p>{finance.type}</p>
                            <p>{finance.amount}</p>
                        </div>
                    )
                })
                :
                <p className="text-center">No transactions recorded yet...</p>
            }
        </div>
    </div>
  )
}

export default RecentHistory