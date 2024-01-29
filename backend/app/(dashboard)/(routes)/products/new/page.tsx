"use client";
import { createProduct } from "@/app/api/product/route";
import axios from "axios";
import React, { useState } from "react";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = { name, price, description };
    const resposne = await axios.post("/api/product", data);
    console.log(resposne);
  };
  return (
    <>
      <h2>Add new product </h2>
      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            id="ProductName"
            name="Product Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-5 h-10 border-gray-400 border-2 bg-gray text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Price (in Rs.)
          </label>

          <input
            type="text"
            id="ProductPrice"
            required
            onChange={(e) => setPrice(e.target.value)}
            name="Product Price"
            className="mt-1 w-full px-5 h-10 border-gray-400 border-2 bg-gray text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>

          <input
            type="text"
            id="Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            className="mt-1 w-full px-5 h-10 border-gray-400 border-2 bg-gray text-sm text-gray-700 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className=" mt-10 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 cursor-pointer"
        >
          Save Details
        </button>
      </form>
    </>
  );
};

export default NewProduct;
