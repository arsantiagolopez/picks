import moment from "moment-timezone";
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
  const [colorMode, setColorMode] = useState<string | null>(null);

  const { data: preferences } = useSWR<UserEntity>("/api/tipster");

  const toggleOdds = () =>
    setOddsFormat(oddsFormat === "decimal" ? "american" : "decimal");

  const toggleColorMode = () =>
    setColorMode(colorMode === "dark" ? "light" : "dark");

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
      const formattedTime = moment(releaseTime)
        .tz("America/Chicago")
        .format("h:mm A");
      setPotdReleaseTime(formattedTime);

      // Update bet slip colors
      setIsBetsColored(isBetsColored);
    }
  }, [preferences]);

  // Save colorMode in local storage on mount
  useEffect(() => {
    // SSR Check
    if (preferences && typeof window !== "undefined") {
      const key = "theme";
      const storage = localStorage.getItem(key);
      const storageValue = storage ? JSON.parse(storage) : null;

      // Color mode found in storage
      if (storageValue) {
        setColorMode(storageValue);
      }
      // No value found in localstorage, store for the first time
      else {
        const { defaultColorMode } = preferences;
        localStorage.setItem(key, JSON.stringify(defaultColorMode));
      }
    }
  }, [preferences]);

  // Update color mode in local storage
  useEffect(() => {
    if (typeof window !== "undefined" && colorMode) {
      const key = "theme";
      const storage = localStorage.getItem(key);
      const storageValue = storage ? JSON.parse(storage) : null;

      // Update color mode & store in localStorage
      if (storageValue && storageValue !== colorMode) {
        localStorage.setItem(key, JSON.stringify(colorMode));
      }
    }
  }, [toggleColorMode]);

  return (
    <PreferencesContext.Provider
      value={{
        SUPPORTED_SPORTS,
        SUPPORTED_TOURNAMENTS,
        oddsFormat,
        sortBy,
        potdReleaseTime,
        colorMode,
        isBetsColored,
        toggleColorMode,
        setPotdReleaseTime,
        setSortBy,
        setOddsFormat,
        toggleOdds,
      }}
    >
      {/* Enable dark mode */}
      <div
        className={`${
          colorMode === "dark" && "dark bg-primary dark:bg-primary"
        }`}
      >
        {children}
      </div>
    </PreferencesContext.Provider>
  );
};

export { PreferencesProvider };
