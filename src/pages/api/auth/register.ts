import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: role || "member", // Default to "member"
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "User already exists" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
