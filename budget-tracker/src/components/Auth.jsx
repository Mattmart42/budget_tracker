import { login, logout, loggedInUserDisplayName } from "../services/authService"
import { HomePage } from "./Homepage"

export function SignIn() {
  return <button onClick={login}>Sign In</button>
}

function homep(){
  root.render(<HomePage />);
}

export function SignOut() {
  return (
    <div className="display-name">
      <div>
      Hello, {loggedInUserDisplayName()}  
      <button  className="button" onClick={logout}>Sign Out</button>
      </div>   
      <div>
      <button id="hompage-button"  onClick={homep}>Homepage :D</button>
      </div>
    </div>
  )
}