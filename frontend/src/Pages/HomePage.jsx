import { useContext } from "react"
import banner from "../../public/Home_banner.svg"
import { AuthContext } from "../Hooks/AuthContextProvider"
import { Navigate } from "react-router-dom"

function HomePage() {
  const {state} = useContext(AuthContext)
  return (
    state.isAuthenticated?
    <div className='homepage flex flex-col items-center justify-between gap-2 pt-25 min-h-screen px-4 md:flex-row '>
      {/* HEADER MSG */}
      <div className="flex flex-col items-center justify-center gap-2 md:w-[50%]">
        <p className="text-4xl text-center font-bold md:max-w-100 md:text-5xl">Manage Your Finances Easily with <span className="text-orange-500">CoinTrail</span></p>
        <p className="text-center font-bold max-w-100">Managing money becomes easier when you know exactly where it goes. This app empowers users to track income and expenses and make informed financial decisions.</p>
      </div>
      {/* IMAGE BANNER */}
      <div>
        <img src={banner} alt="Home page banner" className="h-[50vh] md:h-100 md:w-100"/>
      </div>
    </div>
    :
    <Navigate to={"/auth/login"}/>
  )
}

export default HomePage