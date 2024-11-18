import { login, logout, loggedInUserDisplayName } from "../services/authService"
import { HomePage } from "./Homepage"


export function SignIn() {
  return <button onClick={login}>Sign In</button>
}

export function SignOut() {
  return (
    <div className="display-name">
      <div>
      Welcome back, {loggedInUserDisplayName()}  
      <button  className="button" onClick={logout}>Sign Out</button>
      </div>   
    </div>
  )
}