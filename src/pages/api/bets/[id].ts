import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Bet } from "../../../models/Bet";
import { BetEntity } from "../../../types";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get bet object of ID.
 * @param {object} req - http request, including query.
 * @param {object} res - http response.
 * @returns an bet object.
 */
const getBetById = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { id } = query;

  try {
    const bet = await Bet.findById(id);
    return res.status(200).json(bet);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Update bet by ID.
 * @param {object} req - http request, including body and query.
 * @param {object} res - http response.
 * @returns an updated bet object.
 */
const updateBet = async (
  { body, query }: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = query;

  // Update bet status
  if (body?.status !== "pending") {
    console.log(body);
    try {
      let { stake, odds } = body as BetEntity;

      const returns = Number((stake * odds.decimal - stake).toFixed(2));
      body.returns = returns;

      const bet = await Bet.findByIdAndUpdate(id, body);

      return res.status(200).json(bet);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  // Update bet entity
  else {
    let { sport, stake, odds, startTime } = body as BetEntity;

    const returns = Number((stake * odds.decimal - stake).toFixed(2));

    // Store date in UTC format
    startTime = moment.utc(startTime).toDate();

    try {
      let bet = await Bet.findByIdAndUpdate(id, {
        ...body,
        returns,
        startTime,
      });

      if (sport !== "tennis") {
        // Delete tournament data if not tennis
        bet = await Bet.findByIdAndUpdate(id, {
          $unset: { tournament: "", tournamentName: "" },
        });
      }

      return res.status(200).json(bet);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
};

/**
 * Delete bet by ID.
 * @param {object} req - http request, including query.
 * @param {object} res - http response.
 * @returns a success message on deletion.
 */
const deleteBet = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { id } = query;

  try {
    await Bet.findByIdAndDelete(id);
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
