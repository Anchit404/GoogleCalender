import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = ({ refreshEvents }) => {
  const [event, setEvent] = useState({ name: '', start: '', end: '' });

  const handleSubmit = async () => {
    if (!event.name || !event.start || !event.end) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/google/events', {
        eventName: event.name,
        startDateTime: event.start,
        endDateTime: event.end,
      });
      alert('Event Created Successfully!');
      setEvent({ name: '', start: '', end: '' });
      refreshEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={event.name}
        onChange={(e) => setEvent({ ...event, name: e.target.value })}
        className="event-input"
      />
      <input
        type="datetime-local"
        value={event.start}
        onChange={(e) => setEvent({ ...event, start: e.target.value })}
        className="event-input"
      />
      <input
        type="datetime-local"
        value={event.end}
        onChange={(e) => setEvent({ ...event, end: e.target.value })}
        className="event-input"
      />
      <button onClick={handleSubmit} className="create-event-button">
        Create Event
      </button>
    </div>
  );
};

export default CreateEvent;
