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
  const { status } = bet;

  const { isBetsColored } = useContext(PreferencesContext);

  const betAdminControlProps = { bet };

  return (
    <div
      className={`relative flex flex-col w-full rounded-md shadow-lg p-3 md:p-5 ${
        isBetsColored && status === "won"
          ? "bg-gradient-to-br from-green-400 to-green-600"
          : isBetsColored && status === "lost"
          ? "bg-gradient-to-r from-red-400 to-red-600"
          : "bg-white"
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
              <Disclosure.Panel className="mt-2 md:mt-6 mx-1 md:mx-3 my-1 md:my-4">
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
