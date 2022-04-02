import moment from "moment";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetEntity, IntervalAndProfit } from "../../../types";

interface Props {
  bets: BetEntity[];
  weekBets: BetEntity[];
  setWeekBets: Dispatch<SetStateAction<BetEntity[]>>;
  setWeekProfit: Dispatch<SetStateAction<number>>;
}

// Next.js server side render Nivo fix
const BarGraph = dynamic(() => import("./BarGraph"), {
  ssr: false,
});

const WeekGraph: FC<Props> = ({
  bets,
  weekBets,
  setWeekBets,
  setWeekProfit,
}) => {
  const [points, setPoints] = useState<IntervalAndProfit[]>([]);

  // Get bets since last week
  useEffect(() => {
    if (bets.length) {
      // Sort bets by date (newest to oldest)
      bets.sort((a, b) =>
        b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
      );

      // Get all graded bets between today and last week
      const lastWeekDate = moment(bets[0].startTime).subtract(1, "week");
      const today = moment(bets[0].startTime);
      const endOfLastWeek = lastWeekDate.endOf("day");
      const endOfToday = today.endOf("day");

      const gradedBetsSinceLastWeek = bets.filter(({ startTime }) =>
        moment(startTime).isBetween(endOfLastWeek, endOfToday)
      );

      // Store bets from oldest to newest
      gradedBetsSinceLastWeek.reverse();

      setWeekBets(gradedBetsSinceLastWeek);
    }
  }, [bets]);

  // Update weekly profit
  useEffect(() => {
    if (weekBets.length) {
      const weekProfit = weekBets
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

      setWeekProfit(Number(weekProfit));
    }
  }, [weekBets]);

  // Create 7 data points to represent every day of the week
  useEffect(() => {
    if (weekBets.length) {
      // Split bets by days
      let daysWithProfit: IntervalAndProfit[] = [];

      // Track days array
      let currentDayIndex = 0;

      for (const [
        index,
        { startTime, status, stake, returns },
      ] of weekBets.entries()) {
        // Get bet day & last bet day
        const dayName = moment(startTime).format("ddd, MMM Do");
        const lastBetDayName = moment(weekBets[index - 1]?.startTime).format(
          "ddd, MMM Do"
        );

        // Get bet profit
        const profit =
          status === "won" ? returns : status === "lost" ? stake * -1 : 0;

        // Create first day entry
        if (index === 0) {
          daysWithProfit[currentDayIndex] = {
            interval: dayName,
            profit,
          };
        }
        // New day: Create new entry
        else if (dayName !== lastBetDayName) {
          currentDayIndex++;
          daysWithProfit[currentDayIndex] = { interval: dayName, profit };
        }
        // Same day: Add up profits
        else {
          daysWithProfit[currentDayIndex] = {
            interval: dayName,
            profit: daysWithProfit[currentDayIndex].profit + profit,
          };
        }
      }

      // Store in state
      setPoints(daysWithProfit);
    }
  }, [weekBets]);

  const graphProps = { data: points };

  // console.log("* points: ", points);

  if (points) {
    return <BarGraph {...graphProps} />;
  } else {
    return <></>;
  }
};

export { WeekGraph };
