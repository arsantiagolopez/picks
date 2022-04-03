import React, { FC } from "react";
import { SelectBetColors } from "./SelectBetColors";
import { SelectColorMode } from "./SelectColorMode";
import { SelectPotdTime } from "./SelectPotdTime";

interface Props {}

const Settings: FC<Props> = () => {
  return (
    <div className="py-16 md:py-20">
      <h1 className="font-Basic text-primary dark:text-white text-4xl md:text-5xl tracking-tighter">
        Settings
      </h1>
      <SelectPotdTime />
      <SelectBetColors />
      <SelectColorMode />
    </div>
  );
};

export { Settings };
