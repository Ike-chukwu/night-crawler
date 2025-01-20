"use client";
import { HamburgerIcon } from "@/components/icons";
import Header from "@/components/Layout/Header";
import { MobileNav, Sidebar } from "@/components/Layout/Navigation";
import Image from "next/image";
import React, { Suspense, useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navStatus, setNavStatus] = useState(false);

  return (
    <div className="bg-white md:bg-[#7940EC] px-4 md:px-6 py-2 flex min-h-[100vh]">
      <div className="hidden w-0 lg:w-[300px] bg-[#7940ec] fixed lg:block inset-0 pt-4 pb-2 pl-2 pr-2 ">
        <Image
          alt="logo"
          src="/logo.png"
          width={400}
          height={200}
          className="w-[42px] h-[38px]"
        />
        <Sidebar setNavStatus={setNavStatus} />
      </div>
      <MobileNav setNavStatus={setNavStatus} navStatus={navStatus} />
      <div className="w-full lg:ml-[300px] bg-white md:px-6 pt-4 pb-2 rounded-xl">
        <div className="mx-auto">
          <div className="w-full flex-col md:flex-row gap-3 md:items-center flex justify-between">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between items-center lg:items-start w-full">
                <span className="text-[16px] font-bold capitalize">
                  hey, admin
                </span>
                <HamburgerIcon
                  width="20"
                  height="20"
                  className="block md:hidden cursor-pointer"
                  onClick={() => setNavStatus(true)}
                />
                {/* <div className="w-3 h-3 bg-black block md:hidden"></div> */}
              </div>
              <span className="text-[13px] text-[#ababab] font-bold capitalize">
                Tuesday, 24 October, 2024
              </span>
            </div>
            <Header />
            <HamburgerIcon
              width="40"
              height="20"
              className=" ml-5 hidden md:block lg:hidden cursor-pointer"
              onClick={() => setNavStatus(true)}
            />
            {/* <div
              className="w-3 h-3 bg-black hidden md:block lg:hidden"
              onClick={() => setNavStatus(true)}
            ></div> */}
          </div>
          <div className="pt-10 bg-white">
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
