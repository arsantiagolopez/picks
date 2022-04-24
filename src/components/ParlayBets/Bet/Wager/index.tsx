import React, { FC } from "react";
import { ParlayBetEntity } from "../../../../types";
import { DesktopWager } from "./DesktopWager";
import { MobileWager } from "./MobileWager";

interface Props {
  bet: ParlayBetEntity;
  isAdmin: boolean;
  isBetsColored: boolean;
}

const Wager: FC<Props> = ({ bet, isAdmin, isBetsColored }) => {
  const mobileWagerProps = { bet, isAdmin, isBetsColored };
  const desktopWagerProps = { bet, isAdmin, isBetsColored };

  return (
    <div className="w-full p-1 md:p-0 truncate">
      <div className="flex md:hidden w-full">
        <MobileWager {...mobileWagerProps} />
      </div>
      <div className="hidden md:flex w-full">
        <DesktopWager {...desktopWagerProps} />
      </div>
    </div>
  );
};

export { Wager };
