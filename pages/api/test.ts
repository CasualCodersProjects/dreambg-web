import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // send json response
  res.status(200).json({ name: "John Doe" });
}
