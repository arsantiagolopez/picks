import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { BetEntity } from "../types";

interface Response {
  bets: BetEntity[];
  setBets: Dispatch<SetStateAction<BetEntity[]>>;
}

interface Props {
  /* Get all bets */
  all?: boolean;
  /* Get today's bets */
  todays?: boolean;
  /* Get tomorrow's bets */
  tomorrows?: boolean;
  /* Get all past bets */
  past?: boolean;
  /* Get all graded bets */
  graded?: boolean;
}

const useBets = ({
  all,
  todays,
  tomorrows,
  past,
  graded,
}: Props = {}): Response => {
  const [bets, setBets] = useState<BetEntity[]>([]);
  const [query, setQuery] = useState<string | null>(null);

  const { data } = useSWR<BetEntity[]>(query && `/api/bets?set=${query}`);

  // Get query id based on desired set
  useEffect(() => {
    if (data) {
      setBets(data);
    }
  }, [data]);

  // Get query based on passed arg
  useEffect(() => {
    if (all) setQuery("all");
    if (todays) setQuery("todays");
    if (tomorrows) setQuery("tomorrows");
    if (past) setQuery("past");
    if (graded) setQuery("graded");
  }, []);

  return { bets, setBets };
};

export { useBets };
