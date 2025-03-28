import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Button from "@/components/Button/button"
// run npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction

function Events() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar = {{
            start: "prev,next", // previous and next buttons
            center: "title", // month year title
            end: "timeGridDay,timeGridWeek,dayGridMonth" // day, week, month buttons
        }}
      />
      <Button
      text="Create Event"
      />
    </>
  );
}
export default Events;