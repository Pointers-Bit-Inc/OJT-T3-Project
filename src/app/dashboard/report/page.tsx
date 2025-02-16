"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu, Package, LayoutDashboard, BarChart } from "lucide-react";
import { LatestPost } from "~/app/_components/post";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    router.push("/auth");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-64 flex-col bg-white p-6 shadow-md md:flex">
        <h2 className="mb-6 text-xl font-bold text-gray-700">JTechSpofy</h2>
        <nav className="flex flex-col space-y-2">
          {[
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Products", href: "/dashboard/product", icon: Package },
            { name: "Report", href: "/dashboard/report", icon: BarChart },
          ].map((item) => (
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

      {/* Sidebar (Mobile) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="absolute left-4 top-4 md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white p-6">
          <h2 className="mb-6 text-xl font-bold text-gray-700">Menu</h2>
          <nav className="flex flex-col space-y-2">
            {[
              { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
              { name: "Products", href: "/dashboard/product", icon: Package },
              { name: "Report", href: "/dashboard/report", icon: BarChart },
            ].map((item) => (
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

      {/* Main Content */}
      <main className="relative flex-1 p-6">
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="absolute right-6 top-4"
        >
          Logout
        </Button>

        <h1 className="text-3xl font-bold">Report</h1>
        <p className="mt-4 text-gray-700">Welcome to the Report.</p>
        {/* <Card className="mt-6 p-6 shadow-md">
          <h2 className="text-lg font-bold">Card Component</h2>
          <p className="mt-2 text-gray-600">
            This is a sample card using shadcn/ui.
          </p>
        </Card> */}
        <LatestPost />
      </main>
    </div>
  );
}
