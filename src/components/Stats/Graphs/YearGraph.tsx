import moment from "moment";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetEntity, IntervalAndProfit } from "../../../types";

interface Props {
  bets: BetEntity[];
  yearBets: BetEntity[];
  setYearBets: Dispatch<SetStateAction<BetEntity[]>>;
  setMonthsTracked: Dispatch<SetStateAction<number>>;
  setYearProfit: Dispatch<SetStateAction<number>>;
}

// Next.js server side render Nivo fix
const BarGraph = dynamic(() => import("./BarGraph"), {
  ssr: false,
});

const YearGraph: FC<Props> = ({
  bets,
  yearBets,
  setYearBets,
  setMonthsTracked,
  setYearProfit,
}) => {
  const [points, setPoints] = useState<IntervalAndProfit[]>([]);

  // Get bets since last year
  useEffect(() => {
    if (bets.length) {
      // Sort bets by date (newest to oldest)
      bets.sort((a, b) =>
        b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
      );

      // Get all graded bets between today and last yaer
      const lastYearDate = moment(bets[0].startTime).subtract(1, "year");
      const today = moment(bets[0].startTime);
      const startOfLastYear = lastYearDate.startOf("day");
      const endOfToday = today.endOf("day");

      const gradedBetsSinceLastYear = bets.filter(({ startTime }) =>
        moment(startTime).isBetween(startOfLastYear, endOfToday)
      );

      // Store bets from oldest to newest
      gradedBetsSinceLastYear.reverse();

      setYearBets(gradedBetsSinceLastYear);
    }
  }, [bets]);

  // Update yearly profit
  useEffect(() => {
    if (yearBets.length) {
      const yearProfit = yearBets
        .reduce(
          (acc, { status, stake, returns }) =>
            status === "won"
              ? acc + returns
              : status === "lost"
              ? acc - stake
              : acc,
          0
        )
        .toFixed(2);

      setYearProfit(Number(yearProfit));
    }
  }, [yearBets]);

  // Create 12 data points to represent each month
  useEffect(() => {
    if (yearBets.length) {
      // Split bets by months
      let monthWithProfit: IntervalAndProfit[] = [];

      // Track months array
      let currentMonthIndex = 0;

      for (const [
        index,
        { startTime, status, stake, returns },
      ] of yearBets.entries()) {
        // Get bet month & last bet month
        const monthStart = moment(startTime).startOf("month");
        const monthEnd = moment(startTime).endOf("month");
        const monthLabel = monthStart.format("MMMM");

        const lastBetDate = yearBets[index - 1]?.startTime;
        const isLastBetWithinCurrentMonth = moment(lastBetDate).isBetween(
          monthStart,
          monthEnd
        );

        // Get bet profit
        const profit =
          status === "won" ? returns : status === "lost" ? stake * -1 : 0;

        // Create first month entry
        if (index === 0) {
          monthWithProfit[currentMonthIndex] = {
            interval: monthLabel,
            profit,
          };
        }
        // New month: Create new entry
        else if (!isLastBetWithinCurrentMonth) {
          currentMonthIndex++;
          monthWithProfit[currentMonthIndex] = { interval: monthLabel, profit };
        }
        // Same day: Add up profits
        else {
          monthWithProfit[currentMonthIndex] = {
            interval: monthLabel,
            profit: monthWithProfit[currentMonthIndex].profit + profit,
          };
        }
      }

      // Track total number of days
      setMonthsTracked(currentMonthIndex + 1);

      // Store in state
      setPoints(monthWithProfit);
    }
  }, [yearBets]);

  const graphProps = { data: points };

  if (points) {
    return <BarGraph {...graphProps} />;
  } else {
    return <></>;
  }
};

export { YearGraph };
