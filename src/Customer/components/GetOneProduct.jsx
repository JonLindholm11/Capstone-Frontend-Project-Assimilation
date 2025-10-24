import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "./ProductQueryHandler";
import "../pages/pages.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        console.log('Fetching product with id:', id);
        const data = await getProductById(id);
        console.log('Product data received:', data);
        if (!cancelled) setProduct(Array.isArray(data) ? data[0] : data);
      } catch (e) {
        console.error('Error fetching product:', e);
        if (!cancelled) setError(e.message || "Failed to load product");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="single">
      <img src={product.product_img} alt={product.product_name} />
      <h2>{product.product_name}</h2>
      <p>
        ${typeof product.basic_price === "number"
          ? product.basic_price.toFixed(2)
          : product.basic_price}
      </p>
      <p>{product.product_description}</p>
    </div>
  );
}
