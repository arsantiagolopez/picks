import moment from "moment";
import React, { FC } from "react";
import { BetEntity } from "../../../types";

interface Props {
  bet: BetEntity;
}

const Reasoning: FC<Props> = ({ bet }) => {
  const {
    sport,
    startTime,
    tournament,
    tournamentName,
    reasoning,
    status,
    stake,
    returns,
  } = bet;

  const fromNow = moment().to(moment(startTime));
  const isPast = moment(startTime).isBefore();

  const withBreaks = reasoning?.split("\n").map((str, index) => (
    <p key={index} className="my-4 md:my-2">
      {str}
    </p>
  ));

  return (
    <div className="flex flex-col justify-between md:text-sm">
      {sport === "tennis" && (
        <p className="hidden md:block text-primary text-sm dark:text-fourth">
          <span className="uppercase">{tournament}</span> – {tournamentName}
        </p>
      )}

      <p className="text-primary text-sm md:text-base text-justify dark:text-white my-1 md:my-2">
        {withBreaks}
      </p>
      <p className="text-primary text-xs dark:text-fourth">
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
                : status === "void"
                ? "Pushed"
                : null}
            </b>
          </span>
        )}
      </p>
    </div>
  );
};

export { Reasoning };
