import Cors from "cors"
import { prisma } from "src/server/db/client"
import { NextApiRequest, NextApiResponse } from "next"

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["GET", "OPTIONS"],
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res)

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
