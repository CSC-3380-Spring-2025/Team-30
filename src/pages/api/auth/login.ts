import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!; // Make sure this is set in your .env

<<<<<<< HEAD
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.role !== "officer") {
    return res.status(403).json({ message: "Only officers can log in" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.email.split("@")[0],
      role: user.role,
    },
  });
}
=======
interface User {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body as { email: string; password: string };

    const user = await prisma.user.findUnique({ where: { email } }) as User | null;

    if (!user || !(await (bcrypt.compare as (password: string, hash: string) => Promise<boolean>)(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
>>>>>>> origin/dev
