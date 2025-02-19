// /components/jtechcomponents/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { BarChart, Home, ShoppingCart } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Products",
    href: "/dashboard/product",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Report",
    href: "/dashboard/report",
    icon: <BarChart className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [filteredItems, setFilteredItems] = useState(menuItems);

  useEffect(() => {
    const handleSearch = () => {
      const query = localStorage.getItem('sidebarSearchQuery')?.toLowerCase() || "";
      if (!query) {
        setFilteredItems(menuItems);
        return;
      }

      const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    };

    // Initial search
    handleSearch();

    // Listen for search events from header
    window.addEventListener('sidebarSearch', handleSearch);
    return () => window.removeEventListener('sidebarSearch', handleSearch);
  }, []);

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col bg-white p-6 md:flex">
      {/* Navigation */}
      <nav className="flex flex-col space-y-2 mt-16">
        {filteredItems.map(({ name, href, icon }) => {
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
              {icon}
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
