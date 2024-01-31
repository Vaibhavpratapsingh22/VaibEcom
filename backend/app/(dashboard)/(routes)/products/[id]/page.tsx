"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState<String[]>([]);
  const [newImages, setNewImages] = useState<String[]>([]);
  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      price,
      description,
      images: productImages,
      newImages: newImages,
    };
    try {
      const response = await axios.put("/api/product", data);
      if (response.status === 201) {
        toast.success("Product saved successfully !");
        clearForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error("Product already exists !");
      } else {
        toast.error("Error in saving product !");
      }
    }
  };
  const fetchProduct = async () => {
    if (id) {
      try {
        const response = await axios.get(`/api/product/?id=${id}`);
        if (response.status === 200) {
          setName(response.data.name);
          setPrice(response.data.price);
          setDescription(response.data.description);
          setProductImages(response.data.image);
        }
      } catch (error) {
        toast.error("Error in fetching product details !");
      }
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = ev.target.files;
    if (files && files?.length > 0) {
      const imagesArray: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const currentFile = files[i];
        reader.onloadend = () => {
          imagesArray.push(reader.result as string);
        };
        reader.readAsDataURL(currentFile);
      }
      setNewImages(imagesArray);
    }
  };
  const handleImageDelete = (index: number) => {
    const newArray = productImages.filter((url, i) => i !== index);
    setProductImages(newArray);
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
            value={name}
            disabled
            required
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-5 h-10 border-black-400 border-2 bg-gray-200 text-sm text-black shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Price (in Rs.)
          </label>

          <input
            type="number"
            id="ProductPrice"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            name="Product Price"
            className="mt-1 w-full px-5 h-10 border-gray-400 border-2 bg-gray text-sm text-gray-700 shadow-sm"
          />
        </div>

        {productImages?.map((image: any, index: number) => (
          <div className="flex mx-2 w-full h-auto ">
            <img src={image} alt="product image" height={400} width={400} />
            <span
              className="w-2 text-[14px] ml-2 mt-[-5px] cursor-pointer"
              onClick={() => handleImageDelete(index)}
            >
              X
            </span>
          </div>
        ))}

        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>

          <input
            type="file"
            multiple
            onChange={(ev) => handleUpload(ev)}
            id="ProductImage"
            name="Product Image"
            className="mt-1 w-full p-1 h-10 border-gray-400 border-2 bg-gray text-sm text-gray-700 shadow-sm"
          />
        </div>
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>

          <input
            type="text"
            id="Description"
            value={description}
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

export default EditProduct;
