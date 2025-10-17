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
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
          alt="picture of electronics on a table"
        />
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/4480453/pexels-photo-4480453.jpeg"
          alt="image of a tools"
        />
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg"
          alt="image of a car"
        />
      </section>

      <section>
        <img
          className="hero-image"
          src="https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg"
          alt="image of food"
        />
      </section>
    </div>
  );
}
