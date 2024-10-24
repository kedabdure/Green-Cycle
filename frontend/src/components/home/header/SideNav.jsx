"use client";

import React from "react";
import Link from "next/link";
import { X as XIcon } from "@phosphor-icons/react";

export default function SideNav({ open, onSideNavToggle }) {
  return (
    <>
      {/* Side Navigation Panel */}
      <div
        className={`fixed top-0 left-0 h-full z-40 w-[100vw] sm:w-72 bg-gray-900 text-white transition-transform duration-300 ease-in-out transform ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-6">
          <div>
            <Link
              href="/"
              className="text-lg md:text-xl lg:text-2xl font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              Green Cycle
            </Link>
          </div>

          <div className="block md:hidden">
            <button
              onClick={onSideNavToggle}
              className="flex items-center justify-center"
            >
              <XIcon className="text-3xl" />
            </button>
          </div>
        </div>


        <nav className="flex flex-col p-6 space-y-6">
          <Link
            href="/"
            className="hover:text-gray-400 transition duration-200"
            onClick={onSideNavToggle}
          >
            Home
          </Link>
          <Link
            href="/home/products"
            className="hover:text-gray-400 transition duration-200"
            onClick={onSideNavToggle}
          >
            Products
          </Link>
          <Link
            href="/home/categories"
            className="hover:text-gray-400 transition duration-200"
            onClick={onSideNavToggle}
          >
            Categories
          </Link>
          <Link
            href="/home/about"
            className="hover:text-gray-400 transition duration-200"
            onClick={onSideNavToggle}
          >
            About
          </Link>
          <Link
            href="/home/account"
            className="hover:text-gray-400 transition duration-200"
            onClick={onSideNavToggle}
          >
            Account
          </Link>
          <Link
            href="/home/cart"
            className="hover:text-gray-400 transition duration-200"
            onClick={onSideNavToggle}
          >
            Cart
          </Link>

          <div className="border-t border-gray-700 mt-9 pt-8">
            <Link
              href="/auth/sign-in"
              className="hover:text-gray-400 transition duration-200"
              onClick={onSideNavToggle}
            >
              Login
            </Link>
            <Link href="/auth/sign-up">
              <div className="bg-gray-700 text-white text-center rounded-lg py-2 px-4 hover:bg-gray-600 transition-colors duration-200 mt-4">
                Sign Up
              </div>
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay when Side Nav is Open */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={onSideNavToggle}
        ></div>
      )}
    </>
  );
}
