"use client";
import ParentCategory from "@/app/components/ParentCategory";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

type TSelect = {
  value: string | number;
  label: string;
};

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState<TSelect>({
    value: 0,
    label: "Select Parent Category",
  });
  const [parentCategoryData, setParentCategoryData] = useState([]);
  const handleSaveParentCategory = async (name: string) => {
    const data = {
      parentName: name,
      saveParentCategory: true,
    };
    try {
      const response = await axios.post("/api/category", data);
      if (response.status === 201) {
        toast.success("Parent Category saved successfully !");
        getAllParentCategories();
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

  const getAllParentCategories = async () => {
    try {
      const response = await axios.get("/api/category?get=parent");
      if (response.status === 200) {
        setParentCategoryData(response.data);
      }
    } catch (error) {
      toast.error("Error in fetching categories !");
    }
  };

  const handleSaveCategory = async () => {
    const data = {
      categoryName,
      parentCategoryId: parentCategory,
      saveCategory: true,
    };
    if (parentCategory.value !== 0) {
      try {
        const response = await axios.post("/api/category", data);
        if (response.status === 201) {
          toast.success("Category saved successfully !");
          setCategoryName("");
          setParentCategory({
            value: 0,
            label: "Please Slect Parent Category",
          });
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
    } else {
      toast.error("Please select parent category !");
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await axios.get("/api/category?get=category");
      if (response.status === 200) {
        console.log(response);
        setCategories(response.data);
      }
    } catch (error) {
      toast.error("Error in fetching categories !");
    }
  };
  useEffect(() => {
    getAllCategories();
    getAllParentCategories();
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
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="mt-1 mr-2 px-5 h-10 bg-gray text-sm text-gray-700 shadow-sm"
        />
        <ReactSelect
          className="w-1/2 mt-1"
          options={parentCategoryData.map((cat: any) => ({
            value: cat.id,
            label: cat.name,
          }))}
          placeholder="Select Parent Category"
          value={parentCategory}
          onChange={(e: any) => setParentCategory(e)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveCategory}
        >
          Save
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10">
        <table className="min-w-full max-h-72 overflow-auto divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-center">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Parent Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {categories?.map((product: any) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.name.toUpperCase()}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.parent?.name.toUpperCase() || "N/A"}
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
      <ParentCategory
        onSave={handleSaveParentCategory}
        data={parentCategoryData}
      />
    </>
  );
};

export default Categories;
