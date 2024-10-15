import ProductForm from "@/components/dashboard/product/product-form";
import { config } from '@/config';

export const metadata = { title: `New | Products | ${config.site.name}` };

export default function Page(): React.JSX.Element {
  return (
    <div>
      <ProductForm />
    </div>
  );
}
