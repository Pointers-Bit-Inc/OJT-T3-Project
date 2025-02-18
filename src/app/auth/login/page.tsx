"use client";

import { motion } from "framer-motion";

import LoginForm from "~/components/jtechcomponents/auth/LoginForm";
export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="flex w-1/2 items-center justify-center bg-blue-600">
        <h1 className="text-4xl font-bold text-white">
          Welcome to JTechShafey
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="flex w-1/2 items-center justify-center bg-white"
      >
        <LoginForm onSwitch={() => (window.location.href = "/auth/register")} />
      </motion.div>
    </main>
  );
}
