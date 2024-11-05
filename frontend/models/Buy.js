import { model, models, Schema } from 'mongoose';

const BuySchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  subCity: { type: String, required: true },
  streetAddress: { type: String, required: true },
  estimatedPrice: { type: Number, required: true },
  additionalInfo: { type: String },
  images: { type: [String], required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const Buy = models.Buy || model('Buy', BuySchema);
