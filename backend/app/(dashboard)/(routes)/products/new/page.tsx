"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewProduct = () => {
  const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImage] = useState<String[]>([]);
  const [inputList, setInputList] = useState([{ property: "", value: "" }]);
  const [saveProperties, setSaveProperties] = useState(false);
  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setUploadedImage([]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, price, description, uploadedImages, inputList };
    try {
      const response = await axios.post("/api/product", data);
      if (response.status === 201) {
        toast.success("Product saved successfully !");
        clearForm();
        formRef?.current?.reset();
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
  const handleAddClick = () => {
    setInputList([...inputList, { property: "", value: "" }]);
  };
  const handleRemoveClick = (index: any) => {
    setSaveProperties(false);
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
      setUploadedImage(imagesArray);
    }
  };

  return (
    <>
      <h2>Add new product </h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-8 grid grid-cols-6 gap-6"
      >
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            id="ProductName"
            name="Product Name"
            value={name}
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
          <button
            type="button"
            onClick={() => setSaveProperties(true)}
            className=" mt-2 inline-block shrink-0 px-2 rounded-md border border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 cursor-pointer"
          >
            Save All
          </button>
        </div>
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
        {saveProperties && (
          <div className="col-span-6 overflow-x-auto rounded-lg border border-gray-200 mt-10">
            <table className="min-w-full max-h-72 overflow-auto divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-center">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Property Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {inputList?.length > 0 ? (
                  inputList?.map((product: any, index: number) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {product.property.toUpperCase()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {product.value.toUpperCase()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center">
                      No properties added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className="col-span-2">
          <button
            type="submit"
            className=" mt-10 w-full inline-block shrink-0 rounded-md border px-2 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 cursor-pointer"
          >
            Save Details
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProduct;
