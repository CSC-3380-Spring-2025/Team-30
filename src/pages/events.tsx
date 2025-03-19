import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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
      <button
      style = {{
        backgroundColor: "black",
        color: "white",
        width: "250px",
        height: "50px",
        marginTop: "30px"
      }}
      >
        Create Event
      </button>
    </>
  );
}
export default Events;