"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "./login/page";

export default function Component() {
  const { data: session }: any = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <Login />{" "}
    </>
  );
}
