import { prisma } from "src/server/db/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post_id = req.query.id

  const post = await prisma.post.findUnique({
    where: {
      id: post_id as string,
    },
  })

  if (post) {
    res.json(post)
  } else {
    res.status(404).json({ error: "Post not found" })
  }
}
