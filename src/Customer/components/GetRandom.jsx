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
              {Number(product.basic_price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
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
                toast.success("Added to cart!", {
                  position: "bottom-center",
                  style: {
                    minWidth: "250px",
                    minHeight: "60px",
                    fontSize: "16px",
                    padding: "16px",
                  },
                });
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
