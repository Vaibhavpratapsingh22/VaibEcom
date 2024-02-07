"use client";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
type DashboardLayoutProps = {
  email: string;
  image: string;
  name: string;
  children: ReactNode;
};
const DashboardLayout = ({
  email,
  name,
  image,
  children,
}: DashboardLayoutProps) => {
  const [show, setShow] = useState(false);  

  return (
    <>
      <div className="flex justify-between items-center">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          onClick={() => setShow(!show)}
          className={`inline-flex items-center px-2 ms-3 rounded text-sm text-black sm:hidden hover:text-red-500  ${
            show ? "!ml-[250px]" : "ml-0"
          }`}
        >
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{" "}
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          )}
        </button>
        <div className=" p-2">
          <NavBar image={image} />
        </div>
      </div>
      <aside
        id="default-sidebar"
        className={
          show
            ? "fixed top-0 left-0 z-40 w-60 h-screen transition-transform sm:translate-x-0 transform-none"
            : "fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0"
        }
        aria-label="Sidebar"
      >
        <SideBar name={name} />
      </aside>
      <div className="p-0 sm:ml-64 bg-[#fff] h-full">
        <main className="mt-5 px-4">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
