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
        <header className='header'>
          {!user ? null : <SignOut />}
          <h1>Budgetlyly</h1>
          <p>FINANCIAL TRACKER</p>
          <nav>
            <Link to="/">Home</Link>
            {user && <Link to="/Homepage">Homepage</Link>}
          </nav>
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
