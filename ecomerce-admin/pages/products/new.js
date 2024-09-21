import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [goToProducts, setGoToProducts] = useState();
  const router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
    // return <p>Redirecting...</p>;
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Product Name</label>
        <input type="text" placeholder="Product Name"
          value={title} onChange={ev => setTitle(ev.target.value)} />
        <label>Product Description</label>
        <textarea placeholder="Product Description"
          value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
        <label>Product Price (in ETB)</label>
        <input type="number" placeholder="Product Price"
          value={price} onChange={ev => setPrice(ev.target.value)} />
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </Layout>
  );
}
