// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserDetail } from "~/api/users/_userId@number/index";

type Data = UserDetail;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = Number.parseInt(req.query.userId as string);
  res.status(200).json({
    id: userId,
    name: "Jhon Doe",
  });
}
