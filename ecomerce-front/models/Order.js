import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: { type: Object, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    email: { type: String, required: true },
    country: String,
    city: String,
    subCity: String,
    wereda: String,
    streetAddress: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
