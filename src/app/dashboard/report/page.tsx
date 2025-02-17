"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Package, LayoutDashboard, BarChart } from "lucide-react";

const initialTransactions = [
  {
    id: 1,
    date: "2025-02-01",
    productName: "Apple Watch Series 4",
    customer: "John Doe",
    quantity: 1,
    price: "$690.00",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-02-03",
    productName: "Apple Watch Series 3",
    customer: "Jane Smith",
    quantity: 2,
    price: "$1180.00",
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-02-04",
    productName: "Apple Watch Series 2",
    customer: "Alice Johnson",
    quantity: 3,
    price: "$1470.00",
    status: "Completed",
  },
];

export default function Report() {
  const [active, setActive] = useState("report");
  const [transactions, setTransactions] = useState(initialTransactions);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <main className="relative flex-1 p-6 md:p-8">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-semibold">Transaction Report</h1>
          <p className="text-gray-600">View all transaction details below.</p>

          {/* Responsive Card */}
          <Card className="mx-auto w-full max-w-7xl p-6 shadow-md sm:p-4 md:p-6 lg:p-8">
            <h2 className="mb-4 text-xl font-semibold">Transactions</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.productName}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>{transaction.price}</TableCell>
                      <TableCell
                        className={
                          transaction.status === "Completed"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }
                      >
                        {transaction.status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Generate Report
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
