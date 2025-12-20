import axios from "axios"
import { useEffect, useReducer } from "react"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

const initialState = {
  user : null,
  isAuthenticated : false
}

const authReducer = (state,action) =>{
  switch(action.type){
    case "LOGIN":
      return ({
        ...state,
        user : action.payload,
        isAuthenticated : true
      })
    case "LOGOUT":
      return({
        ...state,
        user : null,
        isAuthenticated : false
      })
    case "SET_USER":
      return({
        ...state,
        user : action.payload,
        isAuthenticated : !!action.payload
      })
    default: 
      return state
  }
}

function AuthContextProvider({children}) {
  const [state,dispatch] = useReducer(authReducer,initialState)
  const navigate = useNavigate()

  useEffect(()=>{
    const verifyUser = async()=>{
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me",{withCredentials : true})
        dispatch({type : "SET_USER",payload : response.data.userInfo})
        return response.data.userInfo
      } catch (error) {
        console.log(error);
        navigate("/auth/login")
        return null
      } 
    }
    verifyUser()
  },[])

  return (
    <AuthContext.Provider value={{state,dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider