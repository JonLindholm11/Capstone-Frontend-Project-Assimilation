import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Store from "./Customer/StoreFront";
import Admin from "./Admin/AdminPage";
import Error404 from "./Error404";
import SalesForm from "./Sales/SalesPage";
import Sewing from "./Customer/pages/sewing";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Store />}>
          <Route path="sewing" element={<Sewing />} />
        </Route>
        <Route path="/products" element={<Store />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/sewing" element={<Sewing />} />

        <Route path="*" element={<Error404 />}></Route>
      </Route>
    </Routes>
  );
}
