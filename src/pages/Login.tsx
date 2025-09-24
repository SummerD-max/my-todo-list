import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isError: error, isPending: loading } = useLogin();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  // 你也可以用同样的方式创建一个 handleSignup 函数
  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
          Login / Sign Up
        </h2>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full rounded-md bg-sky-600 px-4 py-2 font-bold text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
