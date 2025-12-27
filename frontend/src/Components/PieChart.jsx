import {Chart as Chartjs, ArcElement, Tooltip, Legend, Title} from "chart.js"
import { useContext, useEffect } from "react"
import { Pie } from "react-chartjs-2"
import { TransactionContext } from "../Hooks/TransactionContextProvider"

Chartjs.register(ArcElement,Tooltip,Legend,Title)

function PieChart({chartType}) {

    const {getAllIncome,allIncome,getAllExpense,allExpense} = useContext(TransactionContext)

    useEffect(()=>{
        getAllExpense()
        getAllIncome()
    },[])

    
    let incomeCategory = []
    let incomeAmounts = []
    let expenseCategory = []
    let expenseAmounts = []

    allIncome.forEach((income)=>{
        incomeCategory.push(income.category)
        incomeAmounts.push(income.amount)
    })
    
    allExpense.forEach((expense)=>{
        expenseCategory.push(expense.category)
        expenseAmounts.push(expense.amount)
    })

    const options = {}
    const incomeData = {
        labels : incomeCategory,
        datasets: [{
            label : "Income",
            data : incomeAmounts,
            backgroundColor : [
                "rgb(252, 19, 3)",
                "rgb(3, 252, 7)",
                "rgb(227, 3, 252)",
                "rgb(240, 7, 120)",
                "rgb(7, 54, 240)",
                "rgb(15, 242, 208)",
                "rgb(255,255,255)"
            ],
            // borderColor : "none",
            hoverOffset : 4
        }]
    }

    const expenseData = {
        labels : expenseCategory,
        datasets: [{
            label : "Expense",
            data : expenseAmounts,
            backgroundColor : [
                "rgb(3, 252, 7)",
                "rgb(227, 3, 252)",
                "rgb(240, 7, 120)",
                "rgb(7, 54, 240)",
                "rgb(15, 242, 208)",
                "rgb(255,255,255)"
            ],
            // borderColor : "none",
            hoverOffset : 4
        }]
    }

  return (
    <div className="h-full w-full mx-auto bg-gray-900 rounded-[10px] p-2 2xl:h-150">
        <Pie data={chartType==="income"?incomeData:expenseData} options={options}className="mx-auto"/>
    </div>
  )
}

export default PieChart