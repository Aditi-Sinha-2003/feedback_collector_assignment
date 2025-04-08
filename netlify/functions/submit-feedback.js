// netlify/functions/submit-feedback.js

let feedbacks = global.feedbacks || [];
global.feedbacks = feedbacks;

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, message } = JSON.parse(event.body || "{}");

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "All fields are required" }),
    };
  }

  const newFeedback = { name, email, message };
  feedbacks.push(newFeedback);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Feedback received", data: newFeedback }),
  };
}
