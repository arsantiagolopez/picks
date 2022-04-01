import { FC } from "react";
import { BetEntity } from "../../../types";

interface Props {
  bets: BetEntity[];
}

const DayGraph: FC<Props> = ({ bets }) => {
  console.log(bets);
  return <></>;
};

export { DayGraph };
