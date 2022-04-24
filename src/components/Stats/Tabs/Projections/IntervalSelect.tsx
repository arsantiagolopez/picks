import { Listbox, Transition } from "@headlessui/react";
import React, { FC } from "react";
import { CgCheck } from "react-icons/cg";

interface Props {
  options: string[];
  selected: string;
  handleSelect: (option: string) => void;
}

const IntervalSelect: FC<Props> = ({ options, selected, handleSelect }) => (
  <Listbox value={selected} onChange={handleSelect}>
    {() => (
      <div className="z-40 relative flex items-center font-Basic">
        <Listbox.Button className="w-20 p-2 md:p-3 mx-3 md:mx-4 text-center text-primary bg-white rounded-lg focus:outline-black">
          {selected.toLowerCase()}
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute top-8 md:top-12 left-4 overflow-auto text-base bg-white dark:bg-tertiary rounded-t-none rounded-b-md shadow-xl dark:shadow-2xl focus:outline-none sm:text-sm w-[calc(100%-2rem)]">
            {options.map((option, index) => (
              <Listbox.Option key={index} value={option} className="">
                {({ selected }) => (
                  <p className="flex flex-row justify-between items-center active:bg-gray-200 hover:bg-gray-100 dark:hover:bg-primary text-sm capitalize cursor-pointer py-2 px-3">
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
