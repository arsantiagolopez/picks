import { Disclosure, Transition } from "@headlessui/react";
import React, { FC, useContext } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity } from "../../types";
import { BetAdminControl } from "../BetAdminControl";

interface Props {
  Button: JSX.Element;
  Panel: JSX.Element;
  isDefaultOpen?: boolean;
  bet: BetEntity;
  isAdmin: boolean;
}

const Dropdown: FC<Props> = ({
  Button,
  Panel,
  isDefaultOpen,
  bet,
  isAdmin,
}) => {
  const { status, isFutures } = bet;

  const { isBetsColored } = useContext(PreferencesContext);

  const betAdminControlProps = { bet };

  return (
    <div
      className={`relative flex flex-col justify-center w-full rounded-md shadow-lg dark:shadow-zinc-900 dark:shadow-xl p-3 md:p-5 min-h-[6.5rem] md:min-h-[4.5rem] ${
        isBetsColored && status === "won"
          ? "bg-gradient-to-br from-green-400 to-green-600"
          : isBetsColored && status === "lost"
          ? "bg-gradient-to-r from-red-400 to-red-600"
          : isBetsColored && status === "void"
          ? "bg-gradient-to-r from-blue-400 to-blue-600"
          : !isFutures
          ? "bg-white dark:bg-tertiary"
          : // Conditional color based on active events
            // "wimbledon-card"
            "bg-primary dark:bg-neutral-900"
      }`}
    >
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex flex-row justify-between items-center md:pr-5">
              {Button}
              {/* Admin control */}
              {isAdmin && (
                <BetAdminControl isPanelOpen={open} {...betAdminControlProps} />
              )}
            </Disclosure.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="md:mt-6 mx-1 md:mx-3 my-1 md:my-4">
                {Panel}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export { Dropdown };
