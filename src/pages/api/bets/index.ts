import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Bet } from "../../../models/Bet";
import { BetEntity } from "../../../types";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get all bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's bets.
 */
const getAllBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  try {
    let bets: BetEntity[] = await Bet.find();

    // Sort bets by date (newest to oldest)
    bets.sort((a, b) =>
      b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
    );

    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get todays bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's bets.
 */
const getTodaysBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  const today = moment().utcOffset(-5).startOf("day");

  try {
    const bets: BetEntity[] = await Bet.find({
      $and: [
        {
          startTime: {
            $gte: today,
            $lte: moment(today).endOf("day"),
          },
        },
        { isFutures: { $ne: true } },
      ],
    });

    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get tomorrows bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's bets.
 */
const getTomorrowsBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  const tomorrow = moment().utcOffset(-5).add(1, "day").startOf("day");

  try {
    const bets: BetEntity[] = await Bet.find({
      $and: [
        {
          startTime: {
            $gte: tomorrow.toDate(),
            $lte: moment(tomorrow).endOf("day").toDate(),
          },
        },
        { isFutures: { $ne: true } },
      ],
    });

    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get past bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's bets.
 */
const getPastBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  const today = moment().utcOffset(-5).startOf("day");

  try {
    let bets: BetEntity[] = await Bet.find({
      startTime: {
        $lte: moment(today).toDate(),
      },
    });

    // Sort bets by date (newest to oldest)
    bets.sort((a, b) =>
      b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
    );

    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get all graded bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's graded bets.
 */
const getGradedBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  try {
    let bets: BetEntity[] = await Bet.find({ status: { $ne: "pending" } });

    // Sort bets by date (newest to oldest)
    bets.sort((a, b) =>
      b.startTime.valueOf() > a.startTime.valueOf() ? 1 : -1
    );

    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get record of wins, losses and draws.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of of wins, losses and draws.
 */
const getRecord = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<[number, number, number] | void> => {
  try {
    const bets: BetEntity[] = await Bet.find({ status: { $ne: "pending" } });

    let wins = 0;
    let losses = 0;
    let voids = 0;

    for (const { status } of bets) {
      if (status === "won") wins++;
      if (status === "lost") losses++;
      if (status === "void") voids++;
    }

    return res.status(200).json([wins, losses, voids]);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get ungraded futures bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of futures bets.
 */
const getFutures = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  try {
    // Get pending futures, or futures that were graded before the end of the day
    const bets: BetEntity[] = await Bet.find({
      status: "pending",
      isFutures: true,
    });

    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Create bet.
 * @param {object} req - http request, including the body.
 * @param {object} res - http response.
 * @param {string} userId - User ID.
 * @returns an object of the newly created bet.
 */
const createBet = async (
  { body }: NextApiRequest,
  res: NextApiResponse,
  userId?: string
): Promise<BetEntity | void> => {
  let { stake, odds, startTime } = body as BetEntity;

  const returns = Number((stake * odds.decimal - stake).toFixed(2));

  // Store date in UTC format
  startTime = moment.utc(startTime).toDate();

  try {
    const bet = new Bet({ ...body, returns, startTime });

    bet.userId = userId;
    await bet.save();

    return res.status(200).json(bet);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Main
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getSession({ req });
  const { method, query } = req;

  const userId = data?.user.id;
  const isAdmin = data?.user.isAdmin;

  await dbConnect();

  switch (method) {
    case "GET":
      const { set } = query;

      // What set of bets to fetch
      switch (set) {
        case "todays":
          return getTodaysBets(req, res);
        case "tomorrows":
          return getTomorrowsBets(req, res);
        case "past":
          return getPastBets(req, res);
        case "all":
          return getAllBets(req, res);
        case "graded":
          return getGradedBets(req, res);
        case "record":
          return getRecord(req, res);
        case "futures":
          return getFutures(req, res);
        default:
          return getAllBets(req, res);
      }

    case "POST":
      if (!isAdmin) {
        return res.status(405).end("Must be an admin to create bets.");
      }

      return createBet(req, res, userId);
    default:
      return res
        .status(405)
        .end({ success: false, error: `Method ${method} Not Allowed` });
  }
};

export default handler;
