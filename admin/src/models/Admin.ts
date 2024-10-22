import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    image: { type: String },
    city: { type: String },
    country: { type: String },
    role: { type: String, default: "admin" },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

// Hash password before saving the admin
AdminSchema.pre("save", async function (next) {
  const admin = this;

  if (!admin.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    next();
  } catch (err) {
    return next(err as Error);
  }
});

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
