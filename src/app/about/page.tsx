"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function Page() {

  const [loading , setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-purple-600 w-full h-screen p-20 text-4xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="about-page"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative min-h-screen overflow-hidden"
      >
        <Image
          className="opacity-60 absolute inset-0 -z-10"
          src="/bg-purp.jpg"
          alt="About Us"
          fill
          style={{ objectFit: "cover" }}
        />

        <div className="flex flex-col items-center justify-center px-6 py-20 w-full h-screen text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold text-purple-600"
          >
            About Us
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-40 mt-2 h-[3px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full origin-left"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-lg max-w-2xl text-gray-800"
          >
            Welcome to <span className="font-semibold text-purple-700">MKWeb</span> —
            Karachi’s leading laptop wholesale dealer.
            We provide high-quality laptops, accessories, and IT solutions at competitive prices.
            Whether you’re a business, reseller, or individual customer, our mission is to offer
            you the latest technology with reliable after-sales support.
            With years of experience, we’ve built a reputation for trust, quality, and excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              href="/contact"
              className="mt-8 inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-full transition"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Page;
