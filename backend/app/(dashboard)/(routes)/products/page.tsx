import Link from "next/link";
import React from "react";

const Products = () => {
  return (
    <div>
      <Link href="/products/new">
        <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </Link>
    </div>
  );
};

export default Products;
