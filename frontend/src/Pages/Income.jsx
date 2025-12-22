import { useContext, useState } from "react"
import { TransactionContext } from "../Hooks/TransactionContextProvider";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect } from "react";
import IncomeComponent from "../Components/IncomeComponent";
import { AuthContext } from "../Hooks/AuthContextProvider";
import { Navigate } from "react-router-dom";

function Income() {

  const {addIncome,getAllIncome,allIncome,error,success,deleteSuccess} = useContext(TransactionContext)
  const {state} = useContext(AuthContext)

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
    state.isAuthenticated?
    <div className='income flex-1 justify-center rounded-[10px] pt-20 px-2 2xl:pt-45 2xl:text-4xl'>      
      <div className="my-4 text-2xl font-bold text-center p-2 bg-gray-800 rounded-[10px] 2xl:text-5xl 2xl:py-6">
        <p>Total Income : <span className="text-green-500">${totalIncome}</span></p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row 2xl:gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 2xl:gap-8 2xl:flex-1">
          <input type="text" placeholder="Income Title" className="outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500 2xl:py-4" value={inputs.title} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,title:e.target.value.trim()}))}}/>
          
          <input type="number" placeholder="Income Figures" className="outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500 2xl:gap-4" value={inputs.amount} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,amount:e.target.value}))}}/>
          
          <div className="flex justify-end">
            <select className="bg-transparent shadow-2xs shadow-gray-600 rounded-[5px] py-2 px-1 cursor-pointer focus:ring-1 focus:ring-cyan-500 w-[60%] text-[12px] 2xl:text-[30px]" value={inputs.category} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,category:e.target.value}))}}>
              <option value="" className="bg-gray-800 text-[15px]">Select an option</option>
              <option value="Youtube" className="bg-gray-800 text-[15px]">Youtube</option>
              <option value="Freelance" className="bg-gray-800 text-[15px]">Freelance</option>
              <option value="Salary" className="bg-gray-800 text-[15px]">Salary</option>
              <option value="Trading" className="bg-gray-800 text-[15px]">Trading</option>
              <option value="Investments" className="bg-gray-800 text-[15px]">Investments</option>
              <option value="Bank Transfer" className="bg-gray-800 text-[15px]">Bank Transfer</option>
              <option value="Other" className="bg-gray-800 text-[15px]">Other</option>
            </select>
          </div>

          <textarea placeholder="Add a Reference..." rows={1} cols={1} className="resize-none text-[15px] outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500 2xl:py-6 2xl:text-[30px]" value={inputs.description} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,description:e.target.value.trim()}))}}/>
          
          <input type="text" placeholder="YYYY-MM-DD" className="outline-none shadow-2xs shadow-gray-600 rounded-[5px] p-2 focus:ring-1 focus:ring-cyan-500" value={inputs.date} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,date:e.target.value}))}}/>
          <button className="flex items-center justify-center gap-1 p-2 rounded-full bg-gray-600 hover:bg-gray-700 active:bg-gray-800 cursor-pointer 2xl:text-4xl 2xl:py-5 2xl:gap-2">
            <CiCirclePlus className="text-2xl 2xl:text-5xl"/>
            Add Income
          </button>
        </form>

        <div className="flex-1 h-110 overflow-x-none overflow-y-scroll scrollbar-hide 2xl:flex-2 2xl:h-200">
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
    : <Navigate to={"/auth/login"}/>
  )
}

export default Income