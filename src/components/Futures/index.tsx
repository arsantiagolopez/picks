import React, { FC, useContext } from "react";
import { PreferencesContext } from "../../context/PreferencesContext";
import { BetEntity } from "../../types";
import { Bet } from "../Bets/Bet";

interface Props {
  bets: BetEntity[];
  isAdmin: boolean;
}

const Futures: FC<Props> = ({ bets, isAdmin }) => {
  const { isBetsColored } = useContext(PreferencesContext);

  const betProps = { isAdmin, isBetsColored };

  return (
    <div className="flex flex-col w-full md:pb-10">
      <div className="flex flex-col w-full justify-center items-center font-Basic text-primary dark:text-white pb-12">
        <h1 className="text-4xl md:text-6xl tracking-tighter">Futures</h1>
      </div>

      {/* Picks */}
      {bets?.length ? (
        <div className="w-full pb-20">
          {bets.map((bet) => (
            <Bet key={bet._id} bet={bet} {...betProps} />
          ))}
        </div>
      ) : (
        <div className="text-tertiary pb-20 text-center text-sm md:text-base dark:text-fourth">
          No pending futures.
        </div>
      )}
    </div>
  );
};

export { Futures };
