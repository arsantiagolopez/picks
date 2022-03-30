import moment from "moment";
import React, { FC } from "react";
import { BetEntity } from "../../../types";

interface Props {
  bet: BetEntity;
}

const Reasoning: FC<Props> = ({ bet }) => {
  const { startTime, reasoning, status, stake, returns } = bet;

  const fromNow = moment().to(moment(startTime));
  const isPast = moment(startTime).isBefore();

  const withBreaks = reasoning
    ?.split("\n")
    .map((str) => <p className="my-2 md:my-3">{str}</p>);

  return (
    <div className="flex flex-col justify-between">
      <p className="text-primary text-sm md:text-base text-justify">
        {withBreaks}
      </p>
      <p className="text-primary text-xs md:text-sm pt-2 md:pt-6">
        {status === "pending" ? (
          `Match ${isPast ? "started" : "starts"} ${fromNow}`
        ) : (
          <span>
            Result:
            <b className="ml-1.5">
              {status === "won"
                ? `Won ${returns.toFixed(2)}u`
                : status === "lost"
                ? `Lost ${stake}u`
                : status === "push"
                ? "Pushed."
                : null}
            </b>
          </span>
        )}
      </p>
    </div>
  );
};

export { Reasoning };
