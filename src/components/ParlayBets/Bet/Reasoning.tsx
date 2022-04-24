import moment from "moment";
import React, { FC } from "react";
import { ParlayBetEntity } from "../../../types";

interface Props {
  bet: ParlayBetEntity;
}

const Reasoning: FC<Props> = ({ bet }) => {
  const { startTime, reasoning, status, stake, returns } = bet;

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
      <div className="text-white text-sm md:text-base text-justify my-1 md:my-2">
        {withBreaks}
      </div>

      {!!isUpdated && (
        <p className="-mt-2 mb-3 md:mt-2 md:mb-4 text-xs text-white italic">
          Edited {isUpdated}
        </p>
      )}

      <p className="text-white text-xs">
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
