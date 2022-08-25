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
