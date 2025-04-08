var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/submit-feedback.js
var submit_feedback_exports = {};
__export(submit_feedback_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(submit_feedback_exports);
var feedbacks = global.feedbacks || [];
global.feedbacks = feedbacks;
async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { name, email, message } = JSON.parse(event.body || "{}");
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "All fields are required" })
    };
  }
  const newFeedback = { name, email, message };
  feedbacks.push(newFeedback);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Feedback received", data: newFeedback })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=submit-feedback.js.map
