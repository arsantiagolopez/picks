import React, { FC, useEffect } from "react";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import { BetEntity } from "../../../types";
import { TourTypeSelect } from "./TourTypeSelect";

interface Props {
  setValue: UseFormSetValue<BetEntity>;
  watch: UseFormWatch<BetEntity>;
  tournamentNameRegister: UseFormRegisterReturn;
  defaultTournament?: string;
}

const TournamentDetails: FC<Props> = ({
  setValue,
  watch,
  tournamentNameRegister,
  defaultTournament,
}) => {
  //@ts-ignore
  const isTennisWager = watch("sport") === "tennis";

  const validNameField =
    watch("tournamentName") && watch("tournamentName")!.length > 2;

  // Set default values for updates
  useEffect(() => {
    if (defaultTournament) {
      setValue("tournament", defaultTournament);
    }

    if (watch("sport") !== "tennis") {
      setValue("tournament", undefined);
      setValue("tournamentName", undefined);
    }
  }, [watch("sport"), defaultTournament]);

  // Tennis related tournaments
  if (isTennisWager) {
    const tourTypeSelectProps = { setValue, watch };

    return (
      <div className="flex flex-col w-full">
        <h1 className="font-Basic tracking-tight text-3xl pt-8 pb-4 text-primary">
          Tournament Details.
        </h1>

        {/* Tour type */}
        <TourTypeSelect {...tourTypeSelectProps} />

        {/* Tournament Name */}
        <div className="form-field w-full md:py-3">
          <div className="relative flex flex-row items-center">
            <input
              spellCheck={false}
              autoComplete="off"
              placeholder="Tournament name"
              className={`relative w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black ${
                !validNameField && "animate-pulse pr-0"
              }`}
              {...tournamentNameRegister}
            />
            {validNameField && (
              <CgCheck className="absolute text-green-500 text-3xl right-1 pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // All other sports
  return <div className="flex flex-col w-full"></div>;
};

export { TournamentDetails };
