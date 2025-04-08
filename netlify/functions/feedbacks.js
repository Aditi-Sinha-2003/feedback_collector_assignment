// netlify/functions/feedbacks.js

let feedbacks = global.feedbacks || [];
global.feedbacks = feedbacks;

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(feedbacks),
  };
}
