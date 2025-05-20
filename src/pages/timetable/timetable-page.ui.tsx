// import React from 'react';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import { format, parse, startOfWeek, getDay } from 'date-fns';
// import 'react-big-calendar/lib/css/react-big-calendar.css';


// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
//   getDay,
//   locales,
// });

// const events = [
//   {
//     title: 'Встреча с командой',
//     start: new Date(2025, 4, 20, 10, 0),
//     end: new Date(2025, 4, 20, 11, 0),
//   },
// ];

// export  function Timetable() {
//   return (
//     <div style={{ height: '80vh', padding: '20px' }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         defaultView="week"
//         views={['week']}
//         step={60}
//         timeslots={1}
//         showMultiDayTimes={false}
//         defaultDate={new Date(2025, 4, 19)}
//         startAccessor="start"
//         endAccessor="end"
//         culture="ru-RU"
//         style={{ height: '100%' }}
//       />
//     </div>
//   );
// }

export function TimetablePage(){
  return (
    <div></div>
  )
}