import moment from "moment";
import React, { FC } from "react";
import useSWR from "swr";
import { BetStats } from "../../types";

interface Props {}

const Record: FC<Props> = () => {
  const { data: stats } = useSWR<BetStats>("/api/bets/stats");

  const {
    wins,
    losses,
    pushes,
    unitsStaked,
    unitsWon,
    unitsLost,
    unitsReturned,
    roi,
    totalProfit,
  } = stats || {};

  const today = moment().format("MMMM D, YYYY");

  return (
    <div className="flex flex-col justify-center items-center w-full pt-16 md:pt-20 pb-10 md:pb-12">
      <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter">
        Record To Date
      </h1>
      <p className="text-tertiary text-base tracking-tight pt-4">
        as of {today}
      </p>

      {/* Stats */}
      <div className="flex flex-col md:flex-row items-center py-4 md:py-[5vh]">
        {/* Wins */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-thin text-8xl md:text-9xl text-primary tracking-tighter">
            {wins}
          </p>
          <p className="font-Times text-lg md:text-2xl text-secondary italic tracking-tight">
            wins
          </p>
        </div>

        <p className="hidden md:block font-thin text-7xl md:text-9xl mx-2">-</p>

        {/* Losses */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-thin text-8xl md:text-9xl text-primary tracking-tighter">
            {losses}
          </p>
          <p className="font-Times text-lg md:text-2xl text-secondary italic tracking-tight">
            losses
          </p>
        </div>

        <p className="hidden md:block font-thin text-7xl md:text-9xl mx-2">-</p>

        {/* Pushes */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-thin text-8xl md:text-9xl text-primary tracking-tighter">
            {pushes}
          </p>
          <p className="font-Times text-lg md:text-2xl text-secondary italic tracking-tight">
            pushed
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-4">
        <p className="text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-semibold font-Times">
            {roi}%
          </span>{" "}
          ROI.
        </p>
        <p className="text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-semibold font-Times">
            {unitsStaked}
          </span>{" "}
          total units staked.
        </p>
        <p className="text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-semibold font-Times">
            {unitsWon}
          </span>{" "}
          total units won.
        </p>
        <p className="text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-semibold font-Times">
            {unitsLost}
          </span>{" "}
          total units lost.
        </p>
        <p className="text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-semibold font-Times">
            {unitsReturned}
          </span>{" "}
          total units returned.
        </p>
        <p className="text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-semibold font-Times">
            {totalProfit && totalProfit > 0
              ? `+${totalProfit}`
              : `${totalProfit}`}
          </span>{" "}
          total units profited.
        </p>

        <p className="text-tertiary tracking-tight pt-8">
          Stats calculated based on graded wagers.
        </p>
      </div>
    </div>
  );
};

export { Record };
