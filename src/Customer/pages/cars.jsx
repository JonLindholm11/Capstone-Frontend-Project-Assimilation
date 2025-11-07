import ProductsGrid from "../components/ProductGrid";
import "./pages.css";
export default function Cars() {
  return (
    <div>
      <div className="hero-section">
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg"
          alt="image of a car"
        />
      </div>
      <ProductsGrid category="vehicles" />
    </div>
  );
}
