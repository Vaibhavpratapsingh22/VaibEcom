"use client";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

const Categories = () => {
  const [catName, setCatName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCat, setParentCat] = useState("");

  const handleSaveCat = async () => {
    const data = {
      catName,
      parentCat,
    };
    try {
      const response = await axios.post("/api/category", data);
      if (response.status === 201) {
        toast.success("Category saved successfully !");
        setCatName("");
        getAllCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error("Error while creating category!");
      } else {
        toast.error("Error in saving category !");
      }
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      toast.error("Error in fetching categories !");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <h2>Create New Category </h2>
      <div className="flex">
        <input
          type="text"
          id="Category Name"
          name="Category Name"
          placeholder="Please enter category name"
          required
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          className="mt-1 mr-2 px-5 h-10 bg-gray text-sm text-gray-700 shadow-sm"
        />
        <ReactSelect
          className="w-1/2 mt-1"
          options={categories.map((cat: any) => ({
            value: cat.id,
            label: cat.name,
          }))}
          onChange={(e) => setParentCat(e?.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveCat}
        >
          Save
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories?.map((product: any) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.name.toUpperCase()}
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex text-gray-700">
                  <button
                    className="flex text-black font-bold mx-1 rounded"
                    // onClick={() => handleEditDelete("edit", product)}
                  >
                    <Edit /> Edit
                  </button>

                  <button
                    className=" text-black flex justify-center items-center font-bold rounded"
                    // onClick={() => handleEditDelete("delete", product)}
                  >
                    <Delete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Categories;
