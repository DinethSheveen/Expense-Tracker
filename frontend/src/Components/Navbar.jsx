import { Link, NavLink, useNavigate } from "react-router-dom"
import img from "../../public/CodeSprint08.png"
import { RxDashboard } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { HiMiniBarsArrowDown } from "react-icons/hi2";
import { TbXboxX } from "react-icons/tb";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthContextProvider";
import { useEffect } from "react";

function Sidebar() {

  const [sidebar, setSidebar] = useState(false)
  const [optionBar, setOptionBar] = useState(false)
  const {state,dispatch} = useContext(AuthContext)
  const [username,setUsername] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    const user = ()=>{
      if(state.isAuthenticated){
        setUsername(state.user.username)
      }
    }
    user()
  },[state.user,state.isAuthenticated])

  const menuLinks = [
    {icon:<RxDashboard/>, text:"Dashboard", endpoint:"/dashboard"},
    {icon:<FaWallet/>, text:"All-Transactions", endpoint:"/all-transactions"},
    {icon:<GrTransaction/>, text:"Income", endpoint:"/income"},
    {icon:<GrTransaction className="scale-x-[-1]"/>, text:"Expense", endpoint:"/expense"},
    {icon:<CgProfile />, text:"Profile", endpoint:"/profile",className:"md:hidden"}
  ]

  const handleSidebar = ()=>{
    setSidebar(prevState => !prevState)
  }

  const handleSignout = ()=>{
    dispatch({type:"LOGOUT" }),
    setSidebar(false)
  }

  return (
    <div className="relative">
      <div className='navbar fixed w-full py-6 px-4 bg-gray-900 md:py-4'>
        {state.isAuthenticated?
        <div className="flex items-center justify-between flex-wrap">
          {/* PROFILE SECTION WITH IMAGE */}
          <div>
            <Link to={"/"} className="font-bold text-2xl"><span className="text-orange-400">Coin Trail</span></Link>
          </div>
          
          {/* MENU LINKS */}
          <div className="hidden gap-4 px-4 md:flex">
            {menuLinks.map((menuLink,index)=>{
              return(
                <NavLink key={index} to={menuLink.endpoint} className={({isActive})=>
                  `flex items-center gap-1 transition-all ${menuLink.className && menuLink.className} ${isActive?"text-gray-400 border-b-4 border-b-gray-600 pb-1 rounded-[5px] font-bold":"hover:text-gray-400 hover:border-b-4 hover:border-b-gray-600 hover:font-bold"}`}>
                  {menuLink.icon}
                  {menuLink.text}
                </NavLink>
              )
            })}
          </div>

          {/* PROFILE SECTION WITH IMAGE */}
          <div className="hidden items-center justify-between gap-2 md:flex">
            <img src={img} alt="" className="rounded-full w-10 h-10"/>
            <p className="font-bold">{username}</p>
            <HiMiniBarsArrowDown className="text-2xl z-10" onClick={()=>{setOptionBar(prevOption => !prevOption)}}/>
          </div>
          
          {/* MENU ICON TO OPEN SIDEBAR */}
          <RiMenuUnfold2Line className="flex text-white text-3xl md:hidden" onClick={handleSidebar}/>

          {/* OPTION BAR */}
          <div className={`absolute right-0 top-0 flex-col justify-center items-center font-bold transition-all duration-1000 bg-gray-900 hidden md:flex  ${optionBar?"top-18 opacity-100":"opacity-0"}`}>
            <p className="px-10 py-3 hover:bg-gray-800 w-full cursor-pointer" onClick={()=>{navigate("/profile")}}>Profile</p>
            <p className="px-10 py-3 hover:bg-gray-800 cursor-pointer" onClick={handleSignout}>Sign Out</p>
          </div>
        </div>
        :
        <div className="flex items-center justify-between gap-2 font-semibold cursor-pointer">
          <div>
            <Link to={"/"} className="font-bold text-2xl"><span className="text-orange-400">Coin Trail</span></Link>
          </div>
          <div className="flex gap-2">
            <Link to={"/auth/login"}>SignIn</Link> 
            <Link to={"/auth/register"}>SignUp</Link>
          </div>
        </div>
        }
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
            <p className="font-bold" onClick={handleSignout}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar