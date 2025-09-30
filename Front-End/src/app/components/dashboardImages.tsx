"use client";

import Image from "next/image";
import React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const FilterBar = dynamic(() => import("./FilterBar"), {
  ssr: false,
});

function DashboardImages() {
  return (
    <div>
      <div className="grid gap-2 w-full">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2 w-full">
          <Image
            className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image1.png"
            alt="image"
            width={500}
            height={500}
          />
          <Image
            className="w-full hidden md:block hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image2.png"
            alt="image"
            width={500}
            height={500}
          />
        </div>
        <div className="md:hidden grid grid-cols-2 gap-2 items-center w-full">
          <Image
            className="w-full h-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image2.png"
            alt="image"
            width={500}
            height={500}
          />
          <Image
            className="w-full h-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image3.png"
            alt="image"
            width={500}
            height={500}
          />
        </div>
        <div className=" hidden md:grid grid-cols-3  items-center gap-2 w-full">
          <Image
            className="w-full  hidden md:block h-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image3.png"
            alt="image"
            width={500}
            height={500}
          />
          <Image
            className="w-full h-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image4.png"
            alt="image"
            width={500}
            height={500}
          />
          <div className="grid grid-rows-2 gap-2 w-full">
            <div className="grid grid-cols-2 gap-2">
              <Image
                className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
                src="/image5.png"
                alt="image"
                width={500}
                height={500}
              />
              <Image
                className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
                src="/image6.png"
                alt="image"
                width={500}
                height={500}
              />
            </div>
            <div className="grid grid-cols-2  gap-2">
              <Image
                className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
                src="/image7.png"
                alt="image"
                width={500}
                height={500}
              />
              <Image
                className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
                src="/image8.png"
                alt="image"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        <div className="grid md:hidden grid-cols-4 gap-2">
          <Image
            className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image5.png"
            alt="image"
            width={500}
            height={500}
          />
          <Image
            className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image6.png"
            alt="image"
            width={500}
            height={500}
          />
          <Image
            className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image7.png"
            alt="image"
            width={500}
            height={500}
          />
          <Image
            className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
            src="/image8.png"
            alt="image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
    </div>
  );
}

export default DashboardImages;
