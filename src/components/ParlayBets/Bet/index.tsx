import React, { FC } from "react";
import { ParlayBetEntity } from "../../../types";
import { Dropdown } from "../../Dropdown";
import { Reasoning } from "./Reasoning";
import { Wager } from "./Wager";

interface Props {
  bet: ParlayBetEntity;
  isAdmin: boolean;
  isBetsColored: boolean;
}

const Bet: FC<Props> = ({ bet, isAdmin, isBetsColored }) => {
  const wagerProps = { isAdmin, isBetsColored };
  return (
    <div className="w-full mb-2 md:mb-6">
      <Dropdown
        Button={<Wager bet={bet} {...wagerProps} />}
        Panel={<Reasoning bet={bet} />}
        bet={bet}
        isAdmin={isAdmin}
        isParlay
      />
    </div>
  );
};

export { Bet };
