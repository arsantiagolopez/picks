import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ParlayBet } from "../../../models/ParlayBet";
import { BetEntity, ParlayBetEntity } from "../../../types";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get all parlay bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's parlay bets.
 */
const getAllBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<ParlayBetEntity[] | void> => {
  try {
    let bets: BetEntity[] = await ParlayBet.find();

    console.log(bets);

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
 * Get todays parlay bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's parlay bets.
 */
const getTodaysBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<ParlayBetEntity[] | void> => {
  const today = moment().utcOffset(-5).startOf("day");

  try {
    const bets: ParlayBetEntity[] = await ParlayBet.find({
      startTime: {
        $gte: today,
        $lte: moment(today).endOf("day"),
      },
    });

    return res.status(200).json(bets);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Get tomorrows parlay bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's parlay bets.
 */
const getTomorrowsBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<ParlayBetEntity[] | void> => {
  const tomorrow = moment().utcOffset(-5).add(1, "day").startOf("day");

  try {
    const bets: ParlayBetEntity[] = await ParlayBet.find({
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
 * Get past parlay bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's parlay bets.
 */
const getPastBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<ParlayBetEntity[] | void> => {
  const today = moment().utcOffset(-5).startOf("day");

  try {
    let bets: ParlayBetEntity[] = await ParlayBet.find({
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
 * Get all graded parlay bets.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an array of objects of all user's graded parlay bets.
 */
const getGradedBets = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<ParlayBetEntity[] | void> => {
  try {
    let bets: ParlayBetEntity[] = await ParlayBet.find({
      status: { $ne: "pending" },
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
    const bets = await ParlayBet.find({ status: { $ne: "pending" } });

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
 * Create parlay.
 * @param {object} req - http request, including the body.
 * @param {object} res - http response.
 * @param {string} userId - User ID.
 * @returns an object of the newly created parlay.
 */
const createBet = async (
  { body }: NextApiRequest,
  res: NextApiResponse,
  userId?: string
): Promise<ParlayBetEntity | void> => {
  let { stake, odds, startTime } = body as BetEntity;

  const returns = Number((stake * odds.decimal - stake).toFixed(2));

  // Store date in UTC format
  startTime = moment.utc(startTime).toDate();

  try {
    const bet = new ParlayBet({ ...body, returns, startTime });

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

      // What set of parlay bets to fetch
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
