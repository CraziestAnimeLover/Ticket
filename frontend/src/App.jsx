import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Events from "./Pages/Events";
import EventDetails from "./Pages/EventDetails";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MyBookings from "./Pages/MyBookings";
import Booking from "./Pages/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/event" element={<Events />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
