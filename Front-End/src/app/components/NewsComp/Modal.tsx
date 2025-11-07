"use client";

import { useGlobalProvider } from "@/app/provider/globalProvider";
import Image from "next/image";
import React, { useEffect } from "react";

function Modal({ img }: { img: string }) {
  const { openNewsModal, setOpenNewsModal } = useGlobalProvider();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setOpenNewsModal(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [openNewsModal]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center rounded-xl  justify-center bg-transparent/30   backdrop-blur-sm"
    >
      <div className=" w-full flex items-center justify-center max-w-md aspect-[9/16] rounded-2xl overflow-hidden ">
        {img ? (
          <Image
            src={img}
            alt="News modal"
            width={500}
            height={500}
            className="object-cover rounded-xl h-1/2 w-[90%] md:w-[50%] lg:w-[80%]"
          />
        ) : (
          <p className="text-white text-center mt-8">No image selected</p>
        )}
      </div>
    </div>
  );
}

export default Modal;
