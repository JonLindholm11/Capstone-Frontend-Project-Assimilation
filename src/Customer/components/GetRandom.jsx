import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductQueryHandler from "./ProductQueryHandler";
import { useCart } from "../pages/Cart/CartContext";
import toast from "react-hot-toast";

export default function GetRandom({ limit = 4 }) {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const allProducts = await ProductQueryHandler();
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, limit));
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedProducts();
  }, [limit]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="landing">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img src={product.product_img} alt={product.product_name} />
            <h3>{product.product_name}</h3>
            <p className="price">
              $
              {typeof product.basic_price === "number"
                ? product.basic_price.toFixed(2)
                : product.basic_price}
            </p>
            <p className="description">{product.product_description}</p>
            <button
              className="addToCart"
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.product_name,
                  price: product.basic_price,
                  img: product.product_img,
                });
                toast.success("Added to cart!");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
