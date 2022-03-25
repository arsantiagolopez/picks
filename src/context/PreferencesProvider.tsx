import moment from "moment";
import React, { FC, ReactNode, useEffect, useState } from "react";
import useSWR from "swr";
import { UserEntity } from "../types";
import { PreferencesContext } from "./PreferencesContext";

interface Props {
  children: ReactNode;
}

const PreferencesProvider: FC<Props> = ({ children }) => {
  const [oddsFormat, setOddsFormat] = useState<string>(
    process.env.NEXT_PUBLIC_PREFERRED_ODDS || "decimal"
  );
  const [sortBy, setSortBy] = useState<string>(
    process.env.NEXT_PUBLIC_PREFERRED_SORTBY || "units"
  );
  const [potdReleaseTime, setPotdReleaseTime] = useState<string | null>(null);
  const [isBetsColored, setIsBetsColored] = useState<boolean>(false);

  const { data: preferences } = useSWR<UserEntity>("/api/tipster");

  const toggleOdds = () =>
    setOddsFormat(oddsFormat === "decimal" ? "american" : "decimal");

  const SUPPORTED_SPORTS = [
    "tennis",
    "football",
    "mma",
    "soccer",
    "hockey",
    "multi",
  ];

  const SUPPORTED_TOURNAMENTS = [
    "atp",
    "wta",
    "itf",
    "laver",
    "australian-open",
    "roland-garros",
    "us-open",
    "wimbledon",
  ];

  useEffect(() => {
    if (preferences) {
      const { potdReleaseTime: releaseTime, isBetsColored } = preferences;

      // Update time state
      const formatedTime = moment(releaseTime).format("h:mm A");
      setPotdReleaseTime(formatedTime);

      // Update bet slip colors
      setIsBetsColored(isBetsColored);
    }
  }, [preferences]);

  return (
    <PreferencesContext.Provider
      value={{
        SUPPORTED_SPORTS,
        SUPPORTED_TOURNAMENTS,
        oddsFormat,
        sortBy,
        potdReleaseTime,
        isBetsColored,
        setPotdReleaseTime,
        setSortBy,
        setOddsFormat,
        toggleOdds,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export { PreferencesProvider };
