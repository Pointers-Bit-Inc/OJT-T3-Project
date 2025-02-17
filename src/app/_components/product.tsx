"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

// Product management component
export function ProductManagement() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [status, setStatus] = useState<
    "Available" | "Low stock" | "Out of Stock"
  >("Available");
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProducts } = api.product.getAll.useQuery();
  const { data: searchResults } = api.product.search.useQuery(
    { query: searchQuery },
    { enabled: !!searchQuery }, // Only fetch when searchQuery is not empty
  );

  const utils = api.useUtils();

  // Create Product Mutation
  const createProduct = api.product.create.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      resetForm();
    },
  });

  // Update Product Mutation
  const updateProduct = api.product.update.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      setEditMode(null);
      setEditData(null);
    },
  });

  // Delete Product Mutation
  const deleteProduct = api.product.delete.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
    },
  });

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setStatus("Available");
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="text-2xl font-semibold">Product Management</h2>

      {/* CREATE PRODUCT FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editMode) {
            updateProduct.mutate({
              id: editMode,
              name,
              category,
              price: Number(price),
              quantity: Number(quantity),
            });
          } else {
            createProduct.mutate({
              name,
              category,
              price: Number(price),
              quantity: Number(quantity),
            });
          }
        }}
        className="mt-4 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border px-4 py-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border px-4 py-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded border px-4 py-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="rounded border px-4 py-2"
        />
        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as "Available" | "Low stock" | "Out of Stock",
            )
          }
          className="rounded border px-4 py-2"
        >
          <option value="Available">Available</option>
          <option value="Low stock">Low stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <button
          type="submit"
          className="mt-2 rounded-full bg-blue-500 py-2 text-white"
        >
          {editMode ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-6 w-full rounded border px-4 py-2"
      />

      {/* DISPLAY SEARCH RESULTS */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Search Results</h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(searchQuery ? searchResults : allProducts)?.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditMode(product.id);
                        setEditData(product);
                        setName(product.name);
                        setCategory(product.category);
                        setPrice(product.price.toString());
                        setQuantity(product.quantity.toString());
                        setStatus(
                          product.status as
                            | "Available"
                            | "Low stock"
                            | "Out of Stock",
                        );
                      }}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteProduct.mutate({ id: product.id })}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
