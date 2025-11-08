"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalProvider } from "@/app/provider/globalProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

function Modal({ img }: { img: string }) {
  const { openNewsModal, setOpenNewsModal } = useGlobalProvider();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (openNewsModal) {
      setAnimate(false);
      const progressTimeout = setTimeout(() => setAnimate(true), 10);
      return () => {
        clearTimeout(progressTimeout);
      };
    } else {
      setAnimate(false);
    }
  }, [openNewsModal, setAnimate]);

  useEffect(() => {
    if (openNewsModal) {
      const timeOut = setTimeout(() => {
        setOpenNewsModal(false);
      }, 2000);
      return () => {
        clearTimeout(timeOut);
      };
    }
    document.body.style.overflow = openNewsModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openNewsModal]);

  return (
    <Dialog open={openNewsModal} onOpenChange={setOpenNewsModal}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "w-96 h-2/3  border-none outline-none bg-transparent",
          animate ? "-translate-y-60" : "translate-y-40"
        )}
      >
        <DialogTitle title="hello" />
        <div className="w-full h-[1.5px] rounded-full z-20  -translate-y-38 bg-white/30">
          <div
            className={cn(
              "h-full bg-white transition-all duration-[2000ms] ease-linear",
              animate ? "w-full" : "w-0"
            )}
          />
        </div>
        <DialogClose asChild className="outline-none">
          <button className="absolute hover:cursor-pointer top-8 right-2 z-50 text-white bg-gray-500 rounded-full  h-10 w-10 flex items-center justify-center   text-xl font-bold">
            ✕
          </button>
        </DialogClose>
        <div className="w-full h-full">
          <Image
            src={img}
            alt="News modal"
            fill
            sizes=""
            className="object-cover shadow-inner rounded-xl border-none "
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
