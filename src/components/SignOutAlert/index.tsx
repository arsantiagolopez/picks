import { signOut } from "next-auth/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Dialog } from "../Dialog";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SignOutAlert: FC<Props> = ({ isOpen, setIsOpen }) => {
  // Log user out by destroying their session
  const handleSignOut = async () => signOut();
  const cancelSignOut = () => setIsOpen(false);

  const dialogProps = {
    isOpen,
    setIsOpen,
    title: "Sure you want to sign out?",
    message: "Come back soon.",
  };

  return (
    <div className="">
      <Dialog
        {...dialogProps}
        ActionControl={
          <div className="flex flex-row space-x-2 w-full h-12 mt-6 dark:bg-primary">
            <button
              onClick={cancelSignOut}
              className="rounded-lg bg-primary dark:bg-secondary text-white w-full hover:bg-black"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              className="rounded-lg bg-red-700 text-white w-full hover:bg-red-900 hover:animate-pulse"
            >
              Log out
            </button>
          </div>
        }
      />
    </div>
  );
};

export { SignOutAlert };
