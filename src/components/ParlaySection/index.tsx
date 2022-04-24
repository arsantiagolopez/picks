import React, { FC } from "react";
import { ParlayBetEntity } from "../../types";
import { ParlayBets } from "../ParlayBets";

interface Props {
  bets: ParlayBetEntity[];
  isAdmin: boolean;
  isTomorrow?: boolean;
}

const ParlaySection: FC<Props> = (props) => (
  <div className="flex flex-col w-full md:pb-10">
    <div className="flex flex-col w-full justify-center items-center font-Basic text-primary dark:text-white pb-6">
      {/* <p className="text-lg md:text-xl tracking-tighter">
        The Highly Requested
      </p>
      <h1 className="text-4xl md:text-6xl tracking-tighter -mr-8">
        Parlay Section 🔥
</h1> */}
      <h1 className="text-4xl md:text-6xl tracking-tighter">Parlays</h1>
    </div>

    <ParlayBets {...props} />
  </div>
);

export { ParlaySection };
