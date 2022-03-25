import { Disclosure, Transition } from "@headlessui/react";
import React, { FC } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { BetEntity } from "../../types";
import { Bets } from "../Bets";

interface Props {
  bets: BetEntity[];
  isAdmin: boolean;
}

const PicksHistory: FC<Props> = ({ bets, isAdmin }) => {
  const betsProps = { bets, isAdmin, isPast: true };

  return (
    <div className="relative flex flex-col w-full">
      <Disclosure defaultOpen={false}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex flex-row justify-center items-center md:pr-6">
              <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter">
                Past Picks
              </h1>

              <IoChevronDownSharp
                className={`text-2xl md:text-5xl transition-transform duration-300 ml-4 -mr-4 md:ml-8 md:-mr-16 ${
                  open ? "transform -rotate-180" : ""
                }`}
              />
            </Disclosure.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="mt-10 md:my-16">
                <Bets {...betsProps} />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export { PicksHistory };
