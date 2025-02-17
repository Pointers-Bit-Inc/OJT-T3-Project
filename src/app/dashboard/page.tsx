import React from "react";
import Card from "~/components/jtechcomponents/Card";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content (Sidebar removed) */}
      <main className="flex-1 p-6">  {/* flex-1 still important to fill space */}
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full h-10 w-10 flex items-center justify-center mr-2">
                <span className="text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.145m0 0l-6.75-3.93m6.75 3.93V12m0 8.925v-2.145m0 0l-6.75-3.93m6.75 3.93V18.15" />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medium">Total Stock</h2>
                <p className="text-2xl font-bold">56837</p>
                <p className="text-sm text-gray-500">
                  <span className="text-green-500">10.5% Up</span> from past week
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full h-10 w-10 flex items-center justify-center mr-2">
                <span className="text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medium">Total Low-stock alerts</h2>
                <p className="text-2xl font-bold">120</p>
                <p className="text-sm text-gray-500">
                  <span className="text-red-500">1.3% down</span> from past week
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full h-10 w-10 flex items-center justify-center mr-2">
                <span className="text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-15V4.5m0 0l-6.75 6.75M12 4.5l-6.75 6.75" />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medium">Total Transactions</h2>
                <p className="text-2xl font-bold">600432</p>
                <p className="text-sm text-gray-500">
                  <span className="text-green-500">7.3% Up</span> from yesterday
                </p>
              </div>
            </div>
          </div>
           
        </div>

        {/* Rest of your dashboard content */}
      </main>
    </div>
  );
}

export default Dashboard;