import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { User } from "../../../models/User";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get my user profile.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an user object.
 */
const getMyUser = async (
  _: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Update my user profile.
 * @param {object} req - http request, including the body.
 * @param {object} res - http response.
 * @returns an updated user object.
 */
const updateMyUser = async (
  { body }: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  let { potdReleaseTime } = body;

  if (potdReleaseTime) {
    // Store date in UTC format
    potdReleaseTime = moment.utc(potdReleaseTime).toDate();
    body.potdReleastTime = potdReleaseTime;
  }

  try {
    const user = await User.findByIdAndUpdate(userId, body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Main
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getSession({ req });
  const { method } = req;

  const userId = data?.user.id;

  if (!userId) {
    return res.status(405).end("Must be authenticated.");
  }

  await dbConnect();

  switch (method) {
    case "GET":
      return getMyUser(req, res, userId);
    case "PUT":
      return updateMyUser(req, res, userId);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
