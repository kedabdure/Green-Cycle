export interface User {
  name: string;
  email: string;
  image?: string;
  [key: string]: unknown;
}
