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
  isBetsColored: boolean;
  isAdmin: boolean;
}

const DesktopWager: FC<Props> = ({ bet, isBetsColored, isAdmin }) => {
  const { oddsFormat, toggleOdds } = useContext(PreferencesContext);

  const {
    sport,
    tournament,
    startTime,
    home,
    away,
    wager,
    odds,
    stake,
    status,
  } = bet;

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
      <div className="flex flex-row justify-between items-center w-[20%]">
        <p className="text-2xl">{getSportEmoji(sport)}</p>
        {tournament ? (
          <img src={getTournamentLogoSrc(tournament)} className="h-7 px-6" />
        ) : (
          <div className="min-w-[3.5rem]">
            <p className="capitalize">{sport}</p>
          </div>
        )}
        <p className="text-sm text-secondary">
          {date}{" "}
          <span
            className={`hidden md:block text-xs italic self-end ${
              isBetsColored ? "text-black" : "text-tertiary"
            }`}
          >
            ({fromNow})
          </span>
        </p>
      </div>

      {/* Event */}
      {home && away && (
        <div
          className={`flex flex-row ${
            isBetsColored ? "text-black" : "text-tertiary"
          }`}
        >
          <p>{home}</p>
          <p className="italic mx-3">vs</p>
          <p>{away}</p>
        </div>
      )}

      {/* Pick */}
      <div
        className={`flex flex-row ${
          isBetsColored ? "text-black" : "text-tertiary"
        }`}
      >
        <p>
          Pick: <span className="text-primary font-semibold">{wager}</span>
        </p>
      </div>

      {/* Odds */}
      <div
        onClick={handleClick}
        className={`flex flex-row italic hover:font-semibold ${
          isBetsColored ? "text-black" : "text-tertiary"
        }`}
      >
        <p>
          @{" "}
          <span className="text-primary font-semibold">
            {oddsFormat === "decimal"
              ? odds.decimal
              : `${odds.american > 0 ? `+${odds.american}` : odds.american}`}
          </span>{" "}
          odds
        </p>
      </div>

      {/* Units */}
      <p className={`italic ${isBetsColored ? "text-black" : "text-tertiary"}`}>
        for <span className="text-primary font-semibold">{stake}u</span>
      </p>

      {/* Status */}
      <div className="flex flex-row text-primary italic">
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
          <GoDash className="text-2xl text-blue-500 animate-[ping_0.5s_ease-out_1]" />
        ) : (
          <RiLoader4Line className="text-2xl animate-spin-slow" />
        )}
      </div>
    </div>
  );
};

export { DesktopWager };
