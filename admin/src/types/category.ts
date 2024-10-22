export interface CategoryProps {
  _id: string;
  name: string;
  properties: { name: string; values: string[] }[];
  parent?: CategoryProps;
}
