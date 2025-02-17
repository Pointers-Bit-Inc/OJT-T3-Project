"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";
import { Package, LayoutDashboard, BarChart, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";

const initialProducts = [
  {
    image: "/images/apple-watch.jpg",
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: "$690.00",
    quantity: 103,
    status: "In Stock",
  },
  {
    image: "/images/apple-watch.jpg",
    name: "Apple Watch Series 3",
    category: "Digital Product",
    price: "$590.00",
    quantity: 40,
    status: "Low Stock",
  },
  {
    image: "/images/apple-watch.jpg",
    name: "Apple Watch Series 2",
    category: "Digital Product",
    price: "$490.00",
    quantity: 0,
    status: "Out of Stock",
  },
];

export default function Product() {
  const router = useRouter();
  const [active, setActive] = useState("products");
  const [productToDelete, setProductToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // State for "Add Product" modal
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    category: "",
    price: "",
    quantity: 0,
    status: "In Stock",
  });
  const [products, setProducts] = useState(initialProducts); // State for product list

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    const updatedProducts = products.filter((prod) => prod !== productToDelete);
    setProducts(updatedProducts);
    setShowConfirmation(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setProductToDelete(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowModal(true); // Show modal for editing
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleEditSubmit = () => {
    const updatedProducts = products.map((prod) =>
      prod === editingProduct ? { ...prod, ...editingProduct } : prod,
    );
    setProducts(updatedProducts);
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleAddProductClick = () => {
    setShowAddModal(true); // Show "Add Product" modal
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewProduct({
      image: "",
      name: "",
      category: "",
      price: "",
      quantity: 0,
      status: "In Stock",
    });
  };

  const handleAddProductSubmit = () => {
    setProducts([...products, newProduct]); // Add new product to the list
    setShowAddModal(false);
    setNewProduct({
      image: "",
      name: "",
      category: "",
      price: "",
      quantity: 0,
      status: "In Stock",
    });
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/product", icon: Package },
    { name: "Report", href: "/dashboard/report", icon: BarChart },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden w-64 flex-col bg-white p-6 shadow-md md:flex">
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
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <div>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleAddProductClick}
            >
              + Add Product
            </Button>
            <input
              type="search"
              placeholder="Search product name"
              className="ml-4 rounded border px-3 py-2"
            />
          </div>
        </div>

        <p className="text-gray-700">Manage your products here.</p>

        <div className="container mx-auto">
          <Card className="mt-6 w-full p-6 shadow-md">
            <h2 className="text-lg font-bold">Product List</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell
                      className={
                        product.status === "Out of Stock"
                          ? "text-red-500"
                          : product.status === "Low Stock"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }
                    >
                      {product.status}
                    </TableCell>
                    <TableCell>
                      <button
                        className="mr-2 text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(product)} // Show modal for editing
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Confirmation Modal for Delete */}
        {showConfirmation && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
            <div className="rounded-md bg-white p-6 shadow-lg">
              <p>Are you sure you want to delete this product?</p>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button
                  className="ml-2 bg-red-600 text-white hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showModal && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
            <div className="w-96 rounded-md bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  value={editingProduct.quantity}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      quantity: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="ghost" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button
                  className="ml-2 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleEditSubmit}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
            <div className="w-96 rounded-md bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Add Product</h3>
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="ghost" onClick={handleAddModalClose}>
                  Cancel
                </Button>
                <Button
                  className="ml-2 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleAddProductSubmit}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        )}
        <ProductManagement />
      </main>
    </div>
  );
}
