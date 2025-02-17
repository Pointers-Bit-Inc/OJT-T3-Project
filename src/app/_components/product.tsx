"use client";

import { useState } from "react";
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

interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  quantity: number;
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
  const [quantity, setQuantity] = useState(
    editData?.quantity?.toString() || "",
  );

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

export const ProductManagement = () => {
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
      <h2 className="text-2xl font-semibold">Product Management</h2>
      <div className="flex items-center justify-between">
        <Button onClick={() => setIsModalOpen(true)}>Add Product</Button>
        <Input
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(searchQuery ? searchResults : allProducts)?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditMode(product.id);
                    setEditData(product);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteProduct.mutate({ id: product.id })}
                >
                  Delete
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
