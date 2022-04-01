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

const MobileStats: FC<Props> = ({
  totalPicks,
  daysTracked,
  toggleOdds,
  activeOdds,
  avgOdds,
  winPercentage,
  lastFiveStreak,
  longestStreak,
}) => (
  <section className="flex md:hidden flex-col justify-around items-center py-2">
    {/* Top row */}
    <div className="flex flex-row justify-around space-x-6 items-center w-full py-4">
      {/* Stat 1*/}
      <div className="flex flex-col text-left">
        <p className="text-tertiary">Total Picks</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic text-4xl tracking-tighter">{totalPicks}</p>
          <VscGraphLine className="text-xl ml-2 text-green-600" />
        </div>
      </div>

      {/* Stat 2*/}
      <div className="flex flex-col text-right">
        <p className="text-tertiary">Days tracked</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic text-4xl tracking-tighter">
            {daysTracked ? `${daysTracked} days` : null}
          </p>
          <BsSun className="text-xl ml-2 text-yellow-500" />
        </div>
      </div>
    </div>

    {/* Middle row */}
    <div className="flex flex-row justify-around space-x-6 items-center w-full py-4">
      {/* Stat 3*/}
      <div className="flex flex-col text-left">
        <p className="text-tertiary">Win percentage</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic text-4xl tracking-tighter">
            {winPercentage ? winPercentage : null}
          </p>
          <AiOutlinePercentage className="text-xl ml-2 text-green-500" />
        </div>
      </div>

      {/* Stat 4 */}
      <div
        onClick={toggleOdds}
        className="flex flex-col cursor-pointer text-right"
      >
        <p className="text-tertiary">Avg. odds</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic text-4xl tracking-tighter">
            {activeOdds === "american" ? avgOdds?.american : avgOdds?.decimal}
          </p>
          <IoPricetagsOutline className="text-xl ml-2 text-blue-500" />
        </div>
      </div>
    </div>

    {/* Bottom row */}
    <div className="flex flex-row justify-around space-x-6 items-center w-full py-4">
      {/* Stat 5 */}
      <div className="flex flex-col text-left">
        <p className="text-tertiary">Longest streak</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic text-4xl tracking-tighter">
            {longestStreak ? longestStreak : null}
          </p>
          <RiBarChartFill className="text-2xl ml-2 text-blue-500" />
        </div>
      </div>

      {/* Stat 6 */}
      <div className="flex flex-col text-right">
        <p className="text-tertiary">Last five</p>
        <div className="flex flex-row items-baseline">
          <p className="font-Basic text-4xl tracking-tighter">
            {lastFiveStreak ? lastFiveStreak : null}
          </p>
          <RiBarChartFill className="text-2xl ml-2 text-green-500" />
        </div>
      </div>
    </div>
  </section>
);

export { MobileStats };
