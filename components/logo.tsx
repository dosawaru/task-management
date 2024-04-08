import Image from "next/image";
import logo from "@/public/images/logos/logo.svg";

export const Logo = () => {
  return (
    <a href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Image src={logo} alt="Logo" height={30} width={30} />
        <p className="text-lg text-neutral-700 pb-1 hidden md:flex">Strive</p>
      </div>
    </a>
  );
};
