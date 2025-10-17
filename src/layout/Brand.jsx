import { NavLink } from "react-router";
export default function Brand() {
     return (
       <NavLink to="/" className="brand">
         <img src="/logo.png" alt="Noble Market logo" width="24" height="24" />
         <span>Noble Market</span>
       </NavLink>
     );
};
