import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { ParlayBet } from "../../../models/ParlayBet";
import {
  BetEntity,
  BetStats,
  OddsEntity,
  ParlayBetEntity,
} from "../../../types";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get graded parlay bets stats.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns a stats object of all possible stats.
 */
const getStats = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetStats | void> => {
  try {
    // Get only graded parlay bets
    let bets: ParlayBetEntity[] = await ParlayBet.find({
      status: { $ne: "pending" },
    });

    // Sort bets by date (newest to oldest)
    bets.sort((a, b) =>
      b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
    );

    // Let the fun begin

    // Numbers
    let wins = 0;
    let losses = 0;
    let pushes = 0;
    let unitsWon = 0;
    let unitsLost = 0;
    let unitsStaked = 0;
    let unitsReturned = 0;
    let totalPicks = 0;
    let totalProfit = 0;
    let roi = 0;
    let winPercentage = 0;

    // Date stats
    let daysTracked = 0;

    // Streak stats
    let currentStreak = 0;
    let longestStreak = 0;
    let lastFiveStreak = "";

    // Odds stats
    let avgOdds: OddsEntity | undefined;
    let decimalOddsSum = 0;

    for (const [index, bet] of bets.entries()) {
      const { status, returns, stake, odds } = bet as BetEntity;

      if (status === "won") {
        wins++;
        unitsWon += returns;
        unitsReturned += stake;
        currentStreak++;
      }
      if (status === "lost") {
        losses++;
        unitsLost += stake;
        currentStreak = 0;
      }
      if (status === "void") {
        pushes++;
        unitsReturned += stake;
      }

      // Track longest streak of wins
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }

      // Get last five picks streak (first five bets)
      if (index < 5) {
        const letter = status === "won" ? "W" : status === "lost" ? "L" : "P";
        lastFiveStreak = letter + lastFiveStreak;
      }

      decimalOddsSum += odds.decimal;
      unitsStaked += stake;
      totalPicks++;
    }

    // Calculate win percentage
    winPercentage = Number(((wins / totalPicks) * 100).toFixed());

    // Calculate profit
    totalProfit = Number((unitsWon - unitsLost).toFixed(2));

    // Calculate roi
    roi = Number(((totalProfit / unitsStaked) * 100).toFixed(2));

    // Calculate days since first pick
    const oldestDate = bets[bets.length - 1].startTime;
    daysTracked = moment().diff(oldestDate, "days");

    // Odds stats
    const avgDecimal = decimalOddsSum / totalPicks;
    const avgAmerican =
      avgDecimal >= 2
        ? (avgDecimal - 1) * 100
        : avgDecimal > 1 && avgDecimal < 2
        ? -100 / (avgDecimal - 1)
        : 0;

    avgOdds = {
      american: Number(avgAmerican.toFixed()),
      decimal: Number(avgDecimal.toFixed(2)),
    };

    const stats: BetStats = {
      wins,
      losses,
      pushes,
      unitsWon,
      unitsLost,
      unitsStaked,
      unitsReturned,
      totalPicks,
      totalProfit,
      roi,
      winPercentage,
      daysTracked,
      avgOdds,
      longestStreak,
      lastFiveStreak,
    };

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Main
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return getStats(req, res);
    default:
      return res
        .status(405)
        .end({ success: false, error: `Method ${method} Not Allowed` });
  }
};

export default handler;
