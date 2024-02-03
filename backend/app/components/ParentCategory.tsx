"use client";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TParentCategory = {
  onSave: (name: string) => void;
  data: string[];
};

const ParentCategory = ({ onSave, data }: TParentCategory) => {
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [parenCategories, setParentCategories] = useState<string[]>([]);
  useEffect(() => { 
    if(data.length > 0){
      setParentCategories(data);
    }
  }, [data]);

  return (
    <>
      <h2 className="mt-20">Create New Parent Category </h2>
      <div className="flex">
        <input
          type="text"
          id="Category Name"
          name="Category Name"
          placeholder="Please enter name"
          required
          value={parentCategoryName}
          onChange={(e) => setParentCategoryName(e.target.value)}
          className="mt-1 mr-2 px-5 h-10 bg-gray text-sm text-gray-700 shadow-sm"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            onSave(parentCategoryName), setParentCategoryName("");
          }}
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
            {parenCategories?.map((product: any) => (
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
    </>
  );
};

export default ParentCategory;
