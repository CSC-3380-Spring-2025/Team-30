import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Button from "@/components/Button/button";

function Events() {
    return (
        <>
            <div
                style={{
                    width: "80%",
                    margin: "0 auto",
                    padding: "20px",
                    color: "white",
                    backgroundColor: "black",
                    boxShadow: "0 0 12px rgba(34, 34, 34, 0.6), 0 0 24px rgba(13, 13, 13, 0.2)" 
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        start: "prev,next", // previous and next buttons
                        center: "title", // month year title
                        end: "timeGridDay,timeGridWeek,dayGridMonth" // day, week, month buttons
                    }}
                />
            </div>

            <div
                style={{
                    margin: "20px 0",
                    display: "flex",
                    justifyContent: "center",
                    
                }}
            >
                <Button text="Create Event" />
            </div>
        </>
    );
}

export default Events;
