import moment from "moment";
import React, { FC } from "react";
import { BetEntity } from "../../../types";

interface Props {
  bet: BetEntity;
}

const Reasoning: FC<Props> = ({ bet }) => {
  const { startTime, reasoning, status, stake, returns } = bet;

  const fromNow = moment().to(moment(startTime));

  return (
    <div className="flex flex-col justify-between">
      <p className="text-primary text-sm md:text-base">{reasoning}</p>
      <p className="text-primary text-xs md:text-sm pt-2 md:pt-6">
        {status === "won"
          ? `Result: Won ${returns.toFixed(2)}u`
          : status === "lost"
          ? `Result: Lost ${stake}u`
          : `Match starts ${fromNow}`}
      </p>
    </div>
  );
};

export { Reasoning };
