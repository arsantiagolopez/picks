import moment from "moment";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetEntity, IntervalAndProfit } from "../../../types";

interface Props {
  bets: BetEntity[];
  monthBets: BetEntity[];
  setMonthBets: Dispatch<SetStateAction<BetEntity[]>>;
  setProfit: Dispatch<SetStateAction<number>>;
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
  setProfit,
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

      setProfit(Number(monthProfit));
      setMonthProfit(Number(monthProfit));
    }
  }, [monthBets]);

  // Create 4 data points to represent each week
  useEffect(() => {
    if (monthBets.length) {
      // Split bets by weeks
      let weekWithProfit: IntervalAndProfit[] = [];

      let currentWeek = null;
      let currentWeekIndex = 0;

      // Categorize bets by weeks and add up week profits
      for (const { startTime, status, stake, returns } of monthBets) {
        const profit =
          status === "won" ? returns : status === "lost" ? stake * -1 : 0;

        // Create first week record
        if (!currentWeek) {
          currentWeek = moment(startTime);
        }

        const weekStart = moment(currentWeek).startOf("week");
        const weekEnd = moment(currentWeek).endOf("week");
        const betIsCurrentWeek = moment(startTime).isBetween(
          weekStart,
          weekEnd
        );

        const weekLabel = `${weekStart.format("MMM Do")} - ${weekEnd.format(
          "MMM Do"
        )}`;

        if (betIsCurrentWeek) {
          const weekAndProfit = {
            interval: weekLabel,
            profit: weekWithProfit[currentWeekIndex]
              ? weekWithProfit[currentWeekIndex].profit + profit
              : profit,
          };

          weekWithProfit[currentWeekIndex] = weekAndProfit;
        } else {
          // Reset fields & create new week record
          currentWeekIndex += 1;
          currentWeek = currentWeek.add(1, "week");

          weekWithProfit[currentWeekIndex] = {
            interval: weekLabel,
            profit,
          };
        }
      }

      // Store in state
      setPoints(weekWithProfit);
    }
  }, [monthBets]);

  const graphProps = { data: points };

  if (points) {
    return <BarGraph {...graphProps} />;
  } else {
    return <></>;
  }
};

export { MonthGraph };
