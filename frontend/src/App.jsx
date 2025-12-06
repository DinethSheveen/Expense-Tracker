import "./index.css"
import {Routes,Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Dashboard from "./Pages/Dashboard"
import Income from "./Pages/Income"
import Expense from "./Pages/Expense"
import Sidebar from "./Components/Sidebar"
import AllTransactions from "./Pages/AllTransactions"

function App() {
  return (
    <div className="bg-black min-h-screen text-white flex items-center gap-2 px-2">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/all-transactions" element={<AllTransactions/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/expense" element={<Expense/>}/>
      </Routes>
    </div>
  )
}

export default App