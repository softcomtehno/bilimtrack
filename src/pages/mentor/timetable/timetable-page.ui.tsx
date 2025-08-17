import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ru from 'date-fns/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  ru: ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Математика',
    groups: ['IT-21', 'IT-22'],
    room: 'Каб. 305',
    start: new Date(2025, 7, 16, 9, 0),
    end: new Date(2025, 7, 16, 10, 30),
  },
  {
    title: 'Программирование',
    groups: ['DS-22', 'DS-23', 'DS-24'],
    room: 'Каб. 210',
    start: new Date(2025, 7, 25, 11, 0),
    end: new Date(2025, 7, 25, 12, 30),
  },
  {
    title: 'Маркетинг',
    groups: ['MKT-23'],
    room: 'Каб. 101',
    start: new Date(2025, 7, 26, 14, 0),
    end: new Date(2025, 7, 26, 15, 30),
  },
];

const CustomEvent = ({ event }) => {
  return (
    <div>
      <strong>{event.title}</strong>
      <div style={{ fontSize: '0.8em' }}>
        {event.groups.join(', ')} — {event.room}
      </div>
    </div>
  );
};

export function Timetablepage() {
  return (
    <div style={{ height: '80vh', padding: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        components={{
          event: CustomEvent,
        }}
        culture="ru"
      />
    </div>
  );
}
