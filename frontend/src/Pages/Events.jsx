import { useState, useEffect } from "react";


import EventCard from "../components/EventCard";
import { toast } from "react-toastify";
import './Events.css'
import api from "../api/axios";
const Events = () => {
  const [Eventimage, setEventImg] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  async function fetchEvents() {
    try {
      const response = await api.get(
        "/api/events"
      );
      setEvents(response.data);
    } catch (error) {
      toast.error("No data found");
      console.error(error);
    }
  }

  useEffect(() => {
    let cancelled = false;
    api.get("/api/events")
      .then((response) => {
        if (!cancelled) {
          setEvents(response.data);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          toast.error("Failed to fetch events");
          console.error(error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleevent = async (e) => {
    e.preventDefault();

    const eventData = {
      Eventimage,
      Title,
      Description,
    };

    try {
      if (editId) {
        const response = await api.put(
          `/api/events/${editId}`,
          eventData
        );

        toast(response.data.message);
        setEditId(null);
      } else {
        const response = await api.post(
          "/api/events",
          eventData
        );

        toast(response.data.message);
      }

      setEventImg("");
      setTitle("");
      setDescription("");

      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setEventImg(event.Eventimage);
    setTitle(event.Title);
    setDescription(event.Description);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/api/events/${id}`
      );

      toast(response.data.message);
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event");
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEventImg("");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="events-page">
      <div className="events-banner">
        <h2 className="text-light" >Events</h2>
      </div>

      <form onSubmit={handleevent} className="event-form">
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          {editId ? "Update Event" : "Create New Event"}
        </h3>
        <input
          type="text"
          placeholder="Image URL"
          value={Eventimage}
          onChange={(e) => setEventImg(e.target.value)}
          className="form-control"
        />
        <br />

        <input
          type="text"
          placeholder="Title of Event"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
        <br />

        <input
          type="text"
          placeholder="Description of Event"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
        <br />

        <div className="button-group">
          <button type="submit" className="submit-btn">
            {editId ? "Update Event" : "Add Event"}
          </button>

          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}

        </div>
      </form>

      <hr />

      <h2 className="event-list-title">Event List</h2>

      {events.length === 0 ? (
        <p className="no-events">No Events Found</p>
      ) : (
        <div className="events-container">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;