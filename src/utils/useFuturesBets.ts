import { useEffect, useState } from "react";
import useSWR from "swr";
import { BetEntity } from "../types";

interface Response {
  bets: BetEntity[];
}

const useFuturesBets = (): Response => {
  const [bets, setBets] = useState<BetEntity[]>([]);

  const { data } = useSWR<BetEntity[]>("/api/bets?set=futures");

  // Get query id based on desired set
  useEffect(() => {
    if (data) {
      setBets(data);
    }
  }, [data]);

  return { bets };
};

export { useFuturesBets };
