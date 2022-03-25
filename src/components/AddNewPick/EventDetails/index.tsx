import React, { FC } from "react";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import { BetEntity } from "../../../types";
import { TimePicker } from "./TimePicker";

interface Props {
  setValue: UseFormSetValue<BetEntity>;
  watch: UseFormWatch<BetEntity>;
  homeRegister: UseFormRegisterReturn;
  awayRegister: UseFormRegisterReturn;
}

const EventDetails: FC<Props> = ({
  setValue,
  watch,
  homeRegister,
  awayRegister,
}) => {
  // @ts-ignore
  const isMulti = watch("sport") === "multi";

  const validHomeField = watch("home") && watch("home")!.length > 3;
  const validAwayField = watch("away") && watch("away")!.length > 3;

  const isTennisWager = watch("sport") === "tennis";

  const timePickerProps = { setValue };

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-Basic tracking-tight text-3xl pt-6 pb-4 text-primary">
        Event Details.
      </h1>

      {/* Home & Away fields */}
      {!isMulti && (
        <div className="flex flex-row justify-between items-center">
          <div className="relative flex flex-row items-center w-full">
            <input
              spellCheck={false}
              placeholder={isTennisWager ? "Home player" : "Home team"}
              className={`relative w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left bg-white border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black ${
                !validHomeField && "animate-pulse pr-0"
              }`}
              {...homeRegister}
            />
            {validHomeField && (
              <CgCheck className="absolute text-green-500 text-3xl right-1 pointer-events-none" />
            )}
          </div>

          <p className="font-Basic tracking-tight text-3xl mx-5">vs</p>

          <div className="relative flex flex-row items-center w-full">
            <input
              spellCheck={false}
              placeholder={isTennisWager ? "Away player" : "Away team"}
              className={`w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left bg-white border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black ${
                !validAwayField && "animate-pulse pr-0"
              }`}
              {...awayRegister}
            />
            {validAwayField && (
              <CgCheck className="absolute text-green-500 text-3xl right-1 pointer-events-none" />
            )}
          </div>
        </div>
      )}

      {/* Event time */}
      <TimePicker {...timePickerProps} />
    </div>
  );
};

export { EventDetails };
