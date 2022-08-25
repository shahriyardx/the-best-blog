import { prisma } from "src/server/db/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.post.findMany({
    where: {
      Category: {
        name: {
          equals: "CC",
        },
      },
    },
  })

  res.json(posts)
}
