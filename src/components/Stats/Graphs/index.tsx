import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BetEntity } from "../../../types";
import { useBets } from "../../../utils/useBets";
import { AllGraph } from "./AllGraph";
import { IntervalSelect } from "./IntervalSelect";
import { MonthGraph } from "./MonthGraph";
import { WeekGraph } from "./WeekGraph";
import { YearGraph } from "./YearGraph";

interface Props {
  weekProfit: number;
  setWeekProfit: Dispatch<SetStateAction<number>>;
  monthProfit: number;
  setMonthProfit: Dispatch<SetStateAction<number>>;
  yearProfit: number;
  setYearProfit: Dispatch<SetStateAction<number>>;
  allProfit: number;
  setAllProfit: Dispatch<SetStateAction<number>>;
}

const Graphs: FC<Props> = ({
  weekProfit,
  setWeekProfit,
  monthProfit,
  setMonthProfit,
  yearProfit,
  setYearProfit,
  allProfit,
  setAllProfit,
}) => {
  const [selected, setSelected] = useState<string>("All time");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [weekBets, setWeekBets] = useState<BetEntity[]>([]);
  const [monthBets, setMonthBets] = useState<BetEntity[]>([]);
  const [yearBets, setYearBets] = useState<BetEntity[]>([]);
  const [monthsTracked, setMonthsTracked] = useState<number>(0);

  const { bets } = useBets({ graded: true });

  const options: string[] = [
    "All time",
    "Last 7 days",
    "Last 31 days",
    "This year",
  ];

  const profit =
    selectedIndex === 0
      ? allProfit
      : selectedIndex === 1
      ? weekProfit
      : selectedIndex === 2
      ? monthProfit
      : selectedIndex === 3
      ? yearProfit
      : 0;

  const handleSelect = (option: string) => setSelected(option);

  // Update index
  useEffect(() => {
    const index = options.indexOf(selected);
    setSelectedIndex(index);
  }, [selected]);

  const intervalSelectProps = { options, selected, handleSelect, profit };
  const allGraphProps = {
    bets,
    weekBets,
    monthBets,
    yearBets,
    setAllProfit,
  };
  const weekGraphProps = {
    bets,
    weekBets,
    setWeekBets,
    setWeekProfit,
  };
  const monthGraphProps = {
    bets,
    monthBets,
    setMonthBets,
    setMonthProfit,
  };
  const yearGraphProps = {
    bets,
    yearBets,
    setYearBets,
    setMonthsTracked,
    setYearProfit,
  };

  return (
    <div className="flex flex-col w-full h-[65vh] md:h-[75vh] overflow-hidden md:overflow-visible">
      {/* Graph tabs */}
      <IntervalSelect {...intervalSelectProps} />

      <div className="h-full w-full md:w-[80%] my-6 dark:invert">
        <div
          className={`flex flex-row justify-center items-center w-full h-full ${
            selectedIndex === 0 ? "flex" : "hidden"
          }`}
        >
          <AllGraph {...allGraphProps} />
        </div>
        <div
          className={`flex flex-row justify-center items-center w-full h-full ${
            selectedIndex === 1 ? "flex" : "hidden"
          }`}
        >
          <WeekGraph {...weekGraphProps} />
        </div>
        <div
          className={`flex flex-row justify-center items-center w-1/2 h-full mx-auto ${
            selectedIndex === 2 ? "flex" : "hidden"
          }`}
        >
          <MonthGraph {...monthGraphProps} />
        </div>
        <div
          className={`flex flex-row justify-center items-center h-full mx-auto ${
            selectedIndex === 3 ? "flex" : "hidden"
          } ${
            monthsTracked > 8
              ? "w-full"
              : monthsTracked > 5
              ? "w-3/4"
              : monthsTracked > 3
              ? "w-1/3"
              : "w-1/2"
          }`}
        >
          <YearGraph {...yearGraphProps} />
        </div>
      </div>
    </div>
  );
};

export * from "./AllGraph";
export * from "./MonthGraph";
export * from "./WeekGraph";
export * from "./YearGraph";
export { Graphs };
