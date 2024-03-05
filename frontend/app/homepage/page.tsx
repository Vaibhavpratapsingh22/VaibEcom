"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { getAllProducts, getOneProduct } from "../api/products";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const HomePage = () => {
  const [bannerProduct, setBannerProduct] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const fetchBannerProduct = async () => {
    const response = await getOneProduct("65c36ab0b8533fae01e64fde");
    if (response) {
      setBannerProduct(response);
    }
  };
  const fetchLatestProducts = async () => {
    const response = await getAllProducts();
    if (response) {
      setLatestProducts(response);
    }
  };
  useEffect(() => {
    fetchBannerProduct();
    fetchLatestProducts();
  }, []);
  return (
    <>
      <Header />
      <Banner data={bannerProduct} />
      <div className="m-4">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Latest Products
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {latestProducts.map((product: any) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
