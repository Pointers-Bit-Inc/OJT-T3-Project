"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-blue-600">
        <h1 className="text-4xl font-bold text-white">Welcome to JTechShafey</h1>
        
      </div>

      <motion.div
        key={isRegistering ? "register" : "login"}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-1/2 flex items-center justify-center bg-white"
      >
        {isRegistering ? (
          <RegisterForm onSwitch={() => setIsRegistering(false)} />
        ) : (
          <LoginForm onSwitch={() => setIsRegistering(true)} />
        )}
      </motion.div>
    </main>
  );
}
