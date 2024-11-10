import { model, models, Schema } from "mongoose";
import NewsLetter from "../components/contact/Newsletter";

const NewsLetterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const NewsLetter = models.NewsLetter || model("NewsLetter", NewsLetterSchema);

export default NewsLetter;
