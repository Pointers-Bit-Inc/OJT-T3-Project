"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    router.push("/auth/loginform"); // ✅ Redirect to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-6">Menu</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/dashboard"
            className={`p-3 rounded-md ${active === "dashboard" ? "bg-blue-600 text-white" : "text-gray-700"}`}
            onClick={() => setActive("dashboard")}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className={`p-3 rounded-md ${active === "products" ? "bg-blue-600 text-white" : "text-gray-700"}`}
            onClick={() => setActive("products")}
          >
            Products
          </Link>
          <Link
            href="/dashboard/report"
            className={`p-3 rounded-md ${active === "report" ? "bg-blue-600 text-white" : "text-gray-700"}`}
            onClick={() => setActive("report")}
          >
            Report
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 relative">
        {/* Logout Button (Top Right) */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-gray-700">Welcome to the admin dashboard.</p>
      </main>
    </div>
  );
}
