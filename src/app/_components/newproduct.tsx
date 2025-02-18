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
import { Pencil, Trash2 } from "lucide-react"; 
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
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setCategory(editData.category);
      setPrice(editData.price.toString());
      setQuantity(editData.quantity.toString());
    } else {
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
    }
  }, [editData]);

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
              status,
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
  const [sortConfig, setSortConfig] = useState<{
    key: "name" | "category" | "price" | null;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

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
            onClick={() => {
              setEditMode(null);
              setEditData(null);
              setIsModalOpen(true);
            }}
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
            <TableHead
              className="cursor-pointer px-5 py-5 font-semibold hover:bg-gray-50"
              onClick={() =>
                setSortConfig((prev) => ({
                  key: "name",
                  direction:
                    prev.key === "name" && prev.direction === "asc"
                      ? "desc"
                      : "asc",
                }))
              }
            >
              <div className="flex items-center gap-2">
                Name
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer px-5 py-5 font-semibold hover:bg-gray-50"
              onClick={() =>
                setSortConfig((prev) => ({
                  key: "category",
                  direction:
                    prev.key === "category" && prev.direction === "asc"
                      ? "desc"
                      : "asc",
                }))
              }
            >
              <div className="flex items-center gap-2">
                Category
                {sortConfig.key === "category" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer px-5 py-5 font-semibold hover:bg-gray-50"
              onClick={() =>
                setSortConfig((prev) => ({
                  key: "price",
                  direction:
                    prev.key === "price" && prev.direction === "asc"
                      ? "desc"
                      : "asc",
                }))
              }
            >
              <div className="flex items-center gap-2">
                Price
                {sortConfig.key === "price" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </div>
            </TableHead>
            <TableHead className="px-5 py-5 font-semibold">Quantity</TableHead>
            <TableHead className="px-5 py-5 font-semibold">Status</TableHead>
            <TableHead className="px-5 py-5 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchQuery ? searchResults : allProducts)
            ?.sort((a, b) => {
              if (!sortConfig.key) return 0;

              if (sortConfig.key === "price") {
                return sortConfig.direction === "asc"
                  ? a.price - b.price
                  : b.price - a.price;
              }

              const aValue = a[sortConfig.key].toLowerCase();
              const bValue = b[sortConfig.key].toLowerCase();

              return sortConfig.direction === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            })
            ?.map((product) => (
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
                    className="rounded-md border border-blue-600 bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${product.name}?`,
                        )
                      ) {
                        deleteProduct.mutate({ id: product.id });
                      }
                    }}
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
