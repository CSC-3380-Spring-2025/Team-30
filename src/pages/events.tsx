import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import Button from "@/components/Button/button";

type CalendarEvent = {
  title: string;
  start: string;
  end: string;
};

function Events() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events"); // API route for events
        const data = await response.json();
        console.log("Fetched events:", data);  // Log fetched events
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = async (arg: any) => {
    const title = prompt("Enter event title:");
    if (!title) return;

    const startTimeInput = prompt("Enter start time (e.g., 09:00):");
    if (!startTimeInput) return;

    const durationInput = prompt("Enter event duration in hours (e.g., 2):");
    if (!durationInput) return;

    const [hours, minutes] = startTimeInput.split(":").map(Number);
    const durationHours = Number(durationInput);

    if (isNaN(hours) || isNaN(minutes) || isNaN(durationHours)) {
      alert("Invalid time or duration input.");
      return;
    }

    const startDate = new Date(arg.date);
    startDate.setHours(hours);
    startDate.setMinutes(minutes);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + durationHours);

    const newEvent = {
      title,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const created = await response.json();
        setEvents((prev) => [
          ...prev,
          { title: created.title, start: created.event_date, end: created.end_date },
        ]);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  return (
    <>
      <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev,next",
            center: "title",
            end: "timeGridDay,timeGridWeek,dayGridMonth",
          }}
          events={events} // Pass events to FullCalendar
          dateClick={handleDateClick} // Handle date click to create new event
        />
      </div>

      <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
        <Button text="Create Event" />
      </div>
    </>
  );
}

export default Events;
