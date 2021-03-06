import moment from "moment";
import React, { FC, useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity } from "../../types";
import { useBets } from "../../utils/useBets";
import { useFuturesBets } from "../../utils/useFuturesBets";
import { Bets } from "../Bets";
import { Futures } from "../Futures";

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

  let { bets } = useBets({ todays: true });
  let { bets: futuresBets } = useFuturesBets();

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

  const betsProps = { bets: sortedBets, isAdmin };
  const futuresProps = { bets: futuresBets, isAdmin };

  return (
    <div className="w-full pb-8 md:pb-0">
      {/* Heading */}
      <div className="flex flex-col w-full items-center pt-16 md:pt-20 md:pb-12">
        {!isTomorrowsPicksVisible && (
          <img
            src="/w-brand.png"
            // @todo - revert after special wimbledon
            // className="object-contain h-16 md:h-20 mb-4"
            className="object-contain h-20 md:h-24 mb-4 -ml-4"
          />
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

      {/* Futures */}
      <Futures {...futuresProps} />
    </div>
  );
};

export { TodaysPicks };
