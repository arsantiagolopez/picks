import React, { FC } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsSun } from "react-icons/bs";
import { IoPricetagsOutline } from "react-icons/io5";
import { RiBarChartFill } from "react-icons/ri";
import { VscGraphLine } from "react-icons/vsc";
import { OddsEntity } from "../../../../types";

interface Props {
  totalPicks: number;
  daysTracked: number;
  toggleOdds: () => void;
  activeOdds: string;
  avgOdds: OddsEntity;
  winPercentage: number;
  lastFiveStreak: string;
  longestStreak: number;
}

const DesktopStats: FC<Props> = ({
  totalPicks,
  daysTracked,
  toggleOdds,
  activeOdds,
  avgOdds,
  winPercentage,
  lastFiveStreak,
  longestStreak,
}) => (
  <section className="hidden lg:flex flex-col justify-between items-center py-2 md:py-4">
    {/* Top row */}
    <div className="flex flex-row justify-between items-center w-full py-4">
      {/* Stat 1*/}
      <div className="flex flex-col">
        <p className="text-tertiary">Total Picks</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic font-bold text-4xl md:text-5xl tracking-tight">
            {totalPicks}
          </p>
          <VscGraphLine className="text-xl md:text-2xl ml-2 text-green-600" />
        </div>
      </div>

      {/* Stat 2*/}
      <div className="flex flex-col">
        <p className="text-tertiary">Days tracked</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic font-bold text-4xl md:text-5xl tracking-tight">
            {daysTracked ? `${daysTracked} days` : null}
          </p>
          <BsSun className="text-xl md:text-2xl ml-2 text-yellow-500" />
        </div>
      </div>

      {/* Stat 3*/}
      <div onClick={toggleOdds} className="flex flex-col cursor-pointer">
        <p className="text-tertiary">Avg. odds</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic font-bold text-4xl md:text-5xl tracking-tight">
            {activeOdds === "american" ? avgOdds?.american : avgOdds?.decimal}
          </p>
          <IoPricetagsOutline className="text-xl md:text-2xl ml-2 text-blue-500" />
        </div>
      </div>
    </div>

    {/* Bottom row */}
    <div className="flex flex-row justify-between items-center w-full py-8">
      {/* Stat 4 */}
      <div className="flex flex-col">
        <p className="text-tertiary">Win percentage</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic font-bold text-4xl md:text-5xl tracking-tight">
            {winPercentage ? winPercentage : null}
          </p>
          <AiOutlinePercentage className="text-xl md:text-2xl ml-2 text-green-500" />
        </div>
      </div>

      {/* Stat 5 */}
      <div className="flex flex-col">
        <p className="text-tertiary">Longest streak</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic font-bold text-4xl md:text-5xl tracking-tight">
            {longestStreak ? longestStreak : null}
          </p>
          <RiBarChartFill className="text-2xl md:text-3xl ml-2 text-blue-500" />
        </div>
      </div>

      {/* Stat 6 */}
      <div className="flex flex-col">
        <p className="text-tertiary">Last five</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic font-bold text-4xl md:text-5xl tracking-tighter">
            {lastFiveStreak ? lastFiveStreak : null}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export { DesktopStats };
