import React from "react";
import InfoCard from "~/components/jtechcomponents/InfoCard";
import { FaBox, FaExclamation, FaMoneyBillTrendUp } from "react-icons/fa6";
import Link from "next/link";
import { LineChartDashboard } from "~/components/jtechcomponents/LineChartDashboard";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6 pb-28">
        <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
        <p className="mb-6 text-gray-700">Welcome to the admin dashboard</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/dashboard/product"
            className="transition duration-300 hover:scale-105"
          >
            <InfoCard
              icon={<FaBox className="h-6 w-6" />}
              title="Total Stock"
              value="56837"
              percentageChange="10.5% Up"
              subtitle="from past week"
            />
          </Link>

          <Link
            href="/dashboard/product"
            className="transition duration-300 hover:scale-105"
          >
            <InfoCard
              icon={<FaExclamation className="h-6 w-6" />}
              title="Total Low-stock alerts"
              value="120"
              percentageChange="1.3% Down"
              subtitle="from past week"
            />
          </Link>

          <Link
            href="/dashboard/report"
            className="transition duration-300 hover:scale-105"
          >
            <InfoCard
              icon={<FaMoneyBillTrendUp className="h-6 w-6" />}
              title="Total Transactions"
              value="600432"
              percentageChange="7.3% Up"
              subtitle="from yesterday"
            />
          </Link>
        </div>
        <div className="mb-32">
          <LineChartDashboard />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
