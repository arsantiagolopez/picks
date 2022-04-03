import React, { FC, useState } from "react";
import { BetStats } from "../../../../types";
import { DesktopStats } from "./DesktopStats";
import { MobileStats } from "./MobileStats";

interface Props {
  stats: BetStats;
}

const Overview: FC<Props> = ({ stats }) => {
  const [activeOdds, setActiveOdds] = useState<string>("american");

  const {
    totalPicks,
    daysTracked,
    avgOdds,
    winPercentage,
    lastFiveStreak,
    longestStreak,
  } = stats || {};

  const toggleOdds = () =>
    setActiveOdds(activeOdds === "american" ? "decimal" : "american");

  const statsProps = {
    totalPicks,
    daysTracked,
    toggleOdds,
    activeOdds,
    avgOdds,
    winPercentage,
    lastFiveStreak,
    longestStreak,
  };

  return (
    <div className="text-primary dark:text-white">
      <h1 className="font-Basic text-4xl md:text-5xl font-bold tracking-tighter md:tracking-tight">
        It&apos;s always 🌽 season
      </h1>

      <p className="py-4 md:py-8 text-tertiary dark:text-fourth">
        You wanted more numbers...
      </p>

      <div className="border-b-[1px] my-2 md:my-4"></div>

      {/* Stats section */}
      <MobileStats {...statsProps} />
      <DesktopStats {...statsProps} />
    </div>
  );
};

export { Overview };
