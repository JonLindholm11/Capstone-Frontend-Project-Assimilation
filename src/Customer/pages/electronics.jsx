import ProductsGrid from "../components/ProductGrid";
import "./pages.css";
export default function Electronics() {
  return (
    <div>
      <div>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
          alt="picture of electronics on a table"
        />
      </div>
      <ProductsGrid category="electronics" />
    </div>
  );
}
