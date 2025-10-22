
"use client";
import React, { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("cartState")) || {
      items: [],
      wishlist: [],
      orders: [],
    };
    setWishlist(savedState.wishlist || []);
  }, []);

  // Save updated wishlist to localStorage
  const updateLocalStorage = (updatedWishlist) => {
    const savedState = JSON.parse(localStorage.getItem("cartState")) || {
      items: [],
      wishlist: [],
      orders: [],
    };
    savedState.wishlist = updatedWishlist;
    localStorage.setItem("cartState", JSON.stringify(savedState));
  };

  // Remove item from wishlist
  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    updateLocalStorage(updatedWishlist);
  };

  // Move to cart
  const handleMoveToCart = (item) => {
    const savedState = JSON.parse(localStorage.getItem("cartState")) || {
      items: [],
      wishlist: [],
      orders: [],
    };
    const updatedCart = [...savedState.items, item];
    const updatedWishlist = wishlist.filter((w) => w.id !== item.id);
    const newState = {
      ...savedState,
      items: updatedCart,
      wishlist: updatedWishlist,
    };
    localStorage.setItem("cartState", JSON.stringify(newState));
    setWishlist(updatedWishlist);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        💖 Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your wishlist is empty 💔
        </p>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  {item.discountPrice > 0 ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">
                        Rs {item.price}
                      </span>
                      <span className="text-green-600 font-bold text-lg">
                        Rs {item.discountPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-700 font-bold text-lg">
                      Rs {item.price}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                  >
                    <Heart size={18} /> Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
