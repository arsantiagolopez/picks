import { ObjectId } from "mongodb";

export interface UserEntity {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  emailVerified: Date;
  image: string;
  isAdmin: boolean;
  isSuperAdmin?: boolean;
  potdReleaseTime: Date;
  isBetsColored: boolean;
  defaultColorMode: string;
  createdAt: Date;
}

export interface BetEntity {
  _id: string;
  sport: string;
  tournament?: string;
  tournamentName?: string;
  home?: string;
  away?: string;
  startTime: Date;
  wager: string;
  odds: OddsEntity;
  stake: number;
  returns: number;
  reasoning?: string;
  status: string;
  isFutures?: boolean;
  userId: ObjectId;
}

export interface OddsEntity {
  american: number;
  decimal: number;
}

export interface IntervalAndProfit {
  interval: string;
  profit: number;
}

export interface BetStats {
  wins: number;
  losses: number;
  pushes: number;
  unitsWon: number;
  unitsLost: number;
  unitsStaked: number;
  unitsReturned: number;
  totalPicks: number;
  totalProfit: number;
  roi: number;
  winPercentage: number;
  daysTracked: number;
  avgOdds: OddsEntity;
  longestStreak: number;
  lastFiveStreak: string;
}
