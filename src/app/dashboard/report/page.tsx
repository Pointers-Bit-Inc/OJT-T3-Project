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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

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
  const [selectedTransaction, setSelectedTransaction] = useState<typeof initialTransactions[0] | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

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
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setIsReceiptOpen(true);
                          }}
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

        {/* E-Receipt Modal */}
        <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">E-Receipt</DialogTitle>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="border-b pb-4 text-center">
                  <h2 className="text-xl font-bold">JTech Store</h2>
                  <p className="text-sm text-gray-500">123 Tech Street, Silicon Valley</p>
                  <p className="text-sm text-gray-500">Tel: (555) 123-4567</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receipt No:</span>
                    <span className="font-medium">#{selectedTransaction.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{selectedTransaction.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span>{selectedTransaction.customer}</span>
                  </div>
                </div>

                <div className="border-t border-b py-4">
                  <div className="mb-2 font-semibold">Order Details</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{selectedTransaction.productName}</span>
                      <span>x{selectedTransaction.quantity}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span>{selectedTransaction.price}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-center text-sm">
                  <div className="font-medium">Payment Status: 
                    <span className={selectedTransaction.status === "Completed" ? "text-green-500" : "text-yellow-500"}>
                      {" "}{selectedTransaction.status}
                    </span>
                  </div>
                  <p className="text-gray-500">Thank you for shopping with us!</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
