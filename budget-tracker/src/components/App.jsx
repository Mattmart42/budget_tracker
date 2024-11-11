import { useState } from 'react'
import './App.css'
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import { HomePage } from './Homepage'




function App() {
  
  const user = useAuthentication()

  return (
    <>
    <div className= 'header'>
      {!user ? null: <SignOut/>}
      
    </div>
      <h1>Budgetlyly</h1>
      <p>FINANCIAL TRACKER</p>
      <div className="card">
      {!user ? <SignIn />: null}
      </div>
      
    </>
  )
}

export default App
