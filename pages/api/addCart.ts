// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cart } = req.body;
  const result = await prisma.cart.create({
    data: {
      item: JSON.stringify(cart),
    },
  });
  res.status(200).json(result);
}
