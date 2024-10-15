import { useState } from "react";
import { useRouter } from "next/navigation";
import { APIPaths, CustomHeaders, Token } from "../util/constants";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(APIPaths.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const sessionToken = response.headers.get(CustomHeaders.trustflowSession);

        localStorage.setItem(Token.accessToken, data.accessToken);
        localStorage.setItem(Token.sessionToken, sessionToken);

        console.log("Login successful!");
        router.push("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Login Page
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="block mb-2 text-black">Username:</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="block mb-2 text-black">Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
