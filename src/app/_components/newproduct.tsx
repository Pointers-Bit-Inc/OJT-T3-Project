"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Label } from "recharts";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: string;
}

type EditMode = string | number | null;

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const utils = api.useUtils();
  const createProduct = api.product.create.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      setIsSubmitting(false);
      toast.success("Product created successfully!", {
        style: { color: '#22C55E' } // Green color
      });
      resetForm();
      onClose();
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error(error.message);
    }
  });

  const updateProduct = api.product.update.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      setIsSubmitting(false);
      toast.success("Successfully Updated", {
        style: { color: '#22C55E' } // Green color
      });
      resetForm();
      onClose();
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error(error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isSubmitting && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Update Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            const productData = {
              name,
              category,
              price: Number(price),
              quantity: Number(quantity),
              status: Number(quantity) === 0 
                ? "Out of Stock" 
                : Number(quantity) <= 5 
                  ? "Low stock" 
                  : "In Stock",
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <Input
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Input
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isSubmitting}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={isSubmitting}
              min="0"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editMode ? "Updating..." : "Adding..."}
                </>
              ) : (
                editMode ? "Update" : "Add"
              )}
            </Button>
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
  const [deleteData, setDeleteData] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState<{
    key: "name" | "category" | "price" | null;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  const { data: allProducts } = api.product.getAll.useQuery();
  const { data: searchResults } = api.product.search.useQuery(
    { query: debouncedSearchQuery },
    { enabled: !!debouncedSearchQuery },
  );
  const utils = api.useUtils();
  const deleteProduct = api.product.delete.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
    },
  });

  // Get current products for pagination
  const getCurrentProducts = () => {
    const products = searchQuery ? searchResults : allProducts;
    if (!products) return [];

    const sortedProducts = [...products].sort((a, b) => {
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
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  // Get total number of pages
  const totalPages = Math.ceil(
    ((searchQuery ? searchResults : allProducts)?.length || 0) / itemsPerPage
  );

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleSort = (key: "name" | "category" | "price") => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <Toaster />
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
      {/* Fixed Table Container */}
      <div className="relative shadow-md sm:rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer px-5 py-3 hover:bg-gray-50 font-semibold bg-white border-b"
                onClick={() => handleSort("name")}
              >
                Product Name
                {sortConfig.key === "name" && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer px-5 py-3 hover:bg-gray-50 font-semibold bg-white border-b"
                onClick={() => handleSort("category")}
              >
                Category
                {sortConfig.key === "category" && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer px-5 py-3 hover:bg-gray-50 font-semibold bg-white border-b"
                onClick={() => handleSort("price")}
              >
                Price
                {sortConfig.key === "price" && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead className="px-5 py-3 font-semibold bg-white border-b">Quantity</TableHead>
              <TableHead className="px-5 py-3 font-semibold bg-white border-b">Status</TableHead>
              <TableHead className="px-5 py-3 font-semibold bg-white border-b">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {getCurrentProducts()?.map((product) => (
              <TableRow 
                key={product.id}
                className="bg-white hover:bg-gray-50 transition-colors h-[48px]"
              >
                <TableCell className="px-5 py-4 text-gray-700 whitespace-nowrap">
                  {product.name}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-700 whitespace-nowrap">
                  {product.category}
                </TableCell>
                <TableCell className="px-5 py-4 font-semibold whitespace-nowrap">
                  ₱{product.price.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`px-5 py-4 whitespace-nowrap ${
                    product.quantity === 0
                      ? "text-red-900"
                      : product.quantity <= 5
                        ? "text-yellow-900"
                        : "text-black"
                  }`}
                >
                  {product.quantity}
                </TableCell>
                <TableCell
                  className={`px-5 py-4 whitespace-nowrap ${
                    product.status === "Out of Stock"
                      ? "text-red-500"
                      : product.status === "Low stock"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {product.status}
                </TableCell>
                <TableCell className="px-5 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
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

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setDeleteData(product);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="rounded-md border border-red-500 bg-red-100 p-2 text-red-500 hover:bg-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Add empty rows to maintain height when less than 5 items */}
            {getCurrentProducts()?.length < itemsPerPage && Array.from({ length: itemsPerPage - (getCurrentProducts()?.length || 0) }).map((_, index) => (
              <TableRow key={`empty-${index}`} className="h-[48px]">
                <TableCell colSpan={6}>&nbsp;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {getCurrentProducts()?.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No products found.
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, (searchQuery ? searchResults : allProducts)?.length || 0)} of {(searchQuery ? searchResults : allProducts)?.length || 0} entries
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`rounded px-3 py-1 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          {getPageNumbers().map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`rounded px-3 py-1 ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`rounded px-3 py-1 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditMode(null);
          setEditData(null);
        }}
        editMode={editMode}
        editData={editData}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteData?.name}&quot;?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteData) {
                  deleteProduct.mutate({ id: String(deleteData.id) });
                  setIsDeleteDialogOpen(false);
                  setDeleteData(null);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
