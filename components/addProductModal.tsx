/** @format */

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/lib/AdminContext";

export default function AddProductModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { refreshProducts } = useAdmin();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  return (
    modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white text-black rounded-lg shadow-lg w-[95%] sm:w-[80%] max-h-[90vh] overflow-y-auto p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>

          <h2 className="text-xl font-bold mb-4">Add New Product</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (images.length < 2) {
                toast.warning("Please upload at least 2 images");
                return;
              }

              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);

              images.forEach((file) => {
                formData.append("images", file);
              });

              setLoading(true);
              const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
              });
              setLoading(false);

              if (res.ok) {
                toast.success("Product added!");
                form.reset();
                setImages([]);
                setModalOpen(false);
                await refreshProducts();
              } else {
                toast.error("Failed to add product");
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="border rounded p-2"
              required
            />

            {/* Description (always full width) */}
            <textarea
              name="description"
              placeholder="Description"
              className="border rounded p-2 sm:col-span-2"
              required
            />

            {/* Sizes */}
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (e.g. S,M,L,XL)"
              className="border rounded p-2"
              required
            />

            {/* Gender */}
            <input
              type="text"
              name="gender"
              placeholder="Gender (e.g. Men,Women)"
              className="border rounded p-2"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border rounded p-2"
              required
            />

            {/* Discount Price */}
            <input
              type="number"
              name="discountPrice"
              placeholder="Discount Price (optional)"
              className="border rounded p-2"
            />

            {/* Fabric */}
            <input
              type="text"
              name="fabric"
              placeholder="Fabric (e.g. Cotton, Silk)"
              className="border rounded p-2"
            />

            {/* Category */}
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Shirts, Pants)"
              className="border rounded p-2"
              required
            />

            {/* Images (full width) */}
            <input
              type="file"
              accept="image/*"
              multiple
              className="border rounded p-2 sm:col-span-2"
              onChange={handleFileChange}
            />

            {/* Preview selected images (full width) */}
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              {images.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Submit button (full width) */}
            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-2 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    )
  );
}
