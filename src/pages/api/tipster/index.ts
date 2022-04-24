import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/User";
import { UserEntity } from "../../../types";
import { dbConnect } from "../../../utils/dbConnect";

/**
 * Get my user profile.
 * @param {object} req - http request.
 * @param {object} res - http response.
 * @returns an user object.
 */
const getTipsterPreferences = async (
  _: NextApiRequest,
  res: NextApiResponse
) => {
  let preferences: Partial<UserEntity> = {};

  try {
    let user = (await User.find({ isSuperAdmin: true })) as UserEntity[];

    // Check for superadmin to override other admins in case of Valhala
    if (!user.length) {
      user = (await User.find({ isAdmin: true })) as UserEntity[];
    }

    preferences = {
      potdReleaseTime: user[0]?.potdReleaseTime,
      isBetsColored: user[0]?.isBetsColored,
      defaultColorMode: user[0]?.defaultColorMode,
    };

    return res.status(200).json(preferences);
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
      return getTipsterPreferences(req, res);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
