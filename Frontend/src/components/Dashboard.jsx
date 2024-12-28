import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './CreateEvent';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/google/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events. Please try again.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <CreateEvent refreshEvents={fetchEvents} />
      <h2>Your Events</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.summary}</td>
              <td>{new Date(event.start.dateTime).toLocaleString()}</td>
              <td>{new Date(event.end.dateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
