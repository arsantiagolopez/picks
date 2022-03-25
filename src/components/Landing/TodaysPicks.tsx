import { Moment } from "moment";
import React, { FC, useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity } from "../../types";
import { useBets } from "../../utils/useBets";
import { Bets } from "../Bets";

interface Props {
  now: Moment;
  potdReleaseTime: string | null;
  isTomorrowsPicksVisible: boolean;
  isAdmin: boolean;
}

const TodaysPicks: FC<Props> = ({
  now,
  potdReleaseTime,
  isTomorrowsPicksVisible,
  isAdmin,
}) => {
  const [sortedBets, setSortedBets] = useState<BetEntity[]>([]);

  let { bets } = useBets({ todays: true });

  const { sortBy } = useContext(PreferencesContext);

  const today = now.format("MMMM D, YYYY");

  // Sort bets
  useEffect(() => {
    if (bets && sortBy) {
      // Sort by units
      if (sortBy === "units") {
        setSortedBets([...bets.sort((a, b) => b.stake - a.stake)]);
      }

      // Sort by upcoming
      if (sortBy === "upcoming") {
        setSortedBets([
          ...bets.sort((a, b) =>
            b.startTime.valueOf() < a.startTime.valueOf() ? 1 : -1
          ),
        ]);
      }
    }
  }, [bets, sortBy]);

  const betsProps = { bets: sortedBets, isAdmin };

  return (
    <div className="w-full pb-8 md:pb-32">
      {/* Heading */}
      <div className="flex flex-col w-full items-center pt-16 md:pt-20 md:pb-12">
        {!isTomorrowsPicksVisible && (
          <img src="/brand.png" className="object-contain h-16 md:h-20 mb-4" />
        )}
        <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter">
          Today&apos;s Picks
        </h1>
        {!isTomorrowsPicksVisible && (
          <p className="font-Times text-tertiary text-base italic tracking-tight pt-4">
            Picks released everyday at {potdReleaseTime}
          </p>
        )}

        <p className="font-Times text-tertiary text-base italic tracking-tight pt-4">
          {today}
        </p>
      </div>

      {/* Picks */}
      <Bets {...betsProps} />
    </div>
  );
};

export { TodaysPicks };
