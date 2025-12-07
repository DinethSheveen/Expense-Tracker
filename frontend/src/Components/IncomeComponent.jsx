import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiDollar } from "react-icons/ci";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { FaCalendarDay } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { SiFreelancermap } from "react-icons/si";
import { MdSavings } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import dayjs from "dayjs"

function IncomeComponent({income}) {

    // FORMAT DATE
    const formattedDate = dayjs(income.date).format("DD/MM/YYYY");

return (
    <div className="flex justify-between items-center bg-gray-900 p-4 rounded-[5px] border-2 border-gray-700 hover:border-cyan-500 font-bold">
        {/* ICON */}
        <div className="border-2 border-gray-500 p-2 rounded-[10px]">
            {
                income.category==="Youtube"?<TbBrandYoutubeFilled className="text-2xl"/>:
                income.category==="Freelance"?<SiFreelancermap className="text-2xl"/>:
                income.category==="Salary"?<PiCurrencyDollarSimpleFill className="text-2xl"/>:
                income.category==="Trading"?<FaBitcoin className="text-2xl"/>:
                income.category==="Investments"?<MdSavings className="text-2xl"/>:
                income.category==="Bank Transfer"?<BsBank className="text-2xl"/>:
                <TbBrandYoutubeFilled className="text-2xl"/>
            }
        </div>

        <div className="flex flex-col items-center justify-between">
        <p>{income.category}</p>
        <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-1">
                <CiDollar className="text-2xl"/>
                {income.amount}
            </div>
            <div className="flex items-center gap-1">
                <FaCalendarDay className="text-[18px]"/>
                {formattedDate}
            </div>
            <div className="flex items-center gap-1">
                <AiFillMessage className="text-[20px]"/>
                {income.description}
            </div>
        </div>
        </div>

        <div className="rounded-full bg-gray-800 text-red-700 p-4 cursor-pointer hover:bg-gray-700 hover:text-red-600 active:bg-gray-600 active:text-red-500">
            <RiDeleteBin5Fill/>
        </div>
    </div>
  )
}

export default IncomeComponent