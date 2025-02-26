import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { api } from '../services/api';
import ReactTooltip from 'react-tooltip';

// Set up the localizer for the calendar
const localizer = momentLocalizer(moment);

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await api.get('/todo/');
      const todos = response.data;

      // Convert todos to calendar events
      const calendarEvents = todos.map((todo: any) => ({
        title: todo.title,
        start: new Date(todo.due_date), // Use due_date as the event start time
        end: new Date(todo.due_date), // Use due_date as the event end time
        allDay: true, // Mark as an all-day event
        resource: todo, // Include the todo data for additional details
      }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Calendar</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }} // Set the calendar height
            defaultView="month" // Default view (month, week, day)
            views={['month', 'week', 'day']} // Available views
            eventPropGetter={() => ({
              style: {
                backgroundColor: '#fbbf24', // Customize event color
                border: 'none',
                borderRadius: '4px',
                color: '#000',
              },
            })}
            components={{
              event: ({ event }) => (
                <div data-tip={`${event.title} - ${event.resource.status}`}>
                  {event.title}
                  <ReactTooltip />
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
