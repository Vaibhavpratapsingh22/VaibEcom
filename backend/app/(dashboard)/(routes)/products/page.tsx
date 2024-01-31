"use client";
import Modal from "@/app/components/DeleteModal";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState<boolean>(false);
  const [deleteProduct, setDeleteProduct] = useState<string | number>("");
  const getProducts = async () => {
    try {
      const response = await axios.get("/api/product");
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      toast.error("Error in fetching products !");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleEditDelete = async (handle: string, product: any) => {
    switch (handle) {
      case "edit":
        router.push(`/products/${product.id}`, product);
        break;

      case "delete":
        setModal(true);
        setDeleteProduct(product.name);
        break;
    }
  };
  const closeModal = async (name: string) => {
    if (name === "delete") {
      try {
        const response = await axios.delete(`/api/product/?name=${deleteProduct}`);
        if (response.status === 200) {
          toast.success("Product deleted successfully !");
          getProducts();
        }
      } catch (error) {
        toast.error("Error in deleting product !");
      }
    }
    setModal(!modal);
  };
  return (
    <div>
      <Link href="/products/new">
        <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded mb-4">
          Add Product
        </button>
      </Link>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap text-left px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product: any) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.description}
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex text-gray-700">
                  <button
                    className="flex text-black font-bold mx-1 rounded"
                    onClick={() => handleEditDelete("edit", product)}
                  >
                    <Edit /> Edit
                  </button>

                  <button
                    className=" text-black flex justify-center items-center font-bold rounded"
                    onClick={() => handleEditDelete("delete", product)}
                  >
                    <Delete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default Products;
