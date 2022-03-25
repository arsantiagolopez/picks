import React, { FC } from "react";
import {
  UseFormRegisterReturn,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import { BetEntity } from "../../../types";
import { WagerOdds } from "./WagerOdds";

interface Props {
  setValue: UseFormSetValue<BetEntity>;
  watch: UseFormWatch<BetEntity>;
  resetField: UseFormResetField<BetEntity>;
  wagerRegister: UseFormRegisterReturn;
  stakeRegister: UseFormRegisterReturn;
}

const Wager: FC<Props> = ({
  setValue,
  watch,
  resetField,
  wagerRegister,
  stakeRegister,
}) => {
  const validWagerField = watch("wager")?.length > 3;
  const validStakeField = Number(watch("stake")) > 0;

  const wagerOddsProps = { setValue, resetField };

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-Basic tracking-tight text-3xl pt-6 pb-4 text-primary">
        Wager.
      </h1>

      {/* Wager */}
      <div className="form-field w-full md:py-3">
        <div className="relative flex flex-row items-center">
          <input
            spellCheck={false}
            autoComplete="off"
            placeholder="What is the pick?"
            className={`relative w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left bg-white rounded-lg shadow-md focus:outline-black ${
              !validWagerField && "animate-pulse pr-0"
            }`}
            {...wagerRegister}
          />
          {validWagerField && (
            <CgCheck className="absolute text-green-500 text-3xl right-1 pointer-events-none" />
          )}
        </div>
      </div>

      {/* Odds */}
      <WagerOdds {...wagerOddsProps} />

      {/* Stake */}
      <div className="form-field w-full md:py-3">
        <div className="relative flex flex-row items-center">
          <input
            type="number"
            placeholder="How many units?"
            className={`relative w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left bg-white rounded-lg shadow-md focus:outline-black ${
              !validStakeField && "animate-pulse pr-0"
            }`}
            {...stakeRegister}
          />
          {validStakeField && (
            <CgCheck className="absolute text-green-500 text-3xl right-1 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};

export { Wager };
