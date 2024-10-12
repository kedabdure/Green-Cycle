import { model, models, Schema, Document, Model, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

const ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  phone?: string;
  city?: string;
  country?: string;
  role: string;
  isPasswordValid(password: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: '' },
    phone: {type: String, default: ''},
    city: {type: String, default: ''},
    country: {type: String, default: ''},
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      default: ROLES.ADMIN,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
AdminSchema.pre<IAdmin>('save', async function (next) {
  const admin = this;

  if (!admin.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

const Admin: Model<IAdmin> = models.Admin || model<IAdmin>('Admin', AdminSchema);

export default Admin;
export { ROLES };
export type { IAdmin };
