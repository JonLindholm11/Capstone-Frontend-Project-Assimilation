import "./Home.css";
import { NavLink } from "react-router";

export default function ProductLanding() {
  return (
    <div>
      <div className="container">
        {/* <p>
        Our Mission: Built on the belief that creation is an act of courage, we
        unite food, fabric, steel, and circuit alike under one roof. Here, every
        hand that builds, stitches, or shapes is honored — because every venture
        is a noble one.
      </p> */}
        <img
          src="https://images.pexels.com/photos/14716179/pexels-photo-14716179.jpeg"
          // src="https://images.pexels.com/photos/375889/pexels-photo-375889.jpeg"
          alt="two people hiking along the mountain side overlooking a beach"
        />
        <div className="top-left">
          Noble Market
          <p>-Where every adventure is a noble one</p>
          <NavLink to="/products">
            <button>What will you bring?</button>
          </NavLink>
        </div>
      </div>
      <h2>Membership options and pricing</h2>
      <div className="membership-container">
        <div className="membership-card-copper">
          <h3>Copper</h3>
          <p className="price">$9.99/month</p>
          <p>Basic benefits description</p>
          <button>Learn More</button>
        </div>

        <div className="membership-card-silver">
          <h3>Silver</h3>
          <p className="price">$19.99/month</p>
          <p>Premium benefits description</p>
          <button>Learn More</button>
        </div>

        <div className="membership-card-gold">
          <h3>Gold</h3>
          <p className="price">$29.99/month</p>
          <p>Elite benefits description</p>
          <button>Learn More</button>
        </div>
      </div>
    </div>
  );
}
