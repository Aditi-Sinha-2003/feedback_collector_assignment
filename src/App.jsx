import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showAdmin, setShowAdmin] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/.netlify/functions/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        alert("Feedback submitted!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Failed to submit feedback");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred");
    }

    setIsSubmitting(false);
  };

  const fetchFeedbacks = async () => {
    const res = await fetch("/.netlify/functions/feedbacks");
    const data = await res.json();
    setFeedbacks(data);
  };

  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
    if (!showAdmin) fetchFeedbacks();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Feedback Collector</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Feedback</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleAdmin}
            className="text-blue-600 hover:underline font-medium"
          >
            {showAdmin ? "Hide Feedback" : "View Submitted Feedback"}
          </button>
        </div>

        {showAdmin && (
          <div className="mt-6 space-y-4">
            {feedbacks.length === 0 ? (
              <p className="text-center text-gray-500">No feedback yet.</p>
            ) : (
              feedbacks.map((fb, idx) => (
                <div key={idx} className="bg-gray-100 p-4 rounded-xl shadow">
                  <p className="font-semibold">{fb.name} ({fb.email})</p>
                  <p className="mt-1">{fb.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <footer className="mt-10 text-sm text-gray-400 text-center">
        Built by Aditi Sinha • Submitted on April 2025
      </footer>
    </div>
  );
}

export default App;
