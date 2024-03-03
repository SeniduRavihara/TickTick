import React, { useState } from "react";

type Event = {
  title: string;
  date: Date;
  duration: number; // Duration in hours (fractional allowed)
};

const DayView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // Array to hold event data
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date

  const hours: string[] = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]; // Define working hours with 30-minute intervals

  const handleEventClick = (event: Event) => {
    // Handle event click logic (e.g., display details in a modal)
    console.log("Event clicked:", event);
  };

  const renderEvent = (event: Event, top: number) => (
    <div
      className="event bg-green-500 text-white px-2 py-1 rounded"
      style={{ top: `${top}px`, height: `${event.duration * 30}px` }}
      onClick={() => handleEventClick(event)}
    >
      {event.title}
    </div>
  );

  // ---------------------------------------
  const addEvent = (title: string) => {
    const newEvent: Event = {
      title,
      date: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        14,
        0
      ), // Set time to 2.00 PM
      duration: 1, // 1 hour duration
    };
    setEvents([...events, newEvent]);
  };
  // ---------------------------------------

  const renderDay = () => {
    const schedule: React.ReactNode[] = [];
    const currentTime = new Date(); // Get the current time

    for (const hour of hours) {
      const [hourString, minuteString] = hour.split(":");
      const hourValue = parseInt(hourString, 10);
      const minuteValue = parseInt(minuteString, 10);
      const time = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hourValue,
        minuteValue
      );

      const existingEvent = events.find(
        (event) => event.date.getTime() === time.getTime()
      );

      // Calculate the position of the current time line
      const currentTimePosition =
        currentTime.getHours() * 60 + currentTime.getMinutes();
      const linePosition = (currentTimePosition - 7 * 60) * 2;

      // Add a unique key for the placeholder div element
      const key = `gap-${hour}`;

      if (existingEvent) {
        schedule.push(
          renderEvent(
            existingEvent,
            (hourValue - 7) * 60 + minuteValue,
          )
        );
      } else {
        schedule.push(
          <div
            key={key}
            className={`h-1 bg-gray-300 ${
              linePosition === hourValue * 60 + minuteValue
                ? "bg-blue-400" // Highlight current time slot
                : ""
            }`}
          />
        );
      }
    }
    return schedule;
  };

  return (
    <div className="day-view bg-gray-100 flex flex-col">
      <header className="bg-white flex justify-between p-2">
        {/* Navigation buttons (previous/next day) and date display */}
        <button
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.setDate(selectedDate.getDate() - 1))
            )
          }
          className="text-blue-500 hover:text-blue-700"
        >
          Previous
        </button>
        <span className="text-xl">{selectedDate.toLocaleDateString()}</span>
        <button
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.setDate(selectedDate.getDate() + 1))
            )
          }
          className="text-blue-500 hover:text-blue-700"
        >
          Next
        </button>
      </header>
      <div className="flex flex-row">
        <div className="w-15 flex flex-col border-r border-gray-300">
          {hours.map((hour) => (
            <div
              key={hour}
              className="text-right px-2 py-1 border-b border-gray-300"
            >
              {hour}
            </div>
          ))}
        </div>
        <div className="flex-grow flex flex-col">
          {Array(24 * 2)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="h-1 bg-gray-300" />
            ))}
          {renderDay()}
          <button
            onClick={() => addEvent("Sleeping")}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayView;
