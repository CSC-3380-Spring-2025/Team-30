import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type EventData = {
  title: string;
  event_date: string; // You can change this to Date if needed
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving events" });
    }
  } else if (req.method === "POST") {
    const { title, event_date }: EventData = req.body;

    try {
      const newEvent = await prisma.event.create({
        data: { title, event_date: new Date(event_date) },
      });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: "Error creating event" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
