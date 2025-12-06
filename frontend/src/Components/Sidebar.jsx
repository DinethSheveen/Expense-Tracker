import { NavLink } from "react-router-dom"
import img from "../../public/CodeSprint08.png"
import { RxDashboard } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

function Sidebar() {
  return (
    <div className='sidebar flex flex-col justify-between min-h-[80vh] border border-white p-4 rounded-[10px]'>
      {/* PROFILE SECTION WITH IMAGE */}
      <div className="flex flex-col items-center gap-2">
        <img src={img} alt="" className="rounded-full w-15 h-15"/>
        <p className="font-bold">Dineth Fernando</p>
      </div>
      
      {/* MENU LINKS */}
      <div className="flex flex-col gap-2">
        <NavLink to={"/dashboard"} className={({isActive})=>
          `flex items-center gap-1 transition-all ${isActive?"border-b-3 border-b-gray-500 text-gray-500":""}`}>
          <RxDashboard/>
          Dashboard
        </NavLink>
        <NavLink to={"/all-transactions"} className={({isActive})=>
          `flex items-center gap-1 transition-all ${isActive?"border-b-3 border-b-gray-500 text-gray-500":""}`}>
          <FaWallet/>
          All-Transactions
        </NavLink>
        <NavLink to={"/income"} className={({isActive})=>
          `flex items-center gap-1 transition-all ${isActive?"border-b-3 border-b-gray-500 text-gray-500":""}`}>
          <GrTransaction/>
          Income
        </NavLink>
        <NavLink to={"/expense"} className={({isActive})=>
          `flex items-center gap-1 transition-all ${isActive?"border-b-3 border-b-gray-500 text-gray-500":""}`}>
          <GrTransaction className="scale-x-[-1]"/>
          Expense
        </NavLink>
      </div>

      {/* SIGN OUT */}
      <div>
        sign out
      </div>
    </div>
  )
}

export default Sidebar