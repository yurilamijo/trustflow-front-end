"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import TaskOverview from "../components/TaskOverview";

export default function Page() {
  const router = useRouter();

  const checkAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    const sessionToken = localStorage.getItem("sessionToken");

    if (!accessToken || !sessionToken) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const sessionToken = localStorage.getItem("sessionToken");
    
    try {
      await fetch("http://127.0.0.1:8080/logout", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "trustflow_session": sessionToken,
            "Authorization": `Bearer ${accessToken}`,
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
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <nav className="bg-blue-500 text-white py-4 mb-8 rounded-lg ">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Trustflow Dashboard</h1>
          </div>
          <div className="space-x-4">
            <button
              onClick={logout}
              className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="grid items-center justify-items-center gap-16">
        <div className="w-full flex justify-center items-center">
          <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <TaskOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
