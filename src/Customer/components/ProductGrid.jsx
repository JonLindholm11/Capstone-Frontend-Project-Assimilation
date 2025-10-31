import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductQueryHandler from "./ProductQueryHandler";
import { useCart } from "../pages/Cart/CartContext";

export default function ProductsGrid({ category, limit, children }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await ProductQueryHandler(category);
        setProducts(data);
        setError("");
      } catch (error) {
        setError(error.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (loading || !products) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;

  const list = limit ? products.slice(0, limit) : products;
  //this si so i can limit the number of items
  //<ProductsGrid category="sewing notions" limit={3} />

  return (
    <ul className="product-grid">
      {list.map((p) => (
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
          <button
            className="addToCart"
            onClick={(e) => {
              e.stopPropagation();
              {
                /* DO NOT REMOVE stops navigation */
              }
              addToCart({
                id: p.id,
                name: p.product_name,
                price: p.basic_price,
                img: p.product_img,
              });
            }}
          >
            Add to Cart
          </button>
        </li>
      ))}
      {children}
      {/* ^for the more card to show up and not break but also not show up on the page with the products */}
    </ul>
  );
}
