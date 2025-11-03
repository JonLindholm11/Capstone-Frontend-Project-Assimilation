import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./pages.css";

export default function ComingSoon() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bgimg">
      <div className="topleft">
        <p>Noble Market</p>
      </div>
      <div className="middle">
        <h1>COMING SOON</h1>
        <p>This feature is under development</p>
        <p style={{ fontSize: "1rem", marginTop: "20px" }}>
          Redirecting to home in 5 seconds...
        </p>
      </div>
      <div className="bottomleft">
        <p>Check back soon!</p>
      </div>
    </div>
  );
}
