import { Dialog, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";
import { PreferencesContext } from "../../context/PreferencesContext";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
}

const MobileMenu: FC<Props> = ({ isMenuOpen, setIsMenuOpen, isAdmin }) => {
  const { colorMode } = useContext(PreferencesContext);

  const handleSignOut = () => signOut();

  return (
    <>
      {isMenuOpen ? (
        <IoCloseSharp className="z-50 text-primary dark:text-white" />
      ) : (
        <IoMenuSharp className="z-50 text-primary dark:text-white" />
      )}

      <Transition appear show={isMenuOpen} as="div">
        <Dialog
          as="div"
          className="z-40 fixed inset-0 overflow-y-auto backdrop-blur-3xl shadow-2xl"
          onClose={() => setIsMenuOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-5" />
            </Transition.Child>
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`z-50 flex flex-col items-start w-full h-screen p-4 pt-28 pb-20 text-left transition-all transform font-Basic tracking-tight text-3xl leading-loose ${
                  colorMode === "dark" ? "text-white" : "text-primary"
                }`}
              >
                <Link href="/">
                  <button>Picks</button>
                </Link>
                <Link href="/record">
                  <button>Record</button>
                </Link>
                <Link href="/stats">
                  <button>Stats</button>
                </Link>
                <Link href="/donate">
                  <button>Donate</button>
                </Link>
                {isAdmin && (
                  <Link href="/admin">
                    <button>Admin</button>
                  </Link>
                )}

                {isAdmin && (
                  <button
                    onClick={handleSignOut}
                    className="text-red-700 tracking-tight mt-auto mb-14"
                  >
                    Sign out
                  </button>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export { MobileMenu };
