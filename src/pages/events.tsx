import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Button from "@/components/Button/button";

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
}

interface CreatedEvent {
  id: string;
  title: string;
  event_date: string;
  end_date: string;
}

interface ApiError {
  message: string;
}

type DecodedToken = {
  email: string;
  role: string;
  exp: number;
};

function Events() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    duration: "",
  });
  const [isOfficer, setIsOfficer] = useState(false);

  // Decode JWT and check role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        console.log(decoded); // Check the decoded token to ensure the role is present
        if (decoded.role === "officer") {
          setIsOfficer(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json() as CalendarEvent[];
        console.log("Fetched events:", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    void fetchEvents();
  }, []);

  const handleDateClick = async (arg: DateClickArg) => {
    const title = prompt("Enter event title:");
    if (!title) return;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, date, startTime, duration } = formData;
    const [hours, minutes] = startTime.split(":").map(Number);
    const durationHours = Number(duration);

    if (isNaN(hours) || isNaN(minutes) || isNaN(durationHours)) {
      alert("Invalid input.");
      return;
    }

    const startDate = new Date(date);
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
        method: "POST", // or DELETE
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-user-role": isOfficer ? "officer" : "member", // or just "officer"
        },
        body: JSON.stringify({
          title: newEvent.title,
          start: newEvent.start,
          end: newEvent.end,
        }),
      });
      

      if (response.ok) {
        const created = await response.json() as CreatedEvent;
        setEvents((prev) => [
          ...prev,
          {
            id: created.id.toString(),
            title: created.title,
            start: created.event_date,
            end: created.end_date,
          },
        ]);
        setShowModal(false);
        setFormData({ title: "", date: "", startTime: "", duration: "" });
      } else {
        const errorData = await response.json() as ApiError;
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };
  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch("/api/events", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-user-role": isOfficer ? "officer" : "member",
        },
        body: JSON.stringify({ id: eventId }), // Updated here
      });
  
      if (response.ok) {
        const updatedEventsResponse = await fetch("/api/events");
        const updatedEventsData = await updatedEventsResponse.json();
        setEvents(
          updatedEventsData.map((event: any) => ({
            ...event,
            id: event.id.toString(),
          }))
        );
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event.");
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
          events={events}
          dateClick={(arg) => void handleDateClick(arg)}
        />
      </div>

      {isOfficer && (
        <div className="my-6 flex justify-center">
          <div onClick={() => setShowModal(true)}>
            <Button text="Create Event" />
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl text-black">
            <h2 className="text-xl font-semibold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="duration"
                type="number"
                placeholder="Duration (hours)"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Events;
