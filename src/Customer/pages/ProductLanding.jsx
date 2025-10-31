import { NavLink } from "react-router";
import ProductsGrid from "../components/ProductGrid";
import "./pages.css";

export default function ProductLanding() {
  return (
    <div className="landing">
      <section className="sewingLanding">
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/1232131/pexels-photo-1232131.jpeg"
          alt="image of sewing notions"
        />
        <div className="product-grid-with-more">
          <ProductsGrid category="sewing notions" limit={4} />
          <NavLink to="/products/sewing" className="product-card more-card">
            <div className="more-content">
              <h3>View More</h3>
              <p>See all sewing notions →</p>
            </div>
          </NavLink>
        </div>
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
          alt="picture of electronics on a table"
        />
        <div className="product-grid-with-more">
          <ProductsGrid category="electronics" limit={4} />
          <NavLink
            to="/products/electronics"
            className="product-card more-card"
          >
            <div className="more-content">
              <h3>View More</h3>
              <p>See all electronics →</p>
            </div>
          </NavLink>
        </div>
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/4480453/pexels-photo-4480453.jpeg"
          alt="image of a tools"
        />
        <div className="product-grid-with-more">
          <ProductsGrid category="construction tools" limit={4} />
          <NavLink
            to="/products/construction-tools"
            className="product-card more-card"
          >
            <div className="more-content">
              <h3>View More</h3>
              <p>See all construction tools →</p>
            </div>
          </NavLink>
        </div>
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg"
          alt="image of a car"
        />
        <div className="product-grid-with-more">
          <ProductsGrid category="vehicles" limit={4} />
          <NavLink to="/products/cars" className="product-card more-card">
            <div className="more-content">
              <h3>View More</h3>
              <p>See all vehicles →</p>
            </div>
          </NavLink>
        </div>
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg"
          alt="image of food"
        />
        <div className="product-grid-with-more">
          <ProductsGrid category="food" limit={4} />
          <NavLink to="/products/food" className="product-card more-card">
            <div className="more-content">
              <h3>View More</h3>
              <p>See all food →</p>
            </div>
          </NavLink>
        </div>
      </section>
    </div>
  );
}
