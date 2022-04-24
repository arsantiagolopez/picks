import moment from "moment";
import React, { FC, MouseEventHandler, useContext } from "react";
import { CgCheck } from "react-icons/cg";
import { GoDash } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { RiLoader4Line } from "react-icons/ri";
import { PreferencesContext } from "../../../../context/PreferencesContext";
import { ParlayBetEntity } from "../../../../types";

interface Props {
  bet: ParlayBetEntity;
  isBetsColored: boolean;
  isAdmin: boolean;
}

const DesktopWager: FC<Props> = ({ bet, isBetsColored, isAdmin }) => {
  const { oddsFormat, toggleOdds } = useContext(PreferencesContext);

  const { startTime, wager, odds, stake, status } = bet;

  const date = moment(startTime).format("LT");
  const fromNow = moment().to(moment(startTime));

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    toggleOdds();
  };

  return (
    <div
      className={`flex flex-row w-full items-center justify-between pl-4 min-w-full ${
        isAdmin ? "pr-[5%]" : "pr-[3%]"
      }`}
    >
      {/* Tournament */}
      <div className="flex flex-row justify-between items-center lg:w-[20%] pr-4 lg:pr-0">
        <p className="text-2xl">🔥</p>

        <div className="hidden xl:block min-w-[3.5rem]">
          <p className="capitalize text-white">Parlay</p>
        </div>

        <p className="hidden lg:block text-sm text-white">
          {date}{" "}
          <span
            className={`hidden md:block text-xs italic self-end text-white ${
              isBetsColored ? "text-white" : "text-tertiary"
            }`}
          >
            ({fromNow})
          </span>
        </p>
      </div>

      {/* Pick */}
      <div
        className={`flex flex-row text-white ${
          isBetsColored ? "text-white" : "text-tertiary"
        }`}
      >
        <p className="font-semibold text-white">{wager}</p>
      </div>

      {/* Odds */}
      <div
        onClick={handleClick}
        className={`flex flex-row italic hover:font-semibold text-white ${
          isBetsColored ? "text-white" : "text-tertiary"
        }`}
      >
        <p>
          @{" "}
          <span className="font-semibold text-white">
            {oddsFormat === "decimal"
              ? odds.decimal
              : `${odds.american > 0 ? `+${odds.american}` : odds.american}`}
          </span>{" "}
          odds
        </p>
      </div>

      {/* Units */}
      <p
        className={`italic text-white ${
          isBetsColored ? "text-white" : "text-tertiary"
        }`}
      >
        for <span className="font-semibold text-white">{stake}u</span>
      </p>

      {/* Status */}
      <div className="flex flex-row italic text-white">
        {status === "won" ? (
          <CgCheck
            className={`text-3xl animate-[ping_0.5s_ease-out_1] ${
              isBetsColored ? "text-white" : "text-green-500"
            }`}
          />
        ) : status === "lost" ? (
          <IoCloseSharp
            className={`text-2xl animate-[ping_0.5s_ease-out_1] ${
              isBetsColored ? "text-white" : "text-red-500"
            }`}
          />
        ) : status === "void" ? (
          <GoDash
            className={`text-2xl animate-[ping_0.5s_ease-out_1] ${
              isBetsColored ? "text-white" : "text-blue-500"
            }`}
          />
        ) : (
          <RiLoader4Line className="text-2xl animate-spin-slow" />
        )}
      </div>
    </div>
  );
};

export { DesktopWager };
