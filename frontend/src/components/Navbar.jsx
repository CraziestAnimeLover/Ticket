// src/components/Navbar.jsx
import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl">
        TicketApp
      </Link>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link to="/event">Events</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/login" className="hover:underline">Log In</Link>
        <Link to="/signup" className="hover:underline">Sign Up</Link>
      </div>
    </nav>
  );
}
