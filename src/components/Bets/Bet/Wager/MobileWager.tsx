import moment from "moment";
import React, { FC, MouseEventHandler, useContext } from "react";
import { CgCheck } from "react-icons/cg";
import { GoDash } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { RiLoader4Line } from "react-icons/ri";
import { PreferencesContext } from "../../../../context/PreferencesContext";
import { BetEntity } from "../../../../types";
import { getSportEmoji } from "../../../../utils/getSportEmoji";
import { getTournamentLogoSrc } from "../../../../utils/getTournamentLogoSrc";

interface Props {
  bet: BetEntity;
  isAdmin: boolean;
  isBetsColored: boolean;
}

const MobileWager: FC<Props> = ({ bet, isAdmin, isBetsColored }) => {
  const { oddsFormat, toggleOdds } = useContext(PreferencesContext);

  const {
    sport,
    tournament,
    tournamentName,
    startTime,
    home,
    away,
    wager,
    odds,
    stake,
    status,
    isFutures,
  } = bet;

  const isMulti = sport === "multi";

  const date = moment(startTime).format("LT");

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    toggleOdds();
  };

  return (
    <div className="flex flex-col w-full text-sm ">
      {/* Top line - Tournament */}
      <div
        className={`flex flex-row justify-between items-center  ${
          isFutures ? "text-white" : "text-gray-300 dark:text-white"
        }`}
      >
        <div className="flex flex-row items-center">
          <p className="text-xl mr-2">{getSportEmoji(sport)}</p>
          {tournament ? (
            <img
              src={getTournamentLogoSrc(tournament)}
              className={
                tournament === "roland-garros" || tournament === "wimbledon"
                  ? "h-5"
                  : "h-3"
              }
            />
          ) : (
            <div className="ml-1 mr-3">
              <p className="uppercase font-Inter text-xs tracking-wider">
                {sport}
              </p>
            </div>
          )}
          <p className="uppercase font-Inter text-xs tracking-wider ml-3 mr-2">
            {tournamentName}
          </p>

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

      {/* Mid line - Event */}
      {home && away && (
        <div
          className={`flex flex-row items-center py-1 dark:text-white ${
            isBetsColored ? "text-black" : "text-tertiary"
          }`}
        >
          <p className="max-w-[50%] truncate">{home}</p>
          <p className="italic mx-1">vs</p>
          <p className="max-w-[50%] truncate mr-1">{away} –</p>
          <p className="text-xs">{date}</p>
        </div>
      )}

      {/* Bottom line - Wager */}
      <div className="flex flex-row items-center">
        <p
          className={`font-semibold truncate ${
            isMulti ? "max-w-[100%]" : "max-w-[70%]"
          }
          ${isFutures ? "text-white" : "text-secondary dark:text-fourth"}
          `}
        >
          {wager}
        </p>

        {!isMulti && (
          <div className="flex flex-row items-center">
            <p
              onClick={handleClick}
              className={`ml-2 ${
                isFutures ? "text-white" : "text-tertiary dark:text-white"
              }`}
            >
              @{" "}
              {oddsFormat === "decimal"
                ? odds.decimal
                : `${odds.american > 0 ? `+${odds.american}` : odds.american}`}
            </p>
            <p
              className={`ml-2 ${
                isFutures ? "text-white" : "text-tertiary dark:text-white"
              }
              `}
            >
              for{" "}
              <span
                className={`font-semibold ml-1 ${
                  isFutures ? "text-white" : "text-secondary dark:text-white"
                }`}
              >
                {stake}u
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Bottom line for Multis */}
      {isMulti && (
        <div className="flex flex-row items-center py-1">
          <p
            onClick={handleClick}
            className={`text-tertiary dark:text-white ${
              isBetsColored ? "text-black" : "text-tertiary"
            }`}
          >
            @{" "}
            {oddsFormat === "decimal"
              ? odds.decimal
              : `${odds.american > 0 ? `+${odds.american}` : odds.american}`}
          </p>
          <p
            className={`ml-2 dark:text-white ${
              isBetsColored ? "text-black" : "text-tertiary"
            }`}
          >
            for{" "}
            <span className="text-secondary font-semibold ml-1 dark:text-white">
              {stake}u
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export { MobileWager };
