import "./Home.css";
import "../Customer/pages/pages.css";
import { NavLink } from "react-router";
import GetRandom from "../Customer/components/GetRandom.jsx";

export default function ProductLanding() {
  return (
    <div>
      <div className="container">
        <img
          src="https://images.pexels.com/photos/14716179/pexels-photo-14716179.jpeg"
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

      <section className="membership-section">
        <h2>Membership Options & Pricing</h2>
        <div className="bulk-pricing-banner">
          All members receive special pricing on bulk orders!
        </div>
        <div className="membership-container">
          <div className="membership-card-copper">
            <h3>Copper</h3>
            <p className="price">$9.99/month</p>
            <p>Free shipping on orders over $50</p>
            <p>5% back in rewards</p>
            <p>Early access to sales</p>
            <NavLink to="/ComingSoon">
              <button>Learn More</button>
            </NavLink>
          </div>

          <div className="membership-card-silver">
            <h3>Silver</h3>
            <p className="price">$19.99/month</p>
            <p>Free shipping on all orders</p>
            <p>10% back in rewards</p>
            <p>Priority customer support</p>
            <p>Exclusive member deals</p>
            <NavLink to="/ComingSoon">
              <button>Learn More</button>
            </NavLink>
          </div>

          <div className="membership-card-gold">
            <h3>Gold</h3>
            <p className="price">$29.99/month</p>
            <p>Free 2-day shipping</p>
            <p>15% back in rewards</p>
            <p>24/7 priority support</p>
            <p>Access to premium products</p>
            <p>Member-only events</p>
            <NavLink to="/ComingSoon">
              <button>Learn More</button>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <p className="section-subtitle">
          Handpicked items for your next project
        </p>
        <GetRandom limit={4} />
      </section>

      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <p className="section-subtitle">
          Real feedback from real makers and builders
        </p>

        <div className="testimonial">
          <div className="testimonial-header">
            <img
              src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg"
              alt="user avatar"
            />
            <div className="testimonial-info">
              <p>
                <span>Sarah Mitchell</span> Small Business Owner
              </p>
            </div>
            <div className="stars">★★★★★</div>
          </div>
          <p className="testimonial-text">
            Amazing selection and fast shipping! Got my sewing supplies in 2
            days and the quality exceeded my expectations. The customer service
            team was incredibly helpful in choosing the right materials for my
            projects.
          </p>
        </div>

        <div className="testimonial">
          <div className="testimonial-header">
            <img
              src="https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg"
              alt="user avatar"
            />
            <div className="testimonial-info">
              <p>
                <span>Marcus Chen</span> DIY Enthusiast
              </p>
            </div>
            <div className="stars">★★★★★</div>
          </div>
          <p className="testimonial-text">
            Noble Market has everything I need for my home projects. From
            construction tools to electronics, their staff really knows their
            products and helped me find exactly what I was looking for. Fast,
            friendly service every time!
          </p>
        </div>
        <div className="testimonial">
          <div className="testimonial-header">
            <img
              src="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg"
              alt="user avatar"
            />
            <div className="testimonial-info">
              <p>
                <span>Emily Rodriguez</span> Professional Contractor
              </p>
            </div>
            <div className="stars">★★★★★</div>
          </div>
          <p className="testimonial-text">
            Best online marketplace I&apos;ve found! Whether I need construction
            tools, electronics, or auto parts, the prices are fair, the
            selection is huge, and the people behind Noble Market are genuinely
            passionate about helping you find what you need.
          </p>
        </div>
      </section>
    </div>
  );
}
