import "./index.css"
import {Routes,Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Dashboard from "./Pages/Dashboard"
import Income from "./Pages/Income"
import Expense from "./Pages/Expense"
import Navbar from "./Components/Navbar"
import AllTransactions from "./Pages/AllTransactions"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import ProtectedRoutes from "./Components/ProtectedRoutes"

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar/>
      <Routes>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/login" element={<Login/>}/>
        {/* <Route element={<ProtectedRoutes/>}> */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/all-transactions" element={<AllTransactions/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/expense" element={<Expense/>}/>
        {/* </Route> */}
      </Routes>
    </div>
  )
}

export default App