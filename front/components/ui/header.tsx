"use client";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-[linear-gradient(to_right,#1e3c5a,#2a5d78)] px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
  <li>
  <Link
  href="/signin"
  className="btn-sm relative bg-gray-800 py-[5px] text-white 
             border border-transparent before:absolute before:inset-0 
             before:rounded-[inherit] before:border-transparent 
             before:bg-gradient-to-r before:from-gray-800 before:via-gray-700 before:to-gray-800 
             before:z-[-1] hover:bg-gray-700 transition-all duration-300"
>
      Se connecter
    </Link>
  </li>
  <li>
    <Link
      href="/signup"
      className="btn-sm bg-teal-500 py-[5px] text-white shadow-md 
                 hover:bg-teal-400 transition-all duration-300"
    >
      S'inscrire
    </Link>
  </li>
</ul>        </div>
      </div>
    </header>
  );
}
