import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import useDisclosure from "@/hooks/useDisclosure";
import Social from "./footer/social";

type navItemType = { label: string; href: string }[];

function Header({ navItems }: { navItems: navItemType }) {
  const { Show, showMenu } = useDisclosure();
  return (
    <div className="">
      <div className="bg-primary text-end lg:relative fixed top-0 w-full z-10">
        <div className="flex justify-between items-center p-3 lg:hidden">
          <Link
            href={"/"}
            className=" aspect-square w-12 inline-block overflow-hidden lg:hidden"
          >
            <Image
              src={"/images/logo-sm.png"}
              width={120}
              height={120}
              alt="company logo"
              className="w-full h-full object-cover"
            />
          </Link>
          <button className="" onClick={showMenu}>
            <GiHamburgerMenu className="text-3xl" />
          </button>
        </div>

        <div className="container font-openSans py-3 text-[13px] lg:block hidden">
          <Link
            className=" tracking-[2px]"
            href={"tel:2142657272"}
            onClick={showMenu}
          >
            1.817.925.2478
          </Link>
          <span className="px-5">.</span>
          <Link
            className="tracking-[2px] uppercase"
            href={"email:info@ambiancedesigns.biz"}
          >
            info@ambiancedesigns.biz
          </Link>
        </div>
        <div className={`pb-5 ${
                Show ? "visible" : "hidden"
              } flex flex-col items-center `} >
          {navItems.map((navItem, i) => (
            <Link
              key={i}
              href={navItem.href}
              onClick={showMenu}
              className="font-openSans tracking-[2px] p-2 text-center"
            >
              {navItem.label}
            </Link>
          ))}
          <Social />
        </div>
      </div>
      <Link
        href={"/"}
        className="flex items-center justify-center"
      >
        <Image
          src={"/images/logo.jpeg"}
          width={220}
          height={100}
          alt="company logo"
        />
      </Link>
    </div>
  );
}

export default Header;
