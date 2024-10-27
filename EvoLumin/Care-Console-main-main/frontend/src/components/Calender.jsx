import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import '../style/CalendarCustom.css'; // Custom styles

function CustomCalendar() {
  const [value, onChange] = useState(new Date());

  // Simulated appointments on certain dates
  const appointments = ['2024-09-29', '2024-10-05', '2024-10-13'];

  // Check if the date has appointments
  const isAppointmentDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return appointments.includes(formattedDate);
  };
  return (
    <div className="flex flex-col items-center p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md">
      <h2 className="text-4xl font-extrabold mb-4 text-white tracking-wide">Appointment Calendar</h2>
      <Calendar 
        onChange={onChange} 
        value={value} 
        className="modern-calendar glass-effect p-6"
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const day = date.getDay();
            if (day === 6 || day === 0) return 'weekend'; // Highlight weekends
            if (isAppointmentDate(date)) return 'appointment'; // Highlight appointments
          }
          return ''; // Default style
        }}
        tileContent={({ date, view }) => view === 'month' && isAppointmentDate(date) ? <p className="emoji">📅</p> : null}
        nextLabel={<span className="nav-button">▶</span>}
        prevLabel={<span className="nav-button">◀</span>}
      />
    </div>
  );
}

export default CustomCalendar;
