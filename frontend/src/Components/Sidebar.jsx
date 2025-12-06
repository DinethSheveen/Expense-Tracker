import { NavLink } from "react-router-dom"
import img from "../../public/CodeSprint08.png"
import { RxDashboard } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { LiaSignOutAltSolid } from "react-icons/lia";

function Sidebar() {

  const menuLinks = [
    {icon:<RxDashboard/>, text:"Dashboard", endpoint:"/dashboard"},
    {icon:<FaWallet/>, text:"All-Transactions", endpoint:"/all-transactions"},
    {icon:<GrTransaction/>, text:"Income", endpoint:"/income"},
    {icon:<GrTransaction/>, text:"Expense", endpoint:"/expense"}
  ]

  return (
    <div className='sidebar flex flex-col justify-between min-h-[80vh] border border-white pt-4 overflow-hidden rounded-[10px]'>
      {/* PROFILE SECTION WITH IMAGE */}
      <div className="flex flex-col items-center gap-2">
        <img src={img} alt="" className="rounded-full w-15 h-15"/>
        <p className="font-bold">Dineth Fernando</p>
      </div>
      
      {/* MENU LINKS */}
      <div className="flex flex-col gap-2 px-4">
        {menuLinks.map((menuLink)=>{
          return(
            <NavLink to={menuLink.endpoint} className={({isActive})=>
              `flex items-center gap-1 transition-all ${isActive?"border-b-3 border-b-gray-500 text-gray-500 font-bold":""}`}>
              {menuLink.icon}
              {menuLink.text}
            </NavLink>
          )
        })}
      </div>

      {/* SIGN OUT */}
      <div className="flex items-center justify-center font-bold gap-2 py-2 w-full bg-gray-800 cursor-pointer hover:text-gray-200 hover:bg-transparent transition-all">
        <LiaSignOutAltSolid className="text-2xl"/>
        Sign Out
      </div>
    </div>
  )
}

export default Sidebar