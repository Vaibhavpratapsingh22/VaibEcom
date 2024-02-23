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
  const [inputList, setInputList] = useState([{ property: "", value: "" }]);
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
      properties: inputList,
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
          setInputList(response.data.properties);
        }
      } catch (error) {
        toast.error("Error in fetching product details !");
      }
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

   const handleAddClick = () => {
     setInputList([...inputList, { property: "", value: "" }]);
   };
   const handleRemoveClick = (index: any) => {
     const list = [...inputList];
     list.splice(index, 1);
     setInputList(list);
   };

   const handleInputChange = (
     e: React.ChangeEvent<HTMLInputElement>,
     index: number
   ) => {
     const { name, value } = e.target;
     const list = [...inputList];
     list[index] = { ...list[index], [name]: value };
     setInputList(list);
   };

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

        <div className="col-span-6 ">
          Properties
          <div className="mt-2 border-pink-800 border-2 p-2 grid grid-cols-12 gap-6">
            {inputList.length ? (
              inputList.map((x, i) => {
                return (
                  <>
                    <div className="col-span-4 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Property Name
                      </label>
                      <input
                        type="text"
                        id="Color"
                        required
                        name="property"
                        value={x.property}
                        onChange={(e) => handleInputChange(e, i)}
                        className="mt-1 w-full px-5 h-10 border-gray-400 border-2 bg-gray text-sm text-gray-700 shadow-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Value
                      </label>
                      <input
                        type="text"
                        id="Size"
                        required
                        name="value"
                        value={x.value}
                        onChange={(e) => handleInputChange(e, i)}
                        className="mt-1 w-full px-5 h-10 border-gray-400 border-2 bg-gray text-sm text-gray-700 shadow-sm"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-4">
                      <button
                        type="button"
                        onClick={() => handleRemoveClick(i)}
                        className=" mt-5 inline-block shrink-0 px-2 rounded-md border border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="col-span-12 text-center">No properties added</div>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <button
            type="button"
            onClick={() => handleAddClick()}
            className=" mt-2 mx-2 inline-block shrink-0 px-2 rounded-md border border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 cursor-pointer"
          >
            Add New Property
          </button>
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
            accept=".png, .jpg, .jpeg"
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
          className=" mt-10 inline-block shrink-0 rounded-md border mb-4 bg-[#B91C1C] py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 cursor-pointer"
        >
          Save Details
        </button>
      </form>
    </>
  );
};

export default EditProduct;
