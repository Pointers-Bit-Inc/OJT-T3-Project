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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/product", icon: Package },
    { name: "Report", href: "/dashboard/report", icon: BarChart },
  ];

  const chartData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        label: "Total Stock",
        data: [20000, 30000, 50000, 64366, 55000, 52000, 60000, 70000, 65000, 60000, 55000, 58000], // Example data - REPLACE WITH YOUR DATA
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        tension: 0.4, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: 'Total Stock Details',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: { 
          callback: function (value, index, values) {
            return value.toLocaleString(); 
          }
        }
      },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
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

      <main className="relative flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <p className="text-gray-700">Welcome to the admin dashboard.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <Link href="/dashboard/product" className="block">
              <Card className="p-6 shadow-md flex flex-col items-start hover:bg-gray-200 transition">
                <h3 className="text-md font-semibold">Total Stock</h3>
                <p className="text-2xl font-bold">56,837</p> 
                <p className="text-green-600 text-sm">10.5% Up from past week</p> 
              </Card>
            </Link>
            <Link href="/dashboard/product" className="block mt-4">
              <Card className="p-6 shadow-md flex flex-col items-start hover:bg-gray-200 transition">
                <h3 className="text-md font-semibold">Total Low-stock Alerts</h3>
                <p className="text-2xl font-bold">120</p> 
                <p className="text-red-600 text-sm">1.3% Down from past week</p> 
              </Card>
            </Link>
            {/* Wrap this card with Link to navigate to Report */}
            <Link href="/dashboard/report" className="block mt-4">
              <Card className="p-6 shadow-md flex flex-col items-start hover:bg-gray-200 transition">
                <h3 className="text-md font-semibold">Total Transactions</h3>
                <p className="text-2xl font-bold">600,432</p> 
                <p className="text-green-600 text-sm">7.3% Up from yesterday</p> 
              </Card>
            </Link>
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
