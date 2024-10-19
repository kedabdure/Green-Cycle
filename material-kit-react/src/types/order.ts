export interface OrderProps {
  _id: any;
  line_items: Record<string, any>;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  country?: string;
  city?: string;
  subCity?: string;
  wereda?: string;
  streetAddress?: string;
  paid?: boolean;
  tx_ref?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
