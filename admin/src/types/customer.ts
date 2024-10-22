export interface Customer {
  _id: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}
