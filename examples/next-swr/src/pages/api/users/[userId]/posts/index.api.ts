// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserPostsIndex } from "~/api/users/_userId@number/posts";

type Data = UserPostsIndex;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const page = req.query.page as string;

  const posts: Data["posts"] = (() => {
    switch (page) {
      case "0":
        return [{ id: 1, title: "Kan-jin-cho" }];
      case "1":
        return [{ id: 2, title: "Tragety of Romeo and Juliet" }];
      case "2":
        return [{ id: 3, title: "Kok-seng-ya Gap-sen" }];
      default:
        return [
          {
            id: Number.parseInt(page!),
            title: `The ${page}th fox jumps over a lazy dog`,
          },
        ];
    }
  })();

  res.status(200).json({ posts });
}
