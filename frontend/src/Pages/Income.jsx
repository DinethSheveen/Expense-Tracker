import { useContext, useState } from "react"
import { TransactionContext } from "../Hooks/TransactionContextProvider";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect } from "react";
import IncomeComponent from "../Components/IncomeComponent";

function Income() {

  const {addIncome,getAllIncome,allIncome,error,success,deleteSuccess} = useContext(TransactionContext)

  const [inputs, setInputs] = useState({
    title:"",
    amount:"",
    category:"",
    description:"",
    date:""
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    addIncome(inputs)
    
    if(!error){
      setInputs(prevInputs => ({...prevInputs,title : ""}))
      setInputs(prevInputs => ({...prevInputs,amount : ""}))
      setInputs(prevInputs => ({...prevInputs,category : ""}))
      setInputs(prevInputs => ({...prevInputs,description : ""}))
      setInputs(prevInputs => ({...prevInputs,date : ""}))
    }
  }

  const calcTotal = ()=>{
    let total =0 
    allIncome.map((income)=>{
      total += income.amount
    })
    return(total);
  }
  const totalIncome = calcTotal()
  

  useEffect(()=>{
    getAllIncome()
  },[success,deleteSuccess])

  return (
    <div className='homepage flex-1 justify-center shadow-2xs shadow-gray-600 max-h-[80vh] rounded-[10px] py-6 px-2'>
      <p className='text-3xl font-bold mb-2'>Income</p>
      
      <div className="my-4 text-2xl font-bold text-center p-2 bg-gray-800 rounded-[10px]">
        <p>Total Income : <span className="text-green-500">${totalIncome}</span></p>
      </div>

      <div className="flex gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Income Title" className="outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500" value={inputs.title} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,title:e.target.value}))}}/>
          
          <input type="number" placeholder="Income Figures" className="outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500" value={inputs.amount} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,amount:e.target.value}))}}/>
          
          <div className="flex justify-end">
            <select className="bg-transparent shadow-2xs shadow-gray-600 rounded-[5px] py-2 px-1 cursor-pointer focus:ring-1 focus:ring-cyan-500 w-[60%] text-[12px]" value={inputs.category} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,category:e.target.value}))}}>
              <option value="" className="bg-gray-800">Select an option</option>
              <option value="Youtube" className="bg-gray-800">Youtube</option>
              <option value="Freelance" className="bg-gray-800">Freelance</option>
              <option value="Salary" className="bg-gray-800">Salary</option>
              <option value="Trading" className="bg-gray-800">Trading</option>
              <option value="Investments" className="bg-gray-800">Investments</option>
              <option value="Bank Transfer" className="bg-gray-800">Bank Transfer</option>
              <option value="Other" className="bg-gray-800">Other</option>
            </select>
          </div>

          <input type="text" placeholder="Income Description" className="outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500" value={inputs.description} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,description:e.target.value}))}}/>
          
          <input type="text" placeholder="YYYY-MM-DD" className="outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500" value={inputs.date} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,date:e.target.value}))}}/>
          <button className="flex items-center justify-center gap-1 p-2 rounded-full bg-gray-600 hover:bg-gray-700 active:bg-gray-800 cursor-pointer">
            <CiCirclePlus className="text-2xl"/>
            Add Income
          </button>
        </form>

        <div className="flex-1 h-100 overflow-x-none overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col gap-4">
            {allIncome && allIncome.map((income)=>{
              return(
                <IncomeComponent income={income} key={income._id}/>
              )
            })}
          </div>
        </div>
      </div>

      {/* ALERT MESSAGES */}
      {
        error && 
        <div className="bg-red-300 text-red-800 font-bold border-2 border-red-700 p-2 rounded-[5px] my-3">
          {error}
        </div>
      }
      {
        success && 
        <div className="bg-green-300 text-green-800 font-bold border-2 border-green-700 p-2 rounded-[5px] my-3">
          {success}
        </div>
      }
      {deleteSuccess && <div className="bg-red-300 text-red-800 font-bold border-2 border-red-700 p-2 rounded-[5px] my-3">{deleteSuccess}</div>}
    </div>
  )
}

export default Income