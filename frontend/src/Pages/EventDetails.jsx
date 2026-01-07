// src/pages/EventDetails.jsx
import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(1);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/events/${id}`).then(res => setEvent(res.data.event));
  }, [id]);

  const bookTicket = async () => {
    await axios.post(
      "/bookings",
      { eventId: id, seats },
      { headers: { Authorization: user.token } }
    );
    alert("Booking successful!");
  };

  if (!event) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>Available Seats: {event.availableSeats}</p>

      <input
        type="number"
        min="1"
        value={seats}
        onChange={e => setSeats(e.target.value)}
        className="border p-2"
      />

      <button onClick={bookTicket} className="btn ml-4">
        Book Ticket
      </button>
    </div>
  );
}
