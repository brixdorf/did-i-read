import HomePage from './pages/HomePage'
import Login from './pages/Login'
import { useState } from 'react'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return isLoggedIn ? <HomePage /> : <Login onLogin={setIsLoggedIn} />
}