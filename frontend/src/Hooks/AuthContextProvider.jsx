import { useReducer } from "react"
import { createContext } from "react"

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
    default: 
      return state
  }
}

function AuthContextProvider({children}) {
  const [state,dispatch] = useReducer(authReducer,initialState)

  return (
    <AuthContext.Provider value={{state,dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider