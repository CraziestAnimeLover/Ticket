// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  venue: String,
  totalSeats: Number,
  availableSeats: Number,
  price: Number
});

export default mongoose.model("Event", eventSchema);
