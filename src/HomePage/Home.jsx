import "./Home.css";
import "../Customer/pages/pages.css";
import { NavLink } from "react-router";
import GetRandom from "../Customer/components/GetRandom.jsx";

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
      <GetRandom limit={4} />

      <div className="testimonial">
        <img
          src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg"
          alt="user avatar"
        />
        <p>
          <span>Sarah Mitchell</span> Adventure Enthusiast
        </p>
        <p>
          Amazing selection and fast shipping! Got my camping gear in 2 days and
          the quality exceeded my expectations. The customer service team was
          incredibly helpful in choosing the right equipment.
        </p>
      </div>

      <div className="testimonial">
        <img
          src="https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg"
          alt="user avatar"
        />
        <p>
          <span>Marcus Chen</span> Outdoor Guide
        </p>
        <p>
          Noble Market has everything I need for my expeditions. Their staff
          really knows their products and helped me find exactly what I was
          looking for. Fast, friendly service every time!
        </p>
      </div>
      <div className="testimonial">
        <img
          src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg"
          alt="user avatar"
        />
        <p>
          <span>Emily Rodriguez</span> Weekend Hiker
        </p>
        <p>
          Best outdoor marketplace I&apos;ve found! The prices are fair, the
          selection is huge, and the people behind Noble Market are genuinely
          passionate about helping you find the right gear for your adventure.
        </p>
      </div>
    </div>
  );
}
