import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Bet } from "../../../models/Bet";
import { BetEntity, UserSession } from "../../../types";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get all bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @param {string} userId - User ID.
 * @returns an array of objects of all user's bets.
 */
const getAllBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  try {
    const bets = await Bet.find();
    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get todays bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @param {string} userId - User ID.
 * @returns an array of objects of all user's bets.
 */
const getTodaysBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  const today = moment().startOf("day");

  try {
    const bets = await Bet.find({
      startTime: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
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
 * @param {string} userId - User ID.
 * @returns an array of objects of all user's bets.
 */
const getTomorrowsBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  const tomorrow = moment().add(1, "day").startOf("day");

  try {
    const bets = await Bet.find({
      startTime: {
        $gte: tomorrow.toDate(),
        $lte: moment(tomorrow).endOf("day").toDate(),
      },
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
 * @param {string} userId - User ID.
 * @returns an array of objects of all user's bets.
 */
const getPastBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<BetEntity[] | void> => {
  const today = moment().startOf("day");

  try {
    const bets = await Bet.find({
      startTime: {
        $lte: moment(today).toDate(),
      },
    });
    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get record of wins, losses and draws.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @param {string} userId - User ID.
 * @returns an array of of wins, losses and draws.
 */
const getRecord = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<[number, number, number] | void> => {
  try {
    const bets = await Bet.find({ status: { $ne: "pending" } });

    const wins = bets.filter(({ status }) => status === "won").length;
    const losses = bets.filter(({ status }) => status === "lost").length;
    const voids = bets.filter(({ status }) => status === "void").length;

    return res.status(200).json([wins, losses, voids]);
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
  userId: string
): Promise<BetEntity | void> => {
  const { stake, odds } = body as BetEntity;

  const returns = Number((stake * odds.decimal - stake).toFixed());

  try {
    const bet = new Bet({ ...body, returns });

    bet.userId = userId;
    await bet.save();

    return res.status(200).json(bet);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Main
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = (await getSession({ req })) as unknown as UserSession;
  const { method, query } = req;

  const userId = data?.user.id;

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
        case "record":
          return getRecord(req, res);
        default:
          return getAllBets(req, res);
      }

    case "POST":
      return createBet(req, res, userId);
    default:
      return res
        .status(405)
        .end({ success: false, error: `Method ${method} Not Allowed` });
  }
};

export default handler;
