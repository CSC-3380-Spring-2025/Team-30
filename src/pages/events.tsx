import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid"; I don't think we'll need this?
import interactionPlugin from "@fullcalendar/interaction";
// run npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction

function Events() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar = {{
            start: "prev, next", // previous and next buttons
            center: "title", // believe it uses month year for title? 
            end: "timeGridDay, timeGridWeek, dayGridMonth" // day, week, month buttons
        }}
        //style={{
        //  width: "500000px",
        //  height: "500px"
       // }} // don't think fullcalendar supports style?
      />
      <button style = {{
        // using inline, not sure if there's a plan for a button componenet
        backgroundColor: "black",
        color: "white",
        width: "250px",
        height: "50px",
        marginTop: "30px"
      }}
      >Create Event</button>
    </>
    // this should work..? i don't see why not
  );
}
export default Events;