import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Banner = ({ data }: any) => {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(data?.id);
  };
  return (
    <>
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-[70px] font-bold text-gray-900 md:text-[70px]">
              {data?.name}
            </h2>

            <p className=" text-gray-500 text-left md:mt-4 md:block">
              {data?.description}
            </p>

            <div className="flex justify-center mt-4">
              <div className="mt-4 mr-2 md:mt-8">
                <a
                  href="#"
                  className="inline-block rounded bg-emerald-600 px-12 py-3 sm:p-2 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  View Product
                </a>
              </div>
              <div className="mt-4 md:mt-8">
                <a
                 onClick={handleAddToCart}
                  className="inline-block cursor-pointer rounded bg-emerald-600 px-12 py-3 sm:p-2 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section>
    </>
  );
};

export default Banner;
