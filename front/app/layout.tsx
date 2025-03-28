"use client"; 

import "./css/style.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { useEffect } from "react";
import { checkTokenExpiration } from "@/utils/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    { path: "../public/fonts/nacelle-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/nacelle-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/nacelle-semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/nacelle-semibolditalic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <html lang="en">
     <body
  className={`${inter.variable} ${nacelle.variable} font-inter text-base text-gray-200 antialiased`}
  style={{ backgroundColor: 'rgb(211, 240, 253)' }}
>

        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
