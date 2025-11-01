import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { useNavigate } from "react-router";
import { getProductById } from "./ProductQueryHandler";
import { useCart } from "../pages/Cart/CartContext";
import toast from "react-hot-toast";
import "../pages/pages.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
//   const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        setError(error.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="single-container">
      <div className="single">
        <img src={product.product_img} alt={product.product_name} />
        <div className="single-content">
          <h2>{product.product_name}</h2>
          <p className="price">
            $
            {Number(product.basic_price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>{product.product_description}</p>
          <button
            className="addToCart"
            onClick={(e) => {
              e.stopPropagation();
              {
                /* DO NOT REMOVE stops navigation */
              }
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
          {/* <button className="backBtn" onClick={() => navigate(-1)}>
          Back
        </button> */}
        </div>
      </div>
    </div>
  );
}
