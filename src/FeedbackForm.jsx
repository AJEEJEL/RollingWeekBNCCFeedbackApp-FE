import { useState } from "react";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    eventName: "",
    division: "RnD",
    rating: 0,
    comment: "",
    suggestion: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRating = (value) => {
    setForm({ ...form, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage(data.message || "Error submitting feedback");
      } else {
        setStatusMessage(data.message || "Feedback submitted successfully!");
        setForm({
          name: "",
          email: "",
          eventName: "",
          division: "RnD",
          rating: 0,
          comment: "",
          suggestion: "",
        });
      }
    } catch (err) {
      setStatusMessage("Network error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
              required
            />
            <label>Division:</label>
            <select
              name="division"
              value={form.division}
              onChange={handleChange}
            >
              <option value="LnT">LnT</option>
              <option value="EEO">EEO</option>
              <option value="PR">PR</option>
              <option value="HRD">HRD</option>
              <option value="RnD">RnD</option>
            </select>
          </div>
        </div>

        <div>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
          />
          <label>Suggestion:</label>
          <textarea
            name="suggestion"
            value={form.suggestion}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <div className="rating">
            {[1, 2, 3, 4, 5].map((i) => (
              <>
                <input
                  key={i}
                  type="radio"
                  id={`star${i}`}
                  name="rating"
                  value={i}
                  checked={form.rating === i}
                  onChange={() => handleRating(i)}
                />
                <label key={`label-${i}`} htmlFor={`star${i}`}></label>
              </>
            ))}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {statusMessage && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.5rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
}
