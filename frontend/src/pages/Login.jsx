import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      onLogin(true);
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-sm">
        {error && (
          <div className="text-center mb-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 text-sm rounded-md p-2 mt-4">
            {error}
          </div>
        )}

        <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          Login
        </h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 mt-4 bg-transparent text-gray-900 dark:text-white"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 mt-4 bg-transparent text-gray-900 dark:text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded-md mt-6 hover:bg-green-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
