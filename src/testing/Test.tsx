import React, { useState } from 'react';

interface Event {
  title: string;
  date: Date;
  duration: number; // Duration in hours (fractional allowed)
  id?: string; // Optional ID for event identification
}

const DayScheduler: React.FC = () => {
  // Define working hours as an array of objects with start and end times
  const workingHours = [
    { start: 7, end: 18 }, // Monday - Friday (excluding lunch break)
    { start: 9, end: 13 }, // Saturday (lunch break between 13:00 and 14:00)
    { start: 10, end: 14 }, // Sunday (lunch break between 14:00 and 15:00)
  ];

  const [events, setEvents] = useState<Event[]>([]); // Array to hold event data
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Selected event for editing (if any)

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event); // Open event editor when event is clicked
  };

  const handleEventSave = (event: Event) => {
    // Update event details in the list
    setEvents((prevEvents) =>
      prevEvents.map((e) => (e.id === event.id ? event : e))
    );
    setSelectedEvent(null); // Close event editor after saving
  };

  const handleEventDelete = (eventId: string) => {
    // Remove event from the list
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
  };

  // Helper function to generate a unique ID for new events
  const generateEventId = () => Math.random().toString(36).substring(2, 15);

  const renderEvent = (event: Event, top: number) => (
    <div
      className={`event bg-blue-500 text-white px-2 py-1 rounded shadow ${
        selectedEvent?.id === event.id ? 'bg-blue-700' : ''
      }`} // Highlight selected event
      style={{ top: `${top}px`, height: `${event.duration * 30}px` }}
      onClick={() => handleEventClick(event)}
    >
      {event.title}
      {selectedEvent?.id === event.id && (
        <div className="event-actions absolute top-0 right-0 flex">
          <button onClick={() => handleEventSave(event)}>Save</button>
          <button onClick={() => handleEventDelete(event.id)}>Delete</button>
        </div>
      )}
    </div>
  );

  const renderDay = () => {
    const schedule: React.ReactElement[] = [];
    const selectedDay = selectedDate.getDay(); // Get the day of the week (0-6)

    // Find the working hours for the selected day
    const currentWorkingHours = workingHours.find((hours) => selectedDay >= hours.start && selectedDay < hours.end);

    if (currentWorkingHours) {
      // Visualize working hours with background color
      for (let hour = currentWorkingHours.start; hour < currentWorkingHours.end; hour += 0.5) {
        const top = Math.floor(hour) * 60; // Calculate position based on full and half hours
        schedule.push(
          <div
            key={top}
            className={
              `h-0.5 ${hour >= currentWorkingHours.start && hour < currentWorkingHours.end ? 'bg-gray-200' : ''}`
            }
          />
        );
      }
    }

    // Render events on top of the working hours visualization
    return schedule.concat(renderEvents()); // Use .concat to prevent unnecessary re-renders
  };

  const renderEvents = () => {
    const schedule: React.ReactElement[] = [];
    for (const event of events) {
      const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      selectedDateStart.setHours(event.date.getHours());
      selectedDateStart.setMinutes(event.date.getMinutes());

      const top = Math.
