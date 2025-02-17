"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type EditMode = string | number | null;

interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const ProductModal = ({ isOpen, onClose, editMode, editData }: {
  isOpen: boolean;
  onClose: () => void;
  editMode: EditMode;
  editData: Product | null;
}) => {
  const [name, setName] = useState(editData?.name || "");
  const [category, setCategory] = useState(editData?.category || "");
  const [price, setPrice] = useState(editData?.price?.toString() || "");
  const [quantity, setQuantity] = useState(editData?.quantity?.toString() || "");

  const utils = api.useUtils();
  const createProduct = api.product.create.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      resetForm();
      onClose();
    },
  });
  const updateProduct = api.product.update.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      resetForm();
      onClose();
    },
  });

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{editMode ? "Update Product" : "Add Product"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const productData = { name, category, price: Number(price), quantity: Number(quantity) };

            if (editMode) {
              if (typeof editMode === 'string') {
                updateProduct.mutate({ id: editMode, ...productData });
              } else if (typeof editMode === 'number') {
                updateProduct.mutate({ id: editMode.toString(), ...productData });
              }
            } else {
              createProduct.mutate(productData);
            }
          }}
          className="flex flex-col gap-4"
        >
          <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded border px-4 py-2" />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded border px-4 py-2" />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border px-4 py-2" />
          <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border px-4 py-2" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2">Cancel</button>
            <button type="submit" className="rounded-lg bg-blue-500 py-2 px-4 text-white">{editMode ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [editData, setEditData] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProducts } = api.product.getAll.useQuery();
  const { data: searchResults } = api.product.search.useQuery({ query: searchQuery }, { enabled: !!searchQuery });

  const utils = api.useUtils();
  const deleteProduct = api.product.delete.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
    },
  });

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="text-2xl font-semibold">Product Management</h2>

      <div className="flex justify-end items-center mt-4"> {/* Button and search on the same line */}
        <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-blue-500 py-2 px-4 text-white">
          Add Product
        </button>
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded border px-4 py-2 ml-4" // Add margin for spacing
        />
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Search Results</h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr><th>Name</th><th>Category</th><th>Price</th><th>Quantity</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {(searchQuery ? searchResults : allProducts)?.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button onClick={() => { setEditMode(product.id); setEditData(product); setIsModalOpen(true); }} className="text-yellow-500 hover:text-yellow-700">✏️ Edit</button>
                    <button onClick={() => deleteProduct.mutate({ id: product.id })} className="ml-2 text-red-500 hover:text-red-700">❌ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editMode={editMode} editData={editData} />
    </div>
  );
};