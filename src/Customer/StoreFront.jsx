import Products from "./GetAllProducts";
import { NavLink, Outlet } from "react-router";

export default function Store() {
  return (
    <div>
      <h1> Shop </h1>
      <nav>
        <NavLink to="/products/sewing">Sewing Notions</NavLink>
        <NavLink to="/products/cars">Cars</NavLink>
      </nav>
      <Products />
      <button>Click me!</button>
      <Outlet />
    </div>
  );
}
