import moment from "moment";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetEntity, IntervalAndProfit } from "../../../types";

interface Props {
  bets: BetEntity[];
  monthBets: BetEntity[];
  setMonthBets: Dispatch<SetStateAction<BetEntity[]>>;
  setMonthProfit: Dispatch<SetStateAction<number>>;
}

// Next.js server side render Nivo fix
const BarGraph = dynamic(() => import("./BarGraph"), {
  ssr: false,
});

const MonthGraph: FC<Props> = ({
  bets,
  monthBets,
  setMonthBets,
  setMonthProfit,
}) => {
  const [points, setPoints] = useState<IntervalAndProfit[]>([]);

  // Get bets since last month
  useEffect(() => {
    if (bets.length) {
      // Sort bets by date (newest to oldest)
      bets.sort((a, b) =>
        b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
      );

      // Get all graded bets between today and last month
      const lastMonthDate = moment(bets[0].startTime).subtract(1, "month");
      const today = moment(bets[0].startTime);
      const startOfLastMonth = lastMonthDate.startOf("day");
      const endOfToday = today.endOf("day");

      const gradedBetsSinceLastMonth = bets.filter(({ startTime }) =>
        moment(startTime).isBetween(startOfLastMonth, endOfToday)
      );

      // Store bets from oldest to newest
      gradedBetsSinceLastMonth.reverse();

      setMonthBets(gradedBetsSinceLastMonth);
    }
  }, [bets]);

  // Update monthly profit
  useEffect(() => {
    if (monthBets.length) {
      const monthProfit = monthBets
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

      setMonthProfit(Number(monthProfit));
    }
  }, [monthBets]);

  // Create 4 data points to represent each week
  useEffect(() => {
    if (monthBets.length) {
      // Split bets by weeks
      let weekWithProfit: IntervalAndProfit[] = [];

      // Track weeks array
      let currentWeekIndex = 0;

      for (const [
        index,
        { startTime, status, stake, returns },
      ] of monthBets.entries()) {
        // Get bet week & last bet week
        const weekStart = moment(startTime).startOf("week");
        const weekEnd = moment(startTime).endOf("week");
        const weekLabel = `${weekStart.format("MMM Do")} - ${weekEnd.format(
          "MMM Do"
        )}`;

        const lastBetDate = monthBets[index - 1]?.startTime;
        const isLastBetWithinCurrentWeek = moment(lastBetDate).isBetween(
          weekStart,
          weekEnd
        );

        // Get bet profit
        const profit =
          status === "won" ? returns : status === "lost" ? stake * -1 : 0;

        // Create first week entry
        if (index === 0) {
          weekWithProfit[currentWeekIndex] = {
            interval: weekLabel,
            profit,
          };
        }
        // New week: Create new entry
        else if (!isLastBetWithinCurrentWeek) {
          currentWeekIndex++;
          weekWithProfit[currentWeekIndex] = { interval: weekLabel, profit };
        }
        // Same day: Add up profits
        else {
          weekWithProfit[currentWeekIndex] = {
            interval: weekLabel,
            profit: weekWithProfit[currentWeekIndex].profit + profit,
          };
        }
      }

      // Store in state
      setPoints(weekWithProfit);
    }
  }, [monthBets]);

  const graphProps = { data: points };

  if (points) {
    // @ts-ignore
    return <BarGraph {...graphProps} />;
  } else {
    return <></>;
  }
};

export { MonthGraph };
