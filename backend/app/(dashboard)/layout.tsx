"use client";
import React, { ReactNode } from "react";
import DashboardLayout from "./DashboardLayout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const { data: session }: any = useSession();
  if (session) {
    const {
      user: { image, email, name },
    } = session;
    return (
      <DashboardLayout email={email} image={image} name={name}>
        {children}
      </DashboardLayout>
    );
  }
  return redirect("/login");
};

export default Layout;
