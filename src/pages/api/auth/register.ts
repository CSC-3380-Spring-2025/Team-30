import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, role } = req.body as {
      email: string;
      password: string;
      role?: string;
    };

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user: User = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: role || "member", // Default to "member" if no role is provided
        },
      });

      res.status(201).json(user);
    } catch { 
      res.status(500).json({ error: "User already exists" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
