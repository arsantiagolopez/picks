import moment from "moment";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetEntity, IntervalAndProfit } from "../../../types";

interface Props {
  bets: BetEntity[];
  weekBets: BetEntity[];
  monthBets: BetEntity[];
  yearBets: BetEntity[];
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

      setAllProfit(Number(allProfit));
    }
  }, [bets]);

  // Create up to 9 data points to represent all time
  useEffect(() => {
    if (bets.length && weekBets.length && monthBets.length && yearBets.length) {
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
        // Get only bets from last 10 days
        const tenDaysAgoDate = moment(monthBets[0].startTime)
          .subtract(10, "days")
          .startOf("day");

        // Split bets by days
        let daysWithProfit: IntervalAndProfit[] = [];

        // Track days array
        let currentDayIndex = 0;

        for (const [
          index,
          { startTime, status, stake, returns },
        ] of monthBets.entries()) {
          const isBetFromTenDaysAgo = moment(startTime).isAfter(tenDaysAgoDate);

          if (isBetFromTenDaysAgo) {
            // Get bet day & last bet day
            const dayName = moment(startTime).format("ddd, MMM Do");
            const lastBetDayName = moment(
              monthBets[index - 1]?.startTime
            ).format("ddd, MMM Do");

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
        }

        // Store in state
        setPoints(daysWithProfit);
      } else if (Math.floor(daysSinceFirstPick) < 32) {
        // Handle month

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
      } else if (Math.floor(daysSinceFirstPick) < 366) {
        // Handle year

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
            monthWithProfit[currentMonthIndex] = {
              interval: monthLabel,
              profit,
            };
          }
          // Same day: Add up profits
          else {
            monthWithProfit[currentMonthIndex] = {
              interval: monthLabel,
              profit: monthWithProfit[currentMonthIndex].profit + profit,
            };
          }
        }

        // Store in state
        setPoints(monthWithProfit);
      } else {
        // Handle anytime
        // Worry about this when the time comes ;)
      }
    }
  }, [bets, weekBets, monthBets, yearBets]);

  const graphProps = { data: points };

  // console.log("* points: ", points);

  if (points) {
    // @ts-ignore
    return <BarGraph {...graphProps} />;
  } else {
    return <></>;
  }
};

export { AllGraph };
