import { Link, NavLink } from "react-router-dom"
import img from "../../public/CodeSprint08.png"
import { RxDashboard } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { TbXboxX } from "react-icons/tb";
import { useState } from "react";

function Sidebar() {

  const [sidebar, setSidebar] = useState(false)

  const menuLinks = [
    {icon:<RxDashboard/>, text:"Dashboard", endpoint:"/dashboard"},
    {icon:<FaWallet/>, text:"All-Transactions", endpoint:"/all-transactions"},
    {icon:<GrTransaction/>, text:"Income", endpoint:"/income"},
    {icon:<GrTransaction className="scale-x-[-1]"/>, text:"Expense", endpoint:"/expense"}
  ]

  const handleSidebar = ()=>{
    setSidebar(prevState => !prevState)
  }

  return (
    <div className="relative">
      <div className='navbar flex items-center justify-between flex-wrap fixed w-full py-6 px-4 bg-gray-900 md:py-2'>
      {/* PROFILE SECTION WITH IMAGE */}
      <div>
        <Link to={"/"} className="font-bold text-2xl"><span className="text-orange-400">Coin Trail</span></Link>
      </div>
      
      {/* MENU LINKS */}
      <div className="hidden gap-4 px-4 md:flex">
        {menuLinks.map((menuLink,index)=>{
          return(
            <NavLink key={index} to={menuLink.endpoint} className={({isActive})=>
              `flex items-center gap-1 transition-all ${isActive?"text-gray-400 border-b-4 border-b-gray-600 pb-1 rounded-[5px] font-bold":"hover:text-gray-400 hover:border-b-4 hover:border-b-gray-600 hover:font-bold"}`}>
              {menuLink.icon}
              {menuLink.text}
            </NavLink>
          )
        })}
      </div>

      {/* PROFILE SECTION WITH IMAGE */}
      <div className="hidden items-center gap-2 md:flex">
        <img src={img} alt="" className="rounded-full w-15 h-15"/>
        <p className="font-bold">Dineth</p>
      </div>

      {/* MENU ICON TO OPEN SIDEBAR */}
      <RiMenuUnfold2Line className="flex text-white text-3xl md:hidden" onClick={handleSidebar}/>
      </div>
      
      <div className="fixed right-0 top-0">
        <div className={`sidebar min-h-screen absolute transition-all duration-1000 top-0 right-0 bg-gray-800 overflow-hidden md:hidden ${sidebar? "w-64 opacity-100" : "w-0 opacity-0"}`}>
          <TbXboxX className="text-3xl absolute right-3 top-5" onClick={handleSidebar}/>
          {/* LINKS */}
          <div className="flex flex-col items-center w-full gap-5 absolute top-50">
            {menuLinks.map((menuLink,index)=>{
            return(
              <NavLink key={index} to={menuLink.endpoint} className={({isActive})=>
                `flex items-center justify-center gap-1 w-full py-2 transition-all ${isActive?"bg-gray-600 py-2 font-bold":"hover:bg-gray-600 hover:font-bold"}`}>
                {menuLink.icon}
                {menuLink.text}
              </NavLink>
            )
          })}
          </div>

          <div className="flex justify-center items-center gap-2 py-2 bg-gray-700 absolute bottom-0 w-full">
            <LiaSignOutAltSolid className="text-2xl"/>
            <p className="font-bold">Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar