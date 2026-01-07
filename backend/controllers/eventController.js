import Event from "../model/Event.js";

/**
 * @desc    Create a new event (Admin only)
 * @route   POST /api/events
 * @access  Private (Admin)
 */
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      totalSeats,
      price
    } = req.body;

    if (!title || !date || !venue || !totalSeats || !price) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      totalSeats,
      availableSeats: totalSeats,
      price
    });

    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message
    });
  }
};

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message
    });
  }
};

/**
 * @desc    Get single event by ID
 * @route   GET /api/events/:id
 * @access  Public
 */
export const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid event ID",
      error: error.message
    });
  }
};
