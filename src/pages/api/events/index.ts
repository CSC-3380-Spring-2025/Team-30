import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    console.log("Entering get events api call");
    try {
      const events = await prisma.event.findMany({
        select: {
          id: true,
          title: true,
          event_date: true,
          end_date: true,
        },
      });
      console.log("Fetched events:", events); // Log fetched events

      const formattedEvents = events.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.event_date.toISOString(), // Ensure it's in ISO string format
        end: event.end_date.toISOString(), // Ensure it's in ISO string format
      }));

      res.status(200).json(formattedEvents);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving events", error });
    }
  } else if (req.method === "POST") {
    const { title, start, end } = req.body;

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid start or end date" });
    }

    if (startDate >= endDate) {
      return res.status(400).json({ message: "Start date must be before end date" });
    }

    try {
      const newEvent = await prisma.event.create({
        data: {
          title,
          event_date: startDate,
          end_date: endDate,
        },
      });

      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: "Error creating event", error });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: "Event ID is required" });
    }
  
    console.log("Attempting to delete event with ID:", id);  // Log the ID
  
    try {
      // First, check if the event exists
      const event = await prisma.event.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!event) {
        // If the event doesn't exist, return a 404 error
        return res.status(404).json({ message: "Event not found" });
      }
  
      // If the event exists, proceed with deletion
      const deletedEvent = await prisma.event.delete({
        where: { id: parseInt(id) },
      });
  
      console.log("Deleted event:", deletedEvent);  // Log the deleted event
      res.status(200).json(deletedEvent);
    } catch (error) {
      console.error("Error deleting event:", error);  // Log the error
      res.status(500).json({ message: "Error deleting event", error });
    }
  }
  
 else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
