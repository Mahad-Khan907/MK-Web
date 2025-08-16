"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  desc: string;
  price: number;
  img_url: string;
  specs?: string[];
  isBestSeller?: boolean;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "product"]{
      _id,
      name,
      desc,
      price,
      "img_url": img.asset->url,
      specs,
      isBestSeller
    }`;

    client.fetch(query).then((data: Product[]) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center text-2xl font-bold text-purple-600 py-10">Loading products...</p>;

  return (
    <div id="product" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="rounded-2xl shadow-lg p-4 border border-gray-200 flex flex-col"
        >
          {product.img_url && (
            <Image
              src={product.img_url}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-xl bg-white object-contain w-full h-48"
            />
          )}

          <div className="space-y-2 mt-3 flex-1">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.desc}</p>
            <p className="text-lg text-green-600 font-semibold">${product.price}</p>

            {product.isBestSeller && (
              <span className="text-sm text-white bg-purple-500 px-2 py-1 rounded-md inline-block">
                Best Seller
              </span>
            )}
          </div>

          {/* View Details Button */}
          <Link
            href={`/product/${product._id}`}
            className="mt-4 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
