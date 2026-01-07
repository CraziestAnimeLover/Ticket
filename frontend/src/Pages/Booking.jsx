// src/pages/Booking.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Booking() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventId: "",
    seats: 1
  });
  const [message, setMessage] = useState("");

  // Fetch all events for the dropdown
  useEffect(() => {
    axios
      .get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      setMessage("You must be logged in to book tickets.");
      return;
    }

    try {
      const res = await axios.post(
        "/bookings",
        { eventId: formData.eventId, seats: formData.seats },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (res.data.success) {
        setMessage(`Booking successful! You booked ${res.data.booking.seatsBooked} seats.`);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Book Tickets</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Event:</label>
          <select
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Event --</option>
            {events.map(event => (
              <option key={event._id} value={event._id}>
                {event.title} ({event.availableSeats} seats available)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Number of Seats:</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            min="1"
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
