"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";
import { addToCart, Product } from "@/app/actions/actions";
import ProductPage from "@/app/components/Product";
import { spec } from "node:test/reporters";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const query = `*[_type == "product" && _id == $id][0]{
      _id,
      name,
      desc,
      price,
      quantity,
      "img_url": img.asset->url,
      specs,
      isBestSeller
    }`;

    client.fetch(query, { id }).then((data: Product) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center text-purple-600 w-full h-screen p-20 text-4xl font-bold">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        ❌ Product not found
      </div>
    );

  const handleCartData = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: window.innerWidth < 768 ? "center" : "top-right",
      icon: "success",
      title: "Product added to cart successfully!\nClick on Cart icon.",
      showConfirmButton: true,
      confirmButtonText: "Continue Shopping",
      timer: 5000,
    });
    addToCart(product);
  };

  const longDescription = `${product.desc} ✨ Crafted for performance, durability, and style. Perfect for work, gaming, and daily use.`;
  const longdescription = `${product.desc} Built to last with premium materials and thoughtful design. 🔋 Long-lasting and ready to support you all day, every day.`;

  return (
    <div className="relative">
      {/* Background */}
      <Image
        src="/bg-purp.jpg"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Compact Product Details */}
      <div className="flex flex-col lg:flex-row justify-center items-start pt-10 pb-6 px-4 lg:px-20 gap-6 relative z-10">
        {/* Product Image */}
        <div className="relative group w-full max-w-sm flex justify-center">
          <Image
            className="bg-white rounded-xl shadow-lg transform group-hover:scale-105 transition duration-300"
            src={product.img_url}
            alt={product.name}
            width={400}
            height={300}
            priority
          />
          {product.isBestSeller && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-2 py-1 text-xs rounded-full shadow-md">
              🌟 Best Seller
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-md border border-gray-100">
          <h1 className="text-2xl font-extrabold text-purple-800 mb-2">
            {product.name} 🛍
          </h1>

          <p className="text-gray-700 text-sm leading-relaxed mb-3">{longDescription} <span className=" hidden md:block">{longdescription}</span></p>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl font-bold text-green-600">${product.price}</span>
            <span className="text-sm text-gray-400 line-through">${product.price + 50}</span>
          </div>

          <button
            onClick={(e) => handleCartData(e, product)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition font-semibold w-full"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-6 px-4 lg:px-20 pb-10">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Related Products</h2>
        <div className="w-52 mt-4 md:mb-8 mb-6 h-[3px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full"></div>
        <ProductPage />
      </div>
    </div>
  );
}
