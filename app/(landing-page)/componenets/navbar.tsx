import React from "react";
import { Logo } from "@/components/logo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border shodow-sm bg-white flex item-center">
      <div className=" mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center justify-between w-auto space-x-4">
          <button className="rounded-full border border-slate-500 p-2 px-5">
            <Link href="/login">Login</Link>
          </button>
          <button className="rounded-full bg-slate-900 text-white p-2 px-5">
            <Link href="/sign-up">Sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
