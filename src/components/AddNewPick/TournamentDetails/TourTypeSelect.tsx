import React, { FC, useContext } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PreferencesContext } from "../../../context/PreferencesContext";
import { BetEntity } from "../../../types";
import { getTournamentLogoSrc } from "../../../utils/getTournamentLogoSrc";

interface Props {
  setValue: UseFormSetValue<BetEntity>;
  watch: UseFormWatch<BetEntity>;
}

const TourTypeSelect: FC<Props> = ({ setValue, watch }) => {
  const { SUPPORTED_TOURNAMENTS } = useContext(PreferencesContext);

  const handleSelect = (tournament: string) =>
    setValue("tournament", tournament);

  return (
    <div className="form-field w-full md:py-3">
      <div className="flex flex-row w-auto flex-nowrap overflow-scroll p-2 pl-1">
        {SUPPORTED_TOURNAMENTS.map((tournament) => (
          <div
            key={tournament}
            onClick={() => handleSelect(tournament)}
            className={`aspect-square mr-2 min-w-[4.5rem] bg-white shadow-md rounded-md p-3 hover:bg-gray-50 cursor-pointer ${
              watch("tournament") === tournament && "outline"
            }`}
          >
            <img
              src={getTournamentLogoSrc(tournament)}
              className="aspect-square object-contain h-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { TourTypeSelect };
