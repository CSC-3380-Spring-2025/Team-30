import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Button from "@/components/Button/button"
// run npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction

function Events() {
  return (
    <>
      <div style = {{
        width: "80%",
        height: "50%",
        margin: "0 auto",
        padding: "20px"
      }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar = {{
            start: "prev,next", // previous and next buttons
            center: "title", // month year title
            end: "timeGridDay,timeGridWeek,dayGridMonth" // day, week, month buttons
        }}
      />
      </div>

      <div style = {{
        margin: "20px 0",
        display: "flex",
        justifyContent: "center",
      }}>
      <Button
      text="Create Event"
      />
      </div>
    </>
  );
}
export default Events;