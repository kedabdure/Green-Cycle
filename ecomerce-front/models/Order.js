import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: { type: Object, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    subCity: { type: String },
    wereda: { type: String },
    streetAddress: { type: String, required: true },
    paid: { type: Boolean, default: false },
    paymentRef: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
