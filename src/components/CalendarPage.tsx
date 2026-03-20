import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { api } from '../services/api';
import { useTheme } from './ThemeContext';

const localizer = momentLocalizer(moment);

interface Todo {
  id: number;
  title: string;
  due_date: string;
  status: string;
}

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: Todo;
}

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todo/');
      const todos: Todo[] = response.data;

      const calendarEvents = todos.map((todo) => {
        const start = new Date(todo.due_date);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration
        return {
          title: todo.title,
          start,
          end,
          allDay: false,
          resource: todo,
        };
      });

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  return (
    <div className={`flex min-h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`flex-1 p-3 sm:p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`p-3 sm:p-8 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Calendar</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView="month"
            views={['month', 'week', 'day']}
            eventPropGetter={() => ({
              style: {
                backgroundColor: theme === 'dark' ? '#4B5563' : '#fbbf24',
                border: 'none',
                borderRadius: '4px',
                color: theme === 'dark' ? '#FFF' : '#000',
              },
            })}
            className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
