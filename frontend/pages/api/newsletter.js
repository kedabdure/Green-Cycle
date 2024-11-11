import { mongooseConnect } from "../../lib/mongoose";
import Newsletter from "../../models/Newsletter";

// Constants for error messages
const ERROR_EMAIL_REQUIRED = "Email is required";
const ERROR_EMAIL_EXISTS = "Email already subscribed";
const ERROR_SUBSCRIPTION = "Something went wrong";
const ERROR_EMAIL_NOT_FOUND = "Email not found";

export default async function handler(req, res) {
  await mongooseConnect();

  try {
    if (req.method === "POST") {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: ERROR_EMAIL_REQUIRED });
      }

      const existingEmail = await Newsletter.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: ERROR_EMAIL_EXISTS });
      }

      const newSubscription = await Newsletter.create({ email });
      return res.status(201).json({ message: "Subscribed successfully", data: newSubscription });
    }
    else if (req.method === "GET") {
      const { email } = req.query;

      if (email) {
        const subscriber = await Newsletter.findOne({ email });
        if (subscriber) {
          return res.status(200).json(subscriber);
        }
        return res.status(404).json({ error: ERROR_EMAIL_NOT_FOUND });
      }

      const allSubscribers = await Newsletter.find().sort({ createdAt: -1 });
      return res.status(200).json(allSubscribers);
    }
    else {
      // Handle unsupported methods
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: ERROR_SUBSCRIPTION });
  }
}
