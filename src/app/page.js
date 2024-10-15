"use client";

import React, { useState } from "react";
import AuthPage from "./components/authPage";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLoginRegister = () => {
    setIsLogin((prev) => !prev); 
  };

  const handleRegistrationSuccess = () => {
    alert("User register successful!");
    setIsLogin(true);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-white">Welcome to Trustflow</h1>
      <div className="flex justify-center items-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <AuthPage
            isLogin={isLogin}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-2"
            onClick={toggleLoginRegister}
          >
            {isLogin ? "Go to Register" : "Go to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
