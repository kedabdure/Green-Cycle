import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the User schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    image: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: String },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    return next(err as Error);
  }
});

const User = models.User || model("User", UserSchema);

export default User;
