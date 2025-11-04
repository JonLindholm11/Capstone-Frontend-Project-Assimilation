import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router";
import "./error.css";

export default function Error404() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="error-page">
      <section className="error-container">
        <h1>*404*</h1>
        <p>
          Sorry... only ghost allowed at this party. Click on me and I&apos;ll take
          you Home
        </p>
        <p style={{ fontSize: "1rem", marginTop: "15px" }}>
          Redirecting to home in 5 seconds...
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
