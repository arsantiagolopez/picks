import moment from "moment";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetEntity, IntervalAndProfit } from "../../../types";

interface Props {
  bets: BetEntity[];
  weekBets: BetEntity[];
  monthBets: BetEntity[];
  yearBets: BetEntity[];
  setProfit: Dispatch<SetStateAction<number>>;
  setAllProfit: Dispatch<SetStateAction<number>>;
}

// Next.js server side render Nivo fix
const BarGraph = dynamic(() => import("./BarGraph"), {
  ssr: false,
});

const AllGraph: FC<Props> = ({
  bets,
  weekBets,
  monthBets,
  yearBets,
  setProfit,
  setAllProfit,
}) => {
  const [points, setPoints] = useState<IntervalAndProfit[]>([]);

  // Update profit
  useEffect(() => {
    if (bets.length) {
      const allProfit = bets
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

      setProfit(Number(allProfit));
      setAllProfit(Number(allProfit));
    }
  }, [bets]);

  // Create up to 9 data points to represent all time
  useEffect(() => {
    if (bets.length && weekBets.length) {
      // Sort bets by oldest to newest
      bets.sort((a, b) =>
        b.startTime.valueOf() < a.startTime.valueOf() ? 1 : -1
      );

      // Last bet should be oldest
      const oldestDate = moment(bets[0].startTime);
      const newestDate = moment(bets[bets.length - 1].startTime);

      // Create interval based on time passed since first bet
      const daysSinceFirstPick = moment
        .duration(newestDate.diff(oldestDate))
        .asDays();

      // If days < 10, create new day data point
      if (Math.floor(daysSinceFirstPick) < 10) {
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
            const betIsCurrentDay = moment(startTime).isBetween(
              dayStart,
              dayEnd
            );

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
                interval: dayName,
                profit,
              };
            }
          }

          // Store in state
          setPoints(daysWithProfit);
        }
      } else if (Math.floor(daysSinceFirstPick) < 31) {
        // Handle month
      } else if (Math.floor(daysSinceFirstPick) < 366) {
        // Handle year
      } else {
        // Handle anytime
      }
    }

    // If days > 9, create
  }, [bets, weekBets]);

  const graphProps = { data: points };

  // console.log("* points: ", points);

  if (points) {
    return <BarGraph {...graphProps} />;
  } else {
    return <></>;
  }
};

export { AllGraph };
