import React, { FC, useContext, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import useSWR from "swr";
import { PreferencesContext } from "../../context/PreferencesContext";
import { ParlayBetEntity } from "../../types";
import { Bet } from "./Bet";

interface Props {
  bets: ParlayBetEntity[];
  isTomorrow?: boolean;
  isAdmin: boolean;
  isPast?: boolean;
}

const ParlayBets: FC<Props> = ({ bets, isTomorrow, isAdmin, isPast }) => {
  const [profit, setProfit] = useState<number | null>(null);
  const [unitsPending, setUnitsPending] = useState<number | null>(null);

  const { isBetsColored } = useContext(PreferencesContext);

  const { data: record } = useSWR("/api/parlayBets?set=record");

  const formattedRecord = record
    ? `${record[0]}-${record[1]}-${record[2]}`
    : null;

  const betProps = { isAdmin, isBetsColored };

  // Calculate profit and units
  useEffect(() => {
    if (bets.length) {
      const unitsWon = bets
        .reduce(
          (acc, { status, returns }) =>
            status === "won" ? acc + returns : acc,
          0
        )
        .toFixed(2);
      const unitsLost = bets
        .reduce(
          (acc, { status, stake }) => (status === "lost" ? acc + stake : acc),
          0
        )
        .toFixed(2);
      const unitsInPlay = bets
        .reduce(
          (acc, { status, stake }) =>
            status === "pending" ? acc + stake : acc,
          0
        )
        .toFixed(2);

      const unitsProfit = (Number(unitsWon) - Number(unitsLost)).toFixed(2);

      setProfit(Number(unitsProfit));
      setUnitsPending(Number(unitsInPlay));
    }
  }, [bets]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* POTD Record - Net profit for the day */}
      {isTomorrow ? (
        <div className="font-Times text-secondary text-2xl mb-6 md:mb-10 dark:text-white">
          {formattedRecord}
        </div>
      ) : (
        <div className="font-Times text-secondary text-2xl mb-6 md:mb-10 dark:text-white">
          {profit
            ? profit > 0
              ? `+${profit}u profit `
              : `${profit}u profit `
            : unitsPending
            ? `(${unitsPending}u pending)`
            : null}
        </div>
      )}

      {/* Normal render for a small list */}
      {!isPast ? (
        bets?.length ? (
          <div className="w-full pb-20">
            {bets.map((bet) => (
              <Bet key={bet._id} bet={bet} {...betProps} />
            ))}
          </div>
        ) : (
          <div className="text-tertiary pb-20 text-center text-sm md:text-base dark:text-fourth">
            Still looking for locks...
          </div>
        )
      ) : null}

      {/* Virtuoso list for a potentially large list */}
      {isPast &&
        (bets?.length ? (
          <Virtuoso
            useWindowScroll
            data={bets}
            style={{ width: "100%", marginBottom: "7rem" }}
            itemContent={(_, bet) => (
              <Bet key={bet._id} bet={bet} {...betProps} />
            )}
          />
        ) : null)}
    </div>
  );
};

export { ParlayBets };
