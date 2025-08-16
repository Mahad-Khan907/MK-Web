"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      
    },200)
    return () => clearTimeout(timer);

  },[])
  if (loading) {
    return (
      <div className="flex items-center justify-center text-purple-600 w-full h-screen p-20 text-4xl font-bold">
        Loading...
      </div>
    );
  }
  return (
    <div className="relative min-h-full overflow-hidden">
      <Image
        className="absolute opacity-60 object-cover w-full h-full inset-0 -z-10"
        src="/bg-purp.jpg"
        alt="Description"
        width={1500}
        height={1500}
      />

      <div className="flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 py-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-600">
            Contact{" "}
            <span className="text-purple-600 px-2 py-1 rounded-lg">MK Web</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-lg mx-auto">
            We’d love to hear from you! Whether you have a question, project
            idea, or just want to say hello — drop us a message.
          </p>
        </motion.div>

        {/* Contact Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden"
        >
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 p-6 sm:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4">
              Send us a message
            </h2>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-purple-600 text-white flex-1 p-6 sm:p-8 flex flex-col justify-center gap-4"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">Address</h3>
              <p className="text-gray-200 text-sm sm:text-base">
                123 MK Web Street, Karachi, Pakistan
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">Phone</h3>
              <p className="text-gray-200 text-sm sm:text-base">
                +92 300 1234567
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">Email</h3>
              <p className="text-gray-200 text-sm sm:text-base">
                support@mkweb.com
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
