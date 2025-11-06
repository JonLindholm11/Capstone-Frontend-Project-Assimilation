import { NavLink } from "react-router";
import "./Brand.css";

export default function Brand() {
     return (
       <NavLink to="/" className="brand">
         <img src="/shield-emblem.svg" alt="Noble Market logo" width="40" height="40" />
         <span>Noble Market</span>
       </NavLink>
     );
};
