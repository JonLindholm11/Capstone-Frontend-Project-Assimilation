import "./error.css"
export default function Error404() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <img
        className="error-image"
        src="https://images.pexels.com/photos/34375255/pexels-photo-34375255.jpeg"
        alt="meme of a ghost in sunglasses and a hat"
      />
    </div>
  );
}
