import moment from "moment";
import React, { FC, useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity, ParlayBetEntity } from "../../types";
import { useBets } from "../../utils/useBets";
import { useParlayBets } from "../../utils/useParlayBets";
import { Bets } from "../Bets";
import { ParlaySection } from "../ParlaySection";

interface Props {
  potdReleaseTime: string | null;
  isTomorrowsPicksVisible: boolean;
  isAdmin: boolean;
}

const TodaysPicks: FC<Props> = ({
  potdReleaseTime,
  isTomorrowsPicksVisible,
  isAdmin,
}) => {
  const [sortedBets, setSortedBets] = useState<BetEntity[]>([]);
  const [sortedParlayBets, setSortedParlayBets] = useState<ParlayBetEntity[]>(
    []
  );

  let { bets } = useBets({ todays: true });
  let { bets: parlayBets } = useParlayBets({ todays: true });

  const { sortBy } = useContext(PreferencesContext);

  const today = moment(new Date()).format("MMMM D, YYYY");

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

  const betsProps = { bets: sortedBets, isAdmin };
  const parlaySectionProps = { bets: sortedParlayBets, isAdmin };

  return (
    <div className="w-full pb-8 md:pb-0">
      {/* Heading */}
      <div className="flex flex-col w-full items-center pt-16 md:pt-20 md:pb-12">
        {!isTomorrowsPicksVisible && (
          <img src="/brand.png" className="object-contain h-16 md:h-20 mb-4" />
        )}
        <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter dark:text-white">
          Today&apos;s Picks
        </h1>
        {!isTomorrowsPicksVisible && (
          <p className="font-Times italic tracking-tight text-tertiary dark:text-fourth pt-4">
            Picks released everyday at {potdReleaseTime}
          </p>
        )}

        <p className="text-tertiary text-sm tracking-tight pb-5 pt-4 md:pb-0 dark:text-fourth">
          {today}
        </p>
      </div>

      {/* Picks */}
      <Bets {...betsProps} />

      {/* Parlays */}
      <ParlaySection {...parlaySectionProps} />
    </div>
  );
};

export { TodaysPicks };
