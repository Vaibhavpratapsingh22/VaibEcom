"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
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
  return (
    <>
      <aside
        id="default-sidebar"
        className={
          true
            ? "fixed top-0 left-0 z-40 w-60 h-screen transition-transform sm:translate-x-0 transform-none"
            : "fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0"
        }
        aria-label="Sidebar"
      >
        <SideBar name={name} />
      </aside>
      <div className="p-0 sm:ml-64 bg-[#fff] h-full">
        <div className=" p-2">
          <NavBar image={image} />
        </div>
        <main className="mt-5 p-2">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
