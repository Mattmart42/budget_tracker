import './App.css'
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import { HomePage } from './Homepage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const user = useAuthentication()
  return (
    <Router>
      <div className="App">
      {!user ? null : (
        <div className="sign-out">
          <SignOut />
        </div>
      )}
      <header className="header">
        <div className="header-content">
          <div className="branding">
            <h1>Budgetlyly</h1>
            <p>FINANCIAL TRACKER</p>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            {user && <Link to="/Homepage">Budget</Link>}
          </nav>
        </div>
      </header>

        <main>
          <Routes>
            {/* Main screen content */}
            <Route
              path="/"
              element={
                <div className="card">
                  {!user ? <SignIn /> : null}
                </div>
              }
            />
            {/* Homepage route */}
            <Route path="/Homepage" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
