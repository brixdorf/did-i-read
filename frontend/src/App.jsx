import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

import { apiFetch } from "./utils/api";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function verify() {
      const response = await apiFetch(
        `${import.meta.env.VITE_API_URL}/api/verify`,
      );
      if (!response) return;
      if (response.ok) {
        setIsLoggedIn(true);
      }
    }
    verify();
  }, []);

  return isLoggedIn ? <HomePage /> : <Login onLogin={setIsLoggedIn} />;
}
