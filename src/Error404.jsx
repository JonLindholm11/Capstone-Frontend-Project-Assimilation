import { NavLink } from "react-router";
import "./error.css";
export default function Error404() {
  return (
    <div className="error-page">
      <section className="error-container">
        <h1>*404*</h1>
        <p>
          Sorry... only ghost allowed at this party. Click on me and I&apos;ll take
          you Home
        </p>
      </section>
      <NavLink to="/">
        <img
          className="error-image"
          src="https://images.pexels.com/photos/34375255/pexels-photo-34375255.jpeg"
          alt="meme of a ghost in sunglasses and a hat"
        />
      </NavLink>
    </div>
  );
}
