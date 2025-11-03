import ProductsGrid from "../components/ProductGrid";
import "./pages.css";
export default function Food() {
  return (
    <div>
      {/* <h1 className="head"> Food </h1> */}

      <div className="hero-section">
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg"
          alt="image of food"
        />
      </div>
       <ProductsGrid category="food" />
    </div>
  );
}
