import React from "react";
import Image from "next/image";

function ImagesComp() {
  return (
    <div className="flex flex-col gap-4">
      <Image
        className="block md:hidden"
        src={"/on_ramp.png"}
        alt="image"
        width={500}
        height={500}
      />
      <Image
        className="w-full"
        src={"/on_ramp2.png"}
        alt="image"
        width={500}
        height={500}
      />
      <Image
        className="w-full"
        src={"/on_ramp3.png"}
        alt="image"
        width={500}
        height={500}
      />
      <Image
        className="w-full block md:hidden"
        src={"/on_ramp4.png"}
        alt="image"
        width={500}
        height={500}
      />
    </div>
  );
}

export default ImagesComp;
