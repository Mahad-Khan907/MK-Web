"use client";
import React, { useEffect, useState } from "react";
import { getCartItems, Product } from "../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

function Checkout() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cnic: "",
    city: "",
    zipCode: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    zipCode: false,
  });

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      name: !formValues.name,
      email: !formValues.email,
      phone: !formValues.phone,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    const orderData = {
      _type: "order",
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      cartItems: cartItems.map((item) => ({
        _key: `${item._id}-${Date.now()}`, // unique key
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        img_url: item.img_url, // already string URL
      })),
      total: subTotal,
      status: "pending",
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);

      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        timer: 3000,
        showConfirmButton: false,
      });

      localStorage.removeItem("cart");
      setCartItems([]);
      setFormValues({
        name: "",
        email: "",
        phone: "",
        address: "",
        cnic: "",
        city: "",
        zipCode: "",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "There was a problem placing your order. Please try again.",
      });
    }
  };

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600 text-center">
        Checkout
      </h1>
      <div className="md:w-32 w-32 mb-6 h-[3px] bg-gradient-to-r text-center m-auto from-purple-600 via-pink-500 to-blue-600 rounded-full"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE - Form */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={formValues.name}
              onChange={handleInputChange}
              className={`p-3 border rounded-lg ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
              className={`p-3 border rounded-lg ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={formValues.phone}
              onChange={handleInputChange}
              className={`p-3 border rounded-lg ${
                formErrors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              name="address"
              placeholder="Address"
              value={formValues.address}
              onChange={handleInputChange}
              className={`p-3 border rounded-lg ${
                formErrors.address ? "border-red-500" : "border-gray-300"
              }`}
            />

            <input
              type="number"
              name="cnic"
              placeholder="CNIC (optional)"
              value={formValues.cnic || ""} 
              onChange={handleInputChange}
              className="p-3 border rounded-lg"
            />

            <input
              name="city"
              placeholder="City"
              value={formValues.city}
              onChange={handleInputChange}
              className={`p-3 border rounded-lg ${
                formErrors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            <input
              name="zipCode"
              placeholder="Zip Code"
              value={formValues.zipCode}
              onChange={handleInputChange}
              className={`p-3 border rounded-lg ${
                formErrors.zipCode ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Payment Method
            </label>
            <select className="w-full md:w-64 p-3 border rounded-md border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="cash-on-delivery">Cash on Delivery</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="md:sticky md:top-6 self-start">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {item.img_url && (
                      <Image
                        src={item.img_url} // Direct string URL
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-green-500">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="flex justify-between mt-4 p-4 border-t font-semibold text-lg">
                <span>Subtotal:</span>
                <span className="text-green-600 font-bold">${subTotal}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
