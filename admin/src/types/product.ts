export interface ProductProps {
  _id?: string;
  title?: string;
  category?: string;
  description?: string;
  price?: string;
  images?: string[];
  panoramicImages?: string[];
  properties?: Record<string, string>;
  updatedAt?: Date;
  createdAt?: Date;
}
