import { useEffect, useState } from "react";

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
      setStatusMessage("Error fetching feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;
    try {
      const res = await fetch(`http://localhost:3000/api/feedback/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setStatusMessage(data.message || "Deleted");
      setFeedbacks(feedbacks.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      setStatusMessage("Error deleting feedback");
    }
  };

  // Update status langsung dari dropdown
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/feedback/${id}`, {
        method: "PUT", // atau PATCH kalau API kamu pakai PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      setStatusMessage(data.message || "Status updated");

      // Update di state supaya langsung kelihatan
      setFeedbacks((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
      );
    } catch (err) {
      console.error(err);
      setStatusMessage("Error updating status");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 3000); // 3 detik

      return () => clearTimeout(timer); // bersihin timer kalau message berubah sebelum selesai
    }
  }, [statusMessage]);

  if (loading) return <p>Loading feedbacks...</p>;

  return (
    <div className="card">
      <h1>Admin Feedback Panel</h1>
      {statusMessage && <p>{statusMessage}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>Division</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Suggestion</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr key={f.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.eventName}</td>
              <td>{f.division}</td>
              <td>{f.rating}</td>
              <td>{f.comment}</td>
              <td>{f.suggestion}</td>
              <td>
                <select
                  value={f.status}
                  onChange={(e) => handleStatusChange(f.id, e.target.value)}
                >
                  <option value="in-review">in-review</option>
                  <option value="open">open</option>
                  <option value="resolved">resolved</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
