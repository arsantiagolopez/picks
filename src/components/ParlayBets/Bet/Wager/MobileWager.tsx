import React, { FC, MouseEventHandler, useContext } from "react";
import { CgCheck } from "react-icons/cg";
import { GoDash } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { RiLoader4Line } from "react-icons/ri";
import { PreferencesContext } from "../../../../context/PreferencesContext";
import { ParlayBetEntity } from "../../../../types";

interface Props {
  bet: ParlayBetEntity;
  isAdmin: boolean;
  isBetsColored: boolean;
}

const MobileWager: FC<Props> = ({ bet, isAdmin, isBetsColored }) => {
  const { oddsFormat, toggleOdds } = useContext(PreferencesContext);

  const {
    // startTime,
    wager,
    odds,
    stake,
    status,
  } = bet;

  // const date = moment(startTime).format("LT");

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    toggleOdds();
  };

  return (
    <div className="flex flex-col w-full text-sm ">
      {/* Top line - Tournament */}
      <div className="flex flex-row justify-between items-center  text-white">
        <div className="flex flex-row items-center">
          <p className="text-lg mr-2">🔥</p>

          <div className="ml-1 mr-3">
            <p className="uppercase font-Inter text-xs tracking-wider">
              Parlay
            </p>
          </div>

          {isAdmin && status === "won" ? (
            <CgCheck
              className={`text-3xl animate-[ping_0.5s_ease-out_1] ${
                isBetsColored ? "text-white" : "text-green-500"
              }`}
            />
          ) : isAdmin && status === "lost" ? (
            <IoCloseSharp
              className={`text-2xl ${
                isBetsColored ? "text-white" : "text-red-500"
              }`}
            />
          ) : isAdmin && status === "void" ? (
            <GoDash className="text-2xl ml-2 text-blue-500 animate-[ping_0.5s_ease-out_1]" />
          ) : isAdmin ? (
            <RiLoader4Line className="text-2xl animate-spin-slow" />
          ) : null}
        </div>

        {!isAdmin && status === "won" ? (
          <CgCheck
            className={`text-3xl animate-[ping_0.5s_ease-out_1] ${
              isBetsColored ? "text-white" : "text-green-500"
            }`}
          />
        ) : !isAdmin && status === "lost" ? (
          <IoCloseSharp
            className={`text-2xl ${
              isBetsColored ? "text-white" : "text-red-500"
            }`}
          />
        ) : !isAdmin && status === "void" ? (
          <GoDash
            className={`text-2xl ml-2 animate-[ping_0.5s_ease-out_1] ${
              isBetsColored ? "text-white" : "text-blue-500"
            }`}
          />
        ) : !isAdmin ? (
          <RiLoader4Line className="text-2xl animate-spin-slow" />
        ) : null}
      </div>

      {/* Bottom line - Wager */}
      <div className="flex flex-row items-center">
        <p className="text-white font-semibold truncate max-w-[100%]">
          {wager}
        </p>
      </div>

      {/* Bottom line */}
      <div className="flex flex-row items-center py-1">
        <p
          onClick={handleClick}
          className={`text-white ${
            isBetsColored ? "text-white" : "text-tertiary"
          }`}
        >
          @{" "}
          {oddsFormat === "decimal"
            ? odds.decimal
            : `${odds.american > 0 ? `+${odds.american}` : odds.american}`}
        </p>
        <p
          className={`ml-2 text-white ${
            isBetsColored ? "text-white" : "text-tertiary"
          }`}
        >
          for <span className="font-semibold ml-1 text-white">{stake}u</span>
        </p>
      </div>
    </div>
  );
};

export { MobileWager };
