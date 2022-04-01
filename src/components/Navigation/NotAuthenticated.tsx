import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { Logo } from "../Logo";
import { MobileMenu } from "./MobileMenu";

interface Props {}

const NotAuthenticated: FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME;

  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mobileMenuProps = {
    isMenuOpen,
    setIsMenuOpen,
    isAdmin: false,
  };

  return (
    <div className="fixed z-50 bg-white flex items-center justify-center h-16 md:h-20 w-screen transition-all duration-200 ease-in-out shadow-lg shadow-gray-100 px-6 md:px-[15%]">
      {/* Left */}
      <div className="z-50 flex flex-row h-full items-center">
        <>
          <div className="relative aspect-square h-[40%] mr-3">
            <Logo />
          </div>
          <Link href="/">
            <h1 className="font-Basic text-primary cursor-pointer">
              {BRAND_NAME}
            </h1>
          </Link>
        </>

        <div className="hidden md:flex md:mx-6">
          <Link href="/">
            <button
              className={`font-Basic mx-4 ${
                router.pathname === "/" ? "text-primary" : "text-tertiary"
              }`}
            >
              Picks
            </button>
          </Link>
          <Link href="/record">
            <button
              className={`font-Basic  mx-4 ${
                router.pathname === "/record" ? "text-primary" : "text-tertiary"
              }`}
            >
              Record
            </button>
          </Link>
          <Link href="/stats">
            <button
              className={`font-Basic  mx-4 ${
                router.pathname === "/stats" ? "text-primary" : "text-tertiary"
              }`}
            >
              Stats
            </button>
          </Link>
          <Link href="/donate">
            <button
              className={`font-Basic  mx-4 ${
                router.pathname === "/donate" ? "text-primary" : "text-tertiary"
              }`}
            >
              Donate
            </button>
          </Link>
        </div>
      </div>

      {/* Right Mobile */}
      <div className="flex flex-row ml-auto">
        <Link href="/donate">
          <button className="hidden md:flex font-Basic text-sm text-white bg-primary px-6 py-1.5 ml-2 rounded-full hover:bg-secondary">
            Buy me a beer 🍺
          </button>
        </Link>

        {/* Mobile only menu */}
        <button onClick={toggleMenu} className="md:hidden text-3xl">
          <MobileMenu {...mobileMenuProps} />
        </button>
      </div>
    </div>
  );
};

export { NotAuthenticated };
