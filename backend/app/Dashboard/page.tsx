"use client";
import Image from "next/image";
import React from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
type DashboardLayoutProps = {
  email: string;
  image: string;
  name: string;
};
const DashboardLayout = ({ email, name, image }: DashboardLayoutProps) => {
  return (
    <>
      <div className="flex flex-row w-full justify-between">
        <div className="flex w-[20%] h-screen">
          <SideBar name={name} />
        </div>
      <NavBar image={image}/>
      </div>
    </>
  );
};

export default DashboardLayout;
