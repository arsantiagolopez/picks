import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { useBets } from "../../utils/useBets";

interface Props {}

const Record: FC<Props> = () => {
  const [totalUnitsStaked, setTotalUnitsStaked] = useState<number | null>(null);
  const [totalUnitsWon, setTotalUnitsWon] = useState<number | null>(null);
  const [totalUnitsLost, setTotalUnitsLost] = useState<number | null>(null);
  const [totalUnitsReturned, setTotalUnitsReturned] = useState<number | null>(
    null
  );

  const { data: record } = useSWR("/api/bets?set=record");

  const { bets: pastBets } = useBets({ past: true });
  const { bets: todaysBets } = useBets({ todays: true });

  const today = moment().format("MMMM D, YYYY");

  const wins = record && record[0];
  const losses = record && record[1];
  const voids = record && record[2];

  const profit = Number((totalUnitsWon! - totalUnitsLost!).toFixed(2));

  const roi =
    totalUnitsStaked !== 0
      ? Number(((profit / totalUnitsStaked!) * 100).toFixed(2))
      : 0;

  useEffect(() => {
    if (pastBets && todaysBets) {
      const pastGradedBets = pastBets.filter(
        ({ status }) => status !== "pending"
      );
      const todaysGradedBets = todaysBets.filter(
        ({ status }) => status !== "pending"
      );

      const all = [...pastGradedBets, ...todaysGradedBets];

      const unitsStaked = all
        .reduce((acc, { stake }) => acc + stake, 0)
        .toFixed(2);
      const unitsWon = all
        .reduce(
          (acc, { status, returns }) =>
            status === "won" ? acc + returns : acc,
          0
        )
        .toFixed(2);
      const unitsLost = all
        .reduce(
          (acc, { status, stake }) => (status === "lost" ? acc + stake : acc),
          0
        )
        .toFixed(2);
      const unitsReturned = all
        .reduce(
          (acc, { status, stake }) =>
            status === "won" || status === "void" ? acc + stake : acc,
          0
        )
        .toFixed(2);

      setTotalUnitsStaked(Number(unitsStaked));
      setTotalUnitsWon(Number(unitsWon));
      setTotalUnitsLost(Number(unitsLost));
      setTotalUnitsReturned(Number(unitsReturned));
    }
  }, [pastBets, todaysBets]);

  return (
    <div className="flex flex-col justify-center items-center w-full pt-16 md:pt-20 pb-10 md:pb-12">
      <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter">
        Record To Date
      </h1>
      <p className="font-Times text-tertiary text-base italic tracking-tighter pt-4">
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

        {/* Voids */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-thin text-8xl md:text-9xl text-primary tracking-tighter">
            {voids}
          </p>
          <p className="font-Times text-lg md:text-2xl text-secondary italic tracking-tight">
            pushed
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-4">
        <p className="font-Times text-lg text-tertiary">
          – <span className="text-xl text-secondary font-bold">{roi}%</span>{" "}
          ROI.
        </p>
        <p className="font-Times text-lg text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-bold">
            {totalUnitsStaked}
          </span>{" "}
          total units staked.
        </p>
        <p className="font-Times text-lg text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-bold">
            {totalUnitsWon}
          </span>{" "}
          total units won.
        </p>
        <p className="font-Times text-lg text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-bold">
            {totalUnitsLost}
          </span>{" "}
          total units lost.
        </p>
        <p className="font-Times text-lg text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-bold">
            {totalUnitsReturned}
          </span>{" "}
          total units returned.
        </p>
        <p className="font-Times text-lg text-tertiary">
          –{" "}
          <span className="text-xl text-secondary font-bold">
            {profit > 0 ? `+${profit}` : `${profit}`}
          </span>{" "}
          total units profited.
        </p>

        <p className="font-Times text-tertiary text-base italic tracking-tighter pt-8">
          Stats calculated based on graded wagers.
        </p>
      </div>
    </div>
  );
};

export { Record };
