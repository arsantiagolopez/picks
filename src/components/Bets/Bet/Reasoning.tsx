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
    isFutures,
  } = bet;

  const fromNow = moment().to(moment(startTime));
  const isPast = moment(startTime).isBefore();

  const isUpdated: string | null =
    // @ts-ignore
    bet?.createdAt !== bet?.updatedAt && status === "pending"
      ? // @ts-ignore
        moment(bet?.updatedAt).fromNow()
      : null;

  const withBreaks = reasoning?.split("\n").map((str, index) => (
    <p key={index} className="mb-4 mt-2 md:my-2">
      {str}
    </p>
  ));

  return (
    <div className="flex flex-col justify-between md:text-sm">
      {sport === "tennis" && (
        <p
          className={`hidden md:block text-sm ${
            isFutures
              ? status === "pending"
                ? "text-white"
                : "text-primary dark:text-white"
              : "text-primary dark:text-fourth"
          }`}
        >
          <span className="uppercase">{tournament}</span> – {tournamentName}
        </p>
      )}

      <div
        className={`text-sm md:text-base text-justify my-1 md:my-2 ${
          isFutures
            ? status === "pending"
              ? "text-white"
              : "text-primary dark:text-white"
            : "text-primary dark:text-white"
        }`}
      >
        {withBreaks}
      </div>

      {!!isUpdated && (
        <p
          className={`-mt-2 mb-3 md:mt-2 md:mb-4 text-xs italic ${
            isFutures
              ? status === "pending"
                ? "text-white"
                : "text-primary dark:text-white"
              : "text-fourth md:text-tertiary dark:text-fourth"
          }`}
        >
          Edited {isUpdated}
        </p>
      )}

      <p
        className={`text-xs ${
          isFutures
            ? status === "pending"
              ? "text-white"
              : "text-primary dark:text-white"
            : "text-primary dark:text-fourth"
        }`}
      >
        {status === "pending" && !isFutures ? (
          `Match ${isPast ? "started" : "starts"} ${fromNow}`
        ) : isFutures && status === "pending" ? (
          `${tournamentName} is ongoing.`
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
