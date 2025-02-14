"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    router.push("/auth/loginform"); // ✅ Redirect to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-gray-700">Menu</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/dashboard"
            className={`rounded-md p-3 ${active === "dashboard" ? "bg-blue-600 text-white" : "text-gray-700"}`}
            onClick={() => setActive("dashboard")}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className={`rounded-md p-3 ${active === "products" ? "bg-blue-600 text-white" : "text-gray-700"}`}
            onClick={() => setActive("products")}
          >
            Products
          </Link>
          <Link
            href="/dashboard/report"
            className={`rounded-md p-3 ${active === "report" ? "bg-blue-600 text-white" : "text-gray-700"}`}
            onClick={() => setActive("report")}
          >
            Report
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 p-6">
        {/* Logout Button (Top Right) */}
        <button
          onClick={handleLogout}
          className="absolute right-6 top-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-gray-700">Welcome to the admin dashboard.</p>
        <Card />
      </main>
    </div>
  );
}
