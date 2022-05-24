import { Switch } from "@headlessui/react";
import React, { Dispatch, FC, SetStateAction } from "react";

interface Props {
  isFutures: boolean;
  setIsFutures: Dispatch<SetStateAction<boolean>>;
}

const TypeDetails: FC<Props> = ({ isFutures, setIsFutures }) => (
  <div className="flex flex-row items-baseline w-full">
    <h1 className="font-Basic tracking-tight text-3xl pt-8 pb-4 text-primary dark:text-white">
      Is this a futures bet?
    </h1>

    <Switch
      checked={isFutures}
      onChange={setIsFutures}
      className={`${
        isFutures ? "bg-green-500" : "bg-gray-200"
      } relative inline-flex h-8 w-14 items-center rounded-full ml-6`}
    >
      <span
        className={`${
          isFutures ? "translate-x-7" : "translate-x-1"
        } inline-block h-6 w-6 transform rounded-full bg-white transition-all`}
      />
    </Switch>
  </div>
);

export { TypeDetails };
