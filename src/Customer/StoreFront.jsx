import Products from "./GetAllProducts";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router";

export default function Store() {
  return (
    <div>
      <nav className="subNav">
        <NavLink to="/products/sewing">
          <h3>Sewing Notions</h3>
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
          <h3>
            <FaCartShopping /> Cart
          </h3>
        </NavLink>
      </nav>
      <Products />
      <Outlet />
    </div>
  );
}
