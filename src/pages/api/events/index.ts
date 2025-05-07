import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function verifyToken(req: NextApiRequest) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token missing");
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as unknown; // First cast to unknown
    const decodedPayload = decoded as { role: string }; // Then cast to the expected type

    return decodedPayload.role;
  } catch (err) {
    throw new Error("Invalid or missing token");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    console.log("Entering get events API call");
    try {
      const events = await prisma.event.findMany({
        select: {
          id: true,
          title: true,
          event_date: true,
          end_date: true,
        },
      });

      const formattedEvents = events.map((event) => ({
        id: event.id.toString(),
        title: event.title,
        start: event.event_date.toISOString(),
        end: event.end_date.toISOString(),
      }));

      res.status(200).json(formattedEvents);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving events", error });
    }
  }

  // POST - Create Event (officers only)
  else if (req.method === "POST") {
    try {
      const role = await verifyToken(req);
      if (role !== "officer") {
        return res.status(403).json({ message: "Unauthorized: officer access required" });
      }

      const { title, start, end } = req.body;
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid start or end date" });
      }

      if (startDate >= endDate) {
        return res.status(400).json({ message: "Start date must be before end date" });
      }

      const newEvent = await prisma.event.create({
        data: {
          title,
          event_date: startDate,
          end_date: endDate,
        },
      });

      res.status(201).json({
        id: newEvent.id.toString(),
        title: newEvent.title,
        event_date: newEvent.event_date.toISOString(),
        end_date: newEvent.end_date.toISOString(),
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating event", error });
    }
  }

  // DELETE - Delete Event (officers only)
  else if (req.method === "DELETE") {
    try {
      const role = await verifyToken(req);
      if (role !== "officer") {
        return res.status(403).json({ message: "Unauthorized: officer access required" });
      }

      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: "Event ID is required" });
      }

      const event = await prisma.event.findUnique({
        where: { id: parseInt(id) },
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const deletedEvent = await prisma.event.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json(deletedEvent);
    } catch (error) {
      res.status(500).json({ message: "Error deleting event", error });
    }
  }

  // Method not allowed
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
