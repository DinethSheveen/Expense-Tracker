import { Navigate,Outlet } from "react-router-dom"

function ProtectedRoutes() {
    const user = true
  return (
    user? <Outlet/> : <Navigate to={"/auth/login"}/>
  )
}

export default ProtectedRoutes