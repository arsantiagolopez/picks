import moment from "moment";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetEntity, IntervalAndProfit } from "../../../types";

interface Props {
  bets: BetEntity[];
  weekBets: BetEntity[];
  setWeekBets: Dispatch<SetStateAction<BetEntity[]>>;
  setProfit: Dispatch<SetStateAction<number>>;
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
  setProfit,
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
      const startOfLastWeek = lastWeekDate.startOf("day");
      const endOfToday = today.endOf("day");

      const gradedBetsSinceLastWeek = bets.filter(({ startTime }) =>
        moment(startTime).isBetween(startOfLastWeek, endOfToday)
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

      setProfit(Number(weekProfit));
      setWeekProfit(Number(weekProfit));
    }
  }, [weekBets]);

  // Create 7 data points to represent every day of the week
  useEffect(() => {
    if (weekBets.length) {
      // Split bets by days
      let daysWithProfit: IntervalAndProfit[] = [];

      let currentDay = null;
      let currentDayIndex = 0;

      // Categorize bets by days and add up day profits
      for (const { startTime, status, stake, returns } of weekBets) {
        const profit =
          status === "won" ? returns : status === "lost" ? stake * -1 : 0;

        // Create first day record
        if (!currentDay) {
          currentDay = moment(startTime);
        }

        const dayName = moment(currentDay).format("ddd, MMM Do");
        const dayStart = moment(currentDay).startOf("day");
        const dayEnd = moment(currentDay).endOf("day");
        const betIsCurrentDay = moment(startTime).isBetween(dayStart, dayEnd);

        if (betIsCurrentDay) {
          const dayAndProfit = {
            interval: dayName,
            profit: daysWithProfit[currentDayIndex]
              ? daysWithProfit[currentDayIndex].profit + profit
              : profit,
          };

          daysWithProfit[currentDayIndex] = dayAndProfit;
        } else {
          // Reset fields & create new day record
          currentDayIndex += 1;
          currentDay = currentDay.add(1, "day");

          daysWithProfit[currentDayIndex] = {
            interval: currentDay.format("ddd"),
            profit,
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
