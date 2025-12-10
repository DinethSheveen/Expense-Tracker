import {Line} from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement,PointElement, Title, Legend, Tooltip } from "chart.js"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import axios from "axios"
import customParseFormat from "dayjs/plugin/customParseFormat";

ChartJS.register(CategoryScale, LinearScale, LineElement,PointElement, Title, Legend, Tooltip)

function Chart() {

  const dates = []
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(()=>{
    const fetchIncome = async()=>{
      try {
        const response = await axios.get("http://localhost:3000/api/transactions/income/by-date")
        setIncomes(response.data.message)
      } catch (error) {
        console.log(error.message);
      }
    }
    const fetchExpense = async()=>{
      try {
        const response = await axios.get("http://localhost:3000/api/transactions/expense/by-date")
        setExpenses(response.data.message)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchIncome()
    fetchExpense()
  },[])

  
  // FORMATTING DATES AND PUSHING THEM INTO THE ARRAY
  
  incomes.map((income)=>{
    const formattedDate = dayjs(income.date).format("DD/MM/YYYY")
    if(!dates.includes(formattedDate)){
      dates.push(formattedDate)
    }
  })
  
  expenses.map((expense)=>{
    const formattedDate = dayjs(expense.date).format("DD/MM/YYYY")
    if(!dates.includes(formattedDate)){
      dates.push(formattedDate)
    }
  })

  // EXTEND CUSTOM DAYJS DATE FORMAT TO SORT THE ARRAY OF DATES IN HE ASCENDING ORDER
  dayjs.extend(customParseFormat);
  dates.sort((a,b)=>dayjs(a,"DD/MM/YYYY").valueOf() - dayjs(b,"DD/MM/YYYY").valueOf())
  

  // GETTING THE RESPECTIVE INCOME AMOUNTS ACCORDING TO THE DATE     
  const incomeAmounts = dates.map(date => {
    const matched = incomes.find(income => dayjs(income.date).format("DD/MM/YYYY") === date);
    return matched ? matched.amount : 0;
  });

  // GETTING THE RESPECTIVE EXPENSE AMOUNTS ACCORDING TO THE DATE     
  const expenseAmounts = dates.map(date => {
    const matched = expenses.find(expense => dayjs(expense.date).format("DD/MM/YYYY") === date);
    return matched ? matched.amount : 0;
  });  
  
  const options = {}
  
  const data = {
    labels : dates,
    datasets : [
      {
        label : "Income",
        data : incomeAmounts,
        borderColor : "#42f575"
      },
      {
        label : "Expense",
        data : expenseAmounts,
        borderColor : "#f00202"
      }
    ]
  }

  return (
    <>
    {dates?
      <div className="h-60 flex-2 mx-auto bg-gray-900 rounded-[10px] p-2"><Line options={options} data={data}/></div>
    :
      <div className="flex flex-2 items-center text-3xl text-center h-60 font-bold">No Data to Visualize...</div>}
    </>
  )
}

export default Chart