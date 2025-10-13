import Products from "./GetAllProducts";
import { NavLink, Outlet } from "react-router";

export default function Store() {
  return (
    <div>
      <h1> Shop </h1>
      <nav className="subNav">
        <NavLink to="/products/sewing">
          <h3>Sewing Notions</h3>
        </NavLink>
        <NavLink to="/products/cars">
          <h3>Cars</h3>
        </NavLink>
        <NavLink to="/products/electronics">
          <h3>Electronics</h3>
        </NavLink>
        <NavLink to="/products/tools">
          <h3>Tools</h3>
        </NavLink>
        <NavLink to="/products/cars">
          <h3>Vehicles</h3>
        </NavLink>
        <NavLink to="/products/food">
          <h3>Food</h3>
        </NavLink>
        <NavLink to="/products/cart">
          <h3>Cart</h3>
        </NavLink>
      </nav>
      <Products />
      <button>Click me!</button>
      <Outlet />
    </div>
  );
}
