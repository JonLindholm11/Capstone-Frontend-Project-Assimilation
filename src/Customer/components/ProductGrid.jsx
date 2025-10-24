import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductQueryHandler from "./ProductQueryHandler";

export default function ProductsGrid({ category }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await ProductQueryHandler(category);
        if (!cancelled) setProducts(data);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [category]);

  if (loading || !products) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <ul className="product-grid">
      {products.map((p) => (
        <li
          key={p.id}
          className="product-card"
          onClick={() => navigate(`/products/${p.id}`)}
        >
          <img src={p.product_img} alt={p.product_name} />
          <h3>{p.product_name}</h3>
          <p className="price">
            $
            {typeof p.basic_price === "number"
              ? p.basic_price.toFixed(2)
              : p.basic_price}
          </p>
          <p className="description">{p.product_description}</p>
        </li>
      ))}
    </ul>
  );
}
