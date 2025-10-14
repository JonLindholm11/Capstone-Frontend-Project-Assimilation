import { Outlet } from "react-router";
import SubNav from "./SubNav";
export default function Store() {
  return (
    <div>
      <SubNav />
      <Outlet />
    </div>
  );
}
