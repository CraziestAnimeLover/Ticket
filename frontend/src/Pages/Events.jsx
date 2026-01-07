// src/pages/Events.jsx
import React from 'react'
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/events").then(res => setEvents(res.data.events));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {events.map(event => (
        <div key={event._id} className="border p-4 rounded">
          <h2 className="font-bold">{event.title}</h2>
          <p>{event.venue}</p>
          <p>₹{event.price}</p>
          <Link to={`/event/${event._id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
