"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bell, ChevronDown, Search, Menu, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import Link from "next/link";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(6);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setSidebarOpen(false); 
    router.push("/auth"); 
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Products", href: "/dashboard/product" },
    { name: "Reports", href: "/dashboard/report" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm md:px-6">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button */}
          <button
            className="block md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Sidebar"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          
          <h2 className="text-lg font-bold text-gray-700 md:text-xl">JTechShofy</h2>
        </div>

        <div className="flex items-center gap-6">
        <div className="hidden md:flex relative w-64">
            <Input placeholder="Search" className="pl-10 w-full text-gray-700 text-sm" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

    
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notifications}
                </span>
              )}
            </div>

            {/* Profile Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Moni Roy</p>
                    <p className="text-xs text-gray-500">Customer</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 hidden md:block" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" className="justify-start">🔹 Manage Account</Button>
                  <Button variant="ghost" className="justify-start">🔑 Change Password</Button>
                  <Button variant="ghost" className="justify-start">🔄 Activity Log</Button>
                  <Button variant="destructive" className="justify-start" onClick={handleLogout}>
                    🚪 Log out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Sidebar (Mobile Navigation) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold">JTechShofy</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === item.href ? "bg-blue-600 text-white font-semibold" : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="px-4 py-2 mt-4 rounded-md text-left w-full text-red-600 font-semibold hover:bg-red-100"
            onClick={handleLogout}
          >
            🚪 Log out
          </button>
        </nav>
      </aside>
    </>
  );
}
