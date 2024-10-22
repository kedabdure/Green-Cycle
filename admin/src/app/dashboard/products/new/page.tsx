import ProductForm from "@/components/dashboard/product/product-form";
import { Typography } from "@mui/material";
import { config } from '@/config';

export const metadata = { title: `New | Products | ${config.site.name}` };

export default function Page(): React.JSX.Element {
  return (
    <div>
      <Typography variant="h4" mb="1rem">New Product</Typography>
      <ProductForm />
    </div>
  );
}
