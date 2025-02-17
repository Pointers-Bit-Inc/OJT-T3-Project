"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Pencil, Trash2 } from "lucide-react"; // Import icons from Lucide
interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: string;
}

type EditMode = string | number | null;

const ProductModal = ({
  isOpen,
  onClose,
  editMode,
  editData,
}: {
  isOpen: boolean;
  onClose: () => void;
  editMode: EditMode;
  editData: Product | null;
}) => {
  const [name, setName] = useState(editData?.name || "");
  const [category, setCategory] = useState(editData?.category || "");
  const [price, setPrice] = useState(editData?.price?.toString() || "");
  const [status, setStatus] = useState(editData?.status || "");
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(
    editData?.quantity?.toString() || "",
  );
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Update Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const productData = {
              name,
              category,
              price: Number(price),
              quantity: Number(quantity),
            };
            editMode
              ? updateProduct.mutate({
                  id: editMode.toString(),
                  ...productData,
                })
              : createProduct.mutate(productData);
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editMode ? "Update" : "Add"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const NewProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [editData, setEditData] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProducts } = api.product.getAll.useQuery();
  const { data: searchResults } = api.product.search.useQuery(
    { query: searchQuery },
    { enabled: !!searchQuery },
  );
  const utils = api.useUtils();
  const deleteProduct = api.product.delete.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
    },
  });

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Product List</h2>
        </div>
        <div className="flex items-center gap-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="border border-green-500 bg-green-100 text-green-500 hover:bg-green-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Product
          </Button>
          <Input
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Table className="overflow-hidden rounded-lg border border-gray-300 bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="px-5 py-5 font-semibold">Name</TableHead>
            <TableHead className="px-5 py-5 font-semibold">Category</TableHead>
            <TableHead className="px-5 py-5 font-semibold">Price</TableHead>
            <TableHead className="px-5 py-5 font-semibold">Quantity</TableHead>
            <TableHead className="px-5 py-5 font-semibold">Status</TableHead>
            <TableHead className="px-5 py-5 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchQuery ? searchResults : allProducts)?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="px-5 py-5 text-gray-700">
                {product.name}
              </TableCell>
              <TableCell className="px-5 py-5 text-gray-700">
                {product.category}
              </TableCell>
              <TableCell className="text-black-600 px-5 py-5 font-semibold">
                {product.price}
              </TableCell>
              <TableCell
                className={`${
                  product.quantity === 0
                    ? "text-red-900"
                    : product.quantity <= 5
                      ? "text-yellow-900"
                      : "text-black"
                } justify flex px-5 py-5`}
              >
                {product.quantity}
              </TableCell>
              <TableCell
                className={`${
                  product.status === "Out of Stock"
                    ? "text-red-500"
                    : product.status === "Low stock"
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {product.status}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditMode(product.id);
                    setEditData(product);
                    setIsModalOpen(true);
                  }}
                  className="rounded-md border border-yellow-500 bg-yellow-100 p-2 text-yellow-500 hover:bg-yellow-200"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteProduct.mutate({ id: product.id })}
                  className="rounded-md border border-red-500 bg-red-100 p-2 text-red-500 hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editMode={editMode}
        editData={editData}
      />
    </div>
  );
};
