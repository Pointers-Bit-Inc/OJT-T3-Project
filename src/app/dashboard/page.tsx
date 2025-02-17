// Dashboard.tsx
import React from "react";
import InfoCard from "~/components/jtechcomponents/InfoCard";
import { FaBox, FaExclamation, FaMoneyBillTrendUp } from 'react-icons/fa6';
import Link from 'next/link';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-700 mb-6">Welcome to the admin dashboard</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <Link href="/dashboard/product" className="hover:scale-105 transition duration-300">
            <InfoCard
              icon={<FaBox className="h-6 w-6" />}
              title="Total Stock"
              value="56837"
              percentageChange="10.5% Up"
              subtitle="from past week"
            />
          </Link>

          <Link href="/dashboard/product" className="hover:scale-105 transition duration-300">
            <InfoCard
              icon={<FaExclamation className="h-6 w-6" />}
              title="Total Low-stock alerts"
              value="120"
              percentageChange="1.3% Down"
              subtitle="from past week"
            />
          </Link>

          <Link href="/dashboard/report" className="hover:scale-105 transition duration-300">
            <InfoCard
              icon={<FaMoneyBillTrendUp className="h-6 w-6" />}
              title="Total Transactions"
              value="600432"
              percentageChange="7.3% Up"
              subtitle="from yesterday"
            />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

