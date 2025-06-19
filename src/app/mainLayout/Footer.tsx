import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div>
      <Image
        className="block md:hidden w-full"
        src={"/footer.png"}
        alt="image"
        width={500}
        height={500}
      />
      <Image
        className="hidden md:block w-full"
        src={"/casino_footer_content.png"}
        alt="image"
        width={500}
        height={500}
      />
    </div>
  );
}

export default Footer;
