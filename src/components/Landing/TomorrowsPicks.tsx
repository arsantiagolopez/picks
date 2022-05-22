import moment from "moment-timezone";
import React, { FC, useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity, ParlayBetEntity } from "../../types";
import { useBets } from "../../utils/useBets";
import { useParlayBets } from "../../utils/useParlayBets";
import { Bets } from "../Bets";
import { ParlaySection } from "../ParlaySection";

interface Props {
  isAdmin: boolean;
  potdReleaseTime: string | null;
}

const TomorrowsPicks: FC<Props> = ({ isAdmin, potdReleaseTime }) => {
  const [sortedBets, setSortedBets] = useState<BetEntity[]>([]);
  const [sortedParlayBets, setSortedParlayBets] = useState<ParlayBetEntity[]>(
    []
  );

  let { bets } = useBets({ tomorrows: true });
  let { bets: parlayBets } = useParlayBets({ tomorrows: true });

  const { sortBy } = useContext(PreferencesContext);

  const tomorrow = moment().add(1, "day").format("MMMM D, YYYY");

  const currentCentralizedTime = moment()
    .tz("America/Chicago")
    .format("h:mm A");
  const timeUntilRelease = moment(currentCentralizedTime, "h:mm A").to(
    moment(potdReleaseTime, "h:mm A")
  );
  const picksReleased = moment(potdReleaseTime).isBefore(
    currentCentralizedTime
  );

  // Sort bets
  useEffect(() => {
    if (bets && sortBy) {
      // Sort by units
      if (sortBy === "units") {
        setSortedBets([...bets.sort((a, b) => b.stake - a.stake)]);
      }

      // Sort by date
      if (sortBy === "date") {
        setSortedBets([
          ...bets.sort((a, b) =>
            b.startTime.valueOf() < a.startTime.valueOf() ? 1 : -1
          ),
        ]);
      }
    }
  }, [bets, sortBy]);

  // Sort parlay bets
  useEffect(() => {
    if (parlayBets && sortBy) {
      // Sort by units
      if (sortBy === "units") {
        setSortedParlayBets([...parlayBets.sort((a, b) => b.stake - a.stake)]);
      }

      // Sort by date
      if (sortBy === "date") {
        setSortedParlayBets([
          ...parlayBets.sort((a, b) =>
            b.startTime.valueOf() < a.startTime.valueOf() ? 1 : -1
          ),
        ]);
      }
    }
  }, [parlayBets, sortBy]);

  const betsProps = { bets: sortedBets, isTomorrow: true, isAdmin };
  const parlaySectionProps = {
    bets: sortedParlayBets,
    isTomorrow: true,
    isAdmin,
  };

  return (
    <div className="relative w-screen px-5 md:px-[22.5%] min-h-[50vh] dark:bg-secondary transition-all">
      {/* Flashing background */}
      <div className="-z-10 absolute top-0 left-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-gradient-to-b dark:from-secondary dark:to-primary w-full animate-pulse h-full py-20"></div>

      {/* Heading */}
      <div className="z-20 flex flex-col w-full items-center pt-16 md:pt-20 pb-10 md:pb-12">
        {isAdmin && !picksReleased && (
          <div className="absolute top-10 rounded-md p-2 px-3 animate-pulse bg-gradient-to-br from-yellow-50 to-yellow-100 dark:bg-gradient-to-br dark:from-white dark:to-gray-500 shadow-sm">
            <p className="uppercase font-Inter text-[0.6rem] text-gray-900">
              Picks to be released {timeUntilRelease}
            </p>
          </div>
        )}
        <img src="/rg-brand.png" className="object-contain h-16 md:h-20 mb-4" />
        <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter dark:text-white">
          Tomorrow&apos;s Picks
        </h1>
        <p className="text-tertiary text-sm tracking-tight pt-4 dark:text-fourth">
          {tomorrow}
        </p>
      </div>

      {/* Picks */}
      <Bets {...betsProps} />

      {/* Parlays */}
      <ParlaySection {...parlaySectionProps} />
    </div>
  );
};

export { TomorrowsPicks };
