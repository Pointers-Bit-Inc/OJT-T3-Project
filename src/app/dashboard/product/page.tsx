"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu, Package, LayoutDashboard, BarChart } from "lucide-react";

export default function Product() {
  const router = useRouter();
  const [active, setActive] = useState("products");

  const handleLogout = () => {
    router.push("/auth");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col">
        <h2 className="text-xl font-bold text-gray-700 mb-6">JTechSpofy</h2>
        <nav className="flex flex-col space-y-2">
          {[
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Products", href: "/dashboard/product", icon: Package },
            { name: "Report", href: "/dashboard/report", icon: BarChart },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 rounded-md ${
                active === item.name.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActive(item.name.toLowerCase())}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar (Mobile) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden absolute top-4 left-4">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Menu</h2>
          <nav className="flex flex-col space-y-2">
            {[
              { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
              { name: "Products", href: "/dashboard/product", icon: Package },
              { name: "Report", href: "/dashboard/report", icon: BarChart },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-3 rounded-md ${
                  active === item.name.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActive(item.name.toLowerCase())}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6 relative">
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="absolute top-4 right-6"
        >
          Logout
        </Button>

        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-4 text-gray-700">Manage your products here.</p>
        <Card className="mt-6 p-6 shadow-md">
          <h2 className="text-lg font-bold">Product List</h2>
          <p className="text-gray-600 mt-2">This is where the product list will appear.</p>
        </Card>
      </main>
    </div>
  );
}
