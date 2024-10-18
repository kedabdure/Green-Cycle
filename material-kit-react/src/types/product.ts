export interface ProductProps {
  _id?: string;
  title?: string;
  category?: string;
  description?: string;
  price?: string;
  images?: string[];
  properties?: Record<string, string>;
}
