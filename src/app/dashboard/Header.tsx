"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bell, ChevronDown, Search, Menu, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Link from "next/link";

// Create a custom event for search
export const searchEvent = new Event('sidebarSearch');

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setSidebarOpen(false);
    router.push("/auth");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Store the search query in localStorage for the sidebar to access
    localStorage.setItem('sidebarSearchQuery', query.toLowerCase());
    // Dispatch the custom event
    window.dispatchEvent(searchEvent);
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Products", href: "/dashboard/product" },
    { name: "Reports", href: "/dashboard/report" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left section with menu button and title */}
          <div className="flex items-center">
            <button
              className="block lg:hidden mr-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Center section with title */}
          <div className="hidden lg:block absolute left-4 ml-4">
            <h1 className="text-xl font-semibold text-gray-900">JTechShafey</h1>
          </div>

          {/* Right section with search and notifications */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Search bar - hidden on mobile, smaller on tablet/desktop */}
            <div className="hidden md:block relative w-64 lg:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-8 w-full [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="relative cursor-pointer">
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
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
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium">Moni Roy</p>
                    <p className="text-xs text-gray-500">Customer</p>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-gray-600 md:block" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" className="justify-start">
                    🔹 Manage Account
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    🔑 Change Password
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    🔄 Activity Log
                  </Button>
                  <Button
                    variant="destructive"
                    className="justify-start"
                    onClick={handleLogout}
                  >
                    🚪 Log out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Mobile search bar - only shown when menu is open */}
        <div className={`md:hidden ${sidebarOpen ? 'block' : 'hidden'} px-4 pb-4`}>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-8 w-full [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Sidebar (Mobile Navigation) */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${sidebarOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <h2 className="text-lg font-bold">JTechShafey</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-md px-4 py-2 transition-colors ${
                pathname === item.href
                  ? "bg-blue-600 font-semibold text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="mt-4 w-full rounded-md px-4 py-2 text-left font-semibold text-red-600 hover:bg-red-100"
            onClick={handleLogout}
          >
            🚪 Log out
          </button>
        </nav>
      </aside>
    </>
  );
}
