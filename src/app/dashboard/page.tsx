"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu, Package, LayoutDashboard, BarChart } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

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
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-gray-700">JTechShofy</h2>
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
        {/* Header with Menu Button and Logout Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button - Positioned Better */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-bold text-gray-700">JTechShofy</h2>
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
              </SheetContent>
            </Sheet>

            {/* Dashboard Title - Positioned Better */}
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>

          {/* Logout Button */}
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>

        {/* Welcome Text */}
        <p className="text-gray-700">Welcome to the admin dashboard.</p>

        {/* Sample Card */}
        <Card className="mt-6 p-6 shadow-md">
          <h2 className="text-lg font-bold">Card Component</h2>
          <p className="mt-2 text-gray-600">
            This is a sample card using shadcn/ui.
          </p>
        </Card>
      </main>
    </div>
  );
}
