"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Package, LayoutDashboard, BarChart } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ScaleOptionsByType,
  CartesianScaleTypeRegistry,
} from 'chart.js';
import MyCard from "~/components/my-components/mycard";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/product", icon: Package },
    { name: "Report", href: "/dashboard/report", icon: BarChart },
  ];

  const cardData = [
    { title: "Total Stock", quantity: 56837, analytics: 10.5, href: "/dashboard/product" },
    { title: "Total Low-stock Alerts", quantity: 120, analytics: -1.3, href: "/dashboard/product" },
    { title: "Total Transactions", quantity: 600432, analytics: 7.3, href: "/dashboard/report" },
  ];

  const chartData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [{
      label: "Total Stock",
      data: [20000, 30000, 50000, 64366, 55000, 52000, 60000, 70000, 65000, 60000, 55000, 58000],
      borderColor: "blue",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    }],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: 'Total Stock Details' } },
    scales: {
      x: { type: 'category' } as ScaleOptionsByType<keyof CartesianScaleTypeRegistry>,
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: { callback: (value) => value.toLocaleString() },
      } as ScaleOptionsByType<keyof CartesianScaleTypeRegistry>,
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:flex w-64 flex-col bg-white p-6 shadow-md">
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className={`flex items-center rounded-md p-3 ${active === item.name.toLowerCase() ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`} onClick={() => setActive(item.name.toLowerCase())}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="relative flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <p className="text-gray-700">Welcome to the admin dashboard.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            {cardData.map((card, index) => (
              <Link key={index} href={card.href} className="block mt-4 first:mt-0">
                <MyCard title={card.title} quantity={card.quantity} analytics={card.analytics} />
              </Link>
            ))}
          </div>
          <Card className="p-6 shadow-md flex flex-col items-start md:col-span-8">
            <h3 className="text-md font-semibold">Total Stock Details</h3>
            <div className="h-64 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
            <p className="text-sm mt-2">June 2024</p>
          </Card>
        </div>
      </main>
    </div>
  );
}