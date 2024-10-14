"use client";

import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const sessionToken = localStorage.getItem("sessionToken");

    try {
      await fetch("http://127.0.0.1:8080/logout", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          trustflow_session: sessionToken,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("sessionToken");
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
