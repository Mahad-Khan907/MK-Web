"use client";

import React, { useEffect, useState } from "react";
import {
  clearCart,
  getCartItems,
  Product,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Image from "next/image";
import Swal from "sweetalert2";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  // 🛠️ Force re-fetch from localStorage after update
  const refreshCart = () => setCartItems([...getCartItems()]);

  const handleRemove = (_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(_id);
        refreshCart();
        Swal.fire("Removed!", "Your item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (_id: string, quantity: number) => {
    updateCartQuantity(_id, quantity);
    refreshCart();
  };

  const handleIncrease = (_id: string) => {
    const product = cartItems.find((item) => item._id === _id);
    if (product) {
      handleQuantityChange(_id, product.quantity + 1);
    }
  };

  const handleDecrease = (_id: string) => {
    const product = cartItems.find((item) => item._id === _id);
    if (product && product.quantity > 1) {
      handleQuantityChange(_id, product.quantity - 1);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handleClearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      text: "All items will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        setCartItems([]);
        Swal.fire("Cleared!", "Your cart is now empty.", "success");
      }
    });
  };

  const handleProceed = () => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/checkout");
      return;
    }

    Swal.fire({
      title: "Proceed to Checkout",
      text: "Do you want to continue?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems([]);
        Swal.fire("Checkout Successful!", "Thank you for your purchase.", "success");
        router.push("/checkout");
      }
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center p-32 text-lg text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="md:p-10 md:px-20 p-4 px-4 space-y-6">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="md:text-3xl text-2xl font-bold text-purple-600">
          Your Cart
        </h1>
        <div className="md:w-32 w-28 mt-2 mb-6 h-[3px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full"></div>
      </div>

      {cartItems.map((item, index) => (
        <div
          className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden p-3 md:p-4 gap-4 shadow-sm"
          key={item._id || index} // ✅ unique key
        >
          <Image
            className="object-contain w-full md:w-[150px] h-[150px] rounded-md"
            src={item.img_url}
            alt={item.name}
            width={1000}
            height={1000}
          />
          <div className="flex flex-col flex-1">
            <h2 className="md:text-lg text-base font-bold text-purple-600">
              {item.name}
            </h2>
            <p className="text-sm text-gray-600 font-medium md:w-96">
              {item.desc}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-bold text-green-600">${item.price}</span>
              <span className="text-sm text-gray-400 line-through">
                ${item.price + 50}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              Subtotal:{" "}
              <span className="font-semibold text-green-700">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex md:flex-col flex-row md:items-end items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDecrease(item._id)}
                className="bg-gray-600 text-white text-2xl rounded-full cursor-pointer"
              >
                <FiMinus />
              </button>
              <span className="px-3 font-medium">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item._id)}
                className="bg-gray-600 text-white text-2xl rounded-full cursor-pointer"
              >
                <IoMdAdd />
              </button>
            </div>
            <button
              onClick={() => handleRemove(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md whitespace-nowrap"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="flex flex-col items-end gap-4 border-t pt-4">
          <p className="text-lg font-semibold">
            Total:{" "}
            <span className="text-green-600 font">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={handleClearCart}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              Clear Cart
            </button>
            <button
              onClick={handleProceed}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
