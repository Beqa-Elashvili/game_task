import Image from "next/image";
import React from "react";

function DashboardImages() {
  return (
    <div className="grid gap-2 w-full">
      <div className="grid grid-cols-2 gap-2 w-full">
        <Image
          className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
          src="/image1.png"
          alt="image"
          width={500}
          height={500}
        />
        <Image
          className="w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
          src="/image2.png"
          alt="image"
          width={500}
          height={500}
        />
      </div>
      <div className="grid grid-cols-3  items-center gap-2 w-full">
        <Image
          className="w-full h-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
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
              className="w-w-full hover:scale-95 hover:cursor-pointer transition-all ease-in-out duration-300"
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
    </div>
  );
}

export default DashboardImages;
