"use client";
import axios from "axios";
import { Delete, Edit, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TParentCategory = {
  onSave: (
    parentName?: string,
    editProduct?: { name: string; id: string },
    type?: string
  ) => void;
  data: string[];
  fetchParentCategories: () => void;
};

const ParentCategory = ({
  onSave,
  data,
  fetchParentCategories,
}: TParentCategory) => {
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editProduct, setEditProduct] = useState({} as any);
  const [parenCategories, setParentCategories] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setParentCategories(data);
    }
  }, [data]);
  const handleDelete = async (data: any) => {
    try {
      const response = await axios.delete(
        `/api/category?name=parent&id=${data.id}`
      );
      if (response.status === 200) {
        toast.success("Category deleted successfully !");
        fetchParentCategories();
      }
    } catch (error) {
      toast.error("Error in deleting category !");
    }
  };
  const handleSaveCategory = (name: string) => {
    if (editStatus) {
      onSave(parentCategoryName, editProduct, "edit");
      setEditStatus(false);
      setEditProduct({} as any);
    } else {
      onSave(parentCategoryName);
    }
    setParentCategoryName("");
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
          className="bg-[#B91C1C] hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSaveCategory(parentCategoryName)}
        >
          Save
        </button>
      </div>
      <div className="flex justify-center sm:justify-start">
        <div className="overflow-x-auto sm:min-w-[50%] min-w-[70%] rounded-lg border border-gray-200 mt-10">
          <table className="min-w-full max-h-72 overflow-auto divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                  Name
                </th>

                <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-700">
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

                    <td className="whitespace-nowrap px-4 py-2 justify-center flex ">
                      <button
                        className="flex text-purple-500 px-2 font-bold mx-1 rounded"
                        onClick={() => {
                          setEditStatus(true),
                            setEditProduct(product),
                            setParentCategoryName(product.name);
                        }}
                      >
                        <Edit />
                      </button>

                      <button
                        className=" text-red-500 flex px-2 justify-center items-center font-bold rounded"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    {" "}
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ParentCategory;
