import Booking from "../model/Booking.js";
import Event from "../model/Event.js";

/**
 * Book Ticket
 */
export const bookTicket = async (req, res) => {
  try {
    const { eventId, seats } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats < seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    event.availableSeats -= seats;
    await event.save();

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      seatsBooked: seats,
      totalPrice: seats * event.price
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Logged-in User Bookings
 */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("event", "title venue date price");

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
