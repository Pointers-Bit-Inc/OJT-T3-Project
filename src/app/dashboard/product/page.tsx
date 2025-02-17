"use client";

import { NewProductManagement } from "~/app/_components/newproduct";
import { ProductManagement } from "~/app/_components/product";

export default function Product() {
  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h1 className="mb-4 text-3xl font-bold">Products</h1>
        <NewProductManagement />
        <ProductManagement />
      </main>
    </div>
  );
}
