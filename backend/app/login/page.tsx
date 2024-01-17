"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

import Image from "next/image";

export default function Login() {
  return (
    <div className="flex md:h-screen justify-center items-center w-full">
      <Image 
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f"
          alt="Login Image"
          objectFit="cover"
          width={1080}
          height={720}
          />
      {/* <div className="flex items-center justify-center w-full md:w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Image"
          width={800}
          height={600}
        />
      </div> */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/4 py-2">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome To Vaib-Ecom Dashboard!
            </h1>
            <p className="mt-2 text-gray-600">
              Please login in to your account.
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <button
                className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                onClick={() => signIn("google")}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
