import { Listbox, Transition } from "@headlessui/react";
import React, { FC } from "react";
import { CgCheck } from "react-icons/cg";
import { IoChevronDownSharp } from "react-icons/io5";

interface Props {
  options: string[];
  selected: string;
  handleSelect: (option: string) => void;
}

const SortBySelect: FC<Props> = ({ options, selected, handleSelect }) => (
  <Listbox value={selected} onChange={handleSelect}>
    {({ open }) => (
      <div className="z-40 relative h-full flex items-center not-italic font-Basic">
        <Listbox.Button className="flex justify-between items-center pl-6 capitalize font-Basic text-lg text-primary dark:text-white">
          {selected.toLowerCase()}
          <IoChevronDownSharp
            className={`ml-4 text-sm transition-transform duration-300 ${
              open ? "transform -rotate-180" : ""
            }`}
          />
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute top-8 md:top-8 left-4 overflow-auto text-base bg-white dark:bg-secondary rounded-t-none rounded-b-md shadow-xl dark:shadow-xl dark:shadow-primary focus:outline-none sm:text-sm w-[105%]">
            {options.map((option, index) => (
              <Listbox.Option key={index} value={option} className="">
                {({ selected }) => (
                  <p className="flex flex-row justify-between items-center active:bg-gray-200 hover:bg-gray-100 dark:hover:bg-primary dark:active:text-secondary text-sm capitalize cursor-pointer py-3 px-5">
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

export { SortBySelect };
