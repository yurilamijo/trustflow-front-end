"use client";

import { useRouter } from "next/navigation";
import { APIPaths, Token } from "../util/constants";

function Logout() {
  const router = useRouter();

  const logout = async () => {
    const accessToken = localStorage.getItem(Token.accessToken);
    const sessionToken = localStorage.getItem(Token.sessionToken);

    try {
      await fetch(APIPaths.logout, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          trustflow_session: sessionToken,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem(Token.accessToken);
      localStorage.removeItem(Token.sessionToken);
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={logout}
      className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
    >
      Logout
    </button>
  );
}

export default Logout;
