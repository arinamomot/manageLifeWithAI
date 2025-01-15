"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export default function CalendarPage() {
  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={[
        { title: "event 1", date: "2019-04-01" },
        { title: "event 2", date: "2019-04-02" },
      ]}
      dateClick={handleDateClick}
    />
  );
}
