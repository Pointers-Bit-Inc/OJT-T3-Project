"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart, Home, ShoppingCart } from "lucide-react";
import { cn } from "~/lib/utils";
import Header from "~/app/dashboard/Header";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Products", href: "/dashboard/product", icon: ShoppingCart },
  { name: "Report", href: "/dashboard/report", icon: BarChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col bg-white p-6 md:flex">
      {/* Logo Section - Centered */}
      <div className="mb-6 flex items-center justify-center">
        <h2 className="text-lg font-bold text-gray-700 md:text-xl">
          JTechShofy
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md p-3 transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
