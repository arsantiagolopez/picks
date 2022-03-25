import moment from "moment";
import React, { FC, useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity } from "../../types";
import { useBets } from "../../utils/useBets";
import { Bets } from "../Bets";

interface Props {
  isAdmin: boolean;
  potdReleaseTime: string | null;
}

const TomorrowsPicks: FC<Props> = ({ isAdmin, potdReleaseTime }) => {
  const [sortedBets, setSortedBets] = useState<BetEntity[]>([]);

  let { bets } = useBets({ tomorrows: true });

  const { sortBy } = useContext(PreferencesContext);

  const tomorrow = moment().add(1, "day").format("MMMM D, YYYY");

  const now = moment(new Date());
  const releaseTime = moment(potdReleaseTime, "h:mm A");
  const timeUntilRelease = moment().to(releaseTime);
  const picksReleased = moment(releaseTime).isBefore(now);

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

  const betsProps = { bets: sortedBets, isTomorrow: true, isAdmin };

  return (
    <div className="relative w-screen px-5 md:px-[22.5%] min-h-[50vh]">
      {/* Flashing background */}
      <div className="-z-10 absolute top-0 left-0 bg-gradient-to-b from-gray-50 to-gray-100 w-full animate-pulse h-full py-20"></div>

      {/* Heading */}
      <div className="z-20 flex flex-col w-full items-center pt-16 md:pt-20 pb-10 md:pb-12">
        {isAdmin && !picksReleased && (
          <div className="absolute top-10 rounded-md p-2 px-3 animate-pulse bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-sm">
            <p className="uppercase font-Inter text-[0.6rem] text-gray-900">
              {`Picks to be released ${timeUntilRelease}`}
            </p>
          </div>
        )}
        <img src="/brand.png" className="object-contain h-16 md:h-20 mb-4" />
        <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter">
          Tomorrow&apos;s Picks
        </h1>
        <p className="font-Times text-secondary text-base italic tracking-tight pt-4">
          {tomorrow}
        </p>
      </div>

      {/* Picks */}
      <Bets {...betsProps} />
    </div>
  );
};

export { TomorrowsPicks };
