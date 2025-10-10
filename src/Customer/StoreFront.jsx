import Products from "./GetAllProducts";
import { NavLink } from "react-router";

export default function Store() {
  return (
    <div>
      <h1> Shop </h1>
      <nav>
        <NavLink to="/sewing">Sewing Notions</NavLink>
        <NavLink to="/cars">Cars</NavLink>
      </nav>
      <Products />
      <button>Click me!</button>
    </div>
  );
}
