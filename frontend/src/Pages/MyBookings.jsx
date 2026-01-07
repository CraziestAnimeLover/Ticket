// src/pages/MyBookings.jsx
import React from "react";

import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings/my", {
      headers: { Authorization: user.token }
    }).then(res => setBookings(res.data));
  }, []);

  return (
    <div className="p-6">
      {bookings.map(b => (
        <div key={b._id} className="border p-4 mb-3">
          <p>{b.event.title}</p>
          <p>Seats: {b.seatsBooked}</p>
        </div>
      ))}
    </div>
  );
}
