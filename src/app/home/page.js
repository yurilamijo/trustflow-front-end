"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logout from "../components/logout";
import TaskOverview from "../components/taskOverview";
import UserDelete from "../components/userDelete";
import UserDetails from "../components/userDetails";

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

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <nav className="bg-blue-500 text-white py-4 mb-8 rounded-lg ">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Trustflow Dashboard</h1>
          </div>
          <div className="space-x-4">
            <UserDelete />
            <Logout />
          </div>
        </div>
      </nav>

      <div className="grid items-center justify-items-center gap-16">
        <div className="w-full flex justify-center items-center">
          <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <UserDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
