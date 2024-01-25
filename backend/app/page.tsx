"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "./login/page";
import DashboardLayout from "./Dashboard/page";

export default function Component() {
  const { data: session }: any = useSession();
  if (session) {
    const {user:{image, email, name}} = session;
    return (
      <>
       <DashboardLayout email={email} image={image} name={name}/>
      </>
    );
  }
  return (
    <>
      <Login />
    </>
  );
}
