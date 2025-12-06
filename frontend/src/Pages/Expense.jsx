import { useState, useContext } from 'react';
import { GlobalContext } from '../Hooks/GlobalContextProvider'
import { CiCirclePlus } from "react-icons/ci";

function Expense() {
 const {addExpense,error,success} = useContext(GlobalContext)  
 
   const [inputs, setInputs] = useState({
     title:"",
     amount:"",
     category:"",
     description:"",
     date:""
   })
 
   const handleSubmit = (e)=>{
     e.preventDefault()
     addExpense(inputs)
     setInputs(prevInputs => ({...prevInputs,title : ""}))
     setInputs(prevInputs => ({...prevInputs,amount : ""}))
     setInputs(prevInputs => ({...prevInputs,category : ""}))
     setInputs(prevInputs => ({...prevInputs,description : ""}))
     setInputs(prevInputs => ({...prevInputs,date : ""}))
   }
 
   return (
     <div className='homepage flex-1 justify-center border border-white min-h-[80vh] rounded-[10px] p-2'>
       <p className='text-2xl font-bold mb-2'>Expense</p>
       
       <div className="my-4 text-2xl font-bold text-center p-2 bg-gray-800 rounded-[10px]">
         <p>Total Expenses : </p>
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
         <div className="bg-green-300 text-green-800 font-bold border-2 border-green-700 p-2 rounded-[5px] max-w-40 mt-2">
           {success}
         </div>
       }
 
       <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-40">
         <input type="text" placeholder="Expense Title" className="outline-none rounded-[5px] p-2 ring-1 focus:ring-cyan-500" value={inputs.title} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,title:e.target.value}))}}/>
         
         <input type="number" placeholder="Expense Figures" className="outline-none rounded-[5px] p-2 ring-1 focus:ring-cyan-500" value={inputs.amount} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,amount:e.target.value}))}}/>
         
         <input type="text" placeholder="Expense Category" className="outline-none rounded-[5px] p-2 ring-1 focus:ring-cyan-500" value={inputs.category} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,category:e.target.value}))}}/>
         
         <input type="text" placeholder="Expense Description" className="outline-none rounded-[5px] p-2 ring-1 focus:ring-cyan-500" value={inputs.description} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,description:e.target.value}))}}/>
         
         <input type="text" placeholder="YYYY-MM-DD" className="outline-none rounded-[5px] p-2 ring-1 focus:ring-cyan-500" value={inputs.date} onChange={(e)=>{setInputs(prevInputs => ({...prevInputs,date:e.target.value}))}}/>
         <button className="flex items-center justify-center gap-1 bg-gray-600 p-2 rounded-full">
           <CiCirclePlus className="text-2xl"/>
           Add Expense
         </button>
       </form>
     </div>
   )
}

export default Expense