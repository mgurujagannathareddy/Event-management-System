import './Event.css';
const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event-card">
      <img
        src={event.Eventimage}
        alt={event.Title}
        className="event-image"
      />

      <div className="event-content">
        <h3>{event.Title}</h3>
        <p>{event.Description}</p>


        <div className="event-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(event)}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(event._id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;