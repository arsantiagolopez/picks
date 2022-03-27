import React, { FC } from "react";
import { useBets } from "../../utils/useBets";
import { PicksHistory } from "../PicksHistory";

interface Props {
  isAdmin: boolean;
}

const PastPicks: FC<Props> = ({ isAdmin }) => {
  const { bets } = useBets({ past: true });

  // Sort bets by date
  const sortedBets = bets.sort((a, b) =>
    b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
  );

  const picksHistoryProps = { bets: sortedBets, isAdmin };

  return (
    <div className="relative w-screen px-5 md:px-[22.5%] pb-20 md:pb-20">
      {/* Flashing background */}
      <div className="-z-10 absolute top-0 left-0 bg-gradient-to-t from-gray-50 to-gray-100 w-full animate-pulse h-full py-20"></div>

      {/* Heading */}
      <div className="z-20 flex flex-row w-full items-center pt-10 md:pt-20 pb-10 md:pb-12">
        <PicksHistory {...picksHistoryProps} />
      </div>
    </div>
  );
};

export { PastPicks };
