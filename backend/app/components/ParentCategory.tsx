"use client";
import axios from "axios";
import { Delete, Edit, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TParentCategory = {
  onSave: (name: string, type?: string) => void;
  data: string[];
};

const ParentCategory = ({ onSave, data }: TParentCategory) => {
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [parenCategories, setParentCategories] = useState<string[]>([]);
  useEffect(() => {
    if (data.length > 0) {
      setParentCategories(data);
    }
  }, [data]);
  const handleEditDelete = async (action: string, data: any) => {
    if (action === "edit") {
      setParentCategoryName(data.name);
    } else {
      try {
        const response = await axios.delete(`/api/category/?name=parent&${data.id}`);
        if (response.status === 200) {
          toast.success("Category deleted successfully !");
        }
      } catch (error) {
        toast.error("Error in deleting category !");
      }
    }
  };
  return (
    <>
      <h2 className="mb-3 mt-20 text-xl">Create New Parent Category </h2>
      <div className="flex">
        <input
          type="text"
          id="Category Name"
          name="Category Name"
          placeholder="Name"
          required
          value={parentCategoryName}
          onChange={(e) => setParentCategoryName(e.target.value)}
          className="mt-1 mr-2 px-5 h-10 bg-gray text-sm text-gray-700 shadow-sm"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            onSave(parentCategoryName, "edit"), setParentCategoryName("");
          }}
        >
          Save
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10">
        <table className="min-w-full max-h-72 overflow-auto divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>

              <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {parenCategories?.length > 0 ? (
              parenCategories?.map((product: any) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {product.name.toUpperCase()}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 justify-center flex text-gray-700">
                    <button
                      className="flex text-black font-bold mx-1 rounded"
                      onClick={() => setParentCategoryName(product.name)}
                    >
                      <Edit />
                    </button>

                    <button
                      className=" text-black flex justify-center items-center font-bold rounded"
                      // onClick={() => handleEditDelete("delete", product)}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}> No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ParentCategory;
