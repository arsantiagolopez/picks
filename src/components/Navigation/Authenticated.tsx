import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { Logo } from "../Logo";
import { SignOutAlert } from "../SignOutAlert";
import { ToggleColorMode } from "../ToggleColorMode";
import { MobileMenu } from "./MobileMenu";

interface Props {
  session: Session | null;
}

const Authenticated: FC<Props> = ({ session }) => {
  const [isSignOutOpen, setIsSignOutOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user } = session || {};

  const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME;

  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = () => setIsSignOutOpen(true);

  const mobileMenuProps = {
    isMenuOpen,
    setIsMenuOpen,
    isAdmin: !!user?.isAdmin,
  };
  const signOutAlertProps = {
    isOpen: isSignOutOpen,
    setIsOpen: setIsSignOutOpen,
    isCentered: true,
  };

  return (
    <div
      className={`fixed z-50 flex items-center justify-between h-16 md:h-20 w-screen transition-all duration-200 ease-in-out px-6 md:px-[15%] ${
        isMenuOpen
          ? "bg-none"
          : "bg-white shadow-lg shadow-gray-100 dark:shadow-neutral-900 dark:bg-primary"
      }`}
    >
      {/* Left */}
      <div className="z-50 flex flex-row h-full items-center">
        <>
          <div className="relative aspect-square h-[40%] w-auto mr-3">
            <Logo />
          </div>
          <Link href="/">
            <h1 className="font-Basic text-xl text-primary dark:text-white tracking-tighter cursor-pointer">
              {BRAND_NAME}
            </h1>
          </Link>
        </>

        <div className="hidden md:flex md:mx-6">
          <Link href="/">
            <button
              className={`font-Basic mx-4 ${
                router.pathname === "/"
                  ? "text-primary dark:text-white"
                  : "text-tertiary dark:text-gray-500"
              }`}
            >
              Picks
            </button>
          </Link>
          <Link href="/record">
            <button
              className={`font-Basic  mx-4 ${
                router.pathname === "/record"
                  ? "text-primary dark:text-white"
                  : "text-tertiary dark:text-gray-500"
              }`}
            >
              Record
            </button>
          </Link>
          <Link href="/stats">
            <button
              className={`font-Basic  mx-4 ${
                router.pathname === "/stats"
                  ? "text-primary dark:text-white"
                  : "text-tertiary dark:text-gray-500"
              }`}
            >
              Stats
            </button>
          </Link>
          <Link href="/donate">
            <button
              className={`font-Basic  mx-4 ${
                router.pathname === "/donate"
                  ? "text-primary dark:text-white"
                  : "text-tertiary dark:text-gray-500"
              }`}
            >
              Donate
            </button>
          </Link>
          <Link href="/admin">
            <button
              className={`font-Basic  mx-4 ${
                router.pathname === "/admin"
                  ? "text-primary dark:text-white"
                  : "text-tertiary dark:text-gray-500"
              }`}
            >
              Admin
            </button>
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-row ml-auto">
        {/* Color mode */}
        <ToggleColorMode />

        {/* Mobile only menu */}
        <button onClick={toggleMenu} className="md:hidden text-3xl ml-2">
          <MobileMenu {...mobileMenuProps} />
        </button>

        <div className="hidden md:flex flex-row h-full items-center">
          {/* Greeting */}
          <p className="font-Basic text-primary dark:text-white tracking-tight self-center pr-2 md:pr-4">
            Hi, {user?.name}!
          </p>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="button font-Basic text-sm px-6 py-1.5 ml-2 rounded-full"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Sign Out Modal */}
      <SignOutAlert {...signOutAlertProps} />
    </div>
  );
};

export { Authenticated };
