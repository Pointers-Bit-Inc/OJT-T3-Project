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
import { ProductManagement } from "~/app/_components/product";
import { never } from "zod";

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

  const handleDeleteClick = (product: any) => {
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

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setShowModal(true); // Show modal for editing
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleEditSubmit = () => {
    const updatedProducts = products.map((prod) =>
      prod === editingProduct ? { prod: never, editingProduct: never} : prod,
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
      <main>
        <ProductManagement />
      </main>
    </div>
  );
}
