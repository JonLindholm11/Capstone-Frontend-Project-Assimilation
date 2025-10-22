import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Store from "./Customer/StoreFront";
import SalesPage from "./Sales/SalesPage";
import OrderConfirmation from "./Sales/OrderConfirmation";
import Error404 from "./Error404";
import AdminPage from "./Admin/AdminPage";
import Sewing from "./Customer/pages/sewing";
import Electronics from "./Customer/pages/electronics";
import Cars from "./Customer/pages/cars";
import Food from "./Customer/pages/food";
import Tools from "./Customer/pages/tools";
import Cart from "./Customer/pages/Cart/Cart";
import ProductLanding from "./Customer/pages/ProductLanding";
import ServicePage from "./Service/ServicePage";
import ProductDetail from "./Customer/components/GetOneProduct";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Store />}>
          <Route index element={<ProductLanding />} />
          <Route path=":id" element={<ProductDetail />} />
          <Route path="sewing" element={<Sewing />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="cars" element={<Cars />} />
          <Route path="food" element={<Food />} />
          <Route path="tools" element={<Tools />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/ServicePage" element={<ServicePage />} />

        <Route path="*" element={<Error404 />}></Route>
      </Route>
    </Routes>
  );
}
