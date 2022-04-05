import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

// Scrape reddit comments
const scrapeReddit = async (_: NextApiRequest, res: NextApiResponse) => {
  const now = moment(new Date()).format("h:mm A");
  console.log(`*** CALLED AT ${now}`);
  return res.status(200).json({ success: "true" });
};

// Main
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  const { ACTION_KEY } = req.headers.authorization?.split(" ")[1];

  try {
    if (ACTION_KEY === process.env.APP_KEY) {
      // Scrape reddit comments
      return scrapeReddit(req, res);
    } else {
      return res.status(401);
    }
  } catch (err) {
    return res.status(405).end("Request not allowed.");
  }
};

export default handler;
