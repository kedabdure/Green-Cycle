export interface CustomerProps {
  name: string;
  email: string;
  phone?: string;
  password: string;
  image?: string;
  streetAddress?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
