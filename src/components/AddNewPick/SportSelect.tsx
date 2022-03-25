import React, { FC, useContext } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity } from "../../types";
import { getSportEmoji } from "../../utils/getSportEmoji";

interface Props {
  setValue: UseFormSetValue<BetEntity>;
  watch: UseFormWatch<BetEntity>;
}

const SportSelect: FC<Props> = ({ setValue, watch }) => {
  const { SUPPORTED_SPORTS } = useContext(PreferencesContext);

  const handleSelect = (sport: string) => {
    setValue("sport", sport);
  };

  return (
    <div className="flex flex-row w-auto flex-nowrap overflow-scroll p-2 pl-1">
      {SUPPORTED_SPORTS.map((sport) => (
        <div
          key={sport}
          onClick={() => handleSelect(sport)}
          className={`aspect-square mr-2 text-5xl bg-white shadow-md rounded-md p-3 hover:bg-gray-50 cursor-pointer ${
            watch("sport") === sport && "outline"
          }`}
        >
          {getSportEmoji(sport)}
        </div>
      ))}
    </div>
  );
};

export { SportSelect };
