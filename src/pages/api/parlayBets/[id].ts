import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ParlayBet } from "../../../models/ParlayBet";
import { BetEntity, ParlayBetEntity } from "../../../types";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get parlay bet object of ID.
 * @param {object} req - http request, including query.
 * @param {object} res - http response.
 * @returns an parlay bet object.
 */
const getBetById = async (
  { query }: NextApiRequest,
  res: NextApiResponse
): Promise<ParlayBetEntity | null | void> => {
  const { id } = query;

  try {
    const bet: ParlayBetEntity | null = await ParlayBet.findById(id);
    return res.status(200).json(bet);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Update parlay bet by ID.
 * @param {object} req - http request, including body and query.
 * @param {object} res - http response.
 * @returns an updated parlay bet object.
 */
const updateBet = async (
  { body, query }: NextApiRequest,
  res: NextApiResponse
): Promise<ParlayBetEntity | null | void> => {
  const { id } = query;
  const { status } = body;

  // Update bet status
  if (status) {
    try {
      const bet: ParlayBetEntity | null = await ParlayBet.findByIdAndUpdate(
        id,
        { status }
      );
      return res.status(200).json(bet);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  // Update bet entity
  else {
    let { stake, odds, startTime } = body as BetEntity;

    const returns = Number((stake * odds.decimal - stake).toFixed(2));

    // Store date in UTC format
    startTime = moment.utc(startTime).toDate();

    try {
      let bet: ParlayBetEntity | null = await ParlayBet.findByIdAndUpdate(id, {
        ...body,
        returns,
        startTime,
      });

      return res.status(200).json(bet);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
};

/**
 * Delete parlay bet by ID.
 * @param {object} req - http request, including query.
 * @param {object} res - http response.
 * @returns a success message on deletion.
 */
const deleteBet = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { id } = query;

  try {
    await ParlayBet.findByIdAndDelete(id);
    return res.status(200).json({ message: "Succesfully deleted." });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Main
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getSession({ req });
  const { method } = req;

  if (!data?.user?.isAdmin) {
    return res.status(405).end("Must be an admin to update bets.");
  }

  await dbConnect();

  switch (method) {
    case "GET":
      return getBetById(req, res);
    case "PUT":
      return updateBet(req, res);
    case "DELETE":
      return deleteBet(req, res);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
