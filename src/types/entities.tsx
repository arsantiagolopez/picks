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
  userId: ObjectId;
}

export interface OddsEntity {
  american: number;
  decimal: number;
}

export interface UserSession {
  expires: string;
  user: UserEntity;
}
