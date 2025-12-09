import { MdElectricBolt } from "react-icons/md";
import { SiCrowdsource } from "react-icons/si";
import { CiDollar } from "react-icons/ci";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { FaCalendarDay } from "react-icons/fa6";
import { FaBitcoin } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { MdSavings } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import dayjs from "dayjs"
import { useContext } from "react";
import { TransactionContext } from "../Hooks/TransactionContextProvider";

function ExpenseComponent({expense}) {

    const {deleteExpense} = useContext(TransactionContext)

    // FORMAT DATE
    const formattedDate = dayjs(expense.date).format("DD/MM/YYYY");

return (
    <div className="flex justify-between items-center bg-gray-900 p-2 rounded-[5px] border-2 border-gray-700 font-bold hover:border-cyan-500 md:p-4">
        {/* ICON */}
        <div className="border-2 border-gray-500 p-2 rounded-[10px] text-2xl">
            {
                expense.category==="Electricity Bill"?<MdElectricBolt/>:
                expense.category==="Salary"?<PiCurrencyDollarSimpleFill/>:
                expense.category==="Trading"?<FaBitcoin/>:
                expense.category==="Youtube"?<TbBrandYoutubeFilled/>:
                expense.category==="Investments"?<MdSavings/>:
                expense.category==="Bank Transfer"?<BsBank/>:
                <SiCrowdsource/>
            }
        </div>

        <div className="flex flex-col gap-2 items-center justify-between">
        <p>{expense.category}</p>
        <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
            <div className="flex items-center gap-1">
                <CiDollar className="text-2xl"/>
                {expense.amount}
            </div>
            <div className="flex items-center gap-1">
                <FaCalendarDay className="text-[18px]"/>
                {formattedDate}
            </div>
            <div className="flex items-center gap-1">
                <AiFillMessage className="text-[20px]"/>
                {expense.description}
            </div>
        </div>
        </div>

        <div className="rounded-full bg-gray-800 text-red-700 text-2xl p-2 cursor-pointer hover:bg-gray-700 hover:text-red-600 active:bg-gray-600 active:text-red-500">
            <RiDeleteBin5Fill onClick={()=>{deleteExpense(expense._id)}}/>
        </div>
    </div>
  )
}

export default ExpenseComponent