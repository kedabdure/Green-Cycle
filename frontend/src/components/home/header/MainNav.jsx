"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { List as ListIcon } from "@phosphor-icons/react";

export default function MainNav({ onSideNavToggle, open }) {
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out ${
        y === 0 ? "bg-white" : "bg-white backdrop-blur-lg shadow-md"
      } ${y === 0 ? "py-4" : "py-3"}`}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 text-gray-900 transition-all">
        {/* Logo Section */}
        <div>
          <Link
            href="/home"
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            Green Cycle
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-4 my-1 sm:my-0">
          <Link
            href="/home"
            className="text-xs sm:text-sm md:text-base hover:text-gray-700 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/home/products"
            className="text-xs sm:text-sm md:text-base hover:text-gray-700 transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            href="/home/categories"
            className="text-xs sm:text-sm md:text-base hover:text-gray-700 transition-colors duration-300"
          >
            Categories
          </Link>
          <Link
            href="/home/about"
            className="text-xs sm:text-sm md:text-base hover:text-gray-700 transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href="/home/account"
            className="text-xs sm:text-sm md:text-base hover:text-gray-700 transition-colors duration-300"
          >
            Cart
          </Link>
        </nav>

        {/* Login/Register Section */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/auth/sign-in"
            className="text-xs sm:text-sm md:text-base hover:text-gray-700 transition-colors duration-300"
          >
            Login
          </Link>
          <Link href="/auth/sing-up">
            <div className="text-sm bg-gray-900 text-white rounded-3xl py-2 px-4 hover:bg-gray-700 transition-colors duration-300">
              Sign Up
            </div>
          </Link>
        </div>

        {/* Menu Button for Mobile */}
        <div className="block md:hidden">
          <button
            onClick={onSideNavToggle}
            className="flex items-center justify-center"
          >
            <ListIcon className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
