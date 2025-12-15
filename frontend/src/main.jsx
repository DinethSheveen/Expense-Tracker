import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import TransactionContextProvider from './Hooks/TransactionContextProvider.jsx'
import AuthContextProvider from './Hooks/AuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TransactionContextProvider>
          <App />
        </TransactionContextProvider>
      </AuthContextProvider>  
    </BrowserRouter>
  </StrictMode>,
)
