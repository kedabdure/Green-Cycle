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
    streetAddress: String,
    paid: {type: Boolean, default: false},
    tx_ref: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    notifiedDelivered: { type: Boolean, default: false },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
