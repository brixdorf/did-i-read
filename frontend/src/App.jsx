import HomePage from './pages/HomePage'
import Login from './pages/Login'
import { useState, useEffect } from 'react'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
  async function verify() {
    const response = await fetch('http://localhost:3000/api/verify', {
      credentials: 'include'
    })
    if (response.ok) {
      setIsLoggedIn(true)
    }
  }
  verify()
}, [])

  return isLoggedIn ? <HomePage /> : <Login onLogin={setIsLoggedIn} />
}