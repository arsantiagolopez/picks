import { createContext, Dispatch, SetStateAction } from "react";

interface ContextState {
  SUPPORTED_SPORTS: string[];
  SUPPORTED_TOURNAMENTS: string[];
  oddsFormat: string;
  sortBy: string;
  potdReleaseTime: string | null;
  colorMode: string | null;
  isBetsColored: boolean;
  toggleColorMode: () => void;
  setPotdReleaseTime: Dispatch<SetStateAction<string | null>>;
  setSortBy: Dispatch<SetStateAction<string>>;
  setOddsFormat: Dispatch<SetStateAction<string>>;
  toggleOdds: () => void;
}

const PreferencesContext = createContext<ContextState>({
  SUPPORTED_SPORTS: [],
  SUPPORTED_TOURNAMENTS: [],
  oddsFormat: process.env.NEXT_PUBLIC_PREFERRED_ODDS || "decimal",
  sortBy: process.env.NEXT_PUBLIC_PREFERRED_ODDS || "units",
  potdReleaseTime: null,
  colorMode: null,
  isBetsColored: false,
  toggleColorMode: () => {},
  setPotdReleaseTime: () => {},
  setSortBy: () => {},
  setOddsFormat: () => {},
  toggleOdds: () => {},
});

export { PreferencesContext };
