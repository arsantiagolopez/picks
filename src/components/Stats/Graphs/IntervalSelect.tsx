import { Listbox, Transition } from "@headlessui/react";
import React, { FC } from "react";
import { CgCheck } from "react-icons/cg";
import { IoChevronDownSharp } from "react-icons/io5";

interface Props {
  options: string[];
  selected: string;
  handleSelect: (option: string) => void;
  profit: number;
}

const IntervalSelect: FC<Props> = ({
  options,
  selected,
  handleSelect,
  profit,
}) => (
  <Listbox value={selected} onChange={handleSelect}>
    {({ open }) => (
      <div className="z-40 relative flex items-center not-italic font-Basic w-44">
        <Listbox.Button className="flex flex-col items-start capitalize font-Basic text-lg text-primary">
          <p className="text-tertiary">Profit to date</p>
          <h1 className="font-Basic text-7xl font-bold tracking-tight">
            {profit > 0 ? `+${profit}u` : `${profit}u`}
          </h1>
          <div className="flex flex-row items-center py-3">
            {selected.toLowerCase()}
            <IoChevronDownSharp
              className={`ml-4 text-sm transition-transform duration-300 ${
                open && "transform -rotate-180"
              }`}
            />
          </div>
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute top-24 md:top-36 left-0 overflow-auto text-base bg-white rounded-t-none rounded-b-md shadow-xl focus:outline-none sm:text-sm w-full">
            {options.map((option, index) => (
              <Listbox.Option key={index} value={option} className="">
                {({ selected }) => (
                  <p className="flex flex-row justify-between items-center active:bg-gray-200 hover:bg-gray-100 text-sm capitalize cursor-pointer py-3 px-4">
                    {option.toLowerCase()}
                    {selected && <CgCheck className="text-lg" />}
                  </p>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    )}
  </Listbox>
);

export { IntervalSelect };
