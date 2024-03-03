// import React from "react";
// import {
//   EventApi,
//   DateSelectArg,
//   EventClickArg,
//   EventContentArg,
//   formatDate,
// } from "@fullcalendar/core";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { INITIAL_EVENTS, createEventId } from "./event-utils";

// interface CalendarPageState {
//   weekendsVisible: boolean;
//   currentEvents: EventApi[];
//   isMobile: boolean;
// }

// export default class CalendarPage extends React.Component<
//   object,
//   CalendarPageState
// > {
//   state: CalendarPageState = {
//     weekendsVisible: true,
//     currentEvents: [],
//     isMobile: false,
//   };

//   componentDidMount() {
//     const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
//     this.setState({ isMobile });
//   }

//   render() {
//     const { weekendsVisible, isMobile } = this.state;

//     return (
//       <div className="demo-app">
//         {/* {this.renderSidebar()} */}
//         <div className="demo-app-main">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             footerToolbar={{
//               // Hide header on mobile for cleaner layout
//               ...(isMobile ? {} : { left: "prev today next", center: "title" }),
//               right: "dayGridMonth,timeGridWeek,timeGridDay",
//             }}
//             initialView={isMobile ? "listMonth" : "dayGridMonth"} // Use listMonth for mobile
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             weekends={weekendsVisible}
//             initialEvents={INITIAL_EVENTS}
//             select={this.handleDateSelect}
//             eventContent={renderEventContent}
//             eventClick={this.handleEventClick}
//             eventsSet={this.handleEvents}
//             // ... other mobile-specific options (e.g., longPressDelay)
//           />
//         </div>
//       </div>
//     );
//   }

//   renderSidebar() {
//     return (
//       <div className="demo-app-sidebar">
//         <div className="demo-app-sidebar-section">
//           <h2>Instructions</h2>
//           <ul>
//             <li>Select dates and you will be prompted to create a new event</li>
//             <li>Drag, drop, and resize events</li>
//             <li>Click an event to delete it</li>
//           </ul>
//         </div>
//         <div className="demo-app-sidebar-section">
//           <label>
//             <input
//               type="checkbox"
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className="demo-app-sidebar-section">
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//         </div>
//       </div>
//     );
//   }

//   handleWeekendsToggle = () => {
//     this.setState({
//       weekendsVisible: !this.state.weekendsVisible,
//     });
//   };

//   handleDateSelect = (selectInfo: DateSelectArg) => {
//     let title = prompt("Please enter a new title for your event");
//     let calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay,
//       });
//     }
//   };

//   handleEventClick = (clickInfo: EventClickArg) => {
//     if (
//       confirm(
//         `Are you sure you want to delete the event '${clickInfo.event.title}'`
//       )
//     ) {
//       clickInfo.event.remove();
//     }
//   };

//   handleEvents = (events: EventApi[]) => {
//     this.setState({
//       currentEvents: events,
//     });
//   };
// }

// function renderEventContent(eventContent: EventContentArg) {
//   return (
//     <>
//       <b>{eventContent.timeText}</b>
//       <i>{eventContent.event.title}</i>
//     </>
//   );
// }

// function renderSidebarEvent(event: EventApi) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start!, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i>{event.title}</i>
//     </li>
//   );
// }
