"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";
import { Package, LayoutDashboard, BarChart } from "lucide-react";

export default function Product() {
  const router = useRouter();
  const [active, setActive] = useState("products");

  const handleLogout = () => {
    router.push("/auth");
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/product", icon: Package },
    { name: "Report", href: "/dashboard/report", icon: BarChart },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Visible on MD and up, Hidden on SM) */}
      <aside className="hidden md:flex w-64 flex-col bg-white p-6 shadow-md">
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-md p-3 ${
                active === item.name.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActive(item.name.toLowerCase())}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="relative flex-1 p-6 md:p-8">
        {/* Header - Always Visible */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Products</h1>
        </div>

        {/* Welcome Text */}
        <p className="text-gray-700">Manage your products here.</p>

        {/* Sample Card */}
        <Card className="mt-6 p-6 shadow-md">
          <h2 className="text-lg font-bold">Product List</h2>
          <p className="mt-2 text-gray-600">
            This is where the product list will appear.
          </p>
        </Card>
      </main>
    </div>
  );
}
