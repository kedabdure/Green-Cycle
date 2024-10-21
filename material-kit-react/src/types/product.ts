export interface ProductProps {
  list_item: any;
  createdAt: any;
  _id?: string;
  title?: string;
  category?: string;
  description?: string;
  price?: string;
  images?: string[];
  properties?: Record<string, string>;
  updatedAt?: Date;
}
