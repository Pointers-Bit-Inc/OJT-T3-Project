import React from "react";
import InfoCard from "~/components/jtechcomponents/InfoCard";
// import { Card, CardHeader, CardTitle, CardDescription } from "shadcn";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content (Sidebar removed) */}
      <main className="flex-1 p-6">
        {/* flex-1 still important to fill space */}
        <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoCard
            icon={
              <svg //separate for it not to be bulky #TODO
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-15V4.5m0 0l-6.75 6.75M12 4.5l-6.75 6.75"
                />
              </svg>
            }
            title="Total Transactions"
            value="600432"
            percentageChange="7.3% Up"
            subtitle="from yesterday"
          />

          <InfoCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m7-7h-14"
                />
              </svg>
            }
            title="New Users"
            value="34021"
            percentageChange="5.1% Down"
            subtitle="from yesterday"
          />
        </div>
        {/* Rest of your dashboard content */}
      </main>
    </div>
  );
}

export default Dashboard;
