export default function Login({ onLogin }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center">

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-sm">
                <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
                    Login
                </h1>

                <input type="text" placeholder="Username"className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 mt-4 bg-transparent text-gray-900 dark:text-white" />
                <input type="password" placeholder="Password" className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 mt-4 bg-transparent text-gray-900 dark:text-white" />

                <button onClick={() => onLogin(true)} className="w-full bg-green-500 text-white py-2 rounded-md mt-6 hover:bg-green-600 transition">
                    Login
                </button>
            </div>
        
        </div>

    )
}